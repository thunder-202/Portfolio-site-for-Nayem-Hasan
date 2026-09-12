import React, { useState } from 'react';
import { Terminal, PenTool, TrendingUp, Check, Cpu } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { homepageContent } = usePortfolio();
  const skillsList = homepageContent?.skills && homepageContent.skills.length > 0 ? homepageContent.skills : SKILLS_DATA;
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Terminal className="w-4 h-4 text-[#C9A227]" />;
      case 1:
        return <PenTool className="w-4 h-4 text-[#C9A227]" />;
      case 2:
        return <TrendingUp className="w-4 h-4 text-[#C9A227]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#C9A227]" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0c0c] border-t border-[#171717]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
              <span>TECHNICAL PROFICIENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight">
              Tools, Craft & Capabilities
            </h2>
          </div>
          <p className="text-[#A6A19A] max-w-md text-sm leading-relaxed">
            Curated competencies combining engineering rigor, human-centered UI/UX design, and practical business marketing.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillsList.map((category, catIdx) => (
            <div
              key={category.title}
              id={`skill-category-${catIdx}`}
              className="p-7 rounded-2xl bg-[#111111] border border-[#1f1f1f] hover:border-[#C9A227]/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#17110D] border border-[#C9A227]/30 flex items-center justify-center">
                    {getCategoryIcon(catIdx)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F5F2EA] tracking-tight">
                      {category.title}
                    </h3>
                    <div className="text-[11px] font-mono text-[#C9A227]">
                      {category.tagline}
                    </div>
                  </div>
                </div>

                {/* Skills Stack List with Clean Badges and Short Descriptions */}
                <div className="space-y-3 mt-6">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={`${category.title}-skill-${skill.name}-${sIdx}`}
                      className="p-3.5 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-[#F5F2EA]">
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#17110D] border border-[#C9A227]/30 text-[#E5C45A]">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8a857e] leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Category Note */}
              <div className="pt-5 mt-6 border-t border-[#1a1a1a] text-[11px] text-[#6d6861] font-mono flex items-center justify-between">
                <span>Domain 0{catIdx + 1}</span>
                <span>Active Practice</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
