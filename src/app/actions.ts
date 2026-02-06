'use server';

import { sql, Trip } from '@/lib/db';

export async function getTrips() {
    try {
        const rows = await sql.query(`
      SELECT t.*, array_agg(a.name) as amenities
      FROM trips t
      LEFT JOIN amenities a ON t.id = a.trip_id
      GROUP BY t.id
    `);

        return rows as unknown as Trip[];
    } catch (error) {
        console.error('Error fetching trips:', error);
        return [];
    }
}

export async function getFavorites(userId: string = 'anonymous') {
    try {
        const rows = await sql.query('SELECT trip_id FROM favorites WHERE user_id = $1', [userId]);
        return rows.map((r: any) => r.trip_id);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export async function toggleFavoriteAction(tripId: number, userId: string = 'anonymous') {
    try {
        const existing = await sql.query(
            'SELECT id FROM favorites WHERE user_id = $1 AND trip_id = $2',
            [userId, tripId]
        );

        if (existing.length > 0) {
            await sql.query('DELETE FROM favorites WHERE user_id = $1 AND trip_id = $2', [userId, tripId]);
            return { action: 'removed', tripId };
        } else {
            await sql.query('INSERT INTO favorites (user_id, trip_id) VALUES ($1, $2)', [userId, tripId]);
            return { action: 'added', tripId };
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw new Error('Failed to update favorite');
    }
}
