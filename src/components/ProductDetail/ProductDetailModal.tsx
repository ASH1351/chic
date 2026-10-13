import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/fashionData';
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Ruler,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSizeGuideModalOpen,
    addToast,
  } = useCart();

  const product = selectedProductForDetail;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fit' | 'shipping' | 'reviews'>('details');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      const availableSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size;
      setSelectedSize(availableSize);
      setActiveImageIndex(0);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProductForDetail(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProductForDetail]);

  if (!product || !selectedColor) return null;

  const isFavorite = isInWishlist(product.id);
  const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);

  // Paired Products for "Complete The Look"
  const pairedProducts = (product.pairedWith || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Chic Couture — ${product.name}`,
        text: product.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Private link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/85 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedProductForDetail(null)}
      />

      {/* Modal Stage */}
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] border border-[#C49A43]/40 shadow-2xl max-h-[95vh] overflow-y-auto z-10 animate-fade-in text-[#292725]">
        {/* Sticky Close Header */}
        <div className="sticky top-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8E1D7]">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8C7F70]">
            <span>Chic Couture</span>
            <ChevronRight className="w-3 h-3 text-[#C49A43]" />
            <span>{product.collection}</span>
            <ChevronRight className="w-3 h-3 text-[#C49A43]" />
            <span className="text-[#111111] font-medium">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#8C7F70] hover:text-[#111111] transition-colors"
              title="Share silhouette"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="p-2 text-[#8C7F70] hover:text-[#111111] transition-colors"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-26 overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C49A43] ring-1 ring-[#C49A43]'
                      : 'border-[#E8E1D7] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom feel */}
            <div className="relative flex-1 aspect-[3/4] bg-white border border-[#E8E1D7] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {product.isAtelierExclusive && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#111111]/90 backdrop-blur-sm text-[#ECC876] text-[10px] tracking-[0.2em] uppercase font-medium border border-[#C49A43]/40 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Atelier Exclusive
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Purchasing & Specs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs tracking-[0.18em] uppercase text-[#8C7F70] mb-2">
                <span className="text-[#C49A43] font-medium">{product.category}</span>
                <div className="flex items-center gap-1 text-[#C49A43]">
                  <Star className="w-3.5 h-3.5 fill-[#C49A43]" />
                  <span className="font-sans font-medium text-[#111111]">{product.rating}</span>
                  <span className="text-[#8C7F70]">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#111111] leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-xs text-[#8C7F70] font-light mt-2 leading-relaxed">
                {product.tagline}
              </p>

              {/* Price & Installments */}
              <div className="mt-4 pt-4 border-t border-[#E8E1D7]">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-serif text-[#111111] tracking-wider">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#B5A99A] line-through font-light">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#8C7F70] mt-1">
                  or 4 interest-free payments of{' '}
                  <strong className="text-[#111111]">{formatPrice(Math.round(product.price / 4))}</strong>{' '}
                  with No-Cost EMI or Major Cards
                </p>
              </div>

              {/* Color Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-[0.16em] text-[#8C7F70]">Color:</span>
                  <span className="font-medium text-[#111111]">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-[#C49A43] ring-offset-2 border-[#111111]'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.name === c.name && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            c.hex === '#F8F5EF' ? 'text-[#111111]' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Fit Assistant */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-[0.16em] text-[#8C7F70]">Size:</span>
                  <button
                    onClick={() => setSizeGuideModalOpen(true)}
                    className="flex items-center gap-1 text-[#C49A43] hover:underline uppercase tracking-wider text-[11px] font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide & Fit Assistant</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-[#FAF5E8] border-[#111111]'
                            : s.inStock
                            ? 'bg-white border-[#E8E1D7] text-[#292725] hover:border-[#C49A43]'
                            : 'bg-[#F0EBE1]/50 border-dashed border-[#D6CEC5] text-[#B5A99A] cursor-not-allowed line-through'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Warning */}
                {selectedSizeObj?.remainingCount && (
                  <p className="text-[11px] text-[#B28731] mt-2 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A43] animate-pulse" />
                    Atelier Alert: Only {selectedSizeObj.remainingCount} pieces left in this size
                  </p>
                )}
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className="mt-8 flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E1D7] bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-[#8C7F70] hover:text-[#111111] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-medium font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-[#8C7F70] hover:text-[#111111] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border transition-all ${
                    isFavorite
                      ? 'bg-[#111111] border-[#111111] text-[#C49A43]'
                      : 'bg-white border-[#E8E1D7] text-[#292725] hover:border-[#C49A43]'
                  }`}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C49A43]' : ''}`} />
                </button>
              </div>

              {/* Reassurance Badges */}
              <div className="mt-6 pt-5 border-t border-[#E8E1D7] flex flex-col gap-2 text-xs text-[#8C7F70]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C49A43]" />
                  <span>Complimentary White-Glove Express Delivery on all acquisitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C49A43]" />
                  <span>30-Day Atelier Guarantee & Complimentary Bespoke Alterations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Details, Fit, Shipping, Reviews */}
        <div className="px-6 sm:px-8 border-t border-[#E8E1D7] mt-4">
          <div className="flex items-center gap-8 border-b border-[#E8E1D7] overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === 'details'
                  ? 'text-[#111111] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A43]'
                  : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
            >
              Fabric & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('fit')}
              className={`py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === 'fit'
                  ? 'text-[#111111] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A43]'
                  : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
            >
              Silhouette & Fit
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'text-[#111111] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A43]'
                  : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
            >
              White-Glove Shipping
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-[#111111] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C49A43]'
                  : 'text-[#8C7F70] hover:text-[#111111]'
              }`}
            >
              Client Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-6 text-xs sm:text-sm text-[#292725] leading-relaxed">
            {activeTab === 'details' && (
              <div>
                <p className="font-medium text-[#111111] mb-2">Material: {product.fabric}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#8C7F70]">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                {product.sustainabilityTag && (
                  <div className="mt-4 p-3 bg-[#FAF4E5] border border-[#E6CD92] text-[#9E7422] inline-block text-xs">
                    ✦ {product.sustainabilityTag}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'fit' && (
              <div>
                <p className="text-[#292725] mb-2">{product.fit}</p>
                <p className="text-[#8C7F70]">
                  Model is 179cm / 5'10" and wearing Chic Couture Size S. For personalized hem lengths or atelier alteration inquiries, contact our concierge anytime.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-2 text-[#8C7F70]">
                <p>
                  <strong>Complimentary Express Delivery:</strong> All orders receive white-glove courier shipping arriving within 2–4 business days worldwide.
                </p>
                <p>
                  <strong>Luxury Packaging:</strong> Hand-packed in our signature matte black gift box, lined in acid-free archival tissue, sealed with a gold wax emblem.
                </p>
                <p>
                  <strong>Complimentary Returns:</strong> We offer 30-day effortless returns with courier pickup directly from your residence.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-white border border-[#E8E1D7]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-editorial text-base text-[#111111] font-medium">
                            {rev.author}
                          </span>
                          <span className="text-[#8C7F70] text-xs">— {rev.location}</span>
                          {rev.verified && (
                            <span className="px-2 py-0.5 bg-[#FAF4E5] text-[#9E7422] text-[9px] uppercase tracking-wider font-semibold">
                              Verified Client
                            </span>
                          )}
                        </div>
                        <div className="flex text-[#C49A43]">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#C49A43]" />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-[#111111] mb-1">{rev.title}</h4>
                      <p className="text-xs text-[#8C7F70] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#8C7F70]">
                    Be the first to leave an editorial impression for this atelier creation.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Complete The Look Styling Bundle */}
        {pairedProducts.length > 0 && (
          <div className="p-6 sm:p-8 bg-[#F3EED8]/30 border-t border-[#E8E1D7]">
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#C49A43] font-medium block mb-1">
              Curated Ensemble
            </span>
            <h3 className="font-editorial text-2xl text-[#111111] mb-4">
              Complete The Look
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pairedProducts.map((paired) => {
                if (!paired) return null;
                return (
                  <div
                    key={paired.id}
                    className="flex gap-4 p-3 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-colors"
                  >
                    <img
                      src={paired.images[0]}
                      alt={paired.name}
                      className="w-20 h-24 object-cover shrink-0 cursor-pointer"
                      onClick={() => setSelectedProductForDetail(paired)}
                    />
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div>
                        <span className="text-[9px] tracking-wider uppercase text-[#C49A43]">
                          {paired.category}
                        </span>
                        <h4
                          onClick={() => setSelectedProductForDetail(paired)}
                          className="font-editorial text-base text-[#111111] hover:text-[#C49A43] cursor-pointer"
                        >
                          {paired.name}
                        </h4>
                        <p className="text-xs font-medium text-[#111111] mt-1">
                          {formatPrice(paired.price)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          addToCart(paired, paired.colors[0], paired.sizes[0].size, 1)
                        }
                        className="text-[10px] uppercase tracking-[0.16em] text-[#111111] hover:text-[#C49A43] font-medium flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add Pair to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
