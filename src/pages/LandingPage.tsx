import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Gift,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Zap,
  Heart,
  Smile,
  Rocket,
  Star,
} from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../services/config';
import { trackEvent } from '../services/analytics';
import { getAttributionParams } from '../utils/attribution';
import { PROJECTS_CATALOG } from '../data/projectsCatalog';

interface LandingPageProps {
  onOpenRegisterModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenRegisterModal }) => {
  const navigate = useNavigate();
  const attribution = getAttributionParams();

  // Track landing page view on mount
  useEffect(() => {
    trackEvent('landing_page_view', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
    });
  }, [attribution.source, attribution.medium, attribution.variant, attribution.ref]);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this workshop really 100% free?',
      a: 'Yes, absolutely! The 60-minute workshop is completely free of charge. No credit card, no hidden fees, and no surprise paywalls.',
    },
    {
      q: 'Do I need prior Machine Learning or Deep Learning experience?',
      a: 'Not at all! If you know basic programming concepts (variables, loops, functions), you will feel right at home. We focus on fun, practical building with ready-to-use APIs instead of heavy mathematics.',
    },
    {
      q: 'Will I need high-end GPU hardware or complex setup?',
      a: 'Nope! Everything runs directly in modern browser-based notebooks and web environments. Any basic laptop with Google Chrome or Firefox is all you need.',
    },
    {
      q: 'How does an AI project help with final-year campus placements?',
      a: 'Recruiters see hundreds of identical generic to-do apps and weather widgets. A real, working AI tool shows you know how to work with modern APIs, handle real user inputs, and build software that stands out.',
    },
    {
      q: 'What is the AI Project Passport on this page?',
      a: 'The Project Passport is a playful 45-second quiz that matches your interests and coding comfort with a tailored starter project plan so you know exactly what you could build before the workshop begins.',
    },
  ];

  const handleStartPassport = () => {
    trackEvent('passport_started', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
    });
    navigate('/passport');
  };

  const handleCtaClick = () => {
    trackEvent('registration_cta_clicked', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
    });
    onOpenRegisterModal();
  };

  // Select top 3 showcase projects
  const showcaseProjects = PROJECTS_CATALOG.slice(0, 3);

  return (
    <div className="relative">
      {/* Attribution Context Notice */}
      {attribution.ref && (
        <div className="bg-purple-100/90 border-b border-purple-200/80 py-2 px-4 text-center text-xs text-purple-900 font-medium">
          🌟 Referred by campus partner: <span className="font-mono font-bold text-brand-700">"{attribution.ref}"</span> • Enjoy fast-track workshop entry!
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Soft dreamy pastel blur orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-pink-200/40 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[450px] h-[300px] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[250px] bg-sky-200/35 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Workshop Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white border border-purple-100 text-xs mb-6 shadow-cute-sm">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center gap-1.5 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              NxtWave Workshop
            </span>
            <span className="px-2.5 py-1 text-slate-600 flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              60 Minutes
            </span>
            <span className="px-2.5 py-1 text-pink-700 flex items-center gap-1 font-bold bg-pink-50 rounded-full border border-pink-100">
              <Gift className="w-3.5 h-3.5 text-pink-500" />
              100% Free
            </span>
            <span className="hidden sm:inline px-2.5 py-1 text-slate-500 border-l border-slate-200 text-[11px] font-medium">
              For Final-Year Engineers 🎓
            </span>
          </div>

          {/* Hero Headings */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Your First AI Project <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Starts Here ✨
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Discover what you could build, then join NxtWave's free 60-minute AI project workshop.
            No boring theoretical slides—just hands-on, friendly building! 🚀
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
            <button
              onClick={handleStartPassport}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-cute-pink hover:shadow-cute-lg transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer text-base transform hover:-translate-y-0.5"
            >
              <span>Discover My AI Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-full font-bold bg-white hover:bg-purple-50/60 text-slate-700 border border-purple-200 shadow-cute-sm hover:shadow-cute transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              How It Works
            </a>
          </div>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <Smile className="w-4 h-4 text-brand-600" />
                Beginner Friendly
              </div>
              <p className="text-xs text-slate-500">Zero prior AI/ML setup or high-end GPU needed.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-sky-500" />
                60-Min Sprint
              </div>
              <p className="text-xs text-slate-500">Fast, practical live coding that respects your schedule.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-amber-500" />
                Placement Edge
              </div>
              <p className="text-xs text-slate-500">Stand out with a modern AI build on your resume.</p>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-purple-100/80 shadow-cute-card hover:shadow-cute transition-all">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-pink-500" />
                100% Free
              </div>
              <p className="text-xs text-slate-500">Free educational initiative for final-year students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-purple-50/40 border-y border-purple-100 scroll-mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
              Simple 3-Step Journey
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-4">How Project Launchpad Works ✨</h2>
            <p className="text-slate-600 text-sm mt-2">
              We took out the complicated slides. Here is your friendly path from zero idea to your first working prototype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white border border-purple-100 rounded-3xl p-7 relative group hover:border-brand-300 shadow-cute-card hover:shadow-cute transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-brand-100 text-brand-700 flex items-center justify-center font-black text-lg mb-5 border border-purple-200 shadow-xs">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Take the 45s Quiz</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Answer 3 quick questions about your coding comfort and goals. Our deterministic engine maps your profile to a tailored project blueprint.
              </p>
              <div className="text-xs font-bold text-brand-600 flex items-center gap-1">
                <span>⏱️ Takes ~45 seconds</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-purple-100 rounded-3xl p-7 relative group hover:border-pink-300 shadow-cute-card hover:shadow-cute transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700 flex items-center justify-center font-black text-lg mb-5 border border-pink-200 shadow-xs">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Get Your Project Passport</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Receive an actionable 3-step technical roadmap, suggested libraries, and a portfolio extension idea to elevate your resume.
              </p>
              <div className="text-xs font-bold text-pink-600 flex items-center gap-1">
                <span>🎫 Shareable digital card</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-purple-100 rounded-3xl p-7 relative group hover:border-emerald-300 shadow-cute-card hover:shadow-cute transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-5 border border-emerald-200 shadow-xs">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Build Live in 60 Mins</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Join NxtWave's live code-along. Follow along with an expert mentor and walk away with a real working prototype on your computer.
              </p>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>🎉 100% Free • Live Q&amp;A</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleStartPassport}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white transition shadow-cute-pink cursor-pointer text-sm transform hover:-translate-y-0.5"
            >
              <span>Get Started: Take the 45-Second Quiz ✨</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* EXAMPLE PROJECT BLUEPRINTS SHOWCASE */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
              Curated Starter Blueprints
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">What You Could Build 💡</h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Here are sample project concepts designed for engineering students. Each is calibrated for rapid prototyping and strong interview talking points.
            </p>
          </div>
          <button
            onClick={handleStartPassport}
            className="mt-4 md:mt-0 text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>See your personal recommendation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-purple-100 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-300 transition shadow-cute-card hover:shadow-cute"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200">
                    {p.tag}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono font-medium">
                    <Clock className="w-3 h-3 text-sky-500" />
                    {p.timeToPrototype}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.shortDesc}</p>

                <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">3-Step Build:</span>
                  {p.implementationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="font-mono text-brand-600 text-[11px] font-bold">0{idx + 1}.</span>
                      <span className="line-clamp-2">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.suggestedTech.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleStartPassport}
                  className="w-full py-2.5 rounded-full bg-purple-50 hover:bg-brand-600 text-brand-700 hover:text-white transition text-xs font-bold cursor-pointer border border-purple-200"
                >
                  Generate My Custom Passport ✨
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY FINAL-YEAR STUDENTS NEED THIS */}
      <section className="py-16 bg-gradient-to-b from-purple-50/50 to-pink-50/30 border-t border-purple-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 mb-3 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Placement Season Edge 🚀
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-4">
                Why Final-Year Engineers Need More Than Just Generic Clone Apps
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Every engineering graduate has a basic React to-do app or static e-commerce clone on their resume. Recruiters screen hundreds of identical profiles in seconds.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Building a working AI prototype demonstrates that you understand how to interface with modern APIs, handle structured outputs, and solve real user pain points.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-purple-100 text-brand-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Live Working GitHub Repo</h4>
                    <p className="text-[11px] text-slate-500">Proof of work you can link directly in your resume and discuss in technical rounds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-pink-100 text-pink-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Real Interview Talking Points</h4>
                    <p className="text-[11px] text-slate-500">Explain prompt structuring, hallucination mitigation, and API trade-offs with confidence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl p-7 shadow-cute-lg relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-black text-slate-900">Workshop Quick Facts</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  NxtWave
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Session Name:</span>
                  <span className="text-slate-800 font-bold">{CAMPAIGN_CONFIG.workshopTitle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Duration:</span>
                  <span className="text-slate-800 font-bold">60 Minutes Online</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Cost:</span>
                  <span className="text-emerald-700 font-bold">100% Free (Zero Fees)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Audience:</span>
                  <span className="text-slate-800 font-bold">Final-Year Engineering Students</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Format:</span>
                  <span className="text-brand-600 font-bold">Guided Live Hands-on Code-along</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={handleCtaClick}
                  className="w-full py-3.5 rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white transition text-xs flex items-center justify-center gap-2 cursor-pointer shadow-cute-pink"
                >
                  <span>Claim Your Free Workshop Seat 🚀</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3">Frequently Asked Questions 🤔</h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear, honest answers with zero corporate confusion.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-purple-100 rounded-2xl overflow-hidden transition shadow-cute-card"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-800 hover:text-brand-600 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scope Disclaimer Box */}
        <div className="mt-12 p-5 rounded-3xl bg-white border border-purple-100 text-xs text-slate-500 leading-relaxed shadow-cute-card">
          <span className="font-bold text-slate-800">Transparency Commitment:</span> We do not fabricate workshop dates, speakers, certificates, or guaranteed job placements. The Project Passport provides structured starter blueprints to guide your learning exploration.
        </div>
      </section>

      {/* STICKY BOTTOM CALLOUT ON MOBILE */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
        <button
          onClick={handleStartPassport}
          className="w-full py-3.5 px-4 rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-cute-pink flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span>Discover My AI Project (45s) ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
