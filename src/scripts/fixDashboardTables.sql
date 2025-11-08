-- إصلاح جداول الداشبورد الأساسية

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

-- جدول المنتجات (إعادة إنشاء بـ INTEGER category_id)
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
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

-- جدول صور السلايدر
CREATE TABLE IF NOT EXISTS slider_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات السلايدر (إعادة إنشاء بـ INTEGER ID)
DROP TABLE IF EXISTS slider_settings CASCADE;
CREATE TABLE slider_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  is_enabled BOOLEAN DEFAULT true,
  auto_play BOOLEAN DEFAULT true,
  autoplay_duration INTEGER DEFAULT 5000,
  show_navigation BOOLEAN DEFAULT true,
  show_indicators BOOLEAN DEFAULT true,
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
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المقالات
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات الموقع (إعادة إنشاء بـ INTEGER ID)
DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Juicetry D',
  site_email TEXT DEFAULT 'info@juicetryd.com',
  site_phone TEXT DEFAULT '+966505656996',
  site_address TEXT DEFAULT 'جدة، المملكة العربية السعودية',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول صفحة من نحن (إعادة إنشاء بـ INTEGER ID)
DROP TABLE IF EXISTS about_page CASCADE;
CREATE TABLE about_page (
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

-- جدول إعدادات التواصل (إعادة إنشاء بـ INTEGER ID)
DROP TABLE IF EXISTS contact_settings CASCADE;
CREATE TABLE contact_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT DEFAULT 'تواصل معنا',
  description TEXT DEFAULT 'نحن هنا لمساعدتك',
  form_title TEXT DEFAULT 'أرسل لنا رسالة',
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

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO about_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO contact_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO slider_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- تفعيل RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies للقراءة العامة
DROP POLICY IF EXISTS "Allow public read" ON categories;
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON products;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON slider_images;
CREATE POLICY "Allow public read" ON slider_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON slider_settings;
CREATE POLICY "Allow public read" ON slider_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON customer_reviews;
CREATE POLICY "Allow public read" ON customer_reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON blog_posts;
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON site_settings;
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON about_page;
CREATE POLICY "Allow public read" ON about_page FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON contact_settings;
CREATE POLICY "Allow public read" ON contact_settings FOR SELECT USING (true);

-- Policies للكتابة
DROP POLICY IF EXISTS "Allow all operations" ON categories;
CREATE POLICY "Allow all operations" ON categories FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON products;
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON slider_images;
CREATE POLICY "Allow all operations" ON slider_images FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON slider_settings;
CREATE POLICY "Allow all operations" ON slider_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON customer_reviews;
CREATE POLICY "Allow all operations" ON customer_reviews FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON blog_posts;
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON site_settings;
CREATE POLICY "Allow all operations" ON site_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON about_page;
CREATE POLICY "Allow all operations" ON about_page FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON contact_settings;
CREATE POLICY "Allow all operations" ON contact_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON contact_messages;
CREATE POLICY "Allow all operations" ON contact_messages FOR ALL USING (true);

SELECT 'تم إصلاح جداول الداشبورد بنجاح!' as status;
