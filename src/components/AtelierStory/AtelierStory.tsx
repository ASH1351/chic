import React from 'react';
import { useCart } from '../../context/CartContext';
import { Feather, HeartHandshake, Scissors, Sparkles } from 'lucide-react';

export const AtelierStory: React.FC = () => {
  const { setAppointmentModalOpen } = useCart();

  return (
    <section id="atelier-story" className="py-24 bg-[#F8F5EF] text-[#292725] border-t border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block">
              Atelier Heritage & Philosophy
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-normal leading-[1.08]">
              The Architecture of Confidence
            </h2>
            <div className="w-16 h-[1px] bg-[#C49A43]" />
            <p className="text-sm sm:text-base text-[#8C7F70] font-light leading-relaxed">
              At Chic Couture, our designs begin where conventional fashion surrenders: at the intersection of structural discipline and sensual fluidity. We believe clothing should never constrain a woman’s movement nor diminish her presence.
            </p>
            <p className="text-sm sm:text-base text-[#8C7F70] font-light leading-relaxed">
              Every garment is conceived to act as armor and whisper at once. By sculpting weightless shoulders, carving backless bias silhouettes, and hand-finishing French seams across 40 meticulous hours in Florence, we construct an undeniable posture.
            </p>

            {/* Quote Block */}
            <div className="pt-4 border-l-2 border-[#C49A43] pl-6 my-6">
              <p className="font-editorial italic text-xl sm:text-2xl text-[#111111] leading-snug">
                “When a woman slips into a garment crafted with genuine integrity, her shoulders naturally settle, her chin lifts, and she steps into any room with quiet, unapologetic power.”
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.16em] font-medium text-[#111111]">
                    Elena Vance
                  </h4>
                  <span className="text-[11px] text-[#8C7F70]">Creative Director, Chic Couture</span>
                </div>
                <span className="font-script-luxury text-2xl text-[#C49A43]">Elena Vance</span>
              </div>
            </div>

            <button
              onClick={() => setAppointmentModalOpen(true)}
              className="mt-4 px-8 py-3.5 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-md inline-flex items-center gap-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A43]" />
              <span>Book Private Atelier Fitting</span>
            </button>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#E8E1D7] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85"
                alt="Chic Couture Atelier Craftsmanship"
                className="w-full h-full object-cover filter brightness-[0.95]"
              />
            </div>
            {/* Secondary Floating Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 max-w-xs p-6 bg-white border border-[#C49A43]/50 shadow-2xl z-20">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C49A43] font-medium block mb-1">
                Florence Guild Guarantee
              </span>
              <p className="font-editorial text-lg text-[#111111] leading-snug">
                40 Hours of Artisanal Hand-Draping per Evening Gown
              </p>
              <div className="w-8 h-[1px] bg-[#C49A43] my-2" />
              <p className="text-[11px] text-[#8C7F70] font-light">
                Zero-mass production. Hand-numbered certification of authenticity enclosed with each delivery.
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#E8E1D7]">
          <div className="p-8 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-all">
            <Feather className="w-7 h-7 text-[#C49A43] mb-4 stroke-[1.5]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F70] block mb-1">
              Pillar 01
            </span>
            <h3 className="font-editorial text-2xl text-[#111111] mb-2">
              The 22-Momme Silk Standard
            </h3>
            <p className="text-xs text-[#8C7F70] font-light leading-relaxed">
              We exclusively employ Grade 6A pure mulberry silk calibrated to 22 momme. This weight offers unmatched opacity, thermal breathability, and a signature liquid drape that floats effortlessly with your stride.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-all">
            <Scissors className="w-7 h-7 text-[#C49A43] mb-4 stroke-[1.5]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F70] block mb-1">
              Pillar 02
            </span>
            <h3 className="font-editorial text-2xl text-[#111111] mb-2">
              Architectural Canvas Tailoring
            </h3>
            <p className="text-xs text-[#8C7F70] font-light leading-relaxed">
              Our blazers and coats feature traditional horsehair and wool canvas interlinings that mold naturally to your contours over time, never losing their crisp, empowering razor-sharp shoulder lines.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-all">
            <HeartHandshake className="w-7 h-7 text-[#C49A43] mb-4 stroke-[1.5]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F70] block mb-1">
              Pillar 03
            </span>
            <h3 className="font-editorial text-2xl text-[#111111] mb-2">
              Limited Edition Conservation
            </h3>
            <p className="text-xs text-[#8C7F70] font-light leading-relaxed">
              We strictly manufacture limited runs between 50 and 100 units worldwide. This eliminates inventory waste, honors ethical European textile guilds, and ensures you will never meet a duplicate silhouette.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
