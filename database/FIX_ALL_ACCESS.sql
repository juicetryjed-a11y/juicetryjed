-- FIX ALL ACCESS (Nuclear Option)
-- This script disables all security restrictions to ensure data is visible.

-- 1. Disable RLS on ALL tables
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_page_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.header_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_page_settings DISABLE ROW LEVEL SECURITY;

-- 2. Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- 3. Grant all privileges on all tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- 4. Grant all privileges on all sequences (for ID generation)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 5. Ensure products are active
UPDATE public.products SET is_active = true;
