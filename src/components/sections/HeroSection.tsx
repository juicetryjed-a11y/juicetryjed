import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HomepageDesignSettings } from '@/types'
import { supabase } from '@/lib/supabase'
import { Coffee, Star, Users, Zap } from 'lucide-react'

const HeroSection: React.FC = () => {
  const [designSettings, setDesignSettings] = useState<HomepageDesignSettings | null>(null)

  useEffect(() => {
    fetchDesignSettings()
  }, [])

  const fetchDesignSettings = async () => {
    try {
      const { data } = await supabase
        .from('homepage_design_settings')
        .select('*')
        .eq('section_name', 'hero')
        .single()

      if (data) setDesignSettings(data)
    } catch (error) {
      console.error('خطأ في جلب إعدادات التصميم:', error)
    }
  }

  // Show default content if no settings or settings not visible
  if (!designSettings || !designSettings.is_visible) {
    return (
      <section className="relative py-20 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #edd674 0%, #f5907e 50%, #f05a36 100%)'
      }}>
        {/* خلفية ديكورية */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-20 left-20 w-16 h-16 bg-juicetry-teal rounded-full blur-lg"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-juicetry-purple rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="h-16 w-16 text-juicetry-dark" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-juicetry-dark">
              أهلاً بكم في{' '}
              <span className="text-juicetry-purple">جوستري</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-juicetry-dark/80 leading-relaxed">
              استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً بأجود المكونات. 
              طعم رائع وفوائد صحية لا تُضاهى.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/menu"
                className="bg-juicetry-purple text-white px-8 py-4 rounded-xl font-semibold hover:bg-juicetry-purple/90 transition-all transform hover:scale-105 text-lg shadow-lg"
              >
                اطلب الآن
              </Link>
              
              <Link 
                to="/admin"
                className="bg-white/20 backdrop-blur-sm border-2 border-juicetry-dark text-juicetry-dark px-8 py-4 rounded-xl font-semibold hover:bg-juicetry-dark hover:text-white transition-all transform hover:scale-105 text-lg"
              >
                إدارة الموقع
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const sectionStyle = {
    backgroundColor: designSettings.background_color,
    color: designSettings.text_color,
    textAlign: designSettings.text_alignment as 'center' | 'right' | 'left',
    fontSize: designSettings.font_size === 'large' ? '1.2rem' : designSettings.font_size === 'small' ? '0.9rem' : '1rem',
    paddingTop: designSettings.padding_top === 'large' ? '6rem' : designSettings.padding_top === 'small' ? '2rem' : '4rem',
    paddingBottom: designSettings.padding_bottom === 'large' ? '6rem' : designSettings.padding_bottom === 'small' ? '2rem' : '4rem',
  }

  return (
    <section style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="h-16 w-16 text-orange-500" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            أهلاً بكم في{' '}
            <span className="text-orange-500">جوستري</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-80 leading-relaxed">
            استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً بأجود المكونات. 
            طعم رائع وفوائد صحية لا تُضاهى.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/menu"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
            >
              اطلب الآن
            </Link>
            
            <Link 
              to="/admin"
              className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-colors text-lg"
            >
              إدارة الموقع
            </Link>
          </div>
          
          {/* إحصائيات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-orange-500 mb-2">4.9</h3>
              <p className="opacity-80">تقييم العملاء</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-orange-500 mb-2">10,000+</h3>
              <p className="opacity-80">عميل سعيد</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Coffee className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold text-orange-500 mb-2">30+</h3>
              <p className="opacity-80">نوع عصير طازج</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection