'use strict';

import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
    onSearch: (term: string) => void;
    onFilterChange: (filters: any) => void;
    onSortChange: (sort: string) => void;
}

export default function FilterBar({ onSearch, onFilterChange, onSortChange }: FilterBarProps) {
    return (
        <div className="sticky top-0 z-10 w-full py-4 glass px-6 mb-8 rounded-2xl shadow-sm border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 size-5" />
                    <input
                        type="text"
                        placeholder="Where to? (e.g. Tokyo, Paris)"
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                </div>

                {/* Filters & Sorting */}
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl border-none">
                        <SlidersHorizontal className="size-4 text-zinc-400" />
                        <select
                            onChange={(e) => onFilterChange({ amenity: e.target.value })}
                            className="bg-transparent outline-none text-sm cursor-pointer"
                        >
                            <option value="">Amenities</option>
                            <option value="Wi-Fi">Wi-Fi</option>
                            <option value="Pool">Pool</option>
                            <option value="Breakfast">Breakfast</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl border-none">
                        <ArrowUpDown className="size-4 text-zinc-400" />
                        <select
                            onChange={(e) => onSortChange(e.target.value)}
                            className="bg-transparent outline-none text-sm cursor-pointer"
                        >
                            <option value="rating">Top Rated</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl border-none">
                        <span className="text-sm text-zinc-400">$</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                            className="bg-transparent outline-none text-sm w-20 appearance-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
