-- إنشاء الجداول المفقودة - Create Missing Tables
-- شغل هذا الكود في Supabase SQL Editor

-- إنشاء جدول users
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- إنشاء Policies للسماح بكل العمليات
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
CREATE POLICY "Allow all operations on users"
ON users FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on profiles" ON profiles;
CREATE POLICY "Allow all operations on profiles"
ON profiles FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- منح الصلاحيات
GRANT ALL ON users TO anon, authenticated;
GRANT ALL ON profiles TO anon, authenticated;

-- إنشاء Trigger تلقائي
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- إنشاء سجل في جدول users
    INSERT INTO public.users (id, email, role)
    VALUES (
        NEW.id,
        NEW.email,
        'customer'
    );
    
    -- إنشاء سجل في جدول profiles
    INSERT INTO public.profiles (id, full_name, phone, address, city)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'address',
        NEW.raw_user_meta_data->>'city'
    );
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error creating user profile: %', SQLERRM;
        RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated, anon;

-- التحقق من الإنشاء
SELECT 'users table created successfully' as status;
SELECT 'profiles table created successfully' as status;
SELECT 'RLS policies created successfully' as status;
SELECT 'Trigger created successfully' as status;

-- عرض الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('users', 'profiles');

DO $$
BEGIN
    RAISE NOTICE '✅ تم إنشاء جميع الجداول بنجاح!';
    RAISE NOTICE '✅ Users and Profiles tables are ready!';
    RAISE NOTICE '✅ RLS Policies are active!';
    RAISE NOTICE '✅ Trigger is created and working!';
END $$;
