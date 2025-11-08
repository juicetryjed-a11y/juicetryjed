import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save } from 'lucide-react'
import ColorPicker from './ColorPicker'

interface AboutContent {
  id: number
  content: string
  text_color: string
  font_family: string
  font_size: string
  text_alignment: 'right' | 'center' | 'left'
  background_color: string
}

const AboutManagementTab: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from('about_page')
        .select('*')
        .single()

      if (data) {
        setContent(data)
      } else {
        setContent({
          id: 1,
          content: '<h1>مرحباً بكم في Juicetry</h1><p>محتوى صفحة من نحن...</p>',
          text_color: '#291719',
          font_family: 'inherit',
          font_size: '16px',
          text_alignment: 'right',
          background_color: '#ffffff',
        })
      }
    } catch (error) {
      console.error('خطأ في جلب محتوى صفحة من نحن:', error)
    }
  }

  const handleSave = async () => {
    if (!content) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('about_page')
        .upsert(content, { onConflict: 'id' })

      if (error) throw error
      alert('تم حفظ المحتوى بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ المحتوى:', error)
      alert('حدث خطأ في حفظ المحتوى')
    } finally {
      setSaving(false)
    }
  }

  if (!content) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة صفحة من نحن</h2>
        <p className="text-gray-600 mt-1">تحكم كامل في محتوى وألوان وخطوط صفحة من نحن</p>
      </div>

      <div className="space-y-6">
        {/* المحتوى */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">المحتوى</h3>
          <textarea
            value={content.content}
            onChange={(e) => setContent({ ...content, content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
            rows={15}
            placeholder="أدخل محتوى HTML..."
          />
          <p className="text-sm text-gray-500 mt-2">يمكنك استخدام HTML لتنسيق النص</p>
        </div>

        {/* الألوان */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الألوان</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ColorPicker
              label="لون النص"
              value={content.text_color}
              onChange={(color) => setContent({ ...content, text_color: color })}
            />
            <ColorPicker
              label="لون الخلفية"
              value={content.background_color}
              onChange={(color) => setContent({ ...content, background_color: color })}
            />
          </div>
        </div>

        {/* الخط */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الخط</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">نوع الخط</label>
              <input
                type="text"
                value={content.font_family}
                onChange={(e) => setContent({ ...content, font_family: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="inherit, Arial, Cairo..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">حجم الخط</label>
              <input
                type="text"
                value={content.font_size}
                onChange={(e) => setContent({ ...content, font_size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="16px"
              />
            </div>
          </div>
        </div>

        {/* المحاذاة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">المحاذاة</h3>
          <select
            value={content.text_alignment}
            onChange={(e) => setContent({ ...content, text_alignment: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="right">يمين</option>
            <option value="center">وسط</option>
            <option value="left">يسار</option>
          </select>
        </div>

        {/* معاينة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">معاينة</h3>
          <div
            className="p-6 rounded-lg border border-gray-200"
            style={{
              backgroundColor: content.background_color,
              color: content.text_color,
              fontFamily: content.font_family,
              fontSize: content.font_size,
              textAlign: content.text_alignment,
            }}
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
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

export default AboutManagementTab


