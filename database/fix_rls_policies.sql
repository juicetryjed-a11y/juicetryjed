-- Fix RLS Policies to allow public access (since we are using SimpleAuthContext)

-- 1. Contact Page Settings
ALTER TABLE public.contact_page_settings DISABLE ROW LEVEL SECURITY;

-- 2. Header Settings
ALTER TABLE public.header_settings DISABLE ROW LEVEL SECURITY;

-- 3. Home Page Settings
ALTER TABLE public.home_page_settings DISABLE ROW LEVEL SECURITY;

-- 4. Footer Settings
ALTER TABLE public.footer_settings DISABLE ROW LEVEL SECURITY;

-- 5. Site Settings (if exists)
ALTER TABLE IF EXISTS public.site_settings DISABLE ROW LEVEL SECURITY;

-- 6. Products and Categories (CRITICAL for products to appear)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
