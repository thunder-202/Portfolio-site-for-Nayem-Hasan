import React from 'react';
import { QUICK_STATS } from '../data/portfolioData';

export const QuickStats: React.FC = () => {
  return (
    <section id="quick-stats" className="relative z-20 py-10 border-y border-[#1a1a1a] bg-[#0c0c0c]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              id={`stat-card-${idx}`}
              className="relative p-5 rounded-lg bg-[#111111]/90 border border-[#1e1e1e] hover:border-[#C9A227]/40 transition-all duration-300 group"
            >
              {/* Subtle top accent indicator */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent group-hover:via-[#E5C45A] transition-all"></div>

              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5C45A] tracking-tight mb-2 group-hover:scale-[1.02] origin-left transition-transform">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#F5F2EA] tracking-normal mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-[#A6A19A] leading-relaxed">
                  {stat.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
