-- تعطيل RLS لجميع الجداول
-- Disable RLS for All Tables

-- ===================================
-- تعطيل RLS لجميع الجداول
-- ===================================

-- Products
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Categories
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Orders
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Order Items
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Reviews
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Blog Posts
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- Customers
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;

-- About Page Settings
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;

-- Site Settings
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- Header Settings
ALTER TABLE header_settings DISABLE ROW LEVEL SECURITY;

-- Contact Settings
ALTER TABLE contact_settings DISABLE ROW LEVEL SECURITY;

-- Slider Settings
ALTER TABLE slider_settings DISABLE ROW LEVEL SECURITY;

-- Users (إذا كان موجود)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        ALTER TABLE users DISABLE ROW LEVEL SECURITY;
        RAISE NOTICE '✅ تم تعطيل RLS لجدول users';
    END IF;
END $$;

-- Profiles (إذا كان موجود)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
        ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
        RAISE NOTICE '✅ تم تعطيل RLS لجدول profiles';
    END IF;
END $$;

-- ===================================
-- التحقق من حالة RLS
-- ===================================
SELECT 
    tablename as "اسم الجدول",
    CASE 
        WHEN rowsecurity THEN '🔒 مفعل'
        ELSE '🔓 معطل'
    END as "حالة RLS"
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم تعطيل RLS لجميع الجداول!';
    RAISE NOTICE '🔓 الآن يمكن الوصول لجميع الجداول بدون قيود!';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️ تحذير: تعطيل RLS يعني أن أي شخص يمكنه:';
    RAISE NOTICE '   - قراءة جميع البيانات';
    RAISE NOTICE '   - إضافة بيانات جديدة';
    RAISE NOTICE '   - تعديل البيانات الموجودة';
    RAISE NOTICE '   - حذف البيانات';
    RAISE NOTICE '';
    RAISE NOTICE '💡 إذا أردت تفعيل RLS مرة أخرى، استخدم:';
    RAISE NOTICE '   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;';
END $$;
