import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Gift,
  Lock,
  Printer,
  X,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    clearCart,
    checkoutModalOpen,
    setCheckoutModalOpen,
    formatPrice,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    total,
    promoCode,
    isGiftWrap,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vanderbilt',
    email: 'eleanor.vanderbilt@couture-client.com',
    phone: '+1 (212) 555-0199',
    address: '780 Fifth Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    zipCode: '10022',
    country: 'United States',
    shippingMethod: 'complimentary',
    paymentMethod: 'card',
    cardNumber: '4532 •••• •••• 8842',
    cardExpiry: '12/28',
    cardCvc: '842',
    cardName: 'ELEANOR VANDERBILT',
    orderNotes: 'Please ring private vestibule buzzer upon arrival.',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!checkoutModalOpen) return null;

  const handleNextStep = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4);
    } else if (step === 3) {
      // Complete Order
      const newOrderNum = `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderNumber(newOrderNum);
      setStep(4);
      clearCart();

      // Launch Champagne Gold Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C49A43', '#ECC876', '#FAF5E8', '#111111'],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-[#292725]">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#C49A43]/40 shadow-2xl overflow-hidden animate-fade-in my-8">
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Chic Couture" className="h-10 w-auto object-contain" />
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-[#8C7F70] border-l border-[#E8E1D7] pl-3">
              Haute Checkout
            </span>
          </div>

          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="p-1.5 text-[#8C7F70] hover:text-[#111111]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Breadcrumbs (Only if not completed) */}
        {step < 4 && (
          <div className="bg-[#FAF4E5] px-6 py-3 border-b border-[#E6CD92] flex items-center justify-between text-xs uppercase tracking-[0.16em]">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C49A43] font-semibold' : 'text-[#8C7F70]'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>Delivery Address</span>
            </div>
            <span className="text-[#C49A43]">✦</span>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C49A43] font-semibold' : 'text-[#8C7F70]'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>White-Glove Method</span>
            </div>
            <span className="text-[#C49A43]">✦</span>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C49A43] font-semibold' : 'text-[#8C7F70]'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span>Atelier Payment</span>
            </div>
          </div>
        )}

        {/* Main Body */}
        {step < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E1D7]">
            {/* Form Stage (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* STEP 1: Address */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-editorial text-2xl text-[#111111]">
                    Client Information & Shipping Address
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Residence Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery Method */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-editorial text-2xl text-[#111111]">
                    Select White-Glove Delivery Method
                  </h3>

                  <div className="space-y-3">
                    <label
                      onClick={() => setFormData({ ...formData, shippingMethod: 'complimentary' })}
                      className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                        formData.shippingMethod === 'complimentary'
                          ? 'border-[#C49A43] bg-white shadow-sm'
                          : 'border-[#E8E1D7] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingMethod === 'complimentary'}
                          onChange={() => {}}
                          className="accent-[#C49A43] mt-1"
                        />
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#111111]">
                            Complimentary Express Courier
                          </h4>
                          <p className="text-[11px] text-[#8C7F70] mt-0.5">
                            Delivered in 2–4 business days via DHL Express / FedEx Priority.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#9E7422] uppercase tracking-wider">
                        Complimentary
                      </span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, shippingMethod: 'chauffeur' })}
                      className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                        formData.shippingMethod === 'chauffeur'
                          ? 'border-[#C49A43] bg-white shadow-sm'
                          : 'border-[#E8E1D7] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingMethod === 'chauffeur'}
                          onChange={() => {}}
                          className="accent-[#C49A43] mt-1"
                        />
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#111111]">
                            VIP Same-Day Atelier Chauffeur
                          </h4>
                          <p className="text-[11px] text-[#8C7F70] mt-0.5">
                            Hand-delivered in garment bag by a private concierge stylist (NY, Paris, Milan, London).
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#111111]">
                        +{formatPrice(45)}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                      Private Delivery Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="e.g. Concierge gate code, private doorman instructions..."
                      className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-editorial text-2xl text-[#111111]">
                    Encrypted Atelier Payment
                  </h3>

                  {/* Interactive Luxury Credit Card Preview */}
                  <div className="relative h-44 w-full max-w-sm mx-auto rounded-xl p-5 text-white bg-gradient-to-tr from-[#111111] via-[#242220] to-[#3a352f] border border-[#C49A43]/50 shadow-2xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-[#C49A43]/10 pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <span className="font-editorial tracking-[0.2em] text-sm text-[#ECC876]">
                        CHIC COUTURE PRIVILÈGE
                      </span>
                      <CreditCard className="w-5 h-5 text-[#C49A43]" />
                    </div>

                    <div className="text-base sm:text-lg font-mono tracking-[0.25em] text-[#FAF5E8]">
                      {formData.cardNumber}
                    </div>

                    <div className="flex items-end justify-between text-[10px] tracking-widest uppercase">
                      <div>
                        <span className="text-[#B5A99A] block text-[8px]">CARDHOLDER</span>
                        <span className="font-medium text-white">{formData.cardName}</span>
                      </div>
                      <div>
                        <span className="text-[#B5A99A] block text-[8px]">EXPIRES</span>
                        <span className="font-medium text-white">{formData.cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Inputs */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                          Expires (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8C7F70] mb-1">
                          Security CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF4E5] border border-[#E6CD92] flex items-center gap-2 text-xs text-[#9E7422]">
                    <Lock className="w-4 h-4 text-[#C49A43] shrink-0" />
                    <span>Your transaction is safeguarded by 256-bit bank encryption.</span>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C7F70] hover:text-[#111111]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                <button
                  onClick={handleNextStep}
                  className="px-7 py-3 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>{step === 3 ? 'Authorize Acquisition' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Order Summary (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-[#F3EED8]/30 flex flex-col justify-between">
              <div>
                <h4 className="font-editorial text-xl text-[#111111] mb-4">
                  Order Summary
                </h4>

                <div className="divide-y divide-[#E8E1D7] max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-16 object-cover border border-[#E8E1D7]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-editorial text-sm text-[#111111] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-[#8C7F70]">
                          Qty: {item.quantity} • Size: {item.selectedSize}
                        </p>
                        <p className="text-xs font-semibold text-[#111111]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {isGiftWrap && (
                  <div className="mt-3 p-2.5 bg-white border border-[#E8E1D7] flex items-center gap-2 text-xs text-[#111111]">
                    <Gift className="w-4 h-4 text-[#C49A43]" />
                    <span>Complimentary Signature Gift Packaging</span>
                  </div>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="mt-6 pt-4 border-t border-[#E8E1D7] space-y-1.5 text-xs text-[#8C7F70]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C49A43]">
                    <span>VIP Privilege ({promoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingAmount === 0 ? 'Complimentary' : formatPrice(shippingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D7] flex justify-between text-base font-serif text-[#111111] font-bold">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 4: Order Confirmation Stage */
          <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF4E5] border border-[#C49A43] text-[#C49A43] flex items-center justify-center mx-auto animate-float">
              <CheckCircle2 className="w-9 h-9 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-medium block">
                Acquisition Confirmed
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#111111]">
                Thank You, {formData.firstName}
              </h2>
              <p className="text-sm text-[#8C7F70] font-light max-w-md mx-auto">
                Your order <strong className="text-[#111111] font-mono">{orderNumber}</strong> has been transferred to our Florence atelier for bespoke inspection and white-glove packaging.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-6 bg-white border border-[#E8E1D7] text-left text-xs space-y-3">
              <div className="flex justify-between pb-3 border-b border-[#E8E1D7]">
                <span className="text-[#8C7F70]">Delivery Destination:</span>
                <span className="font-medium text-[#111111] text-right">
                  {formData.address}, {formData.city}, {formData.country}
                </span>
              </div>
              <div className="flex justify-between pb-3 border-b border-[#E8E1D7]">
                <span className="text-[#8C7F70]">Courier Service:</span>
                <span className="font-medium text-[#111111]">White-Glove Express (Estimated 2-3 Days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7F70]">Confirmation Dispatched to:</span>
                <span className="font-medium text-[#111111]">{formData.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handlePrint}
                className="px-6 py-3 border border-[#E8E1D7] hover:border-[#C49A43] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-[#C49A43]" />
                <span>Print Official Receipt</span>
              </button>

              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="px-8 py-3 bg-[#111111] hover:bg-[#C49A43] text-white hover:text-[#111111] text-xs uppercase tracking-[0.22em] font-medium transition-colors shadow-lg"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
