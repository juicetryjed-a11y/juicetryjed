// نظام مسح البيانات التجريبية والبدء من الصفر
import { dataService } from './dataService'

export const resetAllData = async () => {
  console.log('🗑️ بدء مسح جميع البيانات...')
  
  try {
    // مسح localStorage
    const keys = ['products', 'categories', 'orders', 'reviews', 'blogPosts', 'users']
    keys.forEach(key => {
      localStorage.removeItem(key)
      console.log(`✅ تم مسح ${key}`)
    })
    
    // إعادة تعيين البيانات الأساسية فقط
    const basicCategories = [
      {
        id: 1,
        name: 'عصائر طبيعية',
        description: 'عصائر طازجة من الفواكه الطبيعية',
        color: '#22c55e',
        icon: '🍊',
        is_active: true,
        order_index: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    
    // حفظ تصنيف واحد أساسي فقط
    localStorage.setItem('categories', JSON.stringify(basicCategories))
    localStorage.setItem('products', JSON.stringify([]))
    localStorage.setItem('orders', JSON.stringify([]))
    localStorage.setItem('reviews', JSON.stringify([]))
    localStorage.setItem('blogPosts', JSON.stringify([]))
    
    console.log('✅ تم إعادة تعيين البيانات الأساسية')
    console.log('🎉 النظام جاهز للبدء من الصفر!')
    
    return { success: true, message: 'تم مسح جميع البيانات بنجاح' }
  } catch (error) {
    console.error('❌ خطأ في مسح البيانات:', error)
    return { success: false, message: 'حدث خطأ أثناء مسح البيانات' }
  }
}

// مسح البيانات من Supabase أيضاً (إذا كان متاحاً)
export const resetSupabaseData = async () => {
  console.log('🗑️ مسح بيانات Supabase...')
  
  if (!dataService.isUsingMockData()) {
    try {
      // هذا سيتطلب صلاحيات إدارية في Supabase
      console.log('⚠️ مسح بيانات Supabase يتطلب تنفيذ SQL مخصص')
      return { 
        success: false, 
        message: 'يرجى مسح البيانات من Supabase SQL Editor يدوياً' 
      }
    } catch (error) {
      console.error('❌ خطأ في مسح بيانات Supabase:', error)
      return { success: false, message: 'خطأ في مسح بيانات Supabase' }
    }
  }
  
  return { success: true, message: 'لا توجد بيانات Supabase لمسحها' }
}

// دالة مسح شاملة
export const completeReset = async () => {
  const localResult = await resetAllData()
  const supabaseResult = await resetSupabaseData()
  
  // إعادة تحميل الصفحة لتطبيق التغييرات
  setTimeout(() => {
    window.location.reload()
  }, 1000)
  
  return {
    local: localResult,
    supabase: supabaseResult
  }
}
