-- تحديث ألوان هوية Juicetry D في قاعدة البيانات

-- تحديث ألوان إعدادات الهيدر
UPDATE header_settings 
SET 
  background_color = '#edd674',
  text_color = '#291719',
  updated_at = NOW()
WHERE id = 1;

-- تحديث ألوان إعدادات الموقع العامة
UPDATE site_settings 
SET 
  primary_color = '#edd674',
  secondary_color = '#f05a36',
  accent_color = '#9a488d',
  updated_at = NOW()
WHERE id = 1;

-- تحديث ألوان إعدادات تصميم الصفحة الرئيسية
UPDATE homepage_design_settings 
SET 
  background_color = '#edd674',
  text_color = '#291719',
  accent_color = '#f05a36',
  updated_at = NOW()
WHERE section_name IN ('hero', 'featured_products', 'categories', 'customer_reviews');

-- تحديث ألوان صفحة من نحن
UPDATE about_page 
SET 
  text_color = '#291719',
  background_color = '#fefbf0',
  updated_at = NOW()
WHERE id = 1;

-- تحديث ألوان إعدادات التواصل
UPDATE contact_settings 
SET 
  form_background_color = '#ffffff',
  form_text_color = '#291719',
  button_color = '#edd674',
  button_text_color = '#291719',
  updated_at = NOW()
WHERE id = 1;

-- إضافة ألوان للتصنيفات
UPDATE categories 
SET 
  color = CASE 
    WHEN name = 'سموذي' THEN '#f05a36'
    WHEN name = 'سموكي صودا' THEN '#9a488d'
    WHEN name = 'خلطات جوستري' THEN '#edd674'
    WHEN name = 'ملك شيكس' THEN '#f5907e'
    WHEN name = 'فيجي فروت' THEN '#68a29f'
    WHEN name = 'عصائر طازجة' THEN '#f05a36'
    WHEN name = 'سلطات فواكة' THEN '#68a29f'
    WHEN name = 'بوكسات عصير' THEN '#9a488d'
    ELSE '#edd674'
  END,
  updated_at = NOW();

-- إضافة عمود color للتصنيفات إذا لم يكن موجود
ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#edd674';

SELECT 'تم تحديث ألوان هوية Juicetry D بنجاح!' as status;
