import React from 'react';
import { Compass, Sparkles, Rocket, ShieldCheck, HeartHandshake } from 'lucide-react';

interface GrowthVisionProps {
  onNavigate: (sectionId: string) => void;
}

export const GrowthVision: React.FC<GrowthVisionProps> = ({ onNavigate }) => {
  return (
    <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0c0c0c] border-y border-[#171717]">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#17110D] via-[#111111] to-[#080808] border border-[#C9A227]/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/[0.08] rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#080808] border border-[#C9A227]/40 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>TRANSPARENCY & DIRECTION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F2EA] tracking-tight mb-4">
              What I'm Building Toward
            </h2>

            <p className="text-base sm:text-lg text-[#c7c2ba] leading-relaxed mb-6 font-normal">
              This portfolio is continuously expanding through rigorous case studies, experiments, and deep practice in conversion architecture. Rather than relying on hollow marketing claims or fabricated feedback, I let clean code, deliberate UX choices, and tangible business solutions speak for themselves.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2a221b]">
              <div className="flex items-start gap-3">
                <Rocket className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-[#F5F2EA]">Practical Standards</div>
                  <p className="text-xs text-[#8a857e] mt-0.5">Focusing on high performance, accessibility, and local business conversion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-[#F5F2EA]">No Fake Claims</div>
                  <p className="text-xs text-[#8a857e] mt-0.5">Transparent showcase labeling with verified technical integrity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-[#F5F2EA]">Dedicated Attention</div>
                  <p className="text-xs text-[#8a857e] mt-0.5">Taking on select local business projects to ensure 100% focused execution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
