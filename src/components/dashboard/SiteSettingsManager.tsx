import React, { useState, useEffect } from 'react'
import { Save, Upload, Palette, Globe, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Settings } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import ImageUploader from '@/components/ui/ImageUploader'
import { useTheme, applyThemeColors } from '@/hooks/useTheme'

interface SiteSettings {
  id?: number
  site_name: string
  site_description: string
  site_logo: string
  site_favicon: string
  primary_color: string
  secondary_color: string
  accent_color: string
  contact_phone: string
  contact_email: string
  contact_address: string
  working_hours: string
  facebook_url: string
  twitter_url: string
  instagram_url: string
  youtube_url: string
  whatsapp_number: string
  google_maps_url: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  analytics_code: string
  updated_at?: string
}

const SiteSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Juicetry - جوستري',
    site_description: 'محل العصائر الطبيعية الطازجة',
    site_logo: '',
    site_favicon: '',
    primary_color: '#22c55e',
    secondary_color: '#84cc16',
    accent_color: '#eab308',
    contact_phone: '+966501234567',
    contact_email: 'info@juicetry.com',
    contact_address: 'الرياض، المملكة العربية السعودية',
    working_hours: 'يومياً من 8 صباحاً - 11 مساءً',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    youtube_url: '',
    whatsapp_number: '+966501234567',
    google_maps_url: '',
    meta_title: 'Juicetry - أفضل العصائر الطبيعية',
    meta_description: 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
    meta_keywords: 'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات',
    analytics_code: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'seo' | 'advanced'>('general')

  // تطبيق الألوان فوراً عند تغييرها
  useTheme({
    primary: settings.primary_color,
    secondary: settings.secondary_color,
    accent: settings.accent_color
  })

  const colorPresets = [
    { name: 'الأخضر الطبيعي', primary: '#22c55e', secondary: '#84cc16', accent: '#eab308' },
    { name: 'الأزرق الهادئ', primary: '#3b82f6', secondary: '#06b6d4', accent: '#8b5cf6' },
    { name: 'الأحمر الدافئ', primary: '#ef4444', secondary: '#f97316', accent: '#eab308' },
    { name: 'البنفسجي الملكي', primary: '#8b5cf6', secondary: '#a855f7', accent: '#ec4899' },
    { name: 'البرتقالي المشرق', primary: '#f97316', secondary: '#eab308', accent: '#ef4444' }
  ]

  const tabs = [
    { id: 'general' as const, label: 'إعدادات عامة', icon: Globe },
    { id: 'contact' as const, label: 'معلومات التواصل', icon: Phone },
    { id: 'social' as const, label: 'وسائل التواصل', icon: Facebook },
    { id: 'seo' as const, label: 'تحسين محركات البحث', icon: Globe },
    { id: 'advanced' as const, label: 'إعدادات متقدمة', icon: Settings }
  ]

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await dataService.getSiteSettings()

      if (error) {
        throw error
      }

      if (data && Array.isArray(data) && data.length > 0) {
        setSettings(data[0])
      }
    } catch (error) {
      console.error('Error loading site settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const settingsData = {
        ...settings,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await dataService.updateSiteSettings(settingsData)

      if (error) throw error
      
      if (data) {
        setSettings(data)
      }

      // تطبيق الألوان على الموقع كله فوراً بعد الحفظ
      applyThemeColors({
        primary: settings.primary_color,
        secondary: settings.secondary_color,
        accent: settings.accent_color
      })
      
      // حفظ الألوان في localStorage للاستمرارية
      localStorage.setItem('theme_colors', JSON.stringify({
        primary: settings.primary_color,
        secondary: settings.secondary_color,
        accent: settings.accent_color
      }))

      alert('تم حفظ الإعدادات بنجاح! ✅')
    } catch (error) {
      console.error('Error saving site settings:', error)
      alert('حدث خطأ أثناء حفظ الإعدادات')
    } finally {
      setLoading(false)
    }
  }

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    const newSettings = {
      ...settings,
      primary_color: preset.primary,
      secondary_color: preset.secondary,
      accent_color: preset.accent
    }
    setSettings(newSettings)
    
    // تطبيق الألوان فوراً
    applyThemeColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent
    })
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            اسم الموقع
          </label>
          <input
            type="text"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            وصف الموقع
          </label>
          <input
            type="text"
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            شعار الموقع
          </label>
          <ImageUploader
            currentImage={settings.site_logo}
            onUpload={(url) => setSettings({ ...settings, site_logo: url })}
            folder="branding"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            أيقونة الموقع (Favicon)
          </label>
          <ImageUploader
            currentImage={settings.site_favicon}
            onUpload={(url) => setSettings({ ...settings, site_favicon: url })}
            folder="branding"
            className="w-full"
          />
        </div>
      </div>

      {/* Color Settings */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          ألوان الموقع
        </h3>
        
        {/* Color Presets */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            قوالب الألوان الجاهزة
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {colorPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyColorPreset(preset)}
                className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                </div>
                <div className="text-xs font-medium text-gray-700">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              اللون الأساسي
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.primary_color}
                onChange={(e) => {
                  const newSettings = { ...settings, primary_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: e.target.value,
                    secondary: settings.secondary_color,
                    accent: settings.accent_color
                  })
                }}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.primary_color}
                onChange={(e) => {
                  const newSettings = { ...settings, primary_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: e.target.value,
                    secondary: settings.secondary_color,
                    accent: settings.accent_color
                  })
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              اللون الثانوي
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.secondary_color}
                onChange={(e) => {
                  const newSettings = { ...settings, secondary_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: settings.primary_color,
                    secondary: e.target.value,
                    accent: settings.accent_color
                  })
                }}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.secondary_color}
                onChange={(e) => {
                  const newSettings = { ...settings, secondary_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: settings.primary_color,
                    secondary: e.target.value,
                    accent: settings.accent_color
                  })
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              لون التمييز
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.accent_color}
                onChange={(e) => {
                  const newSettings = { ...settings, accent_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: settings.primary_color,
                    secondary: settings.secondary_color,
                    accent: e.target.value
                  })
                }}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.accent_color}
                onChange={(e) => {
                  const newSettings = { ...settings, accent_color: e.target.value }
                  setSettings(newSettings)
                  applyThemeColors({
                    primary: settings.primary_color,
                    secondary: settings.secondary_color,
                    accent: e.target.value
                  })
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Color Preview */}
        <div className="mt-4 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">معاينة الألوان</h4>
          <div className="flex gap-3">
            <div 
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: settings.primary_color }}
            >
              اللون الأساسي
            </div>
            <div 
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: settings.secondary_color }}
            >
              اللون الثانوي
            </div>
            <div 
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: settings.accent_color }}
            >
              لون التمييز
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="inline h-4 w-4 mr-1" />
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={settings.contact_phone}
            onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="+966501234567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline h-4 w-4 mr-1" />
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={settings.contact_email}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="info@juicetry.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            العنوان
          </label>
          <input
            type="text"
            value={settings.contact_address}
            onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="الرياض، المملكة العربية السعودية"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            ساعات العمل
          </label>
          <input
            type="text"
            value={settings.working_hours}
            onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="يومياً من 8 صباحاً - 11 مساءً"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            رقم الواتساب
          </label>
          <input
            type="tel"
            value={settings.whatsapp_number}
            onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="+966501234567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            رابط خرائط جوجل
          </label>
          <input
            type="url"
            value={settings.google_maps_url}
            onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="https://maps.google.com/..."
          />
        </div>
      </div>
    </div>
  )

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Facebook className="inline h-4 w-4 mr-1" />
            رابط فيسبوك
          </label>
          <input
            type="url"
            value={settings.facebook_url}
            onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="https://facebook.com/juicetry"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Twitter className="inline h-4 w-4 mr-1" />
            رابط تويتر
          </label>
          <input
            type="url"
            value={settings.twitter_url}
            onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="https://twitter.com/juicetry"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Instagram className="inline h-4 w-4 mr-1" />
            رابط إنستغرام
          </label>
          <input
            type="url"
            value={settings.instagram_url}
            onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="https://instagram.com/juicetry"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Youtube className="inline h-4 w-4 mr-1" />
            رابط يوتيوب
          </label>
          <input
            type="url"
            value={settings.youtube_url}
            onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="https://youtube.com/juicetry"
          />
        </div>
      </div>
    </div>
  )

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          عنوان الصفحة (Meta Title)
        </label>
        <input
          type="text"
          value={settings.meta_title}
          onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          placeholder="Juicetry - أفضل العصائر الطبيعية"
        />
        <div className="text-xs text-gray-500 mt-1">
          الطول المثالي: 50-60 حرف (الحالي: {settings.meta_title.length})
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          وصف الصفحة (Meta Description)
        </label>
        <textarea
          value={settings.meta_description}
          onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
          rows={3}
          placeholder="اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry..."
        />
        <div className="text-xs text-gray-500 mt-1">
          الطول المثالي: 150-160 حرف (الحالي: {settings.meta_description.length})
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          الكلمات المفتاحية (Meta Keywords)
        </label>
        <input
          type="text"
          value={settings.meta_keywords}
          onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          placeholder="عصائر طبيعية، عصائر طازجة، مشروبات صحية"
        />
        <div className="text-xs text-gray-500 mt-1">
          افصل الكلمات بفاصلة
        </div>
      </div>
    </div>
  )

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          كود Google Analytics
        </label>
        <textarea
          value={settings.analytics_code}
          onChange={(e) => setSettings({ ...settings, analytics_code: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none font-mono text-sm"
          rows={6}
          placeholder="<!-- Google Analytics Code -->"
        />
        <div className="text-xs text-gray-500 mt-1">
          سيتم إدراج هذا الكود في جميع صفحات الموقع
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'contact':
        return renderContactSettings()
      case 'social':
        return renderSocialSettings()
      case 'seo':
        return renderSEOSettings()
      case 'advanced':
        return renderAdvancedSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إعدادات الموقع</h2>
          <p className="text-gray-600 mt-1">إدارة الإعدادات العامة للموقع</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري المعالجة...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SiteSettingsManager
