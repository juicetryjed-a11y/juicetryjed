import React, { useState } from 'react'
import { Coffee, Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

// Simple Header Component
const SimpleHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <Coffee className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Juicetry</h1>
              <p className="text-sm text-gray-600">جوستري</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">الرئيسية</Link>
            <Link to="/menu" className="text-gray-700 hover:text-green-600 font-medium transition-colors">المنيو</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">من نحن</Link>
            <Link to="/contact" className="text-green-600 font-bold">تواصل معنا</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin/login"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              الإدارة
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

const FastContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      details: '+966 50 123 4567',
      description: 'اتصل بنا في أي وقت'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: 'info@juicetry.com',
      description: 'راسلنا وسنرد عليك خلال 24 ساعة'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: 'الرياض، المملكة العربية السعودية',
      description: 'زورنا في متجرنا الرئيسي'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: 'يومياً من 8 صباحاً - 11 مساءً',
      description: 'عدا يوم الجمعة من 2 ظهراً'
    }
  ]

  const workingHours = [
    { day: 'السبت - الخميس', hours: '8:00 ص - 11:00 م' },
    { day: 'الجمعة', hours: '2:00 ظ - 11:00 م' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      <SimpleHeader />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent mb-4">
              تواصل معنا
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في اختيار أفضل العصائر
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-green-600 font-semibold mb-2">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                أرسل لنا رسالة
              </h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">تم إرسال الرسالة!</h3>
                  <p className="text-gray-600 mb-6">شكراً لتواصلك معنا. سنرد عليك خلال 24 ساعة.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الموضوع
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="استفسار عام">استفسار عام</option>
                      <option value="طلب خاص">طلب خاص</option>
                      <option value="شكوى">شكوى</option>
                      <option value="اقتراح">اقتراح</option>
                      <option value="طلب توظيف">طلب توظيف</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Working Hours */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-green-600" />
                  ساعات العمل
                </h3>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="font-semibold text-gray-700">{schedule.day}</span>
                      <span className="text-green-600 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-green-500 to-lime-500 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">تواصل سريع</h3>
                <p className="mb-6 opacity-90">
                  هل تحتاج مساعدة فورية؟ اتصل بنا أو راسلنا على واتساب
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+966501234567"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all"
                  >
                    <Phone className="h-5 w-5" />
                    اتصل الآن
                  </a>
                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all"
                  >
                    💬 واتساب
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">الأسئلة الشائعة</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">هل تقدمون خدمة التوصيل؟</h4>
                    <p className="text-gray-600 text-sm">نعم، نقدم خدمة التوصيل داخل الرياض خلال 30 دقيقة.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">هل العصائر طبيعية 100%؟</h4>
                    <p className="text-gray-600 text-sm">نعم، جميع عصائرنا طبيعية بدون إضافات صناعية أو مواد حافظة.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">كيف يمكنني الطلب؟</h4>
                    <p className="text-gray-600 text-sm">يمكنك الطلب عبر الهاتف أو واتساب أو زيارة متجرنا مباشرة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">موقعنا</h2>
            <p className="text-xl text-gray-600">زورنا في متجرنا الرئيسي في الرياض</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Juicetry - جوستري</h3>
                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                <p className="text-sm text-gray-500 mt-2">خريطة تفاعلية قريباً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            جرب عصائرنا اليوم!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            اطلب الآن واستمتع بطعم الطبيعة الحقيقي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              تصفح المنيو
            </Link>
            <Link 
              to="/"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Juicetry - جوستري</h3>
                  <p className="text-gray-400">محل العصائر الطبيعية</p>
                </div>
              </Link>
              <p className="text-gray-400">
                نقدم أفضل العصائر الطبيعية الطازجة المحضرة من أجود الفواكه والخضروات.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">المنيو</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">من نحن</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">تواصل معنا</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +966501234567</p>
                <p>📧 info@juicetry.com</p>
                <p>📍 الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Juicetry - جوستري. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FastContactPage
