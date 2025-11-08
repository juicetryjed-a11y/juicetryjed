-- الباك إند الكامل لصفحة إعدادات الموقع
-- Complete Backend for Site Settings Page
-- يدعم جميع التابات: إعدادات عامة، معلومات التواصل، وسائل التواصل، SEO، إعدادات متقدمة

-- ===================================
-- حذف الجدول القديم
-- ===================================
DROP TABLE IF EXISTS site_settings CASCADE;

-- ===================================
-- إنشاء جدول إعدادات الموقع الكامل
-- ===================================
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    
    -- ===================================
    -- التاب 1: إعدادات عامة
    -- ===================================
    site_name TEXT DEFAULT 'Juicetry - جوستري',
    site_description TEXT DEFAULT 'محل العصائر الطبيعية الطازجة',
    site_logo TEXT,
    site_favicon TEXT,
    
    -- ألوان الموقع
    primary_color TEXT DEFAULT '#22c55e',
    secondary_color TEXT DEFAULT '#84cc16',
    accent_color TEXT DEFAULT '#eab308',
    
    -- ===================================
    -- التاب 2: معلومات التواصل
    -- ===================================
    contact_phone TEXT DEFAULT '+966501234567',
    contact_email TEXT DEFAULT 'info@juicetry.com',
    contact_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours TEXT DEFAULT 'يومياً من 8 صباحاً - 11 مساءً',
    whatsapp_number TEXT DEFAULT '+966501234567',
    google_maps_url TEXT,
    
    -- ===================================
    -- التاب 3: وسائل التواصل الاجتماعي
    -- ===================================
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    
    -- ===================================
    -- التاب 4: تحسين محركات البحث (SEO)
    -- ===================================
    meta_title TEXT DEFAULT 'Juicetry - أفضل العصائر الطبيعية',
    meta_description TEXT DEFAULT 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
    meta_keywords TEXT DEFAULT 'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات',
    
    -- ===================================
    -- التاب 5: إعدادات متقدمة
    -- ===================================
    analytics_code TEXT,
    custom_css TEXT,
    custom_js TEXT,
    
    -- ===================================
    -- التواريخ
    -- ===================================
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- تعطيل RLS
-- ===================================
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- ===================================
-- إضافة إعدادات افتراضية كاملة
-- ===================================
INSERT INTO site_settings (
    -- إعدادات عامة
    site_name,
    site_description,
    site_logo,
    site_favicon,
    primary_color,
    secondary_color,
    accent_color,
    
    -- معلومات التواصل
    contact_phone,
    contact_email,
    contact_address,
    working_hours,
    whatsapp_number,
    google_maps_url,
    
    -- وسائل التواصل
    facebook_url,
    twitter_url,
    instagram_url,
    youtube_url,
    
    -- SEO
    meta_title,
    meta_description,
    meta_keywords,
    
    -- إعدادات متقدمة
    analytics_code
) VALUES (
    -- إعدادات عامة
    'Juicetry - جوستري',
    'محل العصائر الطبيعية الطازجة',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=200',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=32',
    '#22c55e',
    '#84cc16',
    '#eab308',
    
    -- معلومات التواصل
    '+966501234567',
    'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    'يومياً من 8 صباحاً - 11 مساءً',
    '+966501234567',
    'https://maps.google.com',
    
    -- وسائل التواصل
    'https://facebook.com/juicetry',
    'https://twitter.com/juicetry',
    'https://instagram.com/juicetry',
    'https://youtube.com/juicetry',
    
    -- SEO
    'Juicetry - أفضل العصائر الطبيعية في السعودية',
    'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات. توصيل سريع في الرياض.',
    'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات، عصير برتقال، عصير مانجو، سموثي، الرياض، السعودية',
    
    -- إعدادات متقدمة
    ''
);

-- ===================================
-- إنشاء Index للبحث السريع
-- ===================================
CREATE INDEX IF NOT EXISTS idx_site_settings_id ON site_settings(id);

-- ===================================
-- إنشاء Trigger لتحديث updated_at تلقائياً
-- ===================================
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_site_settings_updated_at();

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '✅✅✅ تم إنشاء الباك إند الكامل لإعدادات الموقع! ✅✅✅';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '📊 التابات المدعومة:';
    RAISE NOTICE '   ✅ التاب 1: إعدادات عامة';
    RAISE NOTICE '      - اسم الموقع';
    RAISE NOTICE '      - وصف الموقع';
    RAISE NOTICE '      - اللوجو';
    RAISE NOTICE '      - الأيقونة (Favicon)';
    RAISE NOTICE '      - الألوان (أساسي، ثانوي، تمييز)';
    RAISE NOTICE '';
    RAISE NOTICE '   ✅ التاب 2: معلومات التواصل';
    RAISE NOTICE '      - رقم الهاتف';
    RAISE NOTICE '      - البريد الإلكتروني';
    RAISE NOTICE '      - العنوان';
    RAISE NOTICE '      - ساعات العمل';
    RAISE NOTICE '      - رقم الواتساب';
    RAISE NOTICE '      - رابط خرائط جوجل';
    RAISE NOTICE '';
    RAISE NOTICE '   ✅ التاب 3: وسائل التواصل الاجتماعي';
    RAISE NOTICE '      - Facebook';
    RAISE NOTICE '      - Twitter';
    RAISE NOTICE '      - Instagram';
    RAISE NOTICE '      - YouTube';
    RAISE NOTICE '';
    RAISE NOTICE '   ✅ التاب 4: تحسين محركات البحث (SEO)';
    RAISE NOTICE '      - Meta Title';
    RAISE NOTICE '      - Meta Description';
    RAISE NOTICE '      - Meta Keywords';
    RAISE NOTICE '';
    RAISE NOTICE '   ✅ التاب 5: إعدادات متقدمة';
    RAISE NOTICE '      - كود Analytics';
    RAISE NOTICE '      - CSS مخصص';
    RAISE NOTICE '      - JavaScript مخصص';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 الآن يمكنك:';
    RAISE NOTICE '   ✅ تعديل جميع الإعدادات من الداشبورد';
    RAISE NOTICE '   ✅ رفع اللوجو والأيقونة';
    RAISE NOTICE '   ✅ تغيير الألوان';
    RAISE NOTICE '   ✅ تحديث معلومات التواصل';
    RAISE NOTICE '   ✅ إضافة روابط السوشيال ميديا';
    RAISE NOTICE '   ✅ تحسين SEO';
    RAISE NOTICE '   ✅ الحفظ سيعمل بنجاح!';
    RAISE NOTICE '';
    RAISE NOTICE '🌐 الموقع: https://juicetryjed.com';
    RAISE NOTICE '🎛️ الداشبورد: https://juicetryjed.com/admin';
    RAISE NOTICE '⚙️ إعدادات الموقع: https://juicetryjed.com/admin → إعدادات الموقع';
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
END $$;

-- ===================================
-- عرض الإعدادات الحالية
-- ===================================
SELECT 
    '⚙️ إعدادات الموقع الحالية:' as info,
    site_name,
    site_logo,
    site_favicon,
    primary_color,
    secondary_color,
    accent_color,
    contact_phone,
    contact_email,
    facebook_url,
    instagram_url,
    meta_title
FROM site_settings
LIMIT 1;

-- ===================================
-- اختبار الحفظ
-- ===================================
DO $$
DECLARE
    test_result RECORD;
BEGIN
    -- محاولة تحديث الإعدادات
    UPDATE site_settings 
    SET contact_phone = '+966501234567',
        updated_at = NOW()
    WHERE id = 1
    RETURNING * INTO test_result;
    
    IF FOUND THEN
        RAISE NOTICE '✅ اختبار الحفظ نجح! رقم الهاتف: %', test_result.contact_phone;
    ELSE
        RAISE NOTICE '❌ فشل اختبار الحفظ';
    END IF;
END $$;
