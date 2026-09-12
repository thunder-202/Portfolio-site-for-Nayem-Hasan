import React, { useState } from 'react';
import { Search, Compass, Code, CheckCircle, ArrowRight, Check } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ProcessSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const { homepageContent } = usePortfolio();
  const stepsList = homepageContent?.process && homepageContent.process.length > 0 ? homepageContent.process : PROCESS_STEPS;
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Search className="w-5 h-5 text-[#C9A227]" />;
      case 1:
        return <Compass className="w-5 h-5 text-[#C9A227]" />;
      case 2:
        return <Code className="w-5 h-5 text-[#C9A227]" />;
      case 3:
        return <CheckCircle className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Search className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0c0c] border-t border-[#171717]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
            <span>STRUCTURED METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight mb-4">
            How I Work
          </h2>
          <p className="text-[#A6A19A] max-w-2xl text-base leading-relaxed">
            A clear 4-step framework from initial consultation to launch, ensuring complete transparency and zero guesswork.
          </p>
        </div>

        {/* 4-Step Interactive Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stepsList.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                id={`process-step-${idx}`}
                onClick={() => setActiveStep(idx)}
                className={`relative p-6 sm:p-7 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#17110D] border-2 border-[#C9A227] shadow-[0_0_30px_rgba(201,162,39,0.15)]'
                    : 'bg-[#111111] border border-[#1f1f1f] hover:border-[#C9A227]/40'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-mono text-[#E5C45A]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#080808] border border-[#2a2a2a] flex items-center justify-center">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-[#F5F2EA] mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#C9A227] tracking-wider uppercase mb-4">
                    {step.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A6A19A] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Key Actions Bullet points */}
                  <div className="space-y-2 pt-4 border-t border-[#222222]">
                    <div className="text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-2">
                      Key Deliverables:
                    </div>
                    {step.keyActions.map((action, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-[#c4bfb7]">
                        <Check className="w-3 h-3 text-[#C9A227] shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step indicator footer */}
                <div className="mt-6 pt-4 border-t border-[#1e1e1e] flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#8a857e]">Stage 0{idx + 1} of 04</span>
                  <span className={`font-semibold ${isSelected ? 'text-[#E5C45A]' : 'text-[#555555]'}`}>
                    {isSelected ? 'Active Focus' : 'Select Stage'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Banner */}
        <div className="mt-12 p-6 rounded-xl bg-[#111111] border border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-[#F5F2EA]">
              Transparent Collaboration & Regular Milestones
            </div>
            <p className="text-xs text-[#A6A19A] mt-0.5">
              You receive review previews at every key phase before moving forward. No surprise surprises.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-md bg-[#C9A227] hover:bg-[#E5C45A] text-[#080808] text-xs font-bold transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(201,162,39,0.25)]"
          >
            Start Stage 01 with Nayem
          </button>
        </div>
      </div>
    </section>
  );
};
