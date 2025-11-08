-- إضافة منتجات نموذجية بطريقة مبسطة

-- إضافة المنتجات مع استخدام IDs مباشرة
INSERT INTO products (name, description, price, category_id, is_active, is_featured, image_url) VALUES
-- سموذي (category_id = 1)
('سموذي الفراولة', 'سموذي طبيعي بالفراولة الطازجة والموز', 18.00, 1, true, true, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'),
('سموذي المانجو', 'سموذي استوائي بالمانجو الطازج', 20.00, 1, true, false, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400'),
('سموذي التوت الأزرق', 'سموذي غني بمضادات الأكسدة', 22.00, 1, true, true, 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400'),

-- سموكي صودا (category_id = 2)
('سموكي ليمون', 'مشروب غازي بنكهة الليمون المدخن', 16.00, 2, true, false, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'),
('سموكي توت', 'مشروب غازي بنكهة التوت المميزة', 17.00, 2, true, false, 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400'),

-- خلطات جوستري (category_id = 3)
('خلطة جوستري الخاصة', 'خلطة سرية من الفواكه المختارة', 25.00, 3, true, true, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400'),
('خلطة الطاقة', 'خلطة منشطة بالفواكه والخضار', 28.00, 3, true, true, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400'),

-- ملك شيكس (category_id = 4)
('شيك الفانيليا', 'مشروب حليب مخفوق بالفانيليا الطبيعية', 19.00, 4, true, false, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('شيك الشوكولاتة', 'مشروب حليب مخفوق بالشوكولاتة الفاخرة', 21.00, 4, true, true, 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400'),

-- فيجي فروت (category_id = 5)
('عصير جزر طازج', 'عصير جزر غني بفيتامين أ', 15.00, 5, true, false, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400'),
('عصير سبانخ أخضر', 'عصير خضار صحي ومنعش', 17.00, 5, true, false, 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400'),

-- عصائر طازجة (category_id = 6)
('عصير برتقال طازج', 'عصير برتقال طبيعي 100% بدون إضافات', 12.00, 6, true, true, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400'),
('عصير تفاح أخضر', 'عصير تفاح أخضر منعش وصحي', 14.00, 6, true, false, 'https://images.unsplash.com/photo-1560424427-33d4d6cc6b66?w=400'),

-- سلطات فواكة (category_id = 7)
('سلطة فواكه استوائية', 'مزيج من الفواكه الاستوائية الطازجة', 22.00, 7, true, true, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400'),
('سلطة فواكه موسمية', 'فواكه الموسم الطازجة', 18.00, 7, true, false, 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400'),

-- بوكسات عصير (category_id = 8)
('بوكس العائلة', 'مجموعة عصائر متنوعة للعائلة', 45.00, 8, true, true, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'),
('بوكس المناسبات', 'بوكس خاص للمناسبات والهدايا', 55.00, 8, true, true, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400');

SELECT 'تم إضافة المنتجات النموذجية بنجاح!' as status;
