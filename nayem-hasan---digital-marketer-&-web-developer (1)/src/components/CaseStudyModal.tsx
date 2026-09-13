import React, { useState } from 'react';
import { X, ExternalLink, Smartphone, Monitor, CheckCircle, Lightbulb, Compass, ArrowRight, Layers, Globe } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onContactClick }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  const displayUrl = project.websiteUrl || project.previewUrl || `https://${project.id}.showcase.nayem.dev`;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-5xl bg-[#111111] border border-[#C9A227]/30 rounded-2xl shadow-2xl overflow-hidden text-[#F5F2EA] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#0c0c0c]/95 backdrop-blur-md px-6 py-4 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#17110D] border border-[#C9A227]/40 text-[#E5C45A] text-xs font-semibold uppercase tracking-wider">
              {project.type}
            </span>
            <span className="text-xs text-[#A6A19A] hidden sm:inline font-mono">
              {project.category}
            </span>
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#181818] border border-[#333] text-[#E5C45A] text-xs font-mono hover:bg-[#222] transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>Visit Live Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#C9A227] hover:text-[#080808] text-[#A6A19A] transition-colors focus:outline-none cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-12">
          {/* Hero Heading Area */}
          <div>
            <div className="text-xs font-bold text-[#C9A227] tracking-widest uppercase mb-2">
              {project.industry}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight mb-3">
              {project.title}
            </h2>
            <p className="text-lg sm:text-xl text-[#c7c2ba] leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Device Mockup Preview Switcher */}
          <div className="rounded-xl bg-[#080808] border border-[#222222] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A6A19A]">
                  Heroic Section Showcase
                </span>
                {project.websiteUrl && (
                  <span className="text-[10px] font-mono text-[#E5C45A] bg-[#17110D] px-2 py-0.5 rounded border border-[#C9A227]/30">
                    Live Web Preview
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-[#17110D] p-1 rounded-lg border border-[#C9A227]/20">
                <button
                  id="viewmode-desktop"
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                    viewMode === 'desktop'
                      ? 'bg-[#C9A227] text-[#080808] font-bold'
                      : 'text-[#A6A19A] hover:text-[#F5F2EA]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop View</span>
                </button>
                <button
                  id="viewmode-mobile"
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                    viewMode === 'mobile'
                      ? 'bg-[#C9A227] text-[#080808] font-bold'
                      : 'text-[#A6A19A] hover:text-[#F5F2EA]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>

            {/* Display Viewport */}
            <div className="relative rounded-lg overflow-hidden bg-[#111111] border border-[#222222] flex items-center justify-center p-4 min-h-[340px] sm:min-h-[440px]">
              {viewMode === 'desktop' ? (
                <div className="w-full rounded-md overflow-hidden shadow-2xl border border-[#333333]">
                  {/* Browser Bar */}
                  <div className="bg-[#1a1a1a] px-3 py-2 border-b border-[#2a2a2a] flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[11px] font-mono text-[#A6A19A] bg-[#111111] px-4 py-0.5 rounded border border-[#222222] inline-block max-w-sm truncate">
                        {displayUrl}
                      </span>
                    </div>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A6A19A] hover:text-[#E5C45A] p-1"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <img
                    src={project.desktopPreviewImage || project.coverImage}
                    alt={`${project.title} Desktop View`}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80';
                    }}
                  />
                </div>
              ) : (
                <div className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2a2a2a] bg-[#000000]">
                  {/* Phone Notch / Header */}
                  <div className="bg-[#111111] py-1.5 px-4 flex justify-between items-center text-[10px] text-[#777777] font-mono">
                    <span>9:41</span>
                    <div className="w-12 h-2.5 bg-[#222222] rounded-full"></div>
                    <span>5G 100%</span>
                  </div>
                  <img
                    src={project.mobilePreviewImage || project.coverImage}
                    alt={`${project.title} Mobile View`}
                    referrerPolicy="no-referrer"
                    className="w-full h-96 object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Overview Grid: Context, Problem, Design Direction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#141414] border border-[#222222]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#E5C45A] mb-2 uppercase tracking-wide">
                  <Compass className="w-4 h-4 text-[#C9A227]" />
                  <span>The Business Context</span>
                </div>
                <p className="text-sm text-[#c4bfb7] leading-relaxed">
                  {project.clientContext || 'High-impact conversion architecture and tailored brand positioning tailored to local clientele.'}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#141414] border border-[#222222]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#E5C45A] mb-2 uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4 text-[#C9A227]" />
                  <span>Core Problem To Solve</span>
                </div>
                <p className="text-sm text-[#c4bfb7] leading-relaxed">
                  {project.businessProblem || 'Modernizing web visibility, establishing strong above-the-fold engagement, and accelerating inbound booking requests.'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#141414] border border-[#222222]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#E5C45A] mb-2 uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-[#C9A227]" />
                  <span>Design & UX Direction</span>
                </div>
                <p className="text-sm text-[#c4bfb7] leading-relaxed">
                  {project.designDirection || 'Sleek, high-contrast dark aesthetic paired with gold accents, prominent CTA touchpoints, and mobile-optimized flow.'}
                </p>
              </div>

              {/* Technologies Applied */}
              <div className="p-5 rounded-xl bg-[#141414] border border-[#222222]">
                <div className="text-sm font-bold text-[#E5C45A] mb-3 uppercase tracking-wide">
                  Tech Stack & Standards
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || ['React', 'TypeScript', 'Tailwind CSS']).map((tech, idx) => (
                    <span
                      key={`${project.id}-modal-tech-${tech}-${idx}`}
                      className="px-2.5 py-1 rounded bg-[#080808] border border-[#C9A227]/25 text-[#E5C45A] text-xs font-medium font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Breakdown */}
          <div>
            <h3 className="text-xl font-bold text-[#F5F2EA] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]"></span>
              <span>Key Features & Conversion Architecture</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.keyFeatures || []).map((feat, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e]">
                  <div className="text-sm font-bold text-[#F5F2EA] mb-1">
                    {feat.title}
                  </div>
                  <p className="text-xs text-[#A6A19A] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* UX Decisions */}
          <div>
            <h3 className="text-xl font-bold text-[#F5F2EA] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]"></span>
              <span>Strategic UX Decisions</span>
            </h3>
            <div className="space-y-3">
              {(project.uxDecisions || []).map((ux, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-[#F5F2EA]">{ux.title}</div>
                    <div className="text-xs text-[#A6A19A] mt-0.5">{ux.reasoning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Key Learnings */}
          <div className="p-6 rounded-xl bg-[#17110D] border border-[#C9A227]/30">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2">
              Showcase Concept Takeaways
            </div>
            <div className="space-y-2">
              {(project.resultsAndTakeaways || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-[#F5F2EA]">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action CTA in Modal */}
          <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#8c8780] block">
                Interested in a custom build for your business like {project.title}?
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-md bg-[#181818] border border-[#333] text-[#E5C45A] text-xs font-semibold hover:bg-[#222] transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Live Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-md bg-[#1a1a1a] text-[#c4bfb7] text-xs font-semibold hover:bg-[#222222] transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="px-6 py-2.5 rounded-md bg-[#C9A227] text-[#080808] text-xs font-bold hover:bg-[#E5C45A] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(201,162,39,0.3)]"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
