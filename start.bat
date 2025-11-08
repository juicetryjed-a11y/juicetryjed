@echo off
echo ========================================
echo    🚀 تشغيل موقع Juicetry - جوستري
echo ========================================
echo.

echo 📋 فحص متطلبات النظام...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً
    echo 🔗 https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js مثبت
echo.

echo 📦 تثبيت المتطلبات...
call npm install
if errorlevel 1 (
    echo ❌ فشل في تثبيت المتطلبات
    pause
    exit /b 1
)

echo ✅ تم تثبيت المتطلبات بنجاح
echo.

echo 🔧 فحص إعدادات قاعدة البيانات...
if not exist .env (
    echo ⚠️  ملف .env غير موجود
    echo 📝 يرجى إعداد قاعدة البيانات أولاً
    echo 📖 راجع ملف DATABASE_SETUP_GUIDE.md
    pause
    exit /b 1
)

echo ✅ ملف الإعدادات موجود
echo.

echo 🌐 تشغيل الموقع...
echo 🔗 الموقع سيفتح على: http://localhost:5173
echo 🔗 الداشبورد: http://localhost:5173/admin/login
echo 👤 البريد: admin@juicetry.com
echo 🔑 كلمة المرور: admin123
echo.
echo ⏹️  لإيقاف الموقع اضغط Ctrl+C
echo.

call npm run dev

pause
