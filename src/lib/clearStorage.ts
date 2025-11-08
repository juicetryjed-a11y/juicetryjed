// مسح localStorage وإعادة تحميل البيانات الافتراضية
export const clearAllStorage = () => {
  const keys = ['products', 'categories', 'orders', 'reviews', 'blogPosts', 'users']
  
  keys.forEach(key => {
    localStorage.removeItem(key)
    console.log(`🗑️ تم مسح ${key} من localStorage`)
  })
  
  console.log('✅ تم مسح جميع البيانات المحفوظة - سيتم تحميل البيانات الافتراضية')
  
  // إعادة تحميل الصفحة لتحميل البيانات الجديدة
  window.location.reload()
}

// تشغيل المسح تلقائياً عند استيراد الملف
if (typeof window !== 'undefined') {
  // فقط في المتصفح
  console.log('🔄 مسح البيانات القديمة وتحميل البيانات الجديدة...')
  clearAllStorage()
}
