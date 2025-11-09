import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface FooterSettings {
  company_name: string
  company_description: string
  company_logo?: string
  phone: string
  email: string
  address: string
  working_hours: string
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  youtube_url?: string
  whatsapp_number?: string
  show_quick_links: boolean
  quick_link_1_text: string
  quick_link_1_url: string
  quick_link_2_text: string
  quick_link_2_url: string
  quick_link_3_text: string
  quick_link_3_url: string
  quick_link_4_text: string
  quick_link_4_url: string
  quick_link_5_text: string
  quick_link_5_url: string
  bg_color: string
  text_color: string
  link_color: string
  link_hover_color: string
  copyright_text: string
  show_copyright: boolean
}

export const useFooterSettings = () => {
  const [settings, setSettings] = useState<FooterSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching footer settings:', error)
      }

      if (data) {
        setSettings(data)
      } else {
        // Default settings
        setSettings({
          company_name: 'Juicetry - جوستري',
          company_description: 'أفضل العصائر الطبيعية الطازجة',
          phone: '+966 50 123 4567',
          email: 'info@juicetry.com',
          address: 'الرياض، المملكة العربية السعودية',
          working_hours: 'يومياً من 8 صباحاً - 11 مساءً',
          show_quick_links: true,
          quick_link_1_text: 'الرئيسية',
          quick_link_1_url: '/',
          quick_link_2_text: 'من نحن',
          quick_link_2_url: '/about',
          quick_link_3_text: 'المنتجات',
          quick_link_3_url: '/products',
          quick_link_4_text: 'المقالات',
          quick_link_4_url: '/blog',
          quick_link_5_text: 'تواصل معنا',
          quick_link_5_url: '/contact',
          bg_color: '#1f2937',
          text_color: '#ffffff',
          link_color: '#22c55e',
          link_hover_color: '#16a34a',
          copyright_text: '© 2024 Juicetry. جميع الحقوق محفوظة',
          show_copyright: true,
        })
      }
    } catch (error) {
      console.error('Error loading footer settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return { settings, loading, refetch: fetchSettings }
}
