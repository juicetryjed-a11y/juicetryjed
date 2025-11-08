import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Save, Trash2, Plus, MoveUp, MoveDown } from 'lucide-react'
import ColorPicker from './ColorPicker'

interface HeaderSettings {
  logo_url?: string
  logo_position: 'right' | 'center' | 'left'
  menu_items: Array<{
    id: number
    label_ar: string
    label_en: string
    url: string
    position: 'right' | 'center' | 'left'
    is_visible: boolean
    order: number
  }>
  background_color: string
  text_color: string
  font_family: string
  font_size: string
}

const HeaderManagementTab: React.FC = () => {
  const [settings, setSettings] = useState<HeaderSettings | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('header_settings')
        .select('*')
        .single()

      if (data) {
        const defaultSettings: HeaderSettings = {
          logo_url: undefined,
          logo_position: 'right',
          menu_items: [],
          background_color: '#ffffff',
          text_color: '#291719',
          font_family: 'inherit',
          font_size: '16px',
        }
        setSettings({
          ...defaultSettings,
          ...(data as Partial<HeaderSettings>),
          menu_items: (data as any).menu_items ?? [],
        })
      } else {
        setSettings({
          logo_url: undefined,
          logo_position: 'right',
          menu_items: [],
          background_color: '#ffffff',
          text_color: '#291719',
          font_family: 'inherit',
          font_size: '16px',
        })
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات الهيدر:', error)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    try {
      setSaving(true)
      
      // إرسال الحقول الأساسية فقط - تجربة تدريجية
      const cleanSettings: any = {
        id: 1,
        menu_items: settings.menu_items || []
      }

      // إضافة الحقول واحد تلو الآخر لتجنب أخطاء Schema
      if (settings.logo_url !== undefined) {
        cleanSettings.logo_url = settings.logo_url
      }

      console.log('محاولة حفظ البيانات:', cleanSettings)

      const { data, error } = await supabase
        .from('header_settings')
        .upsert(cleanSettings, { onConflict: 'id' })
        .select()

      if (error) {
        console.error('تفاصيل الخطأ:', error)
        throw error
      }

      console.log('تم الحفظ بنجاح:', data)
      alert('تم حفظ الإعدادات بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error)
      alert(`حدث خطأ في حفظ الإعدادات: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings) return

    try {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة صالح')
        return
      }

      // التحقق من حجم الملف (أقل من 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result && settings) {
          setSettings({ ...settings, logo_url: event.target.result as string })
        }
      }
      reader.onerror = () => {
        alert('حدث خطأ في قراءة الملف')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('خطأ في رفع الشعار:', error)
      alert('حدث خطأ في رفع الشعار')
    }
  }

  const addMenuItem = () => {
    if (!settings) return
    const newItem = {
      id: Date.now(),
      label_ar: 'عنصر جديد',
      label_en: 'New Item',
      url: '/',
      position: 'right' as const,
      is_visible: true,
      order: (settings.menu_items?.length ?? 0) + 1,
    }
    setSettings({
      ...settings,
      menu_items: [...(settings.menu_items ?? []), newItem],
    })
  }

  const updateMenuItem = (id: number, updates: Partial<HeaderSettings['menu_items'][0]>) => {
    if (!settings) return
    setSettings({
      ...settings,
      menu_items: settings.menu_items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })
  }

  const deleteMenuItem = (id: number) => {
    if (!settings) return
    setSettings({
      ...settings,
      menu_items: settings.menu_items.filter(item => item.id !== id),
    })
  }

  if (!settings) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الهيدر</h2>
        <p className="text-gray-600 mt-1">تحكم كامل في الهيدر والشعار والقائمة</p>
      </div>

      <div className="space-y-6">
        {/* إعدادات الشعار */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الشعار</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">رفع الشعار</label>
              <div className="flex items-center gap-4">
                {settings.logo_url && (
                  <img src={settings.logo_url} alt="Logo" className="h-16 w-auto" />
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <span className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors inline-flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {settings.logo_url ? 'تغيير الشعار' : 'رفع شعار'}
                  </span>
                </label>
                {settings.logo_url && (
                  <button
                    onClick={() => setSettings({ ...settings, logo_url: undefined })}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">موقع الشعار</label>
              <select
                value={settings.logo_position}
                onChange={(e) => setSettings({ ...settings, logo_position: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="right">يمين</option>
                <option value="center">وسط</option>
                <option value="left">يسار</option>
              </select>
            </div>
          </div>
        </div>

        {/* إعدادات الألوان */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الألوان</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ColorPicker
              label="لون الخلفية"
              value={settings.background_color}
              onChange={(color) => setSettings({ ...settings, background_color: color })}
            />
            <ColorPicker
              label="لون النص"
              value={settings.text_color}
              onChange={(color) => setSettings({ ...settings, text_color: color })}
            />
          </div>
        </div>

        {/* إعدادات الخط */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الخط</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">نوع الخط</label>
              <input
                type="text"
                value={settings.font_family}
                onChange={(e) => setSettings({ ...settings, font_family: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="inherit, Arial, Cairo..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">حجم الخط</label>
              <input
                type="text"
                value={settings.font_size}
                onChange={(e) => setSettings({ ...settings, font_size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="16px"
              />
            </div>
          </div>
        </div>

        {/* قائمة التنقل */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">قائمة التنقل</h3>
            <button
              onClick={addMenuItem}
              className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              إضافة عنصر
            </button>
          </div>

          <div className="space-y-4">
            {(settings.menu_items ?? []).map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">النص (عربي)</label>
                    <input
                      type="text"
                      value={item.label_ar}
                      onChange={(e) => updateMenuItem(item.id, { label_ar: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">النص (إنجليزي)</label>
                    <input
                      type="text"
                      value={item.label_en}
                      onChange={(e) => updateMenuItem(item.id, { label_en: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">الرابط</label>
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => updateMenuItem(item.id, { url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">الموقع</label>
                    <select
                      value={item.position}
                      onChange={(e) => updateMenuItem(item.id, { position: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="right">يمين</option>
                      <option value="center">وسط</option>
                      <option value="left">يسار</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.is_visible}
                      onChange={(e) => updateMenuItem(item.id, { is_visible: e.target.checked })}
                    />
                    <span>ظاهر</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (index > 0) {
                          const newItems = [...settings.menu_items]
                          const temp = newItems[index]
                          newItems[index] = newItems[index - 1]
                          newItems[index - 1] = temp
                          setSettings({ ...settings, menu_items: newItems })
                        }
                      }}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (index < settings.menu_items.length - 1) {
                          const newItems = [...settings.menu_items]
                          const temp = newItems[index]
                          newItems[index] = newItems[index + 1]
                          newItems[index + 1] = temp
                          setSettings({ ...settings, menu_items: newItems })
                        }
                      }}
                      disabled={index === settings.menu_items.length - 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                      <MoveDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-juicetry-primary text-juicetry-dark px-6 py-3 rounded-lg font-semibold hover:bg-juicetry-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="h-5 w-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderManagementTab


