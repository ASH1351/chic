import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/fashionData';
import { Heart, Share2, ShoppingBag, Trash2, X } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    wishlistDrawerOpen,
    setWishlistDrawerOpen,
    toggleWishlist,
    moveWishlistToCart,
    moveAllWishlistToCart,
    formatPrice,
    setSelectedProductForDetail,
    addToast,
  } = useCart();

  useEffect(() => {
    if (wishlistDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [wishlistDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWishlistDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setWishlistDrawerOpen]);

  if (!wishlistDrawerOpen) return null;

  const wishlistProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Wishlist Link Copied', 'Share your curated wishlist with someone special.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setWishlistDrawerOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-lg w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50 border-l border-[#E8E1D7] animate-slide-left">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C49A43] fill-[#C49A43]" />
            <h3 className="font-editorial text-2xl text-[#111111]">
              Saved Wishlist
            </h3>
            <span className="text-xs text-[#8C7F70]">
              ({wishlist.length} {wishlist.length === 1 ? 'Silhouette' : 'Silhouettes'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {wishlist.length > 0 && (
              <button
                onClick={handleShareWishlist}
                className="p-2 text-[#8C7F70] hover:text-[#111111] transition-colors"
                title="Share Wishlist"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setWishlistDrawerOpen(false)}
              className="p-1.5 text-[#8C7F70] hover:text-[#111111] transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length > 0 ? (
            <div className="divide-y divide-[#E8E1D7]">
              {wishlistProducts.map((prod) => {
                if (!prod) return null;
                return (
                  <div key={prod.id} className="py-4 first:pt-0 flex gap-4">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      onClick={() => {
                        setWishlistDrawerOpen(false);
                        setSelectedProductForDetail(prod);
                      }}
                      className="w-20 h-26 object-cover object-top border border-[#E8E1D7] shrink-0 cursor-pointer hover:opacity-90"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setWishlistDrawerOpen(false);
                              setSelectedProductForDetail(prod);
                            }}
                            className="font-editorial text-base text-[#111111] hover:text-[#C49A43] cursor-pointer leading-snug line-clamp-1"
                          >
                            {prod.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="text-[#B5A99A] hover:text-[#111111] p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] tracking-wider uppercase text-[#C49A43] font-medium">
                          {prod.category}
                        </span>
                        <div className="text-xs font-semibold text-[#111111] mt-1">
                          {formatPrice(prod.price)}
                        </div>
                      </div>

                      <button
                        onClick={() => moveWishlistToCart(prod.id)}
                        className="mt-3 py-2 px-3 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-[10px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Heart className="w-12 h-12 text-[#B5A99A] mx-auto mb-3 stroke-[1.2]" />
              <p className="font-editorial text-2xl text-[#111111] italic">
                Your wishlist is empty
              </p>
              <p className="text-xs text-[#8C7F70] mt-1 max-w-xs mx-auto">
                Save your cherished evening gowns, tailoring, and silk essentials to revisit at your leisure.
              </p>
              <button
                onClick={() => setWishlistDrawerOpen(false)}
                className="mt-6 px-6 py-2.5 bg-[#111111] hover:bg-[#C49A43] text-white text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer: Move All to Bag CTA */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E1D7]">
            <button
              onClick={moveAllWishlistToCart}
              className="w-full py-4 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Shopping Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
