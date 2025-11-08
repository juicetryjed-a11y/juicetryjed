import React, { useEffect, useState } from 'react'
import { dataService } from '@/lib/dataService'
import NewHeader from '@/components/layout/NewHeader'
import Footer from '@/components/layout/Footer'

interface AboutContent {
  id: number
  content: string
  text_color: string
  font_family: string
  font_size: string
  text_alignment: 'right' | 'center' | 'left'
  background_color: string
}

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await dataService.getAboutPageSettings()

      if (error) throw error

      if (data && data.length > 0) {
        setContent(data[0])
      } else {
        // محتوى افتراضي
        setContent({
          id: 1,
          content: `
            <h1 class="text-4xl font-bold mb-6">مرحباً بكم في Juicetry</h1>
            <p class="text-lg mb-4">
              نحن في Juicetry نؤمن بأن العصائر الطبيعية الطازجة هي مفتاح الصحة والعافية. 
              نقدم لكم تشكيلة واسعة من العصائر المحضرة يومياً بأجود المكونات الطبيعية.
            </p>
            <p class="text-lg mb-4">
              مهمتنا هي تقديم أفضل تجربة عصير طبيعي لعملائنا، مع التركيز على الجودة والطعم الأصيل.
            </p>
            <h2 class="text-2xl font-bold mt-8 mb-4">رؤيتنا</h2>
            <p class="text-lg">
              أن نكون الوجهة الأولى لعشاق العصائر الطبيعية في المنطقة، وأن نقدم منتجات صحية ولذيذة تلبي جميع الأذواق.
            </p>
          `,
          text_color: '#291719',
          font_family: 'inherit',
          font_size: '16px',
          text_alignment: 'right' as 'right' | 'center' | 'left',
          background_color: '#ffffff',
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب محتوى صفحة من نحن:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <NewHeader />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-juicetry-primary"></div>
          <p className="mt-4 text-juicetry-gray">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!content) return null

  const contentStyle = {
    color: content.text_color,
    fontFamily: content.font_family,
    fontSize: content.font_size,
    textAlign: content.text_alignment,
    backgroundColor: content.background_color,
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: content.background_color }}>
      <NewHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div 
          className="max-w-4xl mx-auto prose prose-lg"
          style={contentStyle}
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </main>
      
      <Footer />
    </div>
  )
}

export default AboutPage
