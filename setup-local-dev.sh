#!/bin/bash

# Setup script for local development environment
# This script initializes local D1 database with sample data

echo "🔧 Setting up local development environment..."

# Step 1: Create tables
echo "📊 Creating database tables..."
wrangler d1 execute DB --local --command="CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  specifications TEXT,
  image_url TEXT,
  gallery_images TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);"

wrangler d1 execute DB --local --command="CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  country TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);"

wrangler d1 execute DB --local --command="CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'admin',
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);"

# Step 2: Insert admin users
echo "👤 Creating admin users..."
wrangler d1 execute DB --local --command="INSERT OR IGNORE INTO admins (username, password_hash, email, role)
VALUES
('admin123', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@example.com', 'super_admin'),
('staff', '10176e7b7b24d317acfcf8d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6', 'staff@example.com', 'admin');"

# Step 3: Insert sample products (only 3 that have images in preview R2)
echo "📦 Creating sample products..."
wrangler d1 execute DB --local --command="INSERT OR IGNORE INTO products (id, name, description, detailed_description, specifications, image_url, category, is_featured, is_active)
VALUES
(1, 'Industrial Robotic Arm System', 'Advanced 6-axis robotic arm for automated manufacturing and assembly', 'State-of-the-art industrial robotic arm designed for precision automation. Features 6-axis movement, 20kg payload capacity, and repeatability of 0.02mm.', 'Axes: 6 Degrees of Freedom\nPayload: 20kg\nReach: 1800mm', '/images/product-1-robotic-arm.png', 'Industrial', 1, 1),
(2, 'Smart IoT Sensor Network', 'Wireless industrial monitoring system with real-time data analytics', 'Comprehensive IoT sensor network solution for industrial monitoring with wireless connectivity and edge computing.', 'Sensor Types: Temp, Humidity, Vibration\nWireless Range: Up to 2km', '/images/product-2-iot-sensor.png', 'Technology', 1, 1),
(3, 'Precision Laser Cutting Machine', 'High-speed CO2 laser cutter for precise metal processing', 'Professional-grade laser cutting system for precision cutting and engraving with 1500W CO2 laser tube.', 'Laser Power: 1500W CO2\nWorking Area: 1300x900mm', '/images/product-3-laser-cutter.png', 'Equipment', 0, 1);"

echo ""
echo "✅ Local development environment setup complete!"
echo ""
echo "📝 Note: Local D1 database has been initialized with 3 sample products."
echo "   These products reference images in the preview R2 bucket."
echo ""
echo "🚀 To start local development:"
echo "   npm run dev:local"
echo ""
echo "⚠️  Limitations:"
echo "   - Local mode uses local D1 (empty by default)"
echo "   - Images must be in preview R2 bucket"
echo "   - For full testing, use production environment"
