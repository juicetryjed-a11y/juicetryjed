export interface Category {
  id: number
  name: string
  description?: string
  image_url?: string
  color?: string
  icon?: string
  order_index?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  name_ar?: string
  name_en?: string
  description?: string
  price: number
  category_id?: number
  image_url?: string
  ingredients?: string[]
  nutritional_info?: any
  calories?: number
  size_options?: any[]
  is_featured?: boolean
  is_available?: boolean
  is_active?: boolean
  order_index?: number
  created_at: string
  updated_at: string
  category?: Category
}

export interface CustomerReview {
  id: number
  customer_name: string
  review_text: string
  rating: number
  customer_image_url?: string
  is_visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface SlideshowSettings {
  id: number
  is_enabled: boolean
  auto_play: boolean
  auto_play_interval: number
  show_navigation: boolean
  show_indicators: boolean
  transition_duration: number
  height_mobile: string
  height_desktop: string
  created_at: string
  updated_at: string
}

export interface SlideshowImage {
  id: number
  title?: string
  subtitle?: string
  image_url: string
  link_url?: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface HomepageDesignSettings {
  id: number
  section_name: string
  is_visible: boolean
  background_color: string
  text_color: string
  text_alignment: 'center' | 'right' | 'left'
  font_size: 'small' | 'medium' | 'large'
  padding_top: 'small' | 'normal' | 'large'
  padding_bottom: 'small' | 'normal' | 'large'
  custom_css?: string
  created_at: string
  updated_at: string
}

export interface SocialMediaLink {
  id: number
  platform: string
  url: string
  icon_class?: string
  is_visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}