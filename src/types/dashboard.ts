// أنواع بيانات لوحة التحكم
// Dashboard Data Types

// ===================================
// Orders Types
// ===================================
export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address?: string
  customer_city?: string
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_method: 'cash' | 'card' | 'online'
  payment_status: 'paid' | 'unpaid' | 'refunded'
  notes?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_name: string
  product_id?: string
  quantity: number
  price: number
  subtotal: number
  created_at: string
}

export interface CreateOrderData {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address?: string
  customer_city?: string
  payment_method: 'cash' | 'card' | 'online'
  notes?: string
  items: {
    product_name: string
    product_id?: string
    quantity: number
    price: number
  }[]
}

export interface UpdateOrderData {
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  customer_address?: string
  customer_city?: string
  status?: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_method?: 'cash' | 'card' | 'online'
  payment_status?: 'paid' | 'unpaid' | 'refunded'
  notes?: string
}

// ===================================
// Reviews Types
// ===================================
export interface Review {
  id: string
  customer_name: string
  customer_email?: string
  rating: number
  comment: string
  product_id?: string
  product_name?: string
  status: 'pending' | 'approved' | 'rejected'
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface CreateReviewData {
  customer_name: string
  customer_email?: string
  rating: number
  comment: string
  product_id?: string
  product_name?: string
}

export interface UpdateReviewData {
  customer_name?: string
  customer_email?: string
  rating?: number
  comment?: string
  product_id?: string
  product_name?: string
  status?: 'pending' | 'approved' | 'rejected'
  is_featured?: boolean
}

// ===================================
// Blog Posts Types
// ===================================
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  author_name: string
  category?: string
  tags?: string[]
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  views_count: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface CreateBlogPostData {
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  author_name?: string
  category?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
  is_featured?: boolean
}

export interface UpdateBlogPostData {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  featured_image?: string
  author_name?: string
  category?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
  is_featured?: boolean
}

// ===================================
// Customers Types
// ===================================
export interface Customer {
  id: string
  full_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  total_orders: number
  total_spent: number
  status: 'active' | 'inactive' | 'blocked'
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateCustomerData {
  full_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  notes?: string
}

export interface UpdateCustomerData {
  full_name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  status?: 'active' | 'inactive' | 'blocked'
  notes?: string
}
