-- ✅ تفعيل القراءة العامة للمنتجات
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to products" ON products;
CREATE POLICY "Allow public read access to products"
ON products FOR SELECT
TO anon
USING (true);

-- ✅ تفعيل القراءة العامة للتصنيفات
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to categories" ON categories;
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
TO anon
USING (true);

-- ✅ تفعيل القراءة العامة للمقالات
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to blog_posts" ON blog_posts;
CREATE POLICY "Allow public read access to blog_posts"
ON blog_posts FOR SELECT
TO anon
USING (true);

-- ✅ السماح للـ Admin بكل العمليات على المنتجات
DROP POLICY IF EXISTS "Allow admin full access to products" ON products;
CREATE POLICY "Allow admin full access to products"
ON products FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ✅ السماح للـ Admin بكل العمليات على التصنيفات
DROP POLICY IF EXISTS "Allow admin full access to categories" ON categories;
CREATE POLICY "Allow admin full access to categories"
ON categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ✅ السماح للـ Admin بكل العمليات على المقالات
DROP POLICY IF EXISTS "Allow admin full access to blog_posts" ON blog_posts;
CREATE POLICY "Allow admin full access to blog_posts"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
