/**
 * Utility functions for capturing and generating live website hero section screenshots,
 * URL sanitization, and automated metadata extraction for portfolio showcases.
 */

export function sanitizeWebsiteUrl(url: string): string {
  if (!url) return '';
  let clean = url.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }
  return clean;
}

/**
 * Returns a high-resolution screenshot URL targeting the heroic/top section of any web page.
 * Uses WordPress mshots as the primary high-reliability provider with fallback capability.
 */
export function getWebsiteHeroScreenshot(url: string, provider: 'mshots' | 'thum' | 'microlink' = 'mshots'): string {
  const clean = sanitizeWebsiteUrl(url);
  if (!clean) return '';

  if (provider === 'thum') {
    // thum.io generates 1200x800 crop of top heroic section
    return `https://image.thum.io/get/width/1200/crop/800/noanimate/${clean}`;
  }

  if (provider === 'microlink') {
    return `https://api.microlink.io?url=${encodeURIComponent(clean)}&screenshot=true&meta=false&embed=screenshot.url`;
  }

  // WordPress mshots is extremely reliable, high uptime, and captures the top fold (heroic section)
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(clean)}?w=1280`;
}

/**
 * Automatically extracts clean project metadata, domain name, niche, and hero screenshot from a URL.
 */
export function deriveProjectDetailsFromUrl(url: string, customTitle?: string, customCategory?: string) {
  const cleanUrl = sanitizeWebsiteUrl(url);
  let hostname = '';
  try {
    hostname = new URL(cleanUrl).hostname.replace(/^www\./, '');
  } catch {
    hostname = cleanUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  const namePart = hostname.split('.')[0] || 'Website Showcase';
  const autoTitle = customTitle?.trim() || namePart
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const lower = (cleanUrl + ' ' + autoTitle).toLowerCase();
  let cat = customCategory || 'Restaurant';
  let ind = 'Hospitality & Dining';
  let fallbackImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80';

  if (lower.includes('cafe') || lower.includes('coffee') || lower.includes('roast') || lower.includes('bean') || lower.includes('brew')) {
    cat = 'Café';
    ind = 'Specialty Coffee & Roastery';
    fallbackImage = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80';
  } else if (lower.includes('auto') || lower.includes('detail') || lower.includes('car') || lower.includes('spa') || lower.includes('ceramic')) {
    cat = 'Automotive';
    ind = 'Automotive Detailing & Care';
    fallbackImage = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1400&q=80';
  } else if (lower.includes('repair') || lower.includes('mechanic') || lower.includes('tire') || lower.includes('garage') || lower.includes('motor')) {
    cat = 'Mechanic';
    ind = 'Auto Repair & Diagnostics';
    fallbackImage = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1400&q=80';
  } else if (lower.includes('shop') || lower.includes('store') || lower.includes('boutique') || lower.includes('market') || lower.includes('ecommerce') || lower.includes('clothing')) {
    cat = 'E-commerce';
    ind = 'Retail & E-commerce';
    fallbackImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80';
  } else if (lower.includes('barber') || lower.includes('salon') || lower.includes('fitness') || lower.includes('gym') || lower.includes('clinic') || lower.includes('service') || lower.includes('plumb')) {
    cat = 'Local Business';
    ind = 'Local Professional Services';
    fallbackImage = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80';
  }

  // The hero screenshot captures the real website's top fold
  const heroScreenshot = cleanUrl ? getWebsiteHeroScreenshot(cleanUrl) : fallbackImage;

  return {
    title: autoTitle,
    subtitle: `${cat} digital experience platform`,
    category: cat,
    industry: ind,
    projectType: 'Showcase' as const,
    type: 'Client Project / Showcase',
    status: 'Live' as const,
    summary: `High-converting digital presence and streamlined mobile booking platform built for ${autoTitle}.`,
    coverImage: heroScreenshot,
    desktopPreviewImage: heroScreenshot,
    mobilePreviewImage: cleanUrl ? getWebsiteHeroScreenshot(cleanUrl, 'mshots') : fallbackImage,
    websiteUrl: cleanUrl,
    previewUrl: cleanUrl,
    githubUrl: '',
    projectDate: '2026',
    featured: true,
    visible: true,
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive UX'],
    deliverables: ['Custom Web Architecture', 'Hero Section Conversion Layout', 'Local SEO Schema'],
    keyFeatures: [
      { title: 'Hero Section Showcase', description: 'Immediate value proposition and conversion architecture above the fold.' },
      { title: 'Direct Customer Inquiries', description: 'Optimized touchpoints for call-to-actions and bookings.' }
    ],
    uxDecisions: [
      { title: 'High-Contrast Visual Hierarchy', reasoning: 'Ensures optimal readability and brand authority.' }
    ],
    resultsAndTakeaways: ['High-performance digital presence ready for prospective customers.']
  };
}
