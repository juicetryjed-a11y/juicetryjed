import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Globe } from 'lucide-react'

interface SEOSettings {
  site_title: string
  site_description: string
  site_keywords: string
  og_image?: string
  og_title?: string
  og_description?: string
  twitter_card?: string
  twitter_title?: string
  twitter_description?: string
}

const SEOManagementTab: React.FC = () => {
  const [settings, setSettings] = useState<SEOSettings | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // جلب الإعدادات من جدول site_settings
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (data) {
        setSettings({
          site_title: data.meta_title || 'Juicetry - جوستري | أفضل عصائر طبيعية طازجة',
          site_description: data.meta_description || 'استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً بأجود المكونات',
          site_keywords: data.meta_keywords || 'عصائر, عصير طبيعي, عصير طازج, Juicetry, جوستري',
          og_title: data.og_title || 'Juicetry - جوستري',
          og_description: data.og_description || 'أفضل عصائر طبيعية طازجة',
          og_image: data.og_image || '',
          twitter_card: data.twitter_card || 'summary_large_image',
          twitter_title: data.twitter_title || '',
          twitter_description: data.twitter_description || '',
        })
      } else {
        // قيم افتراضية إذا لم توجد بيانات
        setSettings({
          site_title: 'Juicetry - جوستري | أفضل عصائر طبيعية طازجة',
          site_description: 'استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً بأجود المكونات',
          site_keywords: 'عصائر, عصير طبيعي, عصير طازج, Juicetry, جوستري',
          og_title: 'Juicetry - جوستري',
          og_description: 'أفضل عصائر طبيعية طازجة',
          twitter_card: 'summary_large_image',
        })
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات SEO:', error)
      // في حالة الخطأ، استخدم القيم الافتراضية
      setSettings({
        site_title: 'Juicetry - جوستري | أفضل عصائر طبيعية طازجة',
        site_description: 'استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً بأجود المكونات',
        site_keywords: 'عصائر, عصير طبيعي, عصير طازج, Juicetry, جوستري',
        og_title: 'Juicetry - جوستري',
        og_description: 'أفضل عصائر طبيعية طازجة',
        twitter_card: 'summary_large_image',
      })
    }
  }

  const handleSave = async () => {
    if (!settings) return

    try {
      setSaving(true)
      
      // تحديث الإعدادات في جدول site_settings
      const { error } = await supabase
        .from('site_settings')
        .update({
          meta_title: settings.site_title,
          meta_description: settings.site_description,
          meta_keywords: settings.site_keywords,
          og_title: settings.og_title,
          og_description: settings.og_description,
          og_image: settings.og_image,
          twitter_card: settings.twitter_card,
          twitter_title: settings.twitter_title,
          twitter_description: settings.twitter_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1) // أو أي id موجود

      if (error) throw error
      
      // تحديث meta tags في الصفحة
      if (typeof document !== 'undefined') {
        document.title = settings.site_title
        let metaDescription = document.querySelector('meta[name="description"]')
        if (!metaDescription) {
          metaDescription = document.createElement('meta')
          metaDescription.setAttribute('name', 'description')
          document.head.appendChild(metaDescription)
        }
        metaDescription.setAttribute('content', settings.site_description)
        
        let metaKeywords = document.querySelector('meta[name="keywords"]')
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta')
          metaKeywords.setAttribute('name', 'keywords')
          document.head.appendChild(metaKeywords)
        }
        metaKeywords.setAttribute('content', settings.site_keywords)
      }
      
      alert('تم حفظ إعدادات SEO بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ إعدادات SEO:', error)
      alert('حدث خطأ في حفظ الإعدادات: ' + error.message)
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
        <div className="flex items-center gap-3 mb-2">
          <Globe className="h-6 w-6 text-juicetry-primary" />
          <h2 className="text-2xl font-bold text-gray-900">إعدادات SEO</h2>
        </div>
        <p className="text-gray-600 mt-1">تحسين محركات البحث للموقع</p>
      </div>

      <div className="space-y-6">
        {/* إعدادات SEO العامة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">إعدادات SEO العامة</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">عنوان الموقع</label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="عنوان الموقع في نتائج البحث"
              />
              <p className="text-xs text-gray-500 mt-1">يظهر في نتائج محركات البحث</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">وصف الموقع</label>
              <textarea
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="وصف مختصر عن الموقع"
              />
              <p className="text-xs text-gray-500 mt-1">يظهر تحت العنوان في نتائج البحث (150-160 حرف)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">الكلمات المفتاحية</label>
              <input
                type="text"
                value={settings.site_keywords}
                onChange={(e) => setSettings({ ...settings, site_keywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="كلمة1, كلمة2, كلمة3"
              />
              <p className="text-xs text-gray-500 mt-1">افصل بين الكلمات بفواصل</p>
            </div>
          </div>
        </div>

        {/* Open Graph (Facebook) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Open Graph (Facebook)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">OG Title</label>
              <input
                type="text"
                value={settings.og_title || ''}
                onChange={(e) => setSettings({ ...settings, og_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">OG Description</label>
              <textarea
                value={settings.og_description || ''}
                onChange={(e) => setSettings({ ...settings, og_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">OG Image URL</label>
              <input
                type="url"
                value={settings.og_image || ''}
                onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">صورة تظهر عند مشاركة الموقع (1200x630px)</p>
            </div>
          </div>
        </div>

        {/* Twitter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Twitter Card</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">نوع البطاقة</label>
              <select
                value={settings.twitter_card || 'summary_large_image'}
                onChange={(e) => setSettings({ ...settings, twitter_card: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Twitter Title</label>
              <input
                type="text"
                value={settings.twitter_title || ''}
                onChange={(e) => setSettings({ ...settings, twitter_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Twitter Description</label>
              <textarea
                value={settings.twitter_description || ''}
                onChange={(e) => setSettings({ ...settings, twitter_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* معاينة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">معاينة نتائج البحث</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-blue-600 text-sm mb-1">www.juicetry.com</div>
            <div className="text-xl text-blue-600 mb-1">{settings.site_title}</div>
            <div className="text-gray-600 text-sm">{settings.site_description}</div>
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
            {saving ? 'جاري الحفظ...' : 'حفظ إعدادات SEO'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SEOManagementTab


