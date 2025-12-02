-- Add maintenance_mode column to site_settings table
ALTER TABLE site_settings
ADD COLUMN maintenance_mode BOOLEAN DEFAULT FALSE;

-- Set default value for existing records
UPDATE site_settings
SET maintenance_mode = FALSE
WHERE maintenance_mode IS NULL;
