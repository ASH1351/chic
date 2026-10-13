import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { Eye, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'editorial';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const {
    formatPrice,
    toggleWishlist,
    isInWishlist,
    addToCart,
    setSelectedProductForDetail,
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAddSizes, setShowQuickAddSizes] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, size, 1);
    setShowQuickAddSizes(false);
  };

  return (
    <div
      className={`group relative flex flex-col bg-white border border-[#E8E1D7] hover:border-[#C49A43]/60 transition-all duration-300 ${
        viewMode === 'editorial' ? 'sm:col-span-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAddSizes(false);
        setActiveImageIndex(0);
      }}
    >
      {/* Product Image Stage */}
      <div
        className="relative overflow-hidden aspect-[3/4] cursor-pointer bg-[#F8F5EF]"
        onClick={() => setSelectedProductForDetail(product)}
      >
        {/* Main & Secondary Image */}
        <img
          src={
            isHovered && product.images.length > 1 && activeImageIndex === 0
              ? product.images[1]
              : product.images[activeImageIndex] || product.images[0]
          }
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isAtelierExclusive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#111111]/90 backdrop-blur-sm text-[#ECC876] text-[9px] tracking-[0.2em] uppercase font-medium border border-[#C49A43]/40">
              <Sparkles className="w-2.5 h-2.5" />
              Atelier Exclusive
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-[#111111] text-[9px] tracking-[0.2em] uppercase font-medium">
              New Arrival
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="px-2.5 py-0.5 bg-[#FAF4E5] text-[#9E7422] text-[9px] tracking-[0.2em] uppercase font-medium border border-[#E6CD92]">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isFavorite
              ? 'bg-[#111111] text-[#C49A43] shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-[#292725] hover:text-[#C49A43]'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-[#C49A43]' : ''}`}
          />
        </button>

        {/* Quick View & Quick Add Floating Drawer on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {showQuickAddSizes ? (
            <div className="p-3 bg-[#111111]/95 text-white backdrop-blur-md border border-[#C49A43]/40 animate-slide-up shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#B5A99A]">
                  Select Size to Add
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickAddSizes(false);
                  }}
                  className="text-xs text-[#B5A99A] hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={(e) => handleQuickAdd(s.size, e)}
                    className={`px-2.5 py-1 text-xs tracking-wider border transition-colors ${
                      s.inStock
                        ? 'border-white/20 hover:border-[#C49A43] hover:bg-[#C49A43] hover:text-[#111111]'
                        : 'border-white/10 text-white/30 cursor-not-allowed line-through'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickAddSizes(true);
                }}
                className="flex-1 py-2.5 bg-[#111111]/90 hover:bg-[#C49A43] text-white hover:text-[#111111] text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProductForDetail(product);
                }}
                className="p-2.5 bg-white/90 hover:bg-white text-[#111111] hover:text-[#C49A43] backdrop-blur-sm transition-colors"
                aria-label="Quick View product details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-[#8C7F70] mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-[#C49A43]">
              <Star className="w-3 h-3 fill-[#C49A43]" />
              <span className="font-sans font-medium text-[#292725]">{product.rating}</span>
              <span className="text-[#B5A99A]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="font-editorial text-lg sm:text-xl text-[#111111] font-normal hover:text-[#C49A43] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-[#8C7F70] font-light mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Colors & Price Section */}
        <div className="mt-4 pt-3 border-t border-[#E8E1D7] flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-[#C49A43] ring-offset-1 scale-110 border-[#111111]'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-xs text-[#B5A99A] line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-medium tracking-wider text-[#111111]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
