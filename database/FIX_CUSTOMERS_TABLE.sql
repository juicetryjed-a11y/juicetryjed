-- إصلاح جدول العملاء
-- Fix Customers Table

-- الخطوة 1: تحديث القيم الفارغة بقيمة افتراضية
UPDATE customers 
SET name = 'عميل' 
WHERE name IS NULL OR name = '';

UPDATE customers 
SET email = 'customer' || id || '@example.com' 
WHERE email IS NULL OR email = '';

UPDATE customers 
SET phone = '0500000000' 
WHERE phone IS NULL OR phone = '';

-- الخطوة 2: تعديل الأعمدة لتقبل NULL (أو جعلها NOT NULL بعد التحديث)
-- نجعل name و email و phone اختيارية
ALTER TABLE customers ALTER COLUMN name DROP NOT NULL;
ALTER TABLE customers ALTER COLUMN email DROP NOT NULL;
ALTER TABLE customers ALTER COLUMN phone DROP NOT NULL;

-- الخطوة 3: إضافة الأعمدة المفقودة
ALTER TABLE customers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_orders INTEGER DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_spent DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE customers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إصلاح جدول العملاء!';
    RAISE NOTICE '✅ الآن يمكنك إضافة عملاء بدون مشاكل!';
END $$;

-- عرض البيانات
SELECT * FROM customers LIMIT 5;
