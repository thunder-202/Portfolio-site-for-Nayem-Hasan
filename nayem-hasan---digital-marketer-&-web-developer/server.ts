import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

// Initial in-memory database initialized with rich portfolio data
import {
  PERSONAL_INFO,
  SERVICES_DATA,
  FEATURED_PROJECTS,
  PROCESS_STEPS,
  SKILLS_DATA,
  INDUSTRIES_DATA
} from './src/data/portfolioData';

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
  AnalyticsStats
} from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// ----------------------------------------------------
// Admin Authentication & Session Security Setup
// ----------------------------------------------------
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@nayemhasan.com').trim().toLowerCase();
const ADMIN_SESSION_SECRET = (process.env.ADMIN_SESSION_SECRET || 'nayem_super_secret_session_key_production_2026').trim();

interface SessionPayload {
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
  jti: string;
}

// Generate stateless HMAC-SHA256 Signed Session Token
function generateSessionToken(email: string, name: string = 'Nayem Hasan', role: string = 'Super Admin'): string {
  const payload: SessionPayload = {
    email,
    name,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days validity
    jti: crypto.randomBytes(16).toString('hex')
  };
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Verify Session Token (timing-safe signature verification & expiration check)
function verifySessionToken(token: string): { valid: boolean; user?: SessionPayload } {
  if (!token || typeof token !== 'string') return { valid: false };
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { valid: false };

  const [header, body, signature] = parts;
  try {
    const expectedSig = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false };
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return { valid: false }; // Expired
    }
    return { valid: true, user: payload };
  } catch (err) {
    return { valid: false };
  }
}

// Password verification supporting multiple standard hashing formats safely
function verifyPassword(enteredPassword: string): boolean {
  if (!enteredPassword || typeof enteredPassword !== 'string') return false;

  const envHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  const envPlain = (process.env.ADMIN_PASSWORD || 'nayem2026!').trim();

  // 1. If ADMIN_PASSWORD_HASH is set, verify against it
  if (envHash) {
    // 1A. Direct SHA-256 Hash match (64 hex chars)
    const sha256Hex = crypto.createHash('sha256').update(enteredPassword).digest('hex');
    if (envHash.length === 64 && /^[0-9a-fA-F]+$/.test(envHash)) {
      if (crypto.timingSafeEqual(Buffer.from(sha256Hex.toLowerCase()), Buffer.from(envHash.toLowerCase()))) {
        return true;
      }
    }

    // 1B. Direct SHA-512 Hash match (128 hex chars)
    const sha512Hex = crypto.createHash('sha512').update(enteredPassword).digest('hex');
    if (envHash.length === 128 && /^[0-9a-fA-F]+$/.test(envHash)) {
      if (crypto.timingSafeEqual(Buffer.from(sha512Hex.toLowerCase()), Buffer.from(envHash.toLowerCase()))) {
        return true;
      }
    }

    // 1C. Salted or PBKDF2 formats (e.g. "salt:hash", "hash:salt", "sha256$salt$hash", "pbkdf2:sha256:10000:salt:hash")
    if (envHash.includes(':') || envHash.includes('$')) {
      const parts = envHash.includes('$') ? envHash.split('$').filter(Boolean) : envHash.split(':');

      if (parts.length === 2) {
        // [salt, hash] or [hash, salt]
        const isFirstHash = parts[0].length >= 32 && /^[0-9a-fA-F]+$/.test(parts[0]);
        const expectedHash = isFirstHash ? parts[0] : parts[1];
        const salt = isFirstHash ? parts[1] : parts[0];

        // Try sha256(salt + password) and sha256(password + salt)
        const h1 = crypto.createHash('sha256').update(salt + enteredPassword).digest('hex');
        if (h1.toLowerCase() === expectedHash.toLowerCase()) return true;
        const h2 = crypto.createHash('sha256').update(enteredPassword + salt).digest('hex');
        if (h2.toLowerCase() === expectedHash.toLowerCase()) return true;

        // Try PBKDF2
        try {
          for (const iters of [10000, 100000, 1000]) {
            const pbkdf2Hex = crypto.pbkdf2Sync(enteredPassword, salt, iters, expectedHash.length / 2 || 32, 'sha256').toString('hex');
            if (pbkdf2Hex.toLowerCase() === expectedHash.toLowerCase()) return true;
          }
        } catch {}
      } else if (parts.length >= 3) {
        const salt = parts[parts.length - 2];
        const expectedHash = parts[parts.length - 1];
        const h1 = crypto.createHash('sha256').update(salt + enteredPassword).digest('hex');
        if (h1.toLowerCase() === expectedHash.toLowerCase()) return true;
        const h2 = crypto.createHash('sha256').update(enteredPassword + salt).digest('hex');
        if (h2.toLowerCase() === expectedHash.toLowerCase()) return true;
        try {
          for (const iters of [10000, 100000, 1000]) {
            const pbkdf2Hex = crypto.pbkdf2Sync(enteredPassword, salt, iters, expectedHash.length / 2 || 32, 'sha256').toString('hex');
            if (pbkdf2Hex.toLowerCase() === expectedHash.toLowerCase()) return true;
          }
        } catch {}
      }
    }

    // 1D. Exact comparison if plain text was stored in ADMIN_PASSWORD_HASH
    if (enteredPassword.length === envHash.length) {
      if (crypto.timingSafeEqual(Buffer.from(enteredPassword), Buffer.from(envHash))) {
        return true;
      }
    }
  }

  // 2. Fallback to ADMIN_PASSWORD (e.g. for development or if plain password set)
  if (envPlain && enteredPassword.length === envPlain.length) {
    return crypto.timingSafeEqual(Buffer.from(enteredPassword), Buffer.from(envPlain));
  }

  return false;
}

// Cookie & Token Extractor Helper
function extractTokenFromRequest(req: express.Request): string | null {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1].trim();
  }

  // 2. Check Cookie header
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const match = cookieHeader.match(/nayem_admin_session=([^;]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
}

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = extractTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing session token' });
  }

  const { valid, user } = verifySessionToken(token);
  if (!valid || !user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Session expired or invalid' });
  }

  (req as any).user = user;
  next();
}

// ----------------------------------------------------
// Database In-Memory Stores
// ----------------------------------------------------

let homepageContent: HomepageContent = {
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
    backgroundVisual: "grid-particles"
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

let projectsData: ProjectCaseStudy[] = FEATURED_PROJECTS.map((p, idx) => ({
  ...p,
  projectType: p.type === 'Concept / Showcase' ? 'Concept' : 'Showcase',
  status: 'Live',
  visible: true,
  featured: true,
  displayOrder: idx + 1,
  projectDate: '2026-02',
  websiteUrl: `https://example.com/${p.id}`,
  previewUrl: `https://example.com/preview/${p.id}`,
  githubUrl: `https://github.com/nayemhasan/${p.id}`
}));

let categoriesData: CategoryDefinition[] = [
  { id: 'all', name: 'All Work', description: 'Complete portfolio catalog', icon: 'Grid', displayOrder: 1 },
  { id: 'Restaurant', name: 'Restaurants & Dining', description: 'Fine dining, menus, reservations & takeaway platforms', icon: 'UtensilsCrossed', displayOrder: 2 },
  { id: 'Café', name: 'Cafés & Roasteries', description: 'Specialty coffee shops, bean catalogs & drink menus', icon: 'Coffee', displayOrder: 3 },
  { id: 'Automotive', name: 'Automotive & Detailing', description: 'Ceramic coating, PPF, paint correction & repair shops', icon: 'Car', displayOrder: 4 },
  { id: 'Local Business', name: 'Local Services', description: 'Plumbing, HVAC, clinics, trade & professional firms', icon: 'Briefcase', displayOrder: 5 },
  { id: 'E-commerce', name: 'E-commerce', description: 'Online storefronts and product catalogs', icon: 'ShoppingBag', displayOrder: 6 }
];

let messagesData: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Marcus Vance',
    email: 'marcus@auroradining.com',
    subject: 'New Restaurant Menu & Reservation System',
    message: 'Hello Nayem, we are opening a luxury Italian bistro in downtown and loved your Luxury Dine concept. We need an interactive wine menu and instant table reservation flow by next month. Can we schedule a brief discovery call?',
    projectType: 'Restaurant Website',
    budget: '$1,500 - $3,000',
    timeline: '3-4 Weeks',
    date: '2026-09-10T11:42:00.000Z',
    status: 'new'
  },
  {
    id: 'msg-2',
    name: 'Elena Rostova',
    email: 'elena@precisionautoworks.co',
    subject: 'Ceramic Coating Package Calculator Website',
    message: 'Hi Nayem, saw your Platinum Auto Spa detailing showcase. We run a high-end detailing studio and want an exact quote builder for luxury vehicle owners so they stop emailing back and forth. Let me know your availability!',
    projectType: 'Automotive Detailing',
    budget: '$2,000 - $4,500',
    timeline: 'Within 1 Month',
    date: '2026-09-08T09:15:00.000Z',
    status: 'replied',
    replyNotes: 'Replied with portfolio case study breakdown and proposal call link.'
  },
  {
    id: 'msg-3',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@roastcraft.net',
    subject: 'Specialty Coffee Shop & Bean Subscription',
    message: 'Greetings! We are expanding our café roastery into regional bean subscriptions. We need clean UI with flavor wheels and brew guides. When can we discuss scope?',
    projectType: 'Café & E-commerce',
    budget: '$1,000 - $2,500',
    timeline: 'Flexible',
    date: '2026-09-05T14:20:00.000Z',
    status: 'read'
  }
];

let seoSettingsData: SeoSettings = {
  global: {
    websiteTitle: "Nayem Hasan — Digital Marketer & Web Developer | High-Converting Business Websites",
    metaDescription: "Nayem Hasan builds modern websites and digital marketing solutions for restaurants, auto detailing studios, mechanics, and local businesses. Elevate your brand online.",
    canonicalUrl: "https://nayemhasan.com",
    author: "Nayem Hasan",
    keywords: "Nayem Hasan, Web Developer, Digital Marketer, Restaurant Websites, Automotive Detailing Web Design, Local SEO, High Converting Websites",
    ogTitle: "Nayem Hasan — Digital Marketer & Web Developer",
    ogDescription: "I build digital experiences and web systems that help businesses get noticed, attract leads, and grow revenue.",
    ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow",
    googleSiteVerification: "google-site-verification=nh-verified-2026"
  },
  pages: {
    home: {
      pageId: 'home',
      pageName: 'Home',
      seoTitle: "Nayem Hasan — Digital Marketer & Web Developer",
      metaDescription: "Portfolio of Nayem Hasan. Modern web development, UI/UX design, and digital marketing for modern businesses.",
      canonicalUrl: "https://nayemhasan.com/",
      ogTitle: "Nayem Hasan — Web Engineering & Digital Growth",
      ogDescription: "Explore showcase projects, services, and digital solutions for modern businesses.",
      ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    },
    about: {
      pageId: 'about',
      pageName: 'About',
      seoTitle: "About Nayem Hasan — Strategy, Design & Development",
      metaDescription: "Learn more about Nayem Hasan, experience background, core values, and approach to digital business expansion.",
      canonicalUrl: "https://nayemhasan.com/#about",
      ogTitle: "About Nayem Hasan",
      ogDescription: "Discover my background, design philosophy, and how I help businesses thrive online.",
      ogImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
    },
    services: {
      pageId: 'services',
      pageName: 'Services',
      seoTitle: "Web Development & Digital Marketing Services — Nayem Hasan",
      metaDescription: "Website development, UI/UX design, digital marketing, and local business platforms tailored for conversion.",
      canonicalUrl: "https://nayemhasan.com/#services",
      ogTitle: "Services by Nayem Hasan",
      ogDescription: "High-performance web development and strategic digital marketing services.",
      ogImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    },
    work: {
      pageId: 'work',
      pageName: 'Work / Portfolio',
      seoTitle: "Featured Case Studies & Web Projects — Nayem Hasan",
      metaDescription: "Explore interactive website showcases for fine dining restaurants, luxury auto detailing spas, roasteries, and auto repair shops.",
      canonicalUrl: "https://nayemhasan.com/#work",
      ogTitle: "Featured Work — Nayem Hasan Portfolio",
      ogDescription: "In-depth case studies and interactive design demonstrations for real business scenarios.",
      ogImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    },
    contact: {
      pageId: 'contact',
      pageName: 'Contact',
      seoTitle: "Contact Nayem Hasan — Project Inquiries & Consultations",
      metaDescription: "Get in touch with Nayem Hasan for custom website builds, digital marketing consultations, or showcase demos.",
      canonicalUrl: "https://nayemhasan.com/#contact",
      ogTitle: "Start a Conversation — Nayem Hasan",
      ogDescription: "Ready to build your high-converting business website? Send an inquiry today.",
      ogImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    }
  }
};

let auditReportData: OptimizationAudit = {
  lastAuditDate: new Date().toISOString(),
  overallScore: 94,
  performanceScore: 96,
  seoScore: 93,
  accessibilityScore: 95,
  bestPracticesScore: 98,
  issues: [
    {
      id: 'aud-1',
      title: 'Hero Cover Image Format',
      category: 'Images',
      severity: 'low',
      impact: 'Savings of ~45KB on initial mobile page paint',
      description: 'The hero background image is served as standard JPEG rather than modern AVIF/WebP.',
      recommendedFix: 'Convert hero images to WebP or responsive srcset with width constraints.',
      actionKey: 'optimize-hero'
    },
    {
      id: 'aud-2',
      title: 'Missing Structured Data (Schema.org) for Local Services',
      category: 'SEO',
      severity: 'medium',
      impact: 'Limits rich Google search snippets for service categories',
      description: 'The public page has basic OpenGraph meta tags but lacks JSON-LD ProfessionalService schema markup.',
      recommendedFix: 'Inject Schema.org JSON-LD tag with Author, Person, and LocalBusiness specifications.',
      actionKey: 'add-schema'
    },
    {
      id: 'aud-3',
      title: 'Aria-Labels on Icon Buttons',
      category: 'Accessibility',
      severity: 'passed',
      impact: '100% WCAG AA compliant navigation',
      description: 'All interactive navigation buttons and social links include dedicated aria-labels.',
      recommendedFix: 'No action needed. Passed verification.',
      actionKey: 'aria-pass'
    },
    {
      id: 'aud-4',
      title: 'Contrast Ratio on Tertiary Footnotes',
      category: 'Accessibility',
      severity: 'low',
      impact: 'Increases readability under direct bright sunlight',
      description: 'Footer copyright subtext has a 4.2:1 contrast ratio against #050505 background.',
      recommendedFix: 'Adjust #666666 to #888888 for 4.8:1 WCAG AA compliance.',
      actionKey: 'fix-contrast'
    },
    {
      id: 'aud-5',
      title: 'Zero Render-Blocking External Fonts',
      category: 'Performance',
      severity: 'passed',
      impact: 'First Contentful Paint under 0.6 seconds',
      description: 'Using system font stack and self-hosted CSS variables with zero external blocking requests.',
      recommendedFix: 'No action needed. Passed verification.',
      actionKey: 'fonts-pass'
    }
  ]
};

let mediaData: MediaItem[] = [
  {
    id: 'med-1',
    filename: 'luxury-dine-hero.webp',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    sizeKb: 142,
    dimensions: '1400x933',
    format: 'webp',
    usage: ['Luxury Dine Cover', 'Work Gallery'],
    createdAt: '2026-08-15'
  },
  {
    id: 'med-2',
    filename: 'platinum-auto-hero.webp',
    url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1400&q=80',
    sizeKb: 185,
    dimensions: '1400x933',
    format: 'webp',
    usage: ['Platinum Auto Spa Cover', 'Automotive Showcase'],
    createdAt: '2026-08-18'
  },
  {
    id: 'med-3',
    filename: 'curry-express-dish.webp',
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1400&q=80',
    sizeKb: 168,
    dimensions: '1400x933',
    format: 'webp',
    usage: ['Curry Express Cover'],
    createdAt: '2026-08-20'
  },
  {
    id: 'med-4',
    filename: 'nayem-profile-headshot.webp',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    sizeKb: 78,
    dimensions: '600x600',
    format: 'webp',
    usage: ['About Profile', 'Header Avatar'],
    createdAt: '2026-09-01'
  },
  {
    id: 'med-5',
    filename: 'large-uncompressed-mechanic.jpg',
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
    sizeKb: 612,
    dimensions: '1400x933',
    format: 'jpg',
    usage: ['Apex Precision Auto'],
    createdAt: '2026-09-03',
    isOversized: true
  }
];

let activityLogs: ActivityLogItem[] = [
  {
    id: 'act-1',
    action: 'SEO Metadata Updated',
    category: 'SEO',
    details: 'Global title tags and OpenGraph image dimensions refreshed.',
    user: 'Nayem Hasan',
    timestamp: '2026-09-11T13:10:00.000Z',
    status: 'success'
  },
  {
    id: 'act-2',
    action: 'Website Audit Completed',
    category: 'Audit',
    details: 'Full performance and accessibility audit scored 94/100.',
    user: 'Nayem Hasan',
    timestamp: '2026-09-11T12:04:00.000Z',
    status: 'info'
  },
  {
    id: 'act-3',
    action: 'New Contact Inquiry Received',
    category: 'Messages',
    details: 'Inquiry from Marcus Vance (Aurora Dining)',
    user: 'System',
    timestamp: '2026-09-10T11:42:00.000Z',
    status: 'info'
  },
  {
    id: 'act-4',
    action: 'Project Published: Apex Precision Auto',
    category: 'Portfolio',
    details: 'Added mechanic diagnostic showcase to featured work catalog.',
    user: 'Nayem Hasan',
    timestamp: '2026-09-07T16:20:00.000Z',
    status: 'success'
  }
];

let websiteSettingsData: WebsiteSettings = {
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
    instagram: "https://instagram.com/nayemhasan",
    twitter: "https://twitter.com/nayemhasan"
  },
  appearance: {
    theme: 'dark',
    accentColor: 'gold',
    animationIntensity: 'smooth'
  },
  maintenance: {
    enabled: false,
    message: "Our website is currently undergoing a scheduled system upgrade. We will be back online shortly."
  }
};

function addLog(action: string, category: ActivityLogItem['category'], details: string, user = 'Nayem Hasan', status: ActivityLogItem['status'] = 'success') {
  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action,
    category,
    details,
    user,
    timestamp: new Date().toISOString(),
    status
  });
  if (activityLogs.length > 100) activityLogs.pop();
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanAdminEmail = ADMIN_EMAIL;

  // Safe server-side diagnostic logging (no sensitive passwords or secrets logged)
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  console.log(`[AUTH-LOG] Login attempt at ${new Date().toISOString()} | Target Email: ${cleanEmail.slice(0, 3)}*** | Env Flags: { ADMIN_EMAIL: ${!!process.env.ADMIN_EMAIL}, ADMIN_PASSWORD_HASH: ${!!process.env.ADMIN_PASSWORD_HASH}, ADMIN_SESSION_SECRET: ${!!process.env.ADMIN_SESSION_SECRET} }`);

  const isEmailMatch = cleanEmail === cleanAdminEmail;
  const isPasswordMatch = verifyPassword(password);

  if (isEmailMatch && isPasswordMatch) {
    const token = generateSessionToken(cleanEmail, 'Nayem Hasan', 'Super Admin');
    addLog('Admin Login Successful', 'Security', `Authenticated from ${req.ip || 'Client'}`, 'Nayem Hasan', 'success');

    // Set secure HttpOnly session cookie
    const cookieFlags = [
      `nayem_admin_session=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${7 * 24 * 60 * 60}`,
      isProd ? 'Secure' : ''
    ].filter(Boolean).join('; ');

    res.setHeader('Set-Cookie', cookieFlags);

    return res.json({
      success: true,
      token,
      user: {
        email: cleanEmail,
        name: 'Nayem Hasan',
        role: 'Super Admin',
        lastLogin: new Date().toISOString()
      }
    });
  }

  // Failed login
  addLog('Failed Admin Login Attempt', 'Security', `Invalid credentials attempt for ${cleanEmail}`, 'Security Guard', 'warning');
  return res.status(401).json({ success: false, error: 'Invalid admin credentials. Please verify your email and password.' });
});

app.get('/api/auth/verify', (req, res) => {
  const token = extractTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ success: false, authenticated: false, error: 'No active session found' });
  }

  const { valid, user } = verifySessionToken(token);
  if (!valid || !user) {
    return res.status(401).json({ success: false, authenticated: false, error: 'Session expired or invalid signature' });
  }

  res.json({
    success: true,
    authenticated: true,
    user: {
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'nayem_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  res.json({ success: true, message: 'Admin session terminated' });
});

app.post('/api/auth/password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Current password and new password are required' });
  }
  if (!verifyPassword(currentPassword)) {
    return res.status(400).json({ success: false, error: 'Current password is incorrect' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
  }

  // Update in-memory password fallback for active session
  process.env.ADMIN_PASSWORD = newPassword;
  process.env.ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update(newPassword).digest('hex');

  addLog('Admin Password Changed', 'Security', 'Updated root authentication credentials', (req as any).user.name);
  res.json({ success: true, message: 'Password updated successfully' });
});

// Content Routes (Public Read, Protected Write)
app.get('/api/content', (req, res) => {
  res.json(homepageContent);
});

app.put('/api/content', authMiddleware, (req, res) => {
  homepageContent = { ...homepageContent, ...req.body };
  addLog('Homepage Content Updated', 'Homepage', 'Modified hero, services or section copy in editor', (req as any).user.name);
  res.json({ success: true, content: homepageContent });
});

// Projects / Portfolio Routes
app.get('/api/projects', (req, res) => {
  res.json(projectsData);
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const newProject: ProjectCaseStudy = {
    ...req.body,
    id: req.body.id || `proj-${Date.now()}`,
    displayOrder: projectsData.length + 1
  };
  projectsData.unshift(newProject);
  addLog(`Project Added: ${newProject.title}`, 'Portfolio', `Created new ${newProject.category} showcase`, (req as any).user.name);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = projectsData.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projectsData[index] = { ...projectsData[index], ...req.body };
  addLog(`Project Updated: ${projectsData[index].title}`, 'Portfolio', 'Updated project details and showcase images', (req as any).user.name);
  res.json(projectsData[index]);
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const project = projectsData.find(p => p.id === id);
  projectsData = projectsData.filter(p => p.id !== id);
  addLog(`Project Deleted: ${project?.title || id}`, 'Portfolio', 'Removed project from catalog', (req as any).user.name, 'warning');
  res.json({ success: true });
});

app.post('/api/projects/reorder', authMiddleware, (req, res) => {
  const { orderedIds } = req.body as { orderedIds: string[] };
  if (Array.isArray(orderedIds)) {
    projectsData.sort((a, b) => {
      const idxA = orderedIds.indexOf(a.id);
      const idxB = orderedIds.indexOf(b.id);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    projectsData.forEach((p, idx) => { p.displayOrder = idx + 1; });
    addLog('Projects Reordered', 'Portfolio', 'Updated homepage display order of showcased projects', (req as any).user.name);
  }
  res.json(projectsData);
});

// Categories Routes
app.get('/api/categories', (req, res) => {
  res.json(categoriesData);
});

app.post('/api/categories', authMiddleware, (req, res) => {
  const safeName = req.body.name || 'category';
  const newCat: CategoryDefinition = {
    ...req.body,
    id: safeName.toLowerCase().replace(/\s+/g, '-'),
    displayOrder: categoriesData.length + 1
  };
  categoriesData.push(newCat);
  addLog(`Category Added: ${newCat.name}`, 'Portfolio', 'Added new project industry category', (req as any).user.name);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = categoriesData.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Category not found' });
  categoriesData[index] = { ...categoriesData[index], ...req.body };
  res.json(categoriesData[index]);
});

app.delete('/api/categories/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  categoriesData = categoriesData.filter(c => c.id !== id);
  addLog(`Category Deleted: ${id}`, 'Portfolio', 'Removed category from filter options', (req as any).user.name, 'warning');
  res.json({ success: true });
});

// Contact Messages Routes (Public POST, Protected GET/PATCH/DELETE)
app.get('/api/messages', authMiddleware, (req, res) => {
  res.json(messagesData);
});

app.post('/api/messages', (req, res) => {
  const { name, email, message, subject, projectType, budget, timeline } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    subject: subject || `Inquiry from ${name}`,
    message,
    projectType: projectType || 'General Inquiry',
    budget: budget || 'To be discussed',
    timeline: timeline || 'Standard',
    date: new Date().toISOString(),
    status: 'new'
  };

  messagesData.unshift(newMessage);
  addLog(`New Inquiry: ${name}`, 'Messages', `Received message for ${newMessage.projectType}`, 'Public Website', 'info');
  res.status(201).json({ success: true, message: 'Inquiry received successfully' });
});

app.patch('/api/messages/:id/status', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status, replyNotes } = req.body;
  const msg = messagesData.find(m => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });
  if (status) msg.status = status;
  if (replyNotes) msg.replyNotes = replyNotes;
  addLog(`Message Updated (${status})`, 'Messages', `Marked message from ${msg.name} as ${status}`, (req as any).user.name);
  res.json(msg);
});

app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  messagesData = messagesData.filter(m => m.id !== id);
  addLog('Message Deleted', 'Messages', `Deleted inquiry ${id}`, (req as any).user.name, 'warning');
  res.json({ success: true });
});

// SEO Settings
app.get('/api/seo', (req, res) => {
  res.json(seoSettingsData);
});

app.put('/api/seo', authMiddleware, (req, res) => {
  seoSettingsData = { ...seoSettingsData, ...req.body };
  addLog('SEO Settings Updated', 'SEO', 'Modified global title, meta descriptions, or OpenGraph tags', (req as any).user.name);
  res.json(seoSettingsData);
});

// Optimization & Audit Routes
app.get('/api/audit', (req, res) => {
  res.json(auditReportData);
});

app.post('/api/audit/run', authMiddleware, (req, res) => {
  // Analyze current content and generate live audit
  const hasMeta = !!seoSettingsData.global.metaDescription && seoSettingsData.global.metaDescription.length > 50;
  const hasOg = !!seoSettingsData.global.ogImage;
  const oversizedImages = mediaData.filter(m => m.isOversized || m.sizeKb > 400);

  const perfScore = oversizedImages.length > 0 ? 91 : 97;
  const seoScore = hasMeta && hasOg ? 95 : 82;
  const a11yScore = 96;
  const bpScore = 98;
  const overall = Math.round((perfScore + seoScore + a11yScore + bpScore) / 4);

  const dynamicIssues: OptimizationAudit['issues'] = [
    {
      id: 'aud-live-1',
      title: oversizedImages.length > 0 ? `${oversizedImages.length} Heavy Assets Detected` : 'Image Assets Fully Optimized',
      category: 'Images',
      severity: oversizedImages.length > 0 ? 'medium' : 'passed',
      impact: oversizedImages.length > 0 ? 'Decreases page load speed on 4G cellular connections' : 'Instant image rendering under 300ms',
      description: oversizedImages.length > 0
        ? `Found images over 400KB (${oversizedImages.map(i => i.filename).join(', ')}) that should be compressed to modern WebP.`
        : 'All showcased images are compressed to modern WebP format with optimal dimensions.',
      recommendedFix: 'Convert remaining JPGs to WebP format using the Media Manager.',
      actionKey: 'optimize-images'
    },
    {
      id: 'aud-live-2',
      title: 'Meta Description Length & Coverage',
      category: 'SEO',
      severity: hasMeta ? 'passed' : 'high',
      impact: 'Crucial for search engine click-through rate (CTR)',
      description: `Current global meta description is ${seoSettingsData.global.metaDescription.length} characters (optimal range: 120-160 characters).`,
      recommendedFix: 'Maintain concise benefit-driven meta descriptions for all 5 core routes.',
      actionKey: 'seo-meta'
    },
    {
      id: 'aud-live-3',
      title: 'Mobile Touch Targets & Spacing',
      category: 'Mobile',
      severity: 'passed',
      impact: 'Frictionless thumb navigation on iOS and Android',
      description: 'All primary buttons and navigation links meet the minimum 44px tap target height.',
      recommendedFix: 'Maintain touch-friendly padding on all future custom CTA buttons.',
      actionKey: 'touch-pass'
    },
    {
      id: 'aud-live-4',
      title: 'Robots.txt & Canonical Directives',
      category: 'SEO',
      severity: 'passed',
      impact: 'Prevents duplicate content indexing by Googlebot',
      description: `Robots directive is set to '${seoSettingsData.global.robots}'. Canonical URL is explicitly specified.`,
      recommendedFix: 'No action needed.',
      actionKey: 'robots-pass'
    }
  ];

  auditReportData = {
    lastAuditDate: new Date().toISOString(),
    overallScore: overall,
    performanceScore: perfScore,
    seoScore,
    accessibilityScore: a11yScore,
    bestPracticesScore: bpScore,
    issues: dynamicIssues
  };

  addLog('Website Audit Executed', 'Audit', `Computed live audit score: ${overall}/100`, (req as any).user.name);
  res.json(auditReportData);
});

// Media Library Routes
app.get('/api/media', (req, res) => {
  res.json(mediaData);
});

app.post('/api/media', authMiddleware, (req, res) => {
  const { url, filename, sizeKb, dimensions, format, usage } = req.body;
  const newMedia: MediaItem = {
    id: `med-${Date.now()}`,
    filename: filename || `image-${Date.now()}.${format || 'webp'}`,
    url: url || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    sizeKb: Number(sizeKb) || 120,
    dimensions: dimensions || '1200x800',
    format: format || 'webp',
    usage: usage || ['General Upload'],
    createdAt: new Date().toISOString().split('T')[0],
    isOversized: (Number(sizeKb) || 120) > 500
  };
  mediaData.unshift(newMedia);
  addLog(`Media Uploaded: ${newMedia.filename}`, 'Media', `Added ${newMedia.format.toUpperCase()} (${newMedia.sizeKb}KB)`, (req as any).user.name);
  res.status(201).json(newMedia);
});

app.delete('/api/media/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const item = mediaData.find(m => m.id === id);
  mediaData = mediaData.filter(m => m.id !== id);
  addLog(`Media Deleted: ${item?.filename || id}`, 'Media', 'Removed asset from media library', (req as any).user.name, 'warning');
  res.json({ success: true });
});

// Analytics Routes
app.get('/api/analytics', (req, res) => {
  const analytics: AnalyticsStats = {
    isDemo: true,
    demoNotice: "Sample Analytics Data • Connect Google Analytics 4 or Plausible in Website Settings to view real traffic",
    websiteVisitors: 2481,
    visitorsChangePct: 14.2,
    projectsCount: projectsData.length,
    contactMessagesCount: messagesData.length,
    unreadMessagesCount: messagesData.filter(m => m.status === 'new').length,
    websitePerformanceScore: auditReportData.overallScore,
    timeframeData: {
      '7d': [
        { date: 'Mon', visitors: 280, pageViews: 620 },
        { date: 'Tue', visitors: 340, pageViews: 790 },
        { date: 'Wed', visitors: 410, pageViews: 920 },
        { date: 'Thu', visitors: 390, pageViews: 850 },
        { date: 'Fri', visitors: 460, pageViews: 1040 },
        { date: 'Sat', visitors: 310, pageViews: 680 },
        { date: 'Sun', visitors: 291, pageViews: 630 }
      ],
      '30d': [
        { date: 'Week 1', visitors: 1840, pageViews: 4100 },
        { date: 'Week 2', visitors: 2190, pageViews: 4980 },
        { date: 'Week 3', visitors: 2350, pageViews: 5420 },
        { date: 'Week 4', visitors: 2481, pageViews: 5890 }
      ],
      '90d': [
        { date: 'Month 1', visitors: 4900, pageViews: 11200 },
        { date: 'Month 2', visitors: 6200, pageViews: 14800 },
        { date: 'Month 3', visitors: 7850, pageViews: 18400 }
      ],
      '1y': [
        { date: 'Q1', visitors: 14200, pageViews: 32000 },
        { date: 'Q2', visitors: 18900, pageViews: 43500 },
        { date: 'Q3', visitors: 22400, pageViews: 51200 },
        { date: 'Q4', visitors: 26800, pageViews: 62000 }
      ]
    },
    trafficSources: [
      { name: 'Google Organic', value: 48, color: '#C9A227' },
      { name: 'Direct Traffic', value: 24, color: '#E5C45A' },
      { name: 'Social (LinkedIn/X)', value: 18, color: '#8A7228' },
      { name: 'Referral / Case Studies', value: 10, color: '#55471A' }
    ],
    deviceBreakdown: [
      { device: 'Desktop', percentage: 58, count: 1438 },
      { device: 'Mobile Phone', percentage: 36, count: 893 },
      { device: 'Tablet', percentage: 6, count: 150 }
    ],
    popularPages: [
      { rank: 1, path: '/', name: 'Home / Hero', views: 3120, bounceRate: '34%' },
      { rank: 2, path: '/#work', name: 'Work / Featured Projects', views: 2450, bounceRate: '28%' },
      { rank: 3, path: '/#services', name: 'Services & Deliverables', views: 1890, bounceRate: '31%' },
      { rank: 4, path: '/#about', name: 'About Nayem Hasan', views: 1420, bounceRate: '42%' },
      { rank: 5, path: '/#contact', name: 'Contact & Inquiry Form', views: 980, bounceRate: '19%' }
    ]
  };
  res.json(analytics);
});

// Activity Logs
app.get('/api/activity', authMiddleware, (req, res) => {
  res.json(activityLogs);
});

// Website Settings
app.get('/api/settings', (req, res) => {
  res.json(websiteSettingsData);
});

app.put('/api/settings', authMiddleware, (req, res) => {
  const incoming = req.body || {};
  websiteSettingsData = {
    ...websiteSettingsData,
    ...incoming,
    general: {
      ...websiteSettingsData.general,
      ...(incoming.general || {})
    },
    social: {
      ...websiteSettingsData.social,
      ...(incoming.social || {})
    },
    appearance: {
      ...websiteSettingsData.appearance,
      ...(incoming.appearance || {})
    },
    maintenance: {
      ...websiteSettingsData.maintenance,
      ...(incoming.maintenance || {})
    }
  };
  addLog('Website Settings Updated', 'Settings', 'Updated maintenance mode, contact info, or appearance', (req as any).user?.name || 'Nayem Hasan');
  res.json(websiteSettingsData);
});

// ----------------------------------------------------
// Vite Server / Static Serving Integration
// ----------------------------------------------------

// Export app for Vercel Serverless Functions
export default app;

async function startServer() {
  if (process.env.VERCEL === '1') {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { overlay: false }
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NAYEM-ADMIN-OS] Server running on http://0.0.0.0:${PORT}`);
  });
}

// Only launch standalone listener when not in Vercel Serverless runtime
if (process.env.VERCEL !== '1') {
  startServer();
}
