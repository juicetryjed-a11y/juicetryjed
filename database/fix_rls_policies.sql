-- ============================================
-- إصلاح RLS Policies - حل مشكلة عدم ظهور البيانات
-- ============================================

-- المشكلة: RLS يمنع القراءة العامة للبيانات
-- الحل: تعطيل RLS أو إضافة سياسات قراءة عامة

-- ============================================
-- الحل السريع: تعطيل RLS (للاختبار)
-- ============================================

ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews DISABLE ROW LEVEL SECURITY;

-- ============================================
-- أو: الحل الآمن - إضافة سياسات قراءة عامة
-- ============================================

-- حذف السياسات القديمة إن وجدت
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public read access" ON categories;
DROP POLICY IF EXISTS "Public read access" ON blog_posts;
DROP POLICY IF EXISTS "Public read access" ON site_settings;
DROP POLICY IF EXISTS "Public read access" ON about_page_settings;
DROP POLICY IF EXISTS "Public read access" ON customer_reviews;

-- تفعيل RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- إضافة سياسات قراءة عامة
CREATE POLICY "Public read access" ON products
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access" ON categories
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access" ON blog_posts
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access" ON site_settings
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access" ON about_page_settings
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access" ON customer_reviews
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================
-- سياسات الكتابة للمستخدمين المصادق عليهم
-- ============================================

-- Products
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE TO authenticated
  USING (true);

-- Categories
CREATE POLICY "Authenticated users can insert categories" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories" ON categories
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete categories" ON categories
  FOR DELETE TO authenticated
  USING (true);

-- Blog Posts
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts" ON blog_posts
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts
  FOR DELETE TO authenticated
  USING (true);

-- Site Settings
CREATE POLICY "Authenticated users can update site settings" ON site_settings
  FOR UPDATE TO authenticated
  USING (true);

-- About Page Settings
CREATE POLICY "Authenticated users can update about page settings" ON about_page_settings
  FOR UPDATE TO authenticated
  USING (true);

-- Customer Reviews
CREATE POLICY "Authenticated users can insert reviews" ON customer_reviews
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews" ON customer_reviews
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete reviews" ON customer_reviews
  FOR DELETE TO authenticated
  USING (true);

-- ============================================
-- التحقق من السياسات
-- ============================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
