import React, { useState } from 'react';
import { Lock, Mail, Shield, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminLoginProps {
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPublic }) => {
  const { login } = usePortfolio();
  const [email, setEmail] = useState('admin@nayemhasan.com');
  const [password, setPassword] = useState('nayem2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Authentication failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@nayemhasan.com');
    setPassword('nayem2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#F5F2EA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9A227]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToPublic}
          className="px-3.5 py-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#262626] text-xs font-mono text-[#A6A19A] hover:text-[#F5F2EA] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Back to Public Portfolio
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1E1710] to-[#0E0C0A] border border-[#C9A227]/30 shadow-[0_0_25px_rgba(201,162,39,0.15)] mb-4">
            <Shield className="w-7 h-7 text-[#E5C45A]" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl font-bold tracking-tight text-[#F5F2EA]">
              NAYEM ADMIN
            </span>
          </div>
          <p className="text-xs font-mono tracking-wider text-[#A6A19A] uppercase">
            Personal Website Operating System
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#D1CCC4]">
              <Lock className="w-3.5 h-3.5 text-[#E5C45A]" />
              <span>Private Access Verification</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18120B] border border-[#C9A227]/30 text-[10px] font-mono text-[#E5C45A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C45A] animate-pulse"></span>
              <span>Encrypted</span>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-[#2A0E0E] border border-red-900/60 text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#C2BCB2] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#736E66]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@nayemhasan.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-[#262626] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] rounded-lg text-sm text-[#F5F2EA] placeholder-[#555] transition-colors outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#C2BCB2]">
                  Admin Password
                </label>
                <span className="text-[11px] text-[#736E66] font-mono">Server Auth</span>
              </div>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#736E66]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#141414] border border-[#262626] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] rounded-lg text-sm text-[#F5F2EA] placeholder-[#555] transition-colors outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#736E66] hover:text-[#D1CCC4] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#C9A227] to-[#E5C45A] hover:from-[#B89220] hover:to-[#D4B349] text-[#0A0A0A] font-semibold text-sm tracking-wide transition-all shadow-[0_2px_12px_rgba(201,162,39,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Control</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-[#1A1A1A] text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-xs text-[#E5C45A] hover:text-[#F3DC8C] transition-colors font-mono cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Default Demo Credentials</span>
            </button>
            <p className="text-[11px] text-[#666] mt-1 font-mono">
              admin@nayemhasan.com • nayem2026!
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-[#555] flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#C9A227]/70" />
          <span>Restricted session management • Encrypted token authorization</span>
        </div>
      </div>
    </div>
  );
};
