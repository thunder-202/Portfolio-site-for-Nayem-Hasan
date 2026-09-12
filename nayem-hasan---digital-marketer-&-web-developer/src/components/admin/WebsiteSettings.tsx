import React, { useState, useEffect } from 'react';
import {
  Settings,
  Globe,
  Share2,
  AlertTriangle,
  Save,
  Check,
  Palette
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WebsiteSettings as WebsiteSettingsType } from '../../types';

const defaultWebsiteSettings: WebsiteSettingsType = {
  general: {
    websiteName: "Nayem Hasan Portfolio",
    siteName: "Nayem Hasan — Digital Marketer & Web Developer",
    domain: "https://nayemhasan.com",
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
    twitter: "https://twitter.com/nayemhasan",
    whatsapp: "https://wa.me/8801700000000"
  },
  appearance: {
    theme: 'dark',
    accentColor: '#C9A227',
    fontFamily: 'Plus Jakarta Sans',
    animationIntensity: 'smooth'
  },
  maintenance: {
    enabled: false,
    message: "Our website is currently undergoing a scheduled system upgrade. We will be back online shortly."
  }
};

export const WebsiteSettings: React.FC = () => {
  const { settings, updateWebsiteSettings, updateSettings } = usePortfolio();

  const [formData, setFormData] = useState<WebsiteSettingsType>(() => {
    if (settings) {
      return {
        general: { ...defaultWebsiteSettings.general, ...settings.general },
        social: { ...defaultWebsiteSettings.social, ...settings.social },
        appearance: { ...defaultWebsiteSettings.appearance, ...settings.appearance },
        maintenance: { ...defaultWebsiteSettings.maintenance, ...settings.maintenance }
      };
    }
    return defaultWebsiteSettings;
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        general: { ...defaultWebsiteSettings.general, ...settings.general },
        social: { ...defaultWebsiteSettings.social, ...settings.social },
        appearance: { ...defaultWebsiteSettings.appearance, ...settings.appearance },
        maintenance: { ...defaultWebsiteSettings.maintenance, ...settings.maintenance }
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const saveFn = updateSettings || updateWebsiteSettings;
    const success = await saveFn(formData);
    if (success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#F5F2EA]" />
            <span>Website Configuration & System Settings</span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            General website parameters, social profile handles, theme styling, and maintenance mode
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-[#D1CCC4]" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* General Website Settings */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-[#F5F2EA] pb-2 border-b border-[#171717] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#D1CCC4]" />
            <span>General Website Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Portfolio Title / Brand Name</label>
              <input
                type="text"
                value={formData.general?.name || formData.general?.siteName || formData.general?.websiteName || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: {
                    ...formData.general,
                    name: e.target.value,
                    siteName: e.target.value,
                    websiteName: e.target.value
                  }
                })}
                placeholder="Nayem Hasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Tagline / Sub-Role</label>
              <input
                type="text"
                value={formData.general?.tagline || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: { ...formData.general, tagline: e.target.value }
                })}
                placeholder="Digital Marketer • Web Developer"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Brand Logo Monogram</label>
              <input
                type="text"
                value={formData.general?.logoText || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: { ...formData.general, logoText: e.target.value }
                })}
                placeholder="NH"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Public Domain URL</label>
              <input
                type="url"
                value={formData.general?.domain || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: { ...formData.general, domain: e.target.value }
                })}
                placeholder="https://nayemhasan.com"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Availability Badge</label>
              <input
                type="text"
                value={formData.general?.availabilityStatus || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: { ...formData.general, availabilityStatus: e.target.value }
                })}
                placeholder="Available for new projects"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Contact Email Address</label>
              <input
                type="email"
                value={formData.general?.contactEmail || formData.general?.email || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: {
                    ...formData.general,
                    contactEmail: e.target.value,
                    email: e.target.value
                  }
                })}
                placeholder="websitedeldevelop@gmail.com"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Direct Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.general?.contactPhone || formData.general?.phone || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: {
                    ...formData.general,
                    contactPhone: e.target.value,
                    phone: e.target.value
                  }
                })}
                placeholder="+880 1700-000000"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Geographic Location</label>
              <input
                type="text"
                value={formData.general?.location || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  general: { ...formData.general, location: e.target.value }
                })}
                placeholder="Dhaka, Bangladesh"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-[#F5F2EA] pb-2 border-b border-[#171717] flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#D1CCC4]" />
            <span>Social Profile URLs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.social?.github || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, github: e.target.value }
                })}
                placeholder="https://github.com/nayemhasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.social?.linkedin || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/nayemhasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={formData.social?.twitter || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/nayemhasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Facebook Page / Profile</label>
              <input
                type="url"
                value={formData.social?.facebook || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/nayemhasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Instagram Profile</label>
              <input
                type="url"
                value={formData.social?.instagram || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/nayemhasan"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">WhatsApp Direct Link</label>
              <input
                type="url"
                value={formData.social?.whatsapp || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, whatsapp: e.target.value }
                })}
                placeholder="https://wa.me/8801700000000"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Appearance & Accent Theme */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#171717]">
            <h3 className="font-bold text-[#F5F2EA] flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#D1CCC4]" />
              <span>Theme & Visual Identity</span>
            </h3>
            <span className="text-xs text-[#8C857B] font-mono">Live Customization</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Theme Mode</label>
              <select
                value={formData.appearance?.theme || 'dark'}
                onChange={(e) => setFormData({
                  ...formData,
                  appearance: { ...formData.appearance, theme: e.target.value as any }
                })}
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
              >
                <option value="dark">Dark Theme (Standard)</option>
                <option value="minimal">Minimalist Monochrome</option>
                <option value="luxury-gold">Deep Obsidian & Gold Accents</option>
              </select>
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Global Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.appearance?.accentColor?.startsWith('#') ? formData.appearance.accentColor : '#C9A227'}
                  onChange={(e) => setFormData({
                    ...formData,
                    appearance: { ...formData.appearance, accentColor: e.target.value }
                  })}
                  className="w-9 h-9 rounded bg-[#141414] border border-[#262626] cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={formData.appearance?.accentColor || '#C9A227'}
                  onChange={(e) => setFormData({
                    ...formData,
                    appearance: { ...formData.appearance, accentColor: e.target.value }
                  })}
                  className="flex-1 px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Font Scale & Style</label>
              <select
                value={formData.appearance?.fontFamily || 'Plus Jakarta Sans'}
                onChange={(e) => setFormData({
                  ...formData,
                  appearance: { ...formData.appearance, fontFamily: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans & Space Grotesk</option>
                <option value="Inter">Inter & JetBrains Mono</option>
                <option value="Cinzel">Cinzel & Montserrat (Editorial)</option>
              </select>
            </div>
          </div>

          {/* Hero Section Specific Color Controls */}
          <div className="p-4 rounded-lg bg-[#121212] border border-[#242424] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
              <div>
                <h4 className="text-sm font-bold text-[#F5F2EA]">Hero Section Color Controls</h4>
                <p className="text-xs text-[#8C857B]">Custom background canvas and headline / text typography color</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] bg-[#1A1A1A] text-[#F5F2EA] border border-[#333333] font-medium">
                Hero Customizer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Option 1: Hero Section Background Color */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#F5F2EA]">
                  1. Hero Section Background Color (Dark Black)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.appearance?.heroBgColor?.startsWith('#') ? formData.appearance.heroBgColor : '#050505'}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, heroBgColor: e.target.value }
                    })}
                    className="w-10 h-10 rounded bg-[#141414] border border-[#262626] cursor-pointer p-1 shrink-0"
                  />
                  <input
                    type="text"
                    value={formData.appearance?.heroBgColor || '#050505'}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, heroBgColor: e.target.value }
                    })}
                    placeholder="#050505"
                    className="flex-1 px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs"
                  />
                </div>

                {/* Quick Dark Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-[#8C857B]">Presets:</span>
                  {[
                    { label: 'Dark Black', hex: '#050505' },
                    { label: 'Pitch Black', hex: '#000000' },
                    { label: 'Obsidian', hex: '#080808' },
                    { label: 'Midnight', hex: '#0E0E12' },
                    { label: 'Deep Blue Black', hex: '#070A12' }
                  ].map(p => (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        appearance: { ...formData.appearance, heroBgColor: p.hex }
                      })}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#1A1A1A] hover:bg-[#262626] border border-[#2E2E2E] text-[#D4CFC7] cursor-pointer transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Hero Section Text & Golden Accent Color */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#F5F2EA]">
                  2. Hero Section Text & Golden Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.appearance?.heroAccentTextColor?.startsWith('#') ? formData.appearance.heroAccentTextColor : '#E5C45A'}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: {
                        ...formData.appearance,
                        heroAccentTextColor: e.target.value,
                        accentColor: e.target.value
                      }
                    })}
                    className="w-10 h-10 rounded bg-[#141414] border border-[#262626] cursor-pointer p-1 shrink-0"
                  />
                  <input
                    type="text"
                    value={formData.appearance?.heroAccentTextColor || '#E5C45A'}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: {
                        ...formData.appearance,
                        heroAccentTextColor: e.target.value
                      }
                    })}
                    placeholder="#E5C45A"
                    className="flex-1 px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono text-xs"
                  />
                </div>

                {/* Quick Gold & Text Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-[#8C857B]">Presets:</span>
                  {[
                    { label: 'Luxury Gold', hex: '#E5C45A' },
                    { label: 'Royal Golden', hex: '#C9A227' },
                    { label: 'Warm Champagne', hex: '#F5E6C8' },
                    { label: 'Cyber Cyan', hex: '#22D3EE' },
                    { label: 'Emerald Glow', hex: '#34D399' },
                    { label: 'Pure White', hex: '#FFFFFF' }
                  ].map(p => (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        appearance: {
                          ...formData.appearance,
                          heroAccentTextColor: p.hex
                        }
                      })}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#1A1A1A] hover:bg-[#262626] border border-[#2E2E2E] text-[#D4CFC7] cursor-pointer transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Hero Preview Swatch */}
            <div
              className="mt-3 p-4 rounded-lg border border-[#2A2A2A] flex items-center justify-between"
              style={{
                backgroundColor: formData.appearance?.heroBgColor || '#050505',
              }}
            >
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#A6A19A]">
                  Live Hero Color Preview
                </span>
                <p
                  className="text-sm sm:text-base font-bold mt-1"
                  style={{ color: formData.appearance?.heroAccentTextColor || '#E5C45A' }}
                >
                  I Build Digital Experiences That Help Businesses Get Noticed.
                </p>
                <p className="text-xs text-[#8C857B] mt-0.5">
                  Dark Black Canvas + Golden Accent Typography
                </p>
              </div>
              <div
                className="hidden sm:block px-3 py-1.5 rounded text-xs font-bold text-black"
                style={{ backgroundColor: formData.appearance?.heroAccentTextColor || '#E5C45A' }}
              >
                CTA Button
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#171717]">
            <h3 className="font-bold text-[#F5F2EA] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Maintenance Mode Switch</span>
            </h3>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.maintenance?.enabled}
                onChange={(e) => setFormData({
                  ...formData,
                  maintenance: { ...formData.maintenance, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#222] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A227]"></div>
            </label>
          </div>

          <p className="text-xs text-[#8C857B]">
            When enabled, visitors to the public portfolio will see a stylized maintenance card while you perform updates.
          </p>

          {formData.maintenance?.enabled && (
            <div className="p-4 rounded-xl bg-[#1C150A] border border-amber-800/40 space-y-3">
              <div>
                <label className="block text-amber-300 font-medium mb-1">Maintenance Banner Message</label>
                <textarea
                  rows={2}
                  value={formData.maintenance?.message || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    maintenance: { ...formData.maintenance, message: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#141008] border border-amber-700/50 rounded-lg text-[#F5F2EA] focus:border-[#C9A227] outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
