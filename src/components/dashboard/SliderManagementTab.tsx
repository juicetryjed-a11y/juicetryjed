import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Save, Trash2, Plus, Eye, EyeOff } from 'lucide-react'

interface SliderImage {
  id: number
  image_url: string
  title?: string
  subtitle?: string
  link_url?: string
  is_active: boolean
  display_order: number
}

const SliderManagementTab: React.FC = () => {
  const [images, setImages] = useState<SliderImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data } = await supabase
        .from('slider_images')
        .select('*')
        .order('display_order')

      if (data) setImages(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب صور السلايدر:', error)
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const newImage: SliderImage = {
        id: Date.now(),
        image_url: event.target?.result as string,
        title: '',
        subtitle: '',
        link_url: '',
        is_active: true,
        display_order: images.length + 1,
      }
      setImages([...images, newImage])
    }
    reader.readAsDataURL(file)
  }

  const updateImage = (id: number, updates: Partial<SliderImage>) => {
    setImages(images.map(img => img.id === id ? { ...img, ...updates } : img))
  }

  const deleteImage = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      setImages(images.filter(img => img.id !== id))
    }
  }

  const toggleActive = (id: number) => {
    updateImage(id, { is_active: !images.find(img => img.id === id)?.is_active })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      // حذف الصور القديمة
      await supabase.from('slider_images').delete().neq('id', 0)
      
      // إضافة الصور الجديدة
      const { error } = await supabase
        .from('slider_images')
        .insert(images.map((img, index) => ({
          ...img,
          display_order: index + 1,
        })))

      if (error) throw error
      alert('تم حفظ الصور بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ الصور:', error)
      alert('حدث خطأ في حفظ الصور')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة السلايدر</h2>
        <p className="text-gray-600 mt-1">رفع وإدارة صور السلايدر الرئيسي</p>
      </div>

      <div className="space-y-6">
        {/* رفع صورة جديدة */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة صورة جديدة
            </span>
          </label>
        </div>

        {/* قائمة الصور */}
        <div className="space-y-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* معاينة الصورة */}
                <div>
                  <img
                    src={image.image_url}
                    alt={image.title || 'Slider Image'}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* معلومات الصورة */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">العنوان</label>
                    <input
                      type="text"
                      value={image.title || ''}
                      onChange={(e) => updateImage(image.id, { title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="عنوان الصورة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">العنوان الفرعي</label>
                    <input
                      type="text"
                      value={image.subtitle || ''}
                      onChange={(e) => updateImage(image.id, { subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="عنوان فرعي"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">رابط (اختياري)</label>
                    <input
                      type="url"
                      value={image.link_url || ''}
                      onChange={(e) => updateImage(image.id, { link_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={image.is_active}
                        onChange={() => toggleActive(image.id)}
                      />
                      <span>نشط</span>
                    </label>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">لا توجد صور في السلايدر</p>
          </div>
        )}

        {/* زر الحفظ */}
        {images.length > 0 && (
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

export default SliderManagementTab


