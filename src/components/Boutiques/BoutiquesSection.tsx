import React from 'react';
import { useCart } from '../../context/CartContext';
import { BOUTIQUES } from '../../data/fashionData';
import { Clock, MapPin, Phone } from 'lucide-react';

export const BoutiquesSection: React.FC = () => {
  const { setAppointmentModalOpen } = useCart();

  return (
    <section id="boutiques" className="py-20 bg-[#FAF7F2] border-t border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block mb-2">
            Haute Destinations
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-normal">
            Global Flagship Salons
          </h2>
          <div className="w-12 h-[1px] bg-[#C49A43] mx-auto mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-[#8C7F70] font-light">
            Experience our personal atelier fittings, archival trunk shows, and private VIP dressing salons worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BOUTIQUES.map((b) => (
            <div
              key={b.city}
              className="p-5 bg-white border border-[#E8E1D7] hover:border-[#C49A43] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C49A43] font-semibold block mb-1">
                  {b.city}
                </span>
                <h4 className="font-editorial text-xl text-[#111111] mb-3 leading-snug">
                  {b.flagship}
                </h4>

                <div className="space-y-2 text-xs text-[#8C7F70] font-light">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A43] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C49A43] shrink-0 mt-0.5" />
                    <span>{b.hours}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C49A43] shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="mt-5 w-full py-2 bg-[#FAF7F2] hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E8E1D7] text-[10px] uppercase tracking-[0.18em] font-medium transition-colors"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
