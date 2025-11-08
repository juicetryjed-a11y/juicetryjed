-- ============================================
-- بيانات تجريبية إضافية لـ Juicetry
-- يمكن تشغيل هذا الملف لإضافة المزيد من البيانات
-- ============================================

-- ============================================
-- 1. تصنيفات إضافية
-- ============================================

INSERT INTO categories (name, name_en, description, icon, color, order_index, is_active) VALUES
('عصائر موسمية', 'Seasonal Juices', 'عصائر الفواكه الموسمية الطازجة', '🌸', '#ec4899', 6, true),
('مشروبات صحية', 'Healthy Drinks', 'مشروبات غنية بالفيتامينات والمعادن', '💪', '#10b981', 7, true),
('عصائر استوائية', 'Tropical Juices', 'عصائر الفواكه الاستوائية المنعشة', '🏝️', '#fbbf24', 8, true);

-- ============================================
-- 2. منتجات متنوعة
-- ============================================

-- عصائر طازجة
INSERT INTO products (
  name, name_en, description, description_en,
  price, original_price, category_id, image_url,
  ingredients, available_sizes,
  is_active, is_featured, is_new, in_stock
) VALUES
(
  'عصير تفاح أخضر', 'Green Apple Juice',
  'عصير تفاح أخضر طازج بطعم حامض منعش', 'Fresh green apple juice with refreshing sour taste',
  14.00, 16.00, 1, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
  ARRAY['تفاح أخضر', 'ماء', 'ثلج'], ARRAY['صغير', 'متوسط', 'كبير'],
  true, false, true, true
),
(
  'عصير رمان', 'Pomegranate Juice',
  'عصير رمان طبيعي غني بمضادات الأكسدة', 'Natural pomegranate juice rich in antioxidants',
  22.00, NULL, 1, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
  ARRAY['رمان طازج', 'ماء', 'عسل'], ARRAY['صغير', 'متوسط', 'كبير'],
  true, true, false, true
),
(
  'عصير جزر', 'Carrot Juice',
  'عصير جزر طازج غني بفيتامين A', 'Fresh carrot juice rich in vitamin A',
  16.00, NULL, 1, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
  ARRAY['جزر طازج', 'برتقال', 'زنجبيل'], ARRAY['صغير', 'متوسط', 'كبير'],
  true, false, false, true
);

-- سموثي
INSERT INTO products (
  name, name_en, description, description_en,
  price, category_id, image_url,
  ingredients, available_sizes,
  is_active, is_featured, is_bestseller, in_stock
) VALUES
(
  'سموثي التوت المشكل', 'Mixed Berry Smoothie',
  'سموثي كريمي بمزيج من التوت الطازج', 'Creamy smoothie with fresh mixed berries',
  24.00, 2, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
  ARRAY['فراولة', 'توت أزرق', 'توت أحمر', 'زبادي', 'عسل'], ARRAY['متوسط', 'كبير'],
  true, true, true, true
),
(
  'سموثي الموز والشوفان', 'Banana Oat Smoothie',
  'سموثي صحي بالموز والشوفان والحليب', 'Healthy smoothie with banana, oats and milk',
  21.00, 2, 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400',
  ARRAY['موز', 'شوفان', 'حليب', 'عسل', 'قرفة'], ARRAY['متوسط', 'كبير'],
  true, false, false, true
),
(
  'سموثي الأفوكادو', 'Avocado Smoothie',
  'سموثي كريمي بالأفوكادو الطازج', 'Creamy smoothie with fresh avocado',
  26.00, 2, 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400',
  ARRAY['أفوكادو', 'حليب', 'عسل', 'فانيليا'], ARRAY['متوسط', 'كبير'],
  true, true, false, true
);

-- مشروبات باردة
INSERT INTO products (
  name, name_en, description, description_en,
  price, category_id, image_url,
  ingredients, available_sizes,
  is_active, is_featured, in_stock
) VALUES
(
  'ليموناضة بالنعناع', 'Mint Lemonade',
  'ليموناضة منعشة بالنعناع الطازج', 'Refreshing lemonade with fresh mint',
  18.00, 3, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400',
  ARRAY['ليمون', 'نعناع', 'سكر', 'ماء', 'ثلج'], ARRAY['صغير', 'متوسط', 'كبير'],
  true, true, false, true
),
(
  'آيس تي بالخوخ', 'Peach Iced Tea',
  'شاي مثلج بنكهة الخوخ الطبيعية', 'Iced tea with natural peach flavor',
  19.00, 3, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  ARRAY['شاي', 'خوخ', 'سكر', 'ليمون', 'ثلج'], ARRAY['متوسط', 'كبير'],
  true, false, false, true
),
(
  'فراولة بالحليب', 'Strawberry Milk',
  'مشروب كريمي بالفراولة والحليب', 'Creamy drink with strawberry and milk',
  20.00, 3, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
  ARRAY['فراولة', 'حليب', 'آيس كريم', 'سكر'], ARRAY['متوسط', 'كبير'],
  true, true, true, true
);

-- مشروبات ساخنة
INSERT INTO products (
  name, name_en, description, description_en,
  price, category_id, image_url,
  ingredients, available_sizes,
  is_active, in_stock
) VALUES
(
  'قهوة عربية', 'Arabic Coffee',
  'قهوة عربية أصيلة بالهيل', 'Authentic Arabic coffee with cardamom',
  12.00, 4, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
  ARRAY['قهوة عربية', 'هيل', 'زعفران'], ARRAY['صغير', 'متوسط'],
  true, true
),
(
  'شاي أخضر بالياسمين', 'Jasmine Green Tea',
  'شاي أخضر طبيعي بنكهة الياسمين', 'Natural green tea with jasmine flavor',
  14.00, 4, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
  ARRAY['شاي أخضر', 'ياسمين', 'عسل'], ARRAY['صغير', 'متوسط'],
  true, true
),
(
  'كابتشينو', 'Cappuccino',
  'كابتشينو إيطالي كلاسيكي', 'Classic Italian cappuccino',
  16.00, 4, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
  ARRAY['إسبريسو', 'حليب', 'رغوة'], ARRAY['صغير', 'متوسط', 'كبير'],
  true, true
);

-- عروض خاصة
INSERT INTO products (
  name, name_en, description, description_en,
  price, original_price, category_id, image_url,
  ingredients, available_sizes,
  is_active, is_featured, is_new, in_stock
) VALUES
(
  'عرض العائلة', 'Family Pack',
  'باقة عائلية تحتوي على 4 عصائر مختلفة', 'Family pack with 4 different juices',
  60.00, 80.00, 5, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
  ARRAY['عصير برتقال', 'عصير مانجو', 'سموثي فراولة', 'ليموناضة'], ARRAY['عائلي'],
  true, true, true, true
),
(
  'كومبو الصباح', 'Morning Combo',
  'عصير برتقال + كرواسون', 'Orange juice + croissant',
  25.00, 30.00, 5, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
  ARRAY['عصير برتقال', 'كرواسون'], ARRAY['كومبو'],
  true, true, false, true
);

-- ============================================
-- 3. مراجعات تجريبية
-- ============================================

INSERT INTO customer_reviews (
  product_id, customer_name, customer_email,
  rating, title, comment, is_approved, is_verified
) VALUES
(1, 'أحمد محمد', 'ahmed@example.com', 5, 'ممتاز!', 'عصير برتقال طازج ولذيذ جداً، أنصح به بشدة', true, true),
(1, 'سارة أحمد', 'sara@example.com', 5, 'رائع', 'طعم طبيعي 100% وسعر مناسب', true, true),
(2, 'محمد علي', 'mohammed@example.com', 4, 'جيد جداً', 'سموثي كريمي ولذيذ، لكن السعر مرتفع قليلاً', true, false),
(3, 'فاطمة حسن', 'fatima@example.com', 5, 'الأفضل', 'أفضل عصير مانجو جربته على الإطلاق!', true, true),
(4, 'خالد عبدالله', 'khaled@example.com', 5, 'منعش جداً', 'موهيتو رائع ومنعش، مثالي للصيف', true, false);

-- ============================================
-- 4. مقالات المدونة
-- ============================================

INSERT INTO blog_posts (
  title, title_en, slug,
  excerpt, excerpt_en,
  content, content_en,
  featured_image, category, tags,
  is_published, is_featured,
  author_name, published_at
) VALUES
(
  'فوائد العصائر الطبيعية',
  'Benefits of Natural Juices',
  'benefits-of-natural-juices',
  'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية الطازجة',
  'Learn about the amazing health benefits of fresh natural juices',
  'العصائر الطبيعية الطازجة تحتوي على فيتامينات ومعادن مهمة للجسم. تساعد في تعزيز المناعة وتحسين الهضم وزيادة الطاقة.',
  'Fresh natural juices contain important vitamins and minerals for the body. They help boost immunity, improve digestion and increase energy.',
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
  'صحة', ARRAY['صحة', 'عصائر', 'فيتامينات'],
  true, true,
  'فريق Juicetry', NOW()
),
(
  'كيف تختار العصير المناسب',
  'How to Choose the Right Juice',
  'how-to-choose-right-juice',
  'دليلك الشامل لاختيار العصير المناسب لاحتياجاتك',
  'Your complete guide to choosing the right juice for your needs',
  'اختيار العصير المناسب يعتمد على احتياجاتك الصحية وأهدافك. سنساعدك في هذا المقال على اتخاذ القرار الصحيح.',
  'Choosing the right juice depends on your health needs and goals. We will help you make the right decision in this article.',
  'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800',
  'نصائح', ARRAY['نصائح', 'عصائر', 'صحة'],
  true, false,
  'فريق Juicetry', NOW()
);

-- ============================================
-- 5. إعدادات صفحة من نحن
-- ============================================

INSERT INTO about_page_settings (section_key, title, title_en, content, content_en, order_index, is_active) VALUES
(
  'mission',
  'رسالتنا',
  'Our Mission',
  'نسعى لتقديم أفضل العصائر الطبيعية الطازجة بجودة عالية وأسعار مناسبة',
  'We strive to provide the best fresh natural juices with high quality and reasonable prices',
  1, true
),
(
  'vision',
  'رؤيتنا',
  'Our Vision',
  'أن نكون الخيار الأول لعشاق العصائر الطبيعية في المنطقة',
  'To be the first choice for natural juice lovers in the region',
  2, true
),
(
  'values',
  'قيمنا',
  'Our Values',
  'الجودة، الطبيعية، الابتكار، رضا العملاء',
  'Quality, Naturalness, Innovation, Customer Satisfaction',
  3, true
);

-- ============================================
-- 6. تحديث إحصائيات المنتجات
-- ============================================

-- تحديث عدد المراجعات والتقييمات (سيتم تلقائياً عبر الـ trigger)
-- لكن يمكن تشغيل هذا للتأكد
UPDATE products p
SET 
  rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM customer_reviews
    WHERE product_id = p.id AND is_approved = true
  ),
  reviews_count = (
    SELECT COUNT(*)
    FROM customer_reviews
    WHERE product_id = p.id AND is_approved = true
  );

-- ============================================
-- 7. عرض ملخص البيانات
-- ============================================

SELECT 'البيانات التجريبية تم إضافتها بنجاح!' as message;

SELECT 
  'categories' as table_name, 
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE is_active = true) as active_records
FROM categories
UNION ALL
SELECT 
  'products', 
  COUNT(*),
  COUNT(*) FILTER (WHERE is_active = true)
FROM products
UNION ALL
SELECT 
  'customer_reviews', 
  COUNT(*),
  COUNT(*) FILTER (WHERE is_approved = true)
FROM customer_reviews
UNION ALL
SELECT 
  'blog_posts', 
  COUNT(*),
  COUNT(*) FILTER (WHERE is_published = true)
FROM blog_posts;
