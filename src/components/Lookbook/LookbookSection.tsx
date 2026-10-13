import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { LOOKBOOK_SLIDES, PRODUCTS } from '../../data/fashionData';
import type { Hotspot } from '../../types';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Plus, ShoppingBag, Sparkles } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { formatPrice, addToCart, setSelectedProductForDetail } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const slide = LOOKBOOK_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setActiveHotspot(null);
    setCurrentSlideIndex((prev) => (prev + 1) % LOOKBOOK_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setCurrentSlideIndex((prev) => (prev - 1 + LOOKBOOK_SLIDES.length) % LOOKBOOK_SLIDES.length);
  };

  return (
    <section id="lookbook" className="py-24 bg-[#111111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C49A43] text-[11px] tracking-[0.25em] uppercase font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Editorial</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FAF5E8]">
              Shop The Runway Lookbook
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-[#B5A99A] font-light max-w-md">
            Click on the illuminated champagne gold pins to view and acquire each piece directly from the runway silhouette.
          </p>
        </div>

        {/* Lookbook Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Interactive Image Container (8 Cols) */}
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/11] bg-[#1A1918] overflow-hidden border border-[#C49A43]/30">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 filter brightness-95"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Hotspot Pins */}
            {slide.hotspots.map((hs) => {
              const product = PRODUCTS.find((p) => p.id === hs.productId);
              const isActive = activeHotspot?.id === hs.id;

              return (
                <div
                  key={hs.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  {/* Pulsing Pin Button */}
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : hs)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#FAF5E8] text-[#111111] scale-125 shadow-[0_0_20px_#C49A43]'
                        : 'bg-[#C49A43] text-[#111111] hover:scale-110 shadow-[0_0_15px_rgba(196,154,67,0.7)]'
                    }`}
                    aria-label={`Inspect ${hs.label}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-[#C49A43] animate-ping opacity-40" />
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Hotspot Card Tooltip */}
                  {isActive && product && (
                    <div
                      className="absolute left-10 -top-12 w-64 p-3.5 bg-[#FAF5E8] text-[#292725] border border-[#C49A43] shadow-2xl z-30 animate-fade-in"
                      style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                    >
                      <div className="flex gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-20 object-cover shrink-0 cursor-pointer"
                          onClick={() => setSelectedProductForDetail(product)}
                        />
                        <div className="flex flex-col justify-between flex-1 py-0.5">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#C49A43] font-medium">
                              {product.category}
                            </span>
                            <h4
                              onClick={() => setSelectedProductForDetail(product)}
                              className="font-editorial text-sm font-medium text-[#111111] hover:text-[#C49A43] cursor-pointer line-clamp-2 leading-tight"
                            >
                              {product.name}
                            </h4>
                          </div>

                          <div className="text-xs font-semibold text-[#111111] mt-1">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#E8E1D7] flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProductForDetail(product)}
                          className="text-[10px] uppercase tracking-wider text-[#8C7F70] hover:text-[#111111] flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Quick View</span>
                        </button>

                        <button
                          onClick={() =>
                            addToCart(
                              product,
                              product.colors[0],
                              product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size,
                              1
                            )
                          }
                          className="text-[10px] uppercase tracking-wider text-[#C49A43] hover:text-[#111111] font-semibold flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Slide Navigation Buttons */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C49A43] hover:text-black border border-white/20 flex items-center justify-center transition-all"
                aria-label="Previous lookbook slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C49A43] hover:text-black border border-white/20 flex items-center justify-center transition-all"
                aria-label="Next lookbook slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lookbook Narrative & Items List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full py-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-medium">
                {slide.season}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF5E8] mt-1 leading-tight">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B5A99A] font-light mt-4 leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* List of silhouettes in this look */}
            <div className="mt-8 pt-6 border-t border-[#292725]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7F70] block mb-3">
                Featured Silhouettes in this Look
              </span>

              <div className="space-y-3">
                {slide.hotspots.map((hs) => {
                  const product = PRODUCTS.find((p) => p.id === hs.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={hs.id}
                      onClick={() => setSelectedProductForDetail(product)}
                      className="group flex items-center justify-between p-2.5 bg-[#1A1918] hover:bg-[#292725] border border-[#292725] hover:border-[#C49A43] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-12 object-cover"
                        />
                        <div>
                          <h5 className="font-editorial text-sm text-[#FAF5E8] group-hover:text-[#C49A43] transition-colors line-clamp-1">
                            {product.name}
                          </h5>
                          <span className="text-[11px] text-[#C49A43]">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C7F70] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
