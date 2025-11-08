-- تحديث جدول المقالات لإضافة حقول السيو والصورة المميزة
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- إنشاء فهرس للبحث السريع بالـ slug
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- إنشاء فهرس للبحث في الكلمات المفتاحية
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING gin(to_tsvector('arabic', meta_keywords));

-- تحديث المقالات الموجودة لإضافة slug تلقائياً
UPDATE blog_posts 
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

-- إضافة قيود للتأكد من صحة البيانات
ALTER TABLE blog_posts 
ADD CONSTRAINT check_meta_title_length CHECK (LENGTH(meta_title) <= 255),
ADD CONSTRAINT check_slug_format CHECK (slug ~ '^[a-z0-9-]+$');

-- تحديث الـ trigger للتعامل مع الحقول الجديدة
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    
    -- إنشاء slug تلقائياً إذا لم يكن موجوداً
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(NEW.title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g'));
    END IF;
    
    -- تحديث meta_title تلقائياً إذا لم يكن موجوداً
    IF NEW.meta_title IS NULL OR NEW.meta_title = '' THEN
        NEW.meta_title = NEW.title;
    END IF;
    
    -- تحديث meta_description تلقائياً إذا لم يكن موجوداً
    IF NEW.meta_description IS NULL OR NEW.meta_description = '' THEN
        NEW.meta_description = NEW.excerpt;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إعادة إنشاء الـ trigger
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- إضافة trigger للإنشاء أيضاً
CREATE OR REPLACE FUNCTION set_blog_posts_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- إنشاء slug تلقائياً
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(NEW.title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g'));
    END IF;
    
    -- تحديث meta_title تلقائياً
    IF NEW.meta_title IS NULL OR NEW.meta_title = '' THEN
        NEW.meta_title = NEW.title;
    END IF;
    
    -- تحديث meta_description تلقائياً
    IF NEW.meta_description IS NULL OR NEW.meta_description = '' THEN
        NEW.meta_description = NEW.excerpt;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_posts_defaults
    BEFORE INSERT ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION set_blog_posts_defaults();
