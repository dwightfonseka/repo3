import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

export const sql = neon(process.env.DATABASE_URL);

export interface Trip {
  id: number;
  name: string;
  price: number;
  rating: number;
  image_url: string;
  description: string;
  location: string;
  amenities: string[];
}

export interface Favorite {
  id: number;
  user_id: string;
  trip_id: number;
}
