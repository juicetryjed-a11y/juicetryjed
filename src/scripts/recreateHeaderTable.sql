-- حفظ البيانات الموجودة (إن وجدت)
CREATE TEMP TABLE temp_header_backup AS 
SELECT * FROM header_settings;

-- حذف الجدول القديم
DROP TABLE IF EXISTS header_settings CASCADE;

-- إنشاء الجدول الجديد بالتصميم الصحيح
CREATE TABLE header_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT,
  logo_position TEXT DEFAULT 'right' CHECK (logo_position IN ('right', 'center', 'left')),
  menu_items JSONB DEFAULT '[]'::jsonb,
  background_color TEXT DEFAULT '#edd674',
  text_color TEXT DEFAULT '#291719',
  font_family TEXT DEFAULT 'inherit',
  font_size TEXT DEFAULT '16px',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- استعادة البيانات الموجودة أو إدراج بيانات افتراضية
INSERT INTO header_settings (
  id, 
  logo_url, 
  logo_position, 
  menu_items,
  background_color,
  text_color,
  font_family,
  font_size
) 
SELECT 
  COALESCE(id, 1),
  logo_url,
  COALESCE(logo_position, 'right'),
  COALESCE(menu_items, '[
    {"id": 1, "label_ar": "المنيو", "label_en": "Menu", "url": "/menu", "position": "right", "is_visible": true, "order": 1},
    {"id": 2, "label_ar": "المقالات", "label_en": "Blog", "url": "/blog", "position": "right", "is_visible": true, "order": 2},
    {"id": 3, "label_ar": "من نحن", "label_en": "About", "url": "/about", "position": "right", "is_visible": true, "order": 3}
  ]'::jsonb),
  '#edd674',
  '#291719',
  'inherit',
  '16px'
FROM temp_header_backup
WHERE id = 1

UNION ALL

SELECT 
  1,
  NULL,
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
WHERE NOT EXISTS (SELECT 1 FROM temp_header_backup WHERE id = 1);

-- تفعيل RLS
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

-- إضافة policies
CREATE POLICY "Allow public read access" ON header_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON header_settings
  FOR ALL USING (true);

-- حذف الجدول المؤقت
DROP TABLE temp_header_backup;
