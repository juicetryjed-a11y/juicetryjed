import React, { useEffect, useState } from 'react'
import { CustomerReview } from '@/types'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Star, MessageSquare } from 'lucide-react'

const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const { data } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('display_order')

      if (data) setReviews(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب آراء العملاء:', error)
      setLoading(false)
    }
  }

  const toggleReviewVisible = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .update({ is_visible: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setReviews(prev => 
        prev.map(review => 
          review.id === id 
            ? { ...review, is_visible: !currentStatus }
            : review
        )
      )
    } catch (error) {
      console.error('خطأ في تحديث حالة المراجعة:', error)
      alert('حدث خطأ في تحديث حالة المراجعة')
    }
  }

  const deleteReview = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المراجعة؟')) return

    try {
      const { error } = await supabase
        .from('customer_reviews')
        .delete()
        .eq('id', id)

      if (error) throw error

      setReviews(prev => prev.filter(review => review.id !== id))
      alert('تم حذف المراجعة بنجاح')
    } catch (error) {
      console.error('خطأ في حذف المراجعة:', error)
      alert('حدث خطأ في حذف المراجعة')
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">آراء العملاء</h2>
          <p className="text-gray-600 mt-1">إدارة آراء وتقييمات العملاء</p>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
          <Plus className="h-5 w-5" />
          إضافة مراجعة جديدة
        </button>
      </div>

      {/* قائمة المراجعات */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد مراجعات حالياً</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              إضافة أول مراجعة
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        {review.customer_image_url ? (
                          <img 
                            src={review.customer_image_url}
                            alt={review.customer_name}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {review.customer_name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{review.customer_name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">({review.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.review_text}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>ترتيب العرض: {review.display_order}</span>
                      <span className={`px-2 py-1 rounded ${
                        review.is_visible 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {review.is_visible ? 'ظاهر' : 'مخفي'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReviewVisible(review.id, review.is_visible)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.is_visible
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title={review.is_visible ? 'إخفاء' : 'إظهار'}
                    >
                      {review.is_visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
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
    </div>
  )
}

export default ReviewsTab


