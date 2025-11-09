import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Mail, Phone, MapPin, Globe, Settings as SettingsIcon, Upload, Image as ImageIcon } from 'lucide-react'

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
  const [uploading, setUploading] = useState(false)

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

  const handleImageUpload = async (file: File, type: 'logo' | 'favicon') => {
    try {
      setUploading(true)
      console.log(`🔄 رفع ${type}...`, file.name)

      // إنشاء اسم فريد للملف
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `site-assets/${fileName}`

      // رفع الملف على Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('❌ خطأ في رفع الصورة:', uploadError)
        throw uploadError
      }

      // الحصول على رابط الصورة
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      const imageUrl = urlData.publicUrl
      console.log('✅ تم رفع الصورة:', imageUrl)

      // تحديث الإعدادات
      const field = type === 'logo' ? 'site_logo' : 'site_favicon'
      setSettings(prev => ({ ...prev, [field]: imageUrl }))

      // حفظ في قاعدة البيانات فوراً
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ [field]: imageUrl, updated_at: new Date().toISOString() })
        .eq('id', settings.id ?? 1)

      if (updateError) throw updateError

      alert(`تم رفع ${type === 'logo' ? 'الشعار' : 'الأيقونة'} بنجاح ✅`)
    } catch (error: any) {
      console.error(`❌ خطأ في رفع ${type}:`, error)
      alert(`حدث خطأ في رفع ${type === 'logo' ? 'الشعار' : 'الأيقونة'}: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      console.log('🔄 محاولة حفظ الإعدادات...', settings)
      
      // إنشاء payload نظيف بدون حقول غير صحيحة
      const payload = {
        id: settings.id ?? 1,
        site_name: settings.site_name,
        site_description: settings.site_description || '',
        site_email: settings.site_email,
        site_phone: settings.site_phone,
        site_address: settings.site_address,
        site_url: settings.site_url,
        site_logo: settings.site_logo || null,
        site_favicon: settings.site_favicon || null,
        primary_color: settings.primary_color || '#22c55e',
        secondary_color: settings.secondary_color || '#84cc16',
        accent_color: settings.accent_color || '#eab308',
        contact_phone: settings.site_phone,
        contact_email: settings.site_email,
        contact_address: settings.site_address,
        working_hours: settings.working_hours || '',
        whatsapp_number: settings.whatsapp_number || '',
        google_maps_url: settings.google_maps_url || '',
        facebook_url: settings.social_facebook || '',
        twitter_url: settings.social_twitter || '',
        instagram_url: settings.social_instagram || '',
        youtube_url: settings.social_youtube || '',
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
        analytics_code: settings.analytics_code || '',
        updated_at: new Date().toISOString()
      }
      
      console.log('📦 البيانات المرسلة:', payload)
      
      const { data, error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' })
        .select()
      
      if (error) {
        console.error('❌ خطأ من Supabase:', error)
        throw error
      }
      
      console.log('✅ تم الحفظ بنجاح:', data)
      alert('تم حفظ الإعدادات بنجاح ✅')
      
      // إعادة تحميل الإعدادات للتأكد
      await fetchSettings()
    } catch (error: any) {
      console.error('❌ خطأ في حفظ الإعدادات:', error)
      alert(`حدث خطأ في حفظ الإعدادات: ${error.message || error}`)
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

            {/* رفع الشعار */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                شعار الموقع (Logo)
              </label>
              <div className="flex items-center gap-4">
                {settings.site_logo && (
                  <img 
                    src={settings.site_logo} 
                    alt="Logo" 
                    className="w-20 h-20 object-contain border border-gray-300 rounded-lg p-2"
                  />
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'جاري الرفع...' : 'اختر صورة الشعار'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'logo')
                    }}
                  />
                </label>
              </div>
            </div>

            {/* رفع الأيقونة */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                أيقونة الموقع (Favicon)
              </label>
              <div className="flex items-center gap-4">
                {settings.site_favicon && (
                  <img 
                    src={settings.site_favicon} 
                    alt="Favicon" 
                    className="w-12 h-12 object-contain border border-gray-300 rounded-lg p-1"
                  />
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'جاري الرفع...' : 'اختر أيقونة الموقع'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'favicon')
                    }}
                  />
                </label>
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


