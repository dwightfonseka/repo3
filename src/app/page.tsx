'use client';

import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from '@/components/FilterBar';
import TripCard from '@/components/TripCard';
import TripModal from '@/components/TripModal';
import { Trip } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrips, getFavorites, toggleFavoriteAction } from './actions';

export default function TripFinderPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ amenity: '', maxPrice: '' });
  const [sort, setSort] = useState('rating');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        const [allTrips, favs] = await Promise.all([getTrips(), getFavorites()]);
        setTrips(allTrips);
        setFavorites(favs);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const toggleFavorite = async (id: number) => {
    // Optimistic update
    const isFav = favorites.includes(id);
    setFavorites(prev =>
      isFav ? prev.filter(f => f !== id) : [...prev, id]
    );

    try {
      await toggleFavoriteAction(id);
    } catch (err) {
      // Rollback on error
      console.error('Failed to toggle favorite', err);
      setFavorites(prev =>
        isFav ? [...prev, id] : prev.filter(f => f !== id)
      );
    }
  };

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    // Search
    if (search) {
      result = result.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Amenity Filter
    if (filters.amenity) {
      result = result.filter(t => t.amenities.includes(filters.amenity));
    }

    // Price Filter
    if (filters.maxPrice) {
      result = result.filter(t => t.price <= Number(filters.maxPrice));
    }

    // Sorting
    result.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return b.rating - a.rating;
    });

    return result;
  }, [trips, search, filters, sort]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-black tracking-tighter mb-4 text-zinc-900 dark:text-white">
          Trip <span className="text-primary italic">Finder</span>
        </h1>
        <p className="text-zinc-500 max-w-xl text-lg">
          Discover handpicked luxury escapes and unique urban sanctuaries for your next unforgettable journey.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onSearch={setSearch}
        onFilterChange={(f) => setFilters(prev => ({ ...prev, ...f }))}
        onSortChange={setSort}
      />

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                isFavorite={favorites.includes(trip.id)}
                onToggleFavorite={toggleFavorite}
                onClick={setSelectedTrip}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTrips.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-zinc-400">No trips found. Try a different search!</h3>
        </div>
      )}

      {/* Modal */}
      <TripModal
        trip={selectedTrip}
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        isFavorite={selectedTrip ? favorites.includes(selectedTrip.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </main>
  );
}
