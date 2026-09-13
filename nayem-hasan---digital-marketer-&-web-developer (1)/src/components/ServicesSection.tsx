import React from 'react';
import { Code2, Layout, TrendingUp, Briefcase, ArrowRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const { homepageContent } = usePortfolio();
  const servicesList = homepageContent?.services && homepageContent.services.length > 0 ? homepageContent.services : SERVICES_DATA;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#C9A227]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#C9A227]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#C9A227]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#C9A227]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#C9A227]" />;
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0c0c] border-t border-[#171717]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
              <span>SPECIALIZED CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight">
              What I Bring To The Table
            </h2>
          </div>
          <p className="text-[#A6A19A] max-w-md text-sm sm:text-base leading-relaxed">
            High-caliber digital execution tailored for business owners who value clarity, reliability, and tangible commercial growth.
          </p>
        </div>

        {/* 4 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => (
            <div
              key={service.number}
              id={`service-card-${idx}`}
              className="relative p-8 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#C9A227]/50 transition-all duration-300 group flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Background ambient corner flare on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/[0.04] rounded-full blur-2xl group-hover:bg-[#C9A227]/[0.1] transition-all duration-500 pointer-events-none"></div>

              <div>
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-[#C9A227]/60 group-hover:text-[#E5C45A] transition-colors">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-lg bg-[#17110D] border border-[#C9A227]/30 flex items-center justify-center group-hover:border-[#E5C45A] group-hover:scale-110 transition-all duration-300">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-[#F5F2EA] mb-2 group-hover:text-[#E5C45A] transition-colors tracking-tight">
                  {service.title}
                </h3>
                <div className="text-xs font-semibold text-[#C9A227] tracking-wider uppercase mb-4">
                  {service.tagline}
                </div>

                {/* Description */}
                <p className="text-[#A6A19A] text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 pt-4 border-t border-[#1e1e1e]">
                  {service.deliverables.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c4bfb7]">
                      <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-[#1a1a1a] flex items-center justify-between">
                <span className="text-xs text-[#736e67] font-mono uppercase">
                  Service #{service.number}
                </span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C45A] group-hover:text-[#F5F2EA] transition-colors cursor-pointer"
                >
                  <span>Inquire for your business</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
