import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Eye, ExternalLink, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCaseStudy } from '../types';

interface FeaturedWorkProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectProject }) => {
  const { projects, categories } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const visibleProjects = projects.filter(
    (p) => p.status !== 'Archived' && (p.visible !== false || p.status === 'Live' || p.status === 'published' || !p.status)
  );

  // Compute filter options with unique, guaranteed string keys
  const filterOptions = React.useMemo(() => {
    const defaultOptions = [
      { id: 'all', label: 'All Projects' }
    ];

    if (!categories || categories.length === 0) {
      return [
        { id: 'all', label: 'All Projects' },
        { id: 'restaurant', label: 'Restaurants' },
        { id: 'automotive', label: 'Automotive' },
        { id: 'cafe', label: 'Cafés' },
        { id: 'local-business', label: 'Local Business' }
      ];
    }

    const dynamicOptions = categories
      .filter((c) => {
        if (!c) return false;
        const cNameLower = (c.name || '').toLowerCase();
        return c.id !== 'all' && cNameLower !== 'all work' && cNameLower !== 'all projects';
      })
      .map((c) => ({
        id: (c.id || c.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: c.name || c.id
      }));

    const seen = new Set<string>();
    return [...defaultOptions, ...dynamicOptions].filter((item) => {
      if (!item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [categories]);

  const filteredProjects = visibleProjects.filter((proj) => {
    if (activeFilter === 'all') return true;
    const catObj = categories?.find(
      (c) => (c?.id || c?.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeFilter
    );
    const filterKeyword = ((catObj?.name || activeFilter) || '').toLowerCase();
    const projCategory = (proj?.category || '').toLowerCase();
    const projIndustry = (proj?.industry || '').toLowerCase();

    return projCategory.includes(filterKeyword) || projIndustry.includes(filterKeyword);
  });

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight">
              Projects Built To Make An Impression.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((tab) => (
              <button
                key={`filter-pill-${tab.id}`}
                id={`filter-tab-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#E5C45A] text-[#080808] shadow-[0_0_15px_rgba(229,196,90,0.3)]'
                    : 'bg-[#111111] text-[#A6A19A] border border-[#222222] hover:border-[#C9A227]/40 hover:text-[#F5F2EA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, pIdx) => {
            const projectKey = project.id || `project-idx-${pIdx}`;
            return (
              <div
                key={projectKey}
                id={`project-card-${project.id || pIdx}`}
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl bg-[#111111] border border-[#1e1e1e] hover:border-[#C9A227]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl cursor-pointer"
              >
                {/* Heroic Image Preview Container with Browser Frame Bar */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] flex flex-col">
                  {/* Subtle browser mockup header */}
                  <div className="bg-[#161616] px-3.5 py-2 border-b border-[#222] flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]/80" />
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]/80" />
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]/80" />
                    </div>
                    <div className="flex-1 text-center px-4">
                      <span className="text-[10px] font-mono text-[#777] bg-[#0c0c0c] px-3 py-0.5 rounded border border-[#222] inline-block max-w-[220px] truncate">
                        {project.websiteUrl ? project.websiteUrl.replace(/^https?:\/\//, '') : `${project.id}.nayem.dev`}
                      </span>
                    </div>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#888] hover:text-[#E5C45A] p-0.5 transition-colors"
                        title="Open Live Website"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="relative flex-1 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} Hero Section`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />

                    {/* Dark Gradient Overlay for optimal contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#080808]/85 backdrop-blur-md border border-[#C9A227]/30 text-[10px] font-semibold text-[#E5C45A]">
                        {project.type || 'Showcase Project'}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#080808]/85 backdrop-blur-md border border-[#333333] flex items-center justify-center text-[#F5F2EA] group-hover:border-[#C9A227] group-hover:text-[#E5C45A] transition-colors shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Category tag on image bottom */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-xs font-mono text-[#C9A227] font-semibold bg-[#080808]/90 backdrop-blur-sm px-2.5 py-1 rounded border border-[#C9A227]/20">
                        {project.category}
                      </span>
                      {project.websiteUrl && (
                        <span className="text-[10px] font-mono text-[#A6A19A] bg-[#080808]/80 backdrop-blur-sm px-2 py-0.5 rounded border border-[#333]">
                          Live Hero
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#A6A19A] tracking-wider uppercase mb-1">
                      {project.industry}
                    </div>
                    <h3 className="text-2xl font-bold text-[#F5F2EA] group-hover:text-[#E5C45A] transition-colors tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#A6A19A] text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Badges & View Project Action */}
                  <div className="pt-4 border-t border-[#1e1e1e] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={`${projectKey}-tech-${tech}-${tIdx}`}
                          className="px-2 py-0.5 rounded bg-[#17110D] border border-[#2a231c] text-[11px] text-[#A6A19A] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies?.length || 0) > 3 && (
                        <span className="px-2 py-0.5 rounded bg-[#17110D] text-[11px] text-[#6d6861] font-mono">
                          +{(project.technologies?.length || 0) - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-mono text-[#8C857B] hover:text-[#E5C45A] transition-colors"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Visit Site</span>
                        </a>
                      )}
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C45A] group-hover:translate-x-0.5 transition-transform">
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
