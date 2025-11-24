-- إصلاح نهائي ومبسط (V3)

-- ==========================================
-- 1. إصلاح جداول الإعدادات
-- ==========================================

-- إعادة إنشاء site_settings
DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  site_name TEXT DEFAULT 'Juicetry',
  site_description TEXT,
  site_email TEXT,
  site_phone TEXT,
  site_address TEXT,
  site_url TEXT,
  site_logo TEXT,
  site_favicon TEXT,
  primary_color TEXT DEFAULT '#22c55e',
  secondary_color TEXT DEFAULT '#84cc16',
  accent_color TEXT DEFAULT '#eab308',
  contact_phone TEXT,
  contact_email TEXT,
  contact_address TEXT,
  working_hours TEXT,
  whatsapp_number TEXT,
  google_maps_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_youtube TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  analytics_code TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert site settings" ON site_settings FOR INSERT WITH CHECK (is_admin());

INSERT INTO site_settings (site_name, site_email) VALUES ('Juicetry', 'info@juicetry.com');

-- إعادة إنشاء footer_settings
DROP TABLE IF EXISTS footer_settings CASCADE;
CREATE TABLE footer_settings (
  id BIGSERIAL PRIMARY KEY,
  company_name TEXT DEFAULT 'Juicetry - جوستري',
  company_description TEXT DEFAULT 'أفضل العصائر الطبيعية الطازجة',
  company_logo TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  working_hours TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  whatsapp_number TEXT,
  show_quick_links BOOLEAN DEFAULT true,
  quick_link_1_text TEXT DEFAULT 'الرئيسية',
  quick_link_1_url TEXT DEFAULT '/',
  quick_link_2_text TEXT DEFAULT 'من نحن',
  quick_link_2_url TEXT DEFAULT '/about',
  quick_link_3_text TEXT DEFAULT 'المنتجات',
  quick_link_3_url TEXT DEFAULT '/products',
  quick_link_4_text TEXT DEFAULT 'المقالات',
  quick_link_4_url TEXT DEFAULT '/blog',
  quick_link_5_text TEXT DEFAULT 'تواصل معنا',
  quick_link_5_url TEXT DEFAULT '/contact',
  bg_color TEXT DEFAULT '#1f2937',
  text_color TEXT DEFAULT '#ffffff',
  link_color TEXT DEFAULT '#22c55e',
  link_hover_color TEXT DEFAULT '#16a34a',
  copyright_text TEXT DEFAULT '© 2024 Juicetry. جميع الحقوق محفوظة',
  show_copyright BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view footer settings" ON footer_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update footer settings" ON footer_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert footer settings" ON footer_settings FOR INSERT WITH CHECK (is_admin());

INSERT INTO footer_settings (company_name) VALUES ('Juicetry - جوستري');


-- ==========================================
-- 2. إصلاح علاقات المنتجات (الحذف الآمن)
-- ==========================================

-- التأكد من وجود الجداول أولاً (لتجنب الأخطاء)
CREATE TABLE IF NOT EXISTS customer_reviews (id BIGSERIAL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS order_items (id BIGSERIAL PRIMARY KEY);

-- إضافة الأعمدة بشكل مباشر وآمن
ALTER TABLE customer_reviews ADD COLUMN IF NOT EXISTS product_id BIGINT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_id BIGINT;

-- حذف القيود القديمة إن وجدت
ALTER TABLE customer_reviews DROP CONSTRAINT IF EXISTS customer_reviews_product_id_fkey;
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;

-- إضافة القيود الجديدة (Cascade / Set Null)
ALTER TABLE customer_reviews 
  ADD CONSTRAINT customer_reviews_product_id_fkey 
  FOREIGN KEY (product_id) 
  REFERENCES products(id) 
  ON DELETE CASCADE;

ALTER TABLE order_items 
  ADD CONSTRAINT order_items_product_id_fkey 
  FOREIGN KEY (product_id) 
  REFERENCES products(id) 
  ON DELETE SET NULL;

