import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: string
  url?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

const SEO: React.FC<SEOProps> = ({
  title = 'Juicetry - جوستري | أفضل عصائر طبيعية طازجة في السعودية',
  description = 'استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً من أجود الفواكه والخضروات. عصائر صحية ولذيذة في الرياض والمملكة العربية السعودية',
  keywords = 'عصائر طبيعية, عصير طازج, عصير صحي, جوستري, Juicetry, عصائر الرياض, عصائر السعودية, مشروبات صحية, عصير فواكه, عصير خضروات',
  image = 'https://ijpugtvfckmptzegdchr.supabase.co/storage/v1/object/public/images/juicetry-og-image.jpg',
  type = 'website',
  url,
  author = 'Juicetry',
  publishedTime,
  modifiedTime,
}) => {
  const location = useLocation()
  const currentUrl = url || `https://juicetry.com${location.pathname}`
  const siteName = 'Juicetry - جوستري'

  useEffect(() => {
    // تحديث Title
    document.title = title

    // تحديث أو إنشاء Meta Tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', author)

    // Open Graph Tags
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', image, 'property')
    updateMetaTag('og:url', currentUrl, 'property')
    updateMetaTag('og:type', type, 'property')
    updateMetaTag('og:site_name', siteName, 'property')
    updateMetaTag('og:locale', 'ar_SA', 'property')
    updateMetaTag('og:locale:alternate', 'en_US', 'property')

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name')
    updateMetaTag('twitter:title', title, 'name')
    updateMetaTag('twitter:description', description, 'name')
    updateMetaTag('twitter:image', image, 'name')
    updateMetaTag('twitter:site', '@juicetry', 'name')
    updateMetaTag('twitter:creator', '@juicetry', 'name')

    // Article Tags (للمقالات)
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, 'property')
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, 'property')
      }
      updateMetaTag('article:author', author, 'property')
    }

    // Robots
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    updateMetaTag('googlebot', 'index, follow')

    // Mobile
    updateMetaTag('mobile-web-app-capable', 'yes')
    updateMetaTag('apple-mobile-web-app-capable', 'yes')
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default')
    updateMetaTag('apple-mobile-web-app-title', siteName)

    // Theme Color
    updateMetaTag('theme-color', '#22c55e')
    updateMetaTag('msapplication-TileColor', '#22c55e')

    // Canonical URL
    updateLinkTag('canonical', currentUrl)

    // Alternate Languages
    updateLinkTag('alternate', currentUrl, 'ar')
    updateLinkTag('alternate', currentUrl, 'en')

  }, [title, description, keywords, image, type, currentUrl, author, publishedTime, modifiedTime])

  return null
}

// Helper function لتحديث أو إنشاء meta tags
const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

// Helper function لتحديث أو إنشاء link tags
const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang 
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`
  
  let element = document.querySelector(selector) as HTMLLinkElement
  
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hreflang) {
      element.setAttribute('hreflang', hreflang)
    }
    document.head.appendChild(element)
  }
  
  element.setAttribute('href', href)
}

export default SEO
