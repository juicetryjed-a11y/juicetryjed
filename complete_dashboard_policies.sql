-- ========================================
-- 🔐 RLS Policies الشاملة لكل الداشبورد
-- السماح بكل العمليات بدون Supabase Authentication
-- الصلاحيات تُدار من localStorage (SimpleAuthContext)
-- ========================================

-- 1️⃣ المنتجات (Products)
-- ========================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
CREATE POLICY "Allow all operations on products"
ON products FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 2️⃣ التصنيفات (Categories)
-- ========================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
CREATE POLICY "Allow all operations on categories"
ON categories FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 3️⃣ المقالات (Blog Posts)
-- ========================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on blog_posts" ON blog_posts;
CREATE POLICY "Allow all operations on blog_posts"
ON blog_posts FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 4️⃣ الإعدادات العامة (Settings)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'settings') THEN
    EXECUTE 'ALTER TABLE settings ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on settings" ON settings';
    EXECUTE 'CREATE POLICY "Allow all operations on settings" ON settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول settings';
  END IF;
END $$;

-- 5️⃣ آراء العملاء (Reviews/Testimonials)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'reviews') THEN
    EXECUTE 'ALTER TABLE reviews ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews';
    EXECUTE 'CREATE POLICY "Allow all operations on reviews" ON reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول reviews';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'testimonials') THEN
    EXECUTE 'ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on testimonials" ON testimonials';
    EXECUTE 'CREATE POLICY "Allow all operations on testimonials" ON testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول testimonials';
  END IF;
END $$;

-- 6️⃣ الشعارات (Logos)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'logos') THEN
    EXECUTE 'ALTER TABLE logos ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on logos" ON logos';
    EXECUTE 'CREATE POLICY "Allow all operations on logos" ON logos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول logos';
  END IF;
END $$;

-- 7️⃣ صفحة "من نحن" (About Page)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'about') THEN
    EXECUTE 'ALTER TABLE about ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on about" ON about';
    EXECUTE 'CREATE POLICY "Allow all operations on about" ON about FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول about';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'about_page') THEN
    EXECUTE 'ALTER TABLE about_page ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on about_page" ON about_page';
    EXECUTE 'CREATE POLICY "Allow all operations on about_page" ON about_page FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول about_page';
  END IF;
END $$;

-- 8️⃣ الفوتر (Footer)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'footer') THEN
    EXECUTE 'ALTER TABLE footer ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on footer" ON footer';
    EXECUTE 'CREATE POLICY "Allow all operations on footer" ON footer FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول footer';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'footer_settings') THEN
    EXECUTE 'ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on footer_settings" ON footer_settings';
    EXECUTE 'CREATE POLICY "Allow all operations on footer_settings" ON footer_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول footer_settings';
  END IF;
END $$;

-- 9️⃣ الألوان والثيمات (Theme/Colors)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'theme_settings') THEN
    EXECUTE 'ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on theme_settings" ON theme_settings';
    EXECUTE 'CREATE POLICY "Allow all operations on theme_settings" ON theme_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول theme_settings';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'colors') THEN
    EXECUTE 'ALTER TABLE colors ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on colors" ON colors';
    EXECUTE 'CREATE POLICY "Allow all operations on colors" ON colors FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول colors';
  END IF;
END $$;

-- 🔟 المستخدمين (Users)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    EXECUTE 'ALTER TABLE users ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on users" ON users';
    EXECUTE 'CREATE POLICY "Allow all operations on users" ON users FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول users';
  END IF;
END $$;

-- 1️⃣1️⃣ الطلبات (Orders)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
    EXECUTE 'ALTER TABLE orders ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on orders" ON orders';
    EXECUTE 'CREATE POLICY "Allow all operations on orders" ON orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول orders';
  END IF;
END $$;

-- 1️⃣2️⃣ معلومات الاتصال (Contact Info)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_info') THEN
    EXECUTE 'ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on contact_info" ON contact_info';
    EXECUTE 'CREATE POLICY "Allow all operations on contact_info" ON contact_info FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول contact_info';
  END IF;
END $$;

-- 1️⃣3️⃣ السلايدر/البانر (Sliders/Banners)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'sliders') THEN
    EXECUTE 'ALTER TABLE sliders ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on sliders" ON sliders';
    EXECUTE 'CREATE POLICY "Allow all operations on sliders" ON sliders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول sliders';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'banners') THEN
    EXECUTE 'ALTER TABLE banners ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on banners" ON banners';
    EXECUTE 'CREATE POLICY "Allow all operations on banners" ON banners FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول banners';
  END IF;
END $$;

-- 1️⃣4️⃣ الصفحات الثابتة (Static Pages)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'pages') THEN
    EXECUTE 'ALTER TABLE pages ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on pages" ON pages';
    EXECUTE 'CREATE POLICY "Allow all operations on pages" ON pages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول pages';
  END IF;
END $$;

-- 1️⃣5️⃣ روابط التواصل الاجتماعي (Social Links)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'social_links') THEN
    EXECUTE 'ALTER TABLE social_links ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on social_links" ON social_links';
    EXECUTE 'CREATE POLICY "Allow all operations on social_links" ON social_links FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول social_links';
  END IF;
END $$;

-- ========================================
-- ✅ تم تطبيق الـ Policies على كل الجداول!
-- ========================================
-- الآن الداشبورد كامل يشتغل بدون Supabase Authentication:
-- ✅ إضافة/تعديل/حذف المنتجات
-- ✅ إضافة/تعديل/حذف التصنيفات
-- ✅ إضافة/تعديل/حذف المقالات
-- ✅ تعديل الإعدادات
-- ✅ تعديل الألوان والثيمات
-- ✅ تعديل صفحة "من نحن"
-- ✅ تعديل الفوتر
-- ✅ رفع الشعارات
-- ✅ إدارة آراء العملاء
-- ✅ إدارة السلايدر/البانر
-- ✅ كل شيء في الداشبورد!
-- 
-- الصلاحيات تُدار من SimpleAuthContext (localStorage)
-- ========================================
