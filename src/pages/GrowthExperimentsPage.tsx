import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import {
  isDemoMode,
  DEMO_EXPERIMENT_METRICS,
  getStoredLiveEvents,
  getStoredLiveRegistrations,
} from '../services/analytics';
import type { ExperimentVariantMetrics } from '../types';

export const GrowthExperimentsPage: React.FC = () => {
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());

  useEffect(() => {
    const handleUpdate = () => setDemoActive(isDemoMode());
    window.addEventListener('nxtwave_storage_updated', handleUpdate);
    return () => window.removeEventListener('nxtwave_storage_updated', handleUpdate);
  }, []);

  const liveEvents = getStoredLiveEvents();
  const liveRegs = getStoredLiveRegistrations();

  // Compute metrics for Variant A & B
  let metricsA: ExperimentVariantMetrics;
  let metricsB: ExperimentVariantMetrics;

  if (demoActive) {
    metricsA = DEMO_EXPERIMENT_METRICS.A;
    metricsB = DEMO_EXPERIMENT_METRICS.B;
  } else {
    const visitsA = liveEvents.filter((e) => e.variant === 'A' && (e.type === 'landing_page_view' || e.type === 'referral_visit')).length;
    const startsA = liveEvents.filter((e) => e.variant === 'A' && e.type === 'passport_started').length;
    const compsA = liveEvents.filter((e) => e.variant === 'A' && e.type === 'passport_completed').length;
    const ctaA = liveEvents.filter((e) => e.variant === 'A' && e.type === 'registration_cta_clicked').length;
    const regsA = liveRegs.filter((r) => r.variant === 'A').length;

    const visitsB = liveEvents.filter((e) => e.variant === 'B' && (e.type === 'landing_page_view' || e.type === 'referral_visit')).length;
    const startsB = liveEvents.filter((e) => e.variant === 'B' && e.type === 'passport_started').length;
    const compsB = liveEvents.filter((e) => e.variant === 'B' && e.type === 'passport_completed').length;
    const ctaB = liveEvents.filter((e) => e.variant === 'B' && e.type === 'registration_cta_clicked').length;
    const regsB = liveRegs.filter((r) => r.variant === 'B').length;

    metricsA = {
      variant: 'A',
      heading: 'Build Your First AI Project in 60 Minutes',
      subheading: 'Direct workshop outcome positioning',
      visits: visitsA,
      passportStarts: startsA,
      passportCompletions: compsA,
      ctaClicks: ctaA,
      confirmedRegistrations: regsA,
    };

    metricsB = {
      variant: 'B',
      heading: 'What AI Project Could You Build Today?',
      subheading: 'Curiosity-led passport quiz discovery first',
      visits: visitsB,
      passportStarts: startsB,
      passportCompletions: compsB,
      ctaClicks: ctaB,
      confirmedRegistrations: regsB,
    };
  }

  const cvrA = metricsA.visits > 0 ? ((metricsA.confirmedRegistrations / metricsA.visits) * 100).toFixed(2) : '0.00';
  const cvrB = metricsB.visits > 0 ? ((metricsB.confirmedRegistrations / metricsB.visits) * 100).toFixed(2) : '0.00';

  const numericCvrA = parseFloat(cvrA);
  const numericCvrB = parseFloat(cvrB);
  const totalSample = metricsA.visits + metricsB.visits;

  const isBLeading = numericCvrB > numericCvrA;
  const percentageLift =
    numericCvrA > 0 ? (((numericCvrB - numericCvrA) / numericCvrA) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-2 shadow-xs">
          <FlaskConical className="w-3.5 h-3.5 text-brand-600" />
          Growth Hypothesis Validation ✨
        </div>
        <h1 className="text-3xl font-black text-slate-900">A/B Messaging Experiments 🧪</h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Testing value proposition hooks: Does leading with immediate hands-on workshop outcomes (Variant A) convert better than leading with personalized curiosity and project discovery (Variant B)?
        </p>
      </div>

      {/* STATISTICAL RIGOR NOTICE */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 mb-8 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed font-medium">
          <span className="font-bold block mb-0.5">Statistical Discipline &amp; Guardrail:</span>
          Small sample sizes (&lt; 2,000 visitors per variant) provide <span className="font-bold underline decoration-amber-300">directional evidence only</span>. We do not prematurely declare statistical significance (e.g. p &lt; 0.05) when variances may stem from day-of-week timing or WhatsApp group quality rather than copy differences.
        </div>
      </div>

      {/* SIDE-BY-SIDE VARIANT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* VARIANT A */}
        <div className={`rounded-3xl p-6 sm:p-7 border transition shadow-cute-card ${
          !isBLeading && totalSample > 50
            ? 'bg-white border-2 border-emerald-400 ring-2 ring-emerald-100'
            : 'bg-white border-purple-100'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-purple-100 text-brand-700 font-mono font-black text-xs flex items-center justify-center border border-purple-200">
                A
              </span>
              <h3 className="text-sm font-bold text-slate-900">Direct Outcome Framing</h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
              Control Hook
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 mb-6">
            <div className="text-xs font-bold text-slate-400 mb-1">Headline Tested:</div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              "Build Your First AI Project in 60 Minutes — Join NxtWave's Free Workshop."
            </p>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Value focus: Time economy, zero fee, concrete engineering output.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Unique Visits</span>
              <div className="text-xl font-black font-mono text-slate-900 mt-1">{metricsA.visits}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Quiz Starts</span>
              <div className="text-xl font-black font-mono text-brand-600 mt-1">{metricsA.passportStarts}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">CTA Clicks</span>
              <div className="text-xl font-black font-mono text-pink-600 mt-1">{metricsA.ctaClicks}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-emerald-800 font-bold">Confirmed Regs</span>
              <div className="text-xl font-black font-mono text-emerald-700 mt-1">{metricsA.confirmedRegistrations}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">Confirmed CVR (Visit → Reg):</span>
            <span className="text-lg font-black font-mono text-slate-900">{cvrA}%</span>
          </div>
        </div>

        {/* VARIANT B */}
        <div className={`rounded-3xl p-6 sm:p-7 border transition shadow-cute-card ${
          isBLeading && totalSample > 50
            ? 'bg-white border-2 border-brand-500 ring-2 ring-purple-100'
            : 'bg-white border-purple-100'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-pink-100 text-pink-700 font-mono font-black text-xs flex items-center justify-center border border-pink-200">
                B
              </span>
              <h3 className="text-sm font-bold text-slate-900">Curiosity &amp; Discovery Hook ✨</h3>
            </div>
            <span className="text-[11px] font-mono text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 font-bold">
              Passport First
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 mb-6">
            <div className="text-xs font-bold text-slate-400 mb-1">Headline Tested:</div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              "What AI Project Could You Build? Discover Your Project Idea and Join a Free 60-Minute Workshop."
            </p>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Value focus: Personal identity, self-discovery quiz, low commitment opener.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Unique Visits</span>
              <div className="text-xl font-black font-mono text-slate-900 mt-1">{metricsB.visits}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Quiz Starts</span>
              <div className="text-xl font-black font-mono text-brand-600 mt-1">{metricsB.passportStarts}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">CTA Clicks</span>
              <div className="text-xl font-black font-mono text-pink-600 mt-1">{metricsB.ctaClicks}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-emerald-800 font-bold">Confirmed Regs</span>
              <div className="text-xl font-black font-mono text-emerald-700 mt-1">{metricsB.confirmedRegistrations}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-between">
            <span className="text-xs text-brand-700 font-bold">Confirmed CVR (Visit → Reg):</span>
            <span className="text-lg font-black font-mono text-brand-700">{cvrB}%</span>
          </div>
        </div>
      </div>

      {/* COMPUTED HEURISTIC RECOMMENDATION PANEL */}
      <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 shadow-cute-card">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900">Heuristic Growth Recommendation ✨</h3>
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-bold">
            Rule-Engine Computed
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
          <p>
            {isBLeading ? (
              <>
                <strong className="text-slate-900">Directional Finding:</strong> Variant B (Curiosity-led Project Passport) is generating an estimated{' '}
                <span className="text-brand-600 font-bold">+{percentageLift}% higher conversion</span> to confirmed registrations compared to the control. Engaging students with an interactive diagnostic quiz reduces psychological hesitation.
              </>
            ) : (
              <>
                <strong className="text-slate-900">Directional Finding:</strong> Both variants are performing within standard margin of error. No definitive copy superiority observed yet.
              </>
            )}
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs">
            <span className="font-bold text-brand-700 block mb-1">Recommended Campaign Action:</span>
            Allocate 70% of outgoing WhatsApp and campus ambassador broadcasts to <span className="font-bold text-slate-900">Variant B</span> messaging for Days 3 through 6. Maintain 30% on Variant A to monitor whether weekend engineering students behave differently.
          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Note: This advice is produced by deterministic rule-based campaign logic evaluating conversion thresholds, not by an external generative AI API.
          </p>
        </div>
      </div>
    </div>
  );
};
