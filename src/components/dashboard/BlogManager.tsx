import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, Save, X, Upload, Image, Globe, Hash, FileText, User, Calendar, Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ImageUploader from '@/components/ui/ImageUploader'

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  is_published: boolean
  is_featured: boolean
  views: number
  likes: number
  comments_count: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  featured_image?: string
  slug?: string
  created_at: string
  updated_at: string
}

interface BlogFormData {
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  is_published: boolean
  is_featured: boolean
  meta_title: string
  meta_description: string
  meta_keywords: string
  featured_image: string
  slug: string
}

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [activeModalTab, setActiveModalTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: 'health',
    is_published: false,
    is_featured: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured_image: '',
    slug: ''
  })

  const categories = [
    { value: 'health', label: 'الصحة والتغذية', emoji: '🥗' },
    { value: 'recipes', label: 'وصفات العصائر', emoji: '🍹' },
    { value: 'tips', label: 'نصائح وإرشادات', emoji: '💡' },
    { value: 'news', label: 'أخبار وتحديثات', emoji: '📰' },
    { value: 'general', label: 'عام', emoji: '📝' }
  ]

  const statusOptions = [
    { value: 'all', label: 'جميع المقالات' },
    { value: 'published', label: 'منشورة' },
    { value: 'draft', label: 'مسودة' },
    { value: 'featured', label: 'مميزة' }
  ]

  // دالة لإنشاء slug من العنوان
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // إزالة الرموز الخاصة
      .replace(/\s+/g, '-') // استبدال المسافات بشرطات
      .replace(/-+/g, '-') // إزالة الشرطات المتكررة
      .trim()
  }

  // دالة لتحديث العنوان وإنشاء slug تلقائياً
  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      meta_title: title // تحديث meta_title تلقائياً إذا كان فارغاً
    })
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPost.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...formData,
            views: 0,
            likes: 0,
            comments_count: 0
          }])

        if (error) throw error
      }

      await loadPosts()
      resetForm()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadPosts()
    } catch (error) {
      console.error('Error deleting blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (id: number, field: 'is_published' | 'is_featured', currentValue: boolean) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          [field]: !currentValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      await loadPosts()
    } catch (error) {
      console.error('Error updating blog post status:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: 'health',
      is_published: false,
      is_featured: false,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      featured_image: '',
      slug: ''
    })
    setEditingPost(null)
  }

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      is_published: post.is_published,
      is_featured: post.is_featured,
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      featured_image: post.featured_image || '',
      slug: post.slug || ''
    })
    setShowModal(true)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'published' && post.is_published) ||
      (statusFilter === 'draft' && !post.is_published) ||
      (statusFilter === 'featured' && post.is_featured)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getPostStats = () => {
    const stats = {
      total: posts.length,
      published: posts.filter(p => p.is_published).length,
      draft: posts.filter(p => !p.is_published).length,
      featured: posts.filter(p => p.is_featured).length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
      totalLikes: posts.reduce((sum, p) => sum + p.likes, 0)
    }
    return stats
  }

  const stats = getPostStats()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة المقالات</h2>
          <p className="text-gray-600 mt-1">إنشاء وإدارة مقالات المدونة</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          إضافة مقال جديد
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">إجمالي المقالات</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          <div className="text-sm text-gray-600">منشورة</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          <div className="text-sm text-gray-600">مسودة</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-purple-600">{stats.featured}</div>
          <div className="text-sm text-gray-600">مميزة</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
          <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-red-600">{stats.totalLikes}</div>
          <div className="text-sm text-gray-600">إجمالي الإعجابات</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">جميع التصنيفات</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المقال</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكاتب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التصنيف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإحصائيات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-lime-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{post.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {categories.find(c => c.value === post.category)?.emoji}
                      {categories.find(c => c.value === post.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="space-y-1">
                      <div>👁️ {post.views} مشاهدة</div>
                      <div>❤️ {post.likes} إعجاب</div>
                      <div>💬 {post.comments_count} تعليق</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(post.id, 'is_published', post.is_published)}
                          className={`p-1 rounded ${
                            post.is_published 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {post.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <span className={`text-xs font-semibold ${
                          post.is_published ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {post.is_published ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                      {post.is_featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          ⭐ مميز
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.created_at).toLocaleDateString('ar-SA')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(post)}
                        className="text-blue-600 hover:text-blue-900"
                        title="تحرير المقال"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(post.id, 'is_featured', post.is_featured)}
                        className={`${
                          post.is_featured ? 'text-purple-600' : 'text-gray-400'
                        } hover:text-purple-900`}
                        title={post.is_featured ? 'إزالة من المميزة' : 'جعل مميز'}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف المقال"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد مقالات</h3>
          <p className="text-gray-600 mb-6">ابدأ بإنشاء مقال جديد لمشاركة المحتوى مع عملائك</p>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            إضافة مقال جديد
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPost ? 'تحرير المقال' : 'إضافة مقال جديد'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { id: 'content' as const, label: 'المحتوى', icon: FileText },
                  { id: 'seo' as const, label: 'تحسين محركات البحث', icon: Globe },
                  { id: 'settings' as const, label: 'الإعدادات', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeModalTab === tab.id
                        ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {activeModalTab === 'content' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      عنوان المقال *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="عنوان جذاب للمقال..."
                      required
                    />
                  </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الكاتب *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="اسم الكاتب..."
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.emoji} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المقتطف *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={3}
                    placeholder="ملخص قصير للمقال..."
                    required
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    محتوى المقال *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={10}
                    placeholder="اكتب محتوى المقال هنا..."
                    required
                  />
                </div>

                  {/* Featured Image */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الصورة المميزة
                    </label>
                    <ImageUploader
                      currentImage={formData.featured_image}
                      onUpload={(url) => setFormData({ ...formData, featured_image: url })}
                      folder="blog"
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {activeModalTab === 'seo' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">تحسين محركات البحث (SEO)</h4>
                    <p className="text-sm text-blue-700">
                      هذه الإعدادات تساعد في تحسين ظهور المقال في نتائج البحث
                    </p>
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Hash className="inline h-4 w-4 mr-1" />
                      الرابط المختصر (Slug)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="article-slug"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      سيظهر في الرابط: /blog/{formData.slug || 'article-slug'}
                    </p>
                  </div>

                  {/* Meta Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      عنوان الصفحة (Meta Title)
                    </label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="عنوان يظهر في نتائج البحث..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      الطول المثالي: 50-60 حرف (الحالي: {formData.meta_title.length})
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      وصف الصفحة (Meta Description)
                    </label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                      rows={3}
                      placeholder="وصف يظهر في نتائج البحث..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      الطول المثالي: 150-160 حرف (الحالي: {formData.meta_description.length})
                    </div>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الكلمات المفتاحية (Meta Keywords)
                    </label>
                    <input
                      type="text"
                      value={formData.meta_keywords}
                      onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="كلمة1، كلمة2، كلمة3..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      افصل الكلمات بفاصلة
                    </p>
                  </div>
                </div>
              )}

              {activeModalTab === 'settings' && (
                <div className="space-y-6">
                  {/* Status Options */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">إعدادات النشر</h4>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={formData.is_published}
                          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="is_published" className="text-sm font-semibold text-gray-700">
                          نشر المقال
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="is_featured"
                          checked={formData.is_featured}
                          onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="is_featured" className="text-sm font-semibold text-gray-700">
                          مقال مميز
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'جاري الحفظ...' : editingPost ? 'تحديث المقال' : 'إضافة المقال'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogManager
