import React, { useEffect, useState } from 'react'
import { MapPin, Heart, Eye, Award, ArrowRight } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import NewHeader from '@/components/layout/NewHeader'
import Footer from '@/components/layout/Footer'

interface AboutPageSettings {
  id?: number
  title: string
  subtitle: string
  description: string
  mission_title: string
  mission_text: string
  vision_title: string
  vision_text: string
  values_title: string
  values_text: string
  location_name: string
  location_address: string
  location_url: string
  background_color: string
  text_color: string
  accent_color: string
  title_color: string
  is_active: boolean
}

const NewAboutPage: React.FC = () => {
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
          title: 'من نحن',
          subtitle: 'قصة Juicetry - جوستري',
          description: 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
          mission_title: 'رسالتنا',
          mission_text: 'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف، لنساهم في تحسين صحة عملائنا وتقديم تجربة منعشة ولذيذة.',
          vision_title: 'رؤيتنا',
          vision_text: 'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة، ونشر ثقافة الغذاء الصحي والطبيعي.',
          values_title: 'قيمنا',
          values_text: 'الجودة، الطبيعية، الصحة، الطعم الأصيل، خدمة العملاء المتميزة، والالتزام بأعلى معايير النظافة والسلامة.',
          location_name: 'موقع المحل',
          location_address: 'الرياض، المملكة العربية السعودية',
          location_url: 'https://maps.google.com',
          background_color: '#f8fafc',
          text_color: '#374151',
          accent_color: '#22c55e',
          title_color: '#1f2937',
          is_active: true
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
        <NewHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل المحتوى...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!settings || !settings.is_active) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NewHeader />
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
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: settings.title_color === '#1f2937' ? 'white' : settings.title_color }}
            >
              {settings.title}
            </h1>
            <p 
              className="text-xl md:text-2xl font-medium mb-8 opacity-90"
              style={{ color: settings.accent_color === '#22c55e' ? '#a7f3d0' : settings.accent_color }}
            >
              {settings.subtitle}
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16" style={{ color: settings.text_color }}>
        {/* الوصف العام */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700">
              {settings.description}
            </p>
          </div>
        </div>

        {/* الأقسام الرئيسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* الرسالة */}
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: settings.accent_color }}
              >
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: settings.title_color }}
              >
                {settings.mission_title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed">
              {settings.mission_text}
            </p>
          </div>

          {/* الرؤية */}
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: settings.accent_color }}
              >
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: settings.title_color }}
              >
                {settings.vision_title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed">
              {settings.vision_text}
            </p>
          </div>

          {/* القيم */}
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: settings.accent_color }}
              >
                <Award className="h-8 w-8 text-white" />
              </div>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: settings.title_color }}
              >
                {settings.values_title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed">
              {settings.values_text}
            </p>
          </div>
        </div>

        {/* موقع المحل */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: settings.accent_color }}
              >
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: settings.title_color }}
              >
                {settings.location_name}
              </h2>
              <p className="text-xl mb-6">
                {settings.location_address}
              </p>
              
              {settings.location_url && settings.location_url !== 'https://maps.google.com' && (
                <a
                  href={settings.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: settings.accent_color }}
                >
                  <MapPin className="h-6 w-6" />
                  عرض الموقع على الخريطة
                </a>
              )}
            </div>

            {/* خريطة تفاعلية (إذا كان الرابط متاح) */}
            {settings.location_url && settings.location_url !== 'https://maps.google.com' && (
              <div className="mt-8">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={settings.location_url.replace('/maps/', '/maps/embed?pb=')}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع المحل"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className="text-center mt-16">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: settings.title_color }}
            >
              جرب عصائرنا الطبيعية اليوم!
            </h3>
            <p className="text-lg mb-6">
              اكتشف الطعم الأصيل والجودة العالية في كل رشفة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: settings.accent_color }}
              >
                تصفح القائمة
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg border-2 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                style={{ 
                  borderColor: settings.accent_color,
                  color: settings.accent_color
                }}
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

export default NewAboutPage
