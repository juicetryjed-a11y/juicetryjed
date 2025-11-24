import { supabase } from './supabase'
import type { UserWithProfile, CreateUserData, UpdateUserData } from '@/types/user'

export const userManagementAPI = {
  // Get all users (profiles)
  async getUsers(): Promise<UserWithProfile[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Profiles table error:', error.message)
        return []
      }

      // Map profiles to UserWithProfile structure
      return data.map((profile: any) => ({
        id: profile.id,
        email: profile.email,
        role: profile.role,
        created_at: profile.created_at,
        profile: {
          id: profile.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          avatar_url: profile.avatar_url
        }
      })) as UserWithProfile[]
    } catch (err) {
      console.warn('Error getting users:', err)
      return []
    }
  },

  // Get single user by ID
  async getUserById(id: string): Promise<UserWithProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.warn('User not found:', error.message)
        return null
      }

      return {
        id: data.id,
        email: data.email,
        role: data.role,
        created_at: data.created_at,
        profile: {
          id: data.id,
          full_name: data.full_name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          avatar_url: data.avatar_url
        }
      } as UserWithProfile
    } catch (err) {
      console.warn('Error getting user:', err)
      return null
    }
  },

  // Create new user
  async createUser(userData: CreateUserData): Promise<UserWithProfile> {
    console.log('🔵 بدء إنشاء المستخدم:', userData.email)

    try {
      // Step 1: Create auth user
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
        console.error('❌ خطأ في التسجيل:', signUpError.message)
        throw new Error(`فشل في التسجيل: ${signUpError.message}`)
      }

      if (!authData.user) {
        throw new Error('فشل في إنشاء حساب المستخدم')
      }

      console.log('✅ تم إنشاء حساب المصادقة:', authData.user.id)

      // Step 2: Create profile record
      console.log('🔵 إنشاء الملف الشخصي...')
      const { data: profileRecord, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: userData.email,
          role: userData.role || 'customer',
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          is_active: true
        })
        .select()
        .single()

      if (profileError) {
        console.error('❌ خطأ في إنشاء الملف الشخصي:', profileError)
        // If profile creation fails, we might want to try update if it already exists
        if (profileError.code === '23505') { // Unique violation
          return await this.getUserById(authData.user.id) as UserWithProfile
        }
        throw new Error(`فشل في إنشاء الملف الشخصي: ${profileError.message}`)
      }

      console.log('✅ تم إنشاء الملف الشخصي بنجاح!')

      return {
        id: profileRecord.id,
        email: profileRecord.email,
        role: profileRecord.role,
        created_at: profileRecord.created_at,
        profile: {
          id: profileRecord.id,
          full_name: profileRecord.full_name,
          phone: profileRecord.phone,
          address: profileRecord.address,
          city: profileRecord.city,
          avatar_url: profileRecord.avatar_url
        }
      } as UserWithProfile

    } catch (error: any) {
      console.error('❌ خطأ عام في إنشاء المستخدم:', error)
      throw new Error(error.message || 'فشل في إنشاء المستخدم')
    }
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserData): Promise<UserWithProfile> {
    try {
      // Update profile record
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: userData.full_name,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          role: userData.role,
          email: userData.email, // Update email in profile if needed
          avatar_url: userData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (profileError) throw profileError

      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        created_at: profile.created_at,
        profile: {
          id: profile.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          avatar_url: profile.avatar_url
        }
      } as UserWithProfile

    } catch (error: any) {
      console.error('Update user error:', error)
      throw new Error(error.message || 'فشل في تحديث المستخدم')
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    try {
      // Delete from profiles (Cascade should handle auth user if configured, but usually we can't delete auth user from client)
      // We can only delete the profile data
      const { error } = await supabase.from('profiles').delete().eq('id', id)

      if (error) throw error

      console.log('User profile deleted successfully')
    } catch (error: any) {
      console.warn('Delete operation failed:', error.message)
      throw error
    }
  },

  // Toggle user role
  async toggleUserRole(id: string, currentRole: 'admin' | 'customer'): Promise<UserWithProfile> {
    try {
      const newRole = currentRole === 'admin' ? 'customer' : 'admin'

      const { data, error } = await supabase
        .from('profiles')
        .update({
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        email: data.email,
        role: data.role,
        created_at: data.created_at,
        profile: {
          id: data.id,
          full_name: data.full_name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          avatar_url: data.avatar_url
        }
      } as UserWithProfile

    } catch (error: any) {
      console.error('Toggle role error:', error)
      throw new Error(error.message || 'فشل في تغيير دور المستخدم')
    }
  }
}
