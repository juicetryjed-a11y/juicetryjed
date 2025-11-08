import React, { useState, useEffect } from 'react'
import { Star, Search, Check, X, AlertCircle, RefreshCw, Trash2, Eye } from 'lucide-react'
import { reviewsAPI } from '@/lib/dashboardAPI'
import type { Review } from '@/types/dashboard'

const ReviewsManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const data = await reviewsAPI.getAll()
      setReviews(data)
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل المراجعات')
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await reviewsAPI.approve(id)
      setSuccess('تم قبول المراجعة')
      loadReviews()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await reviewsAPI.reject(id)
      setSuccess('تم رفض المراجعة')
      loadReviews()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المراجعة؟')) return
    try {
      await reviewsAPI.delete(id)
      setSuccess('تم حذف المراجعة')
      loadReviews()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || review.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">إدارة المراجعات</h2>
            <p className="text-gray-600 font-medium">عرض وإدارة آراء العملاء</p>
          </div>
        </div>
        <button onClick={loadReviews} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          <RefreshCw className="h-5 w-5" /> تحديث
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
          <button onClick={() => setError(null)} className="mr-auto"><X className="h-5 w-5" /></button>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <p className="text-green-800">{success}</p>
          <button onClick={() => setSuccess(null)} className="mr-auto"><X className="h-5 w-5" /></button>
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="بحث باسم العميل أو نص المراجعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-2 border rounded-lg">
          <option value="all">كل الحالات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="approved">مقبولة</option>
          <option value="rejected">مرفوضة</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد مراجعات</h3>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">{review.customer_name}</h4>
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        review.status === 'approved' ? 'bg-green-100 text-green-800' :
                        review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status === 'approved' ? 'مقبولة' : review.status === 'rejected' ? 'مرفوضة' : 'قيد المراجعة'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    {review.product_name && (
                      <p className="text-sm text-gray-500">المنتج: {review.product_name}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {review.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(review.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="قبول">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleReject(review.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="رفض">
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDelete(review.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="حذف">
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

export default ReviewsManagement
