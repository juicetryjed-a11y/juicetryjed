-- إنشاء جدول إعدادات الموقع الكامل
-- Create Complete Site Settings Table

-- حذف الجدول القديم
DROP TABLE IF EXISTS site_settings CASCADE;

-- إنشاء جدول إعدادات الموقع
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    
    -- معلومات الموقع الأساسية
    site_name TEXT DEFAULT 'Juicetry - جوستري',
    site_description TEXT DEFAULT 'محل العصائر الطبيعية الطازجة',
    site_logo TEXT,
    site_favicon TEXT,
    
    -- الألوان والتصميم
    primary_color TEXT DEFAULT '#22c55e',
    secondary_color TEXT DEFAULT '#84cc16',
    accent_color TEXT DEFAULT '#eab308',
    
    -- معلومات التواصل
    contact_phone TEXT DEFAULT '+966501234567',
    contact_email TEXT DEFAULT 'info@juicetry.com',
    contact_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours TEXT DEFAULT 'يومياً من 8 صباحاً - 11 مساءً',
    
    -- وسائل التواصل الاجتماعي
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    whatsapp_number TEXT DEFAULT '+966501234567',
    google_maps_url TEXT,
    
    -- تحسين محركات البحث (SEO)
    meta_title TEXT DEFAULT 'Juicetry - أفضل العصائر الطبيعية',
    meta_description TEXT DEFAULT 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry',
    meta_keywords TEXT DEFAULT 'عصائر طبيعية، عصائر طازجة، مشروبات صحية',
    
    -- إعدادات متقدمة
    analytics_code TEXT,
    
    -- التواريخ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تعطيل RLS
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- إضافة إعدادات افتراضية
INSERT INTO site_settings (
    site_name,
    site_description,
    site_logo,
    site_favicon,
    primary_color,
    secondary_color,
    accent_color,
    contact_phone,
    contact_email,
    contact_address,
    working_hours,
    whatsapp_number,
    meta_title,
    meta_description,
    meta_keywords
) VALUES (
    'Juicetry - جوستري',
    'محل العصائر الطبيعية الطازجة',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=200',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=32',
    '#22c55e',
    '#84cc16',
    '#eab308',
    '+966501234567',
    'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    'يومياً من 8 صباحاً - 11 مساءً',
    '+966501234567',
    'Juicetry - أفضل العصائر الطبيعية',
    'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
    'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات'
);

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '✅ تم إنشاء جدول إعدادات الموقع بنجاح!';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '📊 الحقول المتاحة:';
    RAISE NOTICE '   🏷️ اسم الموقع (site_name)';
    RAISE NOTICE '   📝 وصف الموقع (site_description)';
    RAISE NOTICE '   🖼️ اللوجو (site_logo)';
    RAISE NOTICE '   🎨 الأيقونة (site_favicon)';
    RAISE NOTICE '   🎨 الألوان (primary_color, secondary_color, accent_color)';
    RAISE NOTICE '   📞 معلومات التواصل (phone, email, address, working_hours)';
    RAISE NOTICE '   📱 وسائل التواصل (facebook, twitter, instagram, youtube, whatsapp)';
    RAISE NOTICE '   🔍 SEO (meta_title, meta_description, meta_keywords)';
    RAISE NOTICE '   📊 Analytics (analytics_code)';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 الآن يمكنك:';
    RAISE NOTICE '   ✅ تعديل اللوجو والأيقونة';
    RAISE NOTICE '   ✅ تغيير ألوان الموقع';
    RAISE NOTICE '   ✅ تحديث معلومات التواصل';
    RAISE NOTICE '   ✅ إضافة روابط وسائل التواصل';
    RAISE NOTICE '   ✅ تحسين SEO';
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
END $$;

-- عرض الإعدادات الحالية
SELECT 
    '⚙️ إعدادات الموقع الحالية:' as info,
    site_name,
    site_logo,
    site_favicon,
    primary_color,
    secondary_color,
    accent_color
FROM site_settings
LIMIT 1;
