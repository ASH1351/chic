import React, { createContext, useContext, useEffect, useState } from 'react';
import { CURRENCIES, PRODUCTS } from '../data/fashionData';
import type { CartItem, ColorOption, Currency, CurrencyCode, Product, ToastMessage } from '../types';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInUSD: number) => string;
  convertPrice: (priceInUSD: number) => number;
  addToCart: (product: Product, selectedColor: ColorOption, selectedSize: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;
  moveAllWishlistToCart: () => void;

  // Drawers & Modals
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  wishlistDrawerOpen: boolean;
  setWishlistDrawerOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  appointmentModalOpen: boolean;
  setAppointmentModalOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  sizeGuideModalOpen: boolean;
  setSizeGuideModalOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;

  // Promos & Calculations
  promoCode: string;
  promoDiscountRate: number; // 0.15 = 15%
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isGiftWrap: boolean;
  setIsGiftWrap: (val: boolean) => void;

  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  freeShippingThreshold: number;
  taxAmount: number;
  total: number;

  // Toast System
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chic_couture_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chic_couture_wishlist');
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-07'];
    } catch {
      return ['prod-01', 'prod-07'];
    }
  });

  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR');
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  // Modals & UI States
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Promo & Extras
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [isGiftWrap, setIsGiftWrap] = useState(true); // complimentary gift box by default

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Cart & Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('chic_couture_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('chic_couture_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyCode(code);
      addToast('Currency Updated', `Prices are now displayed in ${code} (${CURRENCIES[code].symbol})`, 'info');
    }
  };

  const convertPrice = (priceInUSD: number): number => {
    return Math.round(priceInUSD * currency.rate);
  };

  const formatPrice = (priceInUSD: number): string => {
    const converted = convertPrice(priceInUSD);
    if (currency.code === 'INR') {
      return `${currency.symbol}${converted.toLocaleString('en-IN')}`;
    }
    if (currency.code === 'JPY') {
      return `${currency.symbol}${converted.toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toLocaleString('en-US')}`;
  };

  const addToCart = (product: Product, selectedColor: ColorOption, selectedSize: string, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedColor.name}-${selectedSize}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    });

    addToast(
      'Added to Shopping Bag',
      `${product.name} (${selectedColor.name}, Size ${selectedSize})`,
      'gold'
    );
    setCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Removed from Bag', 'Item was removed from your bag.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', product ? product.name : undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', product ? product.name : undefined, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveWishlistToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size;
    addToCart(product, defaultColor, defaultSize, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const moveAllWishlistToCart = () => {
    wishlist.forEach((id) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) {
        const defaultColor = product.colors[0];
        const defaultSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size;
        addToCart(product, defaultColor, defaultSize, 1);
      }
    });
    setWishlist([]);
    addToast('All Items Moved', 'All wishlist items were added to your shopping bag.', 'gold');
    setCartDrawerOpen(true);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CONFIDENCE15') {
      setPromoCode('CONFIDENCE15');
      setPromoDiscountRate(0.15);
      addToast('VIP Privilege Applied', '15% courtesy privilege applied to your bag.', 'gold');
      return { success: true, message: '15% VIP discount applied!' };
    }
    if (normalized === 'ATELIER20') {
      setPromoCode('ATELIER20');
      setPromoDiscountRate(0.20);
      addToast('Private Atelier Privilege', '20% exclusive privilege applied.', 'gold');
      return { success: true, message: '20% Atelier discount applied!' };
    }
    return { success: false, message: 'Invalid promotional or VIP invitation code.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountRate(0);
    addToast('Promo Code Removed', undefined, 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * promoDiscountRate);
  const freeShippingThreshold = 250;
  const shippingAmount = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08);
  const total = subtotal - discountAmount + shippingAmount + taxAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        moveAllWishlistToCart,
        cartDrawerOpen,
        setCartDrawerOpen,
        wishlistDrawerOpen,
        setWishlistDrawerOpen,
        searchModalOpen,
        setSearchModalOpen,
        appointmentModalOpen,
        setAppointmentModalOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        sizeGuideModalOpen,
        setSizeGuideModalOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        promoCode,
        promoDiscountRate,
        applyPromoCode,
        removePromoCode,
        isGiftWrap,
        setIsGiftWrap,
        cartCount,
        subtotal,
        discountAmount,
        shippingAmount,
        freeShippingThreshold,
        taxAmount,
        total,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
