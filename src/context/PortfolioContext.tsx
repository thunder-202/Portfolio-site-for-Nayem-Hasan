import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  HomepageContent,
  ProjectCaseStudy,
  CategoryDefinition,
  ContactMessage,
  SeoSettings,
  OptimizationAudit,
  MediaItem,
  ActivityLogItem,
  WebsiteSettings,
  AnalyticsStats,
  AdminUser
} from '../types';

import {
  PERSONAL_INFO,
  SERVICES_DATA,
  FEATURED_PROJECTS,
  PROCESS_STEPS,
  SKILLS_DATA,
  INDUSTRIES_DATA
} from '../data/portfolioData';

interface PortfolioContextType {
  // Public & Published Content
  content: HomepageContent;
  projects: ProjectCaseStudy[];
  categories: CategoryDefinition[];
  settings: WebsiteSettings;
  seoSettings: SeoSettings | null;

  // Live Draft & Editor State (for preview)
  draftContent: HomepageContent;
  isDraftModified: boolean;
  setDraftContent: React.Dispatch<React.SetStateAction<HomepageContent>>;
  updateDraftField: (path: string, value: any) => void;
  saveDraftContent: () => Promise<boolean>;
  publishContent: () => Promise<boolean>;
  resetDraft: () => void;

  // Auth State
  adminUser: AdminUser | null;
  authToken: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;

  // Project Management
  addProject: (project: Partial<ProjectCaseStudy>) => Promise<boolean>;
  updateProject: (project: ProjectCaseStudy) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  reorderProjects: (orderedIds: string[]) => Promise<boolean>;

  // Category Management
  addCategory: (category: Partial<CategoryDefinition>) => Promise<boolean>;
  updateCategory: (category: CategoryDefinition) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  // SEO & Settings
  updateSeoSettings: (newSeo: SeoSettings) => Promise<boolean>;
  updateWebsiteSettings: (newSettings: WebsiteSettings) => Promise<boolean>;
  updateSettings: (newSettings: WebsiteSettings) => Promise<boolean>;

  // Audits & Optimization
  auditReport: OptimizationAudit | null;
  isAuditing: boolean;
  runWebsiteAudit: () => Promise<OptimizationAudit | null>;

  // Media Library
  mediaItems: MediaItem[];
  fetchMedia: () => Promise<void>;
  addMediaItem: (item: Partial<MediaItem>) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;

  // Contact Messages
  messages: ContactMessage[];
  unreadMessagesCount: number;
  submitContactMessage: (msg: { name: string; email: string; subject?: string; message: string; projectType?: string; budget?: string; timeline?: string }) => Promise<{ success: boolean; error?: string }>;
  updateMessageStatus: (id: string, status: ContactMessage['status'], replyNotes?: string) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;

  // Analytics & Activity Logs
  analytics: AnalyticsStats | null;
  fetchAnalytics: () => Promise<void>;
  activityLogs: ActivityLogItem[];
  fetchActivityLogs: () => Promise<void>;

  // Refresh helper
  refreshAllData: () => Promise<void>;
}

const defaultContent: HomepageContent = {
  hero: {
    smallLabel: "DIGITAL • WEB • GROWTH",
    mainHeadline: "I Build Digital Experiences That Help Businesses Get Noticed.",
    subHeadline: "Modern websites, clear user journeys & local marketing solutions",
    description: "I design and build premium websites and digital solutions that help local businesses present themselves professionally, attract customers, and turn online visitors into real inquiries.",
    primaryCtaText: "View My Work",
    primaryCtaAction: "work",
    secondaryCtaText: "Let's Talk",
    secondaryCtaAction: "contact",
    heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    availabilityStatus: "Available for new projects",
    backgroundVisual: "grid-particles",
    heroBgColor: "#050505",
    heroTextColor: "#F5F2EA",
    heroAccentTextColor: "#E5C45A"
  },
  about: {
    sectionTitle: "About Me",
    headline: "Bridging Design, Code & Real Business Outcomes",
    description: "I'm Nayem Hasan, a digital marketer and web developer passionate about crafting functional, beautiful web systems. I believe a business website should never just be a static digital business card — it should be an active growth engine.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    signatureText: "Nayem Hasan — Building. Learning. Improving.",
    experienceYears: "3+",
    projectsCount: "30+",
    industriesCount: "8+"
  },
  services: SERVICES_DATA,
  featuredProjectIds: ["luxury-dine", "platinum-auto-spa", "curry-express", "apex-precision-auto", "velvet-roast-coffee"],
  process: PROCESS_STEPS,
  skills: SKILLS_DATA,
  industries: INDUSTRIES_DATA,
  contactCta: {
    heading: "Ready to upgrade your online business presence?",
    description: "Whether you need a brand-new restaurant menu, an automotive booking funnel, or a high-converting local service site, let's build something exceptional together.",
    buttonText: "Start a Conversation",
    buttonLink: "#contact",
    email: "websitedeldevelop@gmail.com"
  },
  footer: {
    name: "Nayem Hasan",
    roleDescription: "Digital Marketer • Web Developer",
    copyrightText: "© 2026 Nayem Hasan. All rights reserved."
  }
};

const defaultSettings: WebsiteSettings = {
  general: {
    websiteName: "Nayem Hasan Portfolio",
    tagline: "Digital Marketer • Web Developer",
    logoText: "NH",
    faviconUrl: "/favicon.ico",
    contactEmail: "websitedeldevelop@gmail.com",
    contactPhone: "+880 1700-000000",
    location: "Dhaka, Bangladesh (Serving Clients Globally)",
    availabilityStatus: "Available for new projects"
  },
  social: {
    github: "https://github.com/nayemhasan",
    linkedin: "https://linkedin.com/in/nayemhasan",
    facebook: "https://facebook.com/nayemhasan",
    instagram: "https://instagram.com/nayemhasan"
  },
  appearance: {
    theme: 'dark',
    accentColor: '#C9A227',
    heroBgColor: '#050505',
    heroTextColor: '#F5F2EA',
    heroAccentTextColor: '#E5C45A',
    animationIntensity: 'smooth'
  },
  maintenance: {
    enabled: false,
    message: "Our website is currently undergoing a scheduled system upgrade. We will be back online shortly."
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<HomepageContent>(defaultContent);
  const [draftContent, setDraftContent] = useState<HomepageContent>(defaultContent);
  const [isDraftModified, setIsDraftModified] = useState<boolean>(false);

  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem('nayem_portfolio_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return (FEATURED_PROJECTS as ProjectCaseStudy[]).map((p, idx) => ({
      ...p,
      projectType: p.type === 'Concept / Showcase' ? 'Concept' : 'Showcase',
      status: 'Live',
      visible: true,
      featured: true,
      displayOrder: idx + 1,
      projectDate: '2026-02',
      websiteUrl: (p as any).websiteUrl || `https://example.com/${p.id}`,
      previewUrl: (p as any).previewUrl || `https://example.com/preview/${p.id}`,
      githubUrl: (p as any).githubUrl || `https://github.com/nayemhasan/${p.id}`
    }));
  });
  const [categories, setCategories] = useState<CategoryDefinition[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem('nayem_portfolio_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSettings,
          ...parsed,
          general: { ...defaultSettings.general, ...(parsed.general || {}) },
          social: { ...defaultSettings.social, ...(parsed.social || {}) },
          appearance: { ...defaultSettings.appearance, ...(parsed.appearance || {}) },
          maintenance: { ...defaultSettings.maintenance, ...(parsed.maintenance || {}) }
        };
      }
    } catch (e) {
      // fallback
    }
    return defaultSettings;
  });
  const [seoSettings, setSeoSettings] = useState<SeoSettings | null>(null);

  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem('nayem_admin_token'));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const [auditReport, setAuditReport] = useState<OptimizationAudit | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);

  // Auth Header helper
  const getAuthHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
    };
  }, [authToken]);

  // Initial Content Fetch
  const refreshAllData = useCallback(async () => {
    try {
      const [resContent, resProjects, resCategories, resSettings, resSeo] = await Promise.all([
        fetch('/api/content').then(r => r.ok ? r.json() : null),
        fetch('/api/projects').then(r => r.ok ? r.json() : null),
        fetch('/api/categories').then(r => r.ok ? r.json() : null),
        fetch('/api/settings').then(r => r.ok ? r.json() : null),
        fetch('/api/seo').then(r => r.ok ? r.json() : null)
      ]);

      if (resContent) {
        setContent(resContent);
        setDraftContent(resContent);
      }
      if (resProjects && Array.isArray(resProjects) && resProjects.length > 0) {
        setProjects(resProjects);
        try {
          localStorage.setItem('nayem_portfolio_projects', JSON.stringify(resProjects));
        } catch (e) {
          // ignore
        }
      }
      if (resCategories && Array.isArray(resCategories)) setCategories(resCategories);
      if (resSettings) setSettings(resSettings);
      if (resSeo) setSeoSettings(resSeo);
    } catch (err) {
      console.warn('Failed to load API data, using cached/default state:', err);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Verify Auth on mount
  useEffect(() => {
    const verifyAuth = async () => {
      if (!authToken) {
        setIsAuthLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
          } else {
            localStorage.removeItem('nayem_admin_token');
            setAuthToken(null);
            setAdminUser(null);
          }
        } else {
          localStorage.removeItem('nayem_admin_token');
          setAuthToken(null);
          setAdminUser(null);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
      } finally {
        setIsAuthLoading(false);
      }
    };
    verifyAuth();
  }, [authToken]);

  // Login
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem('nayem_admin_token', data.token);
        setAuthToken(data.token);
        setAdminUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection error' };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (authToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: getAuthHeaders()
        });
      }
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('nayem_admin_token');
      setAuthToken(null);
      setAdminUser(null);
    }
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update password' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Update draft field helper
  const updateDraftField = (path: string, value: any) => {
    setIsDraftModified(true);
    setDraftContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let curr = next;
      for (let i = 0; i < parts.length - 1; i++) {
        curr = curr[parts[i]];
      }
      curr[parts[parts.length - 1]] = value;
      return next;
    });
  };

  // Save Draft locally / Publish live to server
  const saveDraftContent = async (): Promise<boolean> => {
    setIsDraftModified(false);
    return true;
  };

  const publishContent = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(draftContent)
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data.content);
        setDraftContent(data.content);
        setIsDraftModified(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to publish content:', err);
      return false;
    }
  };

  const resetDraft = () => {
    setDraftContent(JSON.parse(JSON.stringify(content)));
    setIsDraftModified(false);
  };

  // Projects CRUD
  const addProject = async (newProj: Partial<ProjectCaseStudy>): Promise<boolean> => {
    try {
      const tempId = newProj.id || `proj-${Date.now()}`;
      const projectToAdd: ProjectCaseStudy = {
        id: tempId,
        title: newProj.title || 'New Website',
        subtitle: newProj.subtitle || 'Showcase Project',
        category: newProj.category || 'Restaurant',
        projectType: newProj.projectType || 'Showcase',
        type: (newProj.type as any) || 'Showcase Project',
        status: newProj.status || 'Live',
        industry: newProj.industry || 'Business Services',
        summary: newProj.summary || '',
        coverImage: newProj.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
        desktopPreviewImage: newProj.desktopPreviewImage || newProj.coverImage || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
        mobilePreviewImage: newProj.mobilePreviewImage || newProj.coverImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        clientContext: newProj.clientContext || '',
        businessProblem: newProj.businessProblem || '',
        designDirection: newProj.designDirection || '',
        websiteUrl: newProj.websiteUrl || '',
        previewUrl: newProj.previewUrl || newProj.websiteUrl || '',
        githubUrl: newProj.githubUrl || '',
        projectDate: newProj.projectDate || '2026',
        featured: newProj.featured !== false,
        visible: newProj.visible !== false,
        technologies: newProj.technologies || ['React', 'Tailwind CSS', 'TypeScript'],
        deliverables: newProj.deliverables || ['Web Architecture', 'Hero Section Design'],
        keyFeatures: newProj.keyFeatures || [
          { title: 'Hero Section Showcase', description: 'Immediate high-impact brand presentation.' }
        ],
        uxDecisions: newProj.uxDecisions || [
          { title: 'Streamlined UX Flow', reasoning: 'Designed for conversion and clarity.' }
        ],
        resultsAndTakeaways: newProj.resultsAndTakeaways || ['Active production website.']
      };

      // 1. Optimistic update and instant local storage persist
      setProjects(prev => {
        const next = [projectToAdd, ...prev.filter(p => p.id !== projectToAdd.id)];
        try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(next)); } catch (e) {}
        return next;
      });

      // 2. Sync with backend API
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(projectToAdd)
      });
      if (res.ok) {
        const created = await res.json();
        setProjects(prev => {
          const next = prev.map(p => p.id === tempId ? created : p);
          try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(next)); } catch (e) {}
          return next;
        });
      }
      return true;
    } catch (err) {
      console.error('Error adding project:', err);
      return true; // Still true because local state and storage persisted
    }
  };

  const updateProject = async (updatedProj: ProjectCaseStudy): Promise<boolean> => {
    try {
      // 1. Optimistic update and instant local storage persist
      setProjects(prev => {
        const next = prev.map(p => p.id === updatedProj.id ? updatedProj : p);
        try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(next)); } catch (e) {}
        return next;
      });

      // 2. Sync with backend API
      const res = await fetch(`/api/projects/${updatedProj.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProj)
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects(prev => {
          const next = prev.map(p => p.id === saved.id ? saved : p);
          try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(next)); } catch (e) {}
          return next;
        });
      }
      return true;
    } catch (err) {
      console.error('Error updating project:', err);
      return true; // Still true because local state and storage persisted
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setProjects(prev => {
        const next = prev.filter(p => p.id !== id);
        try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(next)); } catch (e) {}
        return next;
      });

      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return true;
    } catch (err) {
      console.error('Error deleting project:', err);
      return true;
    }
  };

  const reorderProjects = async (orderedIds: string[]): Promise<boolean> => {
    try {
      setProjects(prev => {
        const idMap = new Map<string, ProjectCaseStudy>(prev.map(p => [p.id, p]));
        const reordered: ProjectCaseStudy[] = [];
        orderedIds.forEach(id => {
          const found = idMap.get(id);
          if (found) reordered.push(found);
        });
        prev.forEach(p => {
          if (!orderedIds.includes(p.id)) reordered.push(p);
        });
        try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(reordered)); } catch (e) {}
        return reordered;
      });

      const res = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderedIds })
      });
      if (res.ok) {
        const updatedList = await res.json();
        setProjects(updatedList);
        try { localStorage.setItem('nayem_portfolio_projects', JSON.stringify(updatedList)); } catch (e) {}
      }
      return true;
    } catch (err) {
      console.error('Error reordering projects:', err);
      return true;
    }
  };

  // Categories CRUD
  const addCategory = async (cat: Partial<CategoryDefinition>): Promise<boolean> => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cat)
      });
      if (res.ok) {
        const created = await res.json();
        setCategories(prev => [...prev, created]);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const updateCategory = async (cat: CategoryDefinition): Promise<boolean> => {
    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(cat)
      });
      if (res.ok) {
        setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // SEO & Settings
  const updateSeoSettings = async (newSeo: SeoSettings): Promise<boolean> => {
    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSeo)
      });
      if (res.ok) {
        const data = await res.json();
        setSeoSettings(data);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const updateWebsiteSettings = async (newSettings: WebsiteSettings): Promise<boolean> => {
    try {
      // Immediately persist to localStorage for instant UI sync
      localStorage.setItem('nayem_portfolio_settings', JSON.stringify(newSettings));
      setSettings(newSettings);

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        localStorage.setItem('nayem_portfolio_settings', JSON.stringify(data));
        return true;
      }
      return true;
    } catch (err) {
      console.warn('Failed to persist settings to server, saved locally:', err);
      return true;
    }
  };

  // Website Audit
  const runWebsiteAudit = async (): Promise<OptimizationAudit | null> => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/audit/run', {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const audit = await res.json();
        setAuditReport(audit);
        return audit;
      }
      return null;
    } catch (err) {
      console.error('Audit run failed:', err);
      return null;
    } finally {
      setIsAuditing(false);
    }
  };

  // Media Management
  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const list = await res.json();
        setMediaItems(list);
      }
    } catch (e) {
      // ignore
    }
  };

  const addMediaItem = async (item: Partial<MediaItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const created = await res.json();
        setMediaItems(prev => [created, ...prev]);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteMediaItem = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setMediaItems(prev => prev.filter(m => m.id !== id));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Contact Messages
  const submitContactMessage = async (msgData: { name: string; email: string; subject?: string; message: string; projectType?: string; budget?: string; timeline?: string }) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to submit' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Submission error' };
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status'], replyNotes?: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/messages/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, replyNotes })
      });
      if (res.ok) {
        const updated = await res.json();
        setMessages(prev => prev.map(m => m.id === id ? updated : m));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Analytics & Activity Logs
  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (e) {
      // ignore
    }
  };

  const fetchActivityLogs = async () => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/activity', {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const logs = await res.json();
        setActivityLogs(logs);
      }
    } catch (e) {
      // ignore
    }
  };

  // Load audit report, analytics, media & messages when authenticated
  useEffect(() => {
    if (authToken) {
      fetch('/api/audit').then(r => r.ok ? r.json() : null).then(setAuditReport).catch(() => {});
      fetch('/api/messages', { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : null).then(m => m && setMessages(m)).catch(() => {});
      fetchMedia();
      fetchAnalytics();
      fetchActivityLogs();
    }
  }, [authToken, getAuthHeaders]);

  const unreadMessagesCount = messages.filter(m => m.status === 'new').length;

  return (
    <PortfolioContext.Provider
      value={{
        content,
        projects,
        categories,
        settings,
        seoSettings,
        draftContent,
        isDraftModified,
        setDraftContent,
        updateDraftField,
        saveDraftContent,
        publishContent,
        resetDraft,
        adminUser,
        authToken,
        token: authToken,
        isAuthenticated: !!adminUser && !!authToken,
        isAuthLoading,
        login,
        logout,
        changeAdminPassword,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSeoSettings,
        updateWebsiteSettings,
        updateSettings: updateWebsiteSettings,
        auditReport,
        isAuditing,
        runWebsiteAudit,
        mediaItems,
        fetchMedia,
        addMediaItem,
        deleteMediaItem,
        messages,
        unreadMessagesCount,
        submitContactMessage,
        updateMessageStatus,
        deleteMessage,
        analytics,
        fetchAnalytics,
        activityLogs,
        fetchActivityLogs,
        refreshAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
