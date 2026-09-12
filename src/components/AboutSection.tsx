import React from 'react';
import { Compass, Sparkles, Layers, CheckCircle2, User, Globe, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { settings, homepageContent } = usePortfolio();
  const brandName = settings?.general?.name || settings?.general?.siteName || settings?.general?.websiteName || PERSONAL_INFO.name;
  const brandRole = settings?.general?.tagline || PERSONAL_INFO.subRole || "Digital Marketer & Web Developer";
  const brandLocation = settings?.general?.location || PERSONAL_INFO.location;
  const brandLogo = settings?.general?.logoText || "NH";

  const aboutHeadline = homepageContent?.about?.headline || "Bridging Design, Code & Real Business Outcomes";
  const aboutDescription = homepageContent?.about?.description || "I combine design, technology, marketing, and user experience to build websites that are not only visually impressive but also structured around a business goal.";
  const signatureText = homepageContent?.about?.signatureText || `${brandName} — Building. Learning. Improving.`;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight">
            A Little About Me
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sophisticated Technical Portrait & Monogram Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111111] border border-[#222222] p-6 sm:p-8 overflow-hidden group hover:border-[#C9A227]/40 transition-all duration-300">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A227]/[0.07] rounded-full blur-3xl pointer-events-none"></div>

              {/* Sophisticated Geometric Avatar Card */}
              <div className="relative aspect-square max-w-[320px] mx-auto rounded-xl bg-gradient-to-br from-[#17110D] via-[#111111] to-[#0a0a0a] border border-[#C9A227]/30 flex flex-col items-center justify-center p-6 text-center shadow-2xl mb-6">
                {/* Visual Technical Badge Ring */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#C9A227]/50 flex items-center justify-center mb-4 bg-[#080808]/80 group-hover:border-[#E5C45A] group-hover:rotate-45 transition-all duration-700">
                  <div className="w-16 h-16 rounded-full bg-[#17110D] border border-[#C9A227] flex items-center justify-center text-2xl font-black text-[#E5C45A] tracking-wider">
                    {brandLogo}
                  </div>
                </div>

                <div className="text-lg font-bold text-[#F5F2EA] tracking-tight">
                  {brandName}
                </div>
                <div className="text-xs font-medium text-[#C9A227] tracking-wider uppercase mb-3">
                  {brandRole}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808] border border-[#262626] text-[11px] text-[#A6A19A]">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>Based in {brandLocation}</span>
                </div>
                {/* Subtle corner tech markers */}
                <div className="absolute top-2 left-2 text-[10px] text-[#C9A227]/40 font-mono">+ 01</div>
                <div className="absolute top-2 right-2 text-[10px] text-[#C9A227]/40 font-mono">SYS_OK</div>
                <div className="absolute bottom-2 left-2 text-[10px] text-[#C9A227]/40 font-mono">WEB.DEV</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-[#C9A227]/40 font-mono">GROWTH</div>
              </div>

              {/* Personal Signature Element */}
              <div className="pt-4 border-t border-[#1e1e1e] flex flex-col items-center text-center">
                <div className="text-xl sm:text-2xl font-serif italic text-[#E5C45A] font-bold tracking-wide mb-1">
                  {brandName}
                </div>
                <div className="text-xs font-medium tracking-[0.2em] text-[#A6A19A] uppercase">
                  {signatureText}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Strategic Approach */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6 text-[#A6A19A] text-base sm:text-lg leading-relaxed font-normal">
              <p className="text-[#F5F2EA] font-medium text-lg sm:text-xl leading-relaxed">
                {aboutHeadline}
              </p>

              <p>
                {aboutDescription}
              </p>

              <p>
                My focus is simple: <span className="text-[#F5F2EA]">understand the business</span>, <span className="text-[#F5F2EA]">understand its customers</span>, and build a digital experience that makes the next step obvious.
              </p>

              <p className="text-sm text-[#8a857e]">
                Whether it's a neighborhood bistro looking to increase table reservations, a luxury auto spa selling high-ticket ceramic coatings, or a local service company needing more emergency phone inquiries, I build the digital bridge between your expertise and your prospective customers.
              </p>
            </div>

            {/* 4 Core Pillars of Nayem's Methodology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg bg-[#111111] border border-[#1e1e1e]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Layers className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-sm font-bold text-[#F5F2EA]">Visual Craft</span>
                </div>
                <p className="text-xs text-[#A6A19A]">
                  Typography, spatial rhythm, and aesthetic polish that elevates perceived brand value.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#111111] border border-[#1e1e1e]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-sm font-bold text-[#F5F2EA]">Clean Code</span>
                </div>
                <p className="text-xs text-[#A6A19A]">
                  Semantic, fast, and responsive web foundations built to perform on every device.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#111111] border border-[#1e1e1e]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-sm font-bold text-[#F5F2EA]">Customer Focus</span>
                </div>
                <p className="text-xs text-[#A6A19A]">
                  Intuitive user flows that eliminate friction and turn visitors into real contacts.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#111111] border border-[#1e1e1e]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Compass className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-sm font-bold text-[#F5F2EA]">Local Growth</span>
                </div>
                <p className="text-xs text-[#A6A19A]">
                  Structured data, local SEO foundations, and conversion-first CTAs.
                </p>
              </div>
            </div>

            {/* Quick Action Link */}
            <div className="pt-2">
              <button
                id="about-view-services-btn"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#E5C45A] hover:text-[#F5F2EA] transition-colors group cursor-pointer"
              >
                <span>Explore my core services & solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
