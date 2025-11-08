-- ============================================
-- إعداد Storage للصور في Supabase
-- ============================================

-- ملاحظة: هذا الملف للمرجعية فقط
-- يجب إنشاء bucket من خلال Supabase Dashboard

/*
خطوات إنشاء Storage Bucket:

1. اذهب إلى Supabase Dashboard
2. اختر Storage من القائمة الجانبية
3. انقر "New bucket"
4. املأ البيانات:
   - Name: images
   - Public bucket: ✅ نعم (مهم جداً!)
   - File size limit: 5MB
   - Allowed MIME types: image/*
5. انقر "Create bucket"

6. إعداد السياسات (Policies):
   - اذهب إلى Policies في bucket "images"
   - أضف سياسة قراءة عامة:
*/

-- سياسة قراءة عامة للصور
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- سياسة رفع للمستخدمين المصادق عليهم
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- سياسة تحديث للمستخدمين المصادق عليهم
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- سياسة حذف للمستخدمين المصادق عليهم
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- اختبار رفع صورة
-- ============================================

/*
بعد إنشاء bucket، اختبر رفع صورة:

1. في Supabase Dashboard > Storage > images
2. انقر "Upload file"
3. اختر صورة واحفظها
4. انسخ Public URL
5. استخدم الرابط في المنتج

مثال على رابط الصورة:
https://odkdecaasvvgpgatated.supabase.co/storage/v1/object/public/images/products/juice-1.jpg
*/
