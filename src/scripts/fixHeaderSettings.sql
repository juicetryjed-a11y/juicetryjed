-- حذف الجدول إذا كان موجود وإعادة إنشاؤه
DROP TABLE IF EXISTS header_settings;

-- إنشاء جدول header_settings
CREATE TABLE header_settings (
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

-- إدراج صف افتراضي
INSERT INTO header_settings (id, logo_position, menu_items, background_color, text_color, font_family, font_size) 
VALUES (
  1, 
  'right', 
  '[
    {"id": 1, "label_ar": "المنيو", "label_en": "Menu", "url": "/menu", "position": "right", "is_visible": true, "order": 1},
    {"id": 2, "label_ar": "المقالات", "label_en": "Blog", "url": "/blog", "position": "right", "is_visible": true, "order": 2},
    {"id": 3, "label_ar": "من نحن", "label_en": "About", "url": "/about", "position": "right", "is_visible": true, "order": 3}
  ]'::jsonb,
  '#edd674',
  '#291719',
  'inherit',
  '16px'
);

-- تفعيل RLS
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

-- إضافة policy للقراءة العامة
CREATE POLICY "Allow public read access" ON header_settings
  FOR SELECT USING (true);

-- إضافة policy للكتابة للمستخدمين المصرح لهم (يمكن تعديلها حسب نظام المصادقة)
CREATE POLICY "Allow authenticated users to update" ON header_settings
  FOR ALL USING (true);

-- إذا كنت تستخدم مصادقة Supabase، استخدم هذا بدلاً من السطر السابق:
-- CREATE POLICY "Allow authenticated users to update" ON header_settings
--   FOR ALL USING (auth.role() = 'authenticated');
