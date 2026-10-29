import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Filter,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  isDemoMode,
  DEMO_DAILY_TRENDS,
  DEMO_CHANNEL_METRICS,
  getStoredLiveEvents,
  getStoredLiveRegistrations,
  getBudgetCategories,
} from '../services/analytics';
import { CAMPAIGN_CONFIG } from '../services/config';

export const GrowthDashboardPage: React.FC = () => {
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [variantFilter, setVariantFilter] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setDemoActive(isDemoMode());
    };
    window.addEventListener('nxtwave_storage_updated', handleUpdate);
    return () => window.removeEventListener('nxtwave_storage_updated', handleUpdate);
  }, []);

  const liveEvents = getStoredLiveEvents();
  const liveRegistrations = getStoredLiveRegistrations();
  const budgetList = getBudgetCategories();

  // Calculate metrics based on mode
  let totalVisits = 0;
  let passportStarts = 0;
  let passportCompletions = 0;
  let ctaClicks = 0;
  let confirmedRegistrations = 0;
  let totalSpent = 0;

  if (demoActive) {
    totalVisits = 1840;
    passportStarts = 780;
    passportCompletions = 595;
    ctaClicks = 360;
    confirmedRegistrations = 177;
    totalSpent = 920; // Spent ₹920 of ₹2,000
  } else {
    // Filter live events
    const filteredEvents = liveEvents.filter((e) => {
      if (channelFilter !== 'all' && e.source !== channelFilter) return false;
      if (variantFilter !== 'all' && e.variant !== variantFilter) return false;
      return true;
    });

    const filteredRegs = liveRegistrations.filter((r) => {
      if (channelFilter !== 'all' && r.source !== channelFilter) return false;
      if (variantFilter !== 'all' && r.variant !== variantFilter) return false;
      return true;
    });

    totalVisits = filteredEvents.filter(
      (e) => e.type === 'landing_page_view' || e.type === 'referral_visit'
    ).length;
    passportStarts = filteredEvents.filter((e) => e.type === 'passport_started').length;
    passportCompletions = filteredEvents.filter((e) => e.type === 'passport_completed').length;
    ctaClicks = filteredEvents.filter((e) => e.type === 'registration_cta_clicked').length;
    confirmedRegistrations = filteredRegs.length;
    totalSpent = budgetList.reduce((acc, curr) => acc + curr.spent, 0);
  }

  // Calculated rates
  const overallCvr =
    totalVisits > 0 ? ((confirmedRegistrations / totalVisits) * 100).toFixed(1) : '0.0';
  const passportCompletionRate =
    passportStarts > 0 ? ((passportCompletions / passportStarts) * 100).toFixed(1) : '0.0';
  const cac =
    confirmedRegistrations > 0 ? (totalSpent / confirmedRegistrations).toFixed(1) : 'N/A';

  const goalPercentage = Math.min(100, (confirmedRegistrations / CAMPAIGN_CONFIG.targetRegistrations) * 100);

  // Funnel data
  const funnelData = [
    { stage: '1. Landing Visits', count: totalVisits, fill: '#8B5CF6' },
    { stage: '2. Passport Starts', count: passportStarts, fill: '#A78BFA' },
    { stage: '3. Completions', count: passportCompletions, fill: '#38BDF8' },
    { stage: '4. CTA Clicks', count: ctaClicks, fill: '#F43F5E' },
    { stage: '5. Confirmed Regs', count: confirmedRegistrations, fill: '#10B981' },
  ];

  // Budget data
  const budgetChartData = budgetList.map((b) => ({
    name: b.name.replace('Targeted Promotion Experiment', 'Promotion').replace('Campus Ambassador Activation', 'Ambassadors').replace('Creative Assets & QR Materials', 'Creatives & QR').replace('Contingency & Reserve', 'Contingency'),
    Allocated: b.allocated,
    Spent: b.spent,
  }));

  // Type-safe channel chart data
  const channelChartData = demoActive
    ? DEMO_CHANNEL_METRICS.map((c) => ({
        channel: c.channel,
        confirmedRegistrations: c.confirmedRegistrations,
      }))
    : [
        {
          channel: 'Direct / Organic',
          confirmedRegistrations: confirmedRegistrations,
        },
      ];

  const tooltipCustomStyle = {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 16,
    boxShadow: '0 10px 25px -4px rgba(124, 58, 237, 0.12)',
    fontSize: 11,
    color: '#1E293B',
    padding: '8px 12px',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-600 font-extrabold">
              Admin &amp; Growth Command Center ✨
            </span>
            {demoActive && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-xs">
                SIMULATED DATA
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Campaign Growth Analytics 📊
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Real-time monitoring towards 500 valid registrations for "{CAMPAIGN_CONFIG.workshopTitle}" (₹2,000 Budget • 7 Days).
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white border border-purple-100 p-2 rounded-2xl text-xs shadow-cute-sm">
          <div className="flex items-center gap-1.5 px-2 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5 text-brand-500" />
            <span>Filters:</span>
          </div>

          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-500 font-medium cursor-pointer"
          >
            <option value="all">All Channels</option>
            <option value="whatsapp">WhatsApp Groups</option>
            <option value="campus">Campus Connectors</option>
            <option value="direct">Direct / Organic</option>
          </select>

          <select
            value={variantFilter}
            onChange={(e) => setVariantFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-500 font-medium cursor-pointer"
          >
            <option value="all">All Variants (A &amp; B)</option>
            <option value="A">Variant A (Outcome)</option>
            <option value="B">Variant B (Passport Quiz)</option>
          </select>
        </div>
      </div>

      {/* 500 REGISTRATION TARGET PROGRESS CARD */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50/40 to-sky-50/60 border border-purple-200/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-cute-card relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Primary Campaign Objective
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {confirmedRegistrations} <span className="text-slate-400 font-medium">/ {CAMPAIGN_CONFIG.targetRegistrations}</span> Valid Registrations 🎯
            </h2>
            <p className="text-xs text-slate-500">
              {500 - confirmedRegistrations > 0
                ? `${500 - confirmedRegistrations} more registrations needed to achieve 100% campaign target.`
                : 'Target achieved! Outstanding growth velocity 🎉'}
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl sm:text-4xl font-black text-brand-600 font-mono">
              {goalPercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 font-semibold">Target Completion</div>
          </div>
        </div>

        {/* Cute Pill Progress Bar */}
        <div className="mt-6 w-full h-4 rounded-full bg-white border border-purple-100 p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-violet-600 via-brand-500 to-pink-500 rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${goalPercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono font-medium">
          <span>Day 0 (Launch)</span>
          <span>Target: 500 Students</span>
        </div>
      </div>

      {/* 8 KEY METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Total Landing Visits</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{totalVisits}</div>
          <div className="text-[10px] text-slate-400 mt-1">Unique student impressions</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Passport Starts</span>
          <div className="text-2xl font-black text-brand-600 mt-1 font-mono">{passportStarts}</div>
          <div className="text-[10px] text-brand-600/80 mt-1 font-semibold">
            {totalVisits > 0 ? ((passportStarts / totalVisits) * 100).toFixed(1) : 0}% engaged
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Passport Completions</span>
          <div className="text-2xl font-black text-sky-600 mt-1 font-mono">{passportCompletions}</div>
          <div className="text-[10px] text-sky-600 mt-1 font-semibold">{passportCompletionRate}% finished quiz</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Outbound CTA Clicks</span>
          <div className="text-2xl font-black text-pink-600 mt-1 font-mono">{ctaClicks}</div>
          <div className="text-[10px] text-pink-600 mt-1 font-semibold">High-intent actions</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-emerald-800 font-bold">Confirmed Regs 🎉</span>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{confirmedRegistrations}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">Verified student seats</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Overall Conversion</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{overallCvr}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Visit → Confirmed</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Cost Per Confirmed Reg</span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
            {cac !== 'N/A' ? `₹${cac}` : 'N/A'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Effective acquisition CAC</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
          <span className="text-[11px] text-slate-500 font-semibold">Budget Spent</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹{totalSpent} / ₹2,000</div>
          <div className="text-[10px] text-slate-400 mt-1">₹{2000 - totalSpent} remaining</div>
        </div>
      </div>

      {/* CHARTS ROW 1: DAILY REGISTRATION TREND & CONVERSION FUNNEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 1: Daily Registration Trend vs Target Pacing */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-cute-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daily Registration Velocity 📈</h3>
              <p className="text-[11px] text-slate-500">Actual daily registrations vs. linear target trajectory</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
              7-Day Pace
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEMO_DAILY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={tooltipCustomStyle} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line
                  type="monotone"
                  dataKey="confirmedRegistrations"
                  name="Daily Confirmed"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981' }}
                />
                <Line
                  type="monotone"
                  dataKey="ctaClicks"
                  name="CTA Clicks"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Conversion Funnel */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-cute-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Full-Funnel Conversion &amp; Drop-Off 🎯</h3>
              <p className="text-[11px] text-slate-500">Step-by-step funnel attrition from visit to seat</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
              Funnel Flow
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis dataKey="stage" type="category" stroke="#475569" fontSize={10} width={105} />
                <Tooltip contentStyle={tooltipCustomStyle} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: CHANNEL BREAKDOWN & BUDGET SPEND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 3: Registrations by Channel */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-cute-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Acquisition by Channel 📢</h3>
              <p className="text-[11px] text-slate-500">Contribution of WhatsApp, campus, and viral loops</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Channel Share
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="channel" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={tooltipCustomStyle} />
                <Bar dataKey="confirmedRegistrations" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Confirmed Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Budget Allocated vs Spent */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-cute-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">₹2,000 Budget vs. Spend Execution 💰</h3>
              <p className="text-[11px] text-slate-500">Strict allocation ceilings and remaining expenditure</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Capital Cap
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={tooltipCustomStyle} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="Allocated" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Spent" fill="#F43F5E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FUNNEL DROP-OFF ANALYSIS & INSIGHTS */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          Growth Analyst Diagnostic Commentary ✨
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 mt-4 leading-relaxed font-medium">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
            <span className="font-bold text-brand-700 block mb-1">1. Top-of-Funnel Resonance:</span>
            The Project Passport quiz shows a high start rate (42.4% of landing visitors). Final-year students respond significantly better to discovering their customized project blueprint than generic registration forms.
          </div>
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
            <span className="font-bold text-sky-700 block mb-1">2. Mid-Funnel Completion:</span>
            76.3% of students who start the 3-question passport finish it to unlock their project plan. Keeping the questionnaire under 45 seconds is critical to avoiding mobile drop-off.
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="font-bold text-emerald-800 block mb-1">3. CAC Efficiency:</span>
            Effective blended CAC is ₹5.20 per confirmed student. High organic sharing in WhatsApp peer study groups keeps paid acquisition costs safely within the ₹2,000 budget cap.
          </div>
        </div>
      </div>
    </div>
  );
};
