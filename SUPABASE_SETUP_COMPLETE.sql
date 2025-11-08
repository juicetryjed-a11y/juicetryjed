-- إعداد قاعدة بيانات Juicetry الكاملة
-- نفذ هذا الكود في Supabase SQL Editor

-- حذف الجداول إذا كانت موجودة (للبدء من جديد)
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS about_page_settings CASCADE;

-- إنشاء جدول المستخدمين (profiles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  role VARCHAR(50) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول التصنيفات
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#22c55e',
  icon VARCHAR(50) DEFAULT '🥤',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المنتجات
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  image_url TEXT,
  ingredients TEXT,
  nutritional_info TEXT,
  calories INTEGER,
  size_options VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الطلبات
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_address TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المراجعات
CREATE TABLE customer_reviews (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  product_id INTEGER REFERENCES products(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المقالات
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(255),
  category VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  featured_image TEXT,
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات الموقع
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255) DEFAULT 'Juicetry',
  site_description TEXT DEFAULT 'أفضل العصائر الطبيعية الطازجة',
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#22c55e',
  secondary_color VARCHAR(7) DEFAULT '#edd674',
  contact_email VARCHAR(255) DEFAULT 'info@juicetry.com',
  contact_phone VARCHAR(20) DEFAULT '+966501234567',
  contact_address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  social_twitter VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول إعدادات صفحة من نحن
CREATE TABLE about_page_settings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'من نحن',
  subtitle VARCHAR(255) DEFAULT 'قصة Juicetry - جوستري',
  description TEXT DEFAULT 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
  mission_title VARCHAR(255) DEFAULT 'رسالتنا',
  mission_description TEXT DEFAULT 'تقديم أفضل العصائر الطبيعية الطازجة والصحية لعملائنا الكرام.',
  vision_title VARCHAR(255) DEFAULT 'رؤيتنا',
  vision_description TEXT DEFAULT 'أن نكون الخيار الأول للعصائر الطبيعية في المملكة العربية السعودية.',
  values_title VARCHAR(255) DEFAULT 'قيمنا',
  values_description TEXT DEFAULT 'الجودة، الطبيعية، الصحة، رضا العملاء.',
  team_title VARCHAR(255) DEFAULT 'فريقنا',
  team_description TEXT DEFAULT 'فريق متخصص من خبراء التغذية وصناعة العصائر.',
  hero_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج بيانات تجريبية للتصنيفات
INSERT INTO categories (name, description, color, icon, order_index) VALUES
('عصائر طبيعية', 'عصائر طازجة من الفواكه الطبيعية', '#f59e0b', '🍊', 1),
('عصائر استوائية', 'عصائر من الفواكه الاستوائية الطازجة', '#10b981', '🥭', 2),
('سموثي', 'مشروبات كريمية مخلوطة بالحليب', '#8b5cf6', '🥤', 3),
('عصائر خضراء', 'عصائر صحية من الخضروات والفواكه', '#22c55e', '🥬', 4),
('مشروبات طاقة', 'مشروبات طبيعية لزيادة الطاقة', '#ef4444', '⚡', 5);

-- إدراج بيانات تجريبية للمنتجات
INSERT INTO products (name, description, price, category_id, image_url, ingredients, nutritional_info, calories, size_options) VALUES
('عصير برتقال طازج', 'عصير برتقال طبيعي 100% بدون إضافات', 15.00, 1, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', 'برتقال طازج', 'فيتامين C، فولات', 120, 'متوسط (350مل)'),
('عصير مانجو استوائي', 'عصير مانجو حلو ومنعش من أجود الأنواع', 18.00, 2, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', 'مانجو طازج، قليل من الماء', 'فيتامين A، فيتامين C', 150, 'كبير (500مل)'),
('سموثي الفراولة', 'سموثي كريمي بالفراولة الطازجة والحليب', 20.00, 3, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', 'فراولة، حليب، عسل طبيعي', 'بروتين، كالسيوم', 180, 'كبير (500مل)'),
('عصير أخضر ديتوكس', 'عصير صحي للتخلص من السموم', 25.00, 4, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop', 'سبانخ، تفاح، خيار، ليمون', 'حديد، فيتامين K', 80, 'متوسط (350مل)'),
('عصير تفاح طبيعي', 'عصير تفاح طازج بدون سكر مضاف', 16.00, 1, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', 'تفاح طازج', 'فيتامين C، ألياف', 110, 'متوسط (350مل)'),
('سموثي التوت المختلط', 'سموثي غني بمضادات الأكسدة', 22.00, 3, 'https://images.unsplash.com/photo-1559839914-17aae04cec44?w=400&h=300&fit=crop', 'توت أزرق، توت أحمر، يوغورت', 'مضادات أكسدة، بروتين', 160, 'كبير (500مل)'),
('عصير ليمون بالنعناع', 'مشروب منعش ومنشط', 14.00, 1, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop', 'ليمون، نعناع، ماء', 'فيتامين C', 60, 'متوسط (350مل)'),
('مشروب الطاقة الطبيعي', 'مشروب طبيعي لزيادة الطاقة والتركيز', 28.00, 5, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop', 'موز، تمر، لوز، حليب جوز الهند', 'بوتاسيوم، مغنيسيوم', 220, 'كبير (500مل)'),
('عصير جزر طازج', 'عصير جزر طبيعي غني بالفيتامينات', 17.00, 4, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop', 'جزر طازج، قليل من الزنجبيل', 'فيتامين A، بيتا كاروتين', 95, 'متوسط (350مل)'),
('سموثي الموز والشوكولاتة', 'سموثي كريمي بالموز والكاكاو الطبيعي', 24.00, 3, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', 'موز، كاكاو، حليب، عسل', 'بوتاسيوم، مغنيسيوم', 200, 'كبير (500مل)'),
('عصير رمان طبيعي', 'عصير رمان طازج غني بمضادات الأكسدة', 26.00, 1, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop', 'رمان طازج', 'مضادات أكسدة، فيتامين C', 130, 'متوسط (350مل)'),
('عصير أناناس استوائي', 'عصير أناناس طازج حلو ومنعش', 19.00, 2, 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&h=300&fit=crop', 'أناناس طازج', 'فيتامين C، منجنيز', 140, 'كبير (500مل)');

-- إدراج بيانات تجريبية للطلبات
INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, status, payment_method, notes) VALUES
('أحمد محمد', 'ahmed@example.com', '+966501111111', 'الرياض، حي النخيل', 35.00, 'delivered', 'cash', ''),
('فاطمة علي', 'fatima@example.com', '+966502222222', 'جدة، حي الصفا', 42.00, 'preparing', 'card', 'بدون سكر إضافي'),
('محمد السعيد', 'mohammed@example.com', '+966503333333', 'الدمام، حي الشاطئ', 28.00, 'pending', 'cash', 'توصيل سريع'),
('نورا أحمد', 'nora@example.com', '+966504444444', 'مكة، حي العزيزية', 56.00, 'delivered', 'card', ''),
('خالد الراشد', 'khalid@example.com', '+966505555555', 'المدينة، حي الأنصار', 33.00, 'cancelled', 'cash', 'إلغاء بناء على طلب العميل');

-- إدراج بيانات تجريبية للمراجعات
INSERT INTO customer_reviews (customer_name, customer_email, product_id, rating, comment, is_approved, is_featured) VALUES
('أحمد محمد', 'ahmed@example.com', 1, 5, 'عصير برتقال رائع وطازج جداً، أنصح به بشدة!', true, true),
('فاطمة علي', 'fatima@example.com', 3, 4, 'سموثي الفراولة لذيذ جداً ومنعش، سأطلبه مرة أخرى', true, false),
('محمد السعيد', 'mohammed@example.com', 2, 5, 'عصير المانجو طعمه استوائي حقيقي، ممتاز!', true, true),
('نورا أحمد', 'nora@example.com', 4, 4, 'العصير الأخضر صحي ومفيد، لكن طعمه يحتاج تعود', true, false),
('خالد الراشد', 'khalid@example.com', 1, 5, 'أفضل عصير برتقال جربته في حياتي!', true, false);

-- إدراج بيانات تجريبية للمقالات
INSERT INTO blog_posts (title, content, excerpt, author, category, is_published, is_featured, views, likes, comments_count, meta_title, meta_description, featured_image, slug) VALUES
('فوائد العصائر الطبيعية للصحة', 'العصائر الطبيعية مصدر ممتاز للفيتامينات والمعادن الأساسية التي يحتاجها الجسم. تحتوي على مضادات الأكسدة التي تحارب الجذور الحرة وتقوي جهاز المناعة...', 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', 'د. أحمد الصحي', 'صحة', true, true, 245, 18, 5, 'فوائد العصائر الطبيعية للصحة العامة', 'اكتشف الفوائد الصحية المذهلة للعصائر الطبيعية وكيف تساهم في تحسين صحتك العامة', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', 'benefits-of-natural-juices'),
('أفضل الفواكه لصنع العصائر', 'اختيار الفواكه المناسبة أمر مهم جداً لصنع عصائر لذيذة ومفيدة. البرتقال والتفاح من أفضل الخيارات للمبتدئين...', 'دليل شامل لاختيار أفضل الفواكه لصنع العصائر الطبيعية', 'سارة الطباخة', 'نصائح', true, false, 156, 12, 3, 'أفضل الفواكه لصنع العصائر الطبيعية', 'تعلم كيفية اختيار أفضل الفواكه لصنع عصائر طبيعية لذيذة ومفيدة', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', 'best-fruits-for-juices'),
('طرق حفظ العصائر الطبيعية', 'الحفظ الصحيح للعصائر الطبيعية يضمن الاحتفاظ بقيمتها الغذائية وطعمها الطازج. يُنصح بحفظها في الثلاجة لمدة لا تزيد عن 24 ساعة...', 'تعلم الطرق الصحيحة لحفظ العصائر الطبيعية والاحتفاظ بفوائدها', 'محمد الخبير', 'نصائح', true, false, 89, 7, 2, 'طرق حفظ العصائر الطبيعية الصحيحة', 'اكتشف أفضل الطرق لحفظ العصائر الطبيعية والاحتفاظ بقيمتها الغذائية', 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', 'preserving-natural-juices');

-- إدراج إعدادات الموقع الافتراضية
INSERT INTO site_settings (site_name, site_description, contact_email, contact_phone, contact_address) VALUES
('Juicetry - جوستري', 'أفضل العصائر الطبيعية الطازجة في المملكة العربية السعودية', 'info@juicetry.com', '+966501234567', 'الرياض، المملكة العربية السعودية');

-- إدراج إعدادات صفحة من نحن الافتراضية
INSERT INTO about_page_settings (title, subtitle, description, mission_description, vision_description, values_description, team_description) VALUES
('من نحن', 'قصة Juicetry - جوستري', 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات. منذ تأسيسنا، نسعى لتقديم منتجات صحية وطبيعية 100% لعملائنا الكرام.', 'تقديم أفضل العصائر الطبيعية الطازجة والصحية لعملائنا الكرام، مع الحرص على أعلى معايير الجودة والنظافة.', 'أن نكون الخيار الأول للعصائر الطبيعية في المملكة العربية السعودية والمنطقة، ونساهم في نشر ثقافة الغذاء الصحي.', 'الجودة: نختار أجود الفواكه والخضروات. الطبيعية: منتجاتنا طبيعية 100% بدون إضافات. الصحة: نهتم بصحة عملائنا. رضا العملاء: رضاكم هو هدفنا الأول.', 'فريق متخصص من خبراء التغذية وصناعة العصائر، يعمل بشغف لتقديم أفضل المنتجات الطبيعية.');

-- تفعيل Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON customer_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_page_settings FOR SELECT USING (is_active = true);

-- سياسات الكتابة للمستخدمين المسجلين
CREATE POLICY "Authenticated users can insert orders" ON orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert reviews" ON customer_reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- سياسات المديرين (يجب إنشاء مستخدم admin أولاً)
-- سيتم إضافة هذه السياسات لاحقاً بعد إنشاء المستخدم الإداري

-- إنشاء Storage bucket للصور
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- سياسة رفع الصور للجميع (مؤقتاً)
CREATE POLICY "Public upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Public delete access" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- رسالة النجاح
SELECT 'تم إعداد قاعدة البيانات بنجاح! 🎉' as message;
