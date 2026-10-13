export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'JPY';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface ColorOption {
  name: string;
  hex: string;
  bgClass?: string;
  image?: string;
}

export interface SizeOption {
  size: string;
  inStock: boolean;
  remainingCount?: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback?: 'Runs small' | 'True to size' | 'Runs large';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Evening Gowns' | 'Blazers & Outerwear' | 'Silk & Satin' | 'Tailored Trousers' | 'Knitwear' | 'Accessories';
  collection: string;
  price: number; // in USD
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ColorOption[];
  sizes: SizeOption[];
  fabric: string;
  details: string[];
  fit: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isAtelierExclusive?: boolean;
  sustainabilityTag?: string;
  pairedWith?: string[]; // IDs of complementary products
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  productId: string;
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface Hotspot {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  productId: string;
  label: string;
}

export interface LookbookSlide {
  id: string;
  title: string;
  season: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

export interface FilterState {
  category: string;
  collection: string;
  fabric: string;
  color: string;
  size: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onlyExclusive: boolean;
  searchQuery: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'gold';
  title: string;
  description?: string;
}

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  city: 'Paris' | 'New York' | 'Milan' | 'London' | 'Dubai' | 'Virtual Consultation';
  date: string;
  time: string;
  stylistPreference: string;
  occasion: string;
  notes?: string;
}
