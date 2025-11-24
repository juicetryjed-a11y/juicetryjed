import React, { useState, useEffect } from 'react'
import { Save, Layout, Eye, EyeOff, Plus, Trash2, Edit } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ImageUploader from '@/components/ui/ImageUploader'

interface HeaderSettings {
  id?: number
  show_logo: boolean
  logo_url: string
  show_search: boolean
  show_cart: boolean
  show_user_menu: boolean
  navigation_items: NavigationItem[]
  header_background: string
  header_text_color: string
  sticky_header: boolean
  announcement_bar: boolean
  announcement_text: string
  announcement_color: string
  created_at?: string
  updated_at?: string
}

interface NavigationItem {
  id: string
  label: string
  url: string
  is_active: boolean
  order_index: number
}

const HeaderSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<HeaderSettings>({
    show_logo: true,
    logo_url: '',
    show_search: true,
    show_cart: true,
    show_user_menu: true,
    navigation_items: [
      { id: '1', label: 'الرئيسية', url: '/', is_active: true, order_index: 1 },
      { id: '2', label: 'المنتجات', url: '/menu', is_active: true, order_index: 2 },
      { id: '3', label: 'من نحن', url: '/about', is_active: true, order_index: 3 },
      { id: '4', label: 'المقالات', url: '/blog', is_active: true, order_index: 4 },
      { id: '5', label: 'تواصل معنا', url: '/contact', is_active: true, order_index: 5 }
    ],
    header_background: '#ffffff',
    header_text_color: '#1f2937',
    sticky_header: true,
    announcement_bar: false,
    announcement_text: 'خصم 20% على جميع العصائر الطبيعية! 🎉',
    announcement_color: '#22c55e'
  })
  const [loading, setLoading] = useState(false)
  const [showNavModal, setShowNavModal] = useState(false)
  const [editingNavItem, setEditingNavItem] = useState<NavigationItem | null>(null)
  const [navFormData, setNavFormData] = useState({
    label: '',
    url: '',
    is_active: true
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('header_settings')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        // Ensure navigation_items is always an array to prevent map errors
        setSettings({
          ...data,
          navigation_items: Array.isArray(data.navigation_items) ? data.navigation_items : []
        })
      }
    } catch (error) {
      console.error('Error loading header settings:', error)
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

      if (settings.id) {
        const { error } = await supabase
          .from('header_settings')
          .update(settingsData)
          .eq('id', settings.id)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('header_settings')
          .insert([settingsData])
          .select()
          .single()

        if (error) throw error
        setSettings({ ...settingsData, id: data.id })
      }

      alert('تم حفظ إعدادات الهيدر بنجاح!')
    } catch (error) {
      console.error('Error saving header settings:', error)
      alert('حدث خطأ أثناء حفظ الإعدادات')
    } finally {
      setLoading(false)
    }
  }

  const addNavigationItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: navFormData.label,
      url: navFormData.url,
      is_active: navFormData.is_active,
      order_index: (settings.navigation_items?.length || 0) + 1
    }

    setSettings({
      ...settings,
      navigation_items: [...(settings.navigation_items || []), newItem]
    })

    setNavFormData({ label: '', url: '', is_active: true })
    setShowNavModal(false)
  }

  const updateNavigationItem = () => {
    if (!editingNavItem) return

    const updatedItems = settings.navigation_items?.map(item =>
      item.id === editingNavItem.id
        ? { ...item, label: navFormData.label, url: navFormData.url, is_active: navFormData.is_active }
        : item
    ) || []

    setSettings({
      ...settings,
      navigation_items: updatedItems
    })

    setEditingNavItem(null)
    setNavFormData({ label: '', url: '', is_active: true })
    setShowNavModal(false)
  }

  const deleteNavigationItem = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return

    const updatedItems = settings.navigation_items?.filter(item => item.id !== id) || []
    setSettings({
      ...settings,
      navigation_items: updatedItems
    })
  }

  const toggleNavigationItem = (id: string) => {
    const updatedItems = settings.navigation_items?.map(item =>
      item.id === id ? { ...item, is_active: !item.is_active } : item
    ) || []

    setSettings({
      ...settings,
      navigation_items: updatedItems
    })
  }

  const openEditModal = (item: NavigationItem) => {
    setEditingNavItem(item)
    setNavFormData({
      label: item.label,
      url: item.url,
      is_active: item.is_active
    })
    setShowNavModal(true)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إعدادات الهيدر</h2>
          <p className="text-gray-600 mt-1">تخصيص شريط التنقل العلوي للموقع</p>
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

      <div className="space-y-8">
        {/* Logo Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Layout className="h-5 w-5" />
            إعدادات الشعار
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="show_logo"
                  checked={settings.show_logo}
                  onChange={(e) => setSettings({ ...settings, show_logo: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="show_logo" className="text-sm font-semibold text-gray-700">
                  إظهار الشعار في الهيدر
                </label>
              </div>

              {settings.show_logo && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    شعار الهيدر
                  </label>
                  <ImageUploader
                    currentImage={settings.logo_url}
                    onUpload={(url) => setSettings({ ...settings, logo_url: url })}
                    folder="header"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layout className="h-5 w-5" />
              عناصر التنقل
            </h3>
            <button
              onClick={() => {
                setEditingNavItem(null)
                setNavFormData({ label: '', url: '', is_active: true })
                setShowNavModal(true)
              }}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              إضافة عنصر
            </button>
          </div>

          <div className="space-y-3">
            {settings.navigation_items && settings.navigation_items.length > 0 ? (
              settings.navigation_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleNavigationItem(item.id)}
                      className={`p-1 rounded ${item.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNavigationItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                لا توجد عناصر تنقل. أضف عنصراً جديداً للبدء.
              </div>
            )}
          </div>
        </div>

        {/* Header Appearance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">مظهر الهيدر</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                لون خلفية الهيدر
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.header_background}
                  onChange={(e) => setSettings({ ...settings, header_background: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.header_background}
                  onChange={(e) => setSettings({ ...settings, header_background: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                لون النص
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.header_text_color}
                  onChange={(e) => setSettings({ ...settings, header_text_color: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.header_text_color}
                  onChange={(e) => setSettings({ ...settings, header_text_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="sticky_header"
                checked={settings.sticky_header}
                onChange={(e) => setSettings({ ...settings, sticky_header: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="sticky_header" className="text-sm font-semibold text-gray-700">
                هيدر ثابت (يبقى ظاهراً عند التمرير)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="show_search"
                checked={settings.show_search}
                onChange={(e) => setSettings({ ...settings, show_search: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="show_search" className="text-sm font-semibold text-gray-700">
                إظهار مربع البحث
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="show_cart"
                checked={settings.show_cart}
                onChange={(e) => setSettings({ ...settings, show_cart: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="show_cart" className="text-sm font-semibold text-gray-700">
                إظهار أيقونة السلة
              </label>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">شريط الإعلانات</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="announcement_bar"
                checked={settings.announcement_bar}
                onChange={(e) => setSettings({ ...settings, announcement_bar: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="announcement_bar" className="text-sm font-semibold text-gray-700">
                إظهار شريط الإعلانات
              </label>
            </div>

            {settings.announcement_bar && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    نص الإعلان
                  </label>
                  <input
                    type="text"
                    value={settings.announcement_text}
                    onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="أدخل نص الإعلان..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    لون شريط الإعلان
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.announcement_color}
                      onChange={(e) => setSettings({ ...settings, announcement_color: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.announcement_color}
                      onChange={(e) => setSettings({ ...settings, announcement_color: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Modal */}
      {showNavModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingNavItem ? 'تحرير عنصر التنقل' : 'إضافة عنصر تنقل جديد'}
              </h3>
              <button
                onClick={() => setShowNavModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  النص المعروض
                </label>
                <input
                  type="text"
                  value={navFormData.label}
                  onChange={(e) => setNavFormData({ ...navFormData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="مثال: الرئيسية"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  الرابط
                </label>
                <input
                  type="text"
                  value={navFormData.url}
                  onChange={(e) => setNavFormData({ ...navFormData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="مثال: /"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="nav_is_active"
                  checked={navFormData.is_active}
                  onChange={(e) => setNavFormData({ ...navFormData, is_active: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="nav_is_active" className="text-sm font-semibold text-gray-700">
                  عنصر نشط
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingNavItem ? updateNavigationItem : addNavigationItem}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  {editingNavItem ? 'تحديث' : 'إضافة'}
                </button>
                <button
                  onClick={() => setShowNavModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default HeaderSettingsManager
