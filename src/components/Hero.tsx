import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Zap, Laptop, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { homepageContent, settings } = usePortfolio();

  const heroData = homepageContent?.hero || {
    smallLabel: "WEBSITE SOLUTIONS SPECIALIST & DIGITAL MARKETER",
    mainHeadline: "I Build Digital Experiences That Help Businesses Get Noticed.",
    subHeadline: "High-Performance Websites & Digital Systems for Local Businesses & Growth-Focused Brands",
    description: "I design and develop premium, conversion-focused websites for restaurants, automotive businesses, detailing shops, mechanics, and local service brands. No generic templates — only strategic web systems built to generate inquiries and establish professional authority.",
    primaryCtaText: "View My Work",
    primaryCtaAction: "work",
    secondaryCtaText: "Let's Talk",
    secondaryCtaAction: "contact",
    availabilityStatus: "Available for Q1/Q2 Projects",
    backgroundVisual: "grid-particles"
  };

  // Dynamic colors from settings or homepage content
  const heroBgColor = settings?.appearance?.heroBgColor || heroData.heroBgColor || '#050505';
  const heroTextColor = settings?.appearance?.heroTextColor || heroData.heroTextColor || '#F5F2EA';
  const heroAccentColor = settings?.appearance?.heroAccentTextColor || settings?.appearance?.accentColor || heroData.heroAccentTextColor || '#E5C45A';

  return (
    <section
      id="hero"
      style={{ backgroundColor: heroBgColor }}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]"
    >
      {/* Background Ambience: Subtle Clean Grid on Crisp Dark Black Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle grid background */}
        <div className="absolute inset-0 subtle-grid-bg opacity-30"></div>

        {/* Minimal soft ambient depth light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: heroAccentColor }}></div>

        {/* Subtle geometric technical lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>
        <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div
          id="hero-availability-badge"
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111]/90 border border-[#262626] text-xs font-medium shadow-lg shadow-black/60 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide font-semibold hero-golden-highlight" style={{ color: heroAccentColor }}>
            {heroData.availabilityStatus}
          </span>
          <span className="text-[#666666]">•</span>
          <span className="text-[#A6A19A] hidden sm:inline">Local Business Openings</span>
        </div>

        {/* Small Professional Role Label */}
        <div className="mb-4">
          <span
            className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase bg-[#111111] px-3.5 py-1 rounded border border-[#262626]"
            style={{ color: heroAccentColor }}
          >
            {heroData.smallLabel}
          </span>
        </div>

        {/* Main Headline - Golden text with crisp contrast on dark black background */}
        <h1
          id="hero-main-headline"
          style={{ color: heroTextColor }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.12] mb-6 max-w-4xl text-[#F5F2EA]"
        >
          {heroData.mainHeadline.includes("Businesses Get Noticed") ? (
            <>
              I Build Digital Experiences That Help{' '}
              <span
                className="hero-golden-highlight underline underline-offset-8"
                style={{
                  color: heroAccentColor,
                  textDecorationColor: `${heroAccentColor}66`
                }}
              >
                Businesses Get Noticed.
              </span>
            </>
          ) : (
            <span
              className="hero-golden-highlight"
              style={{ color: heroAccentColor }}
            >
              {heroData.mainHeadline}
            </span>
          )}
        </h1>

        {/* Supporting Copy */}
        <p
          id="hero-supporting-text"
          className="text-base sm:text-lg md:text-xl text-[#A6A19A] leading-relaxed max-w-3xl mb-10 font-normal"
        >
          {heroData.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            id="hero-primary-cta"
            onClick={() => onNavigate(heroData.primaryCtaAction || 'work')}
            style={{ backgroundColor: heroAccentColor }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md text-[#080808] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer group"
          >
            <span>{heroData.primaryCtaText}</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={() => onNavigate(heroData.secondaryCtaAction || 'contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#111111] text-[#F5F2EA] border border-[#2a2a2a] hover:border-white/40 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group"
          >
            <span>{heroData.secondaryCtaText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Micro Value Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-8 border-t border-[#1a1a1a]/90 text-left">
          <div className="flex items-center gap-2.5 p-2 rounded bg-[#0d0d0d]/80 border border-[#1a1a1a]">
            <Laptop className="w-4 h-4 shrink-0" style={{ color: heroAccentColor }} />
            <span className="text-xs font-medium text-[#A6A19A]">High-End Design</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded bg-[#0d0d0d]/80 border border-[#1a1a1a]">
            <Zap className="w-4 h-4 shrink-0" style={{ color: heroAccentColor }} />
            <span className="text-xs font-medium text-[#A6A19A]">Conversion UX</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded bg-[#0d0d0d]/80 border border-[#1a1a1a]">
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: heroAccentColor }} />
            <span className="text-xs font-medium text-[#A6A19A]">Local SEO Ready</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded bg-[#0d0d0d]/80 border border-[#1a1a1a]">
            <Award className="w-4 h-4 shrink-0" style={{ color: heroAccentColor }} />
            <span className="text-xs font-medium text-[#A6A19A]">No Fluff or Filler</span>
          </div>
        </div>
      </div>
    </section>
  );
};
