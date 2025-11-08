import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface SlideshowImage {
  id: number
  image_url: string
  image_alt_text?: string
  overlay_text?: string
  overlay_position?: string
  is_active: boolean
  display_order: number
}

interface SlideshowSettings {
  id: number
  is_enabled: boolean
  auto_play: boolean
  autoplay_duration: number
  show_navigation_arrows: boolean
  show_dots_indicator: boolean
  height: number
  show_text_overlay: boolean
}

const SlideshowSection: React.FC = () => {
  const [images, setImages] = useState<SlideshowImage[]>([])
  const [settings, setSettings] = useState<SlideshowSettings | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlideshowData()
  }, [])

  useEffect(() => {
    if (settings?.auto_play && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, settings.autoplay_duration)
      
      return () => clearInterval(interval)
    }
  }, [settings, images.length])

  const fetchSlideshowData = async () => {
    try {
      // Fetch settings
      const { data: settingsData } = await supabase
        .from('slideshow_settings')
        .select('*')
        .single()

      // Fetch images
      const { data: imagesData } = await supabase
        .from('slideshow_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (settingsData) setSettings(settingsData)
      if (imagesData) setImages(imagesData)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب بيانات العارض:', error)
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

  // Show nothing if still loading
  if (loading) {
    return null
  }

  // Show nothing if disabled or no images
  if (!settings?.is_enabled || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <section className="relative overflow-hidden">
      <div 
        className="relative"
        style={{ height: `${settings.height}px` }}
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
              <img
                src={image.image_url}
                alt={image.image_alt_text || 'صورة العرض'}
                className="w-full h-full object-cover"
              />
              
              {/* النصوص المتراكبة */}
              {settings.show_text_overlay && image.overlay_text && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className={`text-white p-6 max-w-4xl mx-auto ${
                    image.overlay_position === 'right' ? 'text-right' :
                    image.overlay_position === 'left' ? 'text-left' : 'text-center'
                  }`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                      <p className="text-xl md:text-3xl leading-relaxed font-medium">
                        {image.overlay_text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* أزرار التنقل */}
        {settings.show_navigation_arrows && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* المؤشرات */}
        {settings.show_dots_indicator && images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
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

export default SlideshowSection