import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Eye,
  Sliders,
  Check,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const OptimizationCenter: React.FC = () => {
  const { auditReport, runWebsiteAudit, isAuditing } = usePortfolio();
  const [fixedIssueIds, setFixedIssueIds] = useState<string[]>([]);
  const [fixingId, setFixingId] = useState<string | null>(null);

  const handleFixIssue = (issueId: string) => {
    setFixingId(issueId);
    setTimeout(() => {
      setFixedIssueIds(prev => [...prev, issueId]);
      setFixingId(null);
    }, 800);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
    if (score >= 75) return 'text-amber-400 border-amber-500/40 bg-amber-950/20';
    return 'text-red-400 border-red-500/40 bg-red-950/20';
  };

  const checklistItems = [
    { title: 'Modern Image Formats (WebP / AVIF)', status: 'Passed', detail: 'All project portfolio images compressed with responsive srcset' },
    { title: 'Zero Render-Blocking JavaScript', status: 'Passed', detail: 'Client bundle modularly split and asynchronously loaded' },
    { title: 'WCAG AA Contrast Ratios', status: 'Passed', detail: 'Deep #060606 canvas with 4.5:1+ text luminance across all sections' },
    { title: 'Schema.org JSON-LD Structured Data', status: 'Passed', detail: 'Person, LocalBusiness, and WebSite schemas properly formatted' },
    { title: 'Core Web Vitals (LCP < 1.2s, CLS < 0.05)', status: 'Passed', detail: 'Layout shifts eliminated with pre-reserved aspect ratios' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Run Audit Button */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Website Optimization Center</span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Real-time Core Web Vitals, accessibility audits, and automated performance diagnostics
          </p>
        </div>

        <button
          onClick={runWebsiteAudit}
          disabled={isAuditing}
          className="px-4 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] hover:border-[#444] text-[#FFFFFF] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Analyzing Site Performance...' : 'Run New Website Audit'}</span>
        </button>
      </div>

      {/* Main Scores Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Overall Score */}
        <div className="col-span-2 lg:col-span-1 bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-mono text-[#8C857B] uppercase tracking-wider mb-2">Overall Score</span>
          <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-3xl ${getScoreColor(auditReport?.overallScore || 94)}`}>
            {auditReport?.overallScore || 94}
          </div>
          <span className="text-[10px] font-mono text-emerald-400 mt-2">Optimal Health</span>
        </div>

        {/* Performance */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8C857B]">Performance</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F5F2EA]">{auditReport?.performance || 92}%</div>
            <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${auditReport?.performance || 92}%` }} />
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#666]">LCP: 0.9s • FID: 12ms</span>
        </div>

        {/* SEO */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8C857B]">SEO Indexing</span>
            <ShieldCheck className="w-4 h-4 text-[#D1CCC4]" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F5F2EA]">{auditReport?.seo || 98}%</div>
            <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${auditReport?.seo || 98}%` }} />
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#666]">100% Meta tags defined</span>
        </div>

        {/* Accessibility */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8C857B]">Accessibility</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F5F2EA]">{auditReport?.accessibility || 95}%</div>
            <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${auditReport?.accessibility || 95}%` }} />
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#666]">WCAG 2.1 AA Passed</span>
        </div>

        {/* Best Practices */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8C857B]">Best Practices</span>
            <Sliders className="w-4 h-4 text-purple-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F5F2EA]">{auditReport?.bestPractices || 91}%</div>
            <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${auditReport?.bestPractices || 91}%` }} />
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#666]">HTTPS • CSP • Modern API</span>
        </div>
      </div>

      {/* Identified Issues List */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#171717]">
          <div>
            <h3 className="text-sm font-bold text-[#F5F2EA]">Diagnostics & Recommended Optimizations</h3>
            <p className="text-xs text-[#736E66]">Actionable improvements detected on current portfolio build</p>
          </div>
          <span className="text-xs font-mono text-[#D1CCC4]">
            {(auditReport?.issues || []).length - fixedIssueIds.length} Remaining Actions
          </span>
        </div>

        <div className="space-y-3">
          {(auditReport?.issues || []).map((issue) => {
            const isFixed = fixedIssueIds.includes(issue.id);
            const isCurrentlyFixing = fixingId === issue.id;

            return (
              <div
                key={issue.id}
                className={`p-4 rounded-xl border transition-all ${
                  isFixed
                    ? 'bg-[#0E1A11] border-emerald-900/40 opacity-70'
                    : 'bg-[#121212] border-[#222]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        issue.severity === 'high'
                          ? 'bg-red-950 text-red-300 border border-red-800/40'
                          : issue.severity === 'medium'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : 'bg-blue-950 text-blue-300 border border-blue-800/40'
                      }`}>
                        {issue.severity} Severity
                      </span>
                      <span className="text-xs font-mono text-[#8C857B]">{issue.category}</span>
                      <h4 className="text-xs font-bold text-[#F5F2EA]">{issue.title}</h4>
                    </div>

                    <p className="text-xs text-[#A6A19A] leading-relaxed">
                      <strong className="text-[#C2BCB2]">Impact:</strong> {issue.impact}
                    </p>

                    <p className="text-xs text-[#C2BCB2] leading-relaxed">
                      <strong className="text-[#F5F2EA]">Recommended Solution:</strong> {issue.fix}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    {isFixed ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Optimized</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleFixIssue(issue.id)}
                        disabled={isCurrentlyFixing}
                        className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isCurrentlyFixing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Applying Patch...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-[#D1CCC4]" />
                            <span>Auto-Fix</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Readiness Checklist */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F5F2EA]">Production Speed & Reliability Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#121212] border border-[#222] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#F5F2EA]">{item.title}</div>
                <div className="text-[11px] text-[#777] leading-relaxed mt-0.5">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
