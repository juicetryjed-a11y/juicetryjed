import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Leaf, Star, ArrowLeft } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useHomePageSettings } from '@/hooks/useHomePageSettings'

const FastHero: React.FC = () => {
  const { settings } = useSiteSettings()
  const { settings: homeSettings, loading } = useHomePageSettings()
  const primaryColor = settings?.primary_color || '#22c55e'
  const secondaryColor = settings?.secondary_color || '#84cc16'
  const accentColor = settings?.accent_color || '#eab308'
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>
  }
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8">
          {homeSettings?.logo_url ? (
            <img 
              src={homeSettings.logo_url} 
              alt="Logo" 
              style={{
                width: `${homeSettings.logo_width || 120}px`,
                height: `${homeSettings.logo_height || 120}px`
              }}
              className="mx-auto mb-4 object-contain"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <div className="flex items-center gap-1">
                <Coffee className="h-8 w-8 text-white" />
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
          <h1 
            className="font-bold mb-4"
            style={{
              fontSize: `${homeSettings?.hero_title_font_size || 48}px`,
              fontWeight: homeSettings?.hero_title_font_weight || 700,
              color: homeSettings?.hero_title_color || '#166534'
            }}
          >
            {homeSettings?.hero_title || 'Juicetry - جوستري'}
          </h1>
          <p 
            className="font-medium"
            style={{
              fontSize: `${homeSettings?.hero_subtitle_font_size || 24}px`,
              fontWeight: homeSettings?.hero_subtitle_font_weight || 500,
              color: homeSettings?.hero_subtitle_color || '#059669'
            }}
          >
            {homeSettings?.hero_subtitle || 'محل العصائر الطبيعية الطازجة'}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-12">
          {homeSettings?.hero_description && (
            <p 
              className="mb-8 leading-relaxed"
              style={{
                fontSize: `${homeSettings?.hero_description_font_size || 18}px`,
                color: homeSettings?.hero_description_color || '#374151'
              }}
            >
              {homeSettings.hero_description}
            </p>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">100% طبيعي</h4>
              <p className="text-gray-600">بدون إضافات صناعية أو مواد حافظة</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">طازج يومياً</h4>
              <p className="text-gray-600">نحضر عصائرنا طازجة كل يوم</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">جودة عالية</h4>
              <p className="text-gray-600">أفضل الفواكه والخضروات المختارة</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={homeSettings?.hero_cta_link || '/menu'}
              className="px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: homeSettings?.cta_button_bg_color || '#22c55e',
                color: homeSettings?.cta_button_text_color || '#ffffff',
                fontSize: `${homeSettings?.cta_button_font_size || 18}px`
              }}
            >
              <Coffee className="h-5 w-5" />
              {homeSettings?.hero_cta_text || 'اطلب الآن'}
            </Link>
            
            <Link 
              to="/menu"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 flex items-center justify-center gap-2"
            >
              تصفح المنيو
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        {homeSettings?.show_stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div 
                className="font-bold mb-1" 
                style={{ 
                  fontSize: `${homeSettings?.stats_number_font_size || 36}px`,
                  color: homeSettings?.stats_number_color || primaryColor 
                }}
              >
                {homeSettings?.stat_1_number || '500+'}
              </div>
              <div 
                className="text-sm"
                style={{ color: homeSettings?.stats_label_color || '#6b7280' }}
              >
                {homeSettings?.stat_1_label || 'عميل سعيد'}
              </div>
            </div>
            <div className="text-center">
              <div 
                className="font-bold mb-1" 
                style={{ 
                  fontSize: `${homeSettings?.stats_number_font_size || 36}px`,
                  color: homeSettings?.stats_number_color || secondaryColor 
                }}
              >
                {homeSettings?.stat_2_number || '25+'}
              </div>
              <div 
                className="text-sm"
                style={{ color: homeSettings?.stats_label_color || '#6b7280' }}
              >
                {homeSettings?.stat_2_label || 'نوع عصير'}
              </div>
            </div>
            <div className="text-center">
              <div 
                className="font-bold mb-1" 
                style={{ 
                  fontSize: `${homeSettings?.stats_number_font_size || 36}px`,
                  color: homeSettings?.stats_number_color || accentColor 
                }}
              >
                {homeSettings?.stat_3_number || '100%'}
              </div>
              <div 
                className="text-sm"
                style={{ color: homeSettings?.stats_label_color || '#6b7280' }}
              >
                {homeSettings?.stat_3_label || 'طبيعي'}
              </div>
            </div>
            <div className="text-center">
              <div 
                className="font-bold mb-1" 
                style={{ 
                  fontSize: `${homeSettings?.stats_number_font_size || 36}px`,
                  color: homeSettings?.stats_number_color || primaryColor 
                }}
              >
                {homeSettings?.stat_4_number || '24/7'}
              </div>
              <div 
                className="text-sm"
                style={{ color: homeSettings?.stats_label_color || '#6b7280' }}
              >
                {homeSettings?.stat_4_label || 'خدمة'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FastHero
