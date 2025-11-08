import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderImage {
  id: number
  image_url: string
  title?: string
  subtitle?: string
  link_url?: string
  is_active: boolean
  display_order: number
}

const NewSlider: React.FC = () => {
  const [images, setImages] = useState<SliderImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSliderImages()
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 5000) // تغيير الصورة كل 5 ثواني
      return () => clearInterval(interval)
    }
  }, [images.length])

  const fetchSliderImages = async () => {
    try {
      const { data } = await supabase
        .from('slider_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (data) {
        setImages(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب صور السلايدر:', error)
      setLoading(false)
    }
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="h-96 bg-gradient-to-r from-juicetry-primary to-juicetry-lightCoral flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-juicetry-dark"></div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="h-96 bg-gradient-to-r from-juicetry-primary to-juicetry-lightCoral flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-juicetry-dark mb-2">مرحباً بكم في Juicetry</h2>
          <p className="text-juicetry-dark/80">أفضل عصائر طبيعية طازجة</p>
        </div>
      </div>
    )
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* الصور */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {image.link_url ? (
              <a href={image.link_url} className="block w-full h-full">
                <img
                  src={image.image_url}
                  alt={image.title || 'Slider Image'}
                  className="w-full h-full object-cover"
                />
              </a>
            ) : (
              <img
                src={image.image_url}
                alt={image.title || 'Slider Image'}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* نص على الصورة */}
            {(image.title || image.subtitle) && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  {image.title && (
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{image.title}</h2>
                  )}
                  {image.subtitle && (
                    <p className="text-lg md:text-2xl">{image.subtitle}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-juicetry-dark p-2 rounded-full transition-all"
            aria-label="الصورة السابقة"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-juicetry-dark p-2 rounded-full transition-all"
            aria-label="الصورة التالية"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* المؤشرات */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-juicetry-primary w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`الذهاب للصورة ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default NewSlider


