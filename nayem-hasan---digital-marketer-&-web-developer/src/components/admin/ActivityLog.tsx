import React, { useState } from 'react';
import {
  History,
  Clock,
  Shield,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ActivityLog: React.FC = () => {
  const { activityLogs } = usePortfolio();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'homepage', 'project', 'seo', 'optimization', 'settings', 'auth', 'media'];

  const filteredLogs = activityLogs.filter(
    log => filterCategory === 'All' || (log?.category || '').toLowerCase() === (filterCategory || '').toLowerCase()
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <History className="w-5 h-5 text-[#F5F2EA]" />
            <span>System Audit & Activity Timeline</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#1C1C1C] text-[#D1CCC4] border border-[#2E2E2E]">
              {activityLogs.length} Events Logged
            </span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Immutable tracking of all content changes, audits, security logins, and project updates
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                filterCategory === cat
                  ? 'bg-[#202020] text-[#FFFFFF] border border-[#333333] font-semibold'
                  : 'text-[#888] hover:text-[#FFF] hover:bg-[#141414]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1A1A1A]">
          {filteredLogs.map((log) => (
            <div key={log.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#555555] border-2 border-[#0C0C0C] ring-2 ring-[#333333] group-hover:scale-125 transition-transform" />

              <div className="p-4 rounded-xl bg-[#121212] border border-[#1F1F1F] group-hover:border-[#2C2C2C] transition-all space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F5F2EA]">{log.action}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-[#181818] text-[#D1CCC4] border border-[#2E2E2E]">
                      {log.category}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#666] flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-[#8C857B] leading-relaxed">
                  {log.details}
                </p>

                <div className="text-[10px] font-mono text-[#555] pt-1">
                  Initiated by: {log.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
