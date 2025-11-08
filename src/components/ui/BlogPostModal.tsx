import React from 'react'
import { X, Calendar, User, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  category: string
  image_url?: string
  tags?: string[]
}

interface BlogPostModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start md:items-center justify-center p-2 md:p-4 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 my-2 md:my-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 md:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 truncate">
              {post.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-60px)] md:max-h-[calc(90vh-80px)]">
          {/* Image */}
          {post.image_url && (
            <div className="aspect-video md:aspect-[2/1] overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-3 md:p-6 lg:p-8">
            {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-green-600" />
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4 md:mb-6 lg:mb-8">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed space-y-3 md:space-y-4 lg:space-y-6 text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Footer Actions */}
            <div className="mt-6 md:mt-8 lg:mt-12 pt-4 md:pt-6 lg:pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="text-xs md:text-sm text-gray-500 text-center">
                  شكراً لقراءة هذا المقال من مدونة Juicetry
                </div>
                
                <div className="flex gap-2 md:gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
                  >
                    إغلاق
                  </button>
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
                    className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm md:text-base"
                  >
                    مشاركة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostModal
