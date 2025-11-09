import React, { useEffect, useState } from 'react'
import { SocialMediaLink } from '@/types'
import { supabase } from '@/lib/supabase'
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin, Mail } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const iconMap: Record<string, React.ComponentType<any>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

const Footer: React.FC = () => {
  const { settings } = useSiteSettings()
  const primaryColor = settings?.primary_color || '#22c55e'
  const accentColor = settings?.accent_color || '#eab308'
  
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([])
  const [siteName, setSiteName] = useState('جوستري')
  const [sitePhone, setSitePhone] = useState('+966 50 123 4567')
  const [siteEmail, setSiteEmail] = useState('info@joustry.com')
  const [siteAddress, setSiteAddress] = useState('الرياض، المملكة العربية السعودية')

  useEffect(() => {
    fetchSocialLinks()
    fetchSiteSettings()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      const { data } = await supabase
        .from('social_media_links')
        .select('*')
        .eq('is_visible', true)
        .order('display_order')

      if (data) {
        setSocialLinks(data)
      }
    } catch (error) {
      console.error('خطأ في جلب روابط السوشيال ميديا:', error)
    }
  }

  const fetchSiteSettings = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .single()
      if (data) {
        setSiteName(data.site_name || 'جوستري')
        setSitePhone(data.site_phone || '+966 50 123 4567')
        setSiteEmail(data.site_email || 'info@joustry.com')
        setSiteAddress(data.site_address || 'الرياض، المملكة العربية السعودية')
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات الموقع:', error)
    }
  }

  return (
    <footer className="bg-juicetry-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>{siteName}</h3>
            <p className="text-gray-300 mb-4">
              أفضل عصائر طبيعية طازجة يومياً. نقدم لك مجموعة متنوعة من العصائر الطازجة المحضرة بأعلى معايير الجودة.
            </p>
            <div className="flex gap-4">
              {socialLinks
                .filter((link) => link && link.platform && link.url)
                .map((link) => {
                  const platformKey = link.platform?.toLowerCase() || 'facebook'
                  const Icon = iconMap[platformKey] || Facebook
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  )
                })}
            </div>
          </div>

          {/* الروابط السريعة */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a 
                  href="/menu" 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  قائمة العصائر
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  من نحن
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" style={{ color: accentColor }} />
                <a 
                  href={`tel:${sitePhone.replace(/\s+/g,'')}`} 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  {sitePhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" style={{ color: accentColor }} />
                <a 
                  href={`mailto:${siteEmail}`} 
                  className="text-gray-300 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  {siteEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" style={{ color: accentColor }} />
                <span className="text-gray-300">{siteAddress}</span>
              </div>
            </div>
          </div>

          {/* ساعات العمل */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ساعات العمل</h4>
            <div className="space-y-2 text-gray-300">
              <p>السبت - الخميس: 8:00 ص - 11:00 م</p>
              <p>الجمعة: 2:00 م - 11:00 م</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 جوستري. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer