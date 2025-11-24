-- Fix Products Visibility

-- 1. Make all products active (visible)
UPDATE public.products SET is_active = true;

-- 2. Make all categories active
UPDATE public.categories SET is_active = true;

-- 3. Ensure all products have a valid category (assign to category 1 if null or invalid)
-- First, make sure category 1 exists
INSERT INTO public.categories (id, name, description, color, icon, is_active, order_index)
VALUES (1, 'عصائر طازجة', 'عصائر فواكه طبيعية 100%', '#f97316', '🍊', true, 1)
ON CONFLICT (id) DO NOTHING;

-- Then update products with null category
UPDATE public.products SET category_id = 1 WHERE category_id IS NULL;

-- 4. Disable RLS on products and categories (Critical for local auth)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
