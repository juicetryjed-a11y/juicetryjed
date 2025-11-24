import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail, Clock } from 'lucide-react'
import { useFooterSettings } from '@/hooks/useFooterSettings'

const Footer: React.FC = () => {
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
            <h3 className="text-xl font-bold mb-4 text-center">تابعنا</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex flex-col items-center gap-2"
                  style={{ color: settings.link_color }}
                >
                  <Facebook className="h-6 w-6" />
                  <span className="text-xs">Facebook</span>
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex flex-col items-center gap-2"
                  style={{ color: settings.link_color }}
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs">Instagram</span>
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex flex-col items-center gap-2"
                  style={{ color: settings.link_color }}
                >
                  <Twitter className="h-6 w-6" />
                  <span className="text-xs">Twitter</span>
                </a>
              )}
              {settings.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex flex-col items-center gap-2"
                  style={{ color: settings.link_color }}
                  title="TikTok"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="text-xs">TikTok</span>
                </a>
              )}
              {settings.snapchat_url && (
                <a
                  href={settings.snapchat_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity flex flex-col items-center gap-2"
                  style={{ color: settings.link_color }}
                  title="Snapchat"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
                  </svg>
                  <span className="text-xs">Snapchat</span>
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

export default Footer
