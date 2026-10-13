import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/fashionData';
import type { Product } from '../../types';
import { ArrowRight, Search, Sparkles, X } from 'lucide-react';

const TRENDING_SEARCHES = [
  'Backless Silk Gown',
  'Sculpted Crepe Blazer',
  '22-Momme Silk Slip',
  'Velvet Smoking Jacket',
  'Baroque Pearl Choker',
  'Cashmere Cocoon Coat',
];

export const SearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    formatPrice,
    setSelectedProductForDetail,
  } = useCart();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [searchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.tagline.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.fabric.toLowerCase().includes(trimmed) ||
        p.collection.toLowerCase().includes(trimmed)
    );
    setResults(filtered);
  }, [query]);

  const handleSelectProduct = (product: Product) => {
    setSearchModalOpen(false);
    setSelectedProductForDetail(product);
  };

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] border border-[#C49A43]/40 shadow-2xl overflow-hidden z-10 animate-fade-in">
        {/* Top Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E8E1D7] bg-white">
          <Search className="w-6 h-6 text-[#C49A43]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, fabric (e.g. Mulberry Silk), or piece..."
            className="w-full text-base sm:text-lg bg-transparent text-[#111111] placeholder:text-[#B5A99A] outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C7F70] hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-2 -mr-2 text-[#8C7F70] hover:text-[#111111] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* Query Results */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.16em] text-[#8C7F70]">
                  Found {results.length} {results.length === 1 ? 'Masterpiece' : 'Masterpieces'}
                </span>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="group flex gap-4 p-3 bg-white hover:bg-[#F3EED8]/30 border border-[#E8E1D7] hover:border-[#C49A43] transition-all cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-24 object-cover shrink-0"
                      />
                      <div className="flex flex-col justify-between py-0.5">
                        <div>
                          <span className="text-[10px] tracking-[0.14em] uppercase text-[#C49A43] font-medium">
                            {product.category}
                          </span>
                          <h4 className="font-editorial text-base text-[#111111] group-hover:text-[#C49A43] transition-colors leading-snug">
                            {product.name}
                          </h4>
                        </div>
                        <div className="text-xs font-medium text-[#111111] tracking-wider">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[#8C7F70]">
                  <p className="font-editorial text-xl italic text-[#111111]">
                    No garments found matching "{query}"
                  </p>
                  <p className="text-xs mt-2 font-light">
                    Try searching for “Silk”, “Gown”, “Blazer”, or “Velvet”.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Suggestions & Trending */
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8C7F70] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A43]" />
                <span>Trending Searches & Curations</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {TRENDING_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 bg-white border border-[#E8E1D7] hover:border-[#C49A43] text-xs text-[#292725] hover:text-[#C49A43] transition-colors tracking-wide"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E8E1D7]">
                <div className="text-xs uppercase tracking-[0.18em] text-[#8C7F70] mb-3">
                  Atelier Highlights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="group cursor-pointer p-2.5 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-all flex items-center gap-3"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-16 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-editorial text-[#111111] truncate group-hover:text-[#C49A43]">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-[#8C7F70] mt-0.5">
                          {formatPrice(prod.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F0EBE1] border-t border-[#E8E1D7] flex items-center justify-between text-[11px] text-[#8C7F70]">
          <span>Press ESC to close</span>
          <span className="flex items-center gap-1 text-[#C49A43]">
            <span>Chic Couture Haute Curation</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
