import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'

interface ContactPageSettings {
  id?: number
  hero_title: string
  hero_subtitle: string
  hero_bg_color: string
  hero_text_color: string
  phone_primary: string
  phone_secondary?: string
  email_primary: string
  email_secondary?: string
  address: string
  working_hours: string
  google_maps_url: string
  google_maps_embed?: string
  map_title: string
  show_map: boolean
  form_title: string
  form_description?: string
  show_form: boolean
  whatsapp_number: string
  whatsapp_message: string
  info_alignment: string
  form_alignment: string
  primary_color: string
  accent_color: string
  text_color: string
}

const ContactPageManager: React.FC = () => {
  const [settings, setSettings] = useState<ContactPageSettings>({
    hero_title: 'تواصل معنا',
    hero_subtitle: 'نحن هنا للإجابة على استفساراتك',
    hero_bg_color: '#f0fdf4',
    hero_text_color: '#166534',
    phone_primary: '+966501234567',
    email_primary: 'info@juicetry.com',
    address: 'الرياض، المملكة العربية السعودية',
    working_hours: 'يومياً من 8 صباحاً - 11 مساءً',
    google_maps_url: 'https://maps.google.com',
    map_title: 'موقعنا',
    show_map: true,
    form_title: 'أرسل لنا رسالة',
    show_form: true,
    whatsapp_number: '+966501234567',
    whatsapp_message: 'مرحباً، أريد الاستفسار عن',
    info_alignment: 'right',
    form_alignment: 'left',
    primary_color: '#22c55e',
    accent_color: '#eab308',
    text_color: '#374151',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_page_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setSettings(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب إعدادات صفحة التواصل:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      console.log('🔄 حفظ إعدادات صفحة التواصل...', settings)

      const { error } = await supabase
        .from('contact_page_settings')
        .upsert({ ...settings, id: settings.id ?? 1, updated_at: new Date().toISOString() })
        .select()

      if (error) throw error

      console.log('✅ تم الحفظ بنجاح')
      alert('تم حفظ إعدادات صفحة التواصل بنجاح ✅')
      await fetchSettings()
    } catch (error: any) {
      console.error('❌ خطأ في الحفظ:', error)
      alert(`حدث خطأ في الحفظ: ${error.message}`)
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة صفحة تواصل معنا</h2>
          <p className="text-gray-600 mt-1">تحكم كامل في محتوى وتنسيق صفحة التواصل</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">قسم Hero</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان الرئيسي</label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان الفرعي</label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">لون الخلفية</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.hero_bg_color}
                  onChange={(e) => setSettings({ ...settings, hero_bg_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.hero_bg_color}
                  onChange={(e) => setSettings({ ...settings, hero_bg_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">لون النص</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.hero_text_color}
                  onChange={(e) => setSettings({ ...settings, hero_text_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.hero_text_color}
                  onChange={(e) => setSettings({ ...settings, hero_text_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* معلومات التواصل */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">معلومات التواصل</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف الأساسي</label>
              <input
                type="text"
                value={settings.phone_primary}
                onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="+966501234567"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف الثانوي (اختياري)</label>
              <input
                type="text"
                value={settings.phone_secondary || ''}
                onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني الأساسي</label>
              <input
                type="email"
                value={settings.email_primary}
                onChange={(e) => setSettings({ ...settings, email_primary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني الثانوي (اختياري)</label>
              <input
                type="email"
                value={settings.email_secondary || ''}
                onChange={(e) => setSettings({ ...settings, email_secondary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل</label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رقم WhatsApp</label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة الافتراضية</label>
              <input
                type="text"
                value={settings.whatsapp_message}
                onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* الخريطة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-gray-900">الخريطة</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.show_map}
                onChange={(e) => setSettings({ ...settings, show_map: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm font-semibold text-gray-700">إظهار الخريطة</label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان الخريطة</label>
              <input
                type="text"
                value={settings.map_title}
                onChange={(e) => setSettings({ ...settings, map_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رابط Google Maps</label>
              <input
                type="url"
                value={settings.google_maps_url}
                onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        </div>

        {/* الألوان والتنسيق */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">الألوان والتنسيق</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">اللون الأساسي</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">لون التمييز</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.accent_color}
                  onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accent_color}
                  onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">لون النص</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.text_color}
                  onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.text_color}
                  onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زر الحفظ السفلي */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </div>
    </div>
  )
}

export default ContactPageManager
