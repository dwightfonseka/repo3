'use strict';

import React from 'react';
import { Star, Heart, MapPin } from 'lucide-react';
import { Trip } from '@/lib/db';
import { motion } from 'framer-motion';

interface TripCardProps {
    trip: Trip;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onClick: (trip: Trip) => void;
}

export default function TripCard({ trip, isFavorite, onToggleFavorite, onClick }: TripCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 cursor-pointer"
            onClick={() => onClick(trip)}
        >
            {/* Image Section */}
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={trip.image_url}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(trip.id);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full glass hover:scale-110 active:scale-95 transition-all"
                >
                    <Heart
                        className={`size-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`}
                    />
                </button>

                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 glass rounded-full">
                    <MapPin className="size-3" />
                    {trip.location}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg truncate pr-2 group-hover:text-primary transition-colors">
                        {trip.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{trip.rating}</span>
                    </div>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4 h-10">
                    {trip.description}
                </p>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Per Night</span>
                        <span className="text-xl font-black text-primary">${trip.price}</span>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
