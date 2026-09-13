import React from 'react';
import { Target, Sparkles, Smartphone, Zap, Flame, Shield, CheckCircle2 } from 'lucide-react';
import { WHY_WORK_WITH_ME } from '../data/portfolioData';

export const WhyWorkWithMe: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-[#C9A227]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#C9A227]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#C9A227]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Shield className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="why-me" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
            <span>VALUE PROPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight leading-[1.15]">
            I Don't Just Build Websites.{' '}
            <span className="text-[#E5C45A]">
              I Build The Experience Around The Business.
            </span>
          </h2>
        </div>

        {/* 5 Core Differentiators Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((item, idx) => (
            <div
              key={idx}
              id={`why-card-${idx}`}
              className={`p-7 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#C9A227]/50 transition-all duration-300 group flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#17110D] to-[#111111]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-[#080808] border border-[#2a2a2a] group-hover:border-[#C9A227] flex items-center justify-center transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono text-[#666666]">0{idx + 1}</span>
                </div>

                <div className="text-xs font-semibold text-[#C9A227] tracking-wider uppercase mb-1">
                  {item.tagline}
                </div>
                <h3 className="text-xl font-bold text-[#F5F2EA] mb-3 group-hover:text-[#E5C45A] transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A6A19A] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center gap-2 text-xs text-[#8a857e]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Strict Standard in Every Deliverable</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
