import React, { useState } from 'react';
import {
  Menu,
  Zap,
  PlusCircle,
  Edit3,
  Search,
  Eye,
  LogOut,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublicSite: () => void;
  onOpenAddProjectModal: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleMobileSidebar,
  onSelectTab,
  onOpenPublicSite,
  onOpenAddProjectModal
}) => {
  const { adminUser, logout, settings, runWebsiteAudit } = usePortfolio();
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isMaintenance = settings.maintenance.enabled;

  const handleQuickAction = async (action: string) => {
    setShowQuickMenu(false);
    switch (action) {
      case 'edit-homepage':
        onSelectTab('homepage');
        break;
      case 'add-website':
        onOpenAddProjectModal();
        break;
      case 'run-audit':
        onSelectTab('optimization');
        await runWebsiteAudit();
        break;
      case 'seo':
        onSelectTab('seo');
        break;
      case 'categories':
        onSelectTab('categories');
        break;
      case 'preview':
        onOpenPublicSite();
        break;
      default:
        break;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-[#121212] border border-[#222] text-[#999] hover:text-[#FFF]"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-[#F5F2EA] flex items-center gap-2">
              <span>NAYEM ADMIN</span>
              <span className="hidden sm:inline-block text-[#555] font-normal">•</span>
              <span className="hidden sm:inline-block text-xs font-normal text-[#A6A19A]">
                Portfolio Management System
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono mt-0.5">
            {/* Status indicator */}
            {isMaintenance ? (
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>● Maintenance Active</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>● Website Online</span>
              </span>
            )}
            <span className="text-[#444]">•</span>
            <span className="text-[#777] hidden md:inline">Synced with live server</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[#282828] hover:border-[#383838] text-xs font-medium text-[#F5F2EA] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A6A19A]" />
            <span className="hidden sm:inline">Quick Actions</span>
            <ChevronDown className="w-3 h-3 text-[#A6A19A]" />
          </button>

          {showQuickMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowQuickMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-[#0E0E0E] border border-[#242424] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-mono text-[#666] uppercase tracking-wider">
                  Quick Shortcuts
                </div>
                <button
                  onClick={() => handleQuickAction('edit-homepage')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#A6A19A]" />
                  <span>Edit Homepage</span>
                </button>
                <button
                  onClick={() => handleQuickAction('add-website')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#A6A19A]" />
                  <span>Add Website</span>
                </button>
                <button
                  onClick={() => handleQuickAction('run-audit')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Run Website Audit</span>
                </button>
                <button
                  onClick={() => handleQuickAction('seo')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>SEO Control Center</span>
                </button>
                <button
                  onClick={() => handleQuickAction('categories')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Category Manager</span>
                </button>
                <div className="my-1 border-t border-[#1C1C1C]" />
                <button
                  onClick={() => handleQuickAction('preview')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#F5F2EA] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Website</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* View Live Site Button */}
        <button
          onClick={onOpenPublicSite}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111] hover:bg-[#171717] border border-[#242424] text-xs font-mono text-[#D1CCC4] hover:text-[#F5F2EA] transition-all cursor-pointer"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 text-[#A6A19A]" />
        </button>

        {/* Profile Card / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-lg hover:bg-[#141414] border border-transparent hover:border-[#222] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#F5F2EA] font-bold text-xs">
              NH
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-[#F5F2EA] leading-none">
                {adminUser?.name || 'Nayem Hasan'}
              </div>
              <div className="text-[10px] font-mono text-[#7A746B] mt-0.5 leading-none">
                {adminUser?.role || 'Super Admin'}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-[#666] hidden md:block" />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-[#0E0E0E] border border-[#242424] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-2 border-b border-[#1A1A1A] mb-1">
                  <p className="text-xs font-semibold text-[#F5F2EA]">{adminUser?.name || 'Nayem Hasan'}</p>
                  <p className="text-[11px] font-mono text-[#777] truncate">{adminUser?.email || 'admin@nayemhasan.com'}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSelectTab('admin-settings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Admin Security</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSelectTab('settings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#D1CCC4] hover:text-[#FFF] hover:bg-[#1A1A1A] transition-colors text-left cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#E5C45A]" />
                  <span>Website Settings</span>
                </button>
                <div className="my-1 border-t border-[#1A1A1A]" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
