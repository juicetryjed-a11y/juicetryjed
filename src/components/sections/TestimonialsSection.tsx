import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  customer_name: string
  review_text: string
  rating: number
  customer_image_url?: string
  is_visible: boolean
  display_order: number
  text_color?: string
  font_family?: string
  font_size?: string
}

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('is_visible', true)
        .order('display_order')
        .limit(6)

      if (data) setTestimonials(data)
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
          index < rating 
            ? 'text-juicetry-primary fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-juicetry-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-juicetry-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-juicetry-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-juicetry-dark mb-4">
            آراء عملائنا
          </h2>
          <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
            اكتشف ما يقوله عملاؤنا الكرام عن تجربتهم مع عصائر Juicetry الطازجة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const testimonialStyle = {
              color: testimonial.text_color || '#291719',
              fontFamily: testimonial.font_family || 'inherit',
              fontSize: testimonial.font_size || '16px',
            }

            return (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
                style={testimonialStyle}
              >
                {/* أيقونة الاقتباس */}
                <div className="absolute top-4 left-4 text-juicetry-primary/20">
                  <Quote className="h-8 w-8" />
                </div>
                
                {/* النجوم */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* نص المراجعة */}
                <p className="mb-6 leading-relaxed">
                  "{testimonial.review_text}"
                </p>
                
                {/* معلومات العميل */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-juicetry-primary to-juicetry-lightCoral rounded-full flex items-center justify-center ml-4">
                    {testimonial.customer_image_url ? (
                      <img 
                        src={testimonial.customer_image_url}
                        alt={testimonial.customer_name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-juicetry-dark font-bold text-lg">
                        {testimonial.customer_name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.customer_name}</h4>
                    <p className="text-sm opacity-70">عميل Juicetry</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* إحصائية إجمالية */}
        <div className="text-center mt-12 p-8 bg-juicetry-primary/20 rounded-2xl">
          <h3 className="text-4xl font-bold text-juicetry-dark mb-2">4.9/5</h3>
          <p className="text-juicetry-gray mb-4">متوسط تقييم العملاء</p>
          <div className="flex items-center justify-center">
            {renderStars(5)}
            <span className="text-juicetry-gray mr-2">من أكثر من 500 مراجعة</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection


