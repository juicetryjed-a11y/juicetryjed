# ⚡ أوامر سريعة - رفع المشروع على GitHub

## 🎯 الخطوة 1: أوامر Git (نسخ ولصق)

**افتح PowerShell في مجلد المشروع وانسخ هذه الأوامر:**

```powershell
# انتقل إلى مجلد المشروع
cd "C:\Users\LINK SYSTEM\Desktop\package\joustry-fresh"

# ابدأ Git
git init

# أضف جميع الملفات
git add .

# اعمل Commit
git commit -m "Initial commit - Juicetry website"
```

---

## 🎯 الخطوة 2: أنشئ Repository على GitHub

1. اذهب إلى: https://github.com/new
2. اسم الـ Repository: `juicetry-website`
3. اختر Public
4. **لا تضف** README أو .gitignore
5. انقر "Create repository"

---

## 🎯 الخطوة 3: اربط المشروع بـ GitHub

**⚠️ غير `YOUR_USERNAME` باسم حسابك على GitHub!**

```powershell
# اربط بـ GitHub (غير YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/juicetry-website.git

# ارفع الملفات
git branch -M main
git push -u origin main
```

**إذا طلب Username وPassword:**
- Username: اسم حسابك على GitHub
- Password: استخدم Personal Access Token (ليس password عادي)

---

## 🎯 الخطوة 4: اربط GitHub بـ Netlify

1. اذهب إلى: https://app.netlify.com
2. سجل دخول بـ GitHub
3. انقر "Add new site" → "Import an existing project"
4. اختر "Deploy with GitHub"
5. اختر repository: `juicetry-website`

**إعدادات البناء:**
```
Build command: npm run build
Publish directory: dist
```

---

## 🎯 الخطوة 5: أضف متغيرات البيئة في Netlify

**في Netlify: Site settings → Environment variables → Add a variable**

**انسخ والصق كل متغير:**

```
VITE_SUPABASE_URL
https://ijpugtvfckmptzegdchr.supabase.co
```

```
VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o
```

```
VITE_USE_MOCK_DATA
false
```

```
VITE_DISABLE_LOCALSTORAGE
true
```

```
VITE_APP_TITLE
Juicetry - جوستري
```

```
VITE_DEFAULT_LANGUAGE
ar
```

---

## 🎯 الخطوة 6: انشر الموقع

1. في Netlify: Deploys → Trigger deploy → Deploy site
2. انتظر 3-5 دقائق
3. احصل على رابط الموقع!

---

## ⚡ للتحديثات المستقبلية

**كل ما عليك فعله بعد تعديل أي ملف:**

```powershell
cd "C:\Users\LINK SYSTEM\Desktop\package\joustry-fresh"
git add .
git commit -m "تحديث الموقع"
git push
```

**Netlify سينشر التحديث تلقائياً! 🎉**

---

## 🆘 إذا واجهت مشكلة

### Git غير مثبت؟
حمّل من: https://git-scm.com/download/win

### طلب Personal Access Token؟
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. اختر scope: repo
5. انسخ الـ Token واستخدمه بدلاً من Password

### Build failed في Netlify؟
تأكد من إضافة جميع متغيرات البيئة الـ 6

---

## ✅ Checklist

- [ ] أنشأت Repository على GitHub
- [ ] رفعت الملفات بـ Git
- [ ] ربطت GitHub بـ Netlify
- [ ] أضفت جميع متغيرات البيئة (6 متغيرات)
- [ ] نشرت الموقع
- [ ] اختبرت الموقع (إضافة منتج/تصنيف)

**🚀 بالتوفيق!**
