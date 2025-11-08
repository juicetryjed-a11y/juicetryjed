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

  // Create new user - direct approach
  async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    try {
      console.log('Starting user creation for:', userData.email)
      
      // Step 1: Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            address: userData.address,
            city: userData.city
          }
        }
      })

      if (signUpError) {
        console.error('Sign up error:', signUpError)
        throw new Error(`فشل في التسجيل: ${signUpError.message}`)
      }

      if (!authData.user) {
        throw new Error('فشل في إنشاء حساب المستخدم')
      }

      console.log('Auth user created:', authData.user.id)

      // Step 2: Wait for trigger or create manually
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Step 3: Try to get the user record
      let { data: userRecord, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          profiles (*)
        `)
        .eq('id', authData.user.id)
        .single()

      if (userError && userError.code === 'PGRST116') {
        // User record doesn't exist, create it manually
        console.log('Creating user record manually...')
        
        // Create user record
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email,
            role: userData.role || 'customer'
          })
          .select()
          .single()

        if (createError) {
          console.error('Create user error:', createError)
          throw new Error(`فشل في إنشاء سجل المستخدم: ${createError.message}`)
        }

        // Create profile record
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: userData.full_name,
            phone: userData.phone,
            address: userData.address,
            city: userData.city
          })
          .select()
          .single()

        if (profileError) {
          console.error('Create profile error:', profileError)
          // Don't throw error, user was created successfully
        }

        userRecord = {
          ...newUser,
          profile: newProfile
        }
      } else if (userError) {
        console.error('Get user error:', userError)
        throw new Error(`فشل في الحصول على بيانات المستخدم: ${userError.message}`)
      }

      console.log('User creation completed successfully')
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

  // Delete user
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
