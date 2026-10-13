import React from 'react';
import { COLLECTIONS } from '../../data/fashionData';
import { ArrowUpRight } from 'lucide-react';

interface CollectionsGridProps {
  onSelectCollection: (collectionName: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections-curated" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block mb-2">
          Curated Capsules
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          The Seasonal Editions
        </h2>
        <div className="w-12 h-[1px] bg-[#C49A43] mx-auto mt-4 mb-3" />
        <p className="text-xs sm:text-sm text-[#8C7F70] font-light max-w-lg mx-auto">
          Explore dedicated wardrobe edits created for the gala, the boardroom, the Mediterranean escape, and the intimate salon.
        </p>
      </div>

      {/* Grid of 4 Curated Capsules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLLECTIONS.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.name)}
            className="group relative h-[440px] overflow-hidden cursor-pointer bg-[#111111] border border-[#E8E1D7] transition-all duration-500 hover:shadow-xl hover:border-[#C49A43]"
          >
            {/* Background image */}
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-95"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#ECC876] mb-1">
                {col.itemCount} Masterpieces
              </span>
              <h3 className="font-editorial text-2xl text-white font-medium group-hover:text-[#ECC876] transition-colors leading-snug">
                {col.name}
              </h3>
              <p className="text-xs text-[#D6CEC5] font-light mt-1.5 line-clamp-2">
                {col.tagline}
              </p>

              {/* Action pill */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20">
                <span className="text-[11px] tracking-[0.18em] uppercase text-white group-hover:text-[#ECC876] transition-colors">
                  Explore Capsule
                </span>
                <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#C49A43] group-hover:text-[#111111] flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
