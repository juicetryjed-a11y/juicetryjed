-- ============================================
-- إضافة منتجات تجريبية مع صور
-- ============================================

-- حذف المنتجات القديمة (اختياري)
-- DELETE FROM products;

-- إضافة منتجات تجريبية
INSERT INTO products (name, description, price, category_id, image_url, is_active, is_featured)
VALUES
  -- عصائر طبيعية
  (
    'عصير برتقال طازج',
    'عصير برتقال طبيعي 100% محضر من أجود أنواع البرتقال الطازج',
    15.00,
    1,
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    true,
    true
  ),
  (
    'عصير فراولة',
    'عصير فراولة طبيعي طازج غني بالفيتامينات',
    18.00,
    1,
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&h=600&fit=crop',
    true,
    false
  ),
  (
    'عصير مانجو',
    'عصير مانجو طبيعي من أفضل أنواع المانجو',
    20.00,
    1,
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&h=600&fit=crop',
    true,
    true
  ),
  (
    'عصير تفاح',
    'عصير تفاح طبيعي منعش ومفيد',
    16.00,
    1,
    'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&h=600&fit=crop',
    true,
    false
  ),

  -- سموثي
  (
    'سموثي التوت الأزرق',
    'سموثي غني بالتوت الأزرق والفواكه الطازجة',
    22.00,
    2,
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&h=600&fit=crop',
    true,
    true
  ),
  (
    'سموثي الموز والفراولة',
    'مزيج رائع من الموز والفراولة الطازجة',
    20.00,
    2,
    'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800&h=600&fit=crop',
    true,
    false
  ),

  -- عصائر خضراء
  (
    'عصير أخضر ديتوكس',
    'مزيج من الخضروات الطازجة للتخلص من السموم',
    25.00,
    3,
    'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=600&fit=crop',
    true,
    true
  ),
  (
    'عصير سبانخ وتفاح',
    'عصير صحي غني بالحديد والفيتامينات',
    23.00,
    3,
    'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop',
    true,
    false
  ),

  -- كوكتيلات
  (
    'كوكتيل استوائي',
    'مزيج من الفواكه الاستوائية المنعشة',
    28.00,
    4,
    'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&h=600&fit=crop',
    true,
    true
  ),
  (
    'كوكتيل التوت المشكل',
    'مزيج رائع من أنواع التوت المختلفة',
    26.00,
    4,
    'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&h=600&fit=crop',
    true,
    false
  );

-- التحقق من الإضافة
SELECT 
  id,
  name,
  price,
  category_id,
  is_active,
  LEFT(image_url, 50) as image_preview
FROM products
ORDER BY created_at DESC
LIMIT 10;
