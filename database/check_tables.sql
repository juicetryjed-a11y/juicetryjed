-- التحقق من وجود الجداول
-- Check if tables exist

-- عرض جميع الجداول
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('orders', 'order_items', 'reviews', 'blog_posts', 'customers')
ORDER BY table_name;

-- عد السجلات في كل جدول
SELECT 'orders' as table_name, COUNT(*) as count FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'customers', COUNT(*) FROM customers;

-- عرض بعض البيانات من كل جدول
SELECT 'Orders:' as info;
SELECT order_number, customer_name, total_amount, status FROM orders LIMIT 3;

SELECT 'Reviews:' as info;
SELECT customer_name, rating, status FROM reviews LIMIT 3;

SELECT 'Customers:' as info;
SELECT full_name, email, total_orders FROM customers LIMIT 3;
