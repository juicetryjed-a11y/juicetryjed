import React from 'react'
import { Link } from 'react-router-dom'
import SimpleHeader from '@/components/layout/SimpleHeader'
import FastHero from '@/components/sections/FastHero'
import FastProducts from '@/components/sections/FastProducts'

// Simple Footer Component
const SimpleFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Juicetry - جوستري</h3>
                <p className="text-gray-400">محل العصائر الطبيعية</p>
              </div>
            </div>
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
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">المقالات</Link></li>
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
  )
}

const FastHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader />
      <main className="pt-20">
        <FastHero />
        <FastProducts />
      </main>
      <SimpleFooter />
    </div>
  )
}

export default FastHomePage
