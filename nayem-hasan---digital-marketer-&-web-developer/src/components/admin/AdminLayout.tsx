import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardOverview } from './DashboardOverview';
import { HomepageEditor } from './HomepageEditor';
import { PortfolioManager } from './PortfolioManager';
import { CategoryManager } from './CategoryManager';
import { SEOCenter } from './SEOCenter';
import { OptimizationCenter } from './OptimizationCenter';
import { MessagesManager } from './MessagesManager';
import { WebsiteSettings } from './WebsiteSettings';
import { ActivityLog } from './ActivityLog';
import { AdminSecurity } from './AdminSecurity';

interface AdminLayoutProps {
  onOpenPublicSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onOpenPublicSite }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleOpenAddProject = () => {
    setCurrentTab('portfolio');
    setIsAddProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#F5F2EA] flex flex-col font-sans antialiased selection:bg-[#333333] selection:text-[#FFF]">
      {/* Fixed Navigation Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenPublicSite={onOpenPublicSite}
        onOpenAddProjectModal={handleOpenAddProject}
      />

      {/* Main Content Area (offset by sidebar width on lg screens) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onSelectTab={setCurrentTab}
          onOpenPublicSite={onOpenPublicSite}
          onOpenAddProjectModal={handleOpenAddProject}
        />

        {/* Dynamic Main View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardOverview
              onSelectTab={setCurrentTab}
              onOpenAddProjectModal={handleOpenAddProject}
              onOpenPublicSite={onOpenPublicSite}
            />
          )}

          {currentTab === 'homepage' && <HomepageEditor />}

          {currentTab === 'portfolio' && (
            <PortfolioManager
              isAddModalOpen={isAddProjectModalOpen}
              onCloseAddModal={() => setIsAddProjectModalOpen(false)}
              onOpenAddModal={() => setIsAddProjectModalOpen(true)}
            />
          )}

          {currentTab === 'categories' && <CategoryManager />}

          {currentTab === 'seo' && <SEOCenter />}

          {currentTab === 'optimization' && <OptimizationCenter />}

          {currentTab === 'messages' && <MessagesManager />}

          {currentTab === 'settings' && <WebsiteSettings />}

          {currentTab === 'activity' && <ActivityLog />}

          {currentTab === 'admin-settings' && <AdminSecurity />}
        </main>
      </div>
    </div>
  );
};
