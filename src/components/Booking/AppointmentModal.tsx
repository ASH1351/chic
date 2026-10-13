import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { AppointmentData } from '../../types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { appointmentModalOpen, setAppointmentModalOpen, addToast } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const [formData, setFormData] = useState<AppointmentData>({
    name: 'Alexandra Thorne',
    email: 'alexandra.thorne@luxury.com',
    phone: '+1 (212) 555-0188',
    city: 'Paris',
    date: '2026-10-24',
    time: '15:00',
    stylistPreference: 'Senior Couture Stylist',
    occasion: 'Haute Gala / Black Tie',
    notes: 'Looking for a backless silk evening gown and tailored smoking jacket for the Venice Biennale.',
  });

  if (!appointmentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `ATELIER-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setSubmitted(true);
    addToast('Atelier Fitting Reserved', `Confirmation dispatched for ${formData.city} salon.`, 'gold');
  };

  const handleClose = () => {
    setAppointmentModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/85 backdrop-blur-md flex items-center justify-center p-4 text-[#292725]">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#C49A43]/40 shadow-2xl p-6 sm:p-8 animate-fade-in my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8E1D7]">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C49A43] text-[10px] tracking-[0.25em] uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chic Couture VIP Concierge</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] mt-1">
              Private Atelier Styling Consultation
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#8C7F70] hover:text-[#111111]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <p className="text-xs text-[#8C7F70] font-light">
              Enjoy champagne, personalized silhouette drapery, and private suite access with our master styling team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Salon Location
                </label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value as AppointmentData['city'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white cursor-pointer"
                >
                  <option value="Paris">Paris — 18 Rue Saint-Honoré</option>
                  <option value="New York">New York — 742 Madison Avenue</option>
                  <option value="Milan">Milan — Via Montenapoleone 14</option>
                  <option value="London">London — 29 Old Bond Street</option>
                  <option value="Dubai">Dubai — Fashion Avenue, Dubai Mall</option>
                  <option value="Virtual Consultation">Virtual 1-on-1 Haute Video Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Occasion Type
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white cursor-pointer"
                >
                  <option value="Haute Gala / Black Tie">Haute Gala / Black Tie</option>
                  <option value="Red Carpet Premiere">Red Carpet Premiere</option>
                  <option value="Bespoke Bridal Suite">Bespoke Bridal Suite</option>
                  <option value="Executive Power Suiting">Executive Power Suiting</option>
                  <option value="Seasonal Capsule Wardrobe">Seasonal Capsule Wardrobe</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                  Time Slot
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                Specific Pieces or Styling Preferences
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention desired silhouettes, colors, or sizing requirements..."
                className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between">
              <span className="text-[11px] text-[#8C7F70]">
                Private styling consultations are complimentary for all clientele.
              </span>
              <button
                type="submit"
                className="px-8 py-3 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-md"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation View */
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF4E5] border border-[#C49A43] text-[#C49A43] flex items-center justify-center mx-auto animate-float">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-editorial text-3xl text-[#111111]">
              Private Fitting Reserved
            </h3>
            <p className="text-xs text-[#8C7F70] max-w-md mx-auto">
              Your appointment <strong className="text-[#111111] font-mono">{bookingRef}</strong> in our {formData.city} salon on <strong>{formData.date} at {formData.time}</strong> has been secured.
            </p>

            <div className="p-4 bg-white border border-[#E8E1D7] max-w-sm mx-auto text-xs text-left space-y-2">
              <p className="text-[#8C7F70]">Client: <strong className="text-[#111111]">{formData.name}</strong></p>
              <p className="text-[#8C7F70]">Occasion: <strong className="text-[#111111]">{formData.occasion}</strong></p>
              <p className="text-[#8C7F70]">Location: <strong className="text-[#111111]">{formData.city} Flagship Atelier</strong></p>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Return to Chic Couture
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
