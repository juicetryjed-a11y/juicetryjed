// بيانات تجريبية للعمل بدون قاعدة بيانات

// تعريف أنواع البيانات
type UserRole = 'customer' | 'admin' | 'manager' | 'editor'

export interface MockUser {
  id: string
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  role: UserRole
  is_active: boolean
  created_at: string
}

export const mockCategories = [
  { id: 1, name: 'عصائر الحمضيات', description: 'عصائر البرتقال والليمون والجريب فروت', color: '#f97316', icon: '🍊', is_active: true, order_index: 1, created_at: new Date().toISOString() },
  { id: 2, name: 'عصائر استوائية', description: 'عصائر المانجو والأناناس والكيوي', color: '#eab308', icon: '🥭', is_active: true, order_index: 2, created_at: new Date().toISOString() },
  { id: 3, name: 'عصائر التوت', description: 'عصائر الفراولة والتوت الأزرق والتوت الأحمر', color: '#ef4444', icon: '🍓', is_active: true, order_index: 3, created_at: new Date().toISOString() },
  { id: 4, name: 'عصائر الخضروات', description: 'عصائر الجزر والخيار والسبانخ', color: '#22c55e', icon: '🥕', is_active: true, order_index: 4, created_at: new Date().toISOString() },
  { id: 5, name: 'سموثي طبيعي', description: 'مشروبات مخلوطة بالفواكه والخضروات', color: '#8b5cf6', icon: '🥤', is_active: true, order_index: 5, created_at: new Date().toISOString() },
]

export const mockProducts = [
  { id: 1, name: 'عصير برتقال طازج', price: 15.00, category_id: 1, description: 'عصير برتقال طبيعي 100% بدون إضافات', image_url: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', ingredients: 'برتقال طازج', nutritional_info: 'فيتامين C، فولات', calories: 120, size_options: 'متوسط (350مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: 'عصير مانجو استوائي', price: 18.00, category_id: 2, description: 'عصير مانجو حلو ومنعش من أجود الأنواع', image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', ingredients: 'مانجو طازج، قليل من الماء', nutritional_info: 'فيتامين A، فيتامين C', calories: 150, size_options: 'كبير (500مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: 'سموثي الفراولة', price: 20.00, category_id: 3, description: 'سموثي كريمي بالفراولة الطازجة والحليب', image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', ingredients: 'فراولة، حليب، عسل طبيعي', nutritional_info: 'بروتين، كالسيوم', calories: 180, size_options: 'كبير (500مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, name: 'عصير أخضر ديتوكس', price: 25.00, category_id: 4, description: 'عصير صحي للتخلص من السموم', image_url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop', ingredients: 'سبانخ، تفاح، خيار، ليمون', nutritional_info: 'حديد، فيتامين K', calories: 80, size_options: 'متوسط (350مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, name: 'عصير تفاح طبيعي', price: 16.00, category_id: 1, description: 'عصير تفاح طازج بدون سكر مضاف', image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', ingredients: 'تفاح طازج', nutritional_info: 'فيتامين C، ألياف', calories: 110, size_options: 'متوسط (350مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, name: 'سموثي التوت المختلط', price: 22.00, category_id: 3, description: 'سموثي غني بمضادات الأكسدة', image_url: 'https://images.unsplash.com/photo-1559839914-17aae04cec44?w=400&h=300&fit=crop', ingredients: 'توت أزرق، توت أحمر، يوغورت', nutritional_info: 'مضادات أكسدة، بروتين', calories: 160, size_options: 'كبير (500مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, name: 'عصير ليمون بالنعناع', price: 14.00, category_id: 1, description: 'مشروب منعش ومنشط', image_url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop', ingredients: 'ليمون، نعناع، ماء', nutritional_info: 'فيتامين C', calories: 60, size_options: 'متوسط (350مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, name: 'مشروب الطاقة الطبيعي', price: 28.00, category_id: 5, description: 'مشروب طبيعي لزيادة الطاقة والتركيز', image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop', ingredients: 'موز، تمر، لوز، حليب جوز الهند', nutritional_info: 'بوتاسيوم، مغنيسيوم', calories: 220, size_options: 'كبير (500مل)', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

export const mockOrders = [
  { id: 1, customer_name: 'أحمد محمد', customer_email: 'ahmed@example.com', customer_phone: '+966501111111', customer_address: 'الرياض، حي النخيل', total_amount: 35.00, status: 'delivered', payment_method: 'cash', notes: '', created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString() },
  { id: 2, customer_name: 'فاطمة علي', customer_email: 'fatima@example.com', customer_phone: '+966502222222', customer_address: 'جدة، حي الصفا', total_amount: 42.00, status: 'preparing', payment_method: 'card', notes: 'بدون سكر إضافي', created_at: new Date(Date.now() - 3600000).toISOString(), updated_at: new Date().toISOString() },
]

export const mockReviews = [
  { id: 1, customer_name: 'أحمد محمد', customer_email: 'ahmed@example.com', product_id: 1, rating: 5, comment: 'عصير برتقال رائع وطازج جداً، أنصح به بشدة!', is_approved: true, is_featured: true, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString() },
  { id: 2, customer_name: 'فاطمة علي', customer_email: 'fatima@example.com', product_id: 3, rating: 4, comment: 'سموثي الفراولة لذيذ جداً ومنعش، سأطلبه مرة أخرى', is_approved: true, is_featured: false, created_at: new Date(Date.now() - 3600000).toISOString(), updated_at: new Date().toISOString() },
]

export const mockBlogPosts = [
  { id: 1, title: 'فوائد العصائر الطبيعية للصحة', content: 'العصائر الطبيعية مصدر ممتاز للفيتامينات والمعادن الأساسية التي يحتاجها الجسم...', excerpt: 'تعرف على الفوائد الصحية المذهلة للعصائر الطبيعية', author: 'د. أحمد الصحي', category: 'health', is_published: true, is_featured: true, views: 245, likes: 18, comments_count: 5, meta_title: 'فوائد العصائر الطبيعية للصحة العامة', meta_description: 'اكتشف الفوائد الصحية المذهلة للعصائر الطبيعية وكيف تساهم في تحسين صحتك العامة', meta_keywords: 'عصائر طبيعية، صحة، فيتامينات', featured_image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', slug: 'benefits-of-natural-juices', created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString() },
]

export const mockUsers: MockUser[] = [
  { id: '1', full_name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966501111111', address: 'الرياض، حي النخيل', city: 'الرياض', role: 'customer', is_active: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', full_name: 'فاطمة علي', email: 'fatima@example.com', phone: '+966502222222', address: 'جدة، حي الصفا', city: 'جدة', role: 'customer', is_active: true, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: '3', full_name: 'محمد السعيد', email: 'mohammed@example.com', phone: '+966503333333', address: 'الدمام، حي الشاطئ', city: 'الدمام', role: 'editor', is_active: true, created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: '4', full_name: 'نورا أحمد', email: 'nora@example.com', phone: '+966504444444', address: 'مكة، حي العزيزية', city: 'مكة', role: 'manager', is_active: false, created_at: new Date(Date.now() - 345600000).toISOString() },
  { id: 'admin-1', full_name: 'مدير النظام', email: 'admin@juicetry.com', phone: '+966501234567', address: 'الرياض، المملكة العربية السعودية', city: 'الرياض', role: 'admin', is_active: true, created_at: new Date(Date.now() - 432000000).toISOString() }
]

export const mockAboutPageSettings = {
  id: 1,
  title: 'من نحن',
  subtitle: 'قصة Juicetry - جوستري',
  description: 'نحن متخصصون في تقديم أفضل العصائر الطبيعية الطازجة المصنوعة من أجود أنواع الفواكه والخضروات.',
  mission_title: 'رسالتنا',
  mission_text: 'تقديم عصائر طبيعية 100% خالية من المواد الحافظة والسكر المضاف، لنساهم في تحسين صحة عملائنا وتقديم تجربة منعشة ولذيذة.',
  vision_title: 'رؤيتنا',
  vision_text: 'أن نكون الخيار الأول لمحبي العصائر الطبيعية في المملكة، ونشر ثقافة الغذاء الصحي والطبيعي.',
  values_title: 'قيمنا',
  values_text: 'الجودة، الطبيعية، الصحة، الطعم الأصيل، خدمة العملاء المتميزة، والالتزام بأعلى معايير النظافة والسلامة.',
  location_name: 'موقع المحل',
  location_address: 'الرياض، المملكة العربية السعودية',
  location_url: 'https://maps.google.com',
  background_color: '#f8fafc',
  text_color: '#374151',
  accent_color: '#22c55e',
  title_color: '#1f2937',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const mockSiteSettings = {
  id: 1,
  site_name: 'Juicetry - جوستري',
  site_description: 'محل العصائر الطبيعية الطازجة',
  site_logo: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=200',
  site_favicon: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=32',
  primary_color: '#22c55e',
  secondary_color: '#84cc16',
  accent_color: '#eab308',
  contact_phone: '+966501234567',
  contact_email: 'info@juicetry.com',
  contact_address: 'الرياض، المملكة العربية السعودية',
  working_hours: 'يومياً من 8 صباحاً - 11 مساءً',
  facebook_url: 'https://facebook.com/juicetry',
  twitter_url: 'https://twitter.com/juicetry',
  instagram_url: 'https://instagram.com/juicetry',
  youtube_url: 'https://youtube.com/juicetry',
  whatsapp_number: '+966501234567',
  google_maps_url: 'https://maps.google.com',
  meta_title: 'Juicetry - أفضل العصائر الطبيعية',
  meta_description: 'اكتشف أفضل العصائر الطبيعية الطازجة في Juicetry. عصائر صحية ولذيذة من أجود الفواكه والخضروات.',
  meta_keywords: 'عصائر طبيعية، عصائر طازجة، مشروبات صحية، فواكه، خضروات',
  analytics_code: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// تعطيل localStorage نهائياً - استخدام Supabase فقط
const DISABLE_LOCALSTORAGE = import.meta.env.VITE_DISABLE_LOCALSTORAGE === 'true' || true

// دالة لحفظ البيانات في localStorage (معطلة)
const saveToStorage = (key: string, data: any) => {
  if (DISABLE_LOCALSTORAGE) {
    console.log('⚠️ localStorage معطل - استخدم Supabase')
    return
  }
  try {
    localStorage.setItem(`juicetry_${key}`, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// دالة لتحميل البيانات من localStorage (معطلة)
const loadFromStorage = (key: string, defaultData: any) => {
  if (DISABLE_LOCALSTORAGE) {
    console.log('⚠️ localStorage معطل - استخدم Supabase')
    return defaultData
  }
  try {
    const stored = localStorage.getItem(`juicetry_${key}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }
  return defaultData
}

let categories = loadFromStorage('categories', [...mockCategories])
let products = loadFromStorage('products', [...mockProducts])
let orders = loadFromStorage('orders', [...mockOrders])
let reviews = loadFromStorage('reviews', [...mockReviews])
let blogPosts = loadFromStorage('blogPosts', [...mockBlogPosts])
let users = loadFromStorage('users', [...mockUsers])
let siteSettings = { ...mockSiteSettings }
let aboutPageSettings = { ...mockAboutPageSettings }

export const mockAPI = {
  // Categories
  getCategories: () => {
    console.log('📊 Mock API: Getting categories, count:', categories.length)
    return Promise.resolve({ data: categories, error: null })
  },
  addCategory: (category: any) => {
    const newCategory = { ...category, id: Date.now(), created_at: new Date().toISOString() }
    categories.push(newCategory)
    saveToStorage('categories', categories)
    console.log('✅ Mock API: Category added successfully:', newCategory.name)
    return Promise.resolve({ data: newCategory, error: null })
  },
  updateCategory: (id: number, updates: any) => {
    const index = categories.findIndex(c => c.id === id)
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates, updated_at: new Date().toISOString() }
      saveToStorage('categories', categories)
      console.log('✅ Mock API: Category updated successfully:', categories[index].name)
      return Promise.resolve({ data: categories[index], error: null })
    }
    console.log('❌ Mock API: Category not found for update:', id)
    return Promise.resolve({ data: null, error: 'Category not found' })
  },
  deleteCategory: (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id)
    categories = categories.filter(c => c.id !== id)
    saveToStorage('categories', categories)
    console.log('✅ Mock API: Category deleted successfully:', categoryToDelete?.name)
    return Promise.resolve({ data: null, error: null })
  },

  // Products
  getProducts: () => {
    console.log('📊 Mock API: Getting products, count:', products.length)
    return Promise.resolve({ data: products, error: null })
  },
  addProduct: (product: any) => {
    // إذا لم تكن هناك صورة، استخدم صورة افتراضية
    if (!product.image_url || product.image_url === '') {
      const defaultImages = [
        'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop'
      ]
      product.image_url = defaultImages[Math.floor(Math.random() * defaultImages.length)]
    }
    
    const newProduct = { 
      ...product, 
      id: Date.now(), 
      is_active: true, // تأكد من أن المنتج نشط
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    }
    
    products.push(newProduct)
    saveToStorage('products', products)
    console.log('✅ Mock API: Product added successfully:', newProduct.name, 'with image:', newProduct.image_url)
    return Promise.resolve({ data: newProduct, error: null })
  },
  updateProduct: (id: number, updates: any) => {
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updated_at: new Date().toISOString() }
      saveToStorage('products', products)
      console.log('✅ Mock API: Product updated successfully:', products[index].name)
      return Promise.resolve({ data: products[index], error: null })
    }
    console.log('❌ Mock API: Product not found for update:', id)
    return Promise.resolve({ data: null, error: 'Product not found' })
  },
  deleteProduct: (id: number) => {
    const productToDelete = products.find(p => p.id === id)
    products = products.filter(p => p.id !== id)
    saveToStorage('products', products)
    console.log('✅ Mock API: Product deleted successfully:', productToDelete?.name)
    return Promise.resolve({ data: null, error: null })
  },

  // Orders
  getOrders: () => Promise.resolve({ data: orders, error: null }),
  updateOrder: (id: number, updates: any) => {
    const index = orders.findIndex(o => o.id === id)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates, updated_at: new Date().toISOString() }
      return Promise.resolve({ data: orders[index], error: null })
    }
    return Promise.resolve({ data: null, error: 'Order not found' })
  },

  // Reviews
  getReviews: () => Promise.resolve({ data: reviews, error: null }),
  updateReview: (id: number, updates: any) => {
    const index = reviews.findIndex(r => r.id === id)
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...updates, updated_at: new Date().toISOString() }
      return Promise.resolve({ data: reviews[index], error: null })
    }
    return Promise.resolve({ data: null, error: 'Review not found' })
  },
  deleteReview: (id: number) => {
    reviews = reviews.filter(r => r.id !== id)
    return Promise.resolve({ data: null, error: null })
  },

  // Blog Posts
  getBlogPosts: () => Promise.resolve({ data: blogPosts, error: null }),
  addBlogPost: (post: any) => {
    const newPost = { ...post, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    blogPosts.push(newPost)
    return Promise.resolve({ data: newPost, error: null })
  },
  updateBlogPost: (id: number, updates: any) => {
    const index = blogPosts.findIndex(p => p.id === id)
    if (index !== -1) {
      blogPosts[index] = { ...blogPosts[index], ...updates, updated_at: new Date().toISOString() }
      return Promise.resolve({ data: blogPosts[index], error: null })
    }
    return Promise.resolve({ data: null, error: 'Post not found' })
  },
  deleteBlogPost: (id: number) => {
    blogPosts = blogPosts.filter(p => p.id !== id)
    return Promise.resolve({ data: null, error: null })
  },

  // Site Settings
  getSiteSettings: () => {
    console.log('📊 Mock API: Getting site settings')
    return Promise.resolve({ data: [siteSettings], error: null })
  },
  updateSiteSettings: (updates: any) => {
    siteSettings = { ...siteSettings, ...updates, updated_at: new Date().toISOString() }
    saveToStorage('siteSettings', siteSettings)
    console.log('✅ Mock API: Site settings updated successfully')
    return Promise.resolve({ data: siteSettings, error: null })
  },

  // About Page Settings
  getAboutPageSettings: () => Promise.resolve({ data: [aboutPageSettings], error: null }),
  updateAboutPageSettings: (updates: any) => {
    aboutPageSettings = { ...aboutPageSettings, ...updates, updated_at: new Date().toISOString() }
    return Promise.resolve({ data: aboutPageSettings, error: null })
  },

  // Users
  getUsers: () => {
    console.log('📊 Mock API: Getting users, count:', users.length)
    return Promise.resolve({ data: users, error: null })
  },
  addUser: (user: any) => {
    const newUser = { 
      ...user, 
      id: Date.now().toString(), 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    users.push(newUser)
    saveToStorage('users', users)
    console.log('✅ Mock API: User added successfully:', newUser.full_name)
    return Promise.resolve({ data: newUser, error: null })
  },
  updateUser: (id: string, updates: any) => {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() }
      saveToStorage('users', users)
      console.log('✅ Mock API: User updated successfully:', users[index].full_name)
      return Promise.resolve({ data: users[index], error: null })
    }
    console.log('❌ Mock API: User not found for update:', id)
    return Promise.resolve({ data: null, error: 'User not found' })
  },
  deleteUser: (id: string) => {
    const initialLength = users.length
    const userToDelete = users.find(u => u.id === id)
    users = users.filter(u => u.id !== id)
    const deleted = users.length < initialLength
    
    if (deleted) {
      saveToStorage('users', users)
      console.log(`✅ Mock API: User ${userToDelete?.full_name} deleted successfully`)
      return Promise.resolve({ data: null, error: null })
    } else {
      console.log(`❌ Mock API: User ${id} not found for deletion`)
      return Promise.resolve({ data: null, error: 'User not found' })
    }
  },

  // Mock image upload
  uploadImage: (file: File) => {
    console.log('📸 Mock API: Uploading image:', file.name)
    
    // قائمة صور عصائر حقيقية من Unsplash
    const juiceImages = [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', // عصير برتقال
      'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop', // عصير مختلط
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', // سموثي فراولة
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop', // عصير أخضر
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', // عصير تفاح
      'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', // عصير مانجو
      'https://images.unsplash.com/photo-1559839914-17aae04cec44?w=400&h=300&fit=crop', // عصير توت
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop', // عصير ليمون
    ]
    
    // اختيار صورة عشوائية
    const randomImage = juiceImages[Math.floor(Math.random() * juiceImages.length)]
    
    console.log('✅ Mock API: Image uploaded successfully:', randomImage)
    
    return Promise.resolve({
      success: true,
      url: randomImage
    })
  }
}
