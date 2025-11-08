-- بيانات تجريبية كاملة لجميع الجداول
-- Complete Sample Data

-- ===================================
-- 1. التصنيفات - Categories
-- ===================================
INSERT INTO categories (name, slug, description, image_url, is_active, display_order) VALUES
('عصائر طازجة', 'fresh-juices', 'عصائر طبيعية طازجة من أجود أنواع الفواكه', '/images/categories/fresh-juices.jpg', true, 1),
('سموذي', 'smoothies', 'سموذي صحي ولذيذ بنكهات متنوعة', '/images/categories/smoothies.jpg', true, 2),
('كوكتيلات', 'cocktails', 'كوكتيلات فواكه منعشة', '/images/categories/cocktails.jpg', true, 3),
('مشروبات صحية', 'healthy-drinks', 'مشروبات صحية ومغذية', '/images/categories/healthy.jpg', true, 4);

-- ===================================
-- 2. المنتجات - Products
-- ===================================
INSERT INTO products (name, slug, description, price, category_id, image_url, is_featured, is_active, stock_quantity, sku) VALUES
('عصير برتقال طازج', 'orange-juice', 'عصير برتقال طبيعي 100% بدون إضافات', 25.00, 1, '/images/products/orange.jpg', true, true, 100, 'JUI-001'),
('عصير مانجو', 'mango-juice', 'عصير مانجو طازج ولذيذ', 30.00, 1, '/images/products/mango.jpg', true, true, 80, 'JUI-002'),
('عصير فراولة', 'strawberry-juice', 'عصير فراولة طبيعي منعش', 28.00, 1, '/images/products/strawberry.jpg', false, true, 90, 'JUI-003'),
('سموذي توت', 'berry-smoothie', 'سموذي التوت الصحي الغني بالفيتامينات', 35.00, 2, '/images/products/berry-smoothie.jpg', true, true, 60, 'SMO-001'),
('سموذي موز', 'banana-smoothie', 'سموذي الموز الكريمي اللذيذ', 32.00, 2, '/images/products/banana-smoothie.jpg', false, true, 70, 'SMO-002'),
('كوكتيل استوائي', 'tropical-cocktail', 'كوكتيل الفواكه الاستوائية المنعش', 40.00, 3, '/images/products/tropical.jpg', true, true, 50, 'COC-001'),
('عصير أخضر صحي', 'green-juice', 'عصير أخضر غني بالخضروات والفواكه', 38.00, 4, '/images/products/green.jpg', false, true, 45, 'HEA-001'),
('عصير تفاح', 'apple-juice', 'عصير تفاح طبيعي طازج', 27.00, 1, '/images/products/apple.jpg', false, true, 85, 'JUI-004');

-- ===================================
-- 3. الطلبات - Orders
-- ===================================
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, customer_address, customer_city, total_amount, status, payment_method, payment_status, notes) VALUES
('ORD-001', 'أحمد محمد', 'ahmed@example.com', '0501234567', 'شارع الملك فهد', 'الرياض', 150.00, 'completed', 'cash', 'paid', 'طلب سريع'),
('ORD-002', 'فاطمة علي', 'fatima@example.com', '0509876543', 'حي النخيل', 'جدة', 200.50, 'processing', 'card', 'paid', NULL),
('ORD-003', 'محمد سعيد', 'mohammed@example.com', '0551234567', 'شارع العروبة', 'الدمام', 89.99, 'pending', 'online', 'unpaid', 'يرجى التوصيل بعد الساعة 5 مساءً');

-- ===================================
-- 4. عناصر الطلبات - Order Items
-- ===================================
INSERT INTO order_items (order_id, product_name, product_id, quantity, price, subtotal) 
SELECT id, 'عصير برتقال طازج', 1, 3, 25.00, 75.00 FROM orders WHERE order_number = 'ORD-001'
UNION ALL
SELECT id, 'سموذي فراولة', 3, 2, 37.50, 75.00 FROM orders WHERE order_number = 'ORD-001';

-- ===================================
-- 5. المراجعات - Reviews
-- ===================================
INSERT INTO reviews (customer_name, customer_email, rating, comment, product_id, product_name, status, is_featured) VALUES
('أحمد محمد', 'ahmed@example.com', 5, 'عصير رائع وطازج جداً! أنصح به بشدة', 1, 'عصير برتقال طازج', 'approved', true),
('فاطمة علي', 'fatima@example.com', 4, 'جودة ممتازة لكن السعر مرتفع قليلاً', 4, 'سموذي توت', 'approved', false),
('محمد سعيد', 'mohammed@example.com', 5, 'أفضل عصير مانجو جربته في حياتي!', 2, 'عصير مانجو', 'approved', true);

-- ===================================
-- 6. المقالات - Blog Posts
-- ===================================
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, status, is_featured, views_count) VALUES
('فوائد العصائر الطبيعية', 'benefits-of-natural-juices', 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', 
'العصائر الطبيعية غنية بالفيتامينات والمعادن الضرورية للجسم. تساعد على تعزيز المناعة وتحسين الهضم وزيادة الطاقة...', 
'Admin', 'صحة', ARRAY['صحة', 'عصائر', 'فوائد'], 'published', true, 150),
('أفضل 10 عصائر لفصل الصيف', 'top-10-summer-juices', 'اكتشف أفضل العصائر المنعشة لفصل الصيف', 
'في فصل الصيف الحار، لا شيء يضاهي كوب من العصير البارد المنعش...', 
'Admin', 'وصفات', ARRAY['صيف', 'عصائر', 'منعش'], 'published', true, 230);

-- ===================================
-- 7. العملاء - Customers
-- ===================================
INSERT INTO customers (full_name, email, phone, address, city, total_orders, total_spent, status) VALUES
('أحمد محمد السعيد', 'ahmed@example.com', '0501234567', 'شارع الملك فهد', 'الرياض', 5, 750.00, 'active'),
('فاطمة علي الأحمد', 'fatima@example.com', '0509876543', 'حي النخيل', 'جدة', 3, 450.50, 'active');

-- ===================================
-- 8. إعدادات صفحة "من نحن"
-- ===================================
INSERT INTO about_page_settings (
    title, subtitle, description, mission_title, mission_text, 
    vision_title, vision_text, values_title, values_text,
    location_name, location_address, location_url
) VALUES (
    'من نحن',
    'قصة Juicetry - جوستري',
    'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
    'رسالتنا',
    'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف.',
    'رؤيتنا',
    'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة.',
    'قيمنا',
    'الجودة، الطبيعية، الصحة، الطعم الأصيل، خدمة العملاء المتميزة.',
    'موقع المحل',
    'الرياض، المملكة العربية السعودية',
    'https://maps.google.com'
);

-- ===================================
-- 9. إعدادات الموقع العامة
-- ===================================
INSERT INTO site_settings (
    site_name, site_description, phone, email, address,
    facebook_url, instagram_url, whatsapp_number
) VALUES (
    'Juicetry - جوستري',
    'أفضل العصائر الطبيعية الطازجة',
    '0501234567',
    'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    'https://facebook.com/juicetry',
    'https://instagram.com/juicetry',
    '966501234567'
);

-- ===================================
-- 10. إعدادات الهيدر
-- ===================================
INSERT INTO header_settings (
    logo_text, show_search, show_cart, show_account, sticky_header
) VALUES (
    'Juicetry',
    true,
    true,
    true,
    true
);

-- ===================================
-- 11. إعدادات صفحة التواصل
-- ===================================
INSERT INTO contact_settings (
    title, description, phone, email, address, working_hours, show_map
) VALUES (
    'تواصل معنا',
    'نحن هنا للإجابة على استفساراتك',
    '0501234567',
    'info@juicetry.com',
    'الرياض، المملكة العربية السعودية',
    'السبت - الخميس: 9 صباحاً - 10 مساءً',
    true
);

-- ===================================
-- 12. إعدادات السلايدر
-- ===================================
INSERT INTO slider_settings (title, subtitle, image_url, button_text, button_link, is_active, display_order) VALUES
('عصائر طبيعية 100%', 'طازجة ولذيذة وصحية', '/images/slider/slide1.jpg', 'اطلب الآن', '/products', true, 1),
('عروض خاصة', 'خصم 20% على جميع المنتجات', '/images/slider/slide2.jpg', 'تسوق الآن', '/products', true, 2);

-- ===================================
-- رسائل النجاح
-- ===================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم إدراج جميع البيانات التجريبية بنجاح!';
    RAISE NOTICE '✅ 4 تصنيفات';
    RAISE NOTICE '✅ 8 منتجات';
    RAISE NOTICE '✅ 3 طلبات';
    RAISE NOTICE '✅ 3 مراجعات';
    RAISE NOTICE '✅ 2 مقالات';
    RAISE NOTICE '✅ 2 عملاء';
    RAISE NOTICE '✅ جميع الإعدادات';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Database is fully populated and ready to use!';
END $$;
