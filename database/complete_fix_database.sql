-- إصلاح شامل لقاعدة البيانات
-- تنظيف وإعادة إنشاء جميع الجداول والعلاقات

-- حذف الجداول الموجودة (إذا كانت موجودة)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- إنشاء جدول المستخدمين والملفات الشخصية
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول التصنيفات
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#22c55e',
    icon VARCHAR(50) DEFAULT '🍹',
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المنتجات
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    ingredients TEXT,
    nutritional_info TEXT,
    calories INTEGER DEFAULT 0,
    size_options VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الطلبات
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    customer_address TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
    payment_method VARCHAR(50) DEFAULT 'cash',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول عناصر الطلبات
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول مراجعات العملاء
CREATE TABLE customer_reviews (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المقالات
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    featured_image TEXT,
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات الموقع
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255) DEFAULT 'Juicetry - جوستري',
    site_description TEXT DEFAULT 'محل العصائر الطبيعية الطازجة',
    site_logo TEXT,
    site_favicon TEXT,
    primary_color VARCHAR(7) DEFAULT '#22c55e',
    secondary_color VARCHAR(7) DEFAULT '#84cc16',
    accent_color VARCHAR(7) DEFAULT '#eab308',
    contact_phone VARCHAR(20) DEFAULT '+966501234567',
    contact_email VARCHAR(255) DEFAULT 'info@juicetry.com',
    contact_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours TEXT DEFAULT 'يومياً من 8 صباحاً - 11 مساءً',
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    whatsapp_number VARCHAR(20) DEFAULT '+966501234567',
    google_maps_url TEXT,
    meta_title VARCHAR(255) DEFAULT 'Juicetry - أفضل العصائر الطبيعية',
    meta_description TEXT DEFAULT 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
    meta_keywords TEXT DEFAULT 'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات',
    analytics_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس للأداء
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at);
CREATE INDEX idx_reviews_product ON customer_reviews(product_id);
CREATE INDEX idx_reviews_approved ON customer_reviews(is_approved);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- إدراج البيانات التجريبية

-- إدراج مستخدم إداري
INSERT INTO profiles (id, full_name, email, role) VALUES 
('00000000-0000-0000-0000-000000000001', 'مدير النظام', 'admin@juicetry.com', 'admin');

-- إدراج التصنيفات
INSERT INTO categories (name, description, color, icon, order_index) VALUES
('عصائر الحمضيات', 'عصائر البرتقال والليمون والجريب فروت', '#f97316', '🍊', 1),
('عصائر استوائية', 'عصائر المانجو والأناناس والكيوي', '#eab308', '🥭', 2),
('عصائر التوت', 'عصائر الفراولة والتوت الأزرق والتوت الأحمر', '#ef4444', '🍓', 3),
('عصائر الخضروات', 'عصائر الجزر والخيار والسبانخ', '#22c55e', '🥕', 4),
('سموثي طبيعي', 'مشروبات مخلوطة بالفواكه والخضروات', '#8b5cf6', '🥤', 5),
('مشروبات صحية', 'مشروبات الديتوكس والطاقة الطبيعية', '#06b6d4', '💚', 6);

-- إدراج المنتجات
INSERT INTO products (name, price, category_id, description, ingredients, calories, size_options, is_active) VALUES
('عصير برتقال طازج', 15.00, 1, 'عصير برتقال طبيعي 100% بدون إضافات', 'برتقال طازج', 120, 'متوسط (350مل)', true),
('عصير مانجو استوائي', 18.00, 2, 'عصير مانجو حلو ومنعش من أجود الأنواع', 'مانجو طازج، قليل من الماء', 150, 'كبير (500مل)', true),
('سموثي الفراولة', 20.00, 3, 'سموثي كريمي بالفراولة الطازجة والحليب', 'فراولة، حليب، عسل طبيعي', 180, 'كبير (500مل)', true),
('عصير جزر وبرتقال', 16.00, 4, 'مزيج صحي من الجزر والبرتقال الطازج', 'جزر، برتقال، زنجبيل', 110, 'متوسط (350مل)', true),
('سموثي أخضر صحي', 22.00, 5, 'مزيج من السبانخ والتفاح الأخضر والخيار', 'سبانخ، تفاح أخضر، خيار، ليمون', 95, 'كبير (500مل)', true),
('مشروب الديتوكس', 25.00, 6, 'مشروب تنظيف الجسم بالليمون والزنجبيل', 'ليمون، زنجبيل، نعناع، ماء', 45, 'متوسط (350مل)', true);

-- إدراج طلبات تجريبية
INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, status) VALUES
('أحمد محمد', 'ahmed@example.com', '+966501111111', 35.00, 'delivered'),
('فاطمة علي', 'fatima@example.com', '+966502222222', 42.00, 'preparing'),
('محمد سعد', 'mohammed@example.com', '+966503333333', 28.00, 'confirmed'),
('نورا أحمد', 'nora@example.com', '+966504444444', 50.00, 'ready'),
('خالد عبدالله', 'khalid@example.com', '+966505555555', 33.00, 'pending');

-- إدراج عناصر الطلبات
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 15.00),
(1, 3, 1, 20.00),
(2, 2, 1, 18.00),
(2, 4, 1, 16.00),
(2, 6, 1, 25.00),
(3, 1, 1, 15.00),
(3, 5, 1, 22.00),
(4, 3, 2, 20.00),
(4, 6, 1, 25.00),
(5, 2, 1, 18.00),
(5, 4, 1, 16.00);

-- إدراج مراجعات تجريبية
INSERT INTO customer_reviews (customer_name, customer_email, product_id, rating, comment, is_approved, is_featured) VALUES
('أحمد محمد', 'ahmed@example.com', 1, 5, 'عصير برتقال رائع وطازج جداً، أنصح به بشدة!', true, true),
('فاطمة علي', 'fatima@example.com', 3, 4, 'سموثي الفراولة لذيذ جداً ومنعش، سأطلبه مرة أخرى', true, false),
('محمد سعد', 'mohammed@example.com', 5, 5, 'السموثي الأخضر صحي ولذيذ، يعطي طاقة رائعة', true, true),
('نورا أحمد', 'nora@example.com', 2, 4, 'عصير المانجو حلو ومذاقه طبيعي 100%', true, false),
('خالد عبدالله', 'khalid@example.com', 6, 5, 'مشروب الديتوكس ممتاز للتنظيف، أشعر بالانتعاش', true, true);

-- إدراج مقالات تجريبية
INSERT INTO blog_posts (title, content, excerpt, author, category, is_published, is_featured, views, likes, meta_title, meta_description, slug) VALUES
('فوائد العصائر الطبيعية للصحة', 'العصائر الطبيعية مصدر ممتاز للفيتامينات والمعادن...', 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', 'د. أحمد الصحي', 'health', true, true, 245, 18, 'فوائد العصائر الطبيعية للصحة العامة', 'اكتشف الفوائد الصحية المذهلة للعصائر الطبيعية وكيف تساهم في تحسين صحتك العامة', 'benefits-of-natural-juices'),
('وصفة سموثي الفراولة المنعش', 'طريقة تحضير سموثي الفراولة اللذيذ في المنزل...', 'تعلم كيفية تحضير سموثي الفراولة المثالي', 'الشيف سارة', 'recipes', true, false, 189, 12, 'طريقة عمل سموثي الفراولة المنعش', 'تعلم طريقة تحضير سموثي الفراولة اللذيذ والمنعش في المنزل بخطوات سهلة', 'strawberry-smoothie-recipe');

-- إدراج إعدادات الموقع الافتراضية
INSERT INTO site_settings (site_name, site_description, primary_color, secondary_color, accent_color) VALUES
('Juicetry - جوستري', 'محل العصائر الطبيعية الطازجة', '#22c55e', '#84cc16', '#eab308');

-- إنشاء الـ Triggers للتحديث التلقائي

-- Trigger لتحديث updated_at في جدول المنتجات
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON customer_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger خاص للمقالات لإنشاء slug تلقائياً
CREATE OR REPLACE FUNCTION set_blog_post_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- إنشاء slug تلقائياً إذا لم يكن موجوداً
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(NEW.title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g'));
    END IF;
    
    -- تحديث meta_title تلقائياً إذا لم يكن موجوداً
    IF NEW.meta_title IS NULL OR NEW.meta_title = '' THEN
        NEW.meta_title = NEW.title;
    END IF;
    
    -- تحديث meta_description تلقائياً إذا لم يكن موجوداً
    IF NEW.meta_description IS NULL OR NEW.meta_description = '' THEN
        NEW.meta_description = NEW.excerpt;
    END IF;
    
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_post_defaults_trigger
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_blog_post_defaults();

-- تفعيل Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - القراءة العامة
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON customer_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);

-- سياسات الأمان - الكتابة للمديرين فقط
CREATE POLICY "Allow admin write" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON orders FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON order_items FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON customer_reviews FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON blog_posts FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Allow admin write" ON site_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- إعداد Storage للصور
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- سياسات Storage
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow admin upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Allow admin delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- رسالة نجاح
SELECT 'تم إنشاء قاعدة البيانات بنجاح! 🎉' as message;
