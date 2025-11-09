import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin, Mail, Clock } from 'lucide-react'
import { useFooterSettings } from '@/hooks/useFooterSettings'

const DynamicFooter: React.FC = () => {
  const { settings, loading } = useFooterSettings()
  
  if (loading || !settings) {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>جاري التحميل...</p>
        </div>
      </footer>
    )
  }

  const socialIcons: Record<string, any> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  }

  return (
    <footer 
      className="py-12"
      style={{ 
        backgroundColor: settings.bg_color,
        color: settings.text_color 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{settings.company_name}</h3>
            <p className="mb-4 opacity-90">{settings.company_description}</p>
          </div>

          {/* Quick Links */}
          {settings.show_quick_links && (
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const text = settings[`quick_link_${num}_text` as keyof typeof settings] as string
                  const url = settings[`quick_link_${num}_url` as keyof typeof settings] as string
                  if (!text || !url) return null
                  return (
                    <li key={num}>
                      <Link
                        to={url}
                        className="hover:opacity-80 transition-opacity"
                        style={{ color: settings.link_color }}
                      >
                        {text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" style={{ color: settings.link_color }} />
                <a 
                  href={`tel:${settings.phone}`}
                  className="hover:opacity-80"
                  style={{ color: settings.link_color }}
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" style={{ color: settings.link_color }} />
                <a 
                  href={`mailto:${settings.email}`}
                  className="hover:opacity-80"
                  style={{ color: settings.link_color }}
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: settings.link_color }} />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5" style={{ color: settings.link_color }} />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">تابعنا</h3>
            <div className="flex gap-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: settings.link_color }}
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: settings.link_color }}
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: settings.link_color }}
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {settings.youtube_url && (
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: settings.link_color }}
                >
                  <Youtube className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        {settings.show_copyright && (
          <div className="border-t pt-8 text-center opacity-75" style={{ borderColor: settings.link_color }}>
            <p>{settings.copyright_text}</p>
          </div>
        )}
      </div>
    </footer>
  )
}

export default DynamicFooter
