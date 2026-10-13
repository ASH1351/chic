import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import {
  ArrowRight,
  Gift,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  X,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    discountAmount,
    shippingAmount,
    freeShippingThreshold,
    taxAmount,
    total,
    formatPrice,
    promoCode,
    promoDiscountRate,
    applyPromoCode,
    removePromoCode,
    isGiftWrap,
    setIsGiftWrap,
    setCheckoutModalOpen,
    setSelectedProductForDetail,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [cartDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCartDrawerOpen]);

  if (!cartDrawerOpen) return null;

  const freeShippingDifference = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-lg w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50 border-l border-[#E8E1D7] animate-slide-left">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C49A43]" />
            <h3 className="font-editorial text-2xl text-[#111111]">
              Shopping Bag
            </h3>
            <span className="text-xs text-[#8C7F70] font-sans">
              ({cartCount} {cartCount === 1 ? 'Piece' : 'Pieces'})
            </span>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 text-[#8C7F70] hover:text-[#111111] transition-colors"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF4E5] px-6 py-3 border-b border-[#E6CD92]">
          {freeShippingDifference === 0 ? (
            <div className="flex items-center gap-2 text-xs text-[#9E7422] font-medium">
              <Sparkles className="w-4 h-4 text-[#C49A43] shrink-0" />
              <span>You have unlocked Complimentary White-Glove Express Shipping!</span>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#9E7422]">
                Add <strong className="font-semibold text-[#111111]">{formatPrice(freeShippingDifference)}</strong> more to enjoy Complimentary White-Glove Shipping.
              </p>
              <div className="w-full bg-[#E6CD92]/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#C49A43] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length > 0 ? (
            <div className="divide-y divide-[#E8E1D7]">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  {/* Item Image */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => {
                      setCartDrawerOpen(false);
                      setSelectedProductForDetail(item.product);
                    }}
                    className="w-20 h-26 object-cover object-top border border-[#E8E1D7] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setCartDrawerOpen(false);
                            setSelectedProductForDetail(item.product);
                          }}
                          className="font-editorial text-base text-[#111111] hover:text-[#C49A43] cursor-pointer leading-snug line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#B5A99A] hover:text-[#111111] p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#8C7F70] mt-1">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                        <span>•</span>
                        <span>Size: <strong className="text-[#111111]">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8E1D7] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#8C7F70] hover:text-[#111111]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#8C7F70] hover:text-[#111111]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#111111] tracking-wider">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <ShoppingBag className="w-12 h-12 text-[#B5A99A] mx-auto mb-3 stroke-[1.2]" />
              <p className="font-editorial text-2xl text-[#111111] italic">
                Your shopping bag is empty
              </p>
              <p className="text-xs text-[#8C7F70] mt-1 max-w-xs mx-auto">
                Explore our curated collection to discover silhouettes tailored for your poise.
              </p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="mt-6 px-6 py-2.5 bg-[#111111] hover:bg-[#C49A43] text-white text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Discover Collection
              </button>
            </div>
          )}

          {/* Complimentary Luxury Gift Packaging Toggle */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border border-[#E8E1D7] rounded-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-2.5">
                  <Gift className="w-5 h-5 text-[#C49A43] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-medium text-[#111111]">
                      Complimentary Luxury Gift Packaging
                    </h5>
                    <p className="text-[11px] text-[#8C7F70] mt-0.5">
                      Signature matte black coffret box, silk grosgrain ribbon, and gold wax seal.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="accent-[#C49A43] w-4 h-4 cursor-pointer mt-0.5"
                />
              </div>
            </div>
          )}

          {/* VIP Privilege / Promo Code Form */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border border-[#E8E1D7]">
              {promoCode ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#C49A43]" />
                    <span className="text-xs font-medium text-[#111111]">
                      Code: <strong className="text-[#C49A43]">{promoCode}</strong> (
                      {promoDiscountRate * 100}% Privilege Applied)
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-[#B5A99A] hover:text-[#111111] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="VIP Code (e.g. CONFIDENCE15)"
                    className="flex-1 px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none uppercase font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] hover:bg-[#C49A43] text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E1D7] space-y-3">
            <div className="space-y-1.5 text-xs text-[#8C7F70]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#111111] font-medium">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C49A43]">
                  <span>VIP Privilege Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove Courier Delivery</span>
                <span>
                  {shippingAmount === 0 ? (
                    <strong className="text-[#9E7422] uppercase tracking-wider font-semibold">
                      Complimentary
                    </strong>
                  ) : (
                    formatPrice(shippingAmount)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>

              <div className="pt-2 border-t border-[#E8E1D7] flex justify-between text-base text-[#111111] font-serif">
                <span className="font-medium">Estimated Total</span>
                <span className="font-bold tracking-wider">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C7F70] uppercase tracking-wider pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A43]" />
              <span>256-Bit SSL Encrypted Atelier Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
