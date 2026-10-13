import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Truck, Watch } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Haute Couture • Capsule 04',
    title: 'L’Élégance Redéfinie',
    taglineSubtitle: 'Sculptural drapery, pure silk bias-cuts, and the quiet power of understated silhouette.',
    scriptAccent: 'Wear Confidence.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1920&q=90',
    primaryCta: 'Explore The Collection',
    primarySection: 'catalog',
    secondaryCta: 'Discover The Lookbook',
    secondarySection: 'lookbook',
    exclusiveNote: 'Handcrafted in limited editions of 50 per silhouette',
  },
  {
    id: 2,
    tag: 'Modern Power Tailoring',
    title: 'Architectural Poise',
    taglineSubtitle: 'Razor-sharp peaked lapels in Italian virgin wool crepe, tailored for commanding grace.',
    scriptAccent: 'Wear Confidence.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1920&q=90',
    primaryCta: 'Shop Power Tailoring',
    primarySection: 'catalog',
    secondaryCta: 'Atelier Craftsmanship',
    secondarySection: 'atelier-story',
    exclusiveNote: 'Canvas interlinings & hand-stitched pick lapels',
  },
  {
    id: 3,
    tag: 'The Silk Archive',
    title: 'Fluid Sensuality',
    taglineSubtitle: '22-momme double-faced mulberry silk slips and flowing gowns that move like liquid light.',
    scriptAccent: 'Wear Confidence.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=90',
    primaryCta: 'Explore The Silk Edit',
    primarySection: 'catalog',
    secondaryCta: 'Book Private Fitting',
    secondarySection: 'booking',
    exclusiveNote: 'Grade 6A Mulberry Silk • Naturally Thermo-regulating',
  },
];

export const HeroSection: React.FC = () => {
  const { setAppointmentModalOpen } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleCtaClick = (section: string) => {
    if (section === 'booking') {
      setAppointmentModalOpen(true);
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background Images with smooth transitions */}
      <div className="relative h-[82vh] min-h-[580px] max-h-[860px] w-full">
        {HERO_SLIDES.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top filter brightness-[0.78] contrast-[1.05]"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/50" />
          </div>
        ))}

        {/* Foreground Editorial Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-end pb-16 sm:pb-20">
          <div className="max-w-2xl">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#111111]/70 backdrop-blur-md border border-[#C49A43]/40 text-[#C49A43] text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
              <Sparkles className="w-3 h-3 text-[#C49A43]" />
              <span>{slide.tag}</span>
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5EF] leading-[1.05] drop-shadow-md">
              {slide.title}
            </h1>

            {/* Tagline Accent in Luxury Script */}
            <div className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-[#ECC876] font-script-luxury italic">
              {slide.scriptAccent}
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-[#D6CEC5] font-light max-w-lg leading-relaxed drop-shadow">
              {slide.taglineSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleCtaClick(slide.primarySection)}
                className="group relative px-7 py-3.5 bg-[#C49A43] hover:bg-[#B28731] text-[#111111] font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-lg flex items-center gap-3"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleCtaClick(slide.secondarySection)}
                className="px-6 py-3.5 bg-black/40 hover:bg-black/70 backdrop-blur-md text-[#FAF5E8] border border-[#FAF5E8]/40 hover:border-[#C49A43] font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300"
              >
                {slide.secondaryCta}
              </button>
            </div>

            {/* Limited edition note */}
            <div className="mt-6 flex items-center gap-2 text-[11px] tracking-widest text-[#B5A99A] uppercase font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A43]" />
              <span>{slide.exclusiveNote}</span>
            </div>
          </div>

          {/* Slider Navigation Controls */}
          <div className="absolute right-6 sm:right-12 bottom-16 sm:bottom-20 z-30 flex items-center gap-3">
            <span className="text-xs font-serif text-[#C49A43] tracking-[0.2em] mr-2">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C49A43] bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#C49A43] transition-all"
              aria-label="Previous editorial slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C49A43] bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#C49A43] transition-all"
              aria-label="Next editorial slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Luxury Value Pillars Banner */}
      <div className="border-t border-[#292725] bg-[#161514] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#C49A43] mb-2" />
            <h4 className="text-xs tracking-[0.16em] uppercase font-medium text-[#FAF5E8]">
              22-Momme Mulberry Silk
            </h4>
            <p className="text-[11px] text-[#8C7F70] mt-0.5 font-light">
              Grade 6A certified pure natural fiber
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Watch className="w-4 h-4 text-[#C49A43] mb-2" />
            <h4 className="text-xs tracking-[0.16em] uppercase font-medium text-[#FAF5E8]">
              Atelier Craftsmanship
            </h4>
            <p className="text-[11px] text-[#8C7F70] mt-0.5 font-light">
              Hand-finished in Florence & Lyon
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Truck className="w-4 h-4 text-[#C49A43] mb-2" />
            <h4 className="text-xs tracking-[0.16em] uppercase font-medium text-[#FAF5E8]">
              White-Glove Express Delivery
            </h4>
            <p className="text-[11px] text-[#8C7F70] mt-0.5 font-light">
              Complimentary on all orders over ₹25,000
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-[#C49A43] mb-2" />
            <h4 className="text-xs tracking-[0.16em] uppercase font-medium text-[#FAF5E8]">
              Private Bespoke Fitting
            </h4>
            <p className="text-[11px] text-[#8C7F70] mt-0.5 font-light">
              Salons in Paris, NY, Milan & London
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
