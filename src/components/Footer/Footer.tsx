import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast, setAppointmentModalOpen, setSizeGuideModalOpen } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast(
      'Welcome to the Circle',
      'Your exclusive 10% privilege invitation code has been dispatched to your inbox.',
      'gold'
    );
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FAF5E8] border-t border-[#292725] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & VIP Privilege Section */}
        <div className="pb-16 border-b border-[#292725] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C49A43] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chic Couture Circle</span>
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
              Join The Private Salon
            </h3>
            <p className="text-xs sm:text-sm text-[#B5A99A] font-light max-w-md">
              Receive private previews of limited seasonal capsules, runway invitations, and a complimentary 10% welcome privilege on your inaugural acquisition.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email address..."
                  className="flex-1 px-4 py-3.5 bg-[#1A1918] border border-[#3D3A37] focus:border-[#C49A43] text-xs text-white placeholder:text-[#8C7F70] outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C49A43] hover:bg-[#B28731] text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request Privilege</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#1A1918] border border-[#C49A43]/40 flex items-center gap-3">
                <Check className="w-5 h-5 text-[#C49A43]" />
                <div>
                  <p className="text-xs text-white font-medium">
                    Welcome to the Chic Couture Circle.
                  </p>
                  <p className="text-[11px] text-[#B5A99A]">
                    Use courtesy code <strong className="text-[#C49A43]">CONFIDENCE15</strong> for 15% VIP privilege at checkout.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Links & Brand Presentation */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Presentation with dark-mode variant logo */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src="/logo-dark-mode.png"
              alt="Chic Couture - Wear Confidence"
              className="h-16 w-auto object-contain filter drop-shadow"
            />
            <p className="text-2xl font-script-luxury text-[#ECC876] italic">
              Wear Confidence.
            </p>
            <p className="text-xs text-[#B5A99A] font-light max-w-sm leading-relaxed">
              An independent luxury fashion house devoted to architectural silhouette, pure 22-momme Mulberry silk, and unyielding female poise.
            </p>
            <div className="pt-2 text-[11px] text-[#8C7F70]">
              Atelier: Florence, Italy • Salon Flagship: 18 Rue Saint-Honoré, Paris
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
              Haute Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99A]">
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Haute Gala & Red Carpet
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Modern Power Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  The 22-Momme Silk Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Golden Riviera Resort
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Atelier Evening Minauidières
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Heritage */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99A]">
              <li>
                <button
                  onClick={() => scrollTo('atelier-story')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  The Architecture of Confidence
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('lookbook')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Runway Lookbook & Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('journal')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  The Atelier Gazette Essays
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('boutiques')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Global Flagship Salons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setAppointmentModalOpen(true)}
                  className="hover:text-[#C49A43] transition-colors text-[#C49A43]"
                >
                  Book Private Fitting
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
              Concierge Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A99A]">
              <li>
                <button
                  onClick={() => setSizeGuideModalOpen(true)}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Size Guide & Fit Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => addToast('Concierge Dispatched', 'Our styling concierge will reach out via WhatsApp / Email.', 'info')}
                  className="hover:text-[#C49A43] transition-colors"
                >
                  Complimentary Bespoke Alterations
                </button>
              </li>
              <li>
                <span className="text-[#8C7F70]">
                  White-Glove Global Shipping
                </span>
              </li>
              <li>
                <span className="text-[#8C7F70]">
                  30-Day Courier Returns
                </span>
              </li>
              <li>
                <span className="text-[#8C7F70]">
                  Authentication Certificate
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 border-t border-[#292725] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7F70]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Chic Couture S.A. All rights reserved.</span>
            <span>•</span>
            <span className="italic font-editorial text-sm text-[#C49A43]">
              “Wear Confidence.”
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A43]" />
              <span>Certified Sustainable Haute Fashion</span>
            </span>
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer">Terms of Maison</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
