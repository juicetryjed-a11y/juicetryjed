import { supabase } from './supabase'
import type { User, UserWithProfile, CreateUserData, UpdateUserData } from '@/types/user'

export const userManagementAPI = {
  // Get all users with their profiles
  async getUsers(): Promise<UserWithProfile[]> {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        profiles (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as UserWithProfile[]
  },

  // Get single user by ID
  async getUserById(id: string): Promise<UserWithProfile | null> {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        profiles (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as UserWithProfile
  },

  // Create new user using signup then update role
  async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    try {
      // Step 1: Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`,
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            address: userData.address,
            city: userData.city
          }
        }
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('Failed to create auth user')

      // Step 2: Wait a moment for the trigger to create the user record
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Step 3: Update the user role
      const { data: userRecord, error: roleError } = await supabase
        .from('users')
        .update({
          role: userData.role || 'customer',
          updated_at: new Date().toISOString()
        })
        .eq('id', authData.user.id)
        .select(`
          *,
          profiles (*)
        `)
        .single()

      if (roleError) {
        console.warn('Role update failed, but user was created:', roleError)
        // Try to get the user without role update
        const { data: fallbackUser } = await supabase
          .from('users')
          .select(`
            *,
            profiles (*)
          `)
          .eq('id', authData.user.id)
          .single()
        
        if (fallbackUser) {
          return fallbackUser as UserWithProfile
        }
        throw roleError
      }

      return userRecord as UserWithProfile
    } catch (error: any) {
      console.error('Create user error:', error)
      throw new Error(error.message || 'فشل في إنشاء المستخدم')
    }
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserData): Promise<UserWithProfile> {
    // Update user record
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .update({
        email: userData.email,
        role: userData.role,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (userError) throw userError

    // Update profile record
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: userData.full_name,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        avatar_url: userData.avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (profileError) throw profileError

    return {
      ...userRecord,
      profile
    } as UserWithProfile
  },

  // Delete user (soft delete - just remove from our tables)
  async deleteUser(id: string): Promise<void> {
    // Delete profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (profileError) throw profileError

    // Delete user record
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (userError) throw userError

    // Note: We cannot delete auth user without service role key
    // But the user won't be able to access admin features without the user record
  },

  // Toggle user role
  async toggleUserRole(id: string, currentRole: 'admin' | 'customer'): Promise<UserWithProfile> {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin'
    
    const { data, error } = await supabase
      .from('users')
      .update({
        role: newRole,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        profiles (*)
      `)
      .single()

    if (error) throw error
    return data as UserWithProfile
  }
}
