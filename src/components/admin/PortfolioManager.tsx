import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  Layers,
  Search,
  MoveUp,
  MoveDown,
  CheckCircle2,
  X,
  Sparkles,
  Link,
  Code2,
  Camera,
  RefreshCw,
  Globe,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCaseStudy, ProjectCategory, ProjectType, ProjectStatus } from '../../types';
import {
  getWebsiteHeroScreenshot,
  deriveProjectDetailsFromUrl,
  sanitizeWebsiteUrl
} from '../../utils/screenshot';

interface PortfolioManagerProps {
  isAddModalOpen: boolean;
  onCloseAddModal: () => void;
  onOpenAddModal: () => void;
}

export const PortfolioManager: React.FC<PortfolioManagerProps> = ({
  isAddModalOpen,
  onCloseAddModal,
  onOpenAddModal
}) => {
  const { projects, addProject, updateProject, deleteProject, reorderProjects, categories } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<ProjectCaseStudy | null>(null);

  // Form State for Add / Edit
  const [modalMode, setModalMode] = useState<'quick' | 'advanced'>('quick');
  const [quickUrl, setQuickUrl] = useState('');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('Restaurant');
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isCapturingHero, setIsCapturingHero] = useState(false);

  // Form State for Detailed / Advanced Edit
  const [formData, setFormData] = useState<Partial<ProjectCaseStudy>>({
    title: '',
    subtitle: '',
    category: 'Restaurant',
    projectType: 'Showcase',
    type: 'Concept / Showcase',
    status: 'Live',
    industry: 'Hospitality',
    summary: '',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    desktopPreviewImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    clientContext: '',
    businessProblem: '',
    designDirection: '',
    websiteUrl: '',
    previewUrl: '',
    githubUrl: '',
    projectDate: '2026',
    featured: true,
    visible: true,
    technologies: ['React', 'Tailwind CSS', 'TypeScript'],
    deliverables: ['Custom Web Architecture', 'Hero Section Design', 'Lead Capture Form'],
    keyFeatures: [
      { title: 'Hero Section Brand Showcase', description: 'Impactful above-the-fold value proposition.' }
    ],
    uxDecisions: [
      { title: 'Responsive Touch UX', reasoning: 'Optimized touch actions for smartphone and desktop visitors.' }
    ],
    resultsAndTakeaways: ['High-performance digital presence ready for prospective customers.']
  });

  const [techInput, setTechInput] = useState('');

  const triggerSaveNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 4000);
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;

    setIsQuickAdding(true);
    const cleanUrl = sanitizeWebsiteUrl(quickUrl);
    const generated = deriveProjectDetailsFromUrl(cleanUrl, quickTitle, quickCategory);
    const safeTitle = generated.title || 'website';
    const newId = safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    await addProject({
      ...generated,
      id: newId
    });

    triggerSaveNotification(`"${generated.title}" website and heroic section saved to portfolio!`);
    setQuickUrl('');
    setQuickTitle('');
    setIsQuickAdding(false);
    onCloseAddModal();
  };

  const openEditModal = (proj: ProjectCaseStudy) => {
    setEditingProject(proj);
    setFormData({ ...proj });
  };

  const handleCaptureHeroForForm = () => {
    if (!formData.websiteUrl) return;
    setIsCapturingHero(true);
    const clean = sanitizeWebsiteUrl(formData.websiteUrl);
    const heroShot = getWebsiteHeroScreenshot(clean, 'mshots');
    setFormData(prev => ({
      ...prev,
      websiteUrl: clean,
      previewUrl: prev.previewUrl || clean,
      coverImage: heroShot,
      desktopPreviewImage: heroShot,
      mobilePreviewImage: heroShot
    }));
    setTimeout(() => {
      setIsCapturingHero(false);
    }, 600);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) return;

    let finalData = { ...formData };
    if (finalData.websiteUrl) {
      finalData.websiteUrl = sanitizeWebsiteUrl(finalData.websiteUrl);
      if (!finalData.previewUrl) finalData.previewUrl = finalData.websiteUrl;
    }

    if (editingProject) {
      const updated = { ...editingProject, ...finalData } as ProjectCaseStudy;
      await updateProject(updated);
      triggerSaveNotification(`"${updated.title}" updated and saved successfully!`);
      setEditingProject(null);
    } else {
      const safeTitle = finalData.title || 'website';
      const newId = safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      const created = {
        ...finalData,
        id: newId
      } as ProjectCaseStudy;
      await addProject(created);
      triggerSaveNotification(`"${created.title}" added and saved successfully!`);
      onCloseAddModal();
    }
  };

  const handleToggleVisibility = async (project: ProjectCaseStudy, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = {
      ...project,
      visible: project.visible === false ? true : false
    };
    await updateProject(updated);
    triggerSaveNotification(`Visibility updated for "${project.title}".`);
  };

  const handleToggleFeatured = async (project: ProjectCaseStudy, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = {
      ...project,
      featured: !project.featured
    };
    await updateProject(updated);
    triggerSaveNotification(`Featured status updated for "${project.title}".`);
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    await reorderProjects(reordered.map(p => p.id));
    triggerSaveNotification('Project display order saved!');
  };

  const filteredProjects = projects.filter(p => {
    const pCategory = (p?.category || '').toLowerCase();
    const sCategory = (selectedCategory || '').toLowerCase();
    const sQuery = (searchQuery || '').toLowerCase();
    const pTitle = (p?.title || '').toLowerCase();
    const pSummary = (p?.summary || '').toLowerCase();
    const pIndustry = (p?.industry || '').toLowerCase();
    const pUrl = (p?.websiteUrl || '').toLowerCase();

    const matchesCat = selectedCategory === 'All' || pCategory.includes(sCategory);
    const matchesSearch = !sQuery || pTitle.includes(sQuery) || pSummary.includes(sQuery) || pIndustry.includes(sQuery) || pUrl.includes(sQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Save Success Banner Notification */}
      {saveSuccessMsg && (
        <div className="bg-[#121E14] border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button
            onClick={() => setSaveSuccessMsg(null)}
            className="text-emerald-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header & Category Filters */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <span>My Websites & Portfolio Manager</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#181818] text-[#F5F2EA] border border-[#2E2E2E]">
              {projects.length} Showcases
            </span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Place any website URL to automatically capture its heroic section and keep works persistently saved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search websites or URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-xs text-[#F5F2EA] focus:border-[#444] outline-none font-mono w-48 sm:w-60"
            />
          </div>

          <button
            onClick={() => {
              setModalMode('quick');
              onOpenAddModal();
            }}
            className="px-3.5 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Website</span>
          </button>
        </div>
      </div>

      {/* Instant 1-Click Heroic URL Add Bar */}
      <div className="bg-[#0F0F0F] border border-[#242424] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D1CCC4]">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="font-bold text-[#F5F2EA]">Place Website URL (Instant Hero Section Capture):</span>
          </div>
          <span className="text-[11px] font-mono text-[#888] hidden sm:inline">
            Captures live hero preview & saves directly
          </span>
        </div>

        <form onSubmit={handleQuickAdd} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A227]" />
            <input
              type="text"
              required
              placeholder="Paste website URL (e.g. apexautocare.com or https://bistrodeluxe.com)"
              value={quickUrl}
              onChange={(e) => {
                setQuickUrl(e.target.value);
                if (e.target.value.trim()) {
                  const derived = deriveProjectDetailsFromUrl(e.target.value);
                  setQuickTitle(derived.title);
                  setQuickCategory(derived.category);
                }
              }}
              className="w-full pl-9 pr-3 py-2.5 bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#C9A227] rounded-lg text-xs text-[#F5F2EA] font-mono outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isQuickAdding || !quickUrl.trim()}
            className="px-5 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#E5C45A] text-[#080808] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50 whitespace-nowrap"
          >
            <Camera className="w-4 h-4" />
            <span>{isQuickAdding ? 'Capturing & Saving...' : 'Capture Hero & Save'}</span>
          </button>
        </form>

        {/* Live Hero Screenshot Thumbnail Preview under quick bar */}
        {quickUrl.trim().length > 3 && (
          <div className="mt-3.5 pt-3 border-t border-[#1C1C1C] flex items-center gap-4 animate-in fade-in">
            <div className="relative w-24 h-16 rounded-lg bg-[#141414] overflow-hidden border border-[#333] shrink-0">
              <img
                src={deriveProjectDetailsFromUrl(quickUrl, quickTitle, quickCategory).coverImage}
                alt="Live Hero Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-[#E5C45A] py-0.5">
                Hero Section
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#F5F2EA] truncate">
                {quickTitle || deriveProjectDetailsFromUrl(quickUrl).title}
              </div>
              <div className="text-[11px] font-mono text-[#8C857B] truncate mt-0.5">
                {sanitizeWebsiteUrl(quickUrl)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
        {['All', 'Restaurant', 'Café', 'Automotive', 'Local Business', 'E-commerce'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1C1C1C] text-[#FFFFFF] border border-[#333333] font-semibold'
                : 'bg-[#111111] text-[#8C857B] hover:text-[#FFF] border border-[#222]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project, index) => {
          const isVisible = project.visible !== false;
          const isFeatured = !!project.featured;

          return (
            <div
              key={project.id}
              className={`bg-[#0C0C0C] border rounded-xl overflow-hidden transition-all group flex flex-col justify-between ${
                isVisible
                  ? 'border-[#1C1C1C] hover:border-[#2E2E2E]'
                  : 'border-[#1A1A1A] opacity-60'
              }`}
            >
              <div>
                {/* Heroic Thumbnail Header with Badges */}
                <div className="relative h-48 overflow-hidden bg-[#141414]">
                  <img
                    src={project.coverImage || (project.websiteUrl ? getWebsiteHeroScreenshot(project.websiteUrl) : '')}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/80 backdrop-blur-md text-[#F5F2EA] border border-[#333333]">
                      {project.projectType || project.type}
                    </span>

                    <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#333]">
                      <button
                        onClick={(e) => handleToggleFeatured(project, e)}
                        title="Toggle Featured"
                        className={`p-1 text-xs cursor-pointer ${isFeatured ? 'text-[#FFFFFF]' : 'text-[#666]'}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-[#FFFFFF]' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => handleToggleVisibility(project, e)}
                        title="Toggle Visibility"
                        className={`p-1 text-xs cursor-pointer ${isVisible ? 'text-emerald-400' : 'text-[#666]'}`}
                      >
                        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Status & Hero Label */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#111]/90 backdrop-blur-sm text-[#F5F2EA] border border-[#333]">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span>{project.status || 'Live'}</span>
                    </span>

                    {project.websiteUrl && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 backdrop-blur-sm text-[#C9A227] border border-[#C9A227]/30">
                        <Globe className="w-2.5 h-2.5" />
                        <span>Hero Section</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8C857B]">{project.category}</span>
                    <span className="text-[10px] font-mono text-[#666]">{project.projectDate || '2026'}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F5F2EA] group-hover:text-[#FFFFFF] transition-colors">
                    {project.title}
                  </h3>

                  {project.websiteUrl && (
                    <div className="text-[11px] font-mono text-[#C9A227] truncate flex items-center gap-1">
                      <Link className="w-3 h-3 shrink-0" />
                      <span className="truncate">{project.websiteUrl}</span>
                    </div>
                  )}

                  <p className="text-xs text-[#888] line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(project.technologies || []).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#171717] text-[10px] font-mono text-[#A6A19A]">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies || []).length > 3 && (
                      <span className="text-[10px] font-mono text-[#666] self-center">
                        +{(project.technologies || []).length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-[#080808] border-t border-[#171717] flex items-center justify-between text-xs">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveOrder(index, 'up')}
                    disabled={index === 0}
                    title="Move Up"
                    className="p-1 rounded bg-[#141414] hover:bg-[#1E1E1E] text-[#888] disabled:opacity-30 cursor-pointer"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveOrder(index, 'down')}
                    disabled={index === projects.length - 1}
                    title="Move Down"
                    className="p-1 rounded bg-[#141414] hover:bg-[#1E1E1E] text-[#888] disabled:opacity-30 cursor-pointer"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] text-[#D1CCC4] hover:text-[#FFF] transition-colors"
                      title="Visit Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#A6A19A]" />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(project)}
                    className="px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#D1CCC4] hover:text-[#F5F2EA] flex items-center gap-1 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-[#A6A19A]" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-[#241111] hover:bg-[#381616] text-red-400 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Project Modal */}
      {(isAddModalOpen || editingProject) && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D0D0D] border border-[#242424] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#1C1C1C] flex items-center justify-between sticky top-0 bg-[#0D0D0D] z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#161616] border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EA]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F2EA]">
                    {editingProject ? `Edit Website: ${editingProject.title}` : 'Add Website to Portfolio'}
                  </h3>
                  <p className="text-[11px] font-mono text-[#777]">
                    {editingProject ? 'Modify URL, heroic section preview, and case study details' : 'Paste web URL to immediately capture hero section and save'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  onCloseAddModal();
                }}
                className="p-1.5 rounded-lg text-[#888] hover:text-[#FFF] hover:bg-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher for New Projects */}
            {!editingProject && (
              <div className="flex border-b border-[#1C1C1C] px-6 pt-3 bg-[#0A0A0A] gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode('quick')}
                  className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    modalMode === 'quick'
                      ? 'border-[#C9A227] text-[#E5C45A]'
                      : 'border-transparent text-[#777] hover:text-[#BBB]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Quick Add by URL (Auto-Hero Capture)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalMode('advanced')}
                  className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    modalMode === 'advanced'
                      ? 'border-[#C9A227] text-[#E5C45A]'
                      : 'border-transparent text-[#777] hover:text-[#BBB]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>📝 Custom Details & Full Case Study</span>
                </button>
              </div>
            )}

            {/* Modal Body */}
            {!editingProject && modalMode === 'quick' ? (
              /* QUICK URL MODE: Place URL & show Heroic Section */
              <form onSubmit={handleQuickAdd} className="p-6 space-y-5 text-xs">
                <div className="bg-[#121212] border border-[#222] rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C45A] font-semibold">
                    <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    <span>Instant Website Heroic Section Generator</span>
                  </div>
                  <p className="text-[#999] leading-relaxed">
                    Paste the website URL below. The showcase will automatically grab and display the heroic section screenshot, derive the business title, and save it directly.
                  </p>
                </div>

                <div>
                  <label className="block text-[#F5F2EA] font-semibold mb-1.5">
                    Website URL * <span className="text-[#888] font-normal">(e.g. your client's live website or past work)</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A227]" />
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder="https://apexautocare.com or bistrodeluxe.com"
                      value={quickUrl}
                      onChange={(e) => {
                        setQuickUrl(e.target.value);
                        if (e.target.value.trim()) {
                          const derived = deriveProjectDetailsFromUrl(e.target.value, quickTitle, quickCategory);
                          setQuickTitle(derived.title);
                          setQuickCategory(derived.category);
                        }
                      }}
                      className="w-full pl-9 pr-3 py-3 bg-[#141414] border-2 border-[#2C2C2C] focus:border-[#C9A227] rounded-xl text-sm text-[#F5F2EA] font-mono outline-none shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[#AAA] mb-1 font-mono text-[11px]">
                      Project Title (Auto-detected from URL)
                    </label>
                    <input
                      type="text"
                      placeholder="Auto-detected from URL"
                      value={quickTitle}
                      onChange={(e) => setQuickTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#AAA] mb-1 font-mono text-[11px]">
                      Category Niche
                    </label>
                    <select
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Café">Café</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Car Detailing">Car Detailing</option>
                      <option value="Mechanic">Mechanic</option>
                      <option value="Local Business">Local Business</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Live Hero Section Preview Card */}
                {quickUrl.trim() && (
                  <div className="bg-[#080808] border border-[#2E2E2E] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#E5C45A] uppercase tracking-wider flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Hero Section Preview</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Ready to Save</span>
                      </span>
                    </div>

                    <div className="relative rounded-lg overflow-hidden border border-[#333] aspect-[16/9] bg-[#111]">
                      <img
                        src={deriveProjectDetailsFromUrl(quickUrl, quickTitle, quickCategory).coverImage}
                        alt="Hero Section"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[#E5C45A] border border-[#C9A227]/30">
                        {quickCategory}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#888]">
                      <span>URL: {sanitizeWebsiteUrl(quickUrl)}</span>
                      <span>Title: {quickTitle || deriveProjectDetailsFromUrl(quickUrl).title}</span>
                    </div>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1C1C1C]">
                  <button
                    type="button"
                    onClick={() => setModalMode('advanced')}
                    className="text-xs text-[#888] hover:text-[#E5C45A] font-mono underline cursor-pointer"
                  >
                    Switch to detailed writeup fields →
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        onCloseAddModal();
                      }}
                      className="px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] text-[#888] hover:text-[#FFF] font-mono cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isQuickAdding || !quickUrl.trim()}
                      className="px-6 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#E5C45A] text-[#080808] font-bold tracking-wide cursor-pointer shadow-md disabled:opacity-40 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isQuickAdding ? 'Capturing & Saving...' : 'Save Website to Portfolio'}</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* DETAILED / ADVANCED MODE FORM */
              <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
                {/* Website URL and Hero Section Capture Toolbar */}
                <div className="bg-[#121212] border border-[#262626] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[#F5F2EA] font-semibold flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#C9A227]" />
                      <span>Website Live URL</span>
                    </label>
                    {formData.websiteUrl && (
                      <button
                        type="button"
                        onClick={handleCaptureHeroForForm}
                        disabled={isCapturingHero}
                        className="px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#282828] border border-[#333] text-[#E5C45A] text-[11px] font-mono flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 ${isCapturingHero ? 'animate-spin' : ''}`} />
                        <span>{isCapturingHero ? 'Capturing...' : 'Capture Hero Section from URL'}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://client-site.com"
                      value={formData.websiteUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({
                          ...formData,
                          websiteUrl: val,
                          previewUrl: formData.previewUrl || val
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#C9A227] rounded-lg text-[#F5F2EA] font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleCaptureHeroForForm}
                      className="px-3 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2C2C2C] text-[#E5C45A] font-semibold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Capture Hero</span>
                    </button>
                  </div>

                  {formData.websiteUrl && formData.coverImage && (
                    <div className="flex items-center gap-3 pt-2 border-t border-[#1E1E1E]">
                      <div className="w-20 h-12 rounded bg-[#0A0A0A] overflow-hidden border border-[#333] shrink-0">
                        <img
                          src={formData.coverImage}
                          alt="Hero Preview"
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                      <div className="text-[11px] font-mono text-[#8C857B] leading-tight">
                        <span className="text-[#E5C45A] font-semibold">Hero Section Screenshot active</span>
                        <div className="text-[#666] truncate max-w-sm mt-0.5">{formData.coverImage}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Website / Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Luxury Dine"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g., Fine Dining & Culinary Experience Platform"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Industry Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Café">Café</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Car Detailing">Car Detailing</option>
                      <option value="Mechanic">Mechanic</option>
                      <option value="Local Business">Local Business</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Project Type</label>
                    <select
                      value={formData.projectType || 'Showcase'}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    >
                      <option value="Client Project">Client Project</option>
                      <option value="Showcase">Showcase</option>
                      <option value="Concept">Concept</option>
                      <option value="Personal Project">Personal Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Status</label>
                    <select
                      value={formData.status || 'Live'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                    >
                      <option value="Live">Live</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Short Description / Summary *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Key value proposition and solution for this business niche..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
                  />
                </div>

                {/* Additional URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Interactive Demo URL</label>
                    <input
                      type="text"
                      placeholder="https://demo.nayemhasan.com"
                      value={formData.previewUrl || ''}
                      onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">GitHub / Code Repository URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/nayemhasan/repo"
                      value={formData.githubUrl || ''}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                    />
                  </div>
                </div>

                {/* Cover & Hero Image URL */}
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">
                    Hero Section Image / Screenshot URL
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      coverImage: e.target.value,
                      desktopPreviewImage: e.target.value,
                      mobilePreviewImage: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
                  />
                </div>

                {/* Case Study Deep Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Business Problem / Client Challenge</label>
                    <textarea
                      rows={3}
                      placeholder="What specific bottleneck or conversion issue was the client facing?"
                      value={formData.businessProblem || ''}
                      onChange={(e) => setFormData({ ...formData, businessProblem: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C2BCB2] font-medium mb-1">Design & Strategy Direction</label>
                    <textarea
                      rows={3}
                      placeholder="Visual aesthetic, typographic choices, and UX hierarchy implemented..."
                      value={formData.designDirection || ''}
                      onChange={(e) => setFormData({ ...formData, designDirection: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-[#C2BCB2] font-medium mb-1">Technologies & Frameworks</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(formData.technologies || []).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#1C1C1C] text-[#FFFFFF] font-mono flex items-center gap-1 text-[11px]">
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            technologies: (formData.technologies || []).filter((_, i) => i !== idx)
                          })}
                          className="text-[#888] hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add technology (e.g., React, Tailwind, Schema.org)..."
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (techInput.trim()) {
                            setFormData({
                              ...formData,
                              technologies: [...(formData.technologies || []), techInput.trim()]
                            });
                            setTechInput('');
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (techInput.trim()) {
                          setFormData({
                            ...formData,
                            technologies: [...(formData.technologies || []), techInput.trim()]
                          });
                          setTechInput('');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] text-[#D1CCC4] text-xs font-mono"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2 border-t border-[#1C1C1C]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured !== false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded bg-[#1A1A1A] border-[#333] text-emerald-500 focus:ring-0"
                    />
                    <span className="text-[#D1CCC4]">Mark as Featured Project</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.visible !== false}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="rounded bg-[#1A1A1A] border-[#333] text-emerald-500 focus:ring-0"
                    />
                    <span className="text-[#D1CCC4]">Show on Public Portfolio</span>
                  </label>
                </div>

                {/* Modal Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1C1C]">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      onCloseAddModal();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] text-[#888] hover:text-[#FFF] font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-[#C9A227] hover:bg-[#E5C45A] text-[#080808] font-bold tracking-wide cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingProject ? 'Save Changes' : 'Save Project to Portfolio'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
