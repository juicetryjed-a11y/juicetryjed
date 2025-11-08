-- إضافة الأعمدة المفقودة لجدول header_settings
ALTER TABLE header_settings 
ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#edd674',
ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT '#291719',
ADD COLUMN IF NOT EXISTS font_family TEXT DEFAULT 'inherit',
ADD COLUMN IF NOT EXISTS font_size TEXT DEFAULT '16px',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- تحديث الصف الموجود بالقيم الافتراضية
UPDATE header_settings 
SET 
  background_color = COALESCE(background_color, '#edd674'),
  text_color = COALESCE(text_color, '#291719'),
  font_family = COALESCE(font_family, 'inherit'),
  font_size = COALESCE(font_size, '16px'),
  created_at = COALESCE(created_at, NOW()),
  updated_at = NOW()
WHERE id = 1;
