import React, { useState, useEffect } from 'react'
import { Search, Filter, Eye, Edit, Trash2, Star, User, Package, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Review {
  id: number
  customer_name: string
  customer_email: string
  product_id: number
  rating: number
  comment: string
  is_approved: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  products: {
    name: string
    image_url?: string
  }
}

const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'جميع المراجعات' },
    { value: 'approved', label: 'معتمدة' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'featured', label: 'مميزة' }
  ]

  const ratingOptions = [
    { value: 'all', label: 'جميع التقييمات' },
    { value: '5', label: '5 نجوم' },
    { value: '4', label: '4 نجوم' },
    { value: '3', label: '3 نجوم' },
    { value: '2', label: '2 نجوم' },
    { value: '1', label: '1 نجمة' }
  ]

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .select(`
          *,
          products (
            name,
            image_url
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReviewStatus = async (reviewId: number, field: 'is_approved' | 'is_featured', value: boolean) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .update({ 
          [field]: value,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId)

      if (error) throw error
      await loadReviews()
    } catch (error) {
      console.error('Error updating review status:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (reviewId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المراجعة؟')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .delete()
        .eq('id', reviewId)

      if (error) throw error
      await loadReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.products.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'approved' && review.is_approved) ||
      (statusFilter === 'pending' && !review.is_approved) ||
      (statusFilter === 'featured' && review.is_featured)

    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getReviewStats = () => {
    const stats = {
      total: reviews.length,
      approved: reviews.filter(r => r.is_approved).length,
      pending: reviews.filter(r => !r.is_approved).length,
      featured: reviews.filter(r => r.is_featured).length,
      averageRating: reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
      ratingDistribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
      }
    }
    return stats
  }

  const stats = getReviewStats()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة آراء العملاء</h2>
          <p className="text-gray-600 mt-1">مراجعة وإدارة تقييمات العملاء للمنتجات</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">إجمالي المراجعات</div>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-gray-600">معتمدة</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">في الانتظار</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.featured}</div>
              <div className="text-sm text-gray-600">مميزة</div>
            </div>
            <Star className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">متوسط التقييم</div>
            </div>
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 mb-2">توزيع التقييمات</div>
            <div className="space-y-1 text-xs">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center justify-between">
                  <span>{rating}★</span>
                  <span className="font-semibold">{stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في المراجعات (اسم العميل، المنتج، التعليق)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
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
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Review Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-lime-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.customer_name}</h4>
                    <p className="text-sm text-gray-500">{review.customer_email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.is_featured && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                      مميزة
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    review.is_approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.is_approved ? 'معتمدة' : 'في الانتظار'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                {renderStars(review.rating, 'md')}
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-lime-100 rounded-lg flex items-center justify-center">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.products.name}</p>
                  <p className="text-sm text-gray-500">المنتج المُقيَّم</p>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed line-clamp-4">{review.comment}</p>
            </div>

            {/* Actions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateReviewStatus(review.id, 'is_approved', !review.is_approved)}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_approved 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                    title={review.is_approved ? 'إلغاء الاعتماد' : 'اعتماد المراجعة'}
                  >
                    {review.is_approved ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateReviewStatus(review.id, 'is_featured', !review.is_featured)}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_featured 
                        ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={review.is_featured ? 'إزالة من المميزة' : 'جعل مميزة'}
                  >
                    <Star className={`h-4 w-4 ${review.is_featured ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedReview(review)
                      setShowDetailsModal(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="عرض التفاصيل"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف المراجعة"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد مراجعات</h3>
          <p className="text-gray-600">لم يتم العثور على مراجعات تطابق معايير البحث</p>
        </div>
      )}

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                تفاصيل المراجعة #{selectedReview.id}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  معلومات العميل
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">اسم العميل</label>
                    <p className="text-gray-900">{selectedReview.customer_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">البريد الإلكتروني</label>
                    <p className="text-gray-900">{selectedReview.customer_email}</p>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  معلومات المنتج
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-lime-100 rounded-xl flex items-center justify-center">
                    {selectedReview.products.image_url ? (
                      <img 
                        src={selectedReview.products.image_url} 
                        alt={selectedReview.products.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{selectedReview.products.name}</h5>
                    <p className="text-sm text-gray-600">المنتج المُقيَّم</p>
                  </div>
                </div>
              </div>

              {/* Review Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  تفاصيل المراجعة
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">التقييم</label>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(selectedReview.rating, 'lg')}
                      <span className="text-lg font-bold text-gray-900">({selectedReview.rating}/5)</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-600">التعليق</label>
                    <div className="mt-1 p-3 bg-white rounded-lg border">
                      <p className="text-gray-900 leading-relaxed">{selectedReview.comment}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">تاريخ المراجعة</label>
                      <p className="text-gray-900">
                        {new Date(selectedReview.created_at).toLocaleDateString('ar-SA')} - 
                        {new Date(selectedReview.created_at).toLocaleTimeString('ar-SA')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">آخر تحديث</label>
                      <p className="text-gray-900">
                        {new Date(selectedReview.updated_at).toLocaleDateString('ar-SA')} - 
                        {new Date(selectedReview.updated_at).toLocaleTimeString('ar-SA')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">حالة الاعتماد</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedReview.is_approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedReview.is_approved ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              معتمدة
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4" />
                              في الانتظار
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">مراجعة مميزة</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedReview.is_featured 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <Star className={`h-4 w-4 ${selectedReview.is_featured ? 'fill-current' : ''}`} />
                          {selectedReview.is_featured ? 'مميزة' : 'عادية'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    updateReviewStatus(selectedReview.id, 'is_approved', !selectedReview.is_approved)
                    setSelectedReview({ ...selectedReview, is_approved: !selectedReview.is_approved })
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedReview.is_approved 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {selectedReview.is_approved ? (
                    <>
                      <XCircle className="h-4 w-4" />
                      إلغاء الاعتماد
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      اعتماد المراجعة
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    updateReviewStatus(selectedReview.id, 'is_featured', !selectedReview.is_featured)
                    setSelectedReview({ ...selectedReview, is_featured: !selectedReview.is_featured })
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedReview.is_featured 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className={`h-4 w-4 ${selectedReview.is_featured ? 'fill-current' : ''}`} />
                  {selectedReview.is_featured ? 'إزالة من المميزة' : 'جعل مميزة'}
                </button>
              </div>
            </div>
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

export default ReviewsManager
