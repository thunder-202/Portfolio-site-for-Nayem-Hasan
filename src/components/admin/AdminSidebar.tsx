import React from 'react';
import {
  LayoutDashboard,
  Home,
  Search,
  Zap,
  Settings,
  Briefcase,
  Layers,
  PlusCircle,
  History,
  ShieldCheck,
  ExternalLink,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export type AdminTab =
  | 'dashboard'
  | 'homepage'
  | 'seo'
  | 'optimization'
  | 'settings'
  | 'portfolio'
  | 'categories'
  | 'add-website'
  | 'messages'
  | 'activity'
  | 'admin-settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenPublicSite: () => void;
  onOpenAddProjectModal: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenPublicSite,
  onOpenAddProjectModal
}) => {
  const { logout, auditReport } = usePortfolio();

  const handleNavClick = (tab: AdminTab) => {
    if (tab === 'add-website') {
      onOpenAddProjectModal();
    } else {
      onSelectTab(tab);
    }
    onCloseMobile();
  };

  const navGroups = [
    {
      groupTitle: "MAIN",
      items: [
        { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      groupTitle: "WEBSITE",
      items: [
        { id: 'homepage' as AdminTab, label: 'Homepage Editor', icon: Home, badge: 'Live' },
        { id: 'seo' as AdminTab, label: 'SEO Control Center', icon: Search, badge: null },
        { id: 'optimization' as AdminTab, label: 'Optimization Center', icon: Zap, badge: auditReport ? `${auditReport.overallScore}/100` : null },
        { id: 'settings' as AdminTab, label: 'Website Settings', icon: Settings, badge: null }
      ]
    },
    {
      groupTitle: "PORTFOLIO",
      items: [
        { id: 'portfolio' as AdminTab, label: 'All Websites', icon: Briefcase, badge: null },
        { id: 'categories' as AdminTab, label: 'Categories System', icon: Layers, badge: null },
        { id: 'add-website' as AdminTab, label: 'Add Website', icon: PlusCircle, badge: 'New', isAction: true }
      ]
    },
    {
      groupTitle: "SYSTEM",
      items: [
        { id: 'activity' as AdminTab, label: 'Activity Log', icon: History, badge: null },
        { id: 'admin-settings' as AdminTab, label: 'Admin Security', icon: ShieldCheck, badge: null }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="admin-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#090909] border-r border-[#1C1C1C] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Logo */}
        <div>
          <div className="h-16 px-5 border-b border-[#1A1A1A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EA] font-bold text-xs shadow-sm">
                NH
              </div>
              <div>
                <h1 className="text-sm font-bold text-[#F5F2EA] tracking-wide leading-none">
                  NAYEM ADMIN
                </h1>
                <p className="text-[10px] font-mono text-[#8C857B] mt-1 leading-none">
                  Portfolio OS v2.6
                </p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#888] hover:text-[#FFF] hover:bg-[#181818]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-175px)] custom-scrollbar">
            {navGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-semibold tracking-wider text-[#666056] uppercase">
                  {group.groupTitle}
                </div>
                <div className="space-y-0.5 mt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#181818] text-[#FFFFFF] border border-[#2F2F2F] shadow-sm'
                            : 'text-[#9E988F] hover:text-[#F5F2EA] hover:bg-[#121212] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFFFFF]' : 'text-[#736E66]'}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                              isActive
                                ? 'bg-[#262626] text-[#FFFFFF] border border-[#3A3A3A] font-semibold'
                                : 'bg-[#181818] text-[#888] border border-[#222222]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#1A1A1A] space-y-1.5 bg-[#070707]">
          <button
            onClick={onOpenPublicSite}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#C2BCB2] hover:text-[#F5F2EA] bg-[#121212] hover:bg-[#1A1A1A] border border-[#222] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#A6A19A]" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="w-3 h-3 text-[#666]" />
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
