# 🚀 دليل رفع المشروع من GitHub إلى Netlify

## ✅ لماذا هذه الطريقة أفضل؟

- ✅ **نشر تلقائي**: كل تحديث على GitHub يُنشر تلقائياً على Netlify
- ✅ **لا مشاكل في البناء**: Netlify يبني المشروع بشكل صحيح
- ✅ **سهولة التحديث**: فقط ارفع التغييرات على GitHub
- ✅ **نسخ احتياطية**: كل التغييرات محفوظة على GitHub

---

## 📋 الجزء الأول: رفع المشروع على GitHub

### الخطوة 1: إنشاء Repository على GitHub

1. **اذهب إلى [github.com](https://github.com)**
2. **سجل دخول** (أو أنشئ حساب جديد)
3. **انقر على زر "+" في الأعلى**
4. **اختر "New repository"**
5. **املأ البيانات:**
   ```
   Repository name: juicetry-website
   Description: موقع جوستري للعصائر الطبيعية
   ✅ Public (أو Private إذا أردت)
   ❌ لا تضف README أو .gitignore (موجودين بالفعل)
   ```
6. **انقر "Create repository"**

### الخطوة 2: رفع الملفات من الكمبيوتر

**افتح PowerShell أو Command Prompt في مجلد المشروع:**

```powershell
# انتقل إلى مجلد المشروع
cd "C:\Users\LINK SYSTEM\Desktop\package\joustry-fresh"

# ابدأ Git في المشروع
git init

# أضف جميع الملفات
git add .

# اعمل Commit أول
git commit -m "Initial commit - Juicetry website"

# اربط المشروع بـ GitHub (غير USERNAME باسم حسابك)
git remote add origin https://github.com/USERNAME/juicetry-website.git

# ارفع الملفات
git branch -M main
git push -u origin main
```

**⚠️ مهم:** غير `USERNAME` باسم حسابك على GitHub!

### الخطوة 3: التأكد من الرفع

1. **ارجع إلى صفحة Repository على GitHub**
2. **حدّث الصفحة (F5)**
3. **يجب أن ترى جميع ملفات المشروع**

---

## 📋 الجزء الثاني: ربط GitHub بـ Netlify

### الخطوة 1: إنشاء حساب Netlify

1. **اذهب إلى [netlify.com](https://netlify.com)**
2. **انقر "Sign up"**
3. **اختر "Sign up with GitHub"** ← مهم جداً!
4. **اسمح لـ Netlify بالوصول إلى GitHub**

### الخطوة 2: إنشاء موقع جديد

1. **في لوحة تحكم Netlify، انقر "Add new site"**
2. **اختر "Import an existing project"**
3. **اختر "Deploy with GitHub"**
4. **اختر Repository: `juicetry-website`**

### الخطوة 3: إعدادات البناء

**Netlify سيكتشف الإعدادات تلقائياً، لكن تأكد من:**

```
Branch to deploy: main
Build command: npm run build
Publish directory: dist
```

**انقر "Deploy site"** ← لكن انتظر! لا تنشر بعد!

### الخطوة 4: إضافة متغيرات البيئة (قبل النشر!)

**⚠️ هذه الخطوة مهمة جداً - قبل النشر الأول!**

1. **قبل النقر على "Deploy"، انقر "Advanced settings"**
2. **أو بعد إنشاء الموقع، اذهب إلى "Site settings" → "Environment variables"**
3. **انقر "Add a variable"**
4. **أضف هذه المتغيرات الـ 6:**

```env
Key: VITE_SUPABASE_URL
Value: https://ijpugtvfckmptzegdchr.supabase.co
Scopes: ✅ All

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o
Scopes: ✅ All

Key: VITE_USE_MOCK_DATA
Value: false
Scopes: ✅ All

Key: VITE_DISABLE_LOCALSTORAGE
Value: true
Scopes: ✅ All

Key: VITE_APP_TITLE
Value: Juicetry - جوستري
Scopes: ✅ All

Key: VITE_DEFAULT_LANGUAGE
Value: ar
Scopes: ✅ All
```

### الخطوة 5: النشر الأول

1. **بعد إضافة جميع المتغيرات**
2. **اذهب إلى "Deploys"**
3. **انقر "Trigger deploy" → "Deploy site"**
4. **انتظر حتى ينتهي البناء (3-5 دقائق)**

### الخطوة 6: الحصول على رابط الموقع

1. **بعد انتهاء البناء، ستحصل على رابط مثل:**
   ```
   https://random-name-123456.netlify.app
   ```
2. **يمكنك تغيير الاسم من "Site settings" → "Site details" → "Change site name"**

---

## 🎯 الجزء الثالث: التحديثات المستقبلية

### كيف تحدث الموقع؟

**كل ما عليك فعله:**

```powershell
# بعد تعديل أي ملف في المشروع
git add .
git commit -m "وصف التحديث"
git push

# Netlify سينشر التحديث تلقائياً! 🎉
```

---

## 📸 الأوامر الكاملة (نسخ ولصق)

### للمرة الأولى فقط:

```powershell
cd "C:\Users\LINK SYSTEM\Desktop\package\joustry-fresh"
git init
git add .
git commit -m "Initial commit - Juicetry website"
git remote add origin https://github.com/USERNAME/juicetry-website.git
git branch -M main
git push -u origin main
```

### للتحديثات (كل مرة):

```powershell
cd "C:\Users\LINK SYSTEM\Desktop\package\joustry-fresh"
git add .
git commit -m "تحديث الموقع"
git push
```

---

## ⚠️ ملاحظات مهمة

### 1. إذا طلب منك Username وPassword:

**GitHub لا يقبل Password عادي الآن، تحتاج Personal Access Token:**

1. اذهب إلى GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. انقر "Generate new token (classic)"
3. اختر Scopes: ✅ repo
4. انسخ الـ Token واستخدمه بدلاً من Password

### 2. إذا كان Git غير مثبت:

**حمّل Git من:**
- [git-scm.com/download/win](https://git-scm.com/download/win)

### 3. تحقق من أن المتغيرات تعمل:

**بعد النشر، افتح الموقع واضغط F12:**

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
// يجب أن يظهر: https://ijpugtvfckmptzegdchr.supabase.co
```

---

## 🎉 النتيجة النهائية

بعد اتباع هذه الخطوات:

- ✅ المشروع محفوظ على GitHub
- ✅ الموقع منشور على Netlify
- ✅ جميع الوظائف تعمل (منتجات، تصنيفات، مقالات، إعدادات)
- ✅ كل تحديث على GitHub يُنشر تلقائياً
- ✅ رابط دائم للموقع
- ✅ SSL مجاني (HTTPS)

---

## 🆘 حل المشاكل الشائعة

### المشكلة: "git is not recognized"
**الحل:** ثبّت Git من الرابط أعلاه

### المشكلة: "Permission denied"
**الحل:** استخدم Personal Access Token بدلاً من Password

### المشكلة: "Build failed" في Netlify
**الحل:** تأكد من إضافة جميع متغيرات البيئة الـ 6

### المشكلة: "المنتجات لا تُضاف"
**الحل:** تحقق من Console (F12) وتأكد من أن المتغيرات موجودة

---

## 📞 الدعم

**إذا واجهت أي مشكلة في أي خطوة، أخبرني وسأساعدك!**

**🚀 بالتوفيق! ستحصل على موقع احترافي يعمل بشكل كامل!**
