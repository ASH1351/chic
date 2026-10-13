import React from 'react';
import { useCart } from '../../context/CartContext';
import { Check, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isGold = toast.type === 'gold';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-[#111111]/95 text-white backdrop-blur-md border border-[#C49A43]/40 shadow-2xl transition-all duration-300 animate-slide-up"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(196, 154, 67, 0.15)',
            }}
          >
            <div className="shrink-0 mt-0.5 text-[#C49A43]">
              {isGold ? (
                <Sparkles className="w-5 h-5 animate-pulse-subtle" />
              ) : isSuccess ? (
                <Check className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs tracking-[0.18em] uppercase font-medium text-[#FAF5E8]">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#B5A99A] mt-1 line-clamp-2 font-light">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[#B5A99A] hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
