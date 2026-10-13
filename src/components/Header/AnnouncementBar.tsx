import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { CURRENCIES } from '../../data/fashionData';
import type { CurrencyCode } from '../../types';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';

const MESSAGES = [
  'Complimentary Express White-Glove Shipping on Orders Over ₹25,000',
  'Private Atelier Appointments Now Available in Paris, Milan & New York',
  'Welcome Privilege: Enter Code CONFIDENCE15 for 15% Off Your First Acquisition',
  'Crafted in Florence & Lyon with Certified Grade 6A Mulberry Silk',
];

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrency, setAppointmentModalOpen } = useCart();
  const [index, setIndex] = useState(0);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#111111] text-[#FAF5E8] border-b border-[#292725] text-[11px] tracking-[0.14em] uppercase py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Private Concierge */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setAppointmentModalOpen(true)}
            className="flex items-center gap-1.5 text-[#B5A99A] hover:text-[#C49A43] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#C49A43]" />
            <span>Private Atelier Booking</span>
          </button>
          <span className="text-[#3D3A37]">•</span>
          <span className="text-[#B5A99A]">Flagship: 18 Rue Saint-Honoré, Paris</span>
        </div>

        {/* Center: Sliding Messages */}
        <div className="flex-1 text-center py-0.5 overflow-hidden">
          <p
            key={index}
            className="inline-flex items-center justify-center gap-2 font-medium tracking-[0.16em] animate-fade-in"
          >
            <span className="text-[#C49A43]">✦</span>
            <span>{MESSAGES[index]}</span>
            <span className="text-[#C49A43]">✦</span>
          </p>
        </div>

        {/* Right: Currency Switcher */}
        <div className="relative">
          <button
            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            className="flex items-center gap-1.5 text-[#B5A99A] hover:text-[#FAF5E8] transition-colors py-0.5 px-2 rounded"
            aria-label="Select currency"
          >
            <Globe className="w-3 h-3 text-[#C49A43]" />
            <span>{currency.code} ({currency.symbol})</span>
            <ChevronDown className="w-3 h-3 transition-transform" />
          </button>

          {currencyDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setCurrencyDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-36 bg-[#1A1918] border border-[#C49A43]/30 shadow-2xl z-50 py-1 text-left">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code as CurrencyCode);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#292725] transition-colors ${
                      currency.code === c.code ? 'text-[#C49A43] font-semibold bg-[#292725]/50' : 'text-[#FAF5E8]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-[#B5A99A]">{c.symbol}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
