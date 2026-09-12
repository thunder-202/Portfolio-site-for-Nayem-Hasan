import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Linkedin, Github, Instagram, Facebook, Twitter, ArrowUpRight, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const { draftContent, homepageContent, settings } = usePortfolio();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const contactHeading = homepageContent?.contactCta?.heading || draftContent?.contactCta?.heading || "Ready To Build A Better Digital Experience?";
  const contactDesc = homepageContent?.contactCta?.description || draftContent?.contactCta?.description || "Let's connect directly to structure the exact web solutions, timeline, and strategy tailored to your business goals.";
  const contactEmail = settings?.general?.contactEmail || settings?.general?.email || homepageContent?.contactCta?.email || draftContent?.contactCta?.email || PERSONAL_INFO.email;
  const contactPhone = settings?.general?.contactPhone || settings?.general?.phone || PERSONAL_INFO.phone || "+880 1700-000000";
  const contactLocation = settings?.general?.location || PERSONAL_INFO.location || "Available Worldwide";
  const socials = {
    linkedin: settings?.social?.linkedin || PERSONAL_INFO.socials.linkedin,
    github: settings?.social?.github || PERSONAL_INFO.socials.github,
    facebook: settings?.social?.facebook || PERSONAL_INFO.socials.facebook,
    instagram: settings?.social?.instagram || PERSONAL_INFO.socials.instagram,
    twitter: settings?.social?.twitter || '',
    whatsapp: settings?.social?.whatsapp || (contactPhone ? `https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}` : '')
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#17110D] border border-[#C9A227]/30 text-xs font-semibold tracking-widest text-[#E5C45A] uppercase mb-4">
            <span>DIRECT CONNECT & CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F2EA] tracking-tight leading-[1.15] mb-4">
            {contactHeading}
          </h2>
          <p className="text-[#A6A19A] text-base sm:text-lg leading-relaxed">
            {contactDesc}
          </p>
        </div>

        {/* Executive Direct Communication Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Primary Direct Email Channel */}
          <div className="p-8 rounded-2xl bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#C9A227]/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#17110D] border border-[#C9A227]/30 flex items-center justify-center text-[#E5C45A]">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5C45A] hover:bg-[#F5D77F] text-black border border-[#C9A227] text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                  <span className="text-black">{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider block mb-1">
                Direct Email Inquiries
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-lg sm:text-xl font-bold text-[#F5F2EA] hover:text-[#E5C45A] transition-colors break-all"
              >
                {contactEmail}
              </a>
              <p className="text-xs text-[#736E66] mt-2">
                Send project details, specifications, or meeting recap notes directly to my primary inbox.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#171717]">
              <a
                href={`mailto:${contactEmail}?subject=Project%20Discussion%20-%20Nayem%20Hasan`}
                className="w-full py-3 rounded-lg bg-[#C9A227] text-[#080808] font-bold text-sm hover:bg-[#E5C45A] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,162,39,0.25)]"
              >
                <span>Send Direct Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* WhatsApp & Instant Discussion Channel */}
          <div className="p-8 rounded-2xl bg-[#0D0D0D] border border-[#1F1F1F] hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0D1912] border border-emerald-900/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-[11px] text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#8C857B] uppercase tracking-wider block mb-1">
                Direct Messaging & WhatsApp
              </span>
              <a
                href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-bold text-[#F5F2EA] hover:text-emerald-400 transition-colors"
              >
                {contactPhone}
              </a>
              <p className="text-xs text-[#736E66] mt-2">
                Fast coordination for meeting links, rapid scope clarifications, and immediate project questions.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#171717] flex items-center gap-3">
              <a
                href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg bg-[#141414] hover:bg-emerald-600 hover:text-white border border-[#262626] text-[#F5F2EA] font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Open WhatsApp</span>
              </a>
              <button
                onClick={handleCopyPhone}
                className="px-4 py-3 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#262626] text-[#D1CCC4] text-xs font-mono transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Channel Bar */}
        <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#8C857B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9A227]" />
              <span className="text-[#D1CCC4] font-medium">{contactLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A227]" />
              <span>Typical Response: <strong className="text-[#F5F2EA]">Within 24 Hours</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>Confidentiality & Client NDA Supported</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-2">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] hover:bg-[#1E1810] border border-[#222] hover:border-[#C9A227]/40 text-[#A6A19A] hover:text-[#E5C45A] flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] hover:bg-[#1E1810] border border-[#222] hover:border-[#C9A227]/40 text-[#A6A19A] hover:text-[#E5C45A] flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] hover:bg-[#1E1810] border border-[#222] hover:border-[#C9A227]/40 text-[#A6A19A] hover:text-[#E5C45A] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] hover:bg-[#1E1810] border border-[#222] hover:border-[#C9A227]/40 text-[#A6A19A] hover:text-[#E5C45A] flex items-center justify-center transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] hover:bg-[#1E1810] border border-[#222] hover:border-[#C9A227]/40 text-[#A6A19A] hover:text-[#E5C45A] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
