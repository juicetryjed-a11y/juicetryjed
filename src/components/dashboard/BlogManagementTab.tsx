import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, Upload } from 'lucide-react'

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

const BlogManagementTab: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المقالات:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingPost) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('blog_posts')
        .upsert(editingPost, { onConflict: 'id' })

      if (error) throw error
      
      await fetchPosts()
      setEditingPost(null)
      alert('تم حفظ المقال بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ المقال:', error)
      alert('حدث خطأ في حفظ المقال')
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchPosts()
      alert('تم حذف المقال بنجاح')
    } catch (error) {
      console.error('خطأ في حذف المقال:', error)
      alert('حدث خطأ في حذف المقال')
    }
  }

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ is_published: !post.is_published })
        .eq('id', post.id)

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('خطأ في تحديث حالة المقال:', error)
    }
  }

  if (loading) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المقالات</h2>
          <p className="text-gray-600 mt-1">إضافة وتعديل المقالات مع إعدادات SEO</p>
        </div>
        <button
          onClick={() => setEditingPost({
            id: Date.now(),
            title: '',
            slug: '',
            content: '',
            is_published: false,
            created_at: new Date().toISOString(),
          })}
          className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة مقال جديد
        </button>
      </div>

      {editingPost ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-xl font-bold">{editingPost.id > 1000 ? 'مقال جديد' : 'تعديل المقال'}</h3>
          
          <div>
            <label className="block text-sm font-semibold mb-2">العنوان</label>
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">الرابط (Slug)</label>
            <input
              type="text"
              value={editingPost.slug}
              onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="article-title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">الملخص</label>
            <textarea
              value={editingPost.excerpt || ''}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">المحتوى</label>
            <textarea
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={10}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">صورة مميزة</label>
            <input
              type="url"
              value={editingPost.featured_image || ''}
              onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="https://..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">SEO Title</label>
              <input
                type="text"
                value={editingPost.seo_title || ''}
                onChange={(e) => setEditingPost({ ...editingPost, seo_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">SEO Keywords</label>
              <input
                type="text"
                value={editingPost.seo_keywords || ''}
                onChange={(e) => setEditingPost({ ...editingPost, seo_keywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="keyword1, keyword2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">SEO Description</label>
            <textarea
              value={editingPost.seo_description || ''}
              onChange={(e) => setEditingPost({ ...editingPost, seo_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingPost.is_published}
                onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
              />
              <span>نشر المقال</span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">لا توجد مقالات حالياً</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Slug: {post.slug}</span>
                        <span className={`px-2 py-1 rounded ${
                          post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {post.is_published ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.is_published
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {post.is_published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogManagementTab


