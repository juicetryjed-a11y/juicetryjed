-- ============================================
-- Juicetry Complete Backend Setup
-- نظام متكامل لإدارة متجر العصائر
-- ============================================

-- تنظيف قاعدة البيانات (حذف الجداول القديمة إن وجدت)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS about_page_settings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ============================================
-- 1. جدول التصنيفات (Categories)
-- ============================================
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#22c55e',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهرس لتحسين الأداء
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(order_index);

-- ============================================
-- 2. جدول المنتجات (Products)
-- ============================================
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  
  -- معلومات إضافية
  ingredients TEXT[],
  ingredients_en TEXT[],
  nutritional_info JSONB,
  allergens TEXT[],
  
  -- خيارات المنتج
  sizes JSONB DEFAULT '[]'::jsonb,
  available_sizes TEXT[],
  customization_options JSONB DEFAULT '{}'::jsonb,
  
  -- حالة المنتج
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  
  -- تقييمات
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  
  -- SEO
  slug TEXT UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  
  -- تواريخ
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس لتحسين الأداء
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created ON products(created_at DESC);

-- ============================================
-- 3. جدول الطلبات (Orders)
-- ============================================
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  
  -- معلومات العميل
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  customer_notes TEXT,
  
  -- معلومات الطلب
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- حالة الطلب
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'online')),
  
  -- معلومات التوصيل
  delivery_type TEXT DEFAULT 'delivery' CHECK (delivery_type IN ('delivery', 'pickup')),
  delivery_address TEXT,
  delivery_time TIMESTAMPTZ,
  estimated_delivery TIMESTAMPTZ,
  
  -- تواريخ
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- فهارس
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);

-- ============================================
-- 4. جدول عناصر الطلب (Order Items)
-- ============================================
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  
  -- معلومات المنتج وقت الطلب
  product_name TEXT NOT NULL,
  product_image TEXT,
  
  -- السعر والكمية
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  
  -- خيارات التخصيص
  size TEXT,
  customizations JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ============================================
-- 5. جدول المراجعات (Customer Reviews)
-- ============================================
CREATE TABLE customer_reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
  
  -- معلومات المراجعة
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- صور المراجعة
  images TEXT[],
  
  -- حالة المراجعة
  is_verified BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- رد الإدارة
  admin_reply TEXT,
  admin_reply_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس
CREATE INDEX idx_reviews_product ON customer_reviews(product_id);
CREATE INDEX idx_reviews_approved ON customer_reviews(is_approved);
CREATE INDEX idx_reviews_rating ON customer_reviews(rating DESC);

-- ============================================
-- 6. جدول المقالات (Blog Posts)
-- ============================================
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  -- المحتوى
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  
  -- الصور
  featured_image TEXT,
  images TEXT[],
  
  -- التصنيف
  category TEXT,
  tags TEXT[],
  
  -- الكاتب
  author_name TEXT DEFAULT 'Juicetry Team',
  author_image TEXT,
  
  -- حالة المقالة
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- إحصائيات
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- تواريخ
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(is_published);
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC);

-- ============================================
-- 7. جدول المستخدمين (Profiles)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- الدور والصلاحيات
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'manager', 'staff', 'customer')),
  is_active BOOLEAN DEFAULT true,
  
  -- معلومات إضافية
  address TEXT,
  city TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  
  -- إحصائيات
  orders_count INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ============================================
-- 8. جدول إعدادات الموقع (Site Settings)
-- ============================================
CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. جدول إعدادات صفحة من نحن
-- ============================================
CREATE TABLE about_page_settings (
  id BIGSERIAL PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  title_en TEXT,
  content TEXT,
  content_en TEXT,
  image_url TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS - تحديث updated_at تلقائياً
-- ============================================

-- دالة لتحديث updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق الـ trigger على جميع الجداول
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON customer_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGERS - تحديث تقييمات المنتجات
-- ============================================

CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM customer_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = true
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM customer_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = true
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON customer_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- ============================================
-- TRIGGERS - إنشاء رقم طلب تلقائي
-- ============================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('orders_id_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- ============================================
-- TRIGGERS - إنشاء slug تلقائي للمنتجات
-- ============================================

CREATE OR REPLACE FUNCTION generate_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9\u0600-\u06FF]+', '-', 'g')) || '-' || NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_product_slug
  BEFORE INSERT ON products
  FOR EACH ROW EXECUTE FUNCTION generate_product_slug();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - الأمان
-- ============================================

-- تفعيل RLS على جميع الجداول
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- سياسات القراءة العامة (Public Read)
-- ============================================

-- التصنيفات - قراءة عامة للنشطة فقط
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

-- المنتجات - قراءة عامة للنشطة فقط
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (is_active = true);

-- المراجعات - قراءة عامة للموافق عليها فقط
CREATE POLICY "Public can view approved reviews"
  ON customer_reviews FOR SELECT
  USING (is_approved = true);

-- المقالات - قراءة عامة للمنشورة فقط
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- إعدادات الموقع - قراءة عامة
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

-- إعدادات صفحة من نحن - قراءة عامة للنشطة
CREATE POLICY "Public can view active about sections"
  ON about_page_settings FOR SELECT
  USING (is_active = true);

-- ============================================
-- سياسات الإدارة (Admin Policies)
-- ============================================

-- دالة للتحقق من صلاحيات الإدارة
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'manager')
      AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- سياسات الإدارة للتصنيفات
CREATE POLICY "Admins can view all categories"
  ON categories FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (is_admin());

-- سياسات الإدارة للمنتجات
CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (is_admin());

-- سياسات الإدارة للطلبات
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (is_admin());

-- سياسات الإدارة لعناصر الطلب
CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT
  USING (is_admin());

-- سياسات الإدارة للمراجعات
CREATE POLICY "Admins can view all reviews"
  ON customer_reviews FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update reviews"
  ON customer_reviews FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete reviews"
  ON customer_reviews FOR DELETE
  USING (is_admin());

-- سياسات الإدارة للمقالات
CREATE POLICY "Admins can view all posts"
  ON blog_posts FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert posts"
  ON blog_posts FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update posts"
  ON blog_posts FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete posts"
  ON blog_posts FOR DELETE
  USING (is_admin());

-- سياسات الإدارة للمستخدمين
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update profiles"
  ON profiles FOR UPDATE
  USING (is_admin());

-- سياسات الإدارة للإعدادات
CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  USING (is_admin());

CREATE POLICY "Admins can manage about settings"
  ON about_page_settings FOR ALL
  USING (is_admin());

-- ============================================
-- سياسات العملاء (Customer Policies)
-- ============================================

-- العملاء يمكنهم إنشاء طلبات
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- العملاء يمكنهم إضافة مراجعات
CREATE POLICY "Anyone can create reviews"
  ON customer_reviews FOR INSERT
  WITH CHECK (true);

-- ============================================
-- FUNCTIONS - دوال مساعدة
-- ============================================

-- دالة لحساب إجمالي الطلب
CREATE OR REPLACE FUNCTION calculate_order_total(order_id_param BIGINT)
RETURNS DECIMAL AS $$
DECLARE
  total DECIMAL;
BEGIN
  SELECT COALESCE(SUM(total_price), 0)
  INTO total
  FROM order_items
  WHERE order_id = order_id_param;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- دالة للحصول على المنتجات الأكثر مبيعاً
CREATE OR REPLACE FUNCTION get_bestselling_products(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  product_id BIGINT,
  product_name TEXT,
  total_sold BIGINT,
  total_revenue DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    COUNT(oi.id)::BIGINT as total_sold,
    SUM(oi.total_price) as total_revenue
  FROM products p
  JOIN order_items oi ON p.id = oi.product_id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.status = 'delivered'
  GROUP BY p.id, p.name
  ORDER BY total_sold DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- دالة للحصول على إحصائيات الطلبات
CREATE OR REPLACE FUNCTION get_orders_statistics(
  start_date TIMESTAMPTZ DEFAULT NULL,
  end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE (
  total_orders BIGINT,
  total_revenue DECIMAL,
  average_order_value DECIMAL,
  pending_orders BIGINT,
  completed_orders BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_orders,
    COALESCE(SUM(final_amount), 0) as total_revenue,
    COALESCE(AVG(final_amount), 0) as average_order_value,
    COUNT(*) FILTER (WHERE status = 'pending')::BIGINT as pending_orders,
    COUNT(*) FILTER (WHERE status = 'delivered')::BIGINT as completed_orders
  FROM orders
  WHERE (start_date IS NULL OR created_at >= start_date)
    AND (end_date IS NULL OR created_at <= end_date);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- بيانات تجريبية (Demo Data)
-- ============================================

-- إدراج تصنيفات تجريبية
INSERT INTO categories (name, name_en, description, icon, color, order_index) VALUES
('عصائر طازجة', 'Fresh Juices', 'عصائر طبيعية 100% بدون إضافات', '🍊', '#f97316', 1),
('سموثي', 'Smoothies', 'مشروبات صحية بالفواكه والخضروات', '🥤', '#22c55e', 2),
('مشروبات باردة', 'Cold Drinks', 'مشروبات منعشة ولذيذة', '🧊', '#06b6d4', 3),
('مشروبات ساخنة', 'Hot Drinks', 'مشروبات دافئة ومريحة', '☕', '#ef4444', 4),
('عروض خاصة', 'Special Offers', 'عروض وخصومات حصرية', '🎁', '#8b5cf6', 5);

-- إدراج منتجات تجريبية
INSERT INTO products (name, name_en, description, price, category_id, image_url, is_active, is_featured) VALUES
('عصير برتقال طازج', 'Fresh Orange Juice', 'عصير برتقال طبيعي 100% بدون سكر مضاف', 15.00, 1, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true, true),
('سموثي الفراولة', 'Strawberry Smoothie', 'سموثي كريمي بالفراولة الطازجة', 20.00, 2, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', true, true),
('عصير مانجو', 'Mango Juice', 'عصير مانجو طبيعي ولذيذ', 18.00, 1, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true, false),
('موهيتو بالنعناع', 'Mint Mojito', 'مشروب منعش بالنعناع والليمون', 22.00, 3, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', true, true);

-- إدراج إعدادات الموقع
INSERT INTO site_settings (key, value, description, category) VALUES
('site_name', '{"ar": "Juicetry", "en": "Juicetry"}'::jsonb, 'اسم الموقع', 'general'),
('site_description', '{"ar": "أفضل عصائر طبيعية في المدينة", "en": "Best natural juices in town"}'::jsonb, 'وصف الموقع', 'general'),
('contact_phone', '{"value": "+966 50 123 4567"}'::jsonb, 'رقم الهاتف', 'contact'),
('contact_email', '{"value": "info@juicetry.com"}'::jsonb, 'البريد الإلكتروني', 'contact'),
('contact_address', '{"ar": "الرياض، المملكة العربية السعودية", "en": "Riyadh, Saudi Arabia"}'::jsonb, 'العنوان', 'contact'),
('delivery_fee', '{"value": 10}'::jsonb, 'رسوم التوصيل', 'orders'),
('min_order_amount', '{"value": 30}'::jsonb, 'الحد الأدنى للطلب', 'orders');

-- ============================================
-- إنشاء مستخدم إداري
-- ============================================

-- ملاحظة: يجب إنشاء المستخدم من خلال Supabase Auth أولاً
-- ثم تحديث دوره في جدول profiles

-- مثال على إدراج profile للمستخدم الإداري
-- استبدل 'USER_UUID_HERE' بـ UUID المستخدم الفعلي من auth.users
-- INSERT INTO profiles (id, email, full_name, role) VALUES
-- ('USER_UUID_HERE', 'admin@juicetry.com', 'Admin User', 'admin');

-- ============================================
-- النهاية
-- ============================================

-- عرض ملخص الجداول المنشأة
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
