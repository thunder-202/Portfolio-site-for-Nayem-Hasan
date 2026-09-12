import React from 'react';
import { UtensilsCrossed, Coffee, Sparkles, Wrench, ShieldCheck, Building2, Car, UserCheck, ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface IndustriesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onNavigate }) => {
  const { homepageContent } = usePortfolio();
  const industriesList = homepageContent?.industries && homepageContent.industries.length > 0 ? homepageContent.industries : INDUSTRIES_DATA;

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#C9A227]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#C9A227]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#C9A227]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C9A227]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#C9A227]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#C9A227]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
              <span>SPECIALIZED SECTORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight">
              Industries I Design & Build For
            </h2>
          </div>
          <p className="text-[#A6A19A] max-w-md text-sm sm:text-base leading-relaxed">
            Tailored digital solutions built around the unique customer interactions of brick-and-mortar and service operations.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industriesList.map((ind, idx) => (
            <div
              key={idx}
              id={`industry-card-${idx}`}
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#C9A227]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#17110D] border border-[#C9A227]/20 flex items-center justify-center group-hover:border-[#E5C45A] transition-colors">
                    {getIndustryIcon(ind.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#1f1f1f]">
                    {ind.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F5F2EA] mb-2 group-hover:text-[#E5C45A] transition-colors tracking-tight">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#A6A19A] leading-relaxed">
                  {ind.focus}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between">
                <span className="text-[11px] text-[#736e67]">Custom Strategy</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
