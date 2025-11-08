-- ========================================
-- 🔐 RLS Policies للجداول الأساسية فقط
-- (products, categories, blog_posts)
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

-- ========================================
-- ✅ تم! الآن جرب الإضافة من الداشبورد
-- ========================================
