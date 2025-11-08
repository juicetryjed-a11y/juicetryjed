-- إضافة الأعمدة المفقودة لجدول products
-- Add Missing Columns to Products Table

-- إضافة عمود calories إذا لم يكن موجود
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'calories'
    ) THEN
        ALTER TABLE products ADD COLUMN calories INTEGER;
        RAISE NOTICE '✅ تم إضافة عمود calories';
    ELSE
        RAISE NOTICE 'ℹ️ عمود calories موجود بالفعل';
    END IF;
END $$;

-- إضافة عمود ingredients إذا لم يكن موجود
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'ingredients'
    ) THEN
        ALTER TABLE products ADD COLUMN ingredients TEXT[];
        RAISE NOTICE '✅ تم إضافة عمود ingredients';
    ELSE
        RAISE NOTICE 'ℹ️ عمود ingredients موجود بالفعل';
    END IF;
END $$;

-- إضافة عمود is_available إذا لم يكن موجود
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'is_available'
    ) THEN
        ALTER TABLE products ADD COLUMN is_available BOOLEAN DEFAULT true;
        RAISE NOTICE '✅ تم إضافة عمود is_available';
    ELSE
        RAISE NOTICE 'ℹ️ عمود is_available موجود بالفعل';
    END IF;
END $$;

-- إضافة عمود nutritional_info إذا لم يكن موجود
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'nutritional_info'
    ) THEN
        ALTER TABLE products ADD COLUMN nutritional_info JSONB;
        RAISE NOTICE '✅ تم إضافة عمود nutritional_info';
    ELSE
        RAISE NOTICE 'ℹ️ عمود nutritional_info موجود بالفعل';
    END IF;
END $$;

-- إضافة عمود size_options إذا لم يكن موجود
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'size_options'
    ) THEN
        ALTER TABLE products ADD COLUMN size_options JSONB;
        RAISE NOTICE '✅ تم إضافة عمود size_options';
    ELSE
        RAISE NOTICE 'ℹ️ عمود size_options موجود بالفعل';
    END IF;
END $$;

-- عرض جميع الأعمدة الموجودة
SELECT 
    'أعمدة جدول products:' as info,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم التحقق من جميع الأعمدة!';
    RAISE NOTICE '🔄 الآن يمكنك إضافة منتجات بدون مشاكل!';
END $$;
