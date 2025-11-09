import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Home, TrendingUp, Eye, EyeOff } from 'lucide-react'

interface HomePageSettings {
  id?: number
  hero_title: string
  hero_subtitle: string
  hero_description?: string
  hero_cta_text: string
  hero_cta_link: string
  hero_bg_image?: string
  hero_bg_color: string
  features_title: string
  show_stats: boolean
  stat_1_number: string
  stat_1_label: string
  stat_2_number: string
  stat_2_label: string
  stat_3_number: string
  stat_3_label: string
  stat_4_number: string
  stat_4_label: string
  testimonials_title: string
  show_testimonials: boolean
  featured_products_title: string
  show_featured_products: boolean
}

const HomePageManager: React.FC = () => {
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
    testimonials_title: 'آراء عملائنا',
    show_testimonials: true,
    featured_products_title: 'منتجاتنا المميزة',
    show_featured_products: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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

      if (data) {
        setSettings(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب إعدادات الصفحة الرئيسية:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      console.log('🔄 حفظ إعدادات الصفحة الرئيسية...', settings)

      const { error } = await supabase
        .from('home_page_settings')
        .upsert({ ...settings, id: settings.id ?? 1, updated_at: new Date().toISOString() })
        .select()

      if (error) throw error

      console.log('✅ تم الحفظ بنجاح')
      alert('تم حفظ إعدادات الصفحة الرئيسية بنجاح ✅')
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
          <h2 className="text-2xl font-bold text-gray-900">إدارة الصفحة الرئيسية</h2>
          <p className="text-gray-600 mt-1">تحكم كامل في محتوى الصفحة الرئيسية</p>
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
          <div className="flex items-center gap-3 mb-4">
            <Home className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">قسم Hero</h3>
          </div>
          <div className="space-y-4">
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
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (اختياري)</label>
              <textarea
                value={settings.hero_description || ''}
                onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نص الزر</label>
                <input
                  type="text"
                  value={settings.hero_cta_text}
                  onChange={(e) => setSettings({ ...settings, hero_cta_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الزر</label>
                <input
                  type="text"
                  value={settings.hero_cta_link}
                  onChange={(e) => setSettings({ ...settings, hero_cta_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="/menu"
                />
              </div>
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
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-900">الإحصائيات</h3>
            </div>
            <button
              onClick={() => setSettings({ ...settings, show_stats: !settings.show_stats })}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {settings.show_stats ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {settings.show_stats ? 'إخفاء' : 'إظهار'}
            </button>
          </div>
          
          {settings.show_stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">الرقم 1</label>
                <input
                  type="text"
                  value={settings.stat_1_number}
                  onChange={(e) => setSettings({ ...settings, stat_1_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                  placeholder="500+"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">التسمية 1</label>
                <input
                  type="text"
                  value={settings.stat_1_label}
                  onChange={(e) => setSettings({ ...settings, stat_1_label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="عميل سعيد"
                />
              </div>

              {/* Stat 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">الرقم 2</label>
                <input
                  type="text"
                  value={settings.stat_2_number}
                  onChange={(e) => setSettings({ ...settings, stat_2_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                  placeholder="25+"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">التسمية 2</label>
                <input
                  type="text"
                  value={settings.stat_2_label}
                  onChange={(e) => setSettings({ ...settings, stat_2_label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="نوع عصير"
                />
              </div>

              {/* Stat 3 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">الرقم 3</label>
                <input
                  type="text"
                  value={settings.stat_3_number}
                  onChange={(e) => setSettings({ ...settings, stat_3_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                  placeholder="100%"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">التسمية 3</label>
                <input
                  type="text"
                  value={settings.stat_3_label}
                  onChange={(e) => setSettings({ ...settings, stat_3_label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="طبيعي"
                />
              </div>

              {/* Stat 4 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">الرقم 4</label>
                <input
                  type="text"
                  value={settings.stat_4_number}
                  onChange={(e) => setSettings({ ...settings, stat_4_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                  placeholder="24/7"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">التسمية 4</label>
                <input
                  type="text"
                  value={settings.stat_4_label}
                  onChange={(e) => setSettings({ ...settings, stat_4_label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="خدمة"
                />
              </div>
            </div>
          )}
        </div>

        {/* المميزات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">قسم المميزات</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان القسم</label>
            <input
              type="text"
              value={settings.features_title}
              onChange={(e) => setSettings({ ...settings, features_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* الشهادات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">قسم الشهادات</h3>
            <button
              onClick={() => setSettings({ ...settings, show_testimonials: !settings.show_testimonials })}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {settings.show_testimonials ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {settings.show_testimonials ? 'إخفاء' : 'إظهار'}
            </button>
          </div>
          {settings.show_testimonials && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان القسم</label>
              <input
                type="text"
                value={settings.testimonials_title}
                onChange={(e) => setSettings({ ...settings, testimonials_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* المنتجات المميزة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">قسم المنتجات المميزة</h3>
            <button
              onClick={() => setSettings({ ...settings, show_featured_products: !settings.show_featured_products })}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {settings.show_featured_products ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {settings.show_featured_products ? 'إخفاء' : 'إظهار'}
            </button>
          </div>
          {settings.show_featured_products && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان القسم</label>
              <input
                type="text"
                value={settings.featured_products_title}
                onChange={(e) => setSettings({ ...settings, featured_products_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
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

export default HomePageManager
