import React, { useState, useEffect } from 'react'
import { Coffee, Calendar, User, Eye, Heart, MessageCircle, Search, Filter, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'
import BlogPostModal from '@/components/ui/BlogPostModal'
import { dataService } from '@/lib/dataService'
import logo2Image from '../components/logo2.png'
import heroLogoImage from './logo 0.png'

const FastBlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const openPostModal = (post: any) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const closePostModal = () => {
    setSelectedPost(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      console.log('🔄 FastBlogPage: جاري جلب المقالات من الداتابيز...')
      const { data, error } = await dataService.getBlogPosts()
      
      if (!error && data) {
        const activePosts = data.filter(post => post.is_published)
        setBlogPosts(activePosts)
        console.log('✅ FastBlogPage: تم جلب المقالات:', activePosts.length)
      }
    } catch (error) {
      console.error('❌ FastBlogPage: خطأ في جلب المقالات:', error)
    } finally {
      setLoading(false)
    }
  }

  // Static blog categories
  const categories = [
    { id: 'all', name: 'جميع المقالات', color: 'bg-gray-500', emoji: '📝' },
    { id: 'health', name: 'الصحة والتغذية', color: 'bg-green-500', emoji: '🥗' },
    { id: 'recipes', name: 'وصفات العصائر', color: 'bg-orange-500', emoji: '🍹' },
    { id: 'tips', name: 'نصائح وإرشادات', color: 'bg-blue-500', emoji: '💡' },
    { id: 'news', name: 'أخبار وتحديثات', color: 'bg-purple-500', emoji: '📰' },
  ]

  // Fallback static posts if no posts in database
  const staticPostsFallback = [
    {
      id: 1,
      title: 'فوائد العصائر الطبيعية للصحة العامة',
      excerpt: 'اكتشف كيف يمكن للعصائر الطبيعية أن تحسن من صحتك وتمدك بالفيتامينات والمعادن الأساسية...',
      content: `
        <h2>مقدمة عن العصائر الطبيعية</h2>
        <p>العصائر الطبيعية هي مصدر ممتاز للفيتامينات والمعادن الأساسية التي يحتاجها الجسم يومياً. تحتوي على مضادات الأكسدة القوية التي تساعد في محاربة الجذور الحرة وتعزز من صحة الجهاز المناعي.</p>
        
        <h3>الفوائد الصحية الرئيسية:</h3>
        <ul>
          <li><strong>تعزيز المناعة:</strong> غنية بفيتامين C والمعادن المهمة</li>
          <li><strong>تحسين الهضم:</strong> تحتوي على الألياف الطبيعية</li>
          <li><strong>ترطيب الجسم:</strong> تساعد في الحفاظ على توازن السوائل</li>
          <li><strong>مضادات الأكسدة:</strong> تحارب علامات الشيخوخة</li>
        </ul>
        
        <h3>أفضل الأوقات لتناول العصائر:</h3>
        <p>ينصح بتناول العصائر الطبيعية في الصباح الباكر على معدة فارغة للحصول على أقصى استفادة من العناصر الغذائية. كما يمكن تناولها بين الوجبات كوجبة خفيفة صحية.</p>
        
        <p>في Juicetry، نحرص على استخدام أجود أنواع الفواكه الطازجة لضمان حصولكم على أفضل جودة وطعم.</p>
      `,
      category: 'health',
      author: 'د. أحمد محمد',
      created_at: '2024-01-15',
      publishedAt: '2024-01-15',
      image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800',
      image: '🥤',
      views: 1250,
      likes: 89,
      comments: 23,
      readTime: '5 دقائق',
      featured: true,
      tags: ['صحة', 'تغذية', 'فيتامينات', 'عصائر طبيعية']
    },
    {
      id: 2,
      title: 'وصفة عصير المانجو الاستوائي المنعش',
      excerpt: 'تعلم كيفية تحضير عصير المانجو الاستوائي اللذيذ في المنزل بخطوات بسيطة ومكونات طبيعية...',
      content: `
        <h2>مقدمة عن عصير المانجو</h2>
        <p>المانجو من أكثر الفواكه الاستوائية حباً وشعبية حول العالم، وعصير المانجو الطبيعي يعتبر من أفضل المشروبات المنعشة والمغذية.</p>
        
        <h3>المكونات المطلوبة:</h3>
        <ul>
          <li><strong>2 حبة مانجو</strong> ناضجة ومقشرة</li>
          <li><strong>كوب ماء بارد</strong> أو حليب جوز الهند</li>
          <li><strong>ملعقة عسل</strong> (اختياري)</li>
          <li><strong>عصير ليمونة</strong> صغيرة</li>
          <li><strong>مكعبات ثلج</strong> حسب الرغبة</li>
        </ul>
        
        <h3>طريقة التحضير:</h3>
        <ol>
          <li>قطع المانجو إلى قطع صغيرة</li>
          <li>ضع المانجو في الخلاط مع الماء</li>
          <li>أضف العسل وعصير الليمون</li>
          <li>اخلط المكونات حتى تصبح ناعمة</li>
          <li>أضف الثلج واخلط مرة أخيرة</li>
        </ol>
        
        <h3>نصائح للحصول على أفضل طعم:</h3>
        <p>اختر المانجو الناضج تماماً للحصول على أفضل طعم وحلاوة طبيعية. يمكن إضافة النعناع الطازج لنكهة منعشة إضافية.</p>
      `,
      category: 'recipes',
      author: 'الشيف سارة',
      created_at: '2024-01-12',
      publishedAt: '2024-01-12',
      image_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800',
      image: '🥭',
      views: 980,
      likes: 67,
      comments: 15,
      readTime: '3 دقائق',
      featured: false,
      tags: ['وصفات', 'مانجو', 'عصائر', 'استوائي']
    },
    {
      id: 3,
      title: 'نصائح لاختيار أفضل الفواكه للعصائر',
      excerpt: 'دليل شامل لاختيار أفضل أنواع الفواكه لتحضير عصائر طبيعية لذيذة ومغذية...',
      content: `
        <h2>كيفية اختيار الفواكه المثالية للعصائر</h2>
        <p>اختيار الفواكه المناسبة هو أساس الحصول على عصير لذيذ ومغذي. إليك أهم النصائح من خبراء التغذية.</p>
        
        <h3>علامات النضج المثالي:</h3>
        <ul>
          <li><strong>اللون:</strong> يجب أن يكون زاهياً ومتجانساً</li>
          <li><strong>الملمس:</strong> طري قليلاً عند الضغط الخفيف</li>
          <li><strong>الرائحة:</strong> عطرة وحلوة عند الساق</li>
          <li><strong>الوزن:</strong> ثقيلة نسبياً لحجمها</li>
        </ul>
        
        <h3>أفضل الفواكه للعصائر:</h3>
        <ul>
          <li><strong>البرتقال:</strong> غني بفيتامين C</li>
          <li><strong>التفاح:</strong> مصدر ممتاز للألياف</li>
          <li><strong>الموز:</strong> يضيف كريمية طبيعية</li>
          <li><strong>الفراولة:</strong> مضادات أكسدة قوية</li>
          <li><strong>المانجو:</strong> طعم استوائي رائع</li>
        </ul>
        
        <h3>نصائح التخزين:</h3>
        <p>احفظ الفواكه في مكان بارد وجاف، واستخدمها خلال 2-3 أيام من الشراء للحصول على أفضل طعم وقيمة غذائية.</p>
        
        <p>في Juicetry، نختار فواكهنا يومياً من أفضل المصادر لضمان جودة عصائرنا.</p>
      `,
      category: 'tips',
      author: 'خبير التغذية محمد',
      created_at: '2024-01-10',
      publishedAt: '2024-01-10',
      image_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
      image: '🍓',
      views: 756,
      likes: 45,
      comments: 12,
      readTime: '4 دقائق',
      featured: false,
      tags: ['نصائح', 'فواكه', 'اختيار', 'جودة']
    },
    {
      id: 4,
      title: 'العصائر الخضراء: فوائد لا تُحصى',
      excerpt: 'تعرف على الفوائد المذهلة للعصائر الخضراء وكيف يمكنها أن تغير حياتك الصحية للأفضل...',
      content: 'محتوى المقال الكامل هنا...',
      category: 'health',
      author: 'د. فاطمة علي',
      publishedAt: '2024-01-08',
      image: '🥬',
      views: 1100,
      likes: 78,
      comments: 19,
      readTime: '6 دقائق',
      featured: true
    },
    {
      id: 5,
      title: 'جديد في عالم Juicetry: منتجات جديدة',
      excerpt: 'اكتشف أحدث إضافاتنا من العصائر الطبيعية والمشروبات الصحية التي ستحبها بالتأكيد...',
      content: 'محتوى المقال الكامل هنا...',
      category: 'news',
      author: 'فريق Juicetry',
      publishedAt: '2024-01-05',
      image: '🆕',
      views: 890,
      likes: 56,
      comments: 8,
      readTime: '2 دقائق',
      featured: false
    },
    {
      id: 6,
      title: 'كيفية تحضير سموثي البروتين الطبيعي',
      excerpt: 'وصفة مثالية لسموثي البروتين الطبيعي للرياضيين ومحبي اللياقة البدنية...',
      content: 'محتوى المقال الكامل هنا...',
      category: 'recipes',
      author: 'مدرب اللياقة أحمد',
      publishedAt: '2024-01-03',
      image: '💪',
      views: 1350,
      likes: 95,
      comments: 27,
      readTime: '4 دقائق',
      featured: true
    }
  ]

  // Use database posts or fallback to static
  const displayPosts = blogPosts.length > 0 ? blogPosts : staticPostsFallback

  // Filter posts
  const filteredPosts = displayPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = displayPosts.filter(post => post.is_featured || post.featured)

  if (loading) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#edd674' }}>
      <SimpleHeader />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المقالات...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#edd674' }}>
      <SimpleHeader />

      {/* Hero Section - Same as home page */}
      <section
        className="min-h-screen relative overflow-hidden"
        style={{
          marginTop: '-80px',
          backgroundColor: '#edd674'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-teal opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #edd674' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral opacity-20 animate-pulse hexagon-shape-delay" style={{ border: '3px solid #9a488d' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent opacity-15 animate-pulse hexagon-shape-slow" style={{ border: '2px solid #f05a3d' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent-light opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #6b6b6b' }}></div>
        </div>

        {/* Hero Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={heroLogoImage} alt="Juicetry Logo" className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl" />
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100" style={{ marginTop: '100px' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: '#166534' }}
            >
              مقالات Juicetry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              اكتشف عالم العصائر الطبيعية من خلال مقالاتنا المفيدة والممتعة
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">المقالات المميزة</h2>
          {featuredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-600">لا توجد مقالات مميزة حالياً</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
                  <div className="text-6xl">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      مميز
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </span>
                    </div>
                    <span>{new Date(post.publishedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <button 
                    onClick={() => openPostModal(post)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
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
                placeholder="ابحث في المقالات..."
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
                  <span className="text-lg">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                {/* Post Image */}
                <div className="h-40 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
                  <div className="text-5xl">{post.image}</div>
                </div>

                {/* Post Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      categories.find(cat => cat.id === post.category)?.color || 'bg-gray-500'
                    } text-white`}>
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Author and Date */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('ar-SA')}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>

                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-sm w-full justify-center"
                  >
                    اقرأ المقال
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-600">جرب البحث بكلمات أخرى أو اختر تصنيف مختلف</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            اشترك في نشرتنا الإخبارية
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            احصل على أحدث المقالات والنصائح الصحية مباشرة في بريدك الإلكتروني
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              اشترك
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Blog Post Modal */}
      <BlogPostModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closePostModal}
      />
    </div>
  )
}

export default FastBlogPage
