-- إنشاء جدول المستخدمين
-- Create Users Table

-- حذف الجدول القديم إذا كان موجود
DROP TABLE IF EXISTS users CASCADE;

-- إنشاء جدول المستخدمين
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تعطيل RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- إضافة مستخدم مدير افتراضي
INSERT INTO users (name, email, phone, password, role, is_active) 
VALUES (
    'المدير',
    'admin@juicetry.com',
    '0500000000',
    'admin123',
    'admin',
    true
);

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إنشاء جدول المستخدمين!';
    RAISE NOTICE '✅ تم إضافة مستخدم مدير افتراضي';
    RAISE NOTICE '';
    RAISE NOTICE '📧 البريد: admin@juicetry.com';
    RAISE NOTICE '🔑 كلمة المرور: admin123';
END $$;

-- عرض المستخدمين
SELECT 
    '👥 المستخدمين الموجودين:' as info,
    id,
    name,
    email,
    role,
    is_active
FROM users;

-- اختبار إضافة مستخدم
DO $$
DECLARE
    test_id UUID;
BEGIN
    INSERT INTO users (
        name,
        email,
        password,
        role
    ) VALUES (
        'مستخدم اختبار',
        'test' || floor(random() * 10000) || '@test.com',
        'test123',
        'user'
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE '✅ تم إضافة مستخدم اختبار بنجاح! ID: %', test_id;
    
    -- حذف المستخدم التجريبي
    DELETE FROM users WHERE id = test_id;
    RAISE NOTICE '✅ تم حذف المستخدم التجريبي';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ فشل: %', SQLERRM;
END $$;
