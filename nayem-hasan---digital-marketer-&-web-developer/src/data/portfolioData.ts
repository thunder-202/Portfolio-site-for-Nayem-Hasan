import { ProjectCaseStudy, ServiceItem, ProcessStep, SkillCategory, IndustryItem } from '../types';

export const PERSONAL_INFO = {
  name: "Nayem Hasan",
  role: "Digital Marketer • Web Developer",
  subRole: "DIGITAL • WEB • GROWTH",
  tagline: "I Build Digital Experiences That Help Businesses Get Noticed.",
  shortBio: "I design and build premium websites and digital solutions that help local businesses present themselves professionally, attract customers, and turn online visitors into real inquiries.",
  email: "websitedeldevelop@gmail.com",
  phone: "+880 1700-000000",
  location: "Dhaka, Bangladesh (Available Globally)",
  availability: "Available for new projects",
  experienceYears: "3+",
  projectsCount: "30+",
  industriesCount: "8+",
  supportUptime: "24/7 Focused on Quality",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  }
};

export const QUICK_STATS = [
  {
    value: "3+",
    label: "Years Learning & Building",
    subtext: "Continuous code, UX & digital marketing craft"
  },
  {
    value: "30+",
    label: "Projects & Experiments",
    subtext: "Showcases, concepts & client-ready architectures"
  },
  {
    value: "Multiple",
    label: "Business Industries",
    subtext: "Dining, automotive, detailing & service brands"
  },
  {
    value: "24/7",
    label: "Always Improving",
    subtext: "Modern web standards, SEO & conversion UX"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    title: "Website Development",
    tagline: "Modern, fast & resilient web engineering",
    description: "Modern, responsive websites designed around the business and its customers. Built with pristine HTML, clean modern React/JavaScript, and optimized for ultra-fast loading across all devices.",
    deliverables: [
      "Custom responsive layouts",
      "Clean semantic code structure",
      "Cross-browser performance optimization",
      "Interactive forms & lead capture"
    ],
    icon: "Code2"
  },
  {
    number: "02",
    title: "UI / UX Design",
    tagline: "Intuitive journeys & high-end visual polish",
    description: "Clean interfaces, intuitive navigation, strong visual hierarchy, and conversion-focused user experiences. Crafting an aesthetic presence that commands credibility from the first second.",
    deliverables: [
      "Brand-aligned color & typography hierarchy",
      "Frictionless customer booking journeys",
      "Mobile-first responsive wireframing",
      "Interactive design prototypes"
    ],
    icon: "Layout"
  },
  {
    number: "03",
    title: "Digital Marketing",
    tagline: "Targeted visibility & customer acquisition",
    description: "Digital marketing strategies designed to improve visibility, reach the right audience, and generate opportunities. Integrating on-page SEO, local search presence, and conversion analytics.",
    deliverables: [
      "On-page & Local SEO architecture",
      "Google Business Profile optimization tactics",
      "Conversion rate optimization (CRO)",
      "Targeted lead funnel blueprints"
    ],
    icon: "TrendingUp"
  },
  {
    number: "04",
    title: "Business Websites",
    tagline: "Purpose-built digital hubs for local brands",
    description: "Professional online systems for restaurants, cafés, automotive businesses, detailing shops, mechanics, and local service companies that turn visitors into phone calls, bookings, and foot traffic.",
    deliverables: [
      "Interactive digital menus & catalogs",
      "Service quotation & appointment workflows",
      "Click-to-call & Google Maps directions",
      "Trust badge & customer reassurance sections"
    ],
    icon: "Briefcase"
  }
];

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "luxury-dine",
    title: "Luxury Dine",
    subtitle: "Fine Dining & Culinary Experience Platform",
    category: "Restaurant • UI/UX • Web Development",
    type: "Concept / Showcase",
    industry: "High-End Gastronomy & Hospitality",
    summary: "Restaurant website concept featuring premium UI, curated culinary menu presentation, integrated table reservations, and immersive visual storytelling.",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    desktopPreviewImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80",
    mobilePreviewImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    clientContext: "High-end dining establishments often struggle with outdated PDF menus, clunky external booking widgets, and websites that fail to reflect the luxury in-house ambiance.",
    businessProblem: "Customers on mobile want to quickly view the menu, verify dietary accommodations, check private dining availability, and secure a reservation in under 60 seconds without friction.",
    designDirection: "Dark, moody aesthetic with warm ambient lighting, elegant typography, generous white space, and micro-interactions that feel as polished as a Michelin-starred service.",
    keyFeatures: [
      {
        title: "Interactive Multi-Course Digital Menu",
        description: "Categorized wine pairings, dietary filters, and chef specials with high-definition dish visuals."
      },
      {
        title: "Direct Table Booking System",
        description: "Frictionless date, time, party-size selection with instant confirmation prompts."
      },
      {
        title: "Private Dining & Event Inquiries",
        description: "Dedicated lead funnel for corporate banquets, anniversaries, and VIP room rentals."
      },
      {
        title: "Location & Valet Directions",
        description: "One-tap GPS navigation, hours of operation, dress code etiquette, and parking guide."
      }
    ],
    uxDecisions: [
      {
        title: "Thumb-Zone Mobile Reservation Bar",
        reasoning: "Placed a persistent 'Book a Table' button in the natural thumb reach on mobile to maximize booking conversion rates."
      },
      {
        title: "HTML-First Menu Structure",
        reasoning: "Eliminated PDF downloads so menu items are 100% readable, indexable by Google Search, and accessible to screen readers."
      }
    ],
    technologies: ["React", "Tailwind CSS", "Semantic HTML5", "Responsive UI", "Local SEO Structured Data"],
    deliverables: ["Full Brand Direction", "Interactive Prototype", "Mobile Responsive Views", "Menu Architecture"],
    resultsAndTakeaways: [
      "Demonstrated how eliminating PDF menus and adding instant reservation UX creates a 3x smoother booking flow.",
      "Showcased high-contrast dark luxury aesthetics tailored to premium hospitality."
    ],
    demoLiveFeatures: ["Menu Filter", "Reservation Form", "Chef's Specials Carousel", "Location Map Card"]
  },
  {
    id: "platinum-auto-spa",
    title: "Platinum Auto Spa",
    subtitle: "Ceramic Coating & Luxury Vehicle Detailing Studio",
    category: "Automotive • Branding • Web Development",
    type: "Concept / Showcase",
    industry: "Automotive Detailing & Surface Protection",
    summary: "Automotive detailing website concept focused on premium vehicle protection packages, transparent tiered pricing, instant quote requests, and visual transformation proof.",
    coverImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1400&q=80",
    desktopPreviewImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=80",
    mobilePreviewImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    clientContext: "Detailing studios often lose high-ticket clients (like exotic & luxury car owners) because their websites look like basic car washes rather than high-end protection specialists.",
    businessProblem: "Vehicle owners need clear package breakdowns (paint correction, ceramic coatings, PPF films), before-and-after evidence, and a hassle-free quote calculation.",
    designDirection: "Industrial precision meets luxury minimalism. Matte carbon-inspired backgrounds, precision gold accent lines, sharp typography, and high-clarity surface reflections.",
    keyFeatures: [
      {
        title: "Interactive Package Comparison Engine",
        description: "Side-by-side breakdown of 3-Year vs 5-Year Ceramic & Paint Correction treatments."
      },
      {
        title: "Instant Vehicle Quote Estimator",
        description: "Interactive selector for vehicle class (Sedan, SUV, Exotic), service level, and add-ons."
      },
      {
        title: "Before & After Surface Showcase",
        description: "Interactive slider showing swirl-mark removal and deep mirror gloss finishes."
      },
      {
        title: "Direct WhatsApp & Call Booking Integration",
        description: "Instant dispatch channels for busy car enthusiasts wanting rapid turnaround."
      }
    ],
    uxDecisions: [
      {
        title: "Visual Before/After Slider",
        reasoning: "Car owners invest in detailing for visual perfection; showing direct side-by-side results builds immediate trust."
      },
      {
        title: "Transparent Step-by-Step Quote Workflow",
        reasoning: "Reduces phone tag by collecting vehicle make, model, and required protection upfront."
      }
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "CSS Grid"],
    deliverables: ["Package Visualizer", "Instant Quote Builder", "Gallery Showcase", "Mobile Optimization"],
    resultsAndTakeaways: [
      "Demonstrated how a specialized package calculator increases lead clarity by 40% compared to standard contact forms.",
      "Showcased automotive-specific branding that appeals to luxury & collector car owners."
    ],
    demoLiveFeatures: ["Package Selector", "Vehicle Size Pricing Matrix", "Transformation Gallery", "VIP Booking Form"]
  },
  {
    id: "curry-express",
    title: "Curry Express",
    subtitle: "Modern Fast-Casual Dining & Express Pickup",
    category: "Restaurant • Web Development",
    type: "Concept / Showcase",
    industry: "Casual Dining & Takeaway",
    summary: "Restaurant website concept focused on lightning-fast menu browsing, clear dietary badges, direct takeaway orders, opening hours, and location accessibility.",
    coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1400&q=80",
    desktopPreviewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    mobilePreviewImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    clientContext: "Local casual restaurants frequently rely solely on third-party food delivery apps that charge 25-30% commissions, losing their direct relationship with local customers.",
    businessProblem: "Customers need to quickly see what's hot, dietary options (Halal, Vegan, Gluten-Free), order directly for pickup, or click to call without getting lost.",
    designDirection: "Warm, appetizing tones with crisp dark typography, prominent appetizing dish photography, and clear actionable CTA buttons.",
    keyFeatures: [
      {
        title: "Fast-Filter Dietary Menu",
        description: "Instant filtering for Vegan, Mild, Spicy, and Chef Special selections without page reloads."
      },
      {
        title: "Direct Pickup Ordering & Click-to-Call",
        description: "Quick 2-click phone order button and direct WhatsApp order dispatch."
      },
      {
        title: "Live Open/Closed Status Indicator",
        description: "Dynamic badge showing whether the kitchen is currently accepting orders."
      },
      {
        title: "Local SEO & Location Map",
        description: "Integrated Google Maps location, opening hours schedule, and parking info."
      }
    ],
    uxDecisions: [
      {
        title: "Zero-Click Opening Status",
        reasoning: "Visitors immediately know if the restaurant is currently open or when the next service starts."
      },
      {
        title: "Optimized Mobile Image Loading",
        reasoning: "Ensured high-resolution food images are compressed for sub-second mobile page loads on 4G networks."
      }
    ],
    technologies: ["React", "Tailwind CSS", "Semantic HTML5", "Local SEO Schema", "Performance Tuning"],
    deliverables: ["Digital Takeaway Menu", "Store Hours Widget", "Google Maps Schema", "Mobile Speed Optimization"],
    resultsAndTakeaways: [
      "Demonstrated how local eateries can capture direct orders and avoid heavy commission fees through direct web contact.",
      "Engineered for 98+ Lighthouse mobile performance score."
    ],
    demoLiveFeatures: ["Dietary Filter", "Quick Call CTA", "Live Kitchen Status", "Popular Combos Grid"]
  },
  {
    id: "apex-precision-auto",
    title: "Apex Precision Auto",
    subtitle: "Certified Auto Repair, Diagnostics & Fleet Maintenance",
    category: "Automotive • Web Development • Local Services",
    type: "Concept / Showcase",
    industry: "Mechanics & Auto Repair Services",
    summary: "Automotive service website concept highlighting certified technician credibility, transparent diagnostic pricing, emergency roadside assistance, and appointment scheduling.",
    coverImage: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80",
    desktopPreviewImage: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1600&q=80",
    mobilePreviewImage: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    clientContext: "Independent auto repair shops often suffer from low customer trust due to opaque pricing and outdated web presences that fail to communicate technical expertise.",
    businessProblem: "Car owners dealing with engine check lights or brake issues need immediate reassurance, transparent inspection rates, and easy appointment booking.",
    designDirection: "Clean engineering aesthetic with dark graphite textures, bold amber/gold safety accents, and clear trust badges (ASE certified, warranty guarantees).",
    keyFeatures: [
      {
        title: "Diagnostic Symptom Checker",
        description: "Interactive guide helping drivers identify warning signs (Brakes, Transmission, AC, Electrical)."
      },
      {
        title: "Service Booking & Bay Scheduling",
        description: "Simple multi-step booking to reserve an inspection slot with preferred technician time."
      },
      {
        title: "Emergency Roadside Dispatch",
        description: "High-visibility tap-to-call emergency towing banner for stranded drivers."
      },
      {
        title: "Warranty & Certification Badges",
        description: "Prominently displayed 24-Month/24,000-Mile warranty promise and certified mechanic credentials."
      }
    ],
    uxDecisions: [
      {
        title: "One-Tap Emergency Emergency Assistance",
        reasoning: "Drivers on the side of the road need immediate assistance without scrolling through marketing copy."
      },
      {
        title: "Transparent Service Price Estimator",
        reasoning: "Demystifies repair costs by showing clear baseline diagnostic pricing up front."
      }
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic Schema", "Accessibility WCAG AA"],
    deliverables: ["Diagnostic Guide", "Service Schedule Flow", "Emergency CTA Layout", "Local SEO Optimization"],
    resultsAndTakeaways: [
      "Built trust-first UI that eliminates customer skepticism around independent mechanics.",
      "Streamlined service booking into 3 intuitive steps."
    ],
    demoLiveFeatures: ["Symptom Checker", "Booking Form", "Emergency Banner", "Service Rates Matrix"]
  },
  {
    id: "velvet-roast-coffee",
    title: "Velvet Roast Coffee",
    subtitle: "Artisanal Specialty Roastery & Espresso Bar",
    category: "Café • UI/UX • Web Development",
    type: "Concept / Showcase",
    industry: "Specialty Coffee & Retail Roastery",
    summary: "Specialty coffee shop and roastery concept featuring single-origin bean selections, brewing guides, subscription inquiries, and community event schedules.",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    desktopPreviewImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80",
    mobilePreviewImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    clientContext: "Local boutique cafés need to build recurring loyalty and expand revenue beyond walk-in coffees into bag sales and private cupping workshops.",
    businessProblem: "Visitors want to explore current single-origin origins, check Wi-Fi/seating vibe, view food pairings, and order beans online.",
    designDirection: "Rich espresso and dark warm tones with cream typography, warm gold accents, and photography showcasing micro-foam latte art and roasted beans.",
    keyFeatures: [
      {
        title: "Single-Origin Bean Flavor Notes Guide",
        description: "Interactive flavor wheel and origin cards with acidity, body, and tasting notes."
      },
      {
        title: "Interactive Brew Guides",
        description: "Step-by-step ratios for V60, Aeropress, French Press, and Espresso."
      },
      {
        title: "Café Vibe & Seating Showcase",
        description: "Work-friendly Wi-Fi speed stats, seating layout, and outdoor patio details."
      },
      {
        title: "Bean Subscription & Retail Inquiry",
        description: "Direct order form for freshly roasted whole bean deliveries."
      }
    ],
    uxDecisions: [
      {
        title: "Flavor Profile Visualization",
        reasoning: "Helps coffee enthusiasts discover beans based on taste preferences (fruity vs chocolatey) intuitively."
      },
      {
        title: "Work/Remote Friendly Metrics",
        reasoning: "Highlights power outlet availability and quiet hours for digital nomads and local professionals."
      }
    ],
    technologies: ["React", "Tailwind CSS", "Motion", "SVG Interactive Cards", "Local Business Schema"],
    deliverables: ["Roastery Storefront", "Flavor Interactive Wheel", "Brew Guide Layout", "Event Schedule"],
    resultsAndTakeaways: [
      "Transformed a simple café menu into a rich, community-driven retail experience.",
      "Demonstrated how lifestyle photography paired with warm dark UI elevates brand perception."
    ],
    demoLiveFeatures: ["Flavor Profile Wheel", "Brewing Ratio Calculator", "Location & Hours", "Bean Catalog"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    tagline: "Uncovering the business core & customer needs",
    description: "Understand the business, audience, goals, and current online presence. I dig deep into your competitive landscape, target demographics, and the specific hurdles preventing visitors from reaching out.",
    keyActions: [
      "Business & competitor analysis",
      "Customer journey mapping",
      "Core conversion goal definition",
      "Content & asset inventory"
    ]
  },
  {
    number: "02",
    title: "Plan",
    tagline: "Architecting structure, flow & visual direction",
    description: "Define the structure, user journey, content hierarchy, and visual direction. Every page layout, section order, and call-to-action is planned intentionally before writing a single line of code.",
    keyActions: [
      "Sitemap & information architecture",
      "Wireframing key user journeys",
      "Typography & color system design",
      "Copywriting & headline strategy"
    ]
  },
  {
    number: "03",
    title: "Build",
    tagline: "Clean, responsive & performant development",
    description: "Design and develop the website with responsive layouts, modern interactions, and fast-loading code. Built mobile-first so your website performs flawlessly on phones, tablets, and desktops.",
    keyActions: [
      "Modern React / HTML5 / CSS development",
      "Mobile-first responsive optimization",
      "Lead capture forms & CTAs integration",
      "Local SEO & structured data markup"
    ]
  },
  {
    number: "04",
    title: "Refine",
    tagline: "Testing, polish & conversion verification",
    description: "Test, optimize, polish, and make sure every important detail works correctly. Cross-browser testing, speed tuning, form verification, and final quality checks before launch.",
    keyActions: [
      "Performance & Lighthouse speed tuning",
      "Cross-device & browser verification",
      "Accessibility & contrast validation",
      "Final polish & deployment preparation"
    ]
  }
];

export const WHY_WORK_WITH_ME = [
  {
    title: "Business First",
    tagline: "Strategy Before Code",
    description: "Every design decision should support an actual business goal — whether that is phone calls, table bookings, quote requests, or in-store visits.",
    icon: "Target"
  },
  {
    title: "Premium Presentation",
    tagline: "Elevating Local Brands",
    description: "The website should make the business look as professional and credible online as it is offline, commanding instant respect from prospective clients.",
    icon: "Sparkles"
  },
  {
    title: "Mobile First",
    tagline: "Flawless on Every Screen",
    description: "Over 70% of local customers browse on their phones. The experience is designed specifically for touch screens, fast scrolling, and immediate action.",
    icon: "Smartphone"
  },
  {
    title: "Conversion Focused",
    tagline: "Turning Visitors Into Clients",
    description: "Clear information, prominent contact touchpoints, intuitive menus, and frictionless customer journeys that make taking the next step effortless.",
    icon: "Zap"
  },
  {
    title: "Continuous Learning",
    tagline: "Always Leveling Up",
    description: "Constantly sharpening web development, UI/UX design, modern marketing tactics, and search optimization to deliver contemporary web standards.",
    icon: "Flame"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Development",
    tagline: "Clean, semantic & performant code",
    skills: [
      { name: "HTML5 & Semantic Structure", description: "Accessible, clean and SEO-friendly document hierarchy", featured: true },
      { name: "CSS3 & Tailwind CSS", description: "Custom utility-first styling, grid layouts and fluid responsiveness", featured: true },
      { name: "JavaScript (ES6+)", description: "Dynamic logic, interactive state and DOM manipulation", featured: true },
      { name: "React & Modern UI", description: "Component-driven architecture and reactive user interfaces", featured: true },
      { name: "Responsive Design", description: "Flawless presentation from 320px mobile to 4K ultra-wide displays", featured: true },
      { name: "Web Performance Tuning", description: "Asset optimization, fast paint times and lightweight bundles" },
      { name: "Git & Version Control", description: "Clean commit history, structured branching and code maintenance" }
    ]
  },
  {
    title: "Design",
    tagline: "Visual hierarchy, typography & UX psychology",
    skills: [
      { name: "UI / UX Design", description: "Purposeful interfaces engineered for clarity and user delight", featured: true },
      { name: "Typography & Scaling", description: "Mathematical font pairing, contrast and readability hierarchy", featured: true },
      { name: "Visual Hierarchy", description: "Guiding visitor attention directly to value propositions and CTAs", featured: true },
      { name: "Interaction Design", description: "Subtle micro-interactions, smooth hover states and state transitions" },
      { name: "Design Systems", description: "Reusable tokens, consistent color palettes and spacing rules", featured: true },
      { name: "Wireframing & Prototyping", description: "Iterative page planning and user journey mapping" }
    ]
  },
  {
    title: "Marketing",
    tagline: "Visibility, local search & conversions",
    skills: [
      { name: "On-Page SEO", description: "Meta tags, schema markup, semantic headings and search crawlability", featured: true },
      { name: "Local SEO Strategy", description: "Google Business Profile alignment, local keywords and map visibility", featured: true },
      { name: "Conversion Optimization (CRO)", description: "Streamlining friction points to increase inquiry and call rates", featured: true },
      { name: "Content Strategy", description: "Business-focused copywriting that articulates clear value", featured: true },
      { name: "Digital Marketing Strategy", description: "Aligning digital touchpoints with real-world business objectives" },
      { name: "Analytics & Tracking", description: "Understanding visitor behaviors, click flows and engagement" }
    ]
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    name: "Restaurants",
    category: "Hospitality",
    focus: "Digital menus, table reservations & cuisine storytelling",
    icon: "UtensilsCrossed"
  },
  {
    name: "Cafés & Coffee Shops",
    category: "Food & Beverage",
    focus: "Vibe presentation, specialty drink menus & retail bean sales",
    icon: "Coffee"
  },
  {
    name: "Automotive Detailing",
    category: "Automotive",
    focus: "Ceramic coating packages, surface transformations & instant quotes",
    icon: "Sparkles"
  },
  {
    name: "Mechanics & Auto Repair",
    category: "Automotive",
    focus: "Diagnostic booking, emergency towing & certified technician trust",
    icon: "Wrench"
  },
  {
    name: "Local Services",
    category: "Service Industry",
    focus: "Plumbing, electrical, HVAC & home services with instant calling",
    icon: "ShieldCheck"
  },
  {
    name: "Small Businesses",
    category: "Commerce",
    focus: "Professional credibility, product catalogs & customer inquiries",
    icon: "Building2"
  },
  {
    name: "Car Dealerships & Rentals",
    category: "Automotive",
    focus: "Vehicle inventory display, inspection reports & test drive leads",
    icon: "Car"
  },
  {
    name: "Personal Brands & Specialists",
    category: "Professional Services",
    focus: "Authority building, portfolio showcases & high-ticket client intake",
    icon: "UserCheck"
  }
];
