-- إصلاح الـ RLS Policies - نسخة محدثة
-- Fix RLS Policies - Updated Version

-- ===================================
-- حذف جميع الـ Policies (جميع الأسماء الممكنة)
-- ===================================

-- Categories
DROP POLICY IF EXISTS "Allow all on categories" ON categories;
DROP POLICY IF EXISTS "Enable all for categories" ON categories;
DROP POLICY IF EXISTS "categories_policy" ON categories;

-- Products
DROP POLICY IF EXISTS "Allow all on products" ON products;
DROP POLICY IF EXISTS "Enable all for products" ON products;
DROP POLICY IF EXISTS "products_policy" ON products;

-- Orders
DROP POLICY IF EXISTS "Allow all on orders" ON orders;
DROP POLICY IF EXISTS "Enable all for orders" ON orders;
DROP POLICY IF EXISTS "orders_policy" ON orders;

-- Order Items
DROP POLICY IF EXISTS "Allow all on order_items" ON order_items;
DROP POLICY IF EXISTS "Enable all for order_items" ON order_items;
DROP POLICY IF EXISTS "order_items_policy" ON order_items;

-- Reviews
DROP POLICY IF EXISTS "Allow all on reviews" ON reviews;
DROP POLICY IF EXISTS "Enable all for reviews" ON reviews;
DROP POLICY IF EXISTS "reviews_policy" ON reviews;

-- Blog Posts
DROP POLICY IF EXISTS "Allow all on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable all for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_policy" ON blog_posts;

-- Customers
DROP POLICY IF EXISTS "Allow all on customers" ON customers;
DROP POLICY IF EXISTS "Enable all for customers" ON customers;
DROP POLICY IF EXISTS "customers_policy" ON customers;

-- About Page Settings
DROP POLICY IF EXISTS "Allow all on about_page_settings" ON about_page_settings;
DROP POLICY IF EXISTS "Enable all for about_page_settings" ON about_page_settings;
DROP POLICY IF EXISTS "about_page_settings_policy" ON about_page_settings;

-- Site Settings
DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Enable all for site_settings" ON site_settings;
DROP POLICY IF EXISTS "site_settings_policy" ON site_settings;

-- Header Settings
DROP POLICY IF EXISTS "Allow all on header_settings" ON header_settings;
DROP POLICY IF EXISTS "Enable all for header_settings" ON header_settings;
DROP POLICY IF EXISTS "header_settings_policy" ON header_settings;

-- Contact Settings
DROP POLICY IF EXISTS "Allow all on contact_settings" ON contact_settings;
DROP POLICY IF EXISTS "Enable all for contact_settings" ON contact_settings;
DROP POLICY IF EXISTS "contact_settings_policy" ON contact_settings;

-- Slider Settings
DROP POLICY IF EXISTS "Allow all on slider_settings" ON slider_settings;
DROP POLICY IF EXISTS "Enable all for slider_settings" ON slider_settings;
DROP POLICY IF EXISTS "slider_settings_policy" ON slider_settings;

-- ===================================
-- إنشاء Policies جديدة بأسماء فريدة
-- ===================================

-- Categories
CREATE POLICY "categories_full_access_2024"
ON categories
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Products
CREATE POLICY "products_full_access_2024"
ON products
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Orders
CREATE POLICY "orders_full_access_2024"
ON orders
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Order Items
CREATE POLICY "order_items_full_access_2024"
ON order_items
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Reviews
CREATE POLICY "reviews_full_access_2024"
ON reviews
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Blog Posts
CREATE POLICY "blog_posts_full_access_2024"
ON blog_posts
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Customers
CREATE POLICY "customers_full_access_2024"
ON customers
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- About Page Settings
CREATE POLICY "about_page_settings_full_access_2024"
ON about_page_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Site Settings
CREATE POLICY "site_settings_full_access_2024"
ON site_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Header Settings
CREATE POLICY "header_settings_full_access_2024"
ON header_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Contact Settings
CREATE POLICY "contact_settings_full_access_2024"
ON contact_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Slider Settings
CREATE POLICY "slider_settings_full_access_2024"
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
INSERT INTO products (name, slug, description, price, is_active, stock_quantity, sku)
VALUES (
    'منتج اختبار نهائي',
    'final-test-' || floor(random() * 100000),
    'اختبار بعد إصلاح الـ Policies',
    77.77,
    true,
    100,
    'FINAL-' || floor(random() * 100000)
)
RETURNING id, name, price, 'تم الإضافة بنجاح!' as status;

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم حذف جميع الـ Policies القديمة!';
    RAISE NOTICE '✅ تم إنشاء Policies جديدة بأسماء فريدة!';
    RAISE NOTICE '✅ تم منح جميع الصلاحيات!';
    RAISE NOTICE '✅ تم اختبار الإضافة بنجاح!';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 الآن يمكنك الإضافة والتعديل والحذف بدون مشاكل!';
    RAISE NOTICE '🔄 أعد بناء المشروع: npm run build';
    RAISE NOTICE '🚀 ارفع على Netlify وجرب!';
END $$;
