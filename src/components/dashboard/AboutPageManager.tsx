import React, { useState, useEffect } from 'react'
import { Save, MapPin, Palette, Type, Eye, EyeOff, Image, Link } from 'lucide-react'
import { dataService } from '@/lib/dataService'

interface AboutPageSettings {
  id?: number
  title: string
  subtitle: string
  description: string
  mission_title: string
  mission_text: string
  vision_title: string
  vision_text: string
  values_title: string
  values_text: string
  location_name: string
  location_address: string
  location_url: string
  background_color: string
  text_color: string
  accent_color: string
  title_color: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

const AboutPageManager: React.FC = () => {
  const [settings, setSettings] = useState<AboutPageSettings>({
    title: 'من نحن',
    subtitle: 'قصة Juicetry - جوستري',
    description: 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
    mission_title: 'رسالتنا',
    mission_text: 'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف، لنساهم في تحسين صحة عملائنا وتقديم تجربة منعشة ولذيذة.',
    vision_title: 'رؤيتنا',
    vision_text: 'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة، ونشر ثقافة الغذاء الصحي والطبيعي.',
    values_title: 'قيمنا',
    values_text: 'الجودة، الطبيعية، الصحة، الطعم الأصيل، خدمة العملاء المتميزة، والالتزام بأعلى معايير النظافة والسلامة.',
    location_name: 'موقع المحل',
    location_address: 'الرياض، المملكة العربية السعودية',
    location_url: 'https://maps.google.com',
    background_color: '#f8fafc',
    text_color: '#374151',
    accent_color: '#22c55e',
    title_color: '#1f2937',
    is_active: true
  })

  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data } = await dataService.getAboutPageSettings()
      if (data && data.length > 0) {
        setSettings(data[0])
      }
    } catch (error) {
      console.error('Error loading about page settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await dataService.updateAboutPageSettings(settings)
      if (error) throw error
      alert('✅ تم حفظ إعدادات صفحة "من نحن" بنجاح!')
    } catch (error) {
      console.error('Error saving about page settings:', error)
      alert('❌ حدث خطأ أثناء حفظ الإعدادات')
    } finally {
      setLoading(false)
    }
  }

  const colorPresets = [
    { name: 'الأخضر الطبيعي', bg: '#f0fdf4', text: '#374151', accent: '#22c55e', title: '#166534' },
    { name: 'الأزرق الهادئ', bg: '#f0f9ff', text: '#374151', accent: '#3b82f6', title: '#1e40af' },
    { name: 'البرتقالي المنعش', bg: '#fff7ed', text: '#374151', accent: '#f97316', title: '#ea580c' },
    { name: 'البنفسجي الأنيق', bg: '#faf5ff', text: '#374151', accent: '#a855f7', title: '#7c3aed' },
    { name: 'الوردي الناعم', bg: '#fdf2f8', text: '#374151', accent: '#ec4899', title: '#be185d' }
  ]

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setSettings({
      ...settings,
      background_color: preset.bg,
      text_color: preset.text,
      accent_color: preset.accent,
      title_color: preset.title
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل إعدادات صفحة "من نحن"...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة صفحة "من نحن"</h2>
          <p className="text-gray-600 mt-1">تخصيص محتوى وتصميم صفحة "من نحن"</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              previewMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? 'إخفاء المعاينة' : 'معاينة'}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* نموذج التحرير */}
        <div className="space-y-6">
          {/* المحتوى الأساسي */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Type className="h-5 w-5 text-blue-600" />
              المحتوى الأساسي
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الرئيسي</label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.subtitle}
                  onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف العام</label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* الأقسام الفرعية */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الأقسام الفرعية</h3>
            
            <div className="space-y-6">
              {/* الرسالة */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الرسالة</label>
                    <input
                      type="text"
                      value={settings.mission_title}
                      onChange={(e) => setSettings({ ...settings, mission_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نص الرسالة</label>
                    <textarea
                      value={settings.mission_text}
                      onChange={(e) => setSettings({ ...settings, mission_text: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* الرؤية */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الرؤية</label>
                    <input
                      type="text"
                      value={settings.vision_title}
                      onChange={(e) => setSettings({ ...settings, vision_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نص الرؤية</label>
                    <textarea
                      value={settings.vision_text}
                      onChange={(e) => setSettings({ ...settings, vision_text: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* القيم */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان القيم</label>
                    <input
                      type="text"
                      value={settings.values_title}
                      onChange={(e) => setSettings({ ...settings, values_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نص القيم</label>
                    <textarea
                      value={settings.values_text}
                      onChange={(e) => setSettings({ ...settings, values_text: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* موقع المحل */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              موقع المحل
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
                <input
                  type="text"
                  value={settings.location_name}
                  onChange={(e) => setSettings({ ...settings, location_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="مثال: فرع الرياض الرئيسي"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.location_address}
                  onChange={(e) => setSettings({ ...settings, location_address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="العنوان الكامل للمحل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  رابط خرائط جوجل
                </label>
                <input
                  type="url"
                  value={settings.location_url}
                  onChange={(e) => setSettings({ ...settings, location_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  انسخ الرابط من خرائط جوجل لموقع المحل
                </p>
              </div>
            </div>
          </div>

          {/* الألوان والتصميم */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-600" />
              الألوان والتصميم
            </h3>
            
            {/* قوالب الألوان الجاهزة */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">قوالب الألوان الجاهزة</label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPreset(preset)}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-right"
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.bg }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.title }}></div>
                    </div>
                    <span className="text-sm font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ألوان مخصصة */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون الخلفية</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.background_color}
                    onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.background_color}
                    onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون النص</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.text_color}
                    onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.text_color}
                    onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون المميز</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون العناوين</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.title_color}
                    onChange={(e) => setSettings({ ...settings, title_color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.title_color}
                    onChange={(e) => setSettings({ ...settings, title_color: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* حالة التفعيل */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={settings.is_active}
                  onChange={(e) => setSettings({ ...settings, is_active: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  تفعيل صفحة "من نحن"
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* المعاينة */}
        {previewMode && (
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-semibold text-gray-900">معاينة الصفحة</h3>
              </div>
              
              <div 
                className="p-8 min-h-96"
                style={{ 
                  backgroundColor: settings.background_color,
                  color: settings.text_color 
                }}
              >
                {/* العنوان الرئيسي */}
                <div className="text-center mb-8">
                  <h1 
                    className="text-3xl font-bold mb-2"
                    style={{ color: settings.title_color }}
                  >
                    {settings.title}
                  </h1>
                  <p 
                    className="text-xl"
                    style={{ color: settings.accent_color }}
                  >
                    {settings.subtitle}
                  </p>
                </div>

                {/* الوصف العام */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-center">
                    {settings.description}
                  </p>
                </div>

                {/* الأقسام */}
                <div className="space-y-6">
                  {/* الرسالة */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-6">
                    <h2 
                      className="text-xl font-bold mb-3"
                      style={{ color: settings.title_color }}
                    >
                      {settings.mission_title}
                    </h2>
                    <p>{settings.mission_text}</p>
                  </div>

                  {/* الرؤية */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-6">
                    <h2 
                      className="text-xl font-bold mb-3"
                      style={{ color: settings.title_color }}
                    >
                      {settings.vision_title}
                    </h2>
                    <p>{settings.vision_text}</p>
                  </div>

                  {/* القيم */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-6">
                    <h2 
                      className="text-xl font-bold mb-3"
                      style={{ color: settings.title_color }}
                    >
                      {settings.values_title}
                    </h2>
                    <p>{settings.values_text}</p>
                  </div>

                  {/* الموقع */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-6">
                    <h2 
                      className="text-xl font-bold mb-3"
                      style={{ color: settings.title_color }}
                    >
                      {settings.location_name}
                    </h2>
                    <p className="mb-3">{settings.location_address}</p>
                    <a
                      href={settings.location_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: settings.accent_color,
                        color: 'white'
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                      عرض الموقع على الخريطة
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutPageManager
