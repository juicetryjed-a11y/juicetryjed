import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Link as LinkIcon, Palette, Phone, Mail, MapPin, Clock } from 'lucide-react'

interface FooterSettings {
  id?: number
  company_name: string
  company_description: string
  company_logo?: string
  phone: string
  email: string
  address: string
  working_hours: string
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  youtube_url?: string
  whatsapp_number?: string
  show_quick_links: boolean
  quick_link_1_text: string
  quick_link_1_url: string
  quick_link_2_text: string
  quick_link_2_url: string
  quick_link_3_text: string
  quick_link_3_url: string
  quick_link_4_text: string
  quick_link_4_url: string
  quick_link_5_text: string
  quick_link_5_url: string
  bg_color: string
  text_color: string
  link_color: string
  link_hover_color: string
  copyright_text: string
  show_copyright: boolean
}

const FooterManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'links' | 'social' | 'design'>('info')
  const [settings, setSettings] = useState<FooterSettings>({
    company_name: 'Juicetry - جوستري',
    company_description: 'أفضل العصائر الطبيعية الطازجة',
    phone: '+966 50 123 4567',
    email: 'info@juicetry.com',
    address: 'الرياض، المملكة العربية السعودية',
    working_hours: 'يومياً من 8 صباحاً - 11 مساءً',
    show_quick_links: true,
    quick_link_1_text: 'الرئيسية',
    quick_link_1_url: '/',
    quick_link_2_text: 'من نحن',
    quick_link_2_url: '/about',
    quick_link_3_text: 'المنتجات',
    quick_link_3_url: '/products',
    quick_link_4_text: 'المقالات',
    quick_link_4_url: '/blog',
    quick_link_5_text: 'تواصل معنا',
    quick_link_5_url: '/contact',
    bg_color: '#1f2937',
    text_color: '#ffffff',
    link_color: '#22c55e',
    link_hover_color: '#16a34a',
    copyright_text: '© 2024 Juicetry. جميع الحقوق محفوظة',
    show_copyright: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (data) setSettings(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب إعدادات الفوتر:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const { error } = await supabase
        .from('footer_settings')
        .upsert({ ...settings, id: settings.id ?? 1, updated_at: new Date().toISOString() })

      if (error) throw error
      alert('تم حفظ إعدادات الفوتر بنجاح ✅')
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
        <h2 className="text-2xl font-bold text-gray-900">إدارة الفوتر</h2>
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
      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        {[
          { id: 'info', label: 'معلومات الشركة', icon: LinkIcon },
          { id: 'contact', label: 'معلومات التواصل', icon: Phone },
          { id: 'links', label: 'الروابط السريعة', icon: LinkIcon },
          { id: 'social', label: 'التواصل الاجتماعي', icon: LinkIcon },
          { id: 'design', label: 'التصميم', icon: Palette },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
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
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">معلومات الشركة</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">اسم الشركة</label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وصف الشركة</label>
              <textarea
                value={settings.company_description}
                onChange={(e) => setSettings({ ...settings, company_description: e.target.value })}
                rows={3}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.show_copyright}
                onChange={(e) => setSettings({ ...settings, show_copyright: e.target.checked })}
                className="w-5 h-5"
              />
              <label className="text-sm font-medium">عرض حقوق النشر</label>
            </div>

            {settings.show_copyright && (
              <div>
                <label className="block text-sm font-medium mb-2">نص حقوق النشر</label>
                <input
                  type="text"
                  value={settings.copyright_text}
                  onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الهاتف
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-3 border rounded-lg"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                العنوان
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                أوقات العمل
              </label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">الروابط السريعة</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.show_quick_links}
                  onChange={(e) => setSettings({ ...settings, show_quick_links: e.target.checked })}
                  className="w-5 h-5"
                />
                <span>عرض الروابط السريعة</span>
              </label>
            </div>

            {settings.show_quick_links && (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-sm mb-1">نص الرابط {num}</label>
                      <input
                        type="text"
                        value={settings[`quick_link_${num}_text` as keyof FooterSettings] as string}
                        onChange={(e) => setSettings({ ...settings, [`quick_link_${num}_text`]: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">عنوان URL</label>
                      <input
                        type="text"
                        value={settings[`quick_link_${num}_url` as keyof FooterSettings] as string}
                        onChange={(e) => setSettings({ ...settings, [`quick_link_${num}_url`]: e.target.value })}
                        className="w-full p-2 border rounded"
                        dir="ltr"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">روابط التواصل الاجتماعي</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">فيسبوك</label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="https://facebook.com/..."
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">إنستجرام</label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="https://instagram.com/..."
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تويتر (X)</label>
              <input
                type="url"
                value={settings.twitter_url || ''}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="https://twitter.com/..."
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">يوتيوب</label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="https://youtube.com/..."
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">واتساب (رقم فقط)</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="+966501234567"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {/* Design Tab */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">ألوان التصميم</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                <input
                  type="color"
                  value={settings.bg_color}
                  onChange={(e) => setSettings({ ...settings, bg_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون النص</label>
                <input
                  type="color"
                  value={settings.text_color}
                  onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون الروابط</label>
                <input
                  type="color"
                  value={settings.link_color}
                  onChange={(e) => setSettings({ ...settings, link_color: e.target.value })}
                  className="w-full h-12 border rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون الروابط عند التمرير</label>
                <input
                  type="color"
                  value={settings.link_hover_color}
                  onChange={(e) => setSettings({ ...settings, link_hover_color: e.target.value })}
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

export default FooterManager
