import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function seed() {
    try {
        const seedFile = fs.readFileSync('seed.sql', 'utf8');
        const queries = seedFile.split(';').filter(q => q.trim());

        console.log('Seeding database...');
        for (const query of queries) {
            if (query.trim()) {
                await sql.query(query);
            }
        }
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
