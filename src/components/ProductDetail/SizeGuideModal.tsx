import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Calculator, Ruler, Sparkles, X } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideModalOpen, setSizeGuideModalOpen } = useCart();
  const [unit, setUnit] = useState<'cm' | 'in'>('in');
  const [bust, setBust] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hips, setHips] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  if (!sizeGuideModalOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(bust);
    const w = parseFloat(waist);
    const h = parseFloat(hips);

    if (!b || !w || !h) return;

    // Normalize to inches for simple calculation
    const bIn = unit === 'cm' ? b / 2.54 : b;
    const wIn = unit === 'cm' ? w / 2.54 : w;
    const hIn = unit === 'cm' ? h / 2.54 : h;

    if (bIn <= 33 && wIn <= 25.5 && hIn <= 35.5) {
      setRecommendation('Size XS (US 0-2 / FR 34 / IT 38)');
    } else if (bIn <= 35 && wIn <= 27.5 && hIn <= 37.5) {
      setRecommendation('Size S (US 4 / FR 36 / IT 40)');
    } else if (bIn <= 37 && wIn <= 29.5 && hIn <= 39.5) {
      setRecommendation('Size M (US 6 / FR 38 / IT 42)');
    } else if (bIn <= 39.5 && wIn <= 32 && hIn <= 42) {
      setRecommendation('Size L (US 8-10 / FR 40-42 / IT 44-46)');
    } else {
      setRecommendation('Size XL or Complimentary Bespoke Atelier Fit');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md transition-opacity"
        onClick={() => setSizeGuideModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#C49A43]/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8E1D7]">
          <div>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#C49A43] font-medium block">
              Atelier Fit Concierge
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] mt-1">
              Chic Couture Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={() => setSizeGuideModalOpen(false)}
            className="p-1.5 text-[#8C7F70] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Fit Calculator */}
        <div className="mt-6 p-5 bg-white border border-[#E8E1D7]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#C49A43]" />
              <h4 className="text-xs uppercase tracking-[0.16em] font-medium text-[#111111]">
                Interactive Fit Assistant
              </h4>
            </div>
            {/* Unit toggle */}
            <div className="flex items-center text-xs border border-[#E8E1D7]">
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 font-medium transition-colors ${
                  unit === 'in' ? 'bg-[#111111] text-white' : 'text-[#8C7F70]'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-medium transition-colors ${
                  unit === 'cm' ? 'bg-[#111111] text-white' : 'text-[#8C7F70]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-[#8C7F70] uppercase tracking-wider mb-1">
                Bust ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                placeholder={unit === 'in' ? 'e.g. 34' : 'e.g. 86'}
                className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#8C7F70] uppercase tracking-wider mb-1">
                Waist ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder={unit === 'in' ? 'e.g. 26' : 'e.g. 66'}
                className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#8C7F70] uppercase tracking-wider mb-1">
                Hips ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                placeholder={unit === 'in' ? 'e.g. 36' : 'e.g. 91'}
                className="w-full px-3 py-2 text-xs border border-[#E8E1D7] focus:border-[#C49A43] outline-none"
              />
            </div>

            <div className="sm:col-span-3 mt-1">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#C49A43] hover:bg-[#B28731] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Calculate Personalized Recommendation
              </button>
            </div>
          </form>

          {recommendation && (
            <div className="mt-4 p-3 bg-[#FAF4E5] border border-[#E6CD92] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C49A43] shrink-0" />
              <div>
                <p className="text-xs text-[#9E7422] font-semibold tracking-wide">
                  {recommendation}
                </p>
                <p className="text-[11px] text-[#8C7F70] mt-0.5">
                  Our bias cuts allow forgiving natural drapery across high-movement zones.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* International Conversion Matrix */}
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#111111] mb-3">
            International Atelier Sizing Matrix
          </h4>
          <div className="overflow-x-auto border border-[#E8E1D7]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#111111] text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">France</th>
                  <th className="py-2.5 px-3">Italy</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">Bust (in)</th>
                  <th className="py-2.5 px-3">Waist (in)</th>
                  <th className="py-2.5 px-3">Hips (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D7] bg-white text-[#292725]">
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#C49A43]">XS</td>
                  <td className="py-2 px-3">0 - 2</td>
                  <td className="py-2 px-3">34</td>
                  <td className="py-2 px-3">38</td>
                  <td className="py-2 px-3">6</td>
                  <td className="py-2 px-3">32 - 33</td>
                  <td className="py-2 px-3">24 - 25.5</td>
                  <td className="py-2 px-3">34.5 - 35.5</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#C49A43]">S</td>
                  <td className="py-2 px-3">4</td>
                  <td className="py-2 px-3">36</td>
                  <td className="py-2 px-3">40</td>
                  <td className="py-2 px-3">8</td>
                  <td className="py-2 px-3">34 - 35</td>
                  <td className="py-2 px-3">26 - 27.5</td>
                  <td className="py-2 px-3">36.5 - 37.5</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#C49A43]">M</td>
                  <td className="py-2 px-3">6</td>
                  <td className="py-2 px-3">38</td>
                  <td className="py-2 px-3">42</td>
                  <td className="py-2 px-3">10</td>
                  <td className="py-2 px-3">36 - 37</td>
                  <td className="py-2 px-3">28 - 29.5</td>
                  <td className="py-2 px-3">38.5 - 39.5</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#C49A43]">L</td>
                  <td className="py-2 px-3">8 - 10</td>
                  <td className="py-2 px-3">40</td>
                  <td className="py-2 px-3">44</td>
                  <td className="py-2 px-3">12</td>
                  <td className="py-2 px-3">38 - 39.5</td>
                  <td className="py-2 px-3">30.5 - 32</td>
                  <td className="py-2 px-3">41 - 42.5</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#C49A43]">XL</td>
                  <td className="py-2 px-3">12</td>
                  <td className="py-2 px-3">42</td>
                  <td className="py-2 px-3">46</td>
                  <td className="py-2 px-3">14</td>
                  <td className="py-2 px-3">40.5 - 42</td>
                  <td className="py-2 px-3">33 - 35</td>
                  <td className="py-2 px-3">43.5 - 45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Complimentary Bespoke Tailoring Assurance */}
        <div className="mt-6 pt-4 border-t border-[#E8E1D7] flex items-center justify-between text-xs text-[#8C7F70]">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-[#C49A43]" />
            <span>Need Custom Hemming or Sizing? Request Bespoke Atelier Service at checkout.</span>
          </span>
          <button
            onClick={() => setSizeGuideModalOpen(false)}
            className="text-[#111111] hover:text-[#C49A43] font-medium uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
