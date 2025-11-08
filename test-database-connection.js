// اختبار الاتصال بقاعدة البيانات
// تشغيل هذا الملف: node test-database-connection.js

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// تحميل متغيرات البيئة
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 اختبار الاتصال بقاعدة البيانات...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? 'موجود ✅' : 'غير موجود ❌')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ خطأ: متغيرات البيئة غير مُعدة بشكل صحيح')
  console.log('تأكد من تحديث ملف .env بالقيم الصحيحة')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔄 جاري اختبار الاتصال...')
    
    // اختبار الاتصال بقاعدة البيانات
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)')
      .limit(1)
    
    if (error) {
      console.error('❌ خطأ في الاتصال:', error.message)
      return false
    }
    
    console.log('✅ الاتصال بقاعدة البيانات ناجح!')
    
    // اختبار الجداول
    const tables = ['profiles', 'categories', 'products', 'orders', 'customer_reviews', 'blog_posts']
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count(*)')
        .limit(1)
      
      if (error) {
        console.log(`❌ جدول ${table}: غير موجود`)
      } else {
        console.log(`✅ جدول ${table}: موجود`)
      }
    }
    
    console.log('\n🎉 قاعدة البيانات جاهزة للاستخدام!')
    return true
    
  } catch (error) {
    console.error('❌ خطأ في الاختبار:', error.message)
    return false
  }
}

testConnection()
