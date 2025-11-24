-- Add Snapchat and Facebook columns to footer_settings and site_settings

-- Add to footer_settings
ALTER TABLE public.footer_settings 
ADD COLUMN IF NOT EXISTS snapchat_url TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- Add to site_settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS snapchat_url TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- Update footer_settings with the new URLs
UPDATE public.footer_settings 
SET 
  snapchat_url = 'https://www.snapchat.com/add/juicetryjed',
  facebook_url = 'https://www.facebook.com/share/14Mjo53Fn8V/?mibextid=wwXIfr'
WHERE id = 1;

-- Update site_settings with the new URLs
UPDATE public.site_settings 
SET 
  snapchat_url = 'https://www.snapchat.com/add/juicetryjed',
  facebook_url = 'https://www.facebook.com/share/14Mjo53Fn8V/?mibextid=wwXIfr'
WHERE id = 1;
