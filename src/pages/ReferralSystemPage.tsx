import React, { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Check,
  Plus,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { ReferralCode } from '../types';
import {
  getReferralCodes,
  saveReferralCodes,
  isDemoMode,
  DEMO_REFERRAL_PERFORMANCE,
  getStoredLiveEvents,
  getStoredLiveRegistrations,
} from '../services/analytics';
import { buildCampaignUrl } from '../utils/attribution';
import { CAMPAIGN_CONFIG } from '../services/config';

export const ReferralSystemPage: React.FC = () => {
  const [referrals, setReferrals] = useState<ReferralCode[]>(getReferralCodes());
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Code Form State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCode, setNewCode] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [newType, setNewType] = useState<'ambassador' | 'club' | 'student'>('ambassador');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setReferrals(getReferralCodes());
      setDemoActive(isDemoMode());
    };
    window.addEventListener('nxtwave_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('nxtwave_storage_updated', handleStorageUpdate);
  }, []);

  const handleCopyLink = (code: string) => {
    const url = buildCampaignUrl({
      path: '/',
      source: 'campus',
      medium: 'ambassador',
      campaign: CAMPAIGN_CONFIG.defaultCampaign,
      ref: code,
    });

    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleToggleActive = (code: string) => {
    const updated = referrals.map((r) => (r.code === code ? { ...r, active: !r.active } : r));
    setReferrals(updated);
    saveReferralCodes(updated);
  };

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanCode = newCode.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!cleanCode || cleanCode.length < 3) {
      setFormError('Referral code must be at least 3 alphanumeric characters');
      return;
    }

    if (referrals.some((r) => r.code.toLowerCase() === cleanCode)) {
      setFormError('This referral code already exists. Please choose a unique one.');
      return;
    }

    if (!newOwner.trim() || !newCollege.trim()) {
      setFormError('Please provide both the owner name and college.');
      return;
    }

    const created: ReferralCode = {
      code: cleanCode,
      label: newLabel.trim() || `${cleanCode.toUpperCase()} (${newOwner.trim()})`,
      ownerType: newType,
      ownerName: newOwner.trim(),
      college: newCollege.trim(),
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const nextList = [created, ...referrals];
    setReferrals(nextList);
    saveReferralCodes(nextList);

    // Reset form
    setNewCode('');
    setNewLabel('');
    setNewOwner('');
    setNewCollege('');
    setShowAddModal(false);
  };

  // Compute live referral metrics or demo metrics
  const liveEvents = getStoredLiveEvents();
  const liveRegs = getStoredLiveRegistrations();

  const getMetricsForCode = (code: string) => {
    if (demoActive) {
      const match = DEMO_REFERRAL_PERFORMANCE.find((d) => d.code === code);
      if (match) {
        return {
          visits: match.visits,
          passportStarts: match.passportStarts,
          ctaClicks: match.ctaClicks,
          confirmed: match.confirmed,
          cvr: match.cvr,
        };
      }
    }

    const codeEvents = liveEvents.filter((e) => e.referralCode === code);
    const codeRegs = liveRegs.filter((r) => r.referralCode === code);
    const visits = codeEvents.filter((e) => e.type === 'landing_page_view' || e.type === 'referral_visit').length;
    const passportStarts = codeEvents.filter((e) => e.type === 'passport_started').length;
    const ctaClicks = codeEvents.filter((e) => e.type === 'registration_cta_clicked').length;
    const confirmed = codeRegs.length;
    const cvr = visits > 0 ? ((confirmed / visits) * 100).toFixed(1) + '%' : '0.0%';

    return { visits, passportStarts, ctaClicks, confirmed, cvr };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-2 shadow-xs">
            <Users className="w-3.5 h-3.5 text-brand-600" />
            Channel Attribution &amp; Campus Growth ✨
          </div>
          <h1 className="text-3xl font-black text-slate-900">Campus Ambassador Hub 🎓</h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate and manage custom referral tracking codes for campus club leads, college reps, and peer ambassadors.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white transition flex items-center gap-2 text-xs self-start sm:self-center shadow-cute-pink cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Referral Code</span>
        </button>
      </div>

      {/* Ambassador Performance Table */}
      <div className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-cute-card mb-10">
        <div className="p-5 border-b border-purple-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-purple-50/50 to-pink-50/30">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Referral Sources</h2>
            <p className="text-xs text-slate-500">
              Each source receives a tamper-proof attribution query parameter with strict event deduplication.
            </p>
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Mode: <span className="font-bold text-slate-800">{demoActive ? 'Demo Simulation' : 'Live Workspace'}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-purple-100">
              <tr>
                <th className="py-3.5 px-4 font-bold">Code / Details</th>
                <th className="py-3.5 px-4 font-bold">Type &amp; College</th>
                <th className="py-3.5 px-4 text-center font-bold">Visits</th>
                <th className="py-3.5 px-4 text-center font-bold">Quiz Starts</th>
                <th className="py-3.5 px-4 text-center font-bold">CTA Clicks</th>
                <th className="py-3.5 px-4 text-center text-emerald-700 font-extrabold">Confirmed Regs</th>
                <th className="py-3.5 px-4 text-center font-bold">CVR</th>
                <th className="py-3.5 px-4 text-center font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700">
              {referrals.map((r) => {
                const metrics = getMetricsForCode(r.code);
                const isCopied = copiedCode === r.code;
                return (
                  <tr key={r.code} className="hover:bg-purple-50/40 transition">
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-brand-700 text-sm">{r.code}</div>
                      <div className="text-[11px] text-slate-500">{r.ownerName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-purple-100 text-purple-800 border border-purple-200 inline-block mb-0.5">
                        {r.ownerType}
                      </span>
                      <div className="text-[11px] text-slate-500">{r.college}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-medium">{metrics.visits}</td>
                    <td className="py-4 px-4 text-center font-mono font-medium">{metrics.passportStarts}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-pink-600">{metrics.ctaClicks}</td>
                    <td className="py-4 px-4 text-center font-mono font-black text-emerald-600 text-sm">
                      {metrics.confirmed}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {metrics.cvr}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(r.code)}
                        className="inline-flex items-center gap-1 cursor-pointer"
                        title="Toggle active status"
                      >
                        {r.active ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            Disabled
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleCopyLink(r.code)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 transition text-[11px] font-bold flex items-center gap-1 border border-purple-200 shadow-xs cursor-pointer ml-auto"
                        title="Copy unique tracking link"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explainer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            1. Clean UTM Attribution
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Every ambassador link automatically embeds <code className="text-brand-700 font-bold">ref=code</code>, <code className="text-brand-700 font-bold">source=campus</code>, and <code className="text-brand-700 font-bold">medium=ambassador</code> so that zero registrations leak without credit.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            2. Anti-Spam &amp; Deduplication
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Repeated rapid clicks from the same session within 1.5 seconds are suppressed. Outbound clicks and verified submissions are recorded on separate ledgers.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
            <Sparkles className="w-4 h-4 text-pink-600" />
            3. Micro-Incentive Alignment
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            ₹500 from the ₹2,000 budget is earmarked for campus ambassador recognition (book vouchers, certificates) for top-performing club leads.
          </p>
        </div>
      </div>

      {/* ADD REFERRAL CODE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-cute-lg animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-slate-900 mb-1">Create New Referral Code ✨</h3>
            <p className="text-xs text-slate-500 mb-4">
              Provision a unique code for a campus ambassador, student representative, or college coding club.
            </p>

            <form onSubmit={handleAddReferral} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Referral Code (slug) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. jntu_cse, club04, techfest"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono text-sm focus:outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ambassador Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  placeholder="e.g. Sneha Reddy"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCollege}
                    onChange={(e) => setNewCollege(e.target.value)}
                    placeholder="e.g. Vasavi College"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Partner Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:bg-white focus:border-brand-500 font-medium"
                  >
                    <option value="ambassador">Ambassador</option>
                    <option value="club">Club Lead</option>
                    <option value="student">Class Rep</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-cute-pink cursor-pointer"
                >
                  Create Code ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
