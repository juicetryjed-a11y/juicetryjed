-- إضافة التصنيفات الأساسية لموقع Juicetry D
INSERT INTO categories (name, description, is_active, created_at, updated_at) VALUES
('سموذي', 'مشروبات سموذي طبيعية ولذيذة', true, NOW(), NOW()),
('سموكي صودا', 'مشروبات صودا منعشة بنكهات مميزة', true, NOW(), NOW()),
('خلطات جوستري', 'خلطات خاصة من جوستري بمكونات مختارة', true, NOW(), NOW()),
('ملك شيكس', 'مشروبات الحليب المخفوق بنكهات متنوعة', true, NOW(), NOW()),
('فيجي فروت', 'عصائر الخضار والفواكه الطبيعية', true, NOW(), NOW()),
('عصائر طازجة', 'عصائر طبيعية طازجة يومياً', true, NOW(), NOW()),
('سلطات فواكة', 'سلطات فواكه طازجة ومتنوعة', true, NOW(), NOW()),
('بوكسات عصير', 'بوكسات عصير للمناسبات والهدايا', true, NOW(), NOW());

-- إضافة إعدادات الموقع الأساسية
INSERT INTO site_settings (id, site_name, site_phone, site_email, site_address, created_at, updated_at) VALUES
(1, 'Juicetry D', '+966505656996', 'info@juicetryd.com', 'جدة، المملكة العربية السعودية', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  site_phone = EXCLUDED.site_phone,
  updated_at = NOW();

-- إضافة محتوى صفحة من نحن
INSERT INTO about_page (id, content, text_color, font_family, font_size, text_alignment, background_color, created_at, updated_at) VALUES
(1, 
'<h1 class="text-4xl font-bold mb-6 text-center">حكاية جوستري</h1>
<p class="text-lg mb-4 leading-relaxed">
نحن علامة تجارية سعودية مهتمة بجعل الفاكهة جزءاً ممتعا من حياتك، سنقدم لك تجربة فريدة لتحضير العصير وسلطة الفواكه، نأخذك خطوة بخطوة لتكتمل متعة الوقت الذي تقضيه معنا فيه لدينا قاعدة بسيطة في جوستري وهي أن تحظى بأكثر الأوقات إمتاعاً وألذ العصائر الصحية.
</p>
<h2 class="text-2xl font-bold mt-8 mb-4">رؤيتنا</h2>
<p class="text-lg mb-4">
أن نكون الوجهة الأولى لعشاق العصائر الطبيعية في المنطقة، وأن نقدم منتجات صحية ولذيذة تلبي جميع الأذواق.
</p>
<h2 class="text-2xl font-bold mt-8 mb-4">مهمتنا</h2>
<p class="text-lg">
تقديم أفضل تجربة عصير طبيعي لعملائنا، مع التركيز على الجودة والطعم الأصيل والخدمة المميزة.
</p>', 
'#291719', 'inherit', '16px', 'right', '#ffffff', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = NOW();
