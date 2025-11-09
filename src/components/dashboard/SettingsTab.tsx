import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Mail, Phone, MapPin, Globe, Settings as SettingsIcon } from 'lucide-react'

interface SiteSettings {
  id?: number
  site_name: string
  site_description?: string
  site_email: string
  site_phone: string
  site_address: string
  site_url: string
  site_logo?: string
  site_favicon?: string
  primary_color?: string
  secondary_color?: string
  accent_color?: string
  contact_phone?: string
  contact_email?: string
  contact_address?: string
  working_hours?: string
  whatsapp_number?: string
  google_maps_url?: string
  social_facebook?: string
  social_instagram?: string
  social_twitter?: string
  social_youtube?: string
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  youtube_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  analytics_code?: string
}

const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'جوستري',
    site_email: 'info@joustry.com',
    site_phone: '+966 50 123 4567',
    site_address: 'الرياض، المملكة العربية السعودية',
    site_url: 'https://joustry.com',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (data) {
        setSettings({
          id: data.id,
          site_name: data.site_name || 'جوستري',
          site_description: data.site_description || '',
          site_email: data.site_email || data.contact_email || 'info@joustry.com',
          site_phone: data.site_phone || data.contact_phone || '+966 50 123 4567',
          site_address: data.site_address || data.contact_address || 'الرياض، المملكة العربية السعودية',
          site_url: data.site_url || 'https://joustry.com',
          site_logo: data.site_logo || '',
          site_favicon: data.site_favicon || '',
          primary_color: data.primary_color || '#22c55e',
          secondary_color: data.secondary_color || '#84cc16',
          accent_color: data.accent_color || '#eab308',
          working_hours: data.working_hours || '',
          whatsapp_number: data.whatsapp_number || '',
          google_maps_url: data.google_maps_url || '',
          social_facebook: data.social_facebook || data.facebook_url || '',
          social_instagram: data.social_instagram || data.instagram_url || '',
          social_twitter: data.social_twitter || data.twitter_url || '',
          social_youtube: data.social_youtube || data.youtube_url || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          meta_keywords: data.meta_keywords || '',
          analytics_code: data.analytics_code || '',
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب الإعدادات:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const payload = { ...settings, id: settings.id ?? 1 }
      const { error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' })
      if (error) throw error
      alert('تم حفظ الإعدادات بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error)
      alert('حدث خطأ في حفظ الإعدادات')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* رأس الصفحة */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">الإعدادات العامة</h2>
        <p className="text-gray-600 mt-1">إدارة إعدادات الموقع العامة</p>
      </div>

      <div className="space-y-6">
        {/* معلومات الموقع الأساسية */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">معلومات الموقع الأساسية</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اسم الموقع
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                رابط الموقع
              </label>
              <div className="relative">
                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="url"
                  value={settings.site_url}
                  onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="https://joustry.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* إعدادات الألوان */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">ألوان الموقع</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اللون الأساسي
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.primary_color || '#22c55e'}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primary_color || '#22c55e'}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="#22c55e"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اللون الثانوي
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.secondary_color || '#84cc16'}
                  onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.secondary_color || '#84cc16'}
                  onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="#84cc16"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                لون التمييز
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.accent_color || '#eab308'}
                  onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accent_color || '#eab308'}
                  onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="#eab308"
                />
              </div>
            </div>
          </div>
        </div>

        {/* معلومات التواصل */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">معلومات التواصل</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={settings.site_email}
                  onChange={(e) => setSettings({ ...settings, site_email: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  value={settings.site_phone}
                  onChange={(e) => setSettings({ ...settings, site_phone: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                العنوان
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={settings.site_address}
                  onChange={(e) => setSettings({ ...settings, site_address: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* روابط السوشيال ميديا */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">روابط السوشيال ميديا</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={settings.social_facebook || ''}
                onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="https://facebook.com/joustry"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={settings.social_instagram || ''}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="https://instagram.com/joustry"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={settings.social_twitter || ''}
                onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="https://twitter.com/joustry"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube
              </label>
              <input
                type="url"
                value={settings.social_youtube || ''}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="https://youtube.com/joustry"
              />
            </div>
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="h-5 w-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsTab


