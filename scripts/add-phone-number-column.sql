-- Migration script to add phone_number column to bookings table
-- Run this script in your Supabase SQL editor or via psql

-- Add phone_number column (nullable for existing records)
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Make phone_number required for new records (optional - uncomment if you want to enforce it)
-- ALTER TABLE bookings 
-- ALTER COLUMN phone SET NOT NULL;

-- Add comment to the column
COMMENT ON COLUMN bookings.phone IS 'Contact phone number of the lead';

-- Create index on phone for faster lookups (optional)
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);

