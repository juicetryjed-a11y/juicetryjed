# 🚨 إصلاح عاجل - جدول users غير موجود!

## المشكلة
```
ERROR: 42P01: relation "users" does not exist
```

## الحل الفوري - خطوتين فقط

### الخطوة 1: شغل هذا الكود في Supabase
1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. انسخ والصق هذا الكود:

```sql
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

-- تفعيل الأمان
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- السماح بالعمليات
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);

-- منح الصلاحيات
GRANT ALL ON users TO anon, authenticated;
GRANT ALL ON profiles TO anon, authenticated;
```

5. اضغط **RUN**

### الخطوة 2: أعد تشغيل التطبيق
```bash
npm run dev
```

## النتيجة
✅ **الجداول ستنشأ تلقائياً**
✅ **إدارة المستخدمين ستعمل**
✅ **يمكنك إضافة مستخدمين جدد**

## للتحقق
بعد تشغيل الكود، يمكنك التحقق:

```sql
-- رؤية الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('users', 'profiles');

-- رؤية المستخدمين
SELECT * FROM users LIMIT 5;
```

## إذا واجهت مشاكل
- تأكد أنك تشغل الكود في **SQL Editor** وليس في ملف
- تأكد أنك اخترت المشروع الصحيح في Supabase
- أعد تشغيل التطبيق بعد إنشاء الجداول

**النظام جاهز الآن!** 🎉
