-- إصلاح عمود ingredients
-- Fix Ingredients Column Issue

-- الحل 1: حذف عمود ingredients (الأسهل)
ALTER TABLE products DROP COLUMN IF EXISTS ingredients;

-- الحل 2: إعادة إنشاء العمود كـ TEXT بدلاً من TEXT[]
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients TEXT;

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إصلاح عمود ingredients!';
    RAISE NOTICE '✅ الآن يمكنك إضافة منتجات بدون مشاكل!';
END $$;

-- اختبار إضافة منتج
DO $$
DECLARE
    test_id INTEGER;
BEGIN
    INSERT INTO products (
        name,
        slug,
        price,
        image_url,
        stock_quantity,
        sku,
        is_active
    ) VALUES (
        'منتج اختبار',
        'test-' || floor(random() * 10000),
        25.00,
        'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
        100,
        'TEST-' || floor(random() * 10000),
        true
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE '✅ تم إضافة منتج اختبار بنجاح! ID: %', test_id;
    
    -- حذف المنتج التجريبي
    DELETE FROM products WHERE id = test_id;
    RAISE NOTICE '✅ تم حذف المنتج التجريبي';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ فشل: %', SQLERRM;
END $$;
