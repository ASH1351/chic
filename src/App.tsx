import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/Header/AnnouncementBar';
import { Navbar } from './components/Header/Navbar';
import { SearchModal } from './components/Header/SearchModal';
import { HeroSection } from './components/Hero/HeroSection';
import { CollectionsGrid } from './components/Collections/CollectionsGrid';
import { ProductGrid } from './components/Catalog/ProductGrid';
import { LookbookSection } from './components/Lookbook/LookbookSection';
import { AtelierStory } from './components/AtelierStory/AtelierStory';
import { JournalSection } from './components/Journal/JournalSection';
import { BoutiquesSection } from './components/Boutiques/BoutiquesSection';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { WishlistDrawer } from './components/Wishlist/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetail/ProductDetailModal';
import { SizeGuideModal } from './components/ProductDetail/SizeGuideModal';
import { AppointmentModal } from './components/Booking/AppointmentModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { ToastContainer } from './components/UI/ToastContainer';

export const MainApp: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const handleSelectCollectionFromGrid = (colName: string) => {
    setSelectedCollection(colName);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#292725] selection:bg-[#C49A43] selection:text-white flex flex-col font-sans">
      {/* Utility Top Announcement */}
      <AnnouncementBar />

      {/* Main Luxury Sticky Header */}
      <Navbar onNavigateToSection={handleNavigate} />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection />

        {/* Curated Capsules Grid */}
        <CollectionsGrid onSelectCollection={handleSelectCollectionFromGrid} />

        {/* Complete Interactive Product Catalog with Facets & Sorting */}
        <ProductGrid initialCollection={selectedCollection} />

        {/* Interactive Runway Lookbook */}
        <LookbookSection />

        {/* Atelier Heritage & Philosophy */}
        <AtelierStory />

        {/* Editorial Gazette */}
        <JournalSection />

        {/* Global Boutiques */}
        <BoutiquesSection />
      </main>

      {/* Dark Luxury Footer */}
      <Footer />

      {/* Slide-over Drawers & Interactive Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <ProductDetailModal />
      <SizeGuideModal />
      <AppointmentModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
