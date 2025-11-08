import { supabase } from './supabase'
import type {
  Order,
  CreateOrderData,
  UpdateOrderData,
  Review,
  CreateReviewData,
  UpdateReviewData,
  BlogPost,
  CreateBlogPostData,
  UpdateBlogPostData,
  Customer,
  CreateCustomerData,
  UpdateCustomerData
} from '@/types/dashboard'

// ===================================
// Orders API
// ===================================
export const ordersAPI = {
  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  },

  async getById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Order
  },

  async create(orderData: CreateOrderData): Promise<Order> {
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`
    
    // Calculate total
    const total = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        customer_city: orderData.customer_city,
        total_amount: total,
        payment_method: orderData.payment_method,
        notes: orderData.notes
      })
      .select()
      .single()
    
    if (orderError) throw orderError
    
    // Create order items
    const items = orderData.items.map(item => ({
      order_id: order.id,
      product_name: item.product_name,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    }))
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items)
    
    if (itemsError) throw itemsError
    
    return order as Order
  },

  async update(id: string, orderData: UpdateOrderData): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({
        ...orderData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// ===================================
// Reviews API
// ===================================
export const reviewsAPI = {
  async getAll(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Review[]
  },

  async getById(id: string): Promise<Review | null> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Review
  },

  async create(reviewData: CreateReviewData): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single()
    
    if (error) throw error
    return data as Review
  },

  async update(id: string, reviewData: UpdateReviewData): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        ...reviewData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Review
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async approve(id: string): Promise<Review> {
    return this.update(id, { status: 'approved' })
  },

  async reject(id: string): Promise<Review> {
    return this.update(id, { status: 'rejected' })
  },

  async toggleFeatured(id: string, isFeatured: boolean): Promise<Review> {
    return this.update(id, { is_featured: isFeatured })
  }
}

// ===================================
// Blog Posts API
// ===================================
export const blogAPI = {
  async getAll(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as BlogPost[]
  },

  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  async create(postData: CreateBlogPostData): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...postData,
        author_name: postData.author_name || 'Admin',
        status: postData.status || 'draft',
        is_featured: postData.is_featured || false,
        views_count: 0
      })
      .select()
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  async update(id: string, postData: UpdateBlogPostData): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...postData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async publish(id: string): Promise<BlogPost> {
    return this.update(id, {
      status: 'published',
      published_at: new Date().toISOString()
    })
  },

  async unpublish(id: string): Promise<BlogPost> {
    return this.update(id, { status: 'draft' })
  }
}

// ===================================
// Customers API
// ===================================
export const customersAPI = {
  async getAll(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Customer[]
  },

  async getById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Customer
  },

  async create(customerData: CreateCustomerData): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        ...customerData,
        total_orders: 0,
        total_spent: 0,
        status: 'active'
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Customer
  },

  async update(id: string, customerData: UpdateCustomerData): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...customerData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Customer
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async updateStats(id: string, totalOrders: number, totalSpent: number): Promise<Customer> {
    return this.update(id, {
      total_orders: totalOrders,
      total_spent: totalSpent
    })
  }
}
