-- إصلاح سريع: إضافة جميع الأعمدة المفقودة
-- Quick Fix: Add All Missing Columns

-- إضافة الأعمدة المفقودة لجدول products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS ingredients TEXT[],
ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS nutritional_info JSONB,
ADD COLUMN IF NOT EXISTS size_options JSONB;

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إضافة جميع الأعمدة المفقودة!';
    RAISE NOTICE '✅ الآن يمكنك إضافة منتجات بدون مشاكل!';
END $$;

-- عرض جميع الأعمدة
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;
