import { supabase } from './supabase'
import { mockAPI } from './mockData'
import { storageSync, SYNC_EVENTS } from './storageSync'

// فحص ما إذا كان Supabase متاح
const isSupabaseConfigured = () => {
  // إجبار استخدام Supabase (تعطيل Mock Data)
  console.log('🚀 إجبار استخدام Supabase')
  console.log('✅ Supabase متصل: https://ijpugtvfckmptzegdchr.supabase.co')
  console.log('✅ استخدام قاعدة البيانات الحقيقية')
  
  // دائماً نرجع true لاستخدام Supabase
  return true
}

// خدمة البيانات الموحدة
export const dataService = {
  // Categories
  async getCategories() {
    if (!isSupabaseConfigured()) {
      console.log('🔄 استخدام البيانات التجريبية - Supabase غير مُعد')
      return mockAPI.getCategories()
    }
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index')
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.log('⚠️ خطأ في قاعدة البيانات، التبديل للبيانات التجريبية')
      return mockAPI.getCategories()
    }
  },

  async addCategory(category: any) {
    if (!isSupabaseConfigured()) {
      console.log('⚠️ addCategory: Supabase غير مُعد، استخدام Mock Data')
      return mockAPI.addCategory(category)
    }
    
    try {
      console.log('📝 addCategory: محاولة الإضافة إلى Supabase...', category)
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single()
      
      if (error) {
        console.error('❌ addCategory: خطأ من Supabase:', error)
        throw error
      }
      console.log('✅ addCategory: تم الإضافة بنجاح!', data)
      return { data, error: null }
    } catch (error) {
      console.error('❌ addCategory: فشل، التبديل إلى Mock Data:', error)
      return mockAPI.addCategory(category)
    }
  },

  async updateCategory(id: number, updates: any) {
    if (!isSupabaseConfigured()) {
      return mockAPI.updateCategory(id, updates)
    }
    
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
      return mockAPI.updateCategory(id, updates)
    }
  },

  async deleteCategory(id: number) {
    if (!isSupabaseConfigured()) {
      return mockAPI.deleteCategory(id)
    }
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return mockAPI.deleteCategory(id)
    }
  },

  // Products
  async getProducts() {
    console.log('🔍 dataService.getProducts: بدء جلب المنتجات')
    console.log('🔍 dataService.getProducts: Supabase configured?', isSupabaseConfigured())
    
    if (!isSupabaseConfigured()) {
      console.log('⚠️ dataService.getProducts: استخدام mockAPI')
      return mockAPI.getProducts()
    }
    
    try {
      console.log('📡 dataService.getProducts: جلب من Supabase...')
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      console.log('📊 dataService.getProducts: Response data:', data)
      console.log('📊 dataService.getProducts: Response error:', error)
      console.log('📊 dataService.getProducts: عدد المنتجات:', data?.length || 0)
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('❌ dataService.getProducts: خطأ في Supabase:', error)
      console.log('🔄 dataService.getProducts: التبديل إلى mockAPI')
      return mockAPI.getProducts()
    }
  },

  async addProduct(product: any) {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, using mockAPI')
      return await mockAPI.addProduct(product)
    }
    
    try {
      console.log('🔄 Adding product to Supabase:', product)
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single()
      
      if (error) {
        console.error('❌ Supabase insert error:', error)
        throw error
      }
      
      console.log('✅ Product added successfully:', data)
      
      // إرسال حدث تحديث البيانات
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_ADDED, data)
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)
      
      return { data, error: null }
    } catch (error: any) {
      console.error('❌ Failed to add product:', error.message || error)
      return { data: null, error: error.message || 'Failed to add product' }
    }
  },

  async updateProduct(id: number, updates: any) {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, using mockAPI')
      return await mockAPI.updateProduct(id, updates)
    }
    
    try {
      console.log('🔄 Updating product in Supabase:', id, updates)
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Supabase update error:', error)
        throw error
      }
      
      console.log('✅ Product updated successfully:', data)
      
      // إرسال حدث تحديث البيانات
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_UPDATED, data)
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)
      
      return { data, error: null }
    } catch (error: any) {
      console.error('❌ Failed to update product:', error.message || error)
      return { data: null, error: error.message || 'Failed to update product' }
    }
  },

  async deleteProduct(id: number) {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, using mockAPI')
      return await mockAPI.deleteProduct(id)
    }
    
    try {
      console.log('🔄 Deleting product from Supabase:', id)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('❌ Supabase delete error:', error)
        throw error
      }
      
      console.log('✅ Product deleted successfully')
      
      // إرسال حدث تحديث البيانات
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCT_DELETED, { id })
      storageSync.notifyDataUpdate(SYNC_EVENTS.PRODUCTS_REFRESH)
      
      return { data: null, error: null }
    } catch (error: any) {
      console.error('❌ Failed to delete product:', error.message || error)
      return { data: null, error: error.message || 'Failed to delete product' }
    }
  },

  // Orders
  async getOrders() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getOrders()
    }
    
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
    if (!isSupabaseConfigured()) {
      return mockAPI.updateOrder(id, updates)
    }
    
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
      return mockAPI.updateOrder(id, updates)
    }
  },

  // Reviews
  async getReviews() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getReviews()
    }
    
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
    if (!isSupabaseConfigured()) {
      return mockAPI.updateReview(id, updates)
    }
    
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
      return mockAPI.updateReview(id, updates)
    }
  },

  async deleteReview(id: number) {
    if (!isSupabaseConfigured()) {
      return mockAPI.deleteReview(id)
    }
    
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return mockAPI.deleteReview(id)
    }
  },

  // Blog Posts
  async getBlogPosts() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getBlogPosts()
    }
    
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
    if (!isSupabaseConfigured()) {
      return mockAPI.addBlogPost(post)
    }
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.addBlogPost(post)
    }
  },

  async updateBlogPost(id: number, updates: any) {
    if (!isSupabaseConfigured()) {
      return mockAPI.updateBlogPost(id, updates)
    }
    
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
      return mockAPI.updateBlogPost(id, updates)
    }
  },

  async deleteBlogPost(id: number) {
    if (!isSupabaseConfigured()) {
      return mockAPI.deleteBlogPost(id)
    }
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return mockAPI.deleteBlogPost(id)
    }
  },

  // Image Upload
  async uploadImage(file: File, folder: string = 'uploads') {
    if (!isSupabaseConfigured()) {
      console.log('🔄 محاكاة رفع الصورة - Supabase غير مُعد')
      return mockAPI.uploadImage(file)
    }
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { data, error } = await supabase.storage
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
      console.log('⚠️ خطأ في رفع الصورة، استخدام رابط تجريبي')
      return mockAPI.uploadImage(file)
    }
  },

  // Users Management
  async getUsers() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getUsers()
    }
    
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
    if (!isSupabaseConfigured()) {
      return mockAPI.addUser(user)
    }
    
    try {
      // إنشاء المستخدم في Auth أولاً
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password || 'defaultPassword123'
      })

      if (authError) throw authError

      // إضافة بيانات المستخدم في جدول profiles
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
      return mockAPI.addUser(user)
    }
  },

  async updateUser(id: string, updates: any) {
    if (!isSupabaseConfigured()) {
      return mockAPI.updateUser(id, updates)
    }
    
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
      return mockAPI.updateUser(id, updates)
    }
  },

  async deleteUser(id: string) {
    if (!isSupabaseConfigured()) {
      return mockAPI.deleteUser(id)
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      return mockAPI.deleteUser(id)
    }
  },

  // About Page Settings
  async getAboutPageSettings() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getAboutPageSettings()
    }
    
    try {
      const { data, error } = await supabase
        .from('about_page_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return mockAPI.getAboutPageSettings()
    }
  },

  async updateAboutPageSettings(settings: any) {
    if (!isSupabaseConfigured()) {
      return mockAPI.updateAboutPageSettings(settings)
    }
    
    try {
      // First, try to get existing settings
      const { data: existing } = await supabase
        .from('about_page_settings')
        .select('id')
        .limit(1)
        .single()
      
      let result
      if (existing && existing.id) {
        // Update existing record
        result = await supabase
          .from('about_page_settings')
          .update({
            ...settings,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
          .select()
          .single()
      } else {
        // Insert new record
        result = await supabase
          .from('about_page_settings')
          .insert([{
            ...settings,
            updated_at: new Date().toISOString()
          }])
          .select()
          .single()
      }
      
      if (result.error) throw result.error
      return { data: result.data, error: null }
    } catch (error) {
      console.error('Error updating about page settings:', error)
      return mockAPI.updateAboutPageSettings(settings)
    }
  },

  async getSiteSettings() {
    if (!isSupabaseConfigured()) {
      return mockAPI.getSiteSettings()
    }
    
    try {
      console.log('🔍 Getting site settings from Supabase...')
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle()
      
      if (error) {
        console.error('❌ Error getting site settings:', error)
        throw error
      }
      
      console.log('✅ Site settings retrieved:', data)
      return { data: data ? [data] : [{}], error: null }
    } catch (error) {
      console.error('❌ Failed to get site settings, using mock data:', error)
      return mockAPI.getSiteSettings()
    }
  },

  async updateSiteSettings(settings: any) {
    if (!isSupabaseConfigured()) {
      return mockAPI.updateSiteSettings(settings)
    }
    
    try {
      console.log('🔄 Updating site settings:', settings)
      
      // أولاً: احذف الـ id من الـ settings لتجنب التضارب
      const { id, ...settingsWithoutId } = settings
      
      // تحقق من وجود صف
      const { data: existingData, error: checkError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
      
      if (checkError) {
        console.error('❌ Error checking existing settings:', checkError)
        throw checkError
      }
      
      let result
      
      if (existingData && existingData.length > 0) {
        // تحديث الصف الموجود
        console.log('📝 Updating existing settings with ID:', existingData[0].id)
        result = await supabase
          .from('site_settings')
          .update({
            ...settingsWithoutId,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData[0].id)
          .select()
          .maybeSingle()
      } else {
        // إنشاء صف جديد
        console.log('➕ Creating new settings...')
        result = await supabase
          .from('site_settings')
          .insert([{
            ...settingsWithoutId,
            updated_at: new Date().toISOString()
          }])
          .select()
          .maybeSingle()
      }
      
      if (result.error) {
        console.error('❌ Supabase update error:', result.error)
        throw result.error
      }
      
      console.log('✅ Site settings updated successfully:', result.data)
      return { data: result.data, error: null }
    } catch (error: any) {
      console.error('❌ Failed to update site settings:', error.message || error)
      return { data: null, error: error.message || 'Failed to update settings' }
    }
  },

  // Check if using mock data
  isUsingMockData: () => !isSupabaseConfigured()
}
