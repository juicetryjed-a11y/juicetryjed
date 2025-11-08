-- إضافة منتجات نموذجية لموقع Juicetry D

-- الحصول على IDs التصنيفات
DO $$
DECLARE
    smoothie_id INTEGER;
    fresh_juice_id INTEGER;
    smoky_soda_id INTEGER;
    joustry_blend_id INTEGER;
    king_shake_id INTEGER;
BEGIN
    -- الحصول على IDs التصنيفات
    SELECT id INTO smoothie_id FROM categories WHERE name = 'سموذي' LIMIT 1;
    SELECT id INTO fresh_juice_id FROM categories WHERE name = 'عصائر طازجة' LIMIT 1;
    SELECT id INTO smoky_soda_id FROM categories WHERE name = 'سموكي صودا' LIMIT 1;
    SELECT id INTO joustry_blend_id FROM categories WHERE name = 'خلطات جوستري' LIMIT 1;
    SELECT id INTO king_shake_id FROM categories WHERE name = 'ملك شيكس' LIMIT 1;

    -- إضافة المنتجات
    INSERT INTO products (name, description, price, category_id, is_active, is_featured, image_url) VALUES
    -- سموذي
    ('سموذي الفراولة', 'سموذي طبيعي بالفراولة الطازجة والموز', 18.00, smoothie_id, true, true, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'),
    ('سموذي المانجو', 'سموذي استوائي بالمانجو الطازج', 20.00, smoothie_id, true, false, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400'),
    ('سموذي التوت الأزرق', 'سموذي غني بمضادات الأكسدة', 22.00, smoothie_id, true, true, 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400'),
    
    -- عصائر طازجة
    ('عصير برتقال طازج', 'عصير برتقال طبيعي 100% بدون إضافات', 12.00, fresh_juice_id, true, true, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400'),
    ('عصير تفاح أخضر', 'عصير تفاح أخضر منعش وصحي', 14.00, fresh_juice_id, true, false, 'https://images.unsplash.com/photo-1560424427-33d4d6cc6b66?w=400'),
    ('عصير جزر طازج', 'عصير جزر غني بفيتامين أ', 15.00, fresh_juice_id, true, false, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400'),
    
    -- سموكي صودا
    ('سموكي ليمون', 'مشروب غازي بنكهة الليمون المدخن', 16.00, smoky_soda_id, true, false, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'),
    ('سموكي توت', 'مشروب غازي بنكهة التوت المميزة', 17.00, smoky_soda_id, true, false, 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400'),
    
    -- خلطات جوستري
    ('خلطة جوستري الخاصة', 'خلطة سرية من الفواكه المختارة', 25.00, joustry_blend_id, true, true, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400'),
    ('خلطة الطاقة', 'خلطة منشطة بالفواكه والخضار', 28.00, joustry_blend_id, true, true, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400'),
    
    -- ملك شيكس
    ('شيك الفانيليا', 'مشروب حليب مخفوق بالفانيليا الطبيعية', 19.00, king_shake_id, true, false, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
    ('شيك الشوكولاتة', 'مشروب حليب مخفوق بالشوكولاتة الفاخرة', 21.00, king_shake_id, true, true, 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400');

END $$;
