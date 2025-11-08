# 🚨 إصلاح سريع لمشكلة إضافة المستخدمين

## المشكلة
المستخدم لا يضاف إلى القائمة بعد إنشائه.

## الحل الفوري - 3 خطوات

### الخطوة 1: تشغيل SQL Script
اذهب إلى Supabase Dashboard > SQL Editor والصق هذا الكود:

```sql
-- انسخ الكود من ملف database/check_and_fix_tables.sql
-- أو شغل هذه الأوامر السريعة:

-- التحقق من الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('users', 'profiles');

-- إنشاء الجداول إذا لم تكن موجودة
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- تفعيل RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
```

### الخطوة 2: إعادة تشغيل التطبيق
```bash
# أغلق الخادم وأعد تشغيله
npm run dev
```

### الخطوة 3: اختبار الإنشاء
1. افتح لوحة التحكم
2. اذهب لتبويب "المستخدمون"
3. اضغط "مستخدم جديد"
4. املأ البيانات:
   - البريد: `test@user.com`
   - كلمة المرور: `123456`
   - الاسم: `مستخدم تجريبي`
5. اضغط "إنشاء المستخدم"

## إذا لم ينجح - جرب الطريقة اليدوية

### افتح Console في المتصفح
1. اضغط F12
2. اذهب لتبويب Console
3. جرب إنشاء مستخدم وشاهد الرسائل

### تحقق من قاعدة البيانات يدوياً
```sql
-- شاهد المستخدمين في auth.users
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- شاهد المستخدمين في جدول users
SELECT id, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5;

-- شاهد الـ profiles
SELECT id, full_name, phone, city FROM profiles ORDER BY created_at DESC LIMIT 5;
```

## حلول بديلة

### الحل 1: استخدام Mock Data
مؤقتاً، يمكنك تفعيل وضع الاختبار:
```bash
# في ملف .env
VITE_USE_MOCK_DATA=true
```

### الحل 2: إنشاء مستخدم يدوياً
```sql
-- إنشاء مستخدم يدوياً للاختبار
INSERT INTO users (id, email, role) 
VALUES ('12345678-1234-1234-1234-123456789012', 'test@example.com', 'customer');

INSERT INTO profiles (id, full_name, phone, city) 
VALUES ('12345678-1234-1234-1234-123456789012', 'مستخدم تجريبي', '0501234567', 'الرياض');
```

## أشهر الأخطاء والحلول

### ❌ "User already registered"
**الحل:** استخدم بريد إلكتروني مختلف

### ❌ "Invalid login credentials"
**الحل:** تحقق من إعدادات .env واتصال Supabase

### ❌ "relation "users" does not exist"
**الحل:** شغل SQL script من الخطوة 1

### ❌ "No rows returned"
**الحل:** الـ Trigger لم يعمل، أنشئ المستخدم يدوياً

## للتواصل والدعم
إذا واجهت مشاكل:
1. شاهد رسائل Console في المتصفح
2. تحقق من Supabase Logs
3. جرب الخطوات المذكورة أعلاه بالترتيب

**ملاحظة:** النظام يعمل الآن مع logging أفضل لتتبع المشاكل! 📊
