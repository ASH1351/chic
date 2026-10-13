import React, { useState } from 'react';
import { EDITORIAL_ARTICLES } from '../../data/fashionData';
import { ArrowRight, Clock, X } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const activeArticle = EDITORIAL_ARTICLES.find((a) => a.id === activeArticleId);

  return (
    <section id="journal" className="py-20 bg-white border-t border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block mb-2">
              The Editorial Gazette
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-normal">
              Notes From The Atelier
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-[#8C7F70] font-light max-w-md">
            Essays on textiles, silhouette construction, and the psychology of poise by our artisans and creative directors.
          </p>
        </div>

        {/* 2 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDITORIAL_ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticleId(art.id)}
              className="group cursor-pointer border border-[#E8E1D7] hover:border-[#C49A43] transition-all bg-[#FAF7F2] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden mb-6 bg-[#111111]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                </div>

                <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-[#8C7F70] mb-2">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C49A43]" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] group-hover:text-[#C49A43] transition-colors leading-tight mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#8C7F70] font-light leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between text-xs uppercase tracking-wider text-[#111111] font-medium group-hover:text-[#C49A43]">
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#C49A43]/50 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto animate-fade-in text-[#292725]">
            <button
              onClick={() => setActiveArticleId(null)}
              className="absolute top-6 right-6 p-2 text-[#8C7F70] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C49A43] font-medium block mb-2">
              Chic Couture Gazette • {activeArticle.date}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#111111] mb-2 leading-tight">
              {activeArticle.title}
            </h2>
            <p className="text-xs text-[#8C7F70] mb-6">By {activeArticle.author}</p>

            <div className="aspect-[16/9] overflow-hidden mb-6">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm leading-relaxed text-[#292725] font-light space-y-4 font-serif">
              <p>{activeArticle.content}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E1D7] flex items-center justify-between">
              <span className="font-script-luxury text-2xl text-[#C49A43]">
                Wear Confidence.
              </span>
              <button
                onClick={() => setActiveArticleId(null)}
                className="px-6 py-2 bg-[#111111] hover:bg-[#C49A43] text-white text-xs uppercase tracking-wider transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
