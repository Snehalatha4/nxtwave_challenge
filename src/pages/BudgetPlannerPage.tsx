import React, { useState, useEffect } from 'react';
import {
  PieChart as PieIcon,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import type { BudgetCategory } from '../types';
import {
  getBudgetCategories,
  saveBudgetCategories,
  DEFAULT_BUDGET,
  isDemoMode,
  getStoredLiveRegistrations,
} from '../services/analytics';
import { CAMPAIGN_CONFIG } from '../services/config';

export const BudgetPlannerPage: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>(getBudgetCategories());
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getBudgetCategories());
      setDemoActive(isDemoMode());
    };
    window.addEventListener('nxtwave_storage_updated', handleUpdate);
    return () => window.removeEventListener('nxtwave_storage_updated', handleUpdate);
  }, []);

  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remainingBudget = CAMPAIGN_CONFIG.totalBudgetINR - totalSpent;
  const budgetVariance = CAMPAIGN_CONFIG.totalBudgetINR - totalAllocated;

  // Compute CAC based on mode
  const confirmedCount = demoActive ? 177 : getStoredLiveRegistrations().length;
  const effectiveCac = confirmedCount > 0 ? (totalSpent / confirmedCount).toFixed(2) : 'N/A';

  const handleAllocationChange = (id: string, newAllocated: number) => {
    const val = Math.max(0, newAllocated);
    const updated = categories.map((c) => (c.id === id ? { ...c, allocated: val } : c));
    setCategories(updated);
  };

  const handleSaveBudget = () => {
    saveBudgetCategories(categories);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    setCategories(DEFAULT_BUDGET);
    saveBudgetCategories(DEFAULT_BUDGET);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-2 shadow-xs">
            <PieIcon className="w-3.5 h-3.5 text-brand-600" />
            Capital Allocation &amp; Unit Economics ✨
          </div>
          <h1 className="text-3xl font-black text-slate-900">Campaign Budget Planner 💰</h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Strict allocation governance for the ₹2,000 maximum campaign budget across 7 days.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset to Initial Plan</span>
          </button>
          <button
            onClick={handleSaveBudget}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-cute-pink cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Save Allocations ✨</span>
          </button>
        </div>
      </div>

      {/* SUCCESS BANNER */}
      {saveSuccess && (
        <div className="p-3.5 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Budget allocations successfully saved! 🎉</span>
        </div>
      )}

      {/* 4 SUMMARY STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <span className="text-[11px] text-slate-500 font-semibold">Campaign Budget Cap</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹{CAMPAIGN_CONFIG.totalBudgetINR}</div>
          <div className="text-[10px] text-slate-400 mt-1">Non-negotiable ceiling</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <span className="text-[11px] text-slate-500 font-semibold">Total Planned Allocation</span>
          <div className={`text-2xl font-black mt-1 font-mono ${totalAllocated > 2000 ? 'text-rose-600' : 'text-brand-600'}`}>
            ₹{totalAllocated}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-medium">
            {budgetVariance === 0 ? '✨ 100% fully allocated' : budgetVariance > 0 ? `₹${budgetVariance} unassigned` : `₹${Math.abs(budgetVariance)} over budget!`}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
          <span className="text-[11px] text-slate-500 font-semibold">Actual Spend to Date</span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">₹{totalSpent}</div>
          <div className="text-[10px] text-slate-500 mt-1">₹{remainingBudget} capital left</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-cute-card">
          <span className="text-[11px] text-emerald-800 font-bold">Blended CAC (Cost/Student)</span>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            {effectiveCac !== 'N/A' ? `₹${effectiveCac}` : 'N/A'}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium">Target CAC ceiling: ₹4.00</div>
        </div>
      </div>

      {/* OVER-BUDGET ALERT */}
      {totalAllocated > 2000 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 mb-8 shadow-xs">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <div className="font-medium">
            <strong className="block font-bold mb-0.5">Budget Ceiling Exceeded!</strong>
            Your total planned allocations equal ₹{totalAllocated}, which exceeds the ₹2,000 constraint by ₹{totalAllocated - 2000}. Please reduce one or more category allocations.
          </div>
        </div>
      )}

      {/* CATEGORY ALLOCATION TABLE */}
      <div className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-cute-card mb-10">
        <div className="p-5 border-b border-purple-100 bg-gradient-to-r from-purple-50/50 to-pink-50/30">
          <h2 className="text-base font-bold text-slate-900">Proposed Category Allocations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Adjust planned amounts using the inputs below. Allocations must strictly sum to ₹2,000.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-purple-100">
              <tr>
                <th className="py-3.5 px-5 font-bold">Category &amp; Objective</th>
                <th className="py-3.5 px-4 text-center font-bold">Planned Allocation (₹)</th>
                <th className="py-3.5 px-4 text-center font-bold">Actual Spend (₹)</th>
                <th className="py-3.5 px-4 text-center font-bold">Remaining (₹)</th>
                <th className="py-3.5 px-4 text-center font-bold">Share of Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700">
              {categories.map((cat) => {
                const categoryRemaining = cat.allocated - cat.spent;
                const percentage = ((cat.allocated / CAMPAIGN_CONFIG.totalBudgetINR) * 100).toFixed(0);
                return (
                  <tr key={cat.id} className="hover:bg-purple-50/40 transition">
                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-bold text-slate-900 text-sm">{cat.name}</div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">{cat.description}</p>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
                        <span className="text-slate-400 font-mono font-bold">₹</span>
                        <input
                          type="number"
                          step="50"
                          min="0"
                          max="2000"
                          value={cat.allocated}
                          onChange={(e) => handleAllocationChange(cat.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-transparent text-slate-800 font-mono font-black text-sm focus:outline-none text-right"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">
                      ₹{cat.spent}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold">
                      <span className={categoryRemaining >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                        ₹{categoryRemaining}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center font-mono text-brand-700 font-extrabold">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* STRATEGIC GROWTH RECOMMENDATIONS FOR CAPITAL */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Growth PM Capital Allocation Playbook ✨
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 mt-4 leading-relaxed font-medium">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1.5">
            <span className="font-bold text-brand-700 block">Rule #1: Validate Free Channels Before Paid Spend</span>
            <p className="text-slate-500">
              Never spend on paid promotions on Day 1. Use Days 1–2 to test organic conversion in 5 high-density college coding clubs. Only deploy paid capital once the Project Passport conversion funnel is proven (&gt;8% CVR).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 space-y-1.5">
            <span className="font-bold text-pink-700 block">Rule #2: Micro-Incentives Outperform Broad Advertising</span>
            <p className="text-slate-500">
              Allocating ₹500 directly to campus ambassador recognition (book credits, priority certificates for leads who bring 25+ verified participants) generates high peer trust and virality compared to cold external ads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
