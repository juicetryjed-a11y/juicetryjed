-- بناء قاعدة البيانات من الصفر لموقع Juicetry D
-- حذف جميع الجداول الموجودة أولاً

DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS slider_images CASCADE;
DROP TABLE IF EXISTS slider_settings CASCADE;
DROP TABLE IF EXISTS social_media_links CASCADE;
DROP TABLE IF EXISTS header_settings CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS about_page CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS homepage_design_settings CASCADE;

-- ===========================
-- 1. جدول إعدادات الموقع العامة
-- ===========================
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'Juicetry D',
  site_email TEXT DEFAULT 'info@juicetryd.com',
  site_phone TEXT DEFAULT '+966505656996',
  site_address TEXT DEFAULT 'جدة، المملكة العربية السعودية',
  site_url TEXT DEFAULT 'https://juicetryd.com',
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_youtube TEXT,
  primary_color TEXT DEFAULT '#edd674',
  secondary_color TEXT DEFAULT '#f05a36',
  accent_color TEXT DEFAULT '#9a488d',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 2. جدول إعدادات الهيدر
-- ===========================
CREATE TABLE header_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT,
  logo_position TEXT DEFAULT 'right' CHECK (logo_position IN ('right', 'center', 'left')),
  menu_items JSONB DEFAULT '[]'::jsonb,
  background_color TEXT DEFAULT '#edd674',
  text_color TEXT DEFAULT '#291719',
  font_family TEXT DEFAULT 'Noto Sans Arabic',
  font_size TEXT DEFAULT '16px',
  is_sticky BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 3. جدول إعدادات السلايدر
-- ===========================
CREATE TABLE slider_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  is_enabled BOOLEAN DEFAULT true,
  auto_play BOOLEAN DEFAULT true,
  autoplay_duration INTEGER DEFAULT 5000,
  show_navigation BOOLEAN DEFAULT true,
  show_indicators BOOLEAN DEFAULT true,
  height_mobile TEXT DEFAULT '400px',
  height_desktop TEXT DEFAULT '600px',
  transition_effect TEXT DEFAULT 'slide',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 4. جدول صور السلايدر
-- ===========================
CREATE TABLE slider_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  link_url TEXT,
  button_text TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 5. جدول التصنيفات
-- ===========================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  name_en TEXT,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  color TEXT DEFAULT '#edd674',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 6. جدول المنتجات
-- ===========================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  ingredients TEXT,
  nutritional_info JSONB,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 7. جدول آراء العملاء
-- ===========================
CREATE TABLE customer_reviews (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_image_url TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  review_date DATE DEFAULT CURRENT_DATE,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 8. جدول المقالات/البلوج
-- ===========================
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  featured_image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  author TEXT DEFAULT 'فريق جوستري',
  tags TEXT[],
  seo_title TEXT,
  seo_keywords TEXT,
  seo_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 9. جدول صفحة من نحن
-- ===========================
CREATE TABLE about_page (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT DEFAULT 'من نحن',
  content TEXT,
  mission TEXT,
  vision TEXT,
  values TEXT,
  team_info JSONB DEFAULT '[]'::jsonb,
  text_color TEXT DEFAULT '#291719',
  font_family TEXT DEFAULT 'Noto Sans Arabic',
  font_size TEXT DEFAULT '16px',
  text_alignment TEXT DEFAULT 'right' CHECK (text_alignment IN ('right', 'center', 'left')),
  background_color TEXT DEFAULT '#ffffff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 10. جدول إعدادات صفحة التواصل
-- ===========================
CREATE TABLE contact_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT DEFAULT 'تواصل معنا',
  description TEXT DEFAULT 'نحن هنا لمساعدتك',
  form_title TEXT DEFAULT 'أرسل لنا رسالة',
  address TEXT,
  phone TEXT,
  email TEXT,
  working_hours TEXT DEFAULT 'يومياً من 8 صباحاً إلى 12 منتصف الليل',
  map_embed_url TEXT,
  form_background_color TEXT DEFAULT '#ffffff',
  form_text_color TEXT DEFAULT '#291719',
  form_font_family TEXT DEFAULT 'Noto Sans Arabic',
  form_font_size TEXT DEFAULT '16px',
  button_color TEXT DEFAULT '#edd674',
  button_text_color TEXT DEFAULT '#291719',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 11. جدول رسائل التواصل
-- ===========================
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 12. جدول روابط السوشيال ميديا
-- ===========================
CREATE TABLE social_media_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- إدراج البيانات الافتراضية
-- ===========================

-- إعدادات الموقع
INSERT INTO site_settings (id, site_name, site_phone, site_email, site_address) VALUES (
  1, 
  'Juicetry D', 
  '+966505656996', 
  'info@juicetryd.com', 
  'جدة، المملكة العربية السعودية'
);

-- إعدادات الهيدر مع قائمة افتراضية
INSERT INTO header_settings (id, menu_items) VALUES (
  1,
  '[
    {"id": 1, "label_ar": "الرئيسية", "label_en": "Home", "url": "/", "position": "right", "is_visible": true, "order": 1},
    {"id": 2, "label_ar": "المنيو", "label_en": "Menu", "url": "/menu", "position": "right", "is_visible": true, "order": 2},
    {"id": 3, "label_ar": "المقالات", "label_en": "Blog", "url": "/blog", "position": "right", "is_visible": true, "order": 3},
    {"id": 4, "label_ar": "من نحن", "label_en": "About", "url": "/about", "position": "right", "is_visible": true, "order": 4},
    {"id": 5, "label_ar": "تواصل معنا", "label_en": "Contact", "url": "/contact", "position": "right", "is_visible": true, "order": 5}
  ]'::jsonb
);

-- إعدادات السلايدر
INSERT INTO slider_settings (id) VALUES (1);

-- إعدادات صفحة من نحن
INSERT INTO about_page (id, content) VALUES (
  1,
  '<h1 class="text-4xl font-bold mb-6 text-center">حكاية جوستري</h1>
   <p class="text-lg mb-4 leading-relaxed">
   نحن علامة تجارية سعودية مهتمة بجعل الفاكهة جزءاً ممتعا من حياتك، سنقدم لك تجربة فريدة لتحضير العصير وسلطة الفواكه، نأخذك خطوة بخطوة لتكتمل متعة الوقت الذي تقضيه معنا فيه لدينا قاعدة بسيطة في جوستري وهي أن تحظى بأكثر الأوقات إمتاعاً وألذ العصائر الصحية.
   </p>
   <h2 class="text-2xl font-bold mt-8 mb-4">رؤيتنا</h2>
   <p class="text-lg mb-4">
   أن نكون الوجهة الأولى لعشاق العصائر الطبيعية في المنطقة، وأن نقدم منتجات صحية ولذيذة تلبي جميع الأذواق.
   </p>
   <h2 class="text-2xl font-bold mt-8 mb-4">مهمتنا</h2>
   <p class="text-lg">
   تقديم أفضل تجربة عصير طبيعي لعملائنا، مع التركيز على الجودة والطعم الأصيل والخدمة المميزة.
   </p>'
);

-- إعدادات صفحة التواصل
INSERT INTO contact_settings (id, address, phone, email) VALUES (
  1,
  'جدة، المملكة العربية السعودية',
  '+966505656996',
  'info@juicetryd.com'
);

-- التصنيفات الأساسية
INSERT INTO categories (name, name_en, description, is_active, display_order) VALUES
('سموذي', 'Smoothies', 'مشروبات سموذي طبيعية ولذيذة', true, 1),
('سموكي صودا', 'Smoky Soda', 'مشروبات صودا منعشة بنكهات مميزة', true, 2),
('خلطات جوستري', 'Joustry Blends', 'خلطات خاصة من جوستري بمكونات مختارة', true, 3),
('ملك شيكس', 'King Shakes', 'مشروبات الحليب المخفوق بنكهات متنوعة', true, 4),
('فيجي فروت', 'Veggie Fruit', 'عصائر الخضار والفواكه الطبيعية', true, 5),
('عصائر طازجة', 'Fresh Juices', 'عصائر طبيعية طازجة يومياً', true, 6),
('سلطات فواكة', 'Fruit Salads', 'سلطات فواكه طازجة ومتنوعة', true, 7),
('بوكسات عصير', 'Juice Boxes', 'بوكسات عصير للمناسبات والهدايا', true, 8);

-- روابط السوشيال ميديا
INSERT INTO social_media_links (platform, url, icon, display_order, is_visible) VALUES
('facebook', 'https://facebook.com/juicetryd', 'facebook', 1, true),
('instagram', 'https://instagram.com/juicetryd', 'instagram', 2, true),
('twitter', 'https://twitter.com/juicetryd', 'twitter', 3, true),
('youtube', 'https://youtube.com/juicetryd', 'youtube', 4, true);

-- آراء العملاء النموذجية
INSERT INTO customer_reviews (customer_name, rating, review_text, is_visible, is_featured, display_order) VALUES
('أحمد محمد', 5, 'أفضل عصائر جربتها في حياتي! طعم طبيعي ونكهة رائعة', true, true, 1),
('فاطمة السعيد', 5, 'خدمة ممتازة وجودة عالية، أنصح الجميع بتجربة جوستري', true, true, 2),
('خالد العتيبي', 4, 'مكان رائع للعائلة، أطفالي يحبون العصائر هنا كثيراً', true, true, 3);

-- ===========================
-- تفعيل RLS وإضافة Policies
-- ===========================

-- تفعيل RLS لجميع الجداول
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_links ENABLE ROW LEVEL SECURITY;

-- Policies للقراءة العامة
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON header_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON slider_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON slider_images FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON customer_reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON about_page FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON contact_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON social_media_links FOR SELECT USING (true);

-- Policies للكتابة (مفتوحة مؤقتاً - يمكن تقييدها لاحقاً)
CREATE POLICY "Allow all operations" ON site_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON header_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON slider_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON slider_images FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON customer_reviews FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON about_page FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON contact_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON contact_messages FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON social_media_links FOR ALL USING (true);

-- ===========================
-- إنشاء Indexes للأداء
-- ===========================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_customer_reviews_visible ON customer_reviews(is_visible);
CREATE INDEX idx_slider_images_active ON slider_images(is_active);

-- ===========================
-- تأكيد نجاح العملية
-- ===========================

SELECT 'تم إنشاء قاعدة البيانات بنجاح!' as status;
