-- إنشاء bucket للصور في Supabase Storage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- إنشاء سياسات الأمان للـ bucket
-- السماح للجميع بقراءة الصور
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- السماح للمديرين برفع الصور
CREATE POLICY "Allow admin upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- السماح للمديرين بحذف الصور
CREATE POLICY "Allow admin delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- السماح للمديرين بتحديث الصور
CREATE POLICY "Allow admin update" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- إنشاء مجلدات فرعية (اختيارية - يتم إنشاؤها تلقائياً عند الرفع)
-- products/ - للمنتجات
-- blog/ - للمقالات
-- categories/ - للتصنيفات
-- uploads/ - للملفات العامة
