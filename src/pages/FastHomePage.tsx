import React from 'react'
import { Coffee, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'
import FastProducts from '@/components/sections/FastProducts'
import FastHero from '@/components/sections/FastHero'

const FastHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-teal-50">
      <SimpleHeader />

      {/* Hero Section */}
      <FastHero />

      {/* Content Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100" style={{ marginTop: '100px' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: '#166534' }}
            >
              Juicetry - جوستري
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              محل العصائر الطبيعية الطازجة
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/menu"
              className="px-8 py-4 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#91719b', border: '2px solid #6b6b6b' }}
            >
              <Coffee className="h-5 w-5" />
              اطلب الآن
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ border: '2px solid #f05a3d' }}
            >
              تعرف علينا
            </Link>
          </div>
        </div>
      </section>

      <FastProducts />

      <Footer />
    </div>
  )
}

export default FastHomePage
