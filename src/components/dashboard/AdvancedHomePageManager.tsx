import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Upload, Image as ImageIcon, Type, Palette, Layout } from 'lucide-react'

interface HomePageSettings {
  id?: number
  // Logo
  logo_url?: string
  logo_width?: number
  logo_height?: number
  
  // Hero Section - Content
  hero_title: string
  hero_subtitle: string
  hero_description?: string
  hero_cta_text: string
  hero_cta_link: string
  hero_bg_color: string
  
  // Hero Title Styling
  hero_title_font_family?: string
  hero_title_font_size?: number
  hero_title_font_weight?: number
  hero_title_color?: string
  hero_title_align?: string
  
  // Hero Subtitle Styling
  hero_subtitle_font_family?: string
  hero_subtitle_font_size?: number
  hero_subtitle_font_weight?: number
  hero_subtitle_color?: string
  hero_subtitle_align?: string
  
  // Hero Description Styling
  hero_description_font_family?: string
  hero_description_font_size?: number
  hero_description_font_weight?: number
  hero_description_color?: string
  hero_description_align?: string
  
  // Button Styling
  cta_button_bg_color?: string
  cta_button_text_color?: string
  cta_button_font_size?: number
  cta_button_border_radius?: number
  
  // Stats
  show_stats: boolean
  stat_1_number: string
  stat_1_label: string
  stat_2_number: string
  stat_2_label: string
  stat_3_number: string
  stat_3_label: string
  stat_4_number: string
  stat_4_label: string
  stats_number_color?: string
  stats_label_color?: string
  stats_number_font_size?: number
  stats_label_font_size?: number
  
  // Features
  features_title: string
  features_icon_color?: string
  features_title_color?: string
  features_description_color?: string
  
  // Custom Fonts
  custom_font_url?: string
  custom_font_name?: string
}

const AdvancedHomePageManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'logo' | 'styling' | 'stats' | 'features'>('content')
  const [settings, setSettings] = useState<HomePageSettings>({
    hero_title: 'Juicetry - جوستري',
    hero_subtitle: 'أفضل عصائر طبيعية طازجة',
    hero_cta_text: 'اطلب الآن',
    hero_cta_link: '/menu',
    hero_bg_color: '#f0fdf4',
    features_title: 'لماذا تختار جوستري؟',
    show_stats: true,
    stat_1_number: '500+',
    stat_1_label: 'عميل سعيد',
    stat_2_number: '25+',
    stat_2_label: 'نوع عصير',
    stat_3_number: '100%',
    stat_3_label: 'طبيعي',
    stat_4_number: '24/7',
    stat_4_label: 'خدمة',
    logo_width: 120,
    logo_height: 120,
    hero_title_font_size: 48,
    hero_title_font_weight: 700,
    hero_title_color: '#166534',
    hero_subtitle_font_size: 24,
    hero_subtitle_color: '#059669',
    cta_button_bg_color: '#22c55e',
    cta_button_text_color: '#ffffff',
    stats_number_color: '#22c55e',
    stats_label_color: '#6b7280',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('home_page_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (data) setSettings(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب الإعدادات:', error)
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url') => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setSettings({ ...settings, [field]: publicUrl })
      alert('تم رفع الصورة بنجاح ✅')
    } catch (error: any) {
      alert(`خطأ في رفع الصورة: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const { error } = await supabase
        .from('home_page_settings')
        .upsert({ ...settings, id: settings.id ?? 1, updated_at: new Date().toISOString() })

      if (error) throw error
      alert('تم حفظ الإعدادات بنجاح ✅')
      await fetchSettings()
    } catch (error: any) {
      alert(`خطأ في الحفظ: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">جاري التحميل...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الصفحة الرئيسية المتقدمة</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {[
          { id: 'content', label: 'المحتوى', icon: Type },
          { id: 'logo', label: 'اللوجو', icon: ImageIcon },
          { id: 'styling', label: 'التصميم', icon: Palette },
          { id: 'stats', label: 'الإحصائيات', icon: Layout },
          { id: 'features', label: 'المميزات', icon: Layout },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">محتوى الصفحة الرئيسية</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الوصف</label>
              <textarea
                value={settings.hero_description || ''}
                onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نص الزر</label>
                <input
                  type="text"
                  value={settings.hero_cta_text}
                  onChange={(e) => setSettings({ ...settings, hero_cta_text: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رابط الزر</label>
                <input
                  type="text"
                  value={settings.hero_cta_link}
                  onChange={(e) => setSettings({ ...settings, hero_cta_link: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">إعدادات اللوجو</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">رفع لوجو جديد</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo_url')}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  <Upload className="h-5 w-5" />
                  {uploading ? 'جاري الرفع...' : 'رفع صورة'}
                </label>
                {settings.logo_url && (
                  <img src={settings.logo_url} alt="Logo" className="h-16 w-16 object-contain border rounded" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">عرض اللوجو (px)</label>
                <input
                  type="number"
                  value={settings.logo_width || 120}
                  onChange={(e) => setSettings({ ...settings, logo_width: parseInt(e.target.value) })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ارتفاع اللوجو (px)</label>
                <input
                  type="number"
                  value={settings.logo_height || 120}
                  onChange={(e) => setSettings({ ...settings, logo_height: parseInt(e.target.value) })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Styling Tab */}
        {activeTab === 'styling' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold mb-4">تصميم النصوص والألوان</h3>
            
            {/* Hero Title */}
            <div className="border-b pb-6">
              <h4 className="font-bold mb-4">العنوان الرئيسي</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">حجم الخط</label>
                  <input
                    type="number"
                    value={settings.hero_title_font_size || 48}
                    onChange={(e) => setSettings({ ...settings, hero_title_font_size: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وزن الخط</label>
                  <select
                    value={settings.hero_title_font_weight || 700}
                    onChange={(e) => setSettings({ ...settings, hero_title_font_weight: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="300">خفيف (300)</option>
                    <option value="400">عادي (400)</option>
                    <option value="500">متوسط (500)</option>
                    <option value="600">نصف عريض (600)</option>
                    <option value="700">عريض (700)</option>
                    <option value="800">عريض جداً (800)</option>
                    <option value="900">أعرض (900)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون الخط</label>
                  <input
                    type="color"
                    value={settings.hero_title_color || '#166534'}
                    onChange={(e) => setSettings({ ...settings, hero_title_color: e.target.value })}
                    className="w-full h-12 border rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Hero Subtitle */}
            <div className="border-b pb-6">
              <h4 className="font-bold mb-4">العنوان الفرعي</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">حجم الخط</label>
                  <input
                    type="number"
                    value={settings.hero_subtitle_font_size || 24}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle_font_size: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وزن الخط</label>
                  <select
                    value={settings.hero_subtitle_font_weight || 500}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle_font_weight: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="300">خفيف (300)</option>
                    <option value="400">عادي (400)</option>
                    <option value="500">متوسط (500)</option>
                    <option value="600">نصف عريض (600)</option>
                    <option value="700">عريض (700)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون الخط</label>
                  <input
                    type="color"
                    value={settings.hero_subtitle_color || '#059669'}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle_color: e.target.value })}
                    className="w-full h-12 border rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-b pb-6">
              <h4 className="font-bold mb-4">الأزرار</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                  <input
                    type="color"
                    value={settings.cta_button_bg_color || '#22c55e'}
                    onChange={(e) => setSettings({ ...settings, cta_button_bg_color: e.target.value })}
                    className="w-full h-12 border rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون النص</label>
                  <input
                    type="color"
                    value={settings.cta_button_text_color || '#ffffff'}
                    onChange={(e) => setSettings({ ...settings, cta_button_text_color: e.target.value })}
                    className="w-full h-12 border rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">الإحصائيات</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.show_stats}
                  onChange={(e) => setSettings({ ...settings, show_stats: e.target.checked })}
                  className="w-5 h-5"
                />
                <span>عرض الإحصائيات</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="border p-4 rounded-lg">
                  <h4 className="font-bold mb-3">إحصائية {num}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">الرقم</label>
                      <input
                        type="text"
                        value={settings[`stat_${num}_number` as keyof HomePageSettings] as string}
                        onChange={(e) => setSettings({ ...settings, [`stat_${num}_number`]: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">النص</label>
                      <input
                        type="text"
                        value={settings[`stat_${num}_label` as keyof HomePageSettings] as string}
                        onChange={(e) => setSettings({ ...settings, [`stat_${num}_label`]: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">لون الأرقام</label>
                <input
                  type="color"
                  value={settings.stats_number_color || '#22c55e'}
                  onChange={(e) => setSettings({ ...settings, stats_number_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">لون النصوص</label>
                <input
                  type="color"
                  value={settings.stats_label_color || '#6b7280'}
                  onChange={(e) => setSettings({ ...settings, stats_label_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">المميزات</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">عنوان قسم المميزات</label>
              <input
                type="text"
                value={settings.features_title}
                onChange={(e) => setSettings({ ...settings, features_title: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">لون الأيقونات</label>
                <input
                  type="color"
                  value={settings.features_icon_color || '#22c55e'}
                  onChange={(e) => setSettings({ ...settings, features_icon_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">لون العناوين</label>
                <input
                  type="color"
                  value={settings.features_title_color || '#1f2937'}
                  onChange={(e) => setSettings({ ...settings, features_title_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">لون الوصف</label>
                <input
                  type="color"
                  value={settings.features_description_color || '#6b7280'}
                  onChange={(e) => setSettings({ ...settings, features_description_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedHomePageManager
