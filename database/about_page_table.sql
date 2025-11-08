-- جدول إعدادات صفحة "من نحن"
-- About Page Settings Table

-- حذف الجدول القديم إن وجد
DROP TABLE IF EXISTS about_page_settings CASCADE;

-- إنشاء الجدول
CREATE TABLE about_page_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT 'من نحن',
    subtitle TEXT NOT NULL DEFAULT 'قصة Juicetry - جوستري',
    description TEXT NOT NULL,
    mission_title TEXT NOT NULL DEFAULT 'رسالتنا',
    mission_text TEXT NOT NULL,
    vision_title TEXT NOT NULL DEFAULT 'رؤيتنا',
    vision_text TEXT NOT NULL,
    values_title TEXT NOT NULL DEFAULT 'قيمنا',
    values_text TEXT NOT NULL,
    location_name TEXT DEFAULT 'موقع المحل',
    location_address TEXT,
    location_url TEXT,
    background_color TEXT DEFAULT '#f8fafc',
    text_color TEXT DEFAULT '#374151',
    accent_color TEXT DEFAULT '#22c55e',
    title_color TEXT DEFAULT '#1f2937',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل RLS
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

-- إنشاء Policy للسماح بكل العمليات
CREATE POLICY "Allow all operations on about_page_settings"
ON about_page_settings FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- منح الصلاحيات
GRANT ALL ON about_page_settings TO anon, authenticated;

-- إدراج البيانات الافتراضية
INSERT INTO about_page_settings (
    title,
    subtitle,
    description,
    mission_title,
    mission_text,
    vision_title,
    vision_text,
    values_title,
    values_text,
    location_name,
    location_address,
    location_url,
    background_color,
    text_color,
    accent_color,
    title_color,
    is_active
) VALUES (
    'من نحن',
    'قصة Juicetry - جوستري',
    'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات. منذ تأسيسنا، كان هدفنا الأساسي هو تقديم منتجات صحية وطبيعية 100% تساهم في تحسين نمط حياة عملائنا.',
    'رسالتنا',
    'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف، لنساهم في تحسين صحة عملائنا وتقديم تجربة منعشة ولذيذة في كل كوب.',
    'رؤيتنا',
    'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة العربية السعودية، ونشر ثقافة الغذاء الصحي والطبيعي في المجتمع.',
    'قيمنا',
    'الجودة: نستخدم أجود أنواع الفواكه والخضروات الطازجة
الطبيعية: منتجاتنا طبيعية 100% بدون إضافات صناعية
الصحة: نهتم بصحة عملائنا ونقدم خيارات صحية متنوعة
الطعم الأصيل: نحافظ على الطعم الطبيعي للفواكه
خدمة العملاء: نلتزم بتقديم أفضل خدمة لعملائنا
النظافة والسلامة: نطبق أعلى معايير النظافة والسلامة الغذائية',
    'موقع المحل',
    'الرياض، المملكة العربية السعودية',
    'https://maps.google.com',
    '#f8fafc',
    '#374151',
    '#22c55e',
    '#1f2937',
    true
);

-- رسائل النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إنشاء جدول إعدادات صفحة "من نحن" بنجاح!';
    RAISE NOTICE '✅ تم إضافة البيانات الافتراضية!';
    RAISE NOTICE '✅ About page settings table is ready!';
END $$;
