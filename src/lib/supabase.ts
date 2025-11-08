import { createClient } from '@supabase/supabase-js'

// قيم Supabase مباشرة (حل مؤقت)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ijpugtvfckmptzegdchr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcHVndHZmY2ttcHR6ZWdkY2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDgxODUsImV4cCI6MjA3ODEyNDE4NX0.Jwdg1TAJ-uF9BYzGLjFisrKetypUh59ELLNoLDcH12o'

console.log('🔧 Supabase Config:')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? 'موجود' : 'مفقود')

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase keys not found. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)