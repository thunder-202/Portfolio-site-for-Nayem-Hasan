import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Utility to compute lighter/darker color shades and rgba values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num) || cleanHex.length !== 6) {
    return { r: 201, g: 162, b: 39 }; // Fallback gold #C9A227
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (val: number) => Math.min(255, Math.max(0, Math.round(val + (255 - val) * (percent / 100))));
  const rNew = adjust(r);
  const gNew = adjust(g);
  const bNew = adjust(b);
  return `#${((1 << 24) + (rNew << 16) + (gNew << 8) + bNew).toString(16).slice(1)}`;
}

export const DynamicThemeAndSeo: React.FC = () => {
  const { settings, seoSettings, homepageContent } = usePortfolio();

  // 1. Dynamic SEO & Meta Synchronization
  useEffect(() => {
    const brandName = settings?.general?.siteName || settings?.general?.websiteName || settings?.general?.name || "Nayem Hasan";
    const defaultTitle = `${brandName} — Digital Marketer & Web Developer | High-Converting Business Websites`;
    const defaultDesc = "Specialist in building high-converting websites, modern web systems, and digital solutions for restaurants, auto detailing studios, mechanics, and local businesses.";
    
    const activeTitle = seoSettings?.global?.websiteTitle || defaultTitle;
    const activeDesc = seoSettings?.global?.metaDescription || settings?.general?.tagline || defaultDesc;
    const activeKeywords = seoSettings?.global?.keywords || "Nayem Hasan, Web Developer, Digital Marketer, Restaurant Websites, Automotive Detailing Web Design, Local SEO";
    const activeAuthor = seoSettings?.global?.author || settings?.general?.name || "Nayem Hasan";
    const activeRobots = seoSettings?.global?.robots || "index, follow";
    const activeOgTitle = seoSettings?.global?.ogTitle || activeTitle;
    const activeOgDesc = seoSettings?.global?.ogDescription || activeDesc;
    const activeOgImage = seoSettings?.global?.ogImage || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80";
    const activeCanonical = seoSettings?.global?.canonicalUrl || settings?.general?.domain || "https://nayemhasan.com";

    // Set Document Title
    document.title = activeTitle;

    // Helper to update or create meta tags
    const updateMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('name', 'description', activeDesc);
    updateMeta('name', 'keywords', activeKeywords);
    updateMeta('name', 'author', activeAuthor);
    updateMeta('name', 'robots', activeRobots);
    updateMeta('property', 'og:title', activeOgTitle);
    updateMeta('property', 'og:description', activeOgDesc);
    updateMeta('property', 'og:image', activeOgImage);
    updateMeta('property', 'og:url', activeCanonical);
    updateMeta('property', 'og:type', 'website');
    updateMeta('name', 'twitter:title', activeOgTitle);
    updateMeta('name', 'twitter:description', activeOgDesc);
    updateMeta('name', 'twitter:image', activeOgImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', activeCanonical);

    // Favicon link if specified
    if (settings?.general?.faviconUrl) {
      let iconLink = document.querySelector('link[rel="icon"]');
      if (!iconLink) {
        iconLink = document.createElement('link');
        iconLink.setAttribute('rel', 'icon');
        document.head.appendChild(iconLink);
      }
      iconLink.setAttribute('href', settings.general.faviconUrl);
    }

    // Google Site Verification
    if (seoSettings?.global?.googleSiteVerification) {
      updateMeta('name', 'google-site-verification', seoSettings.global.googleSiteVerification);
    }

    // JSON-LD Schema.org Structured Data
    let schemaScript = document.getElementById('dynamic-schema-ld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'dynamic-schema-ld');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": brandName,
      "jobTitle": settings?.general?.tagline || "Digital Marketer & Web Developer",
      "url": activeCanonical,
      "email": settings?.general?.contactEmail || settings?.general?.email || "websitedeldevelop@gmail.com",
      "telephone": settings?.general?.contactPhone || settings?.general?.phone || "+880 1700-000000",
      "description": activeDesc,
      "sameAs": [
        settings?.social?.github,
        settings?.social?.linkedin,
        settings?.social?.twitter,
        settings?.social?.facebook,
        settings?.social?.instagram
      ].filter(Boolean),
      "knowsAbout": ["Web Development", "UI/UX Design", "Digital Marketing", "Local SEO", "High-Converting Business Websites"]
    };
    schemaScript.textContent = JSON.stringify(schemaData, null, 2);
  }, [settings, seoSettings, homepageContent]);

  // 2. Dynamic Theme & Accent Color Styling Injection
  useEffect(() => {
    const rawAccent = settings?.appearance?.accentColor || '#C9A227';
    const accentColor = rawAccent.startsWith('#') ? rawAccent : '#C9A227';
    const lighterAccent = adjustBrightness(accentColor, 25);
    const { r, g, b } = hexToRgb(accentColor);
    const { r: rL, g: gL, b: bL } = hexToRgb(lighterAccent);

    // Hero specific colors
    const heroBg = settings?.appearance?.heroBgColor || homepageContent?.hero?.heroBgColor || '#050505';
    const heroTextColor = settings?.appearance?.heroTextColor || homepageContent?.hero?.heroTextColor || '#F5F2EA';
    const heroAccentColor = settings?.appearance?.heroAccentTextColor || settings?.appearance?.accentColor || homepageContent?.hero?.heroAccentTextColor || '#E5C45A';
    const { r: rHero, g: gHero, b: bHero } = hexToRgb(heroAccentColor);

    const fontFamily = settings?.appearance?.fontFamily || 'Plus Jakarta Sans';
    const themeMode = settings?.appearance?.theme || 'dark';

    let styleEl = document.getElementById('dynamic-portfolio-theme-overrides');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('id', 'dynamic-portfolio-theme-overrides');
      document.head.appendChild(styleEl);
    }

    // Base background and text colors depending on theme
    let bgBase = '#080808';
    let cardBase = '#111111';
    let borderBase = '#1f1f1f';

    if (themeMode === 'luxury-gold') {
      bgBase = '#060503';
      cardBase = '#0f0c08';
      borderBase = `rgba(${r}, ${g}, ${b}, 0.25)`;
    } else if (themeMode === 'minimal') {
      bgBase = '#0a0a0a';
      cardBase = '#141414';
      borderBase = '#262626';
    }

    styleEl.textContent = `
      :root {
        --accent-primary: ${accentColor};
        --accent-hover: ${lighterAccent};
        --accent-rgb: ${r}, ${g}, ${b};
        --accent-light-rgb: ${rL}, ${gL}, ${bL};
        --accent-glow: rgba(${r}, ${g}, ${b}, 0.3);
        --accent-glow-subtle: rgba(${r}, ${g}, ${b}, 0.08);
        --accent-glow-intense: rgba(${r}, ${g}, ${b}, 0.6);
        --hero-bg-color: ${heroBg};
        --hero-text-color: ${heroTextColor};
        --hero-accent-color: ${heroAccentColor};
        --hero-accent-rgb: ${rHero}, ${gHero}, ${bHero};
        --font-body: '${fontFamily}', sans-serif;
      }

      body {
        font-family: var(--font-body);
        background-color: ${bgBase};
      }

      /* Hero Specific Dynamic Background & Golden Typography */
      #hero {
        background-color: var(--hero-bg-color) !important;
      }

      #hero-main-headline {
        color: var(--hero-text-color) !important;
      }

      #hero-main-headline .hero-golden-highlight,
      #hero .hero-golden-highlight,
      #hero .hero-accent-text {
        color: var(--hero-accent-color) !important;
        text-shadow: 0 0 35px rgba(var(--hero-accent-rgb), 0.3);
      }

      /* Dynamically override hardcoded gold tokens with the active accent color */
      .text-\\[\\#C9A227\\], 
      [class*="text-[#C9A227]"],
      .text-accent {
        color: var(--accent-primary) !important;
      }

      .text-\\[\\#E5C45A\\], 
      [class*="text-[#E5C45A]"],
      .text-accent-light {
        color: var(--accent-hover) !important;
      }

      .bg-\\[\\#C9A227\\], 
      [class*="bg-[#C9A227]"],
      .bg-accent {
        background-color: var(--accent-primary) !important;
      }

      .bg-\\[\\#E5C45A\\], 
      [class*="bg-[#E5C45A]"],
      .bg-accent-light {
        background-color: var(--accent-hover) !important;
      }

      .border-\\[\\#C9A227\\], 
      [class*="border-[#C9A227]"],
      .border-accent {
        border-color: var(--accent-primary) !important;
      }

      .border-\\[\\#E5C45A\\], 
      [class*="border-[#E5C45A]"],
      .border-accent-light {
        border-color: var(--accent-hover) !important;
      }

      /* Hover States */
      .hover\\:text-\\[\\#E5C45A\\]:hover,
      .hover\\:text-\\[\\#C9A227\\]:hover,
      .group:hover .group-hover\\:text-\\[\\#E5C45A\\],
      .group:hover .group-hover\\:text-\\[\\#C9A227\\] {
        color: var(--accent-hover) !important;
      }

      .hover\\:bg-\\[\\#C9A227\\]:hover,
      .hover\\:bg-\\[\\#E5C45A\\]:hover,
      .group:hover .group-hover\\:bg-\\[\\#C9A227\\] {
        background-color: var(--accent-hover) !important;
      }

      .hover\\:border-\\[\\#C9A227\\]:hover,
      .hover\\:border-\\[\\#E5C45A\\]:hover,
      .group:hover .group-hover\\:border-\\[\\#C9A227\\],
      .group:hover .group-hover\\:border-\\[\\#E5C45A\\] {
        border-color: var(--accent-hover) !important;
      }

      /* Subtle Opacity and Alpha Accents */
      .bg-\\[\\#C9A227\\]\\/\\[0\\.03\\],
      .bg-\\[\\#C9A227\\]\\/\\[0\\.04\\],
      .bg-\\[\\#C9A227\\]\\/\\[0\\.06\\],
      .bg-\\[\\#C9A227\\]\\/\\[0\\.07\\] {
        background-color: var(--accent-glow-subtle) !important;
      }

      .border-\\[\\#C9A227\\]\\/30,
      .border-\\[\\#C9A227\\]\\/40,
      .border-\\[\\#C9A227\\]\\/20,
      .border-\\[\\#C9A227\\]\\/15 {
        border-color: rgba(var(--accent-rgb), 0.3) !important;
      }

      /* Luxury Text Gradients & Button Shadows */
      .luxury-gradient-text {
        background: linear-gradient(135deg, #F5F2EA 0%, var(--accent-hover) 50%, var(--accent-primary) 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }

      .gold-border {
        border-color: rgba(var(--accent-rgb), 0.25) !important;
      }

      .gold-border-glow:hover {
        border-color: var(--accent-hover) !important;
        box-shadow: 0 0 25px -5px var(--accent-glow) !important;
      }

      ::selection {
        background-color: rgba(var(--accent-rgb), 0.35) !important;
        color: var(--accent-hover) !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-primary) !important;
      }

      /* Ambient Glow Gradients */
      .subtle-grid-bg {
        background-size: 40px 40px;
        background-image: 
          linear-gradient(to right, rgba(var(--accent-rgb), 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(var(--accent-rgb), 0.035) 1px, transparent 1px) !important;
      }
    `;
  }, [settings?.appearance, homepageContent?.hero]);

  return null;
};
