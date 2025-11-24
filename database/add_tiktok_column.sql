-- Add TikTok URL to site_settings

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS tiktok_url TEXT;
ALTER TABLE public.footer_settings ADD COLUMN IF NOT EXISTS tiktok_url TEXT;

-- Optional: Rename youtube_url to tiktok_url if you want to migrate data, 
-- but adding a new column is safer.
