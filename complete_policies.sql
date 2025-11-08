-- ========================================
-- 🔐 RLS Policies الشاملة لكل جداول الداشبورد
-- ========================================

-- 1️⃣ المنتجات (Products)
-- ========================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read products" ON products;
CREATE POLICY "Allow public read products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on products" ON products;
CREATE POLICY "Allow authenticated all on products"
ON products FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 2️⃣ التصنيفات (Categories)
-- ========================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read categories" ON categories;
CREATE POLICY "Allow public read categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;
CREATE POLICY "Allow authenticated all on categories"
ON categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 3️⃣ المقالات (Blog Posts)
-- ========================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read blog_posts" ON blog_posts;
CREATE POLICY "Allow public read blog_posts"
ON blog_posts FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on blog_posts" ON blog_posts;
CREATE POLICY "Allow authenticated all on blog_posts"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4️⃣ آراء العملاء (Reviews)
-- ========================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read reviews" ON reviews;
CREATE POLICY "Allow public read reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on reviews" ON reviews;
CREATE POLICY "Allow authenticated all on reviews"
ON reviews FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5️⃣ الإعدادات (Settings)
-- ========================================
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read settings" ON settings;
CREATE POLICY "Allow public read settings"
ON settings FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on settings" ON settings;
CREATE POLICY "Allow authenticated all on settings"
ON settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 6️⃣ المستخدمين (Users) - إذا كان الجدول موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'users') THEN
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Allow authenticated read users" ON users;
    CREATE POLICY "Allow authenticated read users"
    ON users FOR SELECT
    TO authenticated
    USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated all on users" ON users;
    CREATE POLICY "Allow authenticated all on users"
    ON users FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- 7️⃣ الألوان والثيمات (Theme/Colors) - إذا كان الجدول موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'theme_settings') THEN
    ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Allow public read theme" ON theme_settings;
    CREATE POLICY "Allow public read theme"
    ON theme_settings FOR SELECT
    TO anon, authenticated
    USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated all on theme" ON theme_settings;
    CREATE POLICY "Allow authenticated all on theme"
    ON theme_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- 8️⃣ صفحة "من نحن" (About) - إذا كان الجدول موجود
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'about_page') THEN
    ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Allow public read about" ON about_page;
    CREATE POLICY "Allow public read about"
    ON about_page FOR SELECT
    TO anon, authenticated
    USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated all on about" ON about_page;
    CREATE POLICY "Allow authenticated all on about"
    ON about_page FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- ========================================
-- ✅ تم تطبيق الـ Policies بنجاح!
-- ========================================
-- الآن:
-- 1. أي حد يقدر يقرأ البيانات (للموقع العام)
-- 2. المستخدمين المسجلين يقدروا يضيفوا ويعدلوا ويحذفوا
-- 3. الداشبورد هيشتغل بشكل كامل
-- ========================================
