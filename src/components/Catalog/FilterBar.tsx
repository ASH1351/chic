import React, { useState } from 'react';
import type { FilterState } from '../../types';
import { ChevronDown, LayoutGrid, SlidersHorizontal, Square, X } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
  totalProducts: number;
  viewMode: 'grid' | 'editorial';
  setViewMode: (mode: 'grid' | 'editorial') => void;
}

const CATEGORIES = [
  'All',
  'Evening Gowns',
  'Blazers & Outerwear',
  'Silk & Satin',
  'Tailored Trousers',
  'Knitwear',
  'Accessories',
];

const FABRICS = [
  'All Fabrics',
  'Mulberry Silk',
  'Virgin Wool',
  'Mongolian Cashmere',
  'Organic Linen',
  'Silk Velvet',
];

const COLOR_OPTIONS = [
  { name: 'Gold', hex: '#C49A43' },
  { name: 'Black', hex: '#111111' },
  { name: 'Ivory', hex: '#F8F5EF' },
  { name: 'Taupe', hex: '#B5A99A' },
  { name: 'Bordeaux', hex: '#4A1521' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  totalMatches,
  totalProducts,
  viewMode,
  setViewMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeFilterCount =
    (filter.category !== 'All' ? 1 : 0) +
    (filter.collection !== 'All' ? 1 : 0) +
    (filter.fabric !== 'All Fabrics' ? 1 : 0) +
    (filter.color ? 1 : 0) +
    (filter.size ? 1 : 0) +
    (filter.onlyExclusive ? 1 : 0) +
    (filter.searchQuery ? 1 : 0);

  const handleClearAll = () => {
    setFilter({
      category: 'All',
      collection: 'All',
      fabric: 'All Fabrics',
      color: '',
      size: '',
      minPrice: 0,
      maxPrice: 3000,
      sortBy: 'featured',
      onlyExclusive: false,
      searchQuery: '',
    });
  };

  return (
    <div className="w-full mb-8">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#E8E1D7]">
        {CATEGORIES.map((cat) => {
          const isActive = filter.category === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter((prev) => ({ ...prev, category: cat }))}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-[#111111] text-[#FAF5E8] border border-[#C49A43]'
                  : 'bg-white hover:bg-[#FAF4E5]/50 text-[#292725] border border-[#E8E1D7] hover:border-[#C49A43]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Bar: Filters Button, Sort Dropdown, View Mode, Count */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Filter Toggle & Counter */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex items-center gap-2 px-4 py-2 border text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
              drawerOpen || activeFilterCount > 0
                ? 'bg-[#111111] text-[#FAF5E8] border-[#111111]'
                : 'bg-white text-[#292725] border-[#E8E1D7] hover:border-[#C49A43]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C49A43]" />
            <span>Refine Atelier</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C49A43] text-[#111111] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs text-[#8C7F70] hidden sm:inline-block">
            Showing <strong className="text-[#111111] font-medium">{totalMatches}</strong> of{' '}
            {totalProducts} Masterpieces
          </span>
        </div>

        {/* Right: Sort Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Sort By */}
          <div className="relative">
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="appearance-none bg-white border border-[#E8E1D7] hover:border-[#C49A43] text-xs uppercase tracking-[0.16em] text-[#292725] py-2 pl-3.5 pr-8 outline-none cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C7F70] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border border-[#E8E1D7] bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
              title="Standard Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('editorial')}
              className={`p-2 transition-colors ${
                viewMode === 'editorial' ? 'bg-[#111111] text-white' : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
              title="Editorial Large View"
              aria-label="Editorial View"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Refine Drawer */}
      {drawerOpen && (
        <div className="mt-4 p-6 bg-white border border-[#C49A43]/30 shadow-md animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Fabric / Material */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-3">
                Fabric & Fiber
              </h4>
              <div className="flex flex-col gap-1.5 text-xs">
                {FABRICS.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => setFilter((prev) => ({ ...prev, fabric: fab }))}
                    className={`text-left py-1 transition-colors ${
                      filter.fabric === fab
                        ? 'text-[#C49A43] font-semibold'
                        : 'text-[#292725] hover:text-[#C49A43]'
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-3">
                Tonal Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = filter.color.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.name}
                      onClick={() =>
                        setFilter((prev) => ({
                          ...prev,
                          color: isSelected ? '' : c.name,
                        }))
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border transition-all ${
                        isSelected
                          ? 'border-[#C49A43] bg-[#FAF4E5] text-[#111111]'
                          : 'border-[#E8E1D7] text-[#292725] hover:border-[#C49A43]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-3">
                Size
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((sz) => {
                  const isSelected = filter.size === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() =>
                        setFilter((prev) => ({
                          ...prev,
                          size: isSelected ? '' : sz,
                        }))
                      }
                      className={`w-9 h-8 text-xs font-medium border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white border-[#E8E1D7] text-[#292725] hover:border-[#C49A43]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atelier Exclusives & Reset */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-3">
                  Privileges
                </h4>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#292725]">
                  <input
                    type="checkbox"
                    checked={filter.onlyExclusive}
                    onChange={(e) =>
                      setFilter((prev) => ({ ...prev, onlyExclusive: e.target.checked }))
                    }
                    className="accent-[#C49A43] w-4 h-4 cursor-pointer"
                  />
                  <span>Atelier Exclusives Only</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-[#8C7F70] hover:text-[#111111] underline underline-offset-4"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#C49A43] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {filter.category !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E1D7] text-xs text-[#292725]">
              Category: {filter.category}
              <button
                onClick={() => setFilter((prev) => ({ ...prev, category: 'All' }))}
                className="hover:text-[#C49A43]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.fabric !== 'All Fabrics' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E1D7] text-xs text-[#292725]">
              Fabric: {filter.fabric}
              <button
                onClick={() => setFilter((prev) => ({ ...prev, fabric: 'All Fabrics' }))}
                className="hover:text-[#C49A43]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.color && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E1D7] text-xs text-[#292725]">
              Color: {filter.color}
              <button
                onClick={() => setFilter((prev) => ({ ...prev, color: '' }))}
                className="hover:text-[#C49A43]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.size && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E1D7] text-xs text-[#292725]">
              Size: {filter.size}
              <button
                onClick={() => setFilter((prev) => ({ ...prev, size: '' }))}
                className="hover:text-[#C49A43]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.onlyExclusive && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF4E5] border border-[#E6CD92] text-xs text-[#9E7422]">
              Atelier Exclusives
              <button
                onClick={() => setFilter((prev) => ({ ...prev, onlyExclusive: false }))}
                className="hover:text-[#111111]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleClearAll}
            className="text-xs text-[#C49A43] hover:underline ml-2 uppercase tracking-wider font-medium"
          >
            Clear All ({activeFilterCount})
          </button>
        </div>
      )}
    </div>
  );
};
