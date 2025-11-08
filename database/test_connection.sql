-- ============================================
-- اختبار سريع للاتصال بقاعدة البيانات
-- ============================================

-- 1. فحص الجداول الموجودة
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. فحص عدد السجلات في كل جدول
SELECT 'categories' as table_name, COUNT(*) as records FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'customer_reviews', COUNT(*) FROM customer_reviews
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'site_settings', COUNT(*) FROM site_settings
UNION ALL
SELECT 'about_page_settings', COUNT(*) FROM about_page_settings;

-- 3. فحص التصنيفات
SELECT id, name, name_en, is_active, order_index
FROM categories
ORDER BY order_index;

-- 4. فحص المنتجات
SELECT 
  p.id,
  p.name,
  p.price,
  c.name as category,
  p.is_active,
  p.is_featured,
  p.rating,
  p.reviews_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;

-- 5. فحص سياسات RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as operation,
  qual as using_expression
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 6. فحص الـ Triggers
SELECT 
  trigger_name,
  event_manipulation as event,
  event_object_table as table_name,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 7. فحص الـ Functions
SELECT 
  routine_name as function_name,
  routine_type as type,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION'
ORDER BY routine_name;

-- 8. اختبار دالة is_admin()
SELECT is_admin() as is_current_user_admin;

-- 9. فحص المستخدمين الإداريين
SELECT 
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM profiles
WHERE role IN ('admin', 'manager')
ORDER BY created_at;

-- 10. فحص حجم قاعدة البيانات
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
