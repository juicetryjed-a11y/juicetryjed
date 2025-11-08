-- تفعيل RLS لجميع الجداول
-- Enable RLS for All Tables

-- ===================================
-- تفعيل RLS لجميع الجداول
-- ===================================

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Order Items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Blog Posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Customers
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- About Page Settings
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Header Settings
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

-- Contact Settings
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Slider Settings
ALTER TABLE slider_settings ENABLE ROW LEVEL SECURITY;

-- Users (إذا كان موجود)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE '✅ تم تفعيل RLS لجدول users';
    END IF;
END $$;

-- Profiles (إذا كان موجود)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE '✅ تم تفعيل RLS لجدول profiles';
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
    RAISE NOTICE '✅ تم تفعيل RLS لجميع الجداول!';
    RAISE NOTICE '🔒 الآن الوصول للجداول محمي بالـ Policies!';
    RAISE NOTICE '';
    RAISE NOTICE '💡 تأكد من وجود Policies صحيحة للسماح بالوصول.';
    RAISE NOTICE '   إذا لم تكن هناك Policies، لن يتمكن أحد من الوصول للبيانات!';
END $$;
