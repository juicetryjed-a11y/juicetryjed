-- إنشاء جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL DEFAULT 'Juicetry - جوستري',
    site_description TEXT DEFAULT 'محل العصائر الطبيعية الطازجة',
    site_logo TEXT,
    site_favicon TEXT,
    primary_color VARCHAR(7) DEFAULT '#22c55e',
    secondary_color VARCHAR(7) DEFAULT '#84cc16',
    accent_color VARCHAR(7) DEFAULT '#eab308',
    contact_phone VARCHAR(20) DEFAULT '+966501234567',
    contact_email VARCHAR(255) DEFAULT 'info@juicetry.com',
    contact_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours TEXT DEFAULT 'يومياً من 8 صباحاً - 11 مساءً',
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    whatsapp_number VARCHAR(20) DEFAULT '+966501234567',
    google_maps_url TEXT,
    meta_title VARCHAR(255) DEFAULT 'Juicetry - أفضل العصائر الطبيعية',
    meta_description TEXT DEFAULT 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
    meta_keywords TEXT DEFAULT 'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات',
    analytics_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج البيانات الافتراضية
INSERT INTO site_settings (
    site_name,
    site_description,
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
) ON CONFLICT DO NOTHING;

-- إنشاء فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_site_settings_updated_at ON site_settings(updated_at);

-- تفعيل Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة (متاحة للجميع)
CREATE POLICY "Allow public read access" ON site_settings
    FOR SELECT USING (true);

-- سياسة للكتابة (للمديرين فقط)
CREATE POLICY "Allow admin write access" ON site_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- تحديث timestamp عند التعديل
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_site_settings_updated_at();
