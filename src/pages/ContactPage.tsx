import React, { useEffect, useState } from 'react'
import { dataService } from '@/lib/dataService'
import NewHeader from '@/components/layout/NewHeader'
import Footer from '@/components/layout/Footer'
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react'

interface ContactSettings {
  title: string
  description: string
  form_title: string
  form_background_color: string
  form_text_color: string
  form_font_family: string
  form_font_size: string
  button_color: string
  button_text_color: string
}

const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<ContactSettings | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchContactSettings()
  }, [])

  const fetchContactSettings = async () => {
    try {
      // استخدام إعدادات افتراضية للبيانات التجريبية
      setSettings({
        title: 'تواصل معنا',
        description: 'نحن هنا لمساعدتك. أرسل لنا رسالتك وسنرد عليك في أقرب وقت ممكن.',
        form_title: 'أرسل لنا رسالة',
        form_background_color: '#ffffff',
        form_text_color: '#291719',
        form_font_family: 'inherit',
        form_font_size: '16px',
        button_color: '#22c55e',
        button_text_color: '#ffffff',
      })
    } catch (error) {
      console.error('خطأ في جلب إعدادات صفحة التواصل:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // محاكاة إرسال الرسالة للبيانات التجريبية
      console.log('📧 Mock: Contact message sent:', formData)
      
      // محاكاة تأخير الإرسال
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitted(true)
      setFormData({ name: '', phone: '', message: '' })
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error)
      alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!settings) {
    return (
      <div className="min-h-screen">
        <NewHeader />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-juicetry-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  const formStyle = {
    backgroundColor: settings.form_background_color,
    color: settings.form_text_color,
    fontFamily: settings.form_font_family,
    fontSize: settings.form_font_size,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-juicetry-primary/10 to-white">
      <NewHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-juicetry-dark mb-4">
            {settings.title}
          </h1>
          <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
            {settings.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* معلومات التواصل */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-juicetry-dark mb-6">معلومات التواصل</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-juicetry-primary rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-juicetry-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-juicetry-dark">الهاتف</h4>
                    <p className="text-juicetry-gray">+966 50 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-juicetry-primary rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-juicetry-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-juicetry-dark">البريد الإلكتروني</h4>
                    <p className="text-juicetry-gray">info@juicetry.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-juicetry-primary rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-juicetry-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-juicetry-dark">العنوان</h4>
                    <p className="text-juicetry-gray">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج التواصل */}
          <div 
            className="bg-white rounded-2xl shadow-lg p-8"
            style={formStyle}
          >
            <h3 className="text-2xl font-bold mb-6">{settings.form_title}</h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                تم إرسال رسالتك بنجاح! سنرد عليك قريباً.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-juicetry-primary/30 rounded-xl focus:ring-2 focus:ring-juicetry-primary focus:border-juicetry-primary outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-juicetry-primary/30 rounded-xl focus:ring-2 focus:ring-juicetry-primary focus:border-juicetry-primary outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">الرسالة</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-juicetry-primary/30 rounded-xl focus:ring-2 focus:ring-juicetry-primary focus:border-juicetry-primary outline-none transition-all resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                style={{
                  backgroundColor: settings.button_color,
                  color: settings.button_text_color,
                }}
              >
                <Send className="h-5 w-5" />
                {submitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default ContactPage
