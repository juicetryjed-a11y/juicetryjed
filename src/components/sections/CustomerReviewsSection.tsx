import React, { useEffect, useState } from 'react'
import { CustomerReview, HomepageDesignSettings } from '@/types'
import { supabase } from '@/lib/supabase'
import { Star, Quote } from 'lucide-react'

const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>([])
  const [designSettings, setDesignSettings] = useState<HomepageDesignSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('is_visible', true)
        .order('display_order')
        .limit(6)

      // Fetch design settings
      const { data: designData } = await supabase
        .from('homepage_design_settings')
        .select('*')
        .eq('section_name', 'customer_reviews')
        .maybeSingle()

      if (reviewsData) setReviews(reviewsData)
      if (designData) setDesignSettings(designData)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب آراء العملاء:', error)
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return null
  }

  // Show default content if no settings or settings not visible
  if (!designSettings || !designSettings.is_visible) {
    return reviews.length > 0 ? (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">آراء عملائنا</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف ما يقوله عملاؤنا الكرام عن تجربتهم مع عصائر جوستري الطازجة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute top-4 left-4 text-secondary opacity-20">
                  <Quote className="h-8 w-8" />
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{review.review_text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center ml-4">
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
                    <h4 className="font-bold text-gray-900">{review.customer_name}</h4>
                    <p className="text-gray-500 text-sm">عميل جوستري</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 p-8 bg-coral-50 rounded-xl">
            <h3 className="text-3xl font-bold text-primary mb-2">4.9/5</h3>
            <p className="text-gray-600 mb-4">متوسط تقييم العملاء</p>
            <div className="flex items-center justify-center">
              {renderStars(5)}
              <span className="text-gray-600 mr-2">من أكثر من 500 مراجعة</span>
            </div>
          </div>
        </div>
      </section>
    ) : null
  }

  const sectionStyle = {
    backgroundColor: designSettings.background_color,
    color: designSettings.text_color,
    textAlign: designSettings.text_alignment as 'center' | 'right' | 'left',
    fontSize: designSettings.font_size === 'large' ? '1.2rem' : designSettings.font_size === 'small' ? '0.9rem' : '1rem',
    paddingTop: designSettings.padding_top === 'large' ? '6rem' : designSettings.padding_top === 'small' ? '2rem' : '4rem',
    paddingBottom: designSettings.padding_bottom === 'large' ? '6rem' : designSettings.padding_bottom === 'small' ? '2rem' : '4rem',
  }

  return (
    <section style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">آراء عملائنا</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            اكتشف ما يقوله عملاؤنا الكرام عن تجربتهم مع عصائر جوستري الطازجة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              {/* أيقونة الاقتباس */}
              <div className="absolute top-4 left-4 text-secondary opacity-20">
                <Quote className="h-8 w-8" />
              </div>
              
              {/* النجوم */}
              <div className="flex items-center mb-4">
                {renderStars(review.rating)}
              </div>
              
              {/* نص المراجعة */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{review.review_text}"
              </p>
              
              {/* معلومات العميل */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center ml-4">
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
                  <h4 className="font-bold text-gray-900">{review.customer_name}</h4>
                  <p className="text-gray-500 text-sm">عميل جوستري</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* إحصائية إجمالية */}
        <div className="text-center mt-12 p-8 bg-orange-50 rounded-xl">
          <h3 className="text-3xl font-bold text-orange-500 mb-2">4.9/5</h3>
          <p className="text-gray-600 mb-4">متوسط تقييم العملاء</p>
          <div className="flex items-center justify-center">
            {renderStars(5)}
            <span className="text-gray-600 mr-2">من أكثر من 500 مراجعة</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviewsSection
