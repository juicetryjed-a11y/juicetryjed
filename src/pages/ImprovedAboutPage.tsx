import React, { useEffect, useState } from 'react'
import { MapPin, Heart, Eye, Award, ArrowRight } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'
import logo2Image from '../components/logo2.png'
import heroLogoImage from '../pages/logo 0.png'

interface AboutPageSettings {
  id?: number
  hero_title: string
  hero_subtitle: string
  hero_description: string
  mission_title: string
  mission_content: string
  vision_title: string
  vision_content: string
  values_title: string
  values_content: string
}

const ImprovedAboutPage: React.FC = () => {
  const [settings, setSettings] = useState<AboutPageSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data } = await dataService.getAboutPageSettings()
      if (data && data.length > 0) {
        setSettings(data[0])
      } else {
        // إعدادات افتراضية
        setSettings({
          hero_title: 'من نحن',
          hero_subtitle: 'قصة Juicetry - جوستري',
          hero_description: 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
          mission_title: 'رسالتنا',
          mission_content: 'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف.',
          vision_title: 'رؤيتنا',
          vision_content: 'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة.',
          values_title: 'قيمنا',
          values_content: 'الجودة، الطبيعية، الصحة، الطعم الأصيل، خدمة العملاء المتميزة.'
        })
      }
    } catch (error) {
      console.error('Error loading about page settings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SimpleHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل المحتوى...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SimpleHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">الصفحة غير متاحة</h1>
            <p className="text-gray-600">عذراً، صفحة "من نحن" غير متاحة حالياً.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#edd674' }}>
      <SimpleHeader />

      {/* Hero Section - Same as home page */}
      <section
        className="min-h-screen relative overflow-hidden"
        style={{
          marginTop: '-80px',
          backgroundColor: '#edd674'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-teal opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #edd674' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral opacity-20 animate-pulse hexagon-shape-delay" style={{ border: '3px solid #9a488d' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent opacity-15 animate-pulse hexagon-shape-slow" style={{ border: '2px solid #f05a3d' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent-light opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #6b6b6b' }}></div>
        </div>

        {/* Hero Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={heroLogoImage} alt="Juicetry Logo" className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl" />
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100" style={{ marginTop: '100px' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: '#166534' }}
            >
              {settings.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              {settings.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* الوصف العام */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-center text-gray-700">
              {settings.hero_description}
            </p>
          </div>
        </div>

        {/* الأقسام الرئيسية - تصميم محسن للموبايل */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {/* الرسالة */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <div className="text-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {settings.mission_title}
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-gray-600 text-center">
              {settings.mission_content}
            </p>
          </div>

          {/* الرؤية */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <div className="text-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Eye className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {settings.vision_title}
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-gray-600 text-center">
              {settings.vision_content}
            </p>
          </div>

          {/* القيم */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center md:col-span-2 lg:col-span-1">
            <div className="text-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {settings.values_title}
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-gray-600 text-center">
              {settings.values_content}
            </p>
          </div>
        </div>

        {/* دعوة للعمل - تصميم محسن للموبايل */}
        <div className="text-center">
          <div className="bg-red-500 rounded-3xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              جرب عصائرنا الطبيعية اليوم!
            </h3>
            <p className="text-xl mb-8 opacity-90">
              اكتشف الطعم الأصيل والجودة العالية في كل رشفة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              className="px-8 py-4 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#9a488d', border: '2px solid #edd674' }}
            >
                تصفح القائمة
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-red-500 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ border: '2px solid #f05a3d', color: '#f05a3d' }}
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ImprovedAboutPage
