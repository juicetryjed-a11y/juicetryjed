-- إصلاح عمود slug
-- Fix Slug Column Issue

-- جعل عمود slug يقبل NULL
ALTER TABLE products ALTER COLUMN slug DROP NOT NULL;
ALTER TABLE categories ALTER COLUMN slug DROP NOT NULL;

-- إضافة قيم افتراضية للصفوف الموجودة
UPDATE products 
SET slug = 'product-' || id 
WHERE slug IS NULL OR slug = '';

UPDATE categories 
SET slug = 'category-' || id 
WHERE slug IS NULL OR slug = '';

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إصلاح عمود slug!';
    RAISE NOTICE '✅ الآن slug اختياري ويمكن أن يكون NULL';
END $$;

-- اختبار إضافة منتج بدون slug
DO $$
DECLARE
    test_id INTEGER;
BEGIN
    INSERT INTO products (
        name,
        price,
        image_url,
        stock_quantity,
        sku,
        is_active
    ) VALUES (
        'منتج اختبار',
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
