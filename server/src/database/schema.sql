-- Create database
CREATE DATABASE IF NOT EXISTS smartnepal;
USE smartnepal;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Buses table
CREATE TABLE IF NOT EXISTS buses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    operator VARCHAR(100),
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    total_seats INT NOT NULL DEFAULT 40,
    available_seats INT NOT NULL DEFAULT 40,
    price DECIMAL(10, 2) NOT NULL,
    bus_type VARCHAR(50),
    amenities TEXT,
    seat_layout JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_route (from_location, to_location),
    INDEX idx_departure (departure_time)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bus_id INT NOT NULL,
    seats JSON NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_transaction (transaction_id)
);

-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    address TEXT,
    description TEXT,
    rating DECIMAL(3, 1) DEFAULT 0.0,
    price_per_night DECIMAL(10, 2) NOT NULL,
    total_rooms INT NOT NULL,
    available_rooms INT NOT NULL,
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_location (location),
    INDEX idx_rating (rating DESC)
);

-- Hotel images table
CREATE TABLE IF NOT EXISTS hotel_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_hotel (hotel_id)
);

-- Insert sample data
INSERT INTO users (name, email, password, phone) VALUES
('John Doe', 'john@example.com', '$2a$10$YourHashedPasswordHere', '9841000001'),
('Jane Smith', 'jane@example.com', '$2a$10$YourHashedPasswordHere', '9841000002');

INSERT INTO buses (name, operator, from_location, to_location, departure_time, arrival_time, total_seats, available_seats, price, bus_type) VALUES
('Greenline Deluxe', 'Greenline Travels', 'Kathmandu', 'Pokhara', '2023-12-25 06:00:00', '2023-12-25 14:00:00', 40, 35, 2000.00, 'Deluxe'),
('Sajha Yatayat', 'Sajha Cooperative', 'Kathmandu', 'Pokhara', '2023-12-25 07:30:00', '2023-12-25 15:30:00', 45, 40, 1500.00, 'Standard'),
('Golden Travels', 'Golden Bus Service', 'Pokhara', 'Kathmandu', '2023-12-26 08:00:00', '2023-12-26 16:00:00', 35, 30, 1800.00, 'AC');

INSERT INTO hotels (name, location, address, rating, price_per_night, total_rooms, available_rooms) VALUES
('Hotel Everest', 'Kathmandu', 'Thamel, Kathmandu', 4.5, 5000.00, 100, 45),
('Pokhara Grande', 'Pokhara', 'Lakeside, Pokhara', 4.7, 4500.00, 80, 30),
('Chitwan Jungle Lodge', 'Chitwan', 'Sauraha, Chitwan', 4.3, 3500.00, 50, 20);