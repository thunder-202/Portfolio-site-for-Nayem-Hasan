import React, { useState } from 'react';
import {
  ShieldCheck,
  Key,
  Lock,
  User,
  Check,
  AlertCircle,
  Save,
  Clock,
  Shield
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSecurity: React.FC = () => {
  const { adminUser, changeAdminPassword, token } = usePortfolio();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = await changeAdminPassword(currentPassword, newPassword);
    if (result.success) {
      setIsSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsSuccess(false), 4000);
    } else {
      setError(result.error || 'Failed to update password.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6">
        <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#F5F2EA]" />
          <span>Admin Security & Credentials</span>
        </h2>
        <p className="text-xs text-[#736E66] mt-0.5">
          Server-side authentication management, encrypted session tokens, and access policy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Update Form */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-[#F5F2EA] pb-2 border-b border-[#171717] flex items-center gap-2">
            <Key className="w-4 h-4 text-[#D1CCC4]" />
            <span>Update Master Password</span>
          </h3>

          {isSuccess && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Admin password updated successfully across server sessions.</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#C2BCB2] font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs tracking-wide cursor-pointer shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Security Posture & Session Info */}
        <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-[#F5F2EA] pb-2 border-b border-[#171717] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Active Session State</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222] space-y-1">
              <span className="text-[#8C857B] font-mono text-[10px]">CURRENT OPERATOR</span>
              <div className="text-sm font-semibold text-[#F5F2EA]">{adminUser?.name || 'Nayem Hasan'}</div>
              <div className="text-[11px] font-mono text-[#D1CCC4]">{adminUser?.email || 'admin@nayemhasan.com'}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222] space-y-1">
              <span className="text-[#8C857B] font-mono text-[10px]">AUTHORIZATION TOKEN</span>
              <div className="text-[11px] font-mono text-[#A6A19A] truncate">
                {token ? `Bearer ${token}` : 'No active session token'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#F5F2EA]">Server-Side Session Verification</div>
                <div className="text-[11px] text-[#777]">Strict non-persistent browser credential storage</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
