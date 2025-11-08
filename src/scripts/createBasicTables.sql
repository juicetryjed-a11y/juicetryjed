-- إنشاء الجداول الأساسية المطلوبة

-- جدول إعدادات الهيدر
CREATE TABLE IF NOT EXISTS header_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT,
  logo_position TEXT DEFAULT 'right',
  menu_items JSONB DEFAULT '[]'::jsonb,
  background_color TEXT DEFAULT '#edd674',
  text_color TEXT DEFAULT '#291719',
  font_family TEXT DEFAULT 'inherit',
  font_size TEXT DEFAULT '16px',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول صور السلايدر
CREATE TABLE IF NOT EXISTS slider_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات السلايدر
CREATE TABLE IF NOT EXISTS slider_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  is_enabled BOOLEAN DEFAULT true,
  auto_play BOOLEAN DEFAULT true,
  autoplay_duration INTEGER DEFAULT 5000,
  show_navigation BOOLEAN DEFAULT true,
  show_indicators BOOLEAN DEFAULT true,
  height_mobile TEXT DEFAULT '400px',
  height_desktop TEXT DEFAULT '600px',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التصنيفات
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول آراء العملاء
CREATE TABLE IF NOT EXISTS customer_reviews (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المقالات
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  seo_title TEXT,
  seo_keywords TEXT,
  seo_description TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Juicetry D',
  site_email TEXT DEFAULT 'info@juicetryd.com',
  site_phone TEXT DEFAULT '+966505656996',
  site_address TEXT DEFAULT 'جدة، المملكة العربية السعودية',
  site_url TEXT DEFAULT 'https://juicetryd.com',
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_youtube TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول صفحة من نحن
CREATE TABLE IF NOT EXISTS about_page (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content TEXT,
  text_color TEXT DEFAULT '#291719',
  font_family TEXT DEFAULT 'inherit',
  font_size TEXT DEFAULT '16px',
  text_alignment TEXT DEFAULT 'right',
  background_color TEXT DEFAULT '#ffffff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات صفحة التواصل
CREATE TABLE IF NOT EXISTS contact_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT DEFAULT 'تواصل معنا',
  description TEXT DEFAULT 'نحن هنا لمساعدتك',
  form_title TEXT DEFAULT 'أرسل لنا رسالة',
  form_background_color TEXT DEFAULT '#ffffff',
  form_text_color TEXT DEFAULT '#291719',
  form_font_family TEXT DEFAULT 'inherit',
  form_font_size TEXT DEFAULT '16px',
  button_color TEXT DEFAULT '#edd674',
  button_text_color TEXT DEFAULT '#291719',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج البيانات الافتراضية
INSERT INTO header_settings (id, menu_items) VALUES (
  1, 
  '[
    {"id": 1, "label_ar": "المنيو", "label_en": "Menu", "url": "/menu", "position": "right", "is_visible": true, "order": 1},
    {"id": 2, "label_ar": "المقالات", "label_en": "Blog", "url": "/blog", "position": "right", "is_visible": true, "order": 2},
    {"id": 3, "label_ar": "من نحن", "label_en": "About", "url": "/about", "position": "right", "is_visible": true, "order": 3}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO about_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO contact_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO slider_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- إضافة التصنيفات الأساسية
INSERT INTO categories (name, description, is_active) VALUES
('سموذي', 'مشروبات سموذي طبيعية ولذيذة', true),
('سموكي صودا', 'مشروبات صودا منعشة بنكهات مميزة', true),
('خلطات جوستري', 'خلطات خاصة من جوستري بمكونات مختارة', true),
('ملك شيكس', 'مشروبات الحليب المخفوق بنكهات متنوعة', true),
('فيجي فروت', 'عصائر الخضار والفواكه الطبيعية', true),
('عصائر طازجة', 'عصائر طبيعية طازجة يومياً', true),
('سلطات فواكة', 'سلطات فواكه طازجة ومتنوعة', true),
('بوكسات عصير', 'بوكسات عصير للمناسبات والهدايا', true)
ON CONFLICT (name) DO NOTHING;

-- تفعيل RLS وإضافة policies للقراءة العامة
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Policies للقراءة العامة
CREATE POLICY IF NOT EXISTS "Allow public read" ON header_settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON slider_images FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON slider_settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON customer_reviews FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON about_page FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON contact_settings FOR SELECT USING (true);

-- Policies للكتابة (مؤقتاً مفتوحة للجميع - يمكن تقييدها لاحقاً)
CREATE POLICY IF NOT EXISTS "Allow all operations" ON header_settings FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON slider_images FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON slider_settings FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON categories FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON products FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON customer_reviews FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON blog_posts FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON site_settings FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON about_page FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON contact_settings FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all operations" ON contact_messages FOR ALL USING (true);
