import { supabase } from './supabase'
import { mockAPI } from './mockData'
import { storageSync, SYNC_EVENTS } from './storageSync'

// فحص ما إذا كان Supabase متاح
// فحص ما إذا كان Supabase متاح
const isSupabaseConfigured = () => {
  // نعود بـ true دائماً لأننا نستخدم قيم Hardcoded في supabase.ts
  // هذا سيجبر التطبيق على استخدام قاعدة البيانات الحقيقية بدلاً من البيانات الوهمية
  return true
}

// خدمة البيانات الموحدة
export const dataService = {
  // Categories
  async getCategories() {
    if (!isSupabaseConfigured()) return mockAPI.getCategories()

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return mockAPI.getCategories()
    }
  },

  async addCategory(category: any) {
    if (!isSupabaseConfigured()) return mockAPI.addCategory(category)

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  async updateCategory(id: number, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateCategory(id, updates)

    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  async deleteCategory(id: number) {
    if (!isSupabaseConfigured()) return mockAPI.deleteCategory(id)

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  // Products
  async getProducts() {
    if (!isSupabaseConfigured()) return mockAPI.getProducts()

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return mockAPI.getProducts()
    }
  },

  async addProduct(product: any) {
    if (!isSupabaseConfigured()) return mockAPI.addProduct(product)

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single()

      if (error) throw error

      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_ADDED, data)
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)

      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  async updateProduct(id: number, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateProduct(id, updates)

    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_UPDATED, data)
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)

      return { data, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  async deleteProduct(id: number) {
    if (!isSupabaseConfigured()) return mockAPI.deleteProduct(id)

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_DELETED, { id })
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)

      return { data: null, error: null }
    } catch (error) {
      console.error('Database Error:', error)
      return { data: null, error }
    }
  },

  // Orders
  async getOrders() {
    if (!isSupabaseConfigured()) return mockAPI.getOrders()

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getOrders()
    }
  },

  async updateOrder(id: number, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateOrder(id, updates)

    try {
      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Reviews
  async getReviews() {
    if (!isSupabaseConfigured()) return mockAPI.getReviews()

    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getReviews()
    }
  },

  async updateReview(id: number, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateReview(id, updates)

    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async deleteReview(id: number) {
    if (!isSupabaseConfigured()) return mockAPI.deleteReview(id)

    try {
      const { error } = await supabase
        .from('customer_reviews')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Blog Posts
  async getBlogPosts() {
    if (!isSupabaseConfigured()) return mockAPI.getBlogPosts()

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getBlogPosts()
    }
  },

  async addBlogPost(post: any) {
    if (!isSupabaseConfigured()) return mockAPI.addBlogPost(post)

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async updateBlogPost(id: number, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateBlogPost(id, updates)

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async deleteBlogPost(id: number) {
    if (!isSupabaseConfigured()) return mockAPI.deleteBlogPost(id)

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Image Upload
  async uploadImage(file: File, folder: string = 'uploads') {
    if (!isSupabaseConfigured()) return mockAPI.uploadImage(file)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return {
        success: true,
        url: urlData.publicUrl
      }
    } catch (error) {
      console.error('Upload Error:', error)
      return { success: false, url: '' }
    }
  },

  // Users Management
  async getUsers() {
    if (!isSupabaseConfigured()) return mockAPI.getUsers()

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getUsers()
    }
  },

  async addUser(user: any) {
    if (!isSupabaseConfigured()) return mockAPI.addUser(user)

    try {
      // Create user in Auth first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password || 'defaultPassword123'
      })

      if (authError) throw authError

      // Add user profile
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user?.id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          role: user.role,
          is_active: user.is_active
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async updateUser(id: string, updates: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateUser(id, updates)

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async deleteUser(id: string) {
    if (!isSupabaseConfigured()) return mockAPI.deleteUser(id)

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // About Page Settings
  async getAboutPageSettings() {
    if (!isSupabaseConfigured()) return mockAPI.getAboutPageSettings()

    try {
      const { data, error } = await supabase
        .from('about_page_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getAboutPageSettings()
    }
  },

  async updateAboutPageSettings(settings: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateAboutPageSettings(settings)

    try {
      const { data: existing } = await supabase
        .from('about_page_settings')
        .select('id')
        .limit(1)
        .maybeSingle()

      let result
      if (existing?.id) {
        result = await supabase
          .from('about_page_settings')
          .update({ ...settings, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('about_page_settings')
          .insert([{ ...settings, updated_at: new Date().toISOString() }])
          .select()
          .single()
      }

      if (result.error) throw result.error
      return { data: result.data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Site Settings
  async getSiteSettings() {
    if (!isSupabaseConfigured()) return mockAPI.getSiteSettings()

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) throw error
      return { data: data ? [data] : [{}], error: null }
    } catch (error) {
      return mockAPI.getSiteSettings()
    }
  },

  async updateSiteSettings(settings: any) {
    if (!isSupabaseConfigured()) return mockAPI.updateSiteSettings(settings)

    try {
      const { id, ...settingsWithoutId } = settings

      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle()

      const cleanSettings = Object.fromEntries(
        Object.entries(settingsWithoutId).filter(([_, v]) => v !== undefined && v !== null)
      )

      let result
      if (existing?.id) {
        result = await supabase
          .from('site_settings')
          .update({ ...cleanSettings, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
      } else {
        result = await supabase
          .from('site_settings')
          .insert([{ ...cleanSettings, updated_at: new Date().toISOString() }])
          .select()
      }

      if (result.error) throw result.error
      return { data: result.data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  isUsingMockData: () => !isSupabaseConfigured()
}
