-- تحديث صور المنتجات لاستخدام روابط حقيقية
-- Update Product Images with Real URLs

-- تحديث صور المنتجات
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' WHERE slug = 'orange-juice';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400' WHERE slug = 'mango-juice';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400' WHERE slug = 'strawberry-juice';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400' WHERE slug LIKE '%berry%smoothie%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400' WHERE slug LIKE '%banana%smoothie%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400' WHERE slug LIKE '%tropical%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400' WHERE slug LIKE '%green%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400' WHERE slug = 'apple-juice';

-- تحديث صور التصنيفات
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400' WHERE slug = 'fresh-juices';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400' WHERE slug = 'smoothies';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400' WHERE slug = 'cocktails';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400' WHERE slug = 'healthy-drinks';

-- تحديث صور السلايدر
UPDATE slider_settings SET image_url = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200' WHERE display_order = 1;
UPDATE slider_settings SET image_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1200' WHERE display_order = 2;

-- عرض النتائج
SELECT 'تم تحديث الصور بنجاح!' as status;
SELECT id, name, image_url FROM products LIMIT 5;

DO $$
BEGIN
    RAISE NOTICE '✅ تم تحديث جميع الصور!';
    RAISE NOTICE '✅ الآن الصور ستظهر بشكل صحيح!';
    RAISE NOTICE '🔄 أعد تحميل الموقع لرؤية التغييرات.';
END $$;
