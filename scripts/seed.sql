-- Initial Schema for Trip Finder

-- Drop existing tables if they exist
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS trips;

-- Trips Table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    rating DECIMAL(3, 1) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Amenities Table
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL
);

-- Favorites Table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) DEFAULT 'anonymous',
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    UNIQUE(user_id, trip_id)
);

-- Seed Data
INSERT INTO trips (name, price, rating, location, image_url, description) VALUES
('Modern Loft in Shibuya', 180, 4.9, 'Tokyo, Japan', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', 'Experience the pulse of Tokyo from this stylish, sun-drenched loft. Located just minutes from the world-famous Shibuya Crossing, this space offers a quiet sanctuary amidst the urban energy.'),
('Parisian Garden Suite', 240, 4.8, 'Paris, France', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800', 'A charming apartment featuring a private courtyard in the heart of Le Marais. High ceilings, vintage furniture, and fresh baguettes from the bakery downstairs make this a true Parisian dream.'),
('Cliffside Villa in Santorini', 450, 5.0, 'Oia, Greece', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800', 'Breathtaking views of the Aegean Sea. This whitewashed villa features an infinity pool and sunset views that will leave you speechless. Perfect for a romantic getaway.'),
('Luxury Alpine Chalet', 320, 4.7, 'Zermatt, Switzerland', 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=800', 'Ski-in, ski-out access with a cozy fireplace and floor-to-ceiling windows overlooking the Matterhorn. Pure luxury in the Swiss Alps.');

-- Seed Amenities
INSERT INTO amenities (trip_id, name) VALUES
(1, 'Wi-Fi'), (1, 'Coffee'), (1, 'Kitchen'),
(2, 'Wi-Fi'), (2, 'Breakfast'), (2, 'Pool'),
(3, 'Wi-Fi'), (3, 'Pool'), (3, 'Gym'), (3, 'Breakfast'),
(4, 'Wi-Fi'), (4, 'Breakfast'), (4, 'Gym'), (4, 'Kitchen');
