export interface User {
  id: string
  email: string
  role: 'admin' | 'customer'
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name?: string
  phone?: string
  address?: string
  city?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserWithProfile extends User {
  profile?: Profile
}

export interface CreateUserData {
  email: string
  password: string
  role?: 'admin' | 'customer'
  full_name?: string
  phone?: string
  address?: string
  city?: string
}

export interface UpdateUserData {
  email?: string
  role?: 'admin' | 'customer'
  full_name?: string
  phone?: string
  address?: string
  city?: string
  avatar_url?: string
}
