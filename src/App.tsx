import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickStats } from './components/QuickStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedWork } from './components/FeaturedWork';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProcessSection } from './components/ProcessSection';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { SkillsSection } from './components/SkillsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { GrowthVision } from './components/GrowthVision';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { DynamicThemeAndSeo } from './components/DynamicThemeAndSeo';
import { ProjectCaseStudy } from './types';

function MainAppContent() {
  const { isAuthenticated, settings } = usePortfolio();

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  // Check initial route / query / hash
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'public';
  });

  // Keyboard shortcut listener for rapid admin access (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key || '').toLowerCase() === 'a') {
        e.preventDefault();
        setViewMode(prev => (prev === 'admin' ? 'public' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Section observer to update active navigation item on scroll (only when on public view)
  useEffect(() => {
    if (viewMode !== 'public') return;

    const handleScrollObserver = () => {
      const sections = ['hero', 'about', 'services', 'work', 'process', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, [viewMode]);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in admin mode:
  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onBackToPublic={() => setViewMode('public')} />;
    }
    return <AdminLayout onOpenPublicSite={() => setViewMode('public')} />;
  }

  // If maintenance mode enabled and not logged in as admin:
  if (settings.maintenance.enabled && !isAuthenticated) {
    return <MaintenanceScreen onOpenAdmin={() => setViewMode('admin')} />;
  }

  return (
    <div className="bg-[#080808] text-[#F5F2EA] min-h-screen flex flex-col font-sans selection:bg-[#C9A227]/30 selection:text-[#E5C45A]">
      {/* Real-time Theme, Accent Color, and SEO Synchronization */}
      <DynamicThemeAndSeo />

      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Portfolio Sections */}
      <main className="flex-1">
        <Hero onNavigate={handleNavigate} />
        <QuickStats />
        <AboutSection onNavigate={handleNavigate} />
        <ServicesSection onNavigate={handleNavigate} />
        <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />
        <ProcessSection onNavigate={handleNavigate} />
        <WhyWorkWithMe />
        <SkillsSection />
        <IndustriesSection onNavigate={handleNavigate} />
        <GrowthVision onNavigate={handleNavigate} />
        <ContactSection onNavigate={handleNavigate} />
      </main>

      {/* Footer with Admin Portal trigger */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Interactive Case Study Detail Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={() => {
            handleNavigate('contact');
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}
