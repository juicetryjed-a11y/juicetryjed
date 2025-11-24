-- Add TikTok URL to footer_settings

-- First, ensure the column exists
ALTER TABLE public.footer_settings ADD COLUMN IF NOT EXISTS tiktok_url TEXT;

-- Update the footer_settings with TikTok URL
UPDATE public.footer_settings 
SET tiktok_url = 'https://www.tiktok.com/@juicetry1?_r=1&_t=ZS-91fbFKvKzkv'
WHERE id = 1;

-- If no row exists, insert one with the TikTok URL
INSERT INTO public.footer_settings (
  company_name,
  company_description,
  phone,
  email,
  address,
  working_hours,
  facebook_url,
  instagram_url,
  twitter_url,
  tiktok_url,
  show_quick_links,
  show_copyright,
  copyright_text,
  bg_color,
  text_color,
  link_color
)
SELECT 
  'Juicetry - جوستري',
  'محل العصائر الطبيعية الطازجة',
  '+966501234567',
  'info@juicetry.com',
  'الرياض، المملكة العربية السعودية',
  'يومياً من 8 صباحاً - 11 مساءً',
  '',
  '',
  '',
  'https://www.tiktok.com/@juicetry1?_r=1&_t=ZS-91fbFKvKzkv',
  true,
  true,
  '© 2024 Juicetry - جوستري. جميع الحقوق محفوظة.',
  '#1f2937',
  '#ffffff',
  '#10b981'
WHERE NOT EXISTS (SELECT 1 FROM public.footer_settings WHERE id = 1);
