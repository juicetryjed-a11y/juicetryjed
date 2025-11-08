-- دوال SQL لإدارة المستخدمين مع المصادقة
-- User Management Functions with Authentication

-- دالة إنشاء مستخدم جديد مع المصادقة
CREATE OR REPLACE FUNCTION create_user_admin(
    user_email TEXT,
    user_password TEXT,
    user_role TEXT DEFAULT 'customer',
    user_full_name TEXT DEFAULT NULL,
    user_phone TEXT DEFAULT NULL,
    user_address TEXT DEFAULT NULL,
    user_city TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    email TEXT,
    role TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    profile JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_user_id UUID;
    created_user RECORD;
BEGIN
    -- التحقق من صلاحيات المدير
    IF NOT EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'غير مصرح: فقط المديرون يمكنهم إنشاء مستخدمين';
    END IF;

    -- التحقق من وجود البريد الإلكتروني
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
        RAISE EXCEPTION 'البريد الإلكتروني موجود بالفعل';
    END IF;

    -- إنشاء مستخدم المصادقة
    INSERT INTO auth.users (email, password_hash)
    VALUES (user_email, crypt(user_password, gen_salt('bf')))
    RETURNING id INTO new_user_id;

    -- إنشاء سجل المستخدم
    INSERT INTO users (id, email, role)
    VALUES (new_user_id, user_email, user_role)
    RETURNING * INTO created_user;

    -- إنشاء الملف الشخصي
    INSERT INTO profiles (id, full_name, phone, address, city)
    VALUES (new_user_id, user_full_name, user_phone, user_address, user_city);

    -- إرجاع النتيجة
    RETURN QUERY
    SELECT 
        u.id,
        u.email,
        u.role,
        u.created_at,
        u.updated_at,
        to_jsonb(p) as profile
    FROM users u
    LEFT JOIN profiles p ON u.id = p.id
    WHERE u.id = new_user_id;
END;
$$;

-- دالة حذف مستخدم المصادقة
CREATE OR REPLACE FUNCTION delete_auth_user(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- التحقق من صلاحيات المدير
    IF NOT EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'غير مصرح: فقط المديرون يمكنهم حذف المستخدمين';
    END IF;

    -- حذف مستخدم المصادقة
    DELETE FROM auth.users WHERE id = user_id;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'فشل حذف مستخدم المصادقة: %', SQLERRM;
        RETURN FALSE;
END;
$$;

-- منح الصلاحيات للدوال
GRANT EXECUTE ON FUNCTION create_user_admin TO authenticated, anon;
GRANT EXECUTE ON FUNCTION delete_auth_user TO authenticated, anon;

-- إنشاء RLS Policies للدوال
ALTER FUNCTION create_user_admin SECURITY DEFINER;
ALTER FUNCTION delete_auth_user SECURITY DEFINER;
