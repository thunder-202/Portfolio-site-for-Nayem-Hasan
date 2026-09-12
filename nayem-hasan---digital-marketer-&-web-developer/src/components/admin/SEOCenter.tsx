import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Save,
  Check,
  Monitor,
  Smartphone,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SeoSettings, PageSeoConfig } from '../../types';

export const SEOCenter: React.FC = () => {
  const { seoSettings, updateSeoSettings } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'global' | 'pages'>('global');
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaved, setIsSaved] = useState(false);

  const [localSeo, setLocalSeo] = useState<SeoSettings>(() => {
    if (seoSettings) return seoSettings;
    return {
      global: {
        websiteTitle: "Nayem Hasan — Digital Marketer & Web Developer | High-Converting Business Websites",
        metaDescription: "Nayem Hasan builds modern websites and digital marketing solutions for restaurants, auto detailing studios, mechanics, and local businesses. Elevate your brand online.",
        canonicalUrl: "https://nayemhasan.com",
        author: "Nayem Hasan",
        keywords: "Nayem Hasan, Web Developer, Digital Marketer, Restaurant Websites, Automotive Detailing Web Design, Local SEO",
        ogTitle: "Nayem Hasan — Digital Marketer & Web Developer",
        ogDescription: "I build digital experiences and web systems that help businesses get noticed, attract leads, and grow revenue.",
        ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        robots: "index, follow"
      },
      pages: {
        home: {
          pageId: 'home',
          pageName: 'Home',
          seoTitle: "Nayem Hasan — Digital Marketer & Web Developer",
          metaDescription: "Portfolio of Nayem Hasan. Modern web development, UI/UX design, and digital marketing for modern businesses.",
          canonicalUrl: "https://nayemhasan.com/",
          ogTitle: "Nayem Hasan — Web Engineering & Digital Growth",
          ogDescription: "Explore showcase projects, services, and digital solutions for modern businesses.",
          ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
        },
        about: {
          pageId: 'about',
          pageName: 'About',
          seoTitle: "About Nayem Hasan — Strategy, Design & Development",
          metaDescription: "Learn more about Nayem Hasan, experience background, core values, and approach to digital business expansion.",
          canonicalUrl: "https://nayemhasan.com/#about",
          ogTitle: "About Nayem Hasan",
          ogDescription: "Discover my background, design philosophy, and how I help businesses thrive online.",
          ogImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
        },
        services: {
          pageId: 'services',
          pageName: 'Services',
          seoTitle: "Web Development & Digital Marketing Services — Nayem Hasan",
          metaDescription: "Website development, UI/UX design, digital marketing, and local business platforms tailored for conversion.",
          canonicalUrl: "https://nayemhasan.com/#services",
          ogTitle: "Services by Nayem Hasan",
          ogDescription: "High-performance web development and strategic digital marketing services.",
          ogImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
        },
        work: {
          pageId: 'work',
          pageName: 'Work',
          seoTitle: "Featured Case Studies & Web Projects — Nayem Hasan",
          metaDescription: "Explore interactive website showcases for fine dining restaurants, luxury auto detailing spas, roasteries, and auto repair shops.",
          canonicalUrl: "https://nayemhasan.com/#work",
          ogTitle: "Featured Work — Nayem Hasan Portfolio",
          ogDescription: "In-depth case studies and interactive design demonstrations for real business scenarios.",
          ogImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
        },
        contact: {
          pageId: 'contact',
          pageName: 'Contact',
          seoTitle: "Contact Nayem Hasan — Project Inquiries & Consultations",
          metaDescription: "Get in touch with Nayem Hasan for custom website builds, digital marketing consultations, or showcase demos.",
          canonicalUrl: "https://nayemhasan.com/#contact",
          ogTitle: "Start a Conversation — Nayem Hasan",
          ogDescription: "Ready to build your high-converting business website? Send an inquiry today.",
          ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
        }
      }
    };
  });

  useEffect(() => {
    if (seoSettings) {
      setLocalSeo(seoSettings);
    }
  }, [seoSettings]);

  const currentPageSeo = localSeo.pages?.[selectedPageId] || localSeo.pages?.home || {
    pageId: selectedPageId,
    pageName: selectedPageId,
    seoTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  };

  const handleSaveSeo = async () => {
    const success = await updateSeoSettings(localSeo);
    if (success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  // SEO Score computation
  const titleLength = (activeTab === 'global' ? (localSeo.global?.websiteTitle || '') : (currentPageSeo.seoTitle || '')).length;
  const descLength = (activeTab === 'global' ? (localSeo.global?.metaDescription || '') : (currentPageSeo.metaDescription || '')).length;
  const hasOgImage = activeTab === 'global' ? !!localSeo.global?.ogImage : !!currentPageSeo.ogImage;

  const titleScore = titleLength >= 40 && titleLength <= 70 ? 35 : 20;
  const descScore = descLength >= 120 && descLength <= 165 ? 40 : 25;
  const ogScore = hasOgImage ? 25 : 10;
  const totalSeoScore = titleScore + descScore + ogScore;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <Search className="w-5 h-5 text-[#F5F2EA]" />
            <span>SEO Control Center & Google Preview</span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Manage global metadata, per-page OpenGraph cards, search crawl directives, and keyword optimization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-xs font-mono">
            <span className="text-[#888]">SEO Health:</span>
            <span className={`font-bold ${totalSeoScore >= 90 ? 'text-emerald-400' : 'text-[#F5F2EA]'}`}>
              {totalSeoScore} / 100
            </span>
          </div>

          <button
            onClick={handleSaveSeo}
            className="px-4 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#D1CCC4]" />
                <span>Save SEO Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sub Navigation */}
          <div className="flex items-center gap-2 p-1 bg-[#121212] border border-[#222] rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('global')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'global' ? 'bg-[#202020] text-[#FFFFFF] font-semibold border border-[#333333]' : 'text-[#888] hover:text-[#FFF]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Global SEO & Metadata</span>
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'pages' ? 'bg-[#202020] text-[#FFFFFF] font-semibold border border-[#333333]' : 'text-[#888] hover:text-[#FFF]'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Per-Page SEO (5 Routes)</span>
            </button>
          </div>

          {/* GLOBAL SEO FORM */}
          {activeTab === 'global' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 space-y-4 text-xs">
              <h3 className="font-bold text-[#F5F2EA] pb-2 border-b border-[#171717]">Global Search Configuration</h3>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#C2BCB2] font-medium">Default Website Title Tag</label>
                  <span className={`font-mono text-[11px] ${localSeo.global.websiteTitle.length > 60 ? 'text-amber-400' : 'text-[#888]'}`}>
                    {localSeo.global.websiteTitle.length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={localSeo.global.websiteTitle}
                  onChange={(e) => setLocalSeo({
                    ...localSeo,
                    global: { ...localSeo.global, websiteTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#C2BCB2] font-medium">Meta Description</label>
                  <span className={`font-mono text-[11px] ${localSeo.global.metaDescription.length > 160 ? 'text-amber-400' : 'text-[#888]'}`}>
                    {localSeo.global.metaDescription.length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={localSeo.global.metaDescription}
                  onChange={(e) => setLocalSeo({
                    ...localSeo,
                    global: { ...localSeo.global, metaDescription: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Canonical Base URL</label>
                  <input
                    type="url"
                    value={localSeo.global.canonicalUrl}
                    onChange={(e) => setLocalSeo({
                      ...localSeo,
                      global: { ...localSeo.global, canonicalUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Author Name</label>
                  <input
                    type="text"
                    value={localSeo.global.author}
                    onChange={(e) => setLocalSeo({
                      ...localSeo,
                      global: { ...localSeo.global, author: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C2BCB2] font-medium mb-1">Primary Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={localSeo.global.keywords}
                  onChange={(e) => setLocalSeo({
                    ...localSeo,
                    global: { ...localSeo.global, keywords: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Social Sharing Image (OG:Image)</label>
                  <input
                    type="url"
                    value={localSeo.global.ogImage}
                    onChange={(e) => setLocalSeo({
                      ...localSeo,
                      global: { ...localSeo.global, ogImage: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Robots Crawl Settings</label>
                  <select
                    value={localSeo.global.robots}
                    onChange={(e) => setLocalSeo({
                      ...localSeo,
                      global: { ...localSeo.global, robots: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  >
                    <option value="index, follow">Index, Follow (Recommended)</option>
                    <option value="noindex, nofollow">Noindex, Nofollow (Staging)</option>
                    <option value="index, nofollow">Index, Nofollow</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* PAGE-SPECIFIC SEO */}
          {activeTab === 'pages' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#171717]">
                <h3 className="font-bold text-[#F5F2EA]">Page-Specific SEO Overrides</h3>
                {/* Page Pill selector */}
                <div className="flex items-center gap-1">
                  {['home', 'about', 'services', 'work', 'contact'].map((pId) => (
                    <button
                      key={pId}
                      onClick={() => setSelectedPageId(pId)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase cursor-pointer ${
                        selectedPageId === pId ? 'bg-[#202020] text-[#FFFFFF] font-bold border border-[#333333]' : 'text-[#888] hover:bg-[#1A1A1A]'
                      }`}
                    >
                      {pId}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#C2BCB2] font-medium mb-1">SEO Title for /{selectedPageId}</label>
                <input
                  type="text"
                  value={currentPageSeo.seoTitle}
                  onChange={(e) => {
                    const next = { ...localSeo.pages };
                    next[selectedPageId] = { ...next[selectedPageId], seoTitle: e.target.value };
                    setLocalSeo({ ...localSeo, pages: next });
                  }}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#C2BCB2] font-medium mb-1">Meta Description for /{selectedPageId}</label>
                <textarea
                  rows={3}
                  value={currentPageSeo.metaDescription}
                  onChange={(e) => {
                    const next = { ...localSeo.pages };
                    next[selectedPageId] = { ...next[selectedPageId], metaDescription: e.target.value };
                    setLocalSeo({ ...localSeo, pages: next });
                  }}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">OpenGraph Title</label>
                  <input
                    type="text"
                    value={currentPageSeo.ogTitle}
                    onChange={(e) => {
                      const next = { ...localSeo.pages };
                      next[selectedPageId] = { ...next[selectedPageId], ogTitle: e.target.value };
                      setLocalSeo({ ...localSeo, pages: next });
                    }}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Page OG Image URL</label>
                  <input
                    type="url"
                    value={currentPageSeo.ogImage}
                    onChange={(e) => {
                      const next = { ...localSeo.pages };
                      next[selectedPageId] = { ...next[selectedPageId], ogImage: e.target.value };
                      setLocalSeo({ ...localSeo, pages: next });
                    }}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-[11px] focus:border-[#444] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Live Google Search Result Card */}
          <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#F5F2EA]">Google Search Preview</span>
              </div>
              <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#242424]">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-[#202020] text-[#FFFFFF]' : 'text-[#777]'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-[#202020] text-[#FFFFFF]' : 'text-[#777]'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google Search Card Simulator */}
            <div className="p-4 rounded-xl bg-[#202124] text-left space-y-1.5 font-sans">
              <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                <div className="w-4 h-4 rounded-full bg-[#171717] border border-[#333333] flex items-center justify-center text-[#FFFFFF] text-[9px] font-bold">
                  NH
                </div>
                <div className="truncate text-[11px]">
                  <span>nayemhasan.com</span>
                  <span className="text-[#9aa0a6]"> › {activeTab === 'global' ? '' : selectedPageId}</span>
                </div>
              </div>

              <h4 className="text-[#8ab4f8] hover:underline text-sm sm:text-base font-normal cursor-pointer line-clamp-1 leading-snug">
                {activeTab === 'global' ? localSeo.global.websiteTitle : currentPageSeo.seoTitle}
              </h4>

              <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2">
                {activeTab === 'global' ? localSeo.global.metaDescription : currentPageSeo.metaDescription}
              </p>
            </div>
          </div>

          {/* Social Share Card (OpenGraph) Preview */}
          <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-[#F5F2EA] pb-2 border-b border-[#171717]">
              Social Share (OG Card) Preview
            </h4>

            <div className="rounded-xl overflow-hidden border border-[#242424] bg-[#141414]">
              <div className="h-36 bg-[#1A1A1A] relative overflow-hidden">
                <img
                  src={activeTab === 'global' ? localSeo.global.ogImage : currentPageSeo.ogImage}
                  alt="Social Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-[10px] font-mono text-[#8C857B] uppercase">nayemhasan.com</p>
                <h5 className="text-xs font-semibold text-[#F5F2EA] line-clamp-1">
                  {activeTab === 'global' ? localSeo.global.ogTitle : currentPageSeo.ogTitle}
                </h5>
                <p className="text-[11px] text-[#888] line-clamp-2">
                  {activeTab === 'global' ? localSeo.global.ogDescription : currentPageSeo.ogDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
