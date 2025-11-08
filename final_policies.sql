-- ========================================
-- 🔐 RLS Policies النهائية لكل الداشبورد
-- السماح بكل العمليات لـ anon (بدون authentication)
-- ========================================

-- 1️⃣ المنتجات (Products)
-- ========================================
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
CREATE POLICY "Allow all operations on products"
ON products FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 2️⃣ التصنيفات (Categories)
-- ========================================
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
CREATE POLICY "Allow all operations on categories"
ON categories FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 3️⃣ المقالات (Blog Posts)
-- ========================================
DROP POLICY IF EXISTS "Allow all operations on blog_posts" ON blog_posts;
CREATE POLICY "Allow all operations on blog_posts"
ON blog_posts FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 4️⃣ الإعدادات (Settings) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'settings') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on settings" ON settings';
    EXECUTE 'CREATE POLICY "Allow all operations on settings" ON settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول settings';
  ELSE
    RAISE NOTICE '⚠️ جدول settings غير موجود';
  END IF;
END $$;

-- 5️⃣ آراء العملاء (Reviews) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'reviews') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews';
    EXECUTE 'CREATE POLICY "Allow all operations on reviews" ON reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول reviews';
  ELSE
    RAISE NOTICE '⚠️ جدول reviews غير موجود';
  END IF;
END $$;

-- 6️⃣ الشعارات (Logos) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'logos') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on logos" ON logos';
    EXECUTE 'CREATE POLICY "Allow all operations on logos" ON logos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول logos';
  ELSE
    RAISE NOTICE '⚠️ جدول logos غير موجود';
  END IF;
END $$;

-- 7️⃣ معلومات "من نحن" (About) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'about') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on about" ON about';
    EXECUTE 'CREATE POLICY "Allow all operations on about" ON about FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول about';
  ELSE
    RAISE NOTICE '⚠️ جدول about غير موجود';
  END IF;
END $$;

-- 8️⃣ الألوان والثيمات (Theme) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'theme_settings') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on theme_settings" ON theme_settings';
    EXECUTE 'CREATE POLICY "Allow all operations on theme_settings" ON theme_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول theme_settings';
  ELSE
    RAISE NOTICE '⚠️ جدول theme_settings غير موجود';
  END IF;
END $$;

-- 9️⃣ المستخدمين (Users) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on users" ON users';
    EXECUTE 'CREATE POLICY "Allow all operations on users" ON users FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول users';
  ELSE
    RAISE NOTICE '⚠️ جدول users غير موجود';
  END IF;
END $$;

-- 🔟 الطلبات (Orders) - إذا موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow all operations on orders" ON orders';
    EXECUTE 'CREATE POLICY "Allow all operations on orders" ON orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)';
    RAISE NOTICE '✅ تم تطبيق policies على جدول orders';
  ELSE
    RAISE NOTICE '⚠️ جدول orders غير موجود';
  END IF;
END $$;

-- ========================================
-- ✅ تم تطبيق الـ Policies على كل الجداول!
-- ========================================
-- الآن الداشبورد كامل يشتغل:
-- ✅ إضافة/تعديل/حذف المنتجات
-- ✅ إضافة/تعديل/حذف التصنيفات
-- ✅ إضافة/تعديل/حذف المقالات
-- ✅ تعديل الإعدادات (الألوان، اللوجو، من نحن)
-- ✅ إدارة آراء العملاء
-- ✅ كل شيء في الداشبورد!
-- ========================================
