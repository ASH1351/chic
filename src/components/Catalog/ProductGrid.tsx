import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/fashionData';
import type { FilterState } from '../../types';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  initialCollection?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ initialCollection }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');

  const [filter, setFilter] = useState<FilterState>({
    category: 'All',
    collection: initialCollection || 'All',
    fabric: 'All Fabrics',
    color: '',
    size: '',
    minPrice: 0,
    maxPrice: 3000,
    sortBy: 'featured',
    onlyExclusive: false,
    searchQuery: '',
  });

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category
      if (filter.category !== 'All' && item.category !== filter.category) {
        return false;
      }
      // Collection
      if (filter.collection !== 'All' && item.collection !== filter.collection) {
        return false;
      }
      // Fabric
      if (filter.fabric !== 'All Fabrics' && !item.fabric.toLowerCase().includes(filter.fabric.toLowerCase())) {
        return false;
      }
      // Color
      if (
        filter.color &&
        !item.colors.some((c) => c.name.toLowerCase().includes(filter.color.toLowerCase()))
      ) {
        return false;
      }
      // Size
      if (
        filter.size &&
        !item.sizes.some((s) => s.size.toLowerCase() === filter.size.toLowerCase() && s.inStock)
      ) {
        return false;
      }
      // Exclusives
      if (filter.onlyExclusive && !item.isAtelierExclusive) {
        return false;
      }
      // Search
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesFabric = item.fabric.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price-asc') return a.price - b.price;
      if (filter.sortBy === 'price-desc') return b.price - a.price;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      if (filter.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured maintains editorial balance
    });
  }, [filter]);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-12">
      {/* Editorial Section Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E1D7]">
        <div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block mb-2">
            Haute Prêt-à-Porter
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-normal tracking-tight">
            The Complete Atelier Collection
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-xs sm:text-sm text-[#8C7F70] font-light max-w-md">
          Each silhouette is conceived to embody our singular tenet: <em className="font-serif italic text-[#111111]">“Wear Confidence.”</em> Hand-draped in limited artisan quantities.
        </p>
      </div>

      {/* Filter and Sorting Controls */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        totalMatches={filteredProducts.length}
        totalProducts={PRODUCTS.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === 'editorial'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white border border-[#E8E1D7] p-8">
          <p className="font-editorial text-2xl text-[#111111] italic">
            No silhouettes matched your current selection
          </p>
          <p className="text-xs text-[#8C7F70] mt-2 font-light">
            Try adjusting your fabric, color, or category criteria to discover pieces in the archive.
          </p>
          <button
            onClick={() =>
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
              })
            }
            className="mt-6 px-6 py-2.5 bg-[#111111] hover:bg-[#C49A43] text-white text-xs uppercase tracking-[0.2em] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
