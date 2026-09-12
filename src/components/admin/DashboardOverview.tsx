import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Edit3,
  Search,
  PlusCircle,
  Eye,
  Info,
  Layers,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminTab } from './AdminSidebar';

interface DashboardOverviewProps {
  onSelectTab: (tab: AdminTab) => void;
  onOpenAddProjectModal: () => void;
  onOpenPublicSite: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onSelectTab,
  onOpenAddProjectModal,
  onOpenPublicSite
}) => {
  const { analytics, projects, categories, auditReport, runWebsiteAudit } = usePortfolio();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('7d');

  // Timeframe chart data
  const chartData = analytics?.timeframeData[timeframe] || [
    { date: 'Mon', visitors: 280, pageViews: 620 },
    { date: 'Tue', visitors: 340, pageViews: 790 },
    { date: 'Wed', visitors: 410, pageViews: 920 },
    { date: 'Thu', visitors: 390, pageViews: 850 },
    { date: 'Fri', visitors: 460, pageViews: 1040 },
    { date: 'Sat', visitors: 310, pageViews: 680 },
    { date: 'Sun', visitors: 291, pageViews: 630 }
  ];

  const trafficData = analytics?.trafficSources || [
    { name: 'Google Search', value: 48, color: '#C9A227' },
    { name: 'Direct Traffic', value: 24, color: '#E5C45A' },
    { name: 'Social Media', value: 18, color: '#8A7228' },
    { name: 'Referral Sites', value: 10, color: '#55471A' }
  ];

  const popularPages = analytics?.popularPages || [
    { rank: 1, path: '/', name: 'Home / Hero', views: 3120, bounceRate: '34%' },
    { rank: 2, path: '/#work', name: 'Work / Featured Projects', views: 2450, bounceRate: '28%' },
    { rank: 3, path: '/#services', name: 'Services & Deliverables', views: 1890, bounceRate: '31%' },
    { rank: 4, path: '/#about', name: 'About Nayem Hasan', views: 1420, bounceRate: '42%' },
    { rank: 5, path: '/#contact', name: 'Direct Connect & Consultation', views: 980, bounceRate: '19%' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Demo Notice Banner */}
      {analytics?.isDemo && (
        <div className="p-3.5 rounded-xl bg-[#0F0F0F] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#D1CCC4]">
            <Info className="w-4 h-4 shrink-0 text-[#A6A19A]" />
            <span>
              <strong>Analytics Demo State:</strong> Showing simulated visitor patterns. Connect Google Analytics 4 or Plausible in Settings for live telemetry.
            </span>
          </div>
          <button
            onClick={() => onSelectTab('settings')}
            className="px-3 py-1 rounded bg-[#181818] hover:bg-[#222222] border border-[#333333] text-[#F5F2EA] font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer self-start sm:self-auto"
          >
            Configure Analytics →
          </button>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Visitors */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] hover:border-[#2C2C2C] rounded-xl p-5 relative overflow-hidden transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider">Website Visitors</span>
            <div className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#D1CCC4]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#F5F2EA]">
              {analytics?.websiteVisitors.toLocaleString() || '2,481'}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-mono text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+{analytics?.visitorsChangePct || 14.2}%</span>
            </span>
          </div>
          <p className="text-[11px] text-[#666] mt-1 font-mono">vs previous 30 days</p>
        </div>

        {/* Card 2: Projects */}
        <div
          onClick={() => onSelectTab('portfolio')}
          className="bg-[#0C0C0C] border border-[#1C1C1C] hover:border-[#333333] rounded-xl p-5 relative overflow-hidden transition-all shadow-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider">Showcased Projects</span>
            <div className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#D1CCC4] group-hover:text-[#FFFFFF] transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#F5F2EA]">
              {projects.length}
            </span>
            <span className="text-xs text-[#888] font-mono">Active Showcases</span>
          </div>
          <p className="text-[11px] text-[#A6A19A] mt-1 font-mono flex items-center gap-1 group-hover:underline">
            <span>Manage Websites</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Card 3: Categories */}
        <div
          onClick={() => onSelectTab('categories')}
          className="bg-[#0C0C0C] border border-[#1C1C1C] hover:border-[#333333] rounded-xl p-5 relative overflow-hidden transition-all shadow-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider">Industries & Categories</span>
            <div className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#D1CCC4] group-hover:text-[#FFFFFF] transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#F5F2EA]">
              {categories.length}
            </span>
            <span className="text-xs text-[#888] font-mono">Taxonomies</span>
          </div>
          <p className="text-[11px] text-[#A6A19A] mt-1 font-mono flex items-center gap-1 group-hover:underline">
            <span>Manage Categories</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Card 4: Performance */}
        <div
          onClick={() => onSelectTab('optimization')}
          className="bg-[#0C0C0C] border border-[#1C1C1C] hover:border-emerald-500/40 rounded-xl p-5 relative overflow-hidden transition-all shadow-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider">Website Performance</span>
            <div className="p-2 rounded-lg bg-[#0F1B12] border border-emerald-900/40 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-emerald-400">
              {auditReport?.overallScore || 94}
            </span>
            <span className="text-xs text-[#888] font-mono">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono flex items-center gap-1 group-hover:underline">
            <span>Optimization Audit Center</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Quick Action Bar Shortcuts */}
      <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-4">
        <div className="text-xs font-mono text-[#8C857B] uppercase tracking-wider mb-3 px-1">
          Quick Operations
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => onSelectTab('homepage')}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-[#383838] text-left transition-all group cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#A6A19A] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">Edit Homepage</div>
            <div className="text-[10px] text-[#666] font-mono">Live visual editor</div>
          </button>

          <button
            onClick={onOpenAddProjectModal}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-[#383838] text-left transition-all group cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#A6A19A] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">Add Website</div>
            <div className="text-[10px] text-[#666] font-mono">New showcase</div>
          </button>

          <button
            onClick={() => {
              onSelectTab('optimization');
              runWebsiteAudit();
            }}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
          >
            <Zap className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">Run Audit</div>
            <div className="text-[10px] text-[#666] font-mono">Speed & SEO test</div>
          </button>

          <button
            onClick={() => onSelectTab('seo')}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-blue-500/40 text-left transition-all group cursor-pointer"
          >
            <Search className="w-4 h-4 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">SEO Center</div>
            <div className="text-[10px] text-[#666] font-mono">Meta tags & preview</div>
          </button>

          <button
            onClick={() => onSelectTab('categories')}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-[#383838] text-left transition-all group cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#A6A19A] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">Categories</div>
            <div className="text-[10px] text-[#666] font-mono">{categories.length} taxonomies</div>
          </button>

          <button
            onClick={onOpenPublicSite}
            className="p-3 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-[#383838] text-left transition-all group cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#A6A19A] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-[#F5F2EA]">Preview Site</div>
            <div className="text-[10px] text-[#666] font-mono">Open live view</div>
          </button>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitors & Pageviews Line/Area Chart */}
        <div className="lg:col-span-2 bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]">
            <div>
              <h2 className="text-sm font-semibold text-[#F5F2EA]">Visitors & Traffic Trends</h2>
              <p className="text-xs text-[#736E66]">Unique visitors and total page interactions</p>
            </div>

            {/* Timeframe Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#141414] border border-[#222] rounded-lg">
              {(['7d', '30d', '90d', '1y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    timeframe === t
                      ? 'bg-[#1E1E1E] text-[#FFFFFF] border border-[#333333] font-semibold'
                      : 'text-[#888] hover:text-[#D1CCC4]'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-72 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A227" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#C9A227" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pageviewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5C45A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#E5C45A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderColor: '#2A2A2A',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F5F2EA',
                    fontFamily: 'monospace'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke="#8A7228"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#pageviewGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Visitors"
                  stroke="#E5C45A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#visitorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Donut Chart */}
        <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#F5F2EA]">Traffic Channels</h2>
            <p className="text-xs text-[#736E66]">Acquisition channels breakdown</p>
          </div>

          <div className="h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderColor: '#2A2A2A',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F5F2EA'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-[#171717] pt-3 text-xs">
            {trafficData.map((src) => (
              <div key={src.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }}></span>
                  <span className="text-[#C2BCB2]">{src.name}</span>
                </div>
                <span className="font-mono text-[#F5F2EA] font-semibold">{src.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Breakdown & Popular Pages Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#F5F2EA]">Device Breakdown</h2>
          <p className="text-xs text-[#736E66] mb-5">Visitor platforms & form factors</p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 text-[#D1CCC4]">
                  <Monitor className="w-4 h-4 text-[#E5C45A]" />
                  <span>Desktop Computers</span>
                </div>
                <span className="font-mono font-semibold text-[#F5F2EA]">58% (1,438)</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className="h-full bg-[#E5C45A] rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 text-[#D1CCC4]">
                  <Smartphone className="w-4 h-4 text-[#C9A227]" />
                  <span>Mobile Phones</span>
                </div>
                <span className="font-mono font-semibold text-[#F5F2EA]">36% (893)</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '36%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 text-[#D1CCC4]">
                  <Tablet className="w-4 h-4 text-[#7A6218]" />
                  <span>Tablets & iPads</span>
                </div>
                <span className="font-mono font-semibold text-[#F5F2EA]">6% (150)</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className="h-full bg-[#7A6218] rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-[#141414] border border-[#222] text-[11px] text-[#888]">
            💡 <strong>Mobile-First Priority:</strong> 36% of prospective restaurant and auto shop clients visit from mobile devices.
          </div>
        </div>

        {/* Popular Pages Ranked Table */}
        <div className="lg:col-span-2 bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#F5F2EA]">Popular Pages & Sections</h2>
              <p className="text-xs text-[#736E66]">Most engaged areas on the portfolio</p>
            </div>
            <span className="text-[11px] font-mono text-[#666]">Ranked by views</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1A1A1A] text-[#7A746B] font-mono">
                  <th className="pb-2.5 font-normal">#</th>
                  <th className="pb-2.5 font-normal">Page / Section</th>
                  <th className="pb-2.5 font-normal text-right">Views</th>
                  <th className="pb-2.5 font-normal text-right">Bounce Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#141414]">
                {popularPages.map((page) => (
                  <tr key={page.rank} className="hover:bg-[#121212] transition-colors">
                    <td className="py-2.5 font-mono text-[#E5C45A] font-semibold">{page.rank}</td>
                    <td className="py-2.5">
                      <div className="font-medium text-[#F5F2EA]">{page.name}</div>
                      <div className="text-[10px] font-mono text-[#666]">{page.path}</div>
                    </td>
                    <td className="py-2.5 text-right font-mono text-[#D1CCC4]">{page.views.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-mono text-[#8C857B]">{page.bounceRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
