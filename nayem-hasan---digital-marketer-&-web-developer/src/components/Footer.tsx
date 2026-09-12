import React from 'react';
import { ArrowUp, Lock, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { settings } = usePortfolio();
  const brandName = settings?.general?.name || settings?.general?.siteName || settings?.general?.websiteName || PERSONAL_INFO.name;
  const brandRole = settings?.general?.tagline || PERSONAL_INFO.subRole || PERSONAL_INFO.role;
  const brandLogo = settings?.general?.logoText || "NH";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#050505] border-t border-[#171717] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle Gold Ambient Indicator Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#141414]">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded border border-[#C9A227]/40 bg-[#17110D] flex items-center justify-center text-[#E5C45A] font-bold text-xs">
                {brandLogo}
              </div>
              <span className="text-lg font-bold tracking-tight text-[#F5F2EA]">
                {brandName.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-[#8a857e]">
              {brandRole}
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#A6A19A]">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('work')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => onNavigate('process')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#E5C45A] transition-colors cursor-pointer"
            >
              Contact
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#E5C45A] text-[#8C857B] transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="p-2.5 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#C9A227]/50 text-[#A6A19A] hover:text-[#E5C45A] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>High-Converting Digital Systems</span>
            <span className="text-[#C9A227]">•</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#E5C45A] text-[#736E66] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-[#C9A227]" />
                <span>Nayem Admin OS</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
