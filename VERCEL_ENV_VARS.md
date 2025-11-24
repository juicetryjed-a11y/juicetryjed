# متغيرات البيئة لـ Vercel

## المتغيرات المطلوبة:

### 1. VITE_SUPABASE_URL
```
https://ijpugtvfckmptzegdchr.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o
```

---

## كيفية إضافتها في Vercel:

### الطريقة 1: من Dashboard
1. اذهب إلى مشروعك في Vercel
2. اضغط على **Settings**
3. اختر **Environment Variables**
4. أضف كل متغير:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://ijpugtvfckmptzegdchr.supabase.co`
   - اضغط **Add**
   
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o`
   - اضغط **Add**

5. بعد إضافة المتغيرات، اضغط **Redeploy** لإعادة النشر

### الطريقة 2: من Terminal
```bash
vercel env add VITE_SUPABASE_URL
# الصق: https://ijpugtvfckmptzegdchr.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# الصق: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o
```

---

## ملاحظات مهمة:

⚠️ **الأمان**: 
- هذه المفاتيح حالياً موجودة في الكود (supabase.ts)
- يُفضل إزالتها من الكود بعد إضافتها في Vercel
- استخدم فقط المتغيرات البيئية في Production

✅ **بعد النشر**:
- تأكد من تشغيل أكواد SQL في Supabase:
  - `database/add_social_links.sql`
  - أي أكواد أخرى من مجلد database

🔗 **رابط Supabase Dashboard**:
https://supabase.com/dashboard/project/ijpugtvfckmptzegdchr
