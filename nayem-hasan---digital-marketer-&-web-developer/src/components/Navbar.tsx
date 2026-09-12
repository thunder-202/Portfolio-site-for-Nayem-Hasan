import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { settings, homepageContent } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = settings?.general?.name || settings?.general?.siteName || settings?.general?.websiteName || PERSONAL_INFO.name;
  const brandTagline = settings?.general?.tagline || PERSONAL_INFO.subRole;
  const brandLogo = settings?.general?.logoText || "NH";
  const availability = settings?.general?.availabilityStatus || homepageContent?.hero?.availabilityStatus || PERSONAL_INFO.availability;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'process', label: 'Process' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#C9A227]/15 shadow-2xl shadow-black/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('hero')}
          className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-[#C9A227]/40 bg-[#17110D] flex items-center justify-center text-[#E5C45A] font-bold text-sm tracking-wider shadow-inner group-hover:border-[#C9A227] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.3)] transition-all">
              {brandLogo}
            </div>
            <div>
              <span className="block text-sm sm:text-base font-bold tracking-tight text-[#F5F2EA] group-hover:text-[#E5C45A] transition-colors">
                {brandName.toUpperCase()}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.22em] text-[#C9A227] font-semibold uppercase">
                {brandTagline}
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#111111]/80 border border-[#222222]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#080808] bg-[#E5C45A] font-semibold shadow-[0_0_15px_rgba(229,196,90,0.4)]'
                    : 'text-[#A6A19A] hover:text-[#F5F2EA] hover:bg-[#17110D]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-cta-btn"
            onClick={() => handleNavClick('contact')}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#E5C45A] hover:bg-[#F5D77F] border border-[#C9A227] text-[#080808] text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(229,196,90,0.35)] hover:shadow-[0_0_20px_rgba(229,196,90,0.5)]"
          >
            <span className="text-[#080808]">Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#080808] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-trigger"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-[#111111] border border-[#262626] text-[#F5F2EA] hover:text-[#E5C45A] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-x-0 top-[60px] bg-[#080808]/98 border-b border-[#C9A227]/20 backdrop-blur-xl px-5 py-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <div className="px-3 py-1.5 mb-2 rounded bg-[#17110D] border border-[#C9A227]/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-[#E5C45A] font-medium">{availability}</span>
            </div>

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#17110D] text-[#E5C45A] border-l-2 border-[#C9A227]'
                      : 'text-[#A6A19A] hover:text-[#F5F2EA] hover:bg-[#111111]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#1e1e1e]">
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 rounded-md bg-[#C9A227] text-[#080808] text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,162,39,0.3)]"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
