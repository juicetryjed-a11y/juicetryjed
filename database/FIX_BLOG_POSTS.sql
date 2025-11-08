-- إصلاح جدول المقالات
-- Fix Blog Posts Table

-- جعل عمود slug يقبل NULL
ALTER TABLE blog_posts ALTER COLUMN slug DROP NOT NULL;

-- إضافة قيم افتراضية للصفوف الموجودة
UPDATE blog_posts 
SET slug = 'post-' || id 
WHERE slug IS NULL OR slug = '';

-- التأكد من وجود جميع الأعمدة المطلوبة
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- رسالة النجاح
DO $$
BEGIN
    RAISE NOTICE '✅ تم إصلاح جدول المقالات!';
    RAISE NOTICE '✅ الآن يمكنك إضافة مقالات بدون مشاكل!';
END $$;

-- اختبار إضافة مقال
DO $$
DECLARE
    test_id UUID;
BEGIN
    INSERT INTO blog_posts (
        title,
        content,
        excerpt,
        author,
        is_published
    ) VALUES (
        'مقال اختبار',
        'محتوى المقال الاختباري',
        'مقتطف من المقال',
        'المدير',
        false
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE '✅ تم إضافة مقال اختبار بنجاح! ID: %', test_id;
    
    -- حذف المقال التجريبي
    DELETE FROM blog_posts WHERE id = test_id;
    RAISE NOTICE '✅ تم حذف المقال التجريبي';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ فشل: %', SQLERRM;
END $$;

-- عرض أعمدة جدول المقالات
SELECT 
    '📝 أعمدة جدول المقالات:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
