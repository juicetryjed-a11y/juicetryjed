import React, { useEffect, useState } from 'react'
import { HomepageDesignSettings, SlideshowSettings, SlideshowImage } from '@/types'
import { supabase } from '@/lib/supabase'
import { 
  Eye, EyeOff, Save, Upload, Trash2, Plus, 
  Monitor, Smartphone, Settings, Image as ImageIcon,
  Palette, Type, RotateCcw
} from 'lucide-react'

type SectionType = 'slideshow' | 'hero' | 'featured_products' | 'categories' | 'reviews' | 'contact'

const HomepageManagementTab: React.FC = () => {
  const [designSettings, setDesignSettings] = useState<Record<string, HomepageDesignSettings>>({})
  const [slideshowSettings, setSlideshowSettings] = useState<SlideshowSettings | null>(null)
  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>([])
  const [activeSection, setActiveSection] = useState<SectionType>('slideshow')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const sections = [
    { id: 'slideshow' as SectionType, label: 'عارض الصور', icon: ImageIcon },
    { id: 'hero' as SectionType, label: 'القسم الرئيسي', icon: Monitor },
    { id: 'featured_products' as SectionType, label: 'المنتجات المميزة', icon: Settings },
    { id: 'categories' as SectionType, label: 'التصنيفات', icon: Type },
    { id: 'reviews' as SectionType, label: 'آراء العملاء', icon: Palette },
    { id: 'contact' as SectionType, label: 'التواصل', icon: Smartphone },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch design settings
      const { data: designData } = await supabase
        .from('homepage_design_settings')
        .select('*')

      // Fetch slideshow settings
      const { data: slideshowSettingsData } = await supabase
        .from('slideshow_settings')
        .select('*')
        .single()

      // Fetch slideshow images
      const { data: slideshowImagesData } = await supabase
        .from('slideshow_images')
        .select('*')
        .order('display_order')

      if (designData) {
        const settingsMap = designData.reduce((acc, setting) => {
          acc[setting.section_name] = setting
          return acc
        }, {} as Record<string, HomepageDesignSettings>)
        setDesignSettings(settingsMap)
      }

      if (slideshowSettingsData) setSlideshowSettings(slideshowSettingsData)
      if (slideshowImagesData) setSlideshowImages(slideshowImagesData)
      
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error)
      setLoading(false)
    }
  }

  const updateDesignSetting = async (section: string, updates: Partial<HomepageDesignSettings>) => {
    try {
      setSaving(true)
      
      const { error } = await supabase
        .from('homepage_design_settings')
        .update(updates)
        .eq('section_name', section)

      if (error) throw error

      setDesignSettings(prev => ({
        ...prev,
        [section]: { ...prev[section], ...updates }
      }))

      alert('تم حفظ التغييرات بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error)
      alert('حدث خطأ في حفظ التغييرات')
    } finally {
      setSaving(false)
    }
  }

  const updateSlideshowSettings = async (updates: Partial<SlideshowSettings>) => {
    try {
      setSaving(true)
      
      const { error } = await supabase
        .from('slideshow_settings')
        .update(updates)
        .eq('id', slideshowSettings?.id)

      if (error) throw error

      setSlideshowSettings(prev => prev ? { ...prev, ...updates } : null)
      alert('تم حفظ إعدادات العارض بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ إعدادات العارض:', error)
      alert('حدث خطأ في حفظ إعدادات العارض')
    } finally {
      setSaving(false)
    }
  }

  const addSlideshowImage = async () => {
    try {
      const newImage = {
        title: 'صورة جديدة',
        subtitle: 'وصف الصورة',
        image_url: 'https://via.placeholder.com/800x400?text=صورة+جديدة',
        is_active: true,
        display_order: slideshowImages.length
      }

      const { data, error } = await supabase
        .from('slideshow_images')
        .insert(newImage)
        .select()
        .single()

      if (error) throw error

      setSlideshowImages(prev => [...prev, data])
    } catch (error) {
      console.error('خطأ في إضافة صورة:', error)
      alert('حدث خطأ في إضافة الصورة')
    }
  }

  const deleteSlideshowImage = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return

    try {
      const { error } = await supabase
        .from('slideshow_images')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSlideshowImages(prev => prev.filter(img => img.id !== id))
    } catch (error) {
      console.error('خطأ في حذف الصورة:', error)
      alert('حدث خطأ في حذف الصورة')
    }
  }

  const renderSlideshowControls = () => {
    if (!slideshowSettings) return null

    return (
      <div className="space-y-6">
        {/* إعدادات العارض */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">إعدادات عارض الصور</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">تفعيل العارض</label>
              <button
                onClick={() => updateSlideshowSettings({ is_enabled: !slideshowSettings.is_enabled })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  slideshowSettings.is_enabled 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {slideshowSettings.is_enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {slideshowSettings.is_enabled ? 'مُفعل' : 'مُعطل'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">التشغيل التلقائي</label>
              <button
                onClick={() => updateSlideshowSettings({ auto_play: !slideshowSettings.auto_play })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  slideshowSettings.auto_play 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {slideshowSettings.auto_play ? 'مُفعل' : 'مُعطل'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">مدة العرض (بالثواني)</label>
              <input
                type="number"
                value={slideshowSettings.auto_play_interval / 1000}
                onChange={(e) => updateSlideshowSettings({ 
                  auto_play_interval: Number(e.target.value) * 1000 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                min="1"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ارتفاع العارض (سطح المكتب)</label>
              <input
                type="text"
                value={slideshowSettings.height_desktop}
                onChange={(e) => updateSlideshowSettings({ height_desktop: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="400px"
              />
            </div>
          </div>
        </div>

        {/* صور العارض */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">صور العارض</h3>
            <button
              onClick={addSlideshowImage}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              إضافة صورة
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slideshowImages.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                <img
                  src={image.image_url}
                  alt={image.title || 'صورة'}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                
                <div className="space-y-2">
                  <input
                    type="text"
                    value={image.title || ''}
                    onChange={(e) => {
                      const updatedImages = slideshowImages.map(img =>
                        img.id === image.id ? { ...img, title: e.target.value } : img
                      )
                      setSlideshowImages(updatedImages)
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="عنوان الصورة"
                  />
                  
                  <input
                    type="text"
                    value={image.subtitle || ''}
                    onChange={(e) => {
                      const updatedImages = slideshowImages.map(img =>
                        img.id === image.id ? { ...img, subtitle: e.target.value } : img
                      )
                      setSlideshowImages(updatedImages)
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="وصف الصورة"
                  />
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const updatedImages = slideshowImages.map(img =>
                          img.id === image.id ? { ...img, is_active: !img.is_active } : img
                        )
                        setSlideshowImages(updatedImages)
                      }}
                      className={`text-xs px-2 py-1 rounded ${
                        image.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {image.is_active ? 'مُفعل' : 'مُعطل'}
                    </button>
                    
                    <button
                      onClick={() => deleteSlideshowImage(image.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderSectionControls = () => {
    const setting = designSettings[activeSection]
    if (!setting) return null

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات {sections.find(s => s.id === activeSection)?.label}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* إظهار/إخفاء */}
          <div>
            <label className="block text-sm font-medium mb-2">عرض القسم</label>
            <button
              onClick={() => updateDesignSetting(activeSection, { is_visible: !setting.is_visible })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                setting.is_visible 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {setting.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {setting.is_visible ? 'ظاهر' : 'مخفي'}
            </button>
          </div>

          {/* لون الخلفية */}
          <div>
            <label className="block text-sm font-medium mb-2">لون الخلفية</label>
            <input
              type="color"
              value={setting.background_color}
              onChange={(e) => updateDesignSetting(activeSection, { background_color: e.target.value })}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          {/* لون النص */}
          <div>
            <label className="block text-sm font-medium mb-2">لون النص</label>
            <input
              type="color"
              value={setting.text_color}
              onChange={(e) => updateDesignSetting(activeSection, { text_color: e.target.value })}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          {/* محاذاة النص */}
          <div>
            <label className="block text-sm font-medium mb-2">محاذاة النص</label>
            <select
              value={setting.text_alignment}
              onChange={(e) => updateDesignSetting(activeSection, { text_alignment: e.target.value as 'center' | 'right' | 'left' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="center">وسط</option>
              <option value="right">يمين</option>
              <option value="left">شمال</option>
            </select>
          </div>

          {/* حجم الخط */}
          <div>
            <label className="block text-sm font-medium mb-2">حجم الخط</label>
            <select
              value={setting.font_size}
              onChange={(e) => updateDesignSetting(activeSection, { font_size: e.target.value as 'small' | 'medium' | 'large' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
          </div>

          {/* المسافة العلوية */}
          <div>
            <label className="block text-sm font-medium mb-2">المسافة العلوية</label>
            <select
              value={setting.padding_top}
              onChange={(e) => updateDesignSetting(activeSection, { padding_top: e.target.value as 'small' | 'normal' | 'large' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="small">صغيرة</option>
              <option value="normal">عادية</option>
              <option value="large">كبيرة</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* تبويبات الأقسام */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* محتوى التبويب النشط */}
      <div className="space-y-6">
        {activeSection === 'slideshow' ? renderSlideshowControls() : renderSectionControls()}
      </div>

      {/* زر الحفظ العام */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={() => window.location.reload()}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          {saving ? 'جاري الحفظ...' : 'تحديث الصفحة'}
        </button>
      </div>
    </div>
  )
}

export default HomepageManagementTab