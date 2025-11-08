-- التحقق من تكامل الموقع بالكامل مع قاعدة البيانات

-- ===========================
-- 1. إنشاء جدول إعدادات تصميم الصفحة الرئيسية
-- ===========================
CREATE TABLE IF NOT EXISTS homepage_design_settings (
  id SERIAL PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  background_color TEXT DEFAULT '#ffffff',
  text_color TEXT DEFAULT '#291719',
  accent_color TEXT DEFAULT '#edd674',
  font_family TEXT DEFAULT 'Noto Sans Arabic',
  font_size TEXT DEFAULT '16px',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  custom_css TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 2. إنشاء جدول روابط السوشيال ميديا (إذا لم يكن موجود)
-- ===========================
CREATE TABLE IF NOT EXISTS social_media_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================
-- 3. إدراج إعدادات تصميم الصفحة الرئيسية
-- ===========================
INSERT INTO homepage_design_settings (section_name, title, subtitle, is_visible, display_order) VALUES
('hero', 'مرحباً بكم في جوستري', 'أفضل العصائر الطبيعية الطازجة', true, 1),
('featured_products', 'منتجاتنا المميزة', 'اكتشف أشهى العصائر والمشروبات الطبيعية', true, 2),
('categories', 'تصنيفاتنا', 'تصفح مجموعتنا المتنوعة من العصائر', true, 3),
('customer_reviews', 'آراء عملائنا', 'ماذا يقول عملاؤنا عن جوستري', true, 4)
ON CONFLICT (section_name) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  updated_at = NOW();

-- ===========================
-- 4. إدراج روابط السوشيال ميديا
-- ===========================
INSERT INTO social_media_links (platform, url, icon, display_order, is_visible) VALUES
('facebook', 'https://facebook.com/juicetryd', 'facebook', 1, true),
('instagram', 'https://instagram.com/juicetryd', 'instagram', 2, true),
('twitter', 'https://twitter.com/juicetryd', 'twitter', 3, true),
('youtube', 'https://youtube.com/juicetryd', 'youtube', 4, true)
ON CONFLICT (platform) DO UPDATE SET
  url = EXCLUDED.url,
  updated_at = NOW();

-- ===========================
-- 5. إضافة آراء العملاء النموذجية
-- ===========================
INSERT INTO customer_reviews (customer_name, rating, review_text, is_visible, is_featured, display_order) VALUES
('أحمد محمد', 5, 'أفضل عصائر جربتها في حياتي! طعم طبيعي ونكهة رائعة', true, true, 1),
('فاطمة السعيد', 5, 'خدمة ممتازة وجودة عالية، أنصح الجميع بتجربة جوستري', true, true, 2),
('خالد العتيبي', 4, 'مكان رائع للعائلة، أطفالي يحبون العصائر هنا كثيراً', true, true, 3),
('سارة أحمد', 5, 'عصائر طازجة ولذيذة، والأسعار معقولة جداً', true, false, 4),
('محمد الغامدي', 5, 'تجربة رائعة! العصائر طبيعية 100% والطعم مميز', true, false, 5)
ON CONFLICT (customer_name) DO UPDATE SET
  review_text = EXCLUDED.review_text,
  updated_at = NOW();

-- ===========================
-- 6. إضافة مقالات نموذجية للبلوج
-- ===========================
INSERT INTO blog_posts (title, slug, excerpt, content, is_published, is_featured, author) VALUES
('فوائد العصائر الطبيعية للصحة', 'benefits-of-natural-juices', 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', 
'<h2>فوائد العصائر الطبيعية</h2><p>العصائر الطبيعية مصدر ممتاز للفيتامينات والمعادن...</p>', true, true, 'فريق جوستري'),

('أفضل الفواكه لعصائر الصيف', 'best-summer-fruits', 'اكتشف أفضل الفواكه المنعشة لفصل الصيف', 
'<h2>فواكه الصيف المنعشة</h2><p>في فصل الصيف، نحتاج إلى مشروبات منعشة...</p>', true, false, 'فريق جوستري'),

('كيفية اختيار العصير المناسب لك', 'how-to-choose-right-juice', 'دليل شامل لاختيار العصير المثالي حسب احتياجاتك', 
'<h2>اختيار العصير المناسب</h2><p>كل شخص له احتياجات مختلفة من العصائر...</p>', true, false, 'فريق جوستري')
ON CONFLICT (slug) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = NOW();

-- ===========================
-- 7. إضافة صور السلايدر النموذجية
-- ===========================
INSERT INTO slider_images (image_url, title, subtitle, is_active, display_order) VALUES
('https://images.unsplash.com/photo-1546173159-315724a31696?w=1200', 'مرحباً بكم في جوستري', 'أفضل العصائر الطبيعية الطازجة', true, 1),
('https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1200', 'عصائر طازجة يومياً', 'نحضر لك أشهى العصائر بأعلى معايير الجودة', true, 2),
('https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=1200', 'تجربة فريدة', 'اكتشف طعم الطبيعة في كل رشفة', true, 3)
ON CONFLICT DO NOTHING;

-- ===========================
-- 8. تفعيل RLS وإضافة Policies للجداول الجديدة
-- ===========================
ALTER TABLE homepage_design_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_links ENABLE ROW LEVEL SECURITY;

-- Policies للقراءة العامة
DROP POLICY IF EXISTS "Allow public read" ON homepage_design_settings;
CREATE POLICY "Allow public read" ON homepage_design_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON social_media_links;
CREATE POLICY "Allow public read" ON social_media_links FOR SELECT USING (true);

-- Policies للكتابة
DROP POLICY IF EXISTS "Allow all operations" ON homepage_design_settings;
CREATE POLICY "Allow all operations" ON homepage_design_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON social_media_links;
CREATE POLICY "Allow all operations" ON social_media_links FOR ALL USING (true);

-- ===========================
-- 9. إنشاء Indexes للأداء
-- ===========================
CREATE INDEX IF NOT EXISTS idx_homepage_design_section ON homepage_design_settings(section_name);
CREATE INDEX IF NOT EXISTS idx_social_media_visible ON social_media_links(is_visible);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_featured ON customer_reviews(is_featured, is_visible);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, is_featured);
CREATE INDEX IF NOT EXISTS idx_slider_images_active ON slider_images(is_active, display_order);

-- ===========================
-- 10. تحديث محتوى صفحة من نحن
-- ===========================
UPDATE about_page SET 
  content = '<div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-center text-orange-600">حكاية جوستري</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-lg mb-6 leading-relaxed">
        نحن علامة تجارية سعودية مهتمة بجعل الفاكهة جزءاً ممتعا من حياتك، سنقدم لك تجربة فريدة لتحضير العصير وسلطة الفواكه، نأخذك خطوة بخطوة لتكتمل متعة الوقت الذي تقضيه معنا فيه لدينا قاعدة بسيطة في جوستري وهي أن تحظى بأكثر الأوقات إمتاعاً وألذ العصائر الصحية.
      </p>
      
      <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="bg-orange-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-orange-600">رؤيتنا</h2>
          <p class="text-gray-700">
            أن نكون الوجهة الأولى لعشاق العصائر الطبيعية في المنطقة، وأن نقدم منتجات صحية ولذيذة تلبي جميع الأذواق.
          </p>
        </div>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">مهمتنا</h2>
          <p class="text-gray-700">
            تقديم أفضل تجربة عصير طبيعي لعملائنا، مع التركيز على الجودة والطعم الأصيل والخدمة المميزة.
          </p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mt-12 mb-6 text-center">قيمنا</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🍊</span>
          </div>
          <h3 class="font-bold mb-2">الجودة</h3>
          <p class="text-sm text-gray-600">نختار أفضل الفواكه الطازجة</p>
        </div>
        
        <div class="text-center">
          <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🌱</span>
          </div>
          <h3 class="font-bold mb-2">الطبيعية</h3>
          <p class="text-sm text-gray-600">100% طبيعي بدون إضافات</p>
        </div>
        
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">❤️</span>
          </div>
          <h3 class="font-bold mb-2">الحب</h3>
          <p class="text-sm text-gray-600">نحضر كل عصير بحب واهتمام</p>
        </div>
      </div>
    </div>
  </div>'
WHERE id = 1;

-- ===========================
-- تأكيد نجاح العملية
-- ===========================
SELECT 
  'تم إعداد الموقع بالكامل بنجاح!' as status,
  (SELECT COUNT(*) FROM categories WHERE is_active = true) as active_categories,
  (SELECT COUNT(*) FROM products WHERE is_active = true) as active_products,
  (SELECT COUNT(*) FROM customer_reviews WHERE is_visible = true) as visible_reviews,
  (SELECT COUNT(*) FROM blog_posts WHERE is_published = true) as published_posts,
  (SELECT COUNT(*) FROM slider_images WHERE is_active = true) as active_slides;
