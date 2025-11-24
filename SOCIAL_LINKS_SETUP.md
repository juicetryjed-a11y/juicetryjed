# إضافة روابط Snapchat و Facebook

## الخطوة 1: تحديث قاعدة البيانات

قم بتشغيل الملف التالي في Supabase SQL Editor:
```
database/add_social_links.sql
```

هذا سيضيف:
- عمود `snapchat_url` إلى جداول `footer_settings` و `site_settings`
- عمود `facebook_url` (إذا لم يكن موجوداً)
- الروابط التالية:
  - Snapchat: https://www.snapchat.com/add/juicetry جed
  - Facebook: https://www.facebook.com/share/14Mjo53Fn8V/?mibextid=wwXIfr

## الخطوة 2: التحقق من الكود

تم تحديث الملفات التالية:
- ✅ `src/hooks/useFooterSettings.ts` - أضيف `snapchat_url`
- ✅ `src/components/layout/Footer.tsx` - أضيفت أيقونة Snapchat الرسمية
- ✅ `src/components/dashboard/SiteSettingsManager.tsx` - أضيف حقل Snapchat

## الخطوة 3: إضافة الروابط من لوحة التحكم

1. افتح لوحة التحكم: `/admin/dashboard`
2. اذهب إلى **إعدادات الموقع**
3. اختر تبويب **وسائل التواصل**
4. أدخل الروابط:
   - Facebook: `https://www.facebook.com/share/14Mjo53Fn8V/?mibextid=wwXIfr`
   - Snapchat: `https://www.snapchat.com/add/juicetryjed`
5. احفظ الإعدادات

## النتيجة

ستظهر أيقونات Facebook و Snapchat في الفوتر مع باقي وسائل التواصل الاجتماعي.

## ملاحظة مهمة

إذا واجهت أي مشاكل في ملف `SiteSettingsManager.tsx`، يمكنك:
1. إعادة تشغيل الخادم: `npm run dev`
2. أو إضافة الروابط مباشرة في قاعدة البيانات عبر Supabase
