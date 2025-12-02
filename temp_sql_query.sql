ALTER TABLE site_settings
ADD COLUMN maintenance_mode BOOLEAN DEFAULT FALSE;

UPDATE site_settings
SET maintenance_mode = FALSE
WHERE maintenance_mode IS NULL;
