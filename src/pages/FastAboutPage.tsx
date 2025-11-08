import React from 'react'
import { Coffee, Leaf, Star, Heart, Award, Users, Target, Eye } from 'lucide-react'
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
            <Link to="/about" className="text-green-600 font-bold">من نحن</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">تواصل معنا</Link>
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

const FastAboutPage: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: 'طبيعي 100%',
      description: 'نستخدم فقط الفواكه والخضروات الطبيعية الطازجة بدون أي إضافات صناعية أو مواد حافظة'
    },
    {
      icon: Award,
      title: 'جودة عالية',
      description: 'نختار أفضل المنتجات من مصادر موثوقة ونحرص على أعلى معايير الجودة في التحضير'
    },
    {
      icon: Heart,
      title: 'صحة وعافية',
      description: 'نهدف لتقديم مشروبات صحية تساهم في تحسين صحتك ونشاطك اليومي'
    },
    {
      icon: Users,
      title: 'خدمة مميزة',
      description: 'فريقنا المدرب يقدم أفضل خدمة عملاء ويساعدك في اختيار المشروب المناسب'
    }
  ]

  const team = [
    {
      name: 'أحمد محمد',
      role: 'المؤسس والمدير العام',
      image: '👨‍💼',
      description: 'خبرة 10 سنوات في صناعة المشروبات الطبيعية'
    },
    {
      name: 'فاطمة علي',
      role: 'خبيرة التغذية',
      image: '👩‍⚕️',
      description: 'متخصصة في التغذية الصحية والمشروبات الطبيعية'
    },
    {
      name: 'محمد السعيد',
      role: 'رئيس الطهاة',
      image: '👨‍🍳',
      description: 'خبير في تحضير العصائر والسموثي الطبيعي'
    },
    {
      name: 'نورا أحمد',
      role: 'مديرة خدمة العملاء',
      image: '👩‍💼',
      description: 'متخصصة في تقديم أفضل تجربة عملاء'
    }
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
              <div className="flex items-center gap-1">
                <Coffee className="h-8 w-8 text-white" />
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent mb-4">
              من نحن
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              قصة Juicetry - جوستري، حيث بدأت رحلتنا نحو تقديم أفضل العصائر الطبيعية
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                🌱 قصتنا
              </h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  بدأت قصة <strong className="text-green-600">Juicetry - جوستري</strong> من حلم بسيط: تقديم عصائر طبيعية طازجة وصحية لكل من يبحث عن الطعم الأصيل والفوائد الغذائية الحقيقية.
                </p>
                <p>
                  في عام 2020، قررنا تحويل هذا الحلم إلى واقع. بدأنا بمتجر صغير في قلب الرياض، وبفضل شغفنا بالجودة والطبيعة، نمت علامتنا التجارية لتصبح وجهة مفضلة لمحبي العصائر الطبيعية.
                </p>
                <p>
                  اليوم، نفخر بتقديم أكثر من <strong className="text-green-600">25 نوع</strong> من العصائر الطبيعية، ونخدم أكثر من <strong className="text-green-600">500 عميل</strong> سعيد يومياً، ونواصل رحلتنا نحو التميز والابتكار.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">رسالتنا</h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                تقديم عصائر طبيعية طازجة وصحية من أجود الفواكه والخضروات، مع الحرص على أعلى معايير الجودة والنظافة، لنساهم في تحسين صحة وعافية عملائنا الكرام.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">رؤيتنا</h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة العربية السعودية، ونشر ثقافة الأكل الصحي والمشروبات الطبيعية في مجتمعنا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              قيمنا ومبادئنا
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نؤمن بمجموعة من القيم التي توجه عملنا وتضمن تقديم أفضل خدمة لعملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              فريق العمل
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تعرف على الفريق المتميز الذي يعمل بشغف لتقديم أفضل تجربة لك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              إنجازاتنا بالأرقام
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-lime-600 mb-2">25+</div>
              <div className="text-gray-700 font-medium">نوع عصير</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">طبيعي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">4</div>
              <div className="text-gray-700 font-medium">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-green-500 to-lime-500 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              انضم إلى عائلة Juicetry
            </h2>
            <p className="text-xl mb-8 opacity-90">
              اكتشف طعم الطبيعة الحقيقي واستمتع بتجربة فريدة من العصائر الطبيعية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/menu"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                تصفح المنيو
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
              >
                تواصل معنا
              </Link>
            </div>
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

export default FastAboutPage
