-- إنشاء Trigger تلقائي لإنشاء سجل المستخدم والملف الشخصي
-- Automatic Trigger for User and Profile Creation

-- أولاً: إزالة الـ Trigger القديم إذا وجد
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- إنشاء الدالة لمعالجة المستخدم الجديد
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
        'customer' -- الدور الافتراضي
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
        -- تسجيل الخطأ ولكن لا نمنع إنشاء المستخدم
        RAISE WARNING 'Error creating user profile: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- إنشاء الـ Trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- منح الصلاحيات
GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated, anon;
