import React, { useState, useEffect } from 'react'
import { Coffee, Leaf, Star, Plus, Filter, Search, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dataService } from '@/lib/dataService'
import { Product, Category } from '@/types'

// Simple Header Component
const SimpleHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <Link to="/menu" className="text-green-600 font-bold">المنيو</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">من نحن</Link>
            <Link to="/blog" className="text-gray-700 hover:text-green-600 font-medium transition-colors">المقالات</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">تواصل معنا</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/admin/login"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              الإدارة
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - المنيو والمقالات ومن نحن واتصل بنا */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/menu" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-green-600 bg-green-50"
              >
                المنيو
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                المقالات
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                من نحن
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                اتصل بنا
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

const FastMenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log('🔄 FastMenuPage: جاري جلب البيانات من الداتابيز...')
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await dataService.getCategories()
      if (!categoriesError && categoriesData) {
        const activeCategories = categoriesData.filter(cat => cat.is_active)
        setCategories(activeCategories)
        console.log('✅ FastMenuPage: تم جلب التصنيفات:', activeCategories.length)
      }

      // Fetch products
      const { data: productsData, error: productsError } = await dataService.getProducts()
      if (!productsError && productsData) {
        const activeProducts = productsData.filter(p => p.is_active)
        setProducts(activeProducts)
        console.log('✅ FastMenuPage: تم جلب المنتجات:', activeProducts.length)
      }
    } catch (error) {
      console.error('❌ FastMenuPage: خطأ في جلب البيانات:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === null || product.category_id === selectedCategory
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      <SimpleHeader />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent mb-4">
              منيو Juicetry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              اكتشف مجموعتنا الواسعة من العصائر الطبيعية الطازجة
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن عصيرك المفضل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">التصنيفات:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* زر الكل */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <span className="text-lg">🍹</span>
                جميع المنتجات
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-600">جرب البحث بكلمات أخرى أو اختر تصنيف مختلف</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden flex flex-col">
                  {/* Product Image - حجم ثابت ومتناسق */}
                  <div className="relative w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="text-4xl sm:text-5xl">🍹</div>
                    )}
                  </div>

                  {/* Product Info - محسّن للموبايل */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-1 flex-1">{product.name}</h3>
                      <div className="flex items-center gap-0.5 sm:gap-1 ml-1 flex-shrink-0">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">4.8</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 hidden sm:block flex-grow">{product.description}</p>

                    {/* السعر - مركزي في الموبايل */}
                    <div className="flex items-center justify-center sm:justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-xl sm:text-2xl font-bold text-green-600">{product.price}</span>
                        <span className="text-gray-600 text-sm">ريال</span>
                      </div>

                      {/* زر الإضافة - مخفي في الموبايل */}
                      <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-sm">
                        <Plus className="h-4 w-4" />
                        إضافة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            تواصل معنا وسنساعدك في اختيار العصير المثالي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              تواصل معنا
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

export default FastMenuPage
