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

interface SliderSettings {
  is_enabled: boolean
  auto_play: boolean
  autoplay_duration: number
  show_navigation: boolean
  show_indicators: boolean
  height_mobile: string
  height_desktop: string
}

const SliderNew: React.FC = () => {
  const [images, setImages] = useState<SliderImage[]>([])
  const [settings, setSettings] = useState<SliderSettings | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSliderData()
  }, [])

  useEffect(() => {
    if (settings?.auto_play && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, settings.autoplay_duration || 5000)
      
      return () => clearInterval(interval)
    }
  }, [settings, images.length])

  const fetchSliderData = async () => {
    try {
      // جلب الصور
      const { data: imagesData } = await supabase
        .from('slider_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      // جلب الإعدادات
      const { data: settingsData } = await supabase
        .from('slider_settings')
        .select('*')
        .maybeSingle()

      if (imagesData) setImages(imagesData)
      if (settingsData) {
        setSettings({
          is_enabled: settingsData.is_enabled ?? true,
          auto_play: settingsData.auto_play ?? true,
          autoplay_duration: settingsData.autoplay_duration || 5000,
          show_navigation: settingsData.show_navigation ?? true,
          show_indicators: settingsData.show_indicators ?? true,
          height_mobile: settingsData.height_mobile || '400px',
          height_desktop: settingsData.height_desktop || '600px',
        })
      } else {
        // إعدادات افتراضية
        setSettings({
          is_enabled: true,
          auto_play: true,
          autoplay_duration: 5000,
          show_navigation: true,
          show_indicators: true,
          height_mobile: '400px',
          height_desktop: '600px',
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب بيانات السلايدر:', error)
      setLoading(false)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  if (loading || !settings?.is_enabled || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <section className="relative overflow-hidden">
      <div 
        className="relative w-full"
        style={{ 
          height: window.innerWidth < 768 
            ? settings.height_mobile 
            : settings.height_desktop 
        }}
      >
        {/* الصور */}
        <div className="absolute inset-0">
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
                    alt={image.title || 'صورة السلايدر'}
                    className="w-full h-full object-cover"
                  />
                </a>
              ) : (
                <img
                  src={image.image_url}
                  alt={image.title || 'صورة السلايدر'}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* النصوص المتراكبة */}
              {(image.title || image.subtitle) && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    {image.title && (
                      <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        {image.title}
                      </h2>
                    )}
                    {image.subtitle && (
                      <p className="text-xl md:text-2xl">
                        {image.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* أزرار التنقل */}
        {settings.show_navigation && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* المؤشرات */}
        {settings.show_indicators && images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`الذهاب للصورة ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SliderNew

