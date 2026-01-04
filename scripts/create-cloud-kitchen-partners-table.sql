-- Create cloud_kitchen_partners table for partnership requests
CREATE TABLE IF NOT EXISTS cloud_kitchen_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  kitchen_name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  capacity VARCHAR(100) NOT NULL,
  cuisines VARCHAR(255) NOT NULL,
  fssai_license VARCHAR(100),
  experience VARCHAR(50),
  current_orders VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_cloud_kitchen_partners_email ON cloud_kitchen_partners(email);
CREATE INDEX IF NOT EXISTS idx_cloud_kitchen_partners_city ON cloud_kitchen_partners(city);
CREATE INDEX IF NOT EXISTS idx_cloud_kitchen_partners_status ON cloud_kitchen_partners(status);
CREATE INDEX IF NOT EXISTS idx_cloud_kitchen_partners_created_at ON cloud_kitchen_partners(created_at);

