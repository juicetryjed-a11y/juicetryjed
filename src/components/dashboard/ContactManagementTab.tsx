import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save } from 'lucide-react'
import ColorPicker from './ColorPicker'

interface ContactSettings {
  title: string
  description: string
  form_title: string
  form_background_color: string
  form_text_color: string
  form_font_family: string
  form_font_size: string
  button_color: string
  button_text_color: string
}

const ContactManagementTab: React.FC = () => {
  const [settings, setSettings] = useState<ContactSettings | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('contact_settings')
        .select('*')
        .single()

      if (data) {
        setSettings(data)
      } else {
        setSettings({
          title: 'تواصل معنا',
          description: 'نحن هنا لمساعدتك',
          form_title: 'أرسل لنا رسالة',
          form_background_color: '#ffffff',
          form_text_color: '#291719',
          form_font_family: 'inherit',
          form_font_size: '16px',
          button_color: '#edd674',
          button_text_color: '#291719',
        })
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات صفحة التواصل:', error)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('contact_settings')
        .upsert(settings, { onConflict: 'id' })

      if (error) throw error
      alert('تم حفظ الإعدادات بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error)
      alert('حدث خطأ في حفظ الإعدادات')
    } finally {
      setSaving(false)
    }
  }

  if (!settings) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة صفحة التواصل</h2>
        <p className="text-gray-600 mt-1">تحكم كامل في نصوص وألوان وخطوط صفحة التواصل</p>
      </div>

      <div className="space-y-6">
        {/* النصوص */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">النصوص</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">عنوان الصفحة</label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">الوصف</label>
              <textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">عنوان النموذج</label>
              <input
                type="text"
                value={settings.form_title}
                onChange={(e) => setSettings({ ...settings, form_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* ألوان النموذج */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">ألوان النموذج</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ColorPicker
              label="لون خلفية النموذج"
              value={settings.form_background_color}
              onChange={(color) => setSettings({ ...settings, form_background_color: color })}
            />
            <ColorPicker
              label="لون نص النموذج"
              value={settings.form_text_color}
              onChange={(color) => setSettings({ ...settings, form_text_color: color })}
            />
          </div>
        </div>

        {/* خط النموذج */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">خط النموذج</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">نوع الخط</label>
              <input
                type="text"
                value={settings.form_font_family}
                onChange={(e) => setSettings({ ...settings, form_font_family: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">حجم الخط</label>
              <input
                type="text"
                value={settings.form_font_size}
                onChange={(e) => setSettings({ ...settings, form_font_size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* ألوان الزر */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">ألوان الزر</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ColorPicker
              label="لون الزر"
              value={settings.button_color}
              onChange={(color) => setSettings({ ...settings, button_color: color })}
            />
            <ColorPicker
              label="لون نص الزر"
              value={settings.button_text_color}
              onChange={(color) => setSettings({ ...settings, button_text_color: color })}
            />
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
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactManagementTab


