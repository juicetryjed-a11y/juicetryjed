-- إنشاء جدول إعدادات الهيدر
CREATE TABLE IF NOT EXISTS header_settings (
    id SERIAL PRIMARY KEY,
    show_logo BOOLEAN DEFAULT true,
    logo_url TEXT,
    show_search BOOLEAN DEFAULT true,
    show_cart BOOLEAN DEFAULT true,
    show_user_menu BOOLEAN DEFAULT true,
    navigation_items JSONB DEFAULT '[
        {"id": "1", "label": "الرئيسية", "url": "/", "is_active": true, "order_index": 1},
        {"id": "2", "label": "المنتجات", "url": "/menu", "is_active": true, "order_index": 2},
        {"id": "3", "label": "من نحن", "url": "/about", "is_active": true, "order_index": 3},
        {"id": "4", "label": "المقالات", "url": "/blog", "is_active": true, "order_index": 4},
        {"id": "5", "label": "تواصل معنا", "url": "/contact", "is_active": true, "order_index": 5}
    ]'::jsonb,
    header_background VARCHAR(7) DEFAULT '#ffffff',
    header_text_color VARCHAR(7) DEFAULT '#1f2937',
    sticky_header BOOLEAN DEFAULT true,
    announcement_bar BOOLEAN DEFAULT false,
    announcement_text TEXT DEFAULT 'خصم 20% على جميع العصائر الطبيعية! 🎉',
    announcement_color VARCHAR(7) DEFAULT '#22c55e',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج البيانات الافتراضية
INSERT INTO header_settings (
    show_logo,
    show_search,
    show_cart,
    show_user_menu,
    header_background,
    header_text_color,
    sticky_header,
    announcement_bar,
    announcement_text,
    announcement_color
) VALUES (
    true,
    true,
    true,
    true,
    '#ffffff',
    '#1f2937',
    true,
    false,
    'خصم 20% على جميع العصائر الطبيعية! 🎉',
    '#22c55e'
) ON CONFLICT DO NOTHING;

-- إنشاء فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_header_settings_updated_at ON header_settings(updated_at);

-- تفعيل Row Level Security
ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة (متاحة للجميع)
CREATE POLICY "Allow public read access" ON header_settings
    FOR SELECT USING (true);

-- سياسة للكتابة (للمديرين فقط)
CREATE POLICY "Allow admin write access" ON header_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- تحديث timestamp عند التعديل
CREATE OR REPLACE FUNCTION update_header_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_header_settings_updated_at
    BEFORE UPDATE ON header_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_header_settings_updated_at();
