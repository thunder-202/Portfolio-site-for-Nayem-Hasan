import React, { useState } from 'react';
import {
  Save,
  Send,
  RotateCcw,
  Eye,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Check,
  AlertCircle,
  Code2,
  Layout,
  TrendingUp,
  Briefcase,
  Monitor,
  Smartphone
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceItem, ProcessStep, SkillCategory, IndustryItem } from '../../types';

export const HomepageEditor: React.FC = () => {
  const {
    draftContent,
    setDraftContent,
    updateDraftField,
    isDraftModified,
    publishContent,
    resetDraft,
    projects
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'featured-projects' | 'process' | 'skills' | 'industries' | 'contact' | 'footer'>('hero');
  const [splitPreview, setSplitPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    const success = await publishContent();
    setIsPublishing(false);
    if (success) {
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }
  };

  // Service helpers
  const handleAddService = () => {
    const nextNum = String(draftContent.services.length + 1).padStart(2, '0');
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      number: nextNum,
      title: "New Custom Service",
      tagline: "High-value digital deliverable",
      description: "Detailed description of how this service helps clients grow.",
      deliverables: ["Strategy consultation", "Custom implementation", "Speed optimization"],
      icon: "Code2"
    };
    setDraftContent(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const handleRemoveService = (index: number) => {
    setDraftContent(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const nextList = [...draftContent.services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nextList.length) return;
    const temp = nextList[index];
    nextList[index] = nextList[targetIdx];
    nextList[targetIdx] = temp;
    setDraftContent(prev => ({ ...prev, services: nextList }));
  };

  // Process helpers
  const handleAddProcess = () => {
    const nextNum = String(draftContent.process.length + 1).padStart(2, '0');
    const newStep: ProcessStep = {
      id: `prc-${Date.now()}`,
      number: nextNum,
      title: "New Phase",
      tagline: "Methodical execution",
      description: "Step-by-step description of this process phase.",
      keyActions: ["Audit & Discovery", "Execution", "Verification"]
    };
    setDraftContent(prev => ({
      ...prev,
      process: [...prev.process, newStep]
    }));
  };

  const handleRemoveProcess = (index: number) => {
    setDraftContent(prev => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index)
    }));
  };

  // Featured Projects toggle
  const handleToggleFeaturedProject = (projectId: string) => {
    setDraftContent(prev => {
      const current = prev.featuredProjectIds || [];
      const updated = current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId];
      return { ...prev, featuredProjectIds: updated };
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-20 z-20 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EA]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F5F2EA]">Homepage Control System</h2>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C857B]">
              <span>Edit content without touching code</span>
              {isDraftModified && (
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                  ● Unsaved Draft Edits
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Split Preview Toggle */}
          <button
            onClick={() => setSplitPreview(!splitPreview)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              splitPreview
                ? 'bg-[#1E1E1E] text-[#FFFFFF] border border-[#3A3A3A]'
                : 'bg-[#141414] text-[#A6A19A] hover:text-[#FFF] border border-[#262626]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{splitPreview ? 'Close Split Preview' : 'Split Screen Preview'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetDraft}
            disabled={!isDraftModified}
            className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] text-[#A6A19A] hover:text-[#FFF] disabled:opacity-40 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-[#FFFFFF] border border-[#3A3A3A] hover:border-[#4A4A4A] font-semibold text-xs tracking-wide shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isPublishing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : publishSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Published Live!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#D1CCC4]" />
                <span>Publish to Live Site</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor & Split Preview Container */}
      <div className={`grid gap-6 ${splitPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Left Column: Form Controls */}
        <div className="space-y-6">
          {/* Section Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#1A1A1A] custom-scrollbar text-xs">
            {[
              { id: 'hero', label: 'Hero Section' },
              { id: 'about', label: 'About & Bio' },
              { id: 'services', label: 'Services (4)' },
              { id: 'featured-projects', label: 'Featured Projects' },
              { id: 'process', label: '4-Step Process' },
              { id: 'skills', label: 'Skills & Tech' },
              { id: 'industries', label: 'Industries' },
              { id: 'contact', label: 'Contact CTA' },
              { id: 'footer', label: 'Footer' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1C1C1C] text-[#FFFFFF] border border-[#333333] font-semibold'
                    : 'text-[#8C857B] hover:text-[#F5F2EA] hover:bg-[#121212]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section: HERO */}
          {activeTab === 'hero' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <h3 className="text-sm font-bold text-[#F5F2EA]">Hero Section Configuration</h3>
                <span className="text-[11px] font-mono text-[#A6A19A]">First Impression</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Small Top Tagline / Label</label>
                  <input
                    type="text"
                    value={draftContent.hero.smallLabel}
                    onChange={(e) => updateDraftField('hero.smallLabel', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={draftContent.hero.mainHeadline}
                    onChange={(e) => updateDraftField('hero.mainHeadline', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Sub-Headline</label>
                  <input
                    type="text"
                    value={draftContent.hero.subHeadline}
                    onChange={(e) => updateDraftField('hero.subHeadline', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Hero Bio / Value Proposition Description</label>
                  <textarea
                    rows={3}
                    value={draftContent.hero.description}
                    onChange={(e) => updateDraftField('hero.description', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={draftContent.hero.primaryCtaText}
                      onChange={(e) => updateDraftField('hero.primaryCtaText', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Secondary CTA Button Text</label>
                    <input
                      type="text"
                      value={draftContent.hero.secondaryCtaText}
                      onChange={(e) => updateDraftField('hero.secondaryCtaText', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Availability Badge Text</label>
                    <input
                      type="text"
                      value={draftContent.hero.availabilityStatus}
                      onChange={(e) => updateDraftField('hero.availabilityStatus', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Background Visual Style</label>
                    <select
                      value={draftContent.hero.backgroundVisual}
                      onChange={(e) => updateDraftField('hero.backgroundVisual', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    >
                      <option value="grid-particles">Ambient Grid & Subtle Depth</option>
                      <option value="ambient-glow">Deep Radial Glow</option>
                      <option value="minimal-dark">Pure Clean Dark Canvas</option>
                    </select>
                  </div>
                </div>

                {/* Hero Colors Configuration */}
                <div className="p-3.5 bg-[#121212] border border-[#222222] rounded-lg space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1C1C1C]">
                    <span className="font-semibold text-[#F5F2EA] text-xs">Hero Color Settings</span>
                    <span className="text-[10px] text-[#8C857B]">Custom Canvas & Golden Headline Colors</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Background Color */}
                    <div>
                      <label className="block text-[#C2BCB2] font-medium mb-1">Hero Background Color (Dark Black)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftContent.hero.heroBgColor?.startsWith('#') ? draftContent.hero.heroBgColor : '#050505'}
                          onChange={(e) => updateDraftField('hero.heroBgColor', e.target.value)}
                          className="w-8 h-8 rounded bg-[#141414] border border-[#262626] cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={draftContent.hero.heroBgColor || '#050505'}
                          onChange={(e) => updateDraftField('hero.heroBgColor', e.target.value)}
                          placeholder="#050505"
                          className="flex-1 px-2.5 py-1.5 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs focus:border-[#444] outline-none"
                        />
                      </div>
                    </div>

                    {/* Text / Golden Accent Color */}
                    <div>
                      <label className="block text-[#C2BCB2] font-medium mb-1">Hero Text & Golden Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftContent.hero.heroAccentTextColor?.startsWith('#') ? draftContent.hero.heroAccentTextColor : '#E5C45A'}
                          onChange={(e) => updateDraftField('hero.heroAccentTextColor', e.target.value)}
                          className="w-8 h-8 rounded bg-[#141414] border border-[#262626] cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={draftContent.hero.heroAccentTextColor || '#E5C45A'}
                          onChange={(e) => updateDraftField('hero.heroAccentTextColor', e.target.value)}
                          placeholder="#E5C45A"
                          className="flex-1 px-2.5 py-1.5 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs focus:border-[#444] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: ABOUT */}
          {activeTab === 'about' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <h3 className="text-sm font-bold text-[#F5F2EA]">About & Biography</h3>
                <span className="text-[11px] font-mono text-[#C9A227]">Personal Credibility</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Section Title</label>
                  <input
                    type="text"
                    value={draftContent.about.sectionTitle}
                    onChange={(e) => updateDraftField('about.sectionTitle', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#C9A227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={draftContent.about.headline}
                    onChange={(e) => updateDraftField('about.headline', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#C9A227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Detailed Bio Description</label>
                  <textarea
                    rows={4}
                    value={draftContent.about.description}
                    onChange={(e) => updateDraftField('about.description', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#C9A227] outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Signature Text</label>
                  <input
                    type="text"
                    value={draftContent.about.signatureText}
                    onChange={(e) => updateDraftField('about.signatureText', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#C9A227] outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Years Experience</label>
                    <input
                      type="text"
                      value={draftContent.about.experienceYears}
                      onChange={(e) => updateDraftField('about.experienceYears', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Projects Built</label>
                    <input
                      type="text"
                      value={draftContent.about.projectsCount}
                      onChange={(e) => updateDraftField('about.projectsCount', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Industries</label>
                    <input
                      type="text"
                      value={draftContent.about.industriesCount}
                      onChange={(e) => updateDraftField('about.industriesCount', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: SERVICES */}
          {activeTab === 'services' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA]">Services Management</h3>
                  <p className="text-xs text-[#736E66]">Add, edit, reorder or remove core service offerings</p>
                </div>
                <button
                  onClick={handleAddService}
                  className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-xs font-medium text-[#F5F2EA] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftContent.services.map((service, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[#121212] border border-[#222] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#FFFFFF] font-bold">#{service.number}</span>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const updated = [...draftContent.services];
                            updated[index].title = e.target.value;
                            setDraftContent(prev => ({ ...prev, services: updated }));
                          }}
                          className="px-2 py-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded text-xs font-semibold text-[#F5F2EA]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-[#1C1C1C] hover:bg-[#282828] text-[#888] disabled:opacity-30 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === draftContent.services.length - 1}
                          className="p-1 rounded bg-[#1C1C1C] hover:bg-[#282828] text-[#888] disabled:opacity-30 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveService(index)}
                          className="p-1 rounded bg-[#2A1212] hover:bg-[#3D1818] text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#8C857B] mb-1">Tagline</label>
                        <input
                          type="text"
                          value={service.tagline}
                          onChange={(e) => {
                            const updated = [...draftContent.services];
                            updated[index].tagline = e.target.value;
                            setDraftContent(prev => ({ ...prev, services: updated }));
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#171717] border border-[#282828] rounded text-[#D1CCC4]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8C857B] mb-1">Icon Name (Lucide)</label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => {
                            const updated = [...draftContent.services];
                            updated[index].icon = e.target.value;
                            setDraftContent(prev => ({ ...prev, services: updated }));
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#171717] border border-[#282828] rounded text-[#D1CCC4] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#8C857B] mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const updated = [...draftContent.services];
                          updated[index].description = e.target.value;
                          setDraftContent(prev => ({ ...prev, services: updated }));
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#171717] border border-[#282828] rounded text-xs text-[#D1CCC4]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: FEATURED PROJECTS */}
          {activeTab === 'featured-projects' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA]">Featured Projects Selector</h3>
                  <p className="text-xs text-[#736E66]">Toggle which showcases appear on the main landing page</p>
                </div>
              </div>

              <div className="space-y-3">
                {projects.map((project) => {
                  const isFeatured = (draftContent.featuredProjectIds || []).includes(project.id);
                  return (
                    <div
                      key={project.id}
                      onClick={() => handleToggleFeaturedProject(project.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isFeatured
                          ? 'bg-[#181818] border-[#383838] shadow-sm'
                          : 'bg-[#121212] border-[#222] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-12 h-9 object-cover rounded border border-[#222]"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#F5F2EA] flex items-center gap-2">
                            <span>{project.title}</span>
                            <span className="text-[10px] font-mono text-[#8C857B] px-1.5 py-0.2 rounded bg-[#1C1C1C]">
                              {project.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#777] line-clamp-1">{project.summary}</p>
                        </div>
                      </div>

                      <div className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                        isFeatured ? 'bg-[#FFFFFF] text-[#0A0A0A]' : 'bg-[#1C1C1C] text-[#888]'
                      }`}>
                        {isFeatured ? 'Featured On Home' : 'Hidden from Home'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: PROCESS */}
          {activeTab === 'process' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA]">4-Step Workflow Process</h3>
                  <p className="text-xs text-[#736E66]">Manage step titles, numbers, and action checklists</p>
                </div>
                <button
                  onClick={handleAddProcess}
                  className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-xs font-medium text-[#F5F2EA] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Step</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftContent.process.map((step, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[#121212] border border-[#222] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#E5C45A] font-bold">Step {step.number}</span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...draftContent.process];
                            updated[index].title = e.target.value;
                            setDraftContent(prev => ({ ...prev, process: updated }));
                          }}
                          className="px-2 py-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded text-xs font-semibold text-[#F5F2EA]"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveProcess(index)}
                        className="p-1 rounded bg-[#2A1212] hover:bg-[#3D1818] text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs space-y-2">
                      <input
                        type="text"
                        placeholder="Tagline"
                        value={step.tagline}
                        onChange={(e) => {
                          const updated = [...draftContent.process];
                          updated[index].tagline = e.target.value;
                          setDraftContent(prev => ({ ...prev, process: updated }));
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#171717] border border-[#282828] rounded text-[#D1CCC4]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...draftContent.process];
                          updated[index].description = e.target.value;
                          setDraftContent(prev => ({ ...prev, process: updated }));
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#171717] border border-[#282828] rounded text-[#D1CCC4]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: CONTACT CTA */}
          {activeTab === 'contact' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <h3 className="text-sm font-bold text-[#F5F2EA]">Contact Call to Action</h3>
                <span className="text-[11px] font-mono text-[#C9A227]">Conversion Closer</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Heading</label>
                  <input
                    type="text"
                    value={draftContent.contactCta.heading}
                    onChange={(e) => updateDraftField('contactCta.heading', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  />
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={draftContent.contactCta.description}
                    onChange={(e) => updateDraftField('contactCta.description', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Button Text</label>
                    <input
                      type="text"
                      value={draftContent.contactCta.buttonText}
                      onChange={(e) => updateDraftField('contactCta.buttonText', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Receiving Email Address</label>
                    <input
                      type="email"
                      value={draftContent.contactCta.email}
                      onChange={(e) => updateDraftField('contactCta.email', e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: FOOTER */}
          {activeTab === 'footer' && (
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
                <h3 className="text-sm font-bold text-[#F5F2EA]">Footer Configuration</h3>
                <span className="text-[11px] font-mono text-[#C9A227]">Global Footer</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={draftContent.footer.name}
                    onChange={(e) => updateDraftField('footer.name', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  />
                </div>
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Role Subtext</label>
                  <input
                    type="text"
                    value={draftContent.footer.roleDescription}
                    onChange={(e) => updateDraftField('footer.roleDescription', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                  />
                </div>
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Copyright Statement</label>
                  <input
                    type="text"
                    value={draftContent.footer.copyrightText}
                    onChange={(e) => updateDraftField('footer.copyrightText', e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Simulator Split-Screen */}
        {splitPreview && (
          <div className="bg-[#0A0A0A] border border-[#222] rounded-xl overflow-hidden flex flex-col h-[750px] sticky top-28 shadow-2xl">
            {/* Preview Viewport Header */}
            <div className="p-3 bg-[#111] border-b border-[#222] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#C9A227]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Interactive Draft Preview</span>
              </div>

              <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-lg border border-[#2A2A2A]">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                    previewDevice === 'desktop' ? 'bg-[#262626] text-[#FFFFFF] font-medium' : 'text-[#888]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                    previewDevice === 'mobile' ? 'bg-[#262626] text-[#FFFFFF] font-medium' : 'text-[#888]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Preview Frame Container */}
            <div className="flex-1 overflow-y-auto bg-[#080808] p-4 flex justify-center custom-scrollbar">
              <div
                className={`transition-all duration-300 bg-[#080808] rounded-xl border border-[#1F1F1F] p-6 text-[#F5F2EA] ${
                  previewDevice === 'mobile' ? 'w-[375px]' : 'w-full max-w-2xl'
                }`}
              >
                {/* Hero Preview Simulated */}
                <div className="space-y-4 border-b border-[#1A1A1A] pb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18120B] border border-[#C9A227]/30 text-[10px] font-mono text-[#E5C45A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5C45A]"></span>
                    <span>{draftContent.hero.availabilityStatus}</span>
                  </div>

                  <p className="text-xs font-mono tracking-widest text-[#A6A19A] uppercase">
                    {draftContent.hero.smallLabel}
                  </p>

                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F2EA] leading-snug">
                    {draftContent.hero.mainHeadline}
                  </h1>

                  <p className="text-xs text-[#A6A19A] leading-relaxed">
                    {draftContent.hero.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3.5 py-1.5 rounded-lg bg-[#C9A227] text-[#0A0A0A] font-semibold text-xs">
                      {draftContent.hero.primaryCtaText}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-[#141414] border border-[#2A2A2A] text-xs text-[#D1CCC4]">
                      {draftContent.hero.secondaryCtaText}
                    </span>
                  </div>
                </div>

                {/* Services Preview Simulated */}
                <div className="py-6 border-b border-[#1A1A1A]">
                  <h4 className="text-xs font-mono text-[#C9A227] uppercase tracking-wider mb-3">
                    Services Offering ({draftContent.services.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {draftContent.services.map((srv, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A]">
                        <div className="text-[10px] font-mono text-[#E5C45A]">#{srv.number}</div>
                        <div className="text-xs font-semibold text-[#F5F2EA]">{srv.title}</div>
                        <div className="text-[10px] text-[#777] line-clamp-2 mt-1">{srv.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Preview Simulated */}
                <div className="py-6">
                  <h4 className="text-xs font-mono text-[#C9A227] uppercase tracking-wider mb-2">
                    {draftContent.about.sectionTitle}
                  </h4>
                  <p className="text-xs font-semibold text-[#F5F2EA]">{draftContent.about.headline}</p>
                  <p className="text-xs text-[#888] mt-1">{draftContent.about.description}</p>
                  <div className="mt-3 text-[11px] font-mono text-[#C9A227]">{draftContent.about.signatureText}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
