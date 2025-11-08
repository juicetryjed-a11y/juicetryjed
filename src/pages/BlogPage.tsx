import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dataService } from '@/lib/dataService'
import NewHeader from '@/components/layout/NewHeader'
import Footer from '@/components/layout/Footer'
import { Calendar, User, ArrowLeft } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  seo_title?: string
  seo_keywords?: string
  seo_description?: string
  author?: string
  published_at?: string
  is_published: boolean
  created_at: string
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await dataService.getBlogPosts()

      if (error) throw error
      
      // فلترة المقالات المنشورة فقط
      const publishedPosts = (data || []).filter((post: BlogPost) => post.is_published)
      setPosts(publishedPosts)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المقالات:', error)
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-juicetry-primary/10 to-white">
      <NewHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-juicetry-dark mb-4">
            المقالات
          </h1>
          <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
            اكتشف آخر المقالات والنصائح حول العصائر الطبيعية والصحة
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-juicetry-primary"></div>
            <p className="mt-4 text-juicetry-gray">جاري التحميل...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-juicetry-gray text-xl">لا توجد مقالات حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* صورة المقال */}
                {post.featured_image && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* محتوى المقال */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-juicetry-dark mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-juicetry-gray mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-juicetry-gray mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-juicetry-primary hover:text-juicetry-coral font-semibold transition-colors"
                  >
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default BlogPage
