-- ============================================
-- فحص البيانات في قاعدة البيانات
-- ============================================

-- 1. فحص المنتجات
SELECT 
  id,
  name,
  price,
  category_id,
  is_active,
  image_url,
  created_at
FROM products
ORDER BY created_at DESC;

-- 2. فحص التصنيفات
SELECT 
  id,
  name,
  is_active,
  order_index
FROM categories
ORDER BY order_index;

-- 3. عدد المنتجات النشطة
SELECT COUNT(*) as active_products
FROM products
WHERE is_active = true;

-- 4. عدد التصنيفات النشطة
SELECT COUNT(*) as active_categories
FROM categories
WHERE is_active = true;

-- 5. المنتجات بدون صور
SELECT 
  id,
  name,
  image_url
FROM products
WHERE image_url IS NULL OR image_url = '';

-- 6. المنتجات حسب التصنيف
SELECT 
  c.name as category_name,
  COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
WHERE c.is_active = true
GROUP BY c.id, c.name
ORDER BY c.order_index;
