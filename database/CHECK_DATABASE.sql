-- فحص قاعدة البيانات والـ Policies
-- Database Diagnostic Check

-- ===================================
-- 1. فحص الجداول الموجودة
-- ===================================
SELECT 
    'الجداول الموجودة:' as info,
    table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ===================================
-- 2. فحص عدد السجلات في كل جدول
-- ===================================
SELECT 'عدد السجلات:' as info;

SELECT 'categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'customers', COUNT(*) FROM customers
UNION ALL
SELECT 'about_page_settings', COUNT(*) FROM about_page_settings
UNION ALL
SELECT 'site_settings', COUNT(*) FROM site_settings;

-- ===================================
-- 3. فحص الـ RLS Policies
-- ===================================
SELECT 
    'الـ Policies الموجودة:' as info,
    tablename,
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;

-- ===================================
-- 4. فحص الصلاحيات (Grants)
-- ===================================
SELECT 
    'الصلاحيات:' as info,
    table_name,
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee;

-- ===================================
-- 5. اختبار إضافة منتج تجريبي
-- ===================================
-- محاولة إضافة منتج للتأكد من عمل الـ insert
INSERT INTO products (name, slug, description, price, category_id, is_active, stock_quantity, sku)
VALUES ('منتج اختبار', 'test-product-' || floor(random() * 1000), 'منتج للاختبار فقط', 25.00, 1, true, 100, 'TEST-' || floor(random() * 1000))
RETURNING id, name, created_at;

-- ===================================
-- 6. عرض آخر 3 منتجات
-- ===================================
SELECT 
    'آخر المنتجات المضافة:' as info,
    id, 
    name, 
    price, 
    created_at 
FROM products 
ORDER BY created_at DESC 
LIMIT 3;

-- ===================================
-- 7. فحص الـ RLS على جدول products
-- ===================================
SELECT 
    'حالة RLS على products:' as info,
    relname as table_name,
    relrowsecurity as rls_enabled,
    relforcerowsecurity as rls_forced
FROM pg_class
WHERE relname = 'products';

-- ===================================
-- رسالة النتيجة
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم الفحص بنجاح!';
    RAISE NOTICE 'إذا ظهرت البيانات أعلاه، معناها قاعدة البيانات تعمل بشكل صحيح.';
    RAISE NOTICE 'إذا لم تظهر بيانات، يرجى تشغيل ملف ALL_TABLES_COMPLETE.sql أولاً.';
END $$;
