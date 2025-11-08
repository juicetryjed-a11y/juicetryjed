import React, { useEffect, useState } from 'react'
import { HomepageDesignSettings } from '@/types'
import { supabase } from '@/lib/supabase'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

const ContactSection: React.FC = () => {
  const [designSettings, setDesignSettings] = useState<HomepageDesignSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDesignSettings()
  }, [])

  const fetchDesignSettings = async () => {
    try {
      const { data } = await supabase
        .from('homepage_design_settings')
        .select('*')
        .eq('section_name', 'contact')
        .single()

      if (data) setDesignSettings(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب إعدادات التصميم:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  // Show default content if no settings or settings not visible
  if (!designSettings || !designSettings.is_visible) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">تواصل معنا</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نحن هنا لخدمتك. تواصل معنا للاستفسارات أو الطلبات أو أي مساعدة تحتاجها
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">معلومات التواصل</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">هاتف</h4>
                    <p className="text-gray-600">+966 50 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">البريد الإلكتروني</h4>
                    <p className="text-gray-600">info@joustry.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">العنوان</h4>
                    <p className="text-gray-600">حي النخيل، الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ساعات العمل</h4>
                    <p className="text-gray-600">السبت - الخميس: 8:00 ص - 11:00 م</p>
                    <p className="text-gray-600">الجمعة: 2:00 م - 11:00 م</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">أرسل لنا رسالة</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الهاتف</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      placeholder="رقم الهاتف"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="بريدك الإلكتروني"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  إرسال الرسالة
                </button>
              </form>
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            نحن هنا لخدمتك. تواصل معنا للاستفسارات أو الطلبات أو أي مساعدة تحتاجها
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* معلومات التواصل */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
            
            <div className="space-y-6">
              {/* الهاتف */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">هاتف</h4>
                  <p className="text-gray-600">+966 50 123 4567</p>
                </div>
              </div>
              
              {/* البريد الإلكتروني */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">البريد الإلكتروني</h4>
                  <p className="text-gray-600">info@joustry.com</p>
                </div>
              </div>
              
              {/* العنوان */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">العنوان</h4>
                  <p className="text-gray-600">حي النخيل، الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
              
              {/* ساعات العمل */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">ساعات العمل</h4>
                  <p className="text-gray-600">السبت - الخميس: 8:00 ص - 11:00 م</p>
                  <p className="text-gray-600">الجمعة: 2:00 م - 11:00 م</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* نموذج التواصل */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">أرسل لنا رسالة</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="اسمك الكامل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الهاتف</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="رقم الهاتف"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="بريدك الإلكتروني"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection