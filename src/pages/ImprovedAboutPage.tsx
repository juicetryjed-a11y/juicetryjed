import React, { useEffect, useState } from 'react'
import { MapPin, Heart, Eye, Award, ArrowRight } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'

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
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />
      
      {/* Hero Section - نفس تصميم باقي الصفحات */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
              {settings.hero_title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium mb-6 md:mb-8 opacity-90 text-green-100">
              {settings.hero_subtitle}
            </p>
            <div className="w-16 md:w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* الوصف العام */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-gray-100">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-center text-gray-700">
              {settings.hero_description}
            </p>
          </div>
        </div>

        {/* الأقسام الرئيسية - تصميم محسن للموبايل */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {/* الرسالة */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
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
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 lg:p-12 border border-green-100 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              جرب عصائرنا الطبيعية اليوم!
            </h3>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-600">
              اكتشف الطعم الأصيل والجودة العالية في كل رشفة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                تصفح القائمة
                <ArrowRight className="mr-2 h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-green-600 hover:text-white transition-all duration-300"
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
