-- إعادة تحديث Schema Cache في Supabase
-- هذا السكربت يجبر Supabase على إعادة قراءة structure الجداول

-- إعادة إنشاء جدول header_settings بسيط
DROP TABLE IF EXISTS header_settings CASCADE;

CREATE TABLE header_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  menu_items JSONB DEFAULT '[]'::jsonb,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج بيانات افتراضية
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

-- تفعيل RLS
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

-- إضافة policies
CREATE POLICY "Allow public read" ON header_settings FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON header_settings FOR ALL USING (true);

-- إجبار تحديث Schema
NOTIFY pgrst, 'reload schema';

SELECT 'تم تحديث Schema بنجاح!' as status;
