-- إصلاح الـ RLS Policies لحل مشكلة الحفظ
-- Fix RLS Policies to Enable Saving

-- ===================================
-- حذف جميع الـ Policies القديمة
-- ===================================
DROP POLICY IF EXISTS "Allow all on categories" ON categories;
DROP POLICY IF EXISTS "Allow all on products" ON products;
DROP POLICY IF EXISTS "Allow all on orders" ON orders;
DROP POLICY IF EXISTS "Allow all on order_items" ON order_items;
DROP POLICY IF EXISTS "Allow all on reviews" ON reviews;
DROP POLICY IF EXISTS "Allow all on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all on customers" ON customers;
DROP POLICY IF EXISTS "Allow all on about_page_settings" ON about_page_settings;
DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow all on header_settings" ON header_settings;
DROP POLICY IF EXISTS "Allow all on contact_settings" ON contact_settings;
DROP POLICY IF EXISTS "Allow all on slider_settings" ON slider_settings;

-- ===================================
-- إنشاء Policies جديدة صحيحة
-- ===================================

-- Categories
CREATE POLICY "Enable all for categories"
ON categories
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Products
CREATE POLICY "Enable all for products"
ON products
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Orders
CREATE POLICY "Enable all for orders"
ON orders
FOR ALL
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all for order_items"
ON order_items
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Reviews
CREATE POLICY "Enable all for reviews"
ON reviews
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Blog Posts
CREATE POLICY "Enable all for blog_posts"
ON blog_posts
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Customers
CREATE POLICY "Enable all for customers"
ON customers
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- About Page Settings
CREATE POLICY "Enable all for about_page_settings"
ON about_page_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Site Settings
CREATE POLICY "Enable all for site_settings"
ON site_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Header Settings
CREATE POLICY "Enable all for header_settings"
ON header_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Contact Settings
CREATE POLICY "Enable all for contact_settings"
ON contact_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Slider Settings
CREATE POLICY "Enable all for slider_settings"
ON slider_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- ===================================
-- منح الصلاحيات الكاملة
-- ===================================
GRANT ALL ON categories TO anon, authenticated, public;
GRANT ALL ON products TO anon, authenticated, public;
GRANT ALL ON orders TO anon, authenticated, public;
GRANT ALL ON order_items TO anon, authenticated, public;
GRANT ALL ON reviews TO anon, authenticated, public;
GRANT ALL ON blog_posts TO anon, authenticated, public;
GRANT ALL ON customers TO anon, authenticated, public;
GRANT ALL ON about_page_settings TO anon, authenticated, public;
GRANT ALL ON site_settings TO anon, authenticated, public;
GRANT ALL ON header_settings TO anon, authenticated, public;
GRANT ALL ON contact_settings TO anon, authenticated, public;
GRANT ALL ON slider_settings TO anon, authenticated, public;

-- منح صلاحيات الـ sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, public;

-- ===================================
-- اختبار الإضافة
-- ===================================
-- محاولة إضافة منتج للتأكد
INSERT INTO products (name, slug, description, price, is_active, stock_quantity, sku)
VALUES (
    'منتج اختبار الـ Policy',
    'policy-test-' || floor(random() * 10000),
    'هذا منتج للتأكد من عمل الـ Policies',
    99.99,
    true,
    50,
    'POL-TEST-' || floor(random() * 10000)
)
RETURNING id, name, 'تم الإضافة بنجاح!' as status;

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم حذف جميع الـ Policies القديمة!';
    RAISE NOTICE '✅ تم إنشاء Policies جديدة صحيحة!';
    RAISE NOTICE '✅ تم منح جميع الصلاحيات!';
    RAISE NOTICE '✅ تم اختبار الإضافة بنجاح!';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 الآن يمكنك الإضافة والتعديل والحذف بدون مشاكل!';
    RAISE NOTICE '🔄 أعد تحميل صفحة الداشبورد وجرب الإضافة مرة أخرى.';
END $$;
