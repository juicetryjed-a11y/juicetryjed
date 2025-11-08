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

  // Create new user using RPC function
  async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    try {
      // Call the RPC function to create user
      const { data, error } = await supabase.rpc('create_user_admin', {
        user_email: userData.email,
        user_password: userData.password,
        user_role: userData.role || 'customer',
        user_full_name: userData.full_name,
        user_phone: userData.phone,
        user_address: userData.address,
        user_city: userData.city
      })

      if (error) throw error
      if (!data) throw new Error('Failed to create user')

      return data as UserWithProfile
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

    // Delete auth user using RPC
    const { error: authError } = await supabase.rpc('delete_auth_user', {
      user_id: id
    })

    if (authError) {
      console.warn('Auth user deletion failed:', authError.message)
      // Continue anyway as the main user record is deleted
    }
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
