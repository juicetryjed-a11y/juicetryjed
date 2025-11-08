# 🔧 **حل مشكلة: المنتجات والصور لا تظهر**

## 🎯 **المشكلة:**
```
❌ المنتجات تُضاف في الداشبورد لكن لا تظهر في صفحة المنيو
❌ الصور لا تظهر
```

---

## 🔍 **الأسباب المحتملة:**

### **1. المنتجات غير نشطة (is_active = false)**
### **2. التصنيفات غير نشطة**
### **3. الصور غير موجودة أو الرابط خاطئ**
### **4. مشكلة في الاتصال بـ Supabase**

---

## ✅ **الحلول:**

### **الحل 1️⃣: فحص البيانات في Supabase**

#### **في SQL Editor، نفذ:**
```sql
-- فحص المنتجات
SELECT 
  id,
  name,
  price,
  category_id,
  is_active,
  image_url
FROM products
ORDER BY created_at DESC;
```

**تحقق من:**
- ✅ `is_active = true` (يجب أن تكون true)
- ✅ `image_url` موجود وليس NULL
- ✅ `category_id` موجود

---

### **الحل 2️⃣: تفعيل المنتجات**

#### **إذا كانت المنتجات غير نشطة:**
```sql
-- تفعيل جميع المنتجات
UPDATE products
SET is_active = true
WHERE is_active = false;
```

---

### **الحل 3️⃣: تفعيل التصنيفات**

#### **تحقق من التصنيفات:**
```sql
-- فحص التصنيفات
SELECT id, name, is_active
FROM categories;
```

#### **تفعيل التصنيفات:**
```sql
-- تفعيل جميع التصنيفات
UPDATE categories
SET is_active = true
WHERE is_active = false;
```

---

### **الحل 4️⃣: إضافة صور للمنتجات**

#### **الطريقة 1: تحديث الصور يدوياً**
```sql
-- تحديث صورة منتج معين
UPDATE products
SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800'
WHERE id = 1;
```

#### **الطريقة 2: إضافة صور افتراضية لجميع المنتجات**
```sql
-- إضافة صور افتراضية للمنتجات بدون صور
UPDATE products
SET image_url = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800'
WHERE image_url IS NULL OR image_url = '';
```

---

### **الحل 5️⃣: إضافة منتجات تجريبية مع صور**

#### **نفذ ملف SQL:**
```
database/add_test_products.sql
```

**هذا الملف سيضيف 10 منتجات تجريبية مع صور جاهزة**

---

### **الحل 6️⃣: التحقق من Console المتصفح**

#### **1. افتح المتصفح:**
```
http://localhost:5176
```

#### **2. افتح Console (F12)**

#### **3. ابحث عن:**
```
✅ Supabase متصل: https://ijpugtvfckmptzeqdchr.supabase.co
✅ استخدام قاعدة البيانات الحقيقية
```

#### **4. إذا رأيت أخطاء:**
```
❌ خطأ: Supabase غير مُعد
```

**الحل:**
- تحقق من ملف `.env`
- أعد تشغيل المشروع (Ctrl+C ثم npm run dev)

---

### **الحل 7️⃣: مسح Cache المتصفح**

#### **1. اضغط Ctrl+Shift+Delete**
#### **2. اختر:**
```
✅ Cached images and files
✅ Cookies and site data
```
#### **3. انقر "Clear data"**
#### **4. أعد تحميل الصفحة (Ctrl+F5)**

---

## 🚀 **الخطوات الموصى بها:**

### **الخطوة 1: فحص البيانات**
```sql
-- في Supabase SQL Editor
SELECT * FROM products WHERE is_active = true;
SELECT * FROM categories WHERE is_active = true;
```

### **الخطوة 2: تفعيل كل شيء**
```sql
UPDATE products SET is_active = true;
UPDATE categories SET is_active = true;
```

### **الخطوة 3: إضافة صور**
```sql
-- نفذ ملف: database/add_test_products.sql
-- أو حدث الصور يدوياً
```

### **الخطوة 4: أعد تحميل الصفحة**
```
1. افتح: http://localhost:5176/menu
2. اضغط Ctrl+F5 (Hard Refresh)
3. تحقق من ظهور المنتجات
```

---

## 🔍 **التحقق النهائي:**

### **في Supabase SQL Editor:**
```sql
-- عدد المنتجات النشطة
SELECT COUNT(*) as active_products
FROM products
WHERE is_active = true;

-- عدد التصنيفات النشطة
SELECT COUNT(*) as active_categories
FROM categories
WHERE is_active = true;

-- المنتجات مع الصور
SELECT 
  id,
  name,
  is_active,
  CASE 
    WHEN image_url IS NOT NULL AND image_url != '' THEN 'Yes'
    ELSE 'No'
  END as has_image
FROM products;
```

**يجب أن ترى:**
```
✅ active_products > 0
✅ active_categories > 0
✅ جميع المنتجات has_image = 'Yes'
```

---

## 📊 **اختبار سريع:**

### **1. في الداشبورد:**
```
1. اذهب لتاب "المنتجات"
2. تأكد من:
   ✅ المنتج نشط (is_active)
   ✅ الصورة موجودة
   ✅ التصنيف محدد
3. احفظ
```

### **2. في صفحة المنيو:**
```
1. افتح: http://localhost:5176/menu
2. اضغط Ctrl+F5
3. يجب أن ترى المنتجات مع الصور
```

---

## 🆘 **إذا استمرت المشكلة:**

### **الحل الشامل:**

```sql
-- 1. تفعيل كل شيء
UPDATE products SET is_active = true;
UPDATE categories SET is_active = true;

-- 2. إضافة صور افتراضية
UPDATE products
SET image_url = CASE 
  WHEN category_id = 1 THEN 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800'
  WHEN category_id = 2 THEN 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800'
  WHEN category_id = 3 THEN 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800'
  ELSE 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800'
END
WHERE image_url IS NULL OR image_url = '';

-- 3. التحقق
SELECT 
  p.id,
  p.name,
  p.is_active,
  c.name as category,
  c.is_active as category_active,
  LEFT(p.image_url, 50) as image
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;
```

---

## ✅ **النتيجة المتوقعة:**

**بعد تطبيق الحلول:**
```
✅ المنتجات تظهر في صفحة المنيو
✅ الصور تظهر بشكل صحيح
✅ التصنيفات تعمل
✅ البحث يعمل
✅ الفلترة تعمل
```

---

## 📞 **ملفات مساعدة:**

```
📄 database/check_data.sql        → فحص البيانات
📄 database/add_test_products.sql → إضافة منتجات تجريبية
```

---

**🎯 ابدأ بتنفيذ الحل الشامل أعلاه وستعمل كل شيء!**
