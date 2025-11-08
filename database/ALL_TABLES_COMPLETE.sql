-- إنشاء جميع الجداول المطلوبة للموقع
-- Complete Database Setup for Juicetry

-- ===================================
-- حذف الجداول القديمة
-- ===================================
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS about_page_settings CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS header_settings CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS slider_settings CASCADE;

-- ===================================
-- 1. جدول التصنيفات - Categories
-- ===================================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 2. جدول المنتجات - Products
-- ===================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    images TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 3. جدول الطلبات - Orders
-- ===================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT,
    customer_city TEXT,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'online')),
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('paid', 'unpaid', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول عناصر الطلب
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    product_id INTEGER,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 4. جدول المراجعات - Reviews
-- ===================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 5. جدول المقالات - Blog Posts
-- ===================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT DEFAULT 'Admin',
    category TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 6. جدول العملاء - Customers
-- ===================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 7. جدول إعدادات صفحة "من نحن"
-- ===================================
CREATE TABLE about_page_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT 'من نحن',
    subtitle TEXT NOT NULL DEFAULT 'قصة Juicetry - جوستري',
    description TEXT NOT NULL,
    mission_title TEXT NOT NULL DEFAULT 'رسالتنا',
    mission_text TEXT NOT NULL,
    vision_title TEXT NOT NULL DEFAULT 'رؤيتنا',
    vision_text TEXT NOT NULL,
    values_title TEXT NOT NULL DEFAULT 'قيمنا',
    values_text TEXT NOT NULL,
    location_name TEXT DEFAULT 'موقع المحل',
    location_address TEXT,
    location_url TEXT,
    background_color TEXT DEFAULT '#f8fafc',
    text_color TEXT DEFAULT '#374151',
    accent_color TEXT DEFAULT '#22c55e',
    title_color TEXT DEFAULT '#1f2937',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 8. جدول إعدادات الموقع العامة
-- ===================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT DEFAULT 'Juicetry - جوستري',
    site_description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    primary_color TEXT DEFAULT '#22c55e',
    secondary_color TEXT DEFAULT '#16a34a',
    phone TEXT,
    email TEXT,
    address TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    whatsapp_number TEXT,
    is_maintenance_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 9. جدول إعدادات الهيدر
-- ===================================
CREATE TABLE header_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT,
    logo_text TEXT DEFAULT 'Juicetry',
    show_search BOOLEAN DEFAULT true,
    show_cart BOOLEAN DEFAULT true,
    show_account BOOLEAN DEFAULT true,
    background_color TEXT DEFAULT '#ffffff',
    text_color TEXT DEFAULT '#1f2937',
    sticky_header BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 10. جدول إعدادات صفحة التواصل
-- ===================================
CREATE TABLE contact_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT DEFAULT 'تواصل معنا',
    description TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    working_hours TEXT,
    map_url TEXT,
    show_map BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 11. جدول إعدادات السلايدر
-- ===================================
CREATE TABLE slider_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    subtitle TEXT,
    image_url TEXT,
    button_text TEXT,
    button_link TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- تفعيل RLS على كل الجداول
-- ===================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_settings ENABLE ROW LEVEL SECURITY;

-- ===================================
-- Policies - السماح بكل العمليات بدون authentication
-- ===================================

-- Categories
CREATE POLICY "Allow all on categories" ON categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Products
CREATE POLICY "Allow all on products" ON products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Orders
CREATE POLICY "Allow all on orders" ON orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on order_items" ON order_items FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Reviews
CREATE POLICY "Allow all on reviews" ON reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Blog Posts
CREATE POLICY "Allow all on blog_posts" ON blog_posts FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Customers
CREATE POLICY "Allow all on customers" ON customers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Settings Tables
CREATE POLICY "Allow all on about_page_settings" ON about_page_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on header_settings" ON header_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on contact_settings" ON contact_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on slider_settings" ON slider_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ===================================
-- منح الصلاحيات
-- ===================================
GRANT ALL ON categories TO anon, authenticated;
GRANT ALL ON products TO anon, authenticated;
GRANT ALL ON orders TO anon, authenticated;
GRANT ALL ON order_items TO anon, authenticated;
GRANT ALL ON reviews TO anon, authenticated;
GRANT ALL ON blog_posts TO anon, authenticated;
GRANT ALL ON customers TO anon, authenticated;
GRANT ALL ON about_page_settings TO anon, authenticated;
GRANT ALL ON site_settings TO anon, authenticated;
GRANT ALL ON header_settings TO anon, authenticated;
GRANT ALL ON contact_settings TO anon, authenticated;
GRANT ALL ON slider_settings TO anon, authenticated;

-- منح صلاحيات الـ sequences
GRANT USAGE, SELECT ON SEQUENCE categories_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE products_id_seq TO anon, authenticated;

-- ===================================
-- إنشاء Indexes للأداء
-- ===================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم إنشاء جميع الجداول بنجاح!';
    RAISE NOTICE '✅ Categories, Products, Orders, Reviews, Blog, Customers';
    RAISE NOTICE '✅ About Page, Site Settings, Header, Contact, Slider';
    RAISE NOTICE '✅ RLS Policies created - NO AUTHENTICATION REQUIRED!';
    RAISE NOTICE '✅ All permissions granted!';
    RAISE NOTICE '✅ Indexes created for better performance!';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Database is ready! Now run the sample data script.';
END $$;
