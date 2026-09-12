import React from 'react';
import { AlertTriangle, Lock, ShieldCheck, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface MaintenanceScreenProps {
  onOpenAdmin: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({ onOpenAdmin }) => {
  const { settings } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F2EA] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#17110D] border border-[#C9A227]/40 flex items-center justify-center mx-auto text-[#E5C45A] shadow-[0_0_30px_rgba(201,162,39,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1408] border border-[#C9A227]/30 text-xs font-mono text-[#E5C45A]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Scheduled Maintenance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2EA] tracking-tight">
            {settings.general.siteName}
          </h1>

          <p className="text-sm text-[#A6A19A] leading-relaxed pt-2">
            {settings.maintenance.message || "We are currently performing routine enhancements and performance optimizations. We'll be back online shortly."}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#222222] text-xs space-y-2 text-[#8C857B]">
          <div>Need to get in touch urgently?</div>
          <a
            href={`mailto:${settings.general.contactEmail}`}
            className="text-xs font-mono text-[#E5C45A] hover:underline flex items-center justify-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{settings.general.contactEmail}</span>
          </a>
        </div>

        <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-center">
          <button
            onClick={onOpenAdmin}
            className="text-xs font-mono text-[#666] hover:text-[#E5C45A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Authorized Admin Sign-In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
