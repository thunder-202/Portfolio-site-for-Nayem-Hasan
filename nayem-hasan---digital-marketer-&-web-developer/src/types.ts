export type ProjectCategory = 'Restaurant' | 'Café' | 'Automotive' | 'Car Detailing' | 'Mechanic' | 'Local Business' | 'E-commerce' | 'Other';

export type ProjectType = 'Client Project' | 'Showcase' | 'Concept' | 'Personal Project';
export type ProjectStatus = 'Live' | 'In Progress' | 'Archived';

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'Concept / Showcase' | 'Showcase Project' | 'Interactive Demo' | 'Client Project';
  projectType?: ProjectType;
  status?: ProjectStatus;
  visible?: boolean;
  featured?: boolean;
  displayOrder?: number;
  websiteUrl?: string;
  previewUrl?: string;
  githubUrl?: string;
  projectDate?: string;
  industry: string;
  summary: string;
  coverImage: string;
  desktopPreviewImage: string;
  mobilePreviewImage: string;
  clientContext: string;
  businessProblem: string;
  designDirection: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  uxDecisions: {
    title: string;
    reasoning: string;
  }[];
  technologies: string[];
  deliverables: string[];
  resultsAndTakeaways: string[];
  demoLiveFeatures?: string[];
}

export interface ServiceItem {
  id?: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
  link?: string;
}

export interface ProcessStep {
  id?: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyActions: string[];
  icon?: string;
}

export interface SkillCategory {
  id?: string;
  title: string;
  tagline: string;
  skills: {
    name: string;
    description: string;
    featured?: boolean;
    icon?: string;
  }[];
}

export interface IndustryItem {
  id?: string;
  name: string;
  category: string;
  focus: string;
  icon: string;
  description?: string;
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  service?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  date?: string;
  createdAt?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  replyNotes?: string;
}

export interface PageSeoConfig {
  pageId: 'home' | 'about' | 'services' | 'work' | 'contact';
  pageName: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords?: string;
}

export interface SeoSettings {
  global: {
    websiteTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    author: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    robots: 'index, follow' | 'noindex, nofollow' | 'index, nofollow';
    googleSiteVerification?: string;
  };
  pages: Record<string, PageSeoConfig>;
}

export interface AuditIssue {
  id: string;
  title: string;
  category: 'Performance' | 'SEO' | 'Accessibility' | 'Best Practices' | 'Mobile' | 'Images';
  severity: 'high' | 'medium' | 'low' | 'passed';
  description: string;
  recommendedFix: string;
  impact: string;
  actionKey?: string;
}

export interface OptimizationAudit {
  lastAuditDate: string;
  overallScore: number;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  issues: AuditIssue[];
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  sizeKb: number;
  dimensions: string;
  format: 'webp' | 'avif' | 'png' | 'jpg' | 'svg';
  usage: string[];
  createdAt: string;
  isOversized?: boolean;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  category: 'Homepage' | 'Portfolio' | 'SEO' | 'Settings' | 'Media' | 'Security' | 'Audit' | 'Messages';
  details: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

export interface WebsiteSettings {
  general: {
    websiteName: string;
    siteName?: string;
    domain?: string;
    tagline?: string;
    logoText?: string;
    faviconUrl?: string;
    contactEmail: string;
    contactPhone: string;
    location?: string;
    availabilityStatus?: string;
  };
  social: {
    github: string;
    linkedin: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
  };
  appearance: {
    theme: 'dark' | 'light' | 'system' | 'luxury-gold' | 'minimal';
    accentColor: string;
    heroBgColor?: string;
    heroTextColor?: string;
    heroAccentTextColor?: string;
    fontFamily?: string;
    animationIntensity?: 'subtle' | 'smooth' | 'reduced';
  };
  maintenance: {
    enabled: boolean;
    message: string;
    estimatedReturn?: string;
  };
}

export interface HomepageContent {
  hero: {
    smallLabel: string;
    mainHeadline: string;
    subHeadline: string;
    description: string;
    primaryCtaText: string;
    primaryCtaAction: string;
    secondaryCtaText: string;
    secondaryCtaAction: string;
    heroImage: string;
    availabilityStatus: string;
    backgroundVisual: 'ambient-glow' | 'grid-particles' | 'minimal-dark';
    heroBgColor?: string;
    heroTextColor?: string;
    heroAccentTextColor?: string;
  };
  about: {
    sectionTitle: string;
    headline: string;
    description: string;
    profileImage: string;
    signatureText: string;
    experienceYears: string;
    projectsCount: string;
    industriesCount: string;
  };
  services: ServiceItem[];
  featuredProjectIds: string[];
  process: ProcessStep[];
  skills: SkillCategory[];
  industries: IndustryItem[];
  contactCta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    email: string;
  };
  footer: {
    name: string;
    roleDescription: string;
    copyrightText: string;
  };
}

export interface AnalyticsStats {
  isDemo: boolean;
  demoNotice: string;
  websiteVisitors: number;
  visitorsChangePct: number;
  projectsCount: number;
  contactMessagesCount: number;
  unreadMessagesCount: number;
  websitePerformanceScore: number;
  timeframeData: {
    '7d': { date: string; visitors: number; pageViews: number }[];
    '30d': { date: string; visitors: number; pageViews: number }[];
    '90d': { date: string; visitors: number; pageViews: number }[];
    '1y': { date: string; visitors: number; pageViews: number }[];
  };
  trafficSources: { name: string; value: number; color: string }[];
  deviceBreakdown: { device: string; percentage: number; count: number }[];
  popularPages: { rank: number; path: string; name: string; views: number; bounceRate: string }[];
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token?: string;
  lastLogin?: string;
}
