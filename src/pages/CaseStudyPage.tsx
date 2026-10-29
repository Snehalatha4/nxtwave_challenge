import React from 'react';
import {
  BookOpen,
  Printer,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../services/config';

export const CaseStudyPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-purple-100 pb-6 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-2 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-brand-600" />
            NxtWave Growth Intern Challenge Case Study ✨
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            Project Launchpad: Strategic Growth Manifesto 🚀
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Product &amp; growth architecture to acquire 500 final-year engineering student registrations for NxtWave's free 60-min AI workshop on a ₹2,000 budget.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-purple-200 transition text-xs font-bold flex items-center gap-2 self-start sm:self-center shadow-cute-sm cursor-pointer"
        >
          <Printer className="w-4 h-4 text-brand-600" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Presentation Fast-Deck Summary Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-50/90 via-pink-50/50 to-sky-50/60 border border-purple-200/90 mb-12 shadow-cute-card no-print">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          Executive 3-Minute Interview Pitch Summary ✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 mt-3 leading-relaxed font-medium">
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="font-bold text-brand-700 block mb-1">1. The Student Hook (Why It Works):</span>
            Instead of pushing another generic registration form, Project Launchpad uses an interactive "AI Project Passport" that diagnoses student interest and returns a tailored 3-step build plan in 45 seconds, transforming passive curiosity into workshop intent.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="font-bold text-pink-700 block mb-1">2. Growth Engine (Unit Economics):</span>
            Targeting 500 registrations with ₹2,000 mandates a blended CAC of ≤ ₹4.00. We prioritize high-trust organic channels (WhatsApp class groups: 200, Campus ambassadors: 150, Viral passport loops: 100), allocating ₹1,500 of the budget to micro-incentives and boost experiments.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="font-bold text-emerald-800 block mb-1">3. Analytics &amp; Integrity:</span>
            Strictly separates outbound interest clicks from verified confirmed registrations. Uses session-level deduplication, transparent demo/live toggle, and attribution preservation across all touchpoints.
          </div>
        </div>
      </div>

      {/* 13 DETAILED SECTIONS */}
      <div className="space-y-12 text-slate-700">
        {/* SECTION 1: PROBLEM STATEMENT */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 01
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">1. Problem Statement &amp; Challenge Context</h2>
          <div className="text-sm space-y-3 leading-relaxed font-medium text-slate-600">
            <p>
              NxtWave aims to acquire <strong className="text-slate-900">500 valid registrations</strong> from final-year engineering students for its free online masterclass: <span className="text-brand-700 italic font-semibold">"{CAMPAIGN_CONFIG.workshopTitle}"</span>.
            </p>
            <p>
              The challenge is governed by three critical constraints:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong className="text-slate-800">Strict Capital Ceiling:</strong> Total budget of ₹2,000 for the entire campaign duration (₹4.00 blended CAC ceiling).</li>
              <li><strong className="text-slate-800">7-Day Execution Window:</strong> Demands an average acquisition velocity of ~71 verified students per day.</li>
              <li><strong className="text-slate-800">Fatigued Audience:</strong> Final-year students are overwhelmed with placement pressure, spammy webinars, and low-quality generic landing pages.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: TARGET STUDENT PERSONA */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 02
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">2. Target Student Persona 🎓</h2>
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 shadow-cute-card">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Rohit &amp; Sneha (The Final-Year Tier 2/3 Engineering Aspirant)</h3>
                <p className="text-xs text-slate-500">7th/8th Semester B.Tech (Computer Science, IT, ECE, AI/DS)</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-100 text-purple-800 font-bold">
                Primary Target
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800 block mb-1">Current State:</span>
                Facing impending on-campus/off-campus placement drives. Possesses theoretical syntax knowledge (Java, C++, Python) but lacks distinctive applied projects on their resume.
              </div>
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800 block mb-1">Media Consumption:</span>
                Spends 3–4 hours daily on WhatsApp batch groups, college Discord/Telegram channels, and LinkedIn browsing job openings. High trust in peer recommendations.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: STUDENT MOTIVATION AND BARRIERS */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 03
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">3. Student Motivation &amp; Psychological Barriers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
            <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-cute-card">
              <h3 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Core Motivations (Pulls)
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong className="text-slate-800">Resume Differentiation:</strong> Overcoming the generic "Todo App / Weather App" clutter that recruiters discard.</li>
                <li>• <strong className="text-slate-800">Demystifying AI/LLMs:</strong> Moving from consuming ChatGPT prompts to integrating APIs programmatically.</li>
                <li>• <strong className="text-slate-800">Time Economy:</strong> 60 minutes is an approachable time commitment during intensive semester schedules.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-cute-card">
              <h3 className="text-sm font-bold text-rose-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Key Barriers &amp; Objections (Friction)
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong className="text-slate-800">"Will this be a sales pitch?":</strong> Fear that the 60 minutes will be 50 minutes of upselling course packages.</li>
                <li>• <strong className="text-slate-800">"Do I need math/GPUs?":</strong> Intimidation by complex PyTorch/TensorFlow mathematical prerequisites.</li>
                <li>• <strong className="text-slate-800">Form Fatigue:</strong> Hesitation to fill out long personal registration forms without immediate value.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: GROWTH HYPOTHESIS */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 04
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">4. Core Growth Hypothesis ✨</h2>
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50/60 border border-purple-200 text-xs leading-relaxed space-y-2 shadow-cute-card">
            <p className="text-sm font-bold text-slate-900">
              The "Value-Before-Registration" Principle:
            </p>
            <p className="text-slate-700 font-medium">
              If we present students with an interactive diagnostic tool (the <strong className="text-brand-700">AI Project Passport</strong>) that gives them immediate, personalized value (a concrete 3-step project roadmap tailored to their interest and coding skill) <em>before</em> asking for registration commitment, then:
            </p>
            <ol className="list-decimal pl-5 space-y-1 font-mono text-slate-800 font-semibold">
              <li>Visitor-to-registration conversion rate will increase from the industry benchmark of 3–5% to 8–11%.</li>
              <li>Students will organically share their generated Project Passport in college WhatsApp groups, unlocking a viral peer referral loop (k-factor ≥ 0.25).</li>
            </ol>
          </div>
        </section>

        {/* SECTION 5: CHANNEL PRIORITIZATION */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 05
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">5. Channel Prioritization &amp; Acquisition Strategy 📢</h2>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            Hypothesized channel volume contributions toward the 500-registration target (planned modeling figures):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
            <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-brand-700 block mb-1">1. WhatsApp Batches</span>
              <div className="text-xl font-black font-mono text-slate-900">200 Target Regs</div>
              <p className="text-[11px] text-slate-500 mt-1">40% share • Distributed through class reps &amp; placement group leads.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-sky-700 block mb-1">2. Campus Connectors</span>
              <div className="text-xl font-black font-mono text-slate-900">150 Target Regs</div>
              <p className="text-[11px] text-slate-500 mt-1">30% share • Driven by coding club heads &amp; micro-incentives.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-pink-700 block mb-1">3. Viral Passport Loop</span>
              <div className="text-xl font-black font-mono text-slate-900">100 Target Regs</div>
              <p className="text-[11px] text-slate-500 mt-1">20% share • 1-click WhatsApp share from passport results.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-amber-700 block mb-1">4. Direct / Notice QR</span>
              <div className="text-xl font-black font-mono text-slate-900">50 Target Regs</div>
              <p className="text-[11px] text-slate-500 mt-1">10% share • Notice board QR posters &amp; organic LinkedIn posts.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: REGISTRATION ACQUISITION MODEL */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 06
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">6. Unit Economics &amp; Acquisition Funnel Math 🧮</h2>
          <div className="overflow-x-auto bg-white border border-purple-100 rounded-3xl shadow-cute-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-purple-100">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Funnel Stage</th>
                  <th className="py-3.5 px-4 text-center font-bold">Benchmark Assumption</th>
                  <th className="py-3.5 px-4 text-center font-bold">Modeled Volume Required</th>
                  <th className="py-3.5 px-4 font-bold">Strategic Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-slate-700 font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">1. Total Landing Visits</td>
                  <td className="py-3.5 px-4 text-center font-mono">100%</td>
                  <td className="py-3.5 px-4 text-center font-mono text-brand-700 font-bold">5,000 Impressions</td>
                  <td className="py-3.5 px-4 text-slate-500">Class broadcasts across 25 targeted engineering colleges.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">2. Passport Quiz Starts</td>
                  <td className="py-3.5 px-4 text-center font-mono">40% of visitors</td>
                  <td className="py-3.5 px-4 text-center font-mono">2,000 Starts</td>
                  <td className="py-3.5 px-4 text-slate-500">Curiosity hook: "What AI Project Could You Build?"</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">3. Passport Completions</td>
                  <td className="py-3.5 px-4 text-center font-mono">75% completion</td>
                  <td className="py-3.5 px-4 text-center font-mono">1,500 Completions</td>
                  <td className="py-3.5 px-4 text-slate-500">Only 3 questions; takes &lt;45s on mobile.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">4. Workshop CTA Clicks</td>
                  <td className="py-3.5 px-4 text-center font-mono">50% of completed</td>
                  <td className="py-3.5 px-4 text-center font-mono text-pink-600 font-bold">750 Clicks</td>
                  <td className="py-3.5 px-4 text-slate-500">Contextual CTA: "Build this live in 60 mins".</td>
                </tr>
                <tr className="bg-emerald-50/70">
                  <td className="py-3.5 px-4 font-black text-emerald-800">5. Confirmed Registrations 🎉</td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-800 font-bold">66.7% of CTA</td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-800 font-black text-sm">500 Valid Seats</td>
                  <td className="py-3.5 px-4 text-emerald-900">Zero fee barrier; fast email submission.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7: BUDGET ALLOCATION */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 07
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">7. Strategic Budget Allocation (₹2,000 Cap) 💰</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium">
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-slate-900 block mb-1">Targeted Promotion: ₹1,000 (50%)</span>
              <p className="text-slate-500 leading-relaxed">Used for hyper-targeted Instagram/WhatsApp micro-boosts focused exclusively on Tier 2/3 engineering colleges on Days 3–5.</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-slate-900 block mb-1">Campus Activation: ₹500 (25%)</span>
              <p className="text-slate-500 leading-relaxed">Book/learning credit vouchers for the top 3 campus coding club leads delivering &gt;30 verified student participants.</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-slate-900 block mb-1">Creative &amp; QR: ₹200 (10%)</span>
              <p className="text-slate-500 leading-relaxed">Printed high-contrast notice-board QR posters placed on college lab notice boards.</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-cute-card">
              <span className="font-bold text-slate-900 block mb-1">Contingency: ₹300 (15%)</span>
              <p className="text-slate-500 leading-relaxed">Day 6 acceleration fund in case pacing lags below 70 daily registrations.</p>
            </div>
          </div>
        </section>

        {/* SECTION 8: SEVEN-DAY EXECUTION PLAN */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 08
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">8. Seven-Day Phased Execution Plan 🗓️</h2>
          <div className="space-y-3 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100">Day 01</span>
              <div>
                <span className="font-bold text-slate-900">Soft Launch &amp; Ambassador Provisioning:</span> Setup custom referral codes for 10 initial campus ambassadors. Broadcast Variant A and B in 5 high-density coding clubs. Verify analytics tracking.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100">Day 02</span>
              <div>
                <span className="font-bold text-slate-900">Channel Baselines &amp; Organic WhatsApp:</span> Activate 25 class representative broadcasts. Monitor quiz completion rates and remove low-performing message formats.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100">Day 03</span>
              <div>
                <span className="font-bold text-slate-900">A/B Winner Identification &amp; Paid Ignition:</span> Evaluate Variant A vs B conversion data. Deploy initial ₹500 targeted boost behind the winning copy angle.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100">Day 04</span>
              <div>
                <span className="font-bold text-slate-900">Notice-Board QR &amp; Placement Cell Outlines:</span> Deploy offline QR assets across engineering campus notice boards. Distribute official email formats to placement cell contacts.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-brand-700 px-2.5 py-0.5 rounded-full bg-purple-100">Day 05</span>
              <div>
                <span className="font-bold text-slate-900">Ambassador Leaderboard Push:</span> Mid-campaign milestone check with campus partners. Release intermediate referral leaderboard to spark friendly inter-college competition.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-start gap-3 shadow-xs">
              <span className="font-mono font-bold text-pink-700 px-2.5 py-0.5 rounded-full bg-pink-100">Day 06</span>
              <div>
                <span className="font-bold text-slate-900">Final 24-Hour Reminder Broadcast:</span> Deploy urgency template across all WhatsApp groups. Deploy contingency budget if lagging behind 400 registrations.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex items-start gap-3 shadow-xs bg-emerald-50/40">
              <span className="font-mono font-bold text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-100">Day 07</span>
              <div>
                <span className="font-bold text-slate-900">Workshop Day Live Onboarding:</span> Final confirmation reminders, calendar links, and live onboarding for 500 verified students. 🎉
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FUNNEL MEASUREMENT & DATA HYGIENE */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 09
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">9. Funnel Measurement &amp; Anti-Spam Integrity</h2>
          <div className="text-xs space-y-2 leading-relaxed font-medium text-slate-600">
            <p>
              To maintain absolute analytical integrity:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong className="text-slate-900">Strict Outbound vs. Confirmed Separation:</strong> Outbound button clicks (<code className="text-brand-700 font-bold">registration_cta_clicked</code>) are never counted as confirmed registrations (<code className="text-emerald-700 font-bold">registration_confirmed</code>).</li>
              <li><strong className="text-slate-900">Session Deduplication:</strong> Prevents rapid repeat clicks within 1.5s from artificially inflating metrics.</li>
              <li><strong className="text-slate-900">Zero PII Storage:</strong> No unmasked personal phone numbers or passwords are stored in analytics records.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 10: WHAT CHANGED FROM FIRST IDEA */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 10
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">10. What Changed from the Initial Concept ✨</h2>
          <div className="p-6 rounded-3xl bg-white border border-purple-100 text-xs space-y-3 leading-relaxed shadow-cute-card font-medium">
            <p>
              <strong className="text-slate-900">Initial Idea:</strong> Build a standard high-conversion landing page with a countdown timer, speaker headshot, and a registration form.
            </p>
            <p>
              <strong className="text-brand-700">Why It Was Rejected:</strong> Final-year students are completely blind to standard landing pages. They ignore countdown timers because they recognize them as fake scarcity.
            </p>
            <p>
              <strong className="text-emerald-800">The Pivot to Project Launchpad:</strong> Replaced the landing page with an interactive diagnostic experience. Giving the student an tangible blueprint (<span className="text-slate-900 font-bold">"My AI Project Passport"</span>) creates psychological ownership: they aren't registering for a generic lecture; they are registering to build <em>their</em> project.
            </p>
          </div>
        </section>

        {/* SECTION 11: WHAT I WOULD IMPROVE WITH ANOTHER 24 HOURS */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 11
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">11. What I Would Improve with Another 24 Hours ⏳</h2>
          <ul className="space-y-2 text-xs text-slate-600 list-disc pl-5 font-medium">
            <li><strong className="text-slate-900">Automated WhatsApp Webhook Bot:</strong> Ingest incoming leads via a dedicated WhatsApp Business API to deliver the passport PDF directly into student chats.</li>
            <li><strong className="text-slate-900">GitHub OAuth One-Click Starter Repo:</strong> Automatically fork a starter AI template to the student's GitHub upon passport completion.</li>
            <li><strong className="text-slate-900">Live College Leaderboard Widget:</strong> An interactive public ticker showing which engineering campus has the highest student sign-ups.</li>
          </ul>
        </section>

        {/* SECTION 12: AI SUGGESTIONS REJECTED AND WHY */}
        <section className="border-b border-purple-100 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 12
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">12. AI Suggestions Rejected &amp; Human Rationale 🧠</h2>
          <div className="space-y-3 text-xs font-medium">
            <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-cute-card">
              <span className="font-bold text-rose-700 block mb-1">Rejected: Fake Real-Time "Someone from Chennai just registered" popups</span>
              <p className="text-slate-500 leading-relaxed">
                Generative AI tools frequently suggest synthetic FOMO notifications. We rejected this entirely because modern engineering students easily spot fake toasts, which instantly destroys brand credibility.
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-cute-card">
              <span className="font-bold text-rose-700 block mb-1">Rejected: Faking a live LLM API call on client-side</span>
              <p className="text-slate-500 leading-relaxed">
                Rather than putting a fake loading spinner pretending to call GPT-4, we engineered a deterministic, instant rule-based recommendation catalog that works offline, zero API latency, zero failure risk, and complete transparency.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 13: LIMITATIONS AND ASSUMPTIONS */}
        <section className="pb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-wider mb-1">
            Section 13
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">13. Limitations &amp; Explicit Assumptions</h2>
          <div className="text-xs space-y-2 text-slate-600 leading-relaxed font-medium">
            <p>
              • <strong className="text-slate-800">Attribution Isolation:</strong> Cross-device attribution (e.g., student browses on mobile WhatsApp, registers on desktop) requires unified email identity mapping, which is simulated in this environment.
            </p>
            <p>
              • <strong className="text-slate-800">External Form Tracking:</strong> When using external Google Forms or Typeform for registrations, post-back webhooks are necessary to achieve 100% verified attribution.
            </p>
            <p>
              • <strong className="text-slate-800">Channel Overlap:</strong> A student may receive a WhatsApp message and also scan a campus notice board QR. Standard last-touch attribution is applied to avoid double-counting.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
