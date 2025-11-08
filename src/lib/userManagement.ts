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

  // Create new user (admin only)
  async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    // First create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Failed to create auth user')

    // Then create user record
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email,
        role: userData.role || 'customer'
      })
      .select()
      .single()

    if (userError) throw userError

    // Create profile record
    const { data: profile, error: profileError } = await supabase
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

    if (profileError) throw profileError

    return {
      ...userRecord,
      profile
    } as UserWithProfile
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

    // Delete auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(id)
    if (authError) throw authError
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
