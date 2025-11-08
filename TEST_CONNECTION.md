# 🔍 **اختبار الاتصال بـ Supabase**

## 🎯 **المشكلة:**
```
✅ البيانات موجودة في Supabase
✅ تُضاف في الداشبورد
❌ لا تظهر في صفحات الموقع
❌ الصور لا تظهر
```

---

## 🔍 **التشخيص:**

### **الخطوة 1: افتح Console (F12)**

#### **في أي صفحة من الموقع، ابحث عن:**

**✅ إذا رأيت:**
```
✅ Supabase متصل: https://ijpugtvfckmptzeqdchr.supabase.co
✅ استخدام قاعدة البيانات الحقيقية
```
**→ الاتصال يعمل، المشكلة في البيانات**

**❌ إذا رأيت:**
```
❌ خطأ: Supabase غير مُعد بشكل صحيح!
⚠️ خطأ في قاعدة البيانات، التبديل للبيانات التجريبية
🔄 استخدام البيانات التجريبية
```
**→ الاتصال لا يعمل، المشكلة في الإعداد**

---

## ✅ **الحل 1: إذا كان الاتصال لا يعمل**

### **تحقق من .env:**
```bash
# افتح ملف .env وتأكد من:
VITE_SUPABASE_URL=https://ijpugtvfckmptzeqdchr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (المفتاح الكامل)
VITE_USE_MOCK_DATA=false
VITE_DISABLE_LOCALSTORAGE=true
```

### **أعد تشغيل المشروع:**
```bash
# أوقف المشروع (Ctrl+C)
# ثم شغله مرة أخرى
npm run dev
```

---

## ✅ **الحل 2: إذا كان الاتصال يعمل لكن البيانات لا تظهر**

### **في Supabase SQL Editor، نفذ:**

```sql
-- 1. فحص RLS Policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 2. تعطيل RLS مؤقتاً للاختبار
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;

-- 3. إضافة سياسات قراءة عامة
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON about_page_settings
  FOR SELECT USING (true);
```

---

## ✅ **الحل 3: فحص البيانات مباشرة**

### **في Console المتصفح (F12)، نفذ:**

```javascript
// اختبار الاتصال المباشر
const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')

const supabase = createClient(
  'https://ijpugtvfckmptzeqdchr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o'
)

// جلب المنتجات
const { data, error } = await supabase.from('products').select('*')
console.log('Products:', data)
console.log('Error:', error)

// جلب التصنيفات
const { data: cats, error: catsError } = await supabase.from('categories').select('*')
console.log('Categories:', cats)
console.log('Error:', catsError)
```

**النتيجة المتوقعة:**
```javascript
✅ Products: Array(10) [...]
✅ Categories: Array(4) [...]
✅ Error: null
```

**إذا رأيت خطأ:**
```javascript
❌ Error: { code: "42501", message: "permission denied" }
```
**→ المشكلة في RLS Policies**

---

## ✅ **الحل 4: إعادة إنشاء Policies**

### **في Supabase SQL Editor:**

```sql
-- حذف جميع Policies القديمة
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable read access for all users" ON about_page_settings;

-- تعطيل RLS
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;

-- إعادة تفعيل RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

-- إضافة سياسات قراءة عامة جديدة
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
```

---

## 🎯 **الاختبار النهائي:**

### **1. أعد تحميل الصفحة (Ctrl+F5)**

### **2. افتح Console (F12)**

### **3. يجب أن ترى:**
```
✅ Supabase متصل
✅ استخدام قاعدة البيانات الحقيقية
✅ لا توجد أخطاء
```

### **4. افتح صفحة المنيو:**
```
http://localhost:5176/menu
```

### **5. يجب أن ترى:**
```
✅ المنتجات تظهر
✅ الصور تظهر
✅ التصنيفات تعمل
```

---

## 📊 **فحص شامل:**

### **في Supabase SQL Editor:**

```sql
-- 1. عدد المنتجات
SELECT COUNT(*) as total FROM products;

-- 2. المنتجات النشطة
SELECT COUNT(*) as active FROM products WHERE is_active = true;

-- 3. المنتجات مع الصور
SELECT 
  COUNT(*) as with_images 
FROM products 
WHERE image_url IS NOT NULL AND image_url != '';

-- 4. فحص RLS
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename;
```

**يجب أن ترى:**
```
✅ total > 0
✅ active > 0
✅ with_images > 0
✅ policy_count > 0 لكل جدول
```

---

## 🆘 **إذا استمرت المشكلة:**

### **الحل النهائي: تعطيل RLS تماماً (للاختبار فقط)**

```sql
-- تعطيل RLS لجميع الجداول
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
```

**⚠️ تحذير:** هذا للاختبار فقط. بعد التأكد من عمل البيانات، أعد تفعيل RLS مع Policies صحيحة.

---

## ✅ **الخلاصة:**

**المشكلة الأكثر احتمالاً:**
```
❌ RLS Policies تمنع القراءة العامة
```

**الحل:**
```
✅ تعطيل RLS أو إضافة سياسات قراءة عامة
```

---

**🎯 ابدأ بالحل 2 (تعطيل RLS مؤقتاً) وستعمل البيانات فوراً!**
