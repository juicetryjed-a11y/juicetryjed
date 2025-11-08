-- إدراج بيانات تجريبية
-- Insert Sample Data

-- إدراج طلبات تجريبية
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, customer_address, customer_city, total_amount, status, payment_method, payment_status, notes) VALUES
('ORD-001', 'أحمد محمد', 'ahmed@example.com', '0501234567', 'شارع الملك فهد', 'الرياض', 150.00, 'completed', 'cash', 'paid', 'طلب سريع'),
('ORD-002', 'فاطمة علي', 'fatima@example.com', '0509876543', 'حي النخيل', 'جدة', 200.50, 'processing', 'card', 'paid', NULL),
('ORD-003', 'محمد سعيد', 'mohammed@example.com', '0551234567', 'شارع العروبة', 'الدمام', 89.99, 'pending', 'online', 'unpaid', 'يرجى التوصيل بعد الساعة 5 مساءً'),
('ORD-004', 'سارة أحمد', 'sara@example.com', '0567891234', 'حي الورود', 'الرياض', 320.00, 'completed', 'cash', 'paid', NULL),
('ORD-005', 'خالد عبدالله', 'khaled@example.com', '0543216789', 'طريق الملك عبدالعزيز', 'مكة', 175.25, 'cancelled', 'card', 'refunded', 'تم الإلغاء بناءً على طلب العميل');

-- إدراج عناصر الطلبات
INSERT INTO order_items (order_id, product_name, quantity, price, subtotal) 
SELECT id, 'عصير برتقال طازج', 3, 25.00, 75.00 FROM orders WHERE order_number = 'ORD-001'
UNION ALL
SELECT id, 'سموذي فراولة', 2, 37.50, 75.00 FROM orders WHERE order_number = 'ORD-001'
UNION ALL
SELECT id, 'عصير مانجو', 4, 30.00, 120.00 FROM orders WHERE order_number = 'ORD-002'
UNION ALL
SELECT id, 'كوكتيل استوائي', 2, 40.25, 80.50 FROM orders WHERE order_number = 'ORD-002'
UNION ALL
SELECT id, 'عصير تفاح', 3, 29.99, 89.99 FROM orders WHERE order_number = 'ORD-003';

-- إدراج مراجعات تجريبية
INSERT INTO reviews (customer_name, customer_email, rating, comment, product_name, status, is_featured) VALUES
('أحمد محمد', 'ahmed@example.com', 5, 'عصير رائع وطازج جداً! أنصح به بشدة', 'عصير برتقال طازج', 'approved', true),
('فاطمة علي', 'fatima@example.com', 4, 'جودة ممتازة لكن السعر مرتفع قليلاً', 'سموذي فراولة', 'approved', false),
('محمد سعيد', 'mohammed@example.com', 5, 'أفضل عصير مانجو جربته في حياتي!', 'عصير مانجو', 'approved', true),
('سارة أحمد', 'sara@example.com', 3, 'جيد لكن يحتاج تحسين في التغليف', 'كوكتيل استوائي', 'pending', false),
('خالد عبدالله', 'khaled@example.com', 2, 'لم يعجبني الطعم', 'عصير تفاح', 'rejected', false),
('نورة سالم', 'noura@example.com', 5, 'خدمة ممتازة وتوصيل سريع', NULL, 'approved', true),
('عبدالرحمن خالد', 'abdulrahman@example.com', 4, 'منتجات طبيعية 100%', 'عصير برتقال طازج', 'pending', false);

-- إدراج مقالات تجريبية
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, status, is_featured, views_count) VALUES
('فوائد العصائر الطبيعية', 'benefits-of-natural-juices', 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', 
'العصائر الطبيعية غنية بالفيتامينات والمعادن الضرورية للجسم. تساعد على تعزيز المناعة وتحسين الهضم وزيادة الطاقة...', 
'Admin', 'صحة', ARRAY['صحة', 'عصائر', 'فوائد'], 'published', true, 150),

('أفضل 10 عصائر لفصل الصيف', 'top-10-summer-juices', 'اكتشف أفضل العصائر المنعشة لفصل الصيف', 
'في فصل الصيف الحار، لا شيء يضاهي كوب من العصير البارد المنعش. إليك قائمة بأفضل 10 عصائر...', 
'Admin', 'وصفات', ARRAY['صيف', 'عصائر', 'منعش'], 'published', true, 230),

('كيف تختار الفواكه الطازجة', 'how-to-choose-fresh-fruits', 'دليلك الشامل لاختيار أفضل الفواكه', 
'اختيار الفواكه الطازجة فن يحتاج إلى معرفة. في هذا المقال نشرح لك كيف تختار أفضل الفواكه...', 
'Admin', 'نصائح', ARRAY['فواكه', 'نصائح', 'جودة'], 'published', false, 89),

('وصفات سموذي صحية', 'healthy-smoothie-recipes', 'وصفات سموذي لذيذة وصحية', 
'السموذي خيار رائع لوجبة إفطار صحية أو وجبة خفيفة. إليك أفضل الوصفات...', 
'Admin', 'وصفات', ARRAY['سموذي', 'صحة', 'وصفات'], 'draft', false, 0),

('أهمية الفيتامينات في العصائر', 'vitamins-in-juices', 'تعرف على الفيتامينات الموجودة في العصائر المختلفة', 
'كل نوع من العصير يحتوي على فيتامينات مختلفة. دعونا نستكشف ما تحتويه العصائر الشائعة...', 
'Admin', 'صحة', ARRAY['فيتامينات', 'صحة', 'تغذية'], 'published', false, 120);

-- إدراج عملاء تجريبيين
INSERT INTO customers (full_name, email, phone, address, city, total_orders, total_spent, status, notes) VALUES
('أحمد محمد السعيد', 'ahmed@example.com', '0501234567', 'شارع الملك فهد، حي النخيل', 'الرياض', 5, 750.00, 'active', 'عميل مميز - يفضل التوصيل صباحاً'),
('فاطمة علي الأحمد', 'fatima@example.com', '0509876543', 'طريق الملك عبدالله، حي الورود', 'جدة', 3, 450.50, 'active', NULL),
('محمد سعيد العتيبي', 'mohammed@example.com', '0551234567', 'شارع العروبة، حي الفيصلية', 'الدمام', 2, 189.99, 'active', 'يفضل الدفع نقداً'),
('سارة أحمد القحطاني', 'sara@example.com', '0567891234', 'حي الياسمين، شارع الأمير سلطان', 'الرياض', 8, 1250.00, 'active', 'عميلة دائمة - تطلب أسبوعياً'),
('خالد عبدالله المطيري', 'khaled@example.com', '0543216789', 'طريق مكة القديم', 'مكة', 1, 175.25, 'inactive', 'طلب واحد فقط'),
('نورة سالم الدوسري', 'noura@example.com', '0556789012', 'حي السلام، شارع التحلية', 'الرياض', 4, 680.00, 'active', NULL),
('عبدالرحمن خالد العمري', 'abdulrahman@example.com', '0598765432', 'شارع الأمير محمد بن عبدالعزيز', 'جدة', 0, 0.00, 'active', 'عميل جديد'),
('ليلى محمد الشمري', 'layla@example.com', '0512345678', 'حي الربوة، طريق الملك فهد', 'الرياض', 6, 890.50, 'active', 'تفضل العصائر العضوية');

-- رسائل النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إدراج البيانات التجريبية بنجاح!';
    RAISE NOTICE '✅ 5 طلبات';
    RAISE NOTICE '✅ 7 مراجعات';
    RAISE NOTICE '✅ 5 مقالات';
    RAISE NOTICE '✅ 8 عملاء';
END $$;
