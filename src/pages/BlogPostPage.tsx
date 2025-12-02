import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag, Eye, Heart, MessageCircle } from 'lucide-react'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  publishedAt: string
  category: string
  image_url?: string
  image: string
  views: number
  likes: number
  comments: number
  readTime: string
  tags?: string[]
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  // Static blog posts (same as in FastBlogPage)
  const staticPosts: BlogPost[] = [
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
      tags: ['صحة', 'تغذية', 'فيتامينات', 'عصائر طبيعية']
    },
    // Add other posts here...
  ]

  useEffect(() => {
    const loadPost = () => {
      setLoading(true)
      
      // Load from localStorage first
      const storedPosts = localStorage.getItem('blog_posts')
      let dynamicPosts = []
      if (storedPosts) {
        try {
          dynamicPosts = JSON.parse(storedPosts)
        } catch (e) {
          console.error('Error parsing stored posts:', e)
        }
      }

      // Combine dynamic and static posts
      const allPosts = [...dynamicPosts, ...staticPosts]
      const foundPost = allPosts.find(p => p.id === parseInt(id || '0'))
      
      setPost(foundPost || null)
      setLoading(false)
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-50">
        <SimpleHeader />
        <div className="pt-24 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-teal-50">
        <SimpleHeader />
        <div className="pt-24 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
          <p className="text-xl text-gray-600 mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            العودة للمدونة
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-teal-50">
      <SimpleHeader />

      {/* Hero Section - Logo Background */}
      <section
        className="min-h-screen relative overflow-hidden responsive-hero-bg"
        style={{ marginTop: '-80px' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-accent opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #edd674' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary opacity-20 animate-pulse hexagon-shape-delay" style={{ border: '3px solid #f05a3d' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent opacity-15 animate-pulse hexagon-shape-slow" style={{ border: '2px solid #6b6b6b' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-primary opacity-20 animate-pulse hexagon-shape" style={{ border: '3px solid #9a488d' }}></div>
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
              مدونة Juicetry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              اكتشف عالم العصائر الطبيعية من خلال مقالاتنا المفيدة والممتعة
            </p>
          </div>
        </div>
      </section>

      <article className="pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            العودة للمدونة
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
              <span className="text-sm">{post.readTime}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views} مشاهدة
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {post.likes} إعجاب
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.comments} تعليق
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Image */}
          {post.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Share Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">شارك هذا المقال</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href
                    })
                  }
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                مشاركة
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}

export default BlogPostPage
