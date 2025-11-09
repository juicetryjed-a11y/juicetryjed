import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface HomePageSettings {
  // Logo
  logo_url?: string
  logo_width?: number
  logo_height?: number
  
  // Hero Content
  hero_title: string
  hero_subtitle: string
  hero_description?: string
  hero_cta_text: string
  hero_cta_link: string
  hero_bg_color?: string
  
  // Hero Title Styling
  hero_title_font_size?: number
  hero_title_font_weight?: number
  hero_title_color?: string
  
  // Hero Subtitle Styling
  hero_subtitle_font_size?: number
  hero_subtitle_font_weight?: number
  hero_subtitle_color?: string
  
  // Hero Description Styling
  hero_description_font_size?: number
  hero_description_color?: string
  
  // Button Styling
  cta_button_bg_color?: string
  cta_button_text_color?: string
  cta_button_font_size?: number
  
  // Stats
  show_stats?: boolean
  stat_1_number?: string
  stat_1_label?: string
  stat_2_number?: string
  stat_2_label?: string
  stat_3_number?: string
  stat_3_label?: string
  stat_4_number?: string
  stat_4_label?: string
  stats_number_color?: string
  stats_label_color?: string
  stats_number_font_size?: number
  stats_label_font_size?: number
  
  // Features
  features_icon_color?: string
  features_title_color?: string
  features_description_color?: string
}

export const useHomePageSettings = () => {
  const [settings, setSettings] = useState<HomePageSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('home_page_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching home page settings:', error)
      }

      if (data) {
        setSettings(data)
      } else {
        // Default settings
        setSettings({
          hero_title: 'Juicetry - جوستري',
          hero_subtitle: 'محل العصائر الطبيعية الطازجة',
          hero_description: 'استمتع بأفضل العصائر الطبيعية المحضرة من أجود الفواكه والخضروات الطازجة',
          hero_cta_text: 'اطلب الآن',
          hero_cta_link: '/menu',
          show_stats: true,
          stat_1_number: '500+',
          stat_1_label: 'عميل سعيد',
          stat_2_number: '25+',
          stat_2_label: 'نوع عصير',
          stat_3_number: '100%',
          stat_3_label: 'طبيعي',
          stat_4_number: '24/7',
          stat_4_label: 'خدمة',
        })
      }
    } catch (error) {
      console.error('Error loading home page settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return { settings, loading, refetch: fetchSettings }
}
