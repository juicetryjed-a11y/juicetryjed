import React, { useState, useEffect, useMemo } from 'react'
import { Coffee, Leaf, Star, Plus, Filter, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dataService } from '@/lib/dataService'
import { Product, Category } from '@/types'
import SEO from '@/components/SEO'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'
import menuImage from '@/components/sections/منيو.png'
import heroLogoImage from './logo 0.png'

const FastMenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const menuStructuredData = useMemo(() => {
    const sections = categories.map(category => ({
      '@type': 'MenuSection',
      name: category.name,
      hasMenuItem: products
        .filter(product => product.category_id === category.id)
        .slice(0, 10)
        .map(product => ({
          '@type': 'MenuItem',
          name: product.name,
          description: product.description,
          offers: product.price ? {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'SAR',
            availability: 'https://schema.org/InStock'
          } : undefined
        }))
    }))

    return {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'منيو Juicetry',
      description: 'قائمة Juicetry الكاملة للعصائر الطبيعية الطازجة في السعودية',
      url: 'https://juicetry.com/menu',
      hasMenuSection: sections
    }
  }, [categories, products])

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
    <div className="min-h-screen" style={{ backgroundColor: '#edd674' }}>
      <SEO
        title="منيو Juicetry - جوستري | عصائر طبيعية طازجة"
        description="تصفح منيو Juicetry الكامل واختر من بين مجموعة واسعة من العصائر الطبيعية الطازجة المحضرة من أجود الفواكه والخضروات. عصائر صحية ولذيذة بأسعار مناسبة"
        keywords="منيو عصائر, قائمة عصائر, أسعار عصائر, عصائر جوستري, Juicetry menu, عصير برتقال, عصير تفاح, عصير فراولة, عصير مانجو"
        type="website"
        url="https://juicetry.com/menu"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }}
      />

      {/* Global Header */}
      <SimpleHeader />

      {/* Hero Section - Hidden on mobile */}
      <section
        className="hidden sm:block min-h-screen relative overflow-hidden"
        style={{
          marginTop: '0px',
          backgroundColor: '#edd674'
        }}
      >
        {/* Decorative elements - positioned behind the logo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-teal opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #edd674' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral opacity-20 animate-pulse hexagon-shape-delay" style={{ border: '3px solid #9a488d' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent opacity-15 animate-pulse hexagon-shape-slow" style={{ border: '2px solid #f05a3d' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent-light opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #6b6b6b' }}></div>
        </div>

        {/* Hero Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={heroLogoImage} alt="Juicetry Logo" className="h-32 md:h-40 w-auto object-contain drop-shadow-xl" />
        </div>
      </section>

      {/* Menu Image Section - Only on desktop, under hero */}
      <section className="py-6 bg-[#edd674] -mt-1 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img src={menuImage} alt="منيو Juicetry" className="max-w-full h-auto mx-auto" />
          </div>
        </div>
      </section>

      {/* Menu Image Section - Acts as hero on mobile, hidden on desktop */}
      <section className="flex items-center justify-center min-h-screen md:min-h-0 -mt-1 py-0 md:py-6 relative overflow-hidden md:hidden" style={{ backgroundColor: '#edd674' }}>
        {/* Decorative elements - positioned behind the menu image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-teal opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #edd674' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral opacity-20 animate-pulse hexagon-shape-delay" style={{ border: '3px solid #9a488d' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent opacity-15 animate-pulse hexagon-shape-slow" style={{ border: '2px solid #f05a3d' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent-light opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #6b6b6b' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Logo Image - Above menu image on mobile */}
            <img src="final-logo-03.png" alt="Juicetry Logo" className="h-24 md:h-28 w-auto object-contain drop-shadow-xl" />

            {/* Menu Image - Below logo on mobile */}
            <img src={menuImage} alt="منيو Juicetry" className="max-w-full h-auto mx-auto" />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-6 md:pb-8 pt-2 md:pt-4">
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
                className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === null
                    ? 'text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                  style={{ backgroundColor: selectedCategory === null ? '#91719b' : undefined }}
              >
                <span className="text-lg">🍹</span>
                جميع المنتجات
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
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
      <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-3 sm:px-6">
          {loading ? (
            <div className="text-center py-8 md:py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-secondary"></div>
              <p className="mt-4 text-gray-600 text-sm md:text-base">جاري تحميل المنتجات...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="text-5xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-600 text-sm md:text-base">جرب البحث بكلمات أخرى أو اختر تصنيف مختلف</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden flex flex-col">
                  {/* Product Image - حجم ثابت ومتناسق */}
                  <div className="relative w-full h-36 sm:h-44 md:h-48 bg-gradient-to-br from-secondary-50 to-accent-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
                        }}
                      />
                    ) : (
                      <div className="text-3xl sm:text-4xl md:text-5xl">🍹</div>
                    )}
                  </div>

                  {/* Product Info - محسّن للموبايل */}
                  <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-1 sm:mb-2">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 line-clamp-1 flex-1">{product.name}</h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-700">4.8</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs mb-2 line-clamp-2 hidden sm:block flex-grow">{product.description}</p>

                    {/* السعر - مركزي في الموبايل */}
                    <div className="flex items-center justify-center gap-1 mt-auto">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{product.price}</span>
                      <span className="text-gray-600 text-xs">ريال</span>
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
              className="px-8 py-4 text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#edd674', border: '2px solid #9a488d' }}
            >
              تواصل معنا
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ border: '2px solid #91719b' }}
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}

export default FastMenuPage
