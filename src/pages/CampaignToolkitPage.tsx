import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  MessageSquareShare,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../services/config';
import { getReferralCodes } from '../services/analytics';
import { buildCampaignUrl, buildWhatsAppShareUrl } from '../utils/attribution';

export const CampaignToolkitPage: React.FC = () => {
  const referrals = getReferralCodes();
  const [selectedRef, setSelectedRef] = useState<string>(referrals[0]?.code || 'club01');
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>('B');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic campaign URL based on chosen referral code & variant
  const campaignUrl = buildCampaignUrl({
    path: '/',
    source: 'toolkit',
    medium: 'social',
    campaign: CAMPAIGN_CONFIG.defaultCampaign,
    ref: selectedRef,
    variant: selectedVariant,
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // 6 Ready-to-copy Message Templates
  const templates = [
    {
      id: 'whatsapp_group',
      channel: 'WhatsApp Class / Batch Group 💬',
      badgeColor: 'text-emerald-800 bg-emerald-100 border-emerald-200',
      title: 'Final-Year Peer Recommendation',
      purpose: 'High peer-to-peer engagement without sounding like spam or promotion.',
      body: `Hey folks 👋 For anyone preparing for placements or looking to add a working AI project to their resume before interviews start:

NxtWave is conducting a completely free 60-minute hands-on workshop: "${CAMPAIGN_CONFIG.workshopTitle}".

Instead of just watching slides, you actually build a working AI prototype on your machine. Zero AI/ML prerequisite needed.

👉 Find what project matches your interest & grab your free seat here:
${campaignUrl}

Takes 45 seconds to generate your project blueprint! ✨`,
    },
    {
      id: 'campus_ambassador',
      channel: 'Campus Ambassador Direct Message 🎓',
      badgeColor: 'text-purple-800 bg-purple-100 border-purple-200',
      title: 'Class Rep / CR Announcement',
      purpose: 'Authoritative direct outreach to class representatives and student leaders.',
      body: `Hi everyone, quick heads up for our department final-year students! 🎓

As part of our placement skill preparation initiative, we're collaborating on a free 60-minute workshop with NxtWave: "${CAMPAIGN_CONFIG.workshopTitle}".

Key details:
• Duration: 60 minutes live hands-on
• Cost: 100% Free
• You build a real AI project for your resume (no generic weather apps)

Unlock your customized project passport and register using our campus fast-track link:
${campaignUrl}

Recommended for all students aiming for software & AI developer roles. 🚀`,
    },
    {
      id: 'coding_club',
      channel: 'Coding Club / Tech Society Announcement 🛠️',
      badgeColor: 'text-sky-800 bg-sky-100 border-sky-200',
      title: 'Technical Society Discord / Telegram Notice',
      purpose: 'Engages self-driven builders and technical enthusiasts.',
      body: `🚀 [Free Workshop] Build Your First Working AI Project in 60 Minutes

Tired of tutorial purgatory and copy-pasting code that you can't explain to interviewers?

Join NxtWave's free hands-on session where you'll build and deploy a working AI application in one hour.

Before joining, check out this 45-second interactive Project Passport to map your interests (NLP, Computer Vision, DevTools, EdTech) into an actionable 3-step build plan:
${campaignUrl}

✅ 100% Free • Open to all engineering branches • Practical code focus ✨`,
    },
    {
      id: 'email_outreach',
      channel: 'Email Newsletter / Placement Notice ✉️',
      badgeColor: 'text-amber-800 bg-amber-100 border-amber-200',
      title: 'Official Placement Cell Broadcast Format',
      purpose: 'Formal, credible email copy for departmental distribution lists.',
      body: `Subject: Hands-on Opportunity: Build Your First AI Project in 60 Minutes (Free Workshop)

Dear Final-Year Students,

Having verifiable proof-of-work and applied project experience is increasingly critical during technical placement interviews.

NxtWave is hosting an exclusive, free 60-minute hands-on masterclass:
"${CAMPAIGN_CONFIG.workshopTitle}"

Session Highlights:
1. Zero complex setup: Lightweight, browser-ready development.
2. Practical focus: Build a working AI micro-application from scratch.
3. Interview relevance: Learn how to discuss architecture, prompt structuring, and API integration.

To identify which project aligns with your career goals, take the short Project Passport quiz and secure your registration:
${campaignUrl}

Fee: 100% Free participation.
We encourage all interested students to register early.`,
    },
    {
      id: 'social_post',
      channel: 'LinkedIn / Social Media Post 📱',
      badgeColor: 'text-pink-800 bg-pink-100 border-pink-200',
      title: 'Short Viral Post for Student Developers',
      purpose: 'Organic distribution across LinkedIn and student Twitter/X feeds.',
      body: `Most final-year engineering resumes have the exact same 3 projects:
1. A basic todo app
2. An e-commerce bookstore
3. A static weather dashboard

In 2026, recruiters want to see applied AI thinking.

If you haven't built an AI project yet, NxtWave is running a free 60-minute live workshop: "${CAMPAIGN_CONFIG.workshopTitle}".

Discover what you could build in 45 seconds with the Project Passport:
${campaignUrl}

#EngineeringStudents #Placements #ArtificialIntelligence #SoftwareEngineering #NxtWave ✨`,
    },
    {
      id: 'final_reminder',
      channel: 'Final 24-Hour Reminder Broadcast ⏰',
      badgeColor: 'text-rose-800 bg-rose-100 border-rose-200',
      title: 'Closing Call / Last Chance Notice',
      purpose: 'Honest urgency without false claims or fake countdown timers.',
      body: `⏳ Final reminder: NxtWave's free 60-minute workshop "${CAMPAIGN_CONFIG.workshopTitle}" is taking place soon.

If you haven't locked in your seat yet, take 45 seconds to generate your personal AI Project Passport and register here:
${campaignUrl}

Free participation • 60 minutes • Practical prototype you can keep on your GitHub. See you live! 🚀`,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-2 shadow-xs">
          <MessageSquareShare className="w-3.5 h-3.5 text-brand-600" />
          Growth Execution Toolkit ✨
        </div>
        <h1 className="text-3xl font-black text-slate-900">Campaign Messaging &amp; QR Toolkit 📢</h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
          Pre-approved, friendly copy tailored for 6 distribution channels. Select your ambassador code to automatically bake personalized tracking links into each template.
        </p>
      </div>

      {/* DYNAMIC URL & QR GENERATOR BAR */}
      <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 mb-10 shadow-cute-card">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Dynamic Tracking Link Customizer ✨
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-bold">Select Referral Partner</label>
                <select
                  value={selectedRef}
                  onChange={(e) => setSelectedRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:bg-white focus:border-brand-500 font-medium cursor-pointer"
                >
                  {referrals.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code} — {r.ownerName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-bold">Experiment Variant Hook</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:bg-white focus:border-brand-500 font-medium cursor-pointer"
                >
                  <option value="B">Variant B: Curiosity / Passport First ✨</option>
                  <option value="A">Variant A: Direct Workshop Outcome</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 text-xs font-bold">Generated Campaign Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={campaignUrl}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-brand-700 select-all font-semibold"
                />
                <button
                  onClick={() => handleCopy('main_link', campaignUrl)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-cute-sm"
                >
                  {copiedId === 'main_link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'main_link' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 text-center">
            <div className="bg-white p-3 rounded-2xl shadow-cute-sm mb-2 border border-purple-100">
              <QRCodeSVG value={campaignUrl} size={110} level="M" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Campus Notice-Board QR</span>
            <span className="text-[10px] text-brand-600 font-mono font-bold mt-0.5">ref={selectedRef}</span>
          </div>
        </div>
      </div>

      {/* 6 MESSAGE TEMPLATE CARDS */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Ready-to-Copy Messages</span>
          <span className="text-xs font-normal text-slate-500">(1-click copy with your customized tracking link)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tmpl) => {
            const isCopied = copiedId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className="bg-white border border-purple-100 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-200 transition shadow-cute-card hover:shadow-cute"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${tmpl.badgeColor}`}>
                      {tmpl.channel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">1-Click Copy</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">{tmpl.title}</h3>
                  <p className="text-[11px] text-slate-500 mb-3">{tmpl.purpose}</p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-sans whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto mb-4 select-all font-medium">
                    {tmpl.body}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => window.open(buildWhatsAppShareUrl(tmpl.body), '_blank')}
                    className="px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition border border-emerald-200 cursor-pointer shadow-xs"
                  >
                    <span>Test in WhatsApp 💬</span>
                  </button>

                  <button
                    onClick={() => handleCopy(tmpl.id, tmpl.body)}
                    className="px-4 py-1.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 hover:text-brand-700 text-xs font-bold transition flex items-center gap-1.5 border border-purple-200 shadow-cute-sm cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
