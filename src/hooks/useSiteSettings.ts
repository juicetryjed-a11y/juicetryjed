import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface SiteSettings {
  id: number
  site_name: string
  site_description?: string
  site_logo?: string
  site_favicon?: string
  primary_color?: string
  secondary_color?: string
  accent_color?: string
  contact_phone?: string
  contact_email?: string
  contact_address?: string
  working_hours?: string
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  youtube_url?: string
  whatsapp_number?: string
  google_maps_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  analytics_code?: string
  maintenance_mode?: boolean
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      console.log('🔄 جلب إعدادات الموقع...')
      
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (error) throw error

      console.log('✅ تم جلب الإعدادات:', data)
      setSettings(data)
      
      // تطبيق الألوان على الموقع
      if (data.primary_color) {
        document.documentElement.style.setProperty('--color-primary', data.primary_color)
      }
      if (data.secondary_color) {
        document.documentElement.style.setProperty('--color-secondary', data.secondary_color)
      }
      if (data.accent_color) {
        document.documentElement.style.setProperty('--color-accent', data.accent_color)
      }
      
      // تطبيق meta tags
      if (data.meta_title) {
        document.title = data.meta_title
      }
      if (data.meta_description) {
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
          metaDesc = document.createElement('meta')
          metaDesc.setAttribute('name', 'description')
          document.head.appendChild(metaDesc)
        }
        metaDesc.setAttribute('content', data.meta_description)
      }
      
      // تطبيق favicon
      if (data.site_favicon) {
        let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if (!favicon) {
          favicon = document.createElement('link')
          favicon.rel = 'icon'
          document.head.appendChild(favicon)
        }
        favicon.href = data.site_favicon
      }
      
      setLoading(false)
    } catch (err: any) {
      console.error('❌ خطأ في جلب الإعدادات:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  return { settings, loading, error, refetch: fetchSettings }
}
