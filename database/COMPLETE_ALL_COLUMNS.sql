-- التأكد من وجود جميع الأعمدة المطلوبة لكل الجداول
-- Ensure All Required Columns Exist for All Tables

-- ===================================
-- جدول المنتجات - Products
-- ===================================

-- الأعمدة الأساسية
ALTER TABLE products ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name TEXT NOT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id INTEGER;
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[];

-- الأعمدة الإضافية
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS nutritional_info JSONB;
ALTER TABLE products ADD COLUMN IF NOT EXISTS calories INTEGER;
ALTER TABLE products ADD COLUMN IF NOT EXISTS size_options JSONB;

-- حالة المنتج
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- المخزون
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 100;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT;

-- التواريخ
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول التصنيفات - Categories
-- ===================================

ALTER TABLE categories ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name TEXT NOT NULL;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول الطلبات - Orders
-- ===================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT NOT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_city TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول عناصر الطلب - Order Items
-- ===================================

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS order_id UUID;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_id INTEGER;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10, 2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول المراجعات - Reviews
-- ===================================

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS customer_name TEXT NOT NULL;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS rating INTEGER;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS review_text TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS product_id INTEGER;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS customer_image_url TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول المدونة - Blog Posts
-- ===================================

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title TEXT NOT NULL;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول العملاء - Customers
-- ===================================

ALTER TABLE customers ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE customers ADD COLUMN IF NOT EXISTS name TEXT NOT NULL;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_orders INTEGER DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_spent DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE customers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول إعدادات صفحة من نحن - About Page Settings
-- ===================================

ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS mission_title TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS mission_text TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS vision_title TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS vision_text TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS values_title TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS values_text TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS location_name TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS location_address TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS location_url TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS background_color TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS text_color TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS accent_color TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS title_color TEXT;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE about_page_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول إعدادات الموقع - Site Settings
-- ===================================

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS site_name TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS site_name_ar TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS site_name_en TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS favicon_url TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS primary_color TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS secondary_color TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS font_family TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول إعدادات الهيدر - Header Settings
-- ===================================

ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS show_search BOOLEAN DEFAULT true;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS show_cart BOOLEAN DEFAULT true;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS show_language_switcher BOOLEAN DEFAULT true;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS background_color TEXT;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS text_color TEXT;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS is_sticky BOOLEAN DEFAULT true;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE header_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول إعدادات التواصل - Contact Settings
-- ===================================

ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS facebook TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS twitter TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS youtube TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS working_hours TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS map_url TEXT;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE contact_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- جدول إعدادات السلايدر - Slider Settings
-- ===================================

ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS link_url TEXT;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS button_text TEXT;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE slider_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ===================================
-- رسائل النجاح والتحقق
-- ===================================

DO $$
BEGIN
    RAISE NOTICE '✅ تم التحقق من جميع الأعمدة المطلوبة!';
    RAISE NOTICE '✅ تم إضافة أي أعمدة مفقودة!';
    RAISE NOTICE '';
    RAISE NOTICE '📊 الجداول المحدثة:';
    RAISE NOTICE '   - products (المنتجات)';
    RAISE NOTICE '   - categories (التصنيفات)';
    RAISE NOTICE '   - orders (الطلبات)';
    RAISE NOTICE '   - order_items (عناصر الطلب)';
    RAISE NOTICE '   - reviews (المراجعات)';
    RAISE NOTICE '   - blog_posts (المدونة)';
    RAISE NOTICE '   - customers (العملاء)';
    RAISE NOTICE '   - about_page_settings (صفحة من نحن)';
    RAISE NOTICE '   - site_settings (إعدادات الموقع)';
    RAISE NOTICE '   - header_settings (إعدادات الهيدر)';
    RAISE NOTICE '   - contact_settings (إعدادات التواصل)';
    RAISE NOTICE '   - slider_settings (إعدادات السلايدر)';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 الآن يمكنك إرسال واستقبال البيانات بدون مشاكل!';
END $$;

-- عرض أعمدة جدول المنتجات للتأكد
SELECT 
    '📦 أعمدة جدول المنتجات:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;
