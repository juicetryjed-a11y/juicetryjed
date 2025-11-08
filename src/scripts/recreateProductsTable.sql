-- إعادة إنشاء جدول المنتجات بـ INTEGER category_id

-- حذف الجدول القديم
DROP TABLE IF EXISTS products CASCADE;

-- إنشاء الجدول الجديد
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- إضافة policies
DROP POLICY IF EXISTS "Allow public read" ON products;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations" ON products;
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true);

SELECT 'تم إعادة إنشاء جدول المنتجات بنجاح!' as status;
