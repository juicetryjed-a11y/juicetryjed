import { supabase } from './supabase'
import type { User, UserWithProfile, CreateUserData, UpdateUserData } from '@/types/user'

export const userManagementAPI = {
  // Get all users with their profiles
  async getUsers(): Promise<UserWithProfile[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          profiles (*)
        `)
        .order('created_at', { ascending: false})

      if (error) {
        console.warn('Users table error:', error.message)
        return []
      }
      
      return data as UserWithProfile[]
    } catch (err) {
      console.warn('Error getting users:', err)
      return []
    }
  },

  // Get single user by ID
  async getUserById(id: string): Promise<UserWithProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          profiles (*)
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.warn('User not found:', error.message)
        return null
      }
      
      return data as UserWithProfile
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

      // Step 2: Create user record
      console.log('🔵 إنشاء سجل المستخدم في الجدول...')
      const { data: userRecord, error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          role: userData.role || 'customer'
        })
        .select()
        .single()

      if (userError) {
        console.error('❌ خطأ في إنشاء سجل المستخدم:', userError)
        throw new Error(`فشل في إنشاء سجل المستخدم: ${userError.message}`)
      }

      console.log('✅ تم إنشاء سجل المستخدم')

      // Step 3: Create profile record
      console.log('🔵 إنشاء الملف الشخصي...')
      const { data: profileRecord, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || ''
        })
        .select()
        .single()

      if (profileError) {
        console.error('❌ خطأ في إنشاء الملف الشخصي:', profileError)
        throw new Error(`فشل في إنشاء الملف الشخصي: ${profileError.message}`)
      }

      console.log('✅ تم إنشاء الملف الشخصي بنجاح!')

      // Return the created user
      return {
        ...userRecord,
        profile: profileRecord
      } as UserWithProfile

    } catch (error: any) {
      console.error('❌ خطأ عام في إنشاء المستخدم:', error)
      throw new Error(error.message || 'فشل في إنشاء المستخدم')
    }
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserData): Promise<UserWithProfile> {
    try {
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

      if (profileError) console.warn('Profile update failed:', profileError)

      return {
        ...userRecord,
        profile
      } as UserWithProfile

    } catch (error: any) {
      console.error('Update user error:', error)
      throw new Error(error.message || 'فشل في تحديث المستخدم')
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    try {
      await supabase.from('profiles').delete().eq('id', id)
      await supabase.from('users').delete().eq('id', id)
      console.log('User deleted successfully')
    } catch (error: any) {
      console.warn('Delete operation failed:', error.message)
    }
  },

  // Toggle user role
  async toggleUserRole(id: string, currentRole: 'admin' | 'customer'): Promise<UserWithProfile> {
    try {
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

    } catch (error: any) {
      console.error('Toggle role error:', error)
      throw new Error(error.message || 'فشل في تغيير دور المستخدم')
    }
  }
}
