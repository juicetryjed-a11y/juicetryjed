import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Save, Trash2, Plus } from 'lucide-react'

interface Font {
  id: number
  name: string
  font_family: string
  font_url?: string
  is_custom: boolean
  applied_to?: string[]
}

const FontsManagementTab: React.FC = () => {
  const [fonts, setFonts] = useState<Font[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchFonts()
  }, [])

  const fetchFonts = async () => {
    try {
      const { data } = await supabase
        .from('custom_fonts')
        .select('*')
        .order('name')

      if (data) setFonts(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب الخطوط:', error)
      setLoading(false)
    }
  }

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // هنا يمكن رفع ملف الخط إلى Supabase Storage
    // للتبسيط، سنستخدم URL مباشر
    const fontName = file.name.replace(/\.[^/.]+$/, '')
    const newFont: Font = {
      id: Date.now(),
      name: fontName,
      font_family: fontName,
      font_url: URL.createObjectURL(file),
      is_custom: true,
      applied_to: [],
    }
    setFonts([...fonts, newFont])
  }

  const deleteFont = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الخط؟')) return

    try {
      const { error } = await supabase
        .from('custom_fonts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setFonts(fonts.filter(f => f.id !== id))
      alert('تم حذف الخط بنجاح')
    } catch (error) {
      console.error('خطأ في حذف الخط:', error)
      alert('حدث خطأ في حذف الخط')
    }
  }

  const applyFontTo = (fontId: number, target: string) => {
    setFonts(fonts.map(font => {
      if (font.id === fontId) {
        const applied = font.applied_to || []
        if (applied.includes(target)) {
          return { ...font, applied_to: applied.filter(t => t !== target) }
        } else {
          return { ...font, applied_to: [...applied, target] }
        }
      }
      return font
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const { error } = await supabase
        .from('custom_fonts')
        .upsert(fonts, { onConflict: 'id' })

      if (error) throw error
      alert('تم حفظ الخطوط بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الخطوط:', error)
      alert('حدث خطأ في حفظ الخطوط')
    } finally {
      setSaving(false)
    }
  }

  const fontTargets = [
    { id: 'header', label: 'الهيدر' },
    { id: 'body', label: 'النص الرئيسي' },
    { id: 'buttons', label: 'الأزرار' },
    { id: 'headings', label: 'العناوين' },
  ]

  if (loading) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الخطوط</h2>
        <p className="text-gray-600 mt-1">رفع وتطبيق خطوط مخصصة على أجزاء الموقع</p>
      </div>

      <div className="space-y-6">
        {/* رفع خط جديد */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              onChange={handleFontUpload}
              className="hidden"
            />
            <span className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              رفع خط جديد
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-2">يدعم: TTF, OTF, WOFF, WOFF2</p>
        </div>

        {/* الخطوط المتاحة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">الخطوط المتاحة</h3>
          
          <div className="space-y-4">
            {/* خطوط النظام */}
            <div>
              <h4 className="font-semibold mb-2">خطوط النظام</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {['Arial', 'Cairo', 'Noto Sans Arabic', 'Tahoma'].map((fontName) => (
                  <div key={fontName} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{fontName}</span>
                    </div>
                    <p style={{ fontFamily: fontName }} className="text-lg">
                      عينة من النص العربي {fontName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* الخطوط المخصصة */}
            {fonts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">الخطوط المخصصة</h4>
                <div className="space-y-4">
                  {fonts.map((font) => (
                    <div key={font.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold">{font.name}</h5>
                          <p className="text-sm text-gray-500">{font.font_family}</p>
                        </div>
                        <button
                          onClick={() => deleteFont(font.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {font.font_url && (
                        <style>
                          {`@font-face {
                            font-family: '${font.font_family}';
                            src: url('${font.font_url}') format('truetype');
                          }`}
                        </style>
                      )}
                      
                      <p 
                        style={{ fontFamily: font.font_family }}
                        className="text-lg mb-4"
                      >
                        عينة من النص العربي {font.name}
                      </p>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">تطبيق على:</label>
                        <div className="flex flex-wrap gap-2">
                          {fontTargets.map((target) => (
                            <label key={target.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={(font.applied_to || []).includes(target.id)}
                                onChange={() => applyFontTo(font.id, target.id)}
                              />
                              <span>{target.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* زر الحفظ */}
        {fonts.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

export default FontsManagementTab


