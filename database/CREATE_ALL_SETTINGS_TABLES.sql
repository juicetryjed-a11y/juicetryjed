-- إنشاء جميع جداول الإعدادات
-- Create All Settings Tables

-- ===================================
-- 1. جدول إعدادات الموقع - Site Settings
-- ===================================

DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    site_name TEXT DEFAULT 'Juicetry - جوستري',
    site_description TEXT,
    site_logo TEXT,
    site_favicon TEXT,
    primary_color TEXT DEFAULT '#22c55e',
    secondary_color TEXT DEFAULT '#84cc16',
    accent_color TEXT DEFAULT '#eab308',
    contact_phone TEXT,
    contact_email TEXT,
    contact_address TEXT,
    working_hours TEXT,
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    whatsapp_number TEXT,
    google_maps_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    analytics_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 2. جدول إعدادات الهيدر - Header Settings
-- ===================================

DROP TABLE IF EXISTS header_settings CASCADE;

CREATE TABLE header_settings (
    id SERIAL PRIMARY KEY,
    show_logo BOOLEAN DEFAULT true,
    logo_url TEXT,
    show_search BOOLEAN DEFAULT true,
    show_cart BOOLEAN DEFAULT true,
    show_user_menu BOOLEAN DEFAULT true,
    navigation_items JSONB,
    header_background TEXT DEFAULT '#ffffff',
    header_text_color TEXT DEFAULT '#1f2937',
    sticky_header BOOLEAN DEFAULT true,
    announcement_bar BOOLEAN DEFAULT false,
    announcement_text TEXT,
    announcement_color TEXT DEFAULT '#22c55e',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 3. جدول إعدادات التواصل - Contact Settings
-- ===================================

DROP TABLE IF EXISTS contact_settings CASCADE;

CREATE TABLE contact_settings (
    id SERIAL PRIMARY KEY,
    phone TEXT,
    email TEXT,
    address TEXT,
    whatsapp TEXT,
    facebook TEXT,
    instagram TEXT,
    twitter TEXT,
    youtube TEXT,
    working_hours TEXT,
    map_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- 4. جدول إعدادات السلايدر - Slider Settings
-- ===================================

DROP TABLE IF EXISTS slider_settings CASCADE;

CREATE TABLE slider_settings (
    id SERIAL PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    image_url TEXT,
    link_url TEXT,
    button_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- تعطيل RLS لجميع الجداول
-- ===================================

ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE header_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE slider_settings DISABLE ROW LEVEL SECURITY;

-- ===================================
-- إضافة بيانات افتراضية
-- ===================================

-- إعدادات الموقع
INSERT INTO site_settings (
    site_name, site_description, site_logo, site_favicon,
    primary_color, secondary_color, accent_color,
    contact_phone, contact_email, contact_address, working_hours,
    whatsapp_number, meta_title, meta_description, meta_keywords
) VALUES (
    'Juicetry - جوستري',
    'محل العصائر الطبيعية الطازجة',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=200',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=32',
    '#22c55e', '#84cc16', '#eab308',
    '+966501234567', 'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    'يومياً من 8 صباحاً - 11 مساءً',
    '+966501234567',
    'Juicetry - أفضل العصائر الطبيعية',
    'اكتشف أفضل العصائر الطبيعية الطازجة',
    'عصائر طبيعية، عصائر طازجة، مشروبات صحية'
);

-- إعدادات الهيدر
INSERT INTO header_settings (
    show_logo, logo_url, show_search, show_cart, show_user_menu,
    navigation_items, header_background, header_text_color,
    sticky_header, announcement_bar, announcement_text, announcement_color
) VALUES (
    true,
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=200',
    true, true, true,
    '[
        {"id": "1", "label": "الرئيسية", "url": "/", "is_active": true, "order_index": 1},
        {"id": "2", "label": "المنتجات", "url": "/menu", "is_active": true, "order_index": 2},
        {"id": "3", "label": "من نحن", "url": "/about", "is_active": true, "order_index": 3},
        {"id": "4", "label": "المقالات", "url": "/blog", "is_active": true, "order_index": 4},
        {"id": "5", "label": "تواصل معنا", "url": "/contact", "is_active": true, "order_index": 5}
    ]'::jsonb,
    '#ffffff', '#1f2937',
    true, false,
    'خصم 20% على جميع العصائر الطبيعية! 🎉',
    '#22c55e'
);

-- إعدادات التواصل
INSERT INTO contact_settings (
    phone, email, address, whatsapp,
    working_hours, is_active
) VALUES (
    '+966501234567',
    'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    '+966501234567',
    'يومياً من 8 صباحاً - 11 مساءً',
    true
);

-- إعدادات السلايدر
INSERT INTO slider_settings (title, subtitle, image_url, link_url, button_text, display_order, is_active) VALUES
('عصائر طبيعية 100%', 'طازجة ولذيذة من أجود الفواكه', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200', '/menu', 'اطلب الآن', 1, true),
('مشروبات صحية', 'غنية بالفيتامينات والمعادن', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1200', '/menu', 'تصفح القائمة', 2, true);

-- ===================================
-- رسائل النجاح
-- ===================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '✅✅✅ تم إنشاء جميع جداول الإعدادات بنجاح! ✅✅✅';
    RAISE NOTICE '════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '📊 الجداول المنشأة:';
    RAISE NOTICE '   ✅ site_settings (إعدادات الموقع)';
    RAISE NOTICE '   ✅ header_settings (إعدادات الهيدر)';
    RAISE NOTICE '   ✅ contact_settings (إعدادات التواصل)';
    RAISE NOTICE '   ✅ slider_settings (إعدادات السلايدر)';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 الآن يمكنك:';
    RAISE NOTICE '   🖼️ تغيير اللوجو والأيقونة';
    RAISE NOTICE '   🎨 تعديل ألوان الموقع';
    RAISE NOTICE '   📞 تحديث معلومات التواصل';
    RAISE NOTICE '   📱 إضافة روابط وسائل التواصل';
    RAISE NOTICE '   🎬 تعديل السلايدر';
    RAISE NOTICE '   🔍 تحسين SEO';
    RAISE NOTICE '';
    RAISE NOTICE '🌐 الموقع: https://juicetryjed.com';
    RAISE NOTICE '🎛️ الداشبورد: https://juicetryjed.com/admin';
    RAISE NOTICE '⚙️ إعدادات الموقع: https://juicetryjed.com/admin → إعدادات الموقع';
    RAISE NOTICE '';
    RAISE NOTICE '════════════════════════════════════════════════════';
END $$;

-- عرض الإعدادات الحالية
SELECT '⚙️ إعدادات الموقع:' as info, site_name, site_logo, primary_color FROM site_settings LIMIT 1;
SELECT '🎨 إعدادات الهيدر:' as info, logo_url, header_background FROM header_settings LIMIT 1;
SELECT '📞 إعدادات التواصل:' as info, phone, email FROM contact_settings LIMIT 1;
SELECT '🎬 السلايدر:' as info, COUNT(*) as total_slides FROM slider_settings WHERE is_active = true;
