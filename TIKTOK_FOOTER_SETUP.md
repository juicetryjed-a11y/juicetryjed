# إضافة TikTok وتوحيد الفوتر

تم إجراء التعديلات التالية:

## 1. التعديلات على الكود
✅ تم استبدال YouTube بـ TikTok في:
- `SiteSettingsManager.tsx` (لوحة التحكم)
- `Footer.tsx` (الفوتر العام)

✅ تم توحيد الفوتر في جميع الصفحات:
- `FastBlogPage.tsx` - الآن يستخدم `<Footer />`
- `FastAboutPage.tsx` - الآن يستخدم `<Footer />`
- جميع الصفحات الأخرى تستخدم نفس الفوتر

## 2. الخطوات المطلوبة في Supabase

### الخطوة 1: إضافة عمود TikTok
قم بتشغيل الكود من ملف: `database/add_tiktok_column.sql`

### الخطوة 2: إضافة رابط TikTok للفوتر
قم بتشغيل الكود من ملف: `database/add_tiktok_to_footer.sql`

## 3. كيفية التنفيذ

1. افتح **Supabase SQL Editor**
2. انسخ الكود من `database/add_tiktok_column.sql`
3. اضغط **Run**
4. انسخ الكود من `database/add_tiktok_to_footer.sql`
5. اضغط **Run**

## 4. النتيجة

بعد تنفيذ هذه الخطوات:
- ✅ سيظهر رابط TikTok في الفوتر بدلاً من YouTube
- ✅ جميع الصفحات ستستخدم نفس الفوتر الديناميكي
- ✅ يمكنك تعديل رابط TikTok من لوحة التحكم (الإعدادات > وسائل التواصل)

## رابط TikTok المضاف
```
https://www.tiktok.com/@juicetry1?_r=1&_t=ZS-91fbFKvKzkv
```
