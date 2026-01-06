-- B2B Website Database Schema for Cloudflare D1

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  specifications TEXT,
  image_url TEXT,
  gallery_images TEXT, -- JSON array of image URLs
  category TEXT,
  is_featured BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  country TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'admin', -- super_admin, admin
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_product ON inquiries(product_id);


INSERT OR IGNORE INTO admins (username, password_hash, email, role)
VALUES
('admin123', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@example.com', 'super_admin'),
('staff', '10176e7b7b24d317acfcf8d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6', 'staff@example.com', 'admin');

-- Insert real products
INSERT OR IGNORE INTO products (id, name, description, detailed_description, specifications, image_url, category, is_featured)
VALUES
(1, 'Industrial Robotic Arm System', 'Advanced 6-axis robotic arm for automated manufacturing and assembly', 'State-of-the-art industrial robotic arm designed for precision automation. Features 6-axis movement, 20kg payload capacity, and repeatability of 0.02mm. Perfect for assembly lines, welding, material handling, and machine tending applications in automotive, electronics, and general manufacturing industries.', 'Axes: 6 Degrees of Freedom
Payload: 20kg
Reach: 1800mm
Repeatability: ±0.02mm
Power Supply: 380V 3-Phase
Certification: CE, ISO9001, UL', '/images/product-1-robotic-arm.png', 'Industrial', 1),
(2, 'Smart IoT Sensor Network', 'Wireless industrial monitoring system with real-time data analytics', 'Comprehensive IoT sensor network solution for industrial monitoring. Includes temperature, humidity, vibration, and pressure sensors with wireless connectivity. Features edge computing, cloud integration, and AI-powered predictive maintenance alerts. Ideal for smart factories and Industry 4.0 applications.', 'Sensor Types: Temp, Humidity, Vibration, Pressure
Wireless Range: Up to 2km
Battery Life: 5 years
Data Sampling: 1Hz - 1kHz
Protocols: LoRaWAN, NB-IoT, MQTT
Certification: CE, FCC, ATEX', '/images/product-2-iot-sensor.png', 'Technology', 1),
(3, 'Precision Laser Cutting Machine', 'High-speed CO2 laser cutter for precise metal and non-metal processing', 'Professional-grade laser cutting system for precision cutting and engraving. Features 1500W CO2 laser tube, cutting speed up to 35mm/s, and working area of 1300x900mm. Supports various materials including stainless steel, aluminum, acrylic, wood, and more. Perfect for signage, prototyping, and light manufacturing.', 'Laser Power: 1500W CO2
Working Area: 1300x900mm
Max Cutting Speed: 35mm/s
Positioning Accuracy: 0.025mm
Supported Materials: Metal, Wood, Acrylic, Glass
Certification: CE, FDA, ISO9001', '/images/product-3-laser-cutter.png', 'Equipment', 0),
(7, 'Heavy Duty Industrial Press Machine', 'Professional grade hydraulic press for metal forming and stamping operations', 'Advanced hydraulic press machine designed for heavy-duty industrial applications. Features precision control system, robust steel construction, and safety interlocks. Perfect for manufacturing plants, automotive workshops, and metal fabrication facilities.', 'Capacity: 500 Ton
Stroke Length: 400mm
Table Size: 1200x800mm
Motor Power: 22kW
Pressure: 31.5 MPa
Certification: CE, ISO9001', '/images/product-4-press-machine.png', 'Industrial', 1),
(8, 'Smart IoT Control System', 'Next-generation industrial automation controller with real-time monitoring', 'State-of-the-art IoT control system for industrial automation. Features 7-inch touchscreen display, supports multiple protocols (Modbus, Profinet, EtherCAT), cloud connectivity, and advanced data analytics. Ideal for Industry 4.0 applications.', 'Display: 7" LCD Touchscreen
Connectivity: Ethernet, Wi-Fi, 4G LTE
Protocols: Modbus TCP, Profinet, EtherCAT
Operating Temp: -20 to 60°C
Inputs/Outputs: 32/24
Certification: CE, FCC', '/images/product-5-iot-control.png', 'Technology', 1),
(9, 'CNC Precision Milling Machine', 'High-precision computer numerical control milling center', 'Professional CNC milling machine with 3-axis control, spindle speed up to 12000 RPM, and positioning accuracy of 0.005mm. Designed for precision parts manufacturing in aerospace, automotive, and electronics industries.', 'Working Area: 800x500x500mm
Spindle Speed: 0-12000 RPM
Power: 15kW
Positioning Accuracy: 0.005mm
Repeatability: 0.003mm
Control System: Siemens 828D
Certification: CE, ISO9001', '/images/product-6-cnc-machine.png', 'Equipment', 1);
