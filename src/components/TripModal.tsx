'use strict';

import React from 'react';
import { X, Wifi, Coffee, Waves, Dumbbell, Star, MapPin, Heart } from 'lucide-react';
import { Trip } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';

interface TripModalProps {
    trip: Trip | null;
    isOpen: boolean;
    onClose: () => void;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
    'Wi-Fi': <Wifi className="size-4" />,
    'Breakfast': <Coffee className="size-4" />,
    'Pool': <Waves className="size-4" />,
    'Gym': <Dumbbell className="size-4" />,
};

export default function TripModal({ trip, isOpen, onClose, isFavorite, onToggleFavorite }: TripModalProps) {
    if (!trip) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                            {/* Left: Image Carousel (Simple for now) */}
                            <div className="md:w-1/2 relative h-64 md:h-auto">
                                <img
                                    src={trip.image_url}
                                    alt={trip.name}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 left-6 p-2 rounded-full glass hover:bg-white dark:hover:bg-zinc-800 transition-all"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Right: Content */}
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-1 text-primary text-sm font-bold tracking-wider uppercase">
                                            <MapPin className="size-4" />
                                            {trip.location}
                                        </div>
                                        <button
                                            onClick={() => onToggleFavorite(trip.id)}
                                            className={`p-2 rounded-full transition-all ${isFavorite ? 'bg-red-50 dark:bg-red-500/10' : 'bg-zinc-100 dark:bg-zinc-800'}`}
                                        >
                                            <Heart className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
                                        </button>
                                    </div>

                                    <h2 className="text-4xl font-black mb-4 leading-tight">{trip.name}</h2>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full font-bold">
                                            <Star className="size-4 fill-amber-600" />
                                            {trip.rating}
                                        </div>
                                        <div className="text-zinc-400 text-sm">• 128 Reviews</div>
                                    </div>

                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                                        {trip.description}
                                    </p>

                                    <div className="mb-8">
                                        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-400">Amenities</h4>
                                        <div className="flex flex-wrap gap-4">
                                            {trip.amenities.map(amenity => (
                                                <div key={amenity} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl text-sm font-medium">
                                                    {amenityIcons[amenity]}
                                                    {amenity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-400 text-xs font-bold uppercase">Estimated Price</span>
                                        <span className="text-3xl font-black text-primary">${trip.price}<span className="text-sm font-normal text-zinc-400 ml-1">/ night</span></span>
                                    </div>
                                    <button className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
