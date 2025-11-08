-- إعداد قاعدة البيانات الكاملة لموقع Juicetry - جوستري
-- تم إنشاؤها من البداية لضمان التكامل الكامل

-- تنظيف قاعدة البيانات (حذف الجداول الموجودة)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS slider_images CASCADE;
DROP TABLE IF EXISTS slider_settings CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS about_page CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS social_media_links CASCADE;
DROP TABLE IF EXISTS homepage_design_settings CASCADE;
DROP TABLE IF EXISTS header_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- إنشاء جدول المستخدمين
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الملفات الشخصية
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات الموقع العامة
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    site_name TEXT DEFAULT 'Juicetry - جوستري',
    site_description TEXT DEFAULT 'محل العصائر الطبيعية',
    site_phone TEXT DEFAULT '+966501234567',
    site_email TEXT DEFAULT 'info@juicetry.com',
    site_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    primary_color TEXT DEFAULT '#22c55e',
    secondary_color TEXT DEFAULT '#84cc16',
    accent_color TEXT DEFAULT '#eab308',
    logo_url TEXT,
    favicon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات الهيدر
CREATE TABLE header_settings (
    id SERIAL PRIMARY KEY,
    logo_url TEXT,
    logo_position TEXT DEFAULT 'right' CHECK (logo_position IN ('right', 'center', 'left')),
    menu_items JSONB DEFAULT '[]',
    text_color TEXT DEFAULT '#1f2937',
    background_color TEXT DEFAULT '#ffffff',
    font_family TEXT DEFAULT 'Noto Sans Arabic',
    font_size TEXT DEFAULT '16px',
    is_sticky BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات السلايدر
CREATE TABLE slider_settings (
    id SERIAL PRIMARY KEY,
    is_enabled BOOLEAN DEFAULT true,
    auto_play BOOLEAN DEFAULT true,
    autoplay_duration INTEGER DEFAULT 5000,
    show_navigation BOOLEAN DEFAULT true,
    show_indicators BOOLEAN DEFAULT true,
    height_mobile TEXT DEFAULT '300px',
    height_desktop TEXT DEFAULT '500px',
    transition_effect TEXT DEFAULT 'slide' CHECK (transition_effect IN ('slide', 'fade', 'zoom')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول صور السلايدر
CREATE TABLE slider_images (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    button_text TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول التصنيفات
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    color TEXT DEFAULT '#22c55e',
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المنتجات
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    ingredients TEXT[],
    nutritional_info JSONB,
    calories INTEGER,
    size_options JSONB DEFAULT '[]',
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول تقييمات المنتجات
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول السلة
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    size_option TEXT,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, size_option)
);

-- إنشاء جدول الطلبات
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
    payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'online')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    delivery_type TEXT DEFAULT 'pickup' CHECK (delivery_type IN ('pickup', 'delivery')),
    delivery_address TEXT,
    delivery_phone TEXT,
    notes TEXT,
    estimated_time INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول عناصر الطلبات
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    size_option TEXT,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول آراء العملاء
CREATE TABLE customer_reviews (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_image TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    product_name TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المقالات
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT DEFAULT 'فريق جوستري',
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول صفحة من نحن
CREATE TABLE about_page (
    id SERIAL PRIMARY KEY,
    title TEXT DEFAULT 'من نحن',
    subtitle TEXT DEFAULT 'قصة Juicetry - جوستري',
    content TEXT NOT NULL,
    mission TEXT,
    vision TEXT,
    values TEXT[],
    team_info JSONB DEFAULT '[]',
    hero_image TEXT,
    gallery_images TEXT[],
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات التواصل
CREATE TABLE contact_settings (
    id SERIAL PRIMARY KEY,
    page_title TEXT DEFAULT 'تواصل معنا',
    page_description TEXT DEFAULT 'نحن هنا للإجابة على جميع استفساراتكم',
    phone TEXT,
    email TEXT,
    address TEXT,
    working_hours JSONB DEFAULT '{}',
    map_embed_url TEXT,
    form_background_color TEXT DEFAULT '#ffffff',
    form_text_color TEXT DEFAULT '#1f2937',
    button_color TEXT DEFAULT '#22c55e',
    button_text_color TEXT DEFAULT '#ffffff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول رسائل التواصل
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_replied BOOLEAN DEFAULT false,
    reply_message TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول روابط التواصل الاجتماعي
CREATE TABLE social_media_links (
    id SERIAL PRIMARY KEY,
    platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'snapchat', 'whatsapp')),
    url TEXT NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات تصميم الصفحة الرئيسية
CREATE TABLE homepage_design_settings (
    id SERIAL PRIMARY KEY,
    section_name TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    background_color TEXT DEFAULT '#ffffff',
    text_color TEXT DEFAULT '#1f2937',
    accent_color TEXT DEFAULT '#22c55e',
    is_visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    custom_css TEXT,
    custom_settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_customer_reviews_visible ON customer_reviews(is_visible);

-- إعداد Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own profile data" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile data" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile data" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- سياسات الأمان للسلة
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- سياسات الأمان للطلبات
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- سياسات الأمان للتقييمات
CREATE POLICY "Users can manage own reviews" ON product_reviews FOR ALL USING (auth.uid() = user_id);

-- سياسات الأمان لرسائل التواصل
CREATE POLICY "Users can create contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- سياسات عامة للقراءة (الجداول العامة)
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view approved reviews" ON product_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Anyone can view visible customer reviews" ON customer_reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view header settings" ON header_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view slider settings" ON slider_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active slider images" ON slider_images FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view about page" ON about_page FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view contact settings" ON contact_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active social media links" ON social_media_links FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view visible homepage sections" ON homepage_design_settings FOR SELECT USING (is_visible = true);

-- إدراج البيانات الأساسية
INSERT INTO site_settings (site_name, site_description, site_phone, site_email, site_address) VALUES
('Juicetry - جوستري', 'محل العصائر الطبيعية الطازجة', '+966501234567', 'info@juicetry.com', 'الرياض، المملكة العربية السعودية');

INSERT INTO header_settings (menu_items) VALUES
('[
    {"id": 1, "label": "الرئيسية", "url": "/", "is_visible": true, "order": 1},
    {"id": 2, "label": "المنيو", "url": "/menu", "is_visible": true, "order": 2},
    {"id": 3, "label": "من نحن", "url": "/about", "is_visible": true, "order": 3},
    {"id": 4, "label": "المقالات", "url": "/blog", "is_visible": true, "order": 4},
    {"id": 5, "label": "تواصل معنا", "url": "/contact", "is_visible": true, "order": 5}
]');

INSERT INTO slider_settings DEFAULT VALUES;

INSERT INTO contact_settings (phone, email, address, working_hours) VALUES
('+966501234567', 'info@juicetry.com', 'الرياض، المملكة العربية السعودية', 
'{"saturday": "8:00 AM - 11:00 PM", "sunday": "8:00 AM - 11:00 PM", "monday": "8:00 AM - 11:00 PM", "tuesday": "8:00 AM - 11:00 PM", "wednesday": "8:00 AM - 11:00 PM", "thursday": "8:00 AM - 11:00 PM", "friday": "2:00 PM - 11:00 PM"}');

INSERT INTO about_page (content, mission, vision, values) VALUES
('نحن في Juicetry - جوستري نؤمن بأن الصحة تبدأ من كوب عصير طبيعي طازج. منذ تأسيسنا، نسعى لتقديم أفضل العصائر الطبيعية المحضرة من أجود الفواكه والخضروات الطازجة.',
'تقديم عصائر طبيعية طازجة وصحية لعملائنا الكرام',
'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة',
ARRAY['الجودة العالية', 'الطبيعة 100%', 'الطعم الأصيل', 'الخدمة المميزة', 'الصحة والعافية']);

-- إدراج التصنيفات الأساسية
INSERT INTO categories (name, description, color, order_index) VALUES
('عصائر الحمضيات', 'عصائر البرتقال والليمون والجريب فروت الطازجة', '#f97316', 1),
('عصائر الفواكه الاستوائية', 'عصائر المانجو والأناناس والكيوي', '#eab308', 2),
('عصائر التوت', 'عصائر الفراولة والتوت الأزرق والتوت الأحمر', '#dc2626', 3),
('عصائر الخضروات', 'عصائر الجزر والخيار والسبانخ الصحية', '#22c55e', 4),
('سموثي طبيعي', 'مشروبات مخلوطة بالفواكه والخضروات', '#8b5cf6', 5),
('عصائر مخلوطة', 'خلطات مميزة من الفواكه المختلفة', '#ec4899', 6);

-- إدراج منتجات تجريبية
INSERT INTO products (name, description, price, category_id, ingredients, calories, is_featured) VALUES
('عصير برتقال طازج', 'عصير برتقال طبيعي 100% بدون إضافات', 15.00, 1, ARRAY['برتقال طازج'], 110, true),
('عصير مانجو استوائي', 'عصير مانجو طازج بطعم استوائي رائع', 18.00, 2, ARRAY['مانجو طازج'], 130, true),
('عصير فراولة طبيعي', 'عصير فراولة طازج بطعم حلو ومنعش', 20.00, 3, ARRAY['فراولة طازجة'], 95, true),
('عصير جزر صحي', 'عصير جزر طبيعي غني بالفيتامينات', 12.00, 4, ARRAY['جزر طازج'], 80, false),
('سموثي الفواكه المختلطة', 'خليط من الفواكه الطازجة مع الحليب', 25.00, 5, ARRAY['فراولة', 'موز', 'مانجو', 'حليب'], 180, true),
('عصير التفاح والجزر', 'خليط منعش من التفاح والجزر', 16.00, 6, ARRAY['تفاح طازج', 'جزر طازج'], 105, false);

-- إدراج آراء العملاء التجريبية
INSERT INTO customer_reviews (customer_name, rating, review_text, product_name, is_featured, order_index) VALUES
('أحمد محمد', 5, 'عصائر رائعة وطازجة، أنصح الجميع بتجربتها!', 'عصير برتقال طازج', true, 1),
('فاطمة علي', 5, 'أفضل عصير مانجو جربته في حياتي، طعم استوائي حقيقي', 'عصير مانجو استوائي', true, 2),
('محمد السعيد', 4, 'جودة عالية وخدمة ممتازة، سأكرر الطلب بالتأكيد', 'سموثي الفواكه المختلطة', true, 3),
('نورا أحمد', 5, 'عصائر طبيعية 100% كما هو مكتوب، لا توجد إضافات صناعية', 'عصير فراولة طبيعي', false, 4);

-- إدراج إعدادات تصميم الصفحة الرئيسية
INSERT INTO homepage_design_settings (section_name, title, subtitle, description) VALUES
('hero', 'أهلاً بكم في جوستري', 'محل العصائر الطبيعية', 'استمتع بأفضل العصائر الطبيعية الطازجة'),
('featured_products', 'منتجاتنا المميزة', 'أشهى العصائر الطبيعية', 'اكتشف مجموعتنا المتنوعة من العصائر الطبيعية'),
('categories', 'تصنيفاتنا المتنوعة', 'اختر المذاق المفضل', 'تصفح مجموعتنا الواسعة من التصنيفات المختلفة'),
('customer_reviews', 'آراء عملائنا', 'ماذا يقول عملاؤنا', 'تجارب حقيقية من عملائنا الكرام');

-- إدراج روابط التواصل الاجتماعي
INSERT INTO social_media_links (platform, url, order_index) VALUES
('instagram', 'https://instagram.com/juicetry', 1),
('twitter', 'https://twitter.com/juicetry', 2),
('facebook', 'https://facebook.com/juicetry', 3),
('whatsapp', 'https://wa.me/966501234567', 4);

-- إنشاء وظائف مساعدة
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إضافة triggers لتحديث updated_at تلقائياً
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_header_settings_updated_at BEFORE UPDATE ON header_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_reviews_updated_at BEFORE UPDATE ON customer_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- وظيفة لإنشاء رقم طلب فريد
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'JT' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('orders_id_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

COMMIT;

-- رسالة النجاح
SELECT 'تم إنشاء قاعدة البيانات بنجاح! جميع الجداول والبيانات الأساسية جاهزة.' as status;
