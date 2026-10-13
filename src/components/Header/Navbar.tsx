import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  onNavigateToSection?: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToSection }) => {
  const {
    cartCount,
    setCartDrawerOpen,
    wishlist,
    setWishlistDrawerOpen,
    setSearchModalOpen,
    setAppointmentModalOpen,
    subtotal,
    formatPrice,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F5EF]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-2 border-b border-[#E8E1D7]'
          : 'bg-[#F8F5EF] py-3.5 border-b border-[#E8E1D7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#292725] hover:text-[#C49A43] transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#292725] hover:text-[#C49A43] transition-colors ml-1"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.16em] uppercase text-[#292725]">
            <button
              onClick={() => handleLinkClick('catalog')}
              className="hover:text-[#C49A43] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A43] hover:after:w-full after:transition-all"
            >
              Collection
            </button>
            <button
              onClick={() => handleLinkClick('collections-curated')}
              className="hover:text-[#C49A43] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A43] hover:after:w-full after:transition-all"
            >
              Capsules
            </button>
            <button
              onClick={() => handleLinkClick('lookbook')}
              className="hover:text-[#C49A43] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A43] hover:after:w-full after:transition-all"
            >
              Lookbook
            </button>
            <button
              onClick={() => handleLinkClick('atelier-story')}
              className="hover:text-[#C49A43] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A43] hover:after:w-full after:transition-all"
            >
              The Atelier
            </button>
          </nav>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center justify-center text-center py-0.5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center transition-transform hover:scale-[1.01]"
              aria-label="Chic Couture Home"
            >
              <img
                src="/logo.png"
                alt="Chic Couture - Wear Confidence"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-all filter drop-shadow-sm group-hover:brightness-105"
              />
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs text-[#292725] hover:text-[#C49A43] transition-colors px-2 py-1.5"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="tracking-[0.14em] uppercase text-[11px] text-[#8C7F70]">Search</span>
            </button>

            {/* Private Atelier Booking CTA */}
            <button
              onClick={() => setAppointmentModalOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 border border-[#C49A43]/50 hover:border-[#C49A43] px-3.5 py-1.5 text-[10px] tracking-[0.18em] uppercase text-[#111111] hover:bg-[#C49A43] hover:text-white transition-all duration-300"
            >
              <Sparkles className="w-3 h-3 text-[#C49A43] group-hover:text-white" />
              <span>Book Atelier</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setWishlistDrawerOpen(true)}
              className="relative p-2 text-[#292725] hover:text-[#C49A43] transition-colors"
              aria-label={`Wishlist (${wishlist.length} saved)`}
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-semibold bg-[#C49A43] text-white rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 p-2 text-[#292725] hover:text-[#C49A43] transition-colors"
              aria-label={`Shopping bag (${cartCount} items)`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-semibold bg-[#111111] text-[#FAF5E8] rounded-full border border-[#C49A43]">
                    {cartCount}
                  </span>
                )}
              </div>
              {subtotal > 0 && (
                <span className="hidden sm:inline-block text-[11px] font-medium tracking-wider text-[#292725]">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#111111]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between border-r border-[#E8E1D7] z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D7]">
                <img
                  src="/logo.png"
                  alt="Chic Couture"
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#292725] hover:text-[#C49A43]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-5 text-sm tracking-[0.16em] uppercase font-medium">
                <button
                  onClick={() => handleLinkClick('catalog')}
                  className="text-left text-[#292725] hover:text-[#C49A43] transition-colors"
                >
                  Haute Collection
                </button>
                <button
                  onClick={() => handleLinkClick('collections-curated')}
                  className="text-left text-[#292725] hover:text-[#C49A43] transition-colors"
                >
                  Capsule Edits
                </button>
                <button
                  onClick={() => handleLinkClick('lookbook')}
                  className="text-left text-[#292725] hover:text-[#C49A43] transition-colors"
                >
                  Runway Lookbook
                </button>
                <button
                  onClick={() => handleLinkClick('atelier-story')}
                  className="text-left text-[#292725] hover:text-[#C49A43] transition-colors"
                >
                  Atelier & Heritage
                </button>
                <button
                  onClick={() => handleLinkClick('boutiques')}
                  className="text-left text-[#292725] hover:text-[#C49A43] transition-colors"
                >
                  Global Boutiques
                </button>
              </div>

              <div className="pt-4 border-t border-[#E8E1D7] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAppointmentModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#111111] text-[#FAF5E8] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#C49A43] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A43]" />
                  <span>Book Atelier Appointment</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E1D7] text-xs text-[#8C7F70]">
              <p className="font-editorial italic text-base text-[#111111]">
                “Wear Confidence.”
              </p>
              <p className="mt-1">Complimentary Concierge Care 24/7</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
