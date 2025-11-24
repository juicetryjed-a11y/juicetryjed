# 🔧 إعدادات Supabase للمشروع

## المطلوب:
قم بإنشاء ملف `.env` في المجلد الرئيسي للمشروع وأضف التالي:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ijpugtvfckmptzegdchr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzMzMzYsImV4cCI6MjA0Nzk0OTMzNn0.KN2fkI-VhKh8iZGJxU4z7JoE6TJZv5nZz0B6n1c6HYY

# Application Mode
VITE_USE_MOCK_DATA=false
```

## الأوامر:
```bash
# في المجلد الرئيسي
cp .env.example .env
# ثم حرر الملف وأضف القيم أعلاه
```

## ✅ التحقق:
بعد إنشاء الملف، أعد تشغيل المشروع:
```bash
npm run dev
```
