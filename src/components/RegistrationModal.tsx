import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ExternalLink, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { recordConfirmedRegistration } from '../services/analytics';
import { getAttributionParams } from '../utils/attribution';
import { CAMPAIGN_CONFIG } from '../services/config';
import type { InterestArea, CodingLevel } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: InterestArea;
  defaultCodingLevel?: CodingLevel;
  projectTitle?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = 'productivity',
  defaultCodingLevel = 'beginner',
  projectTitle,
}) => {
  const attribution = getAttributionParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeTier, setCollegeTier] = useState<'Tier 1' | 'Tier 2' | 'Tier 3'>('Tier 2');
  const [interestArea, setInterestArea] = useState<string>(defaultInterest);
  const [codingLevel, setCodingLevel] = useState<string>(defaultCodingLevel);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredRef, setRegisteredRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { email?: string; name?: string } = {};
    if (!fullName.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      errs.email = 'Please provide a valid student email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Record verified registration
    const record = recordConfirmedRegistration({
      source: attribution.source,
      medium: attribution.medium,
      referralCode: attribution.ref,
      variant: attribution.variant,
      interestArea,
      codingLevel,
      collegeTier,
    });

    // Delightful Confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A78BFA', '#FB7185', '#38BDF8', '#FDE68A'],
      });
    } catch {
      // fallback if canvas not available
    }

    setRegisteredRef(record.registrationRef);
    setIsSubmitting(false);
  };

  const handleResetAndClose = () => {
    setRegisteredRef(null);
    setFullName('');
    setEmail('');
    setCollegeName('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-purple-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-cute-lg relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-purple-50 hover:bg-purple-100 transition cursor-pointer"
          aria-label="Close registration dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {!registeredRef ? (
          <div>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Workshop Registration (Simulation) ✨
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Claim Your Free Workshop Seat 🚀
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {CAMPAIGN_CONFIG.workshopTitle} • 60 Mins • Zero Cost
              </p>
              {projectTitle && (
                <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 text-xs text-purple-900 font-medium">
                  <span className="font-bold text-slate-700">Matched Blueprint:</span> {projectTitle}
                </div>
              )}
            </div>

            {/* Campaign Attribution Inspector */}
            <div className="mb-5 p-3 rounded-2xl bg-purple-50/70 border border-purple-100/80 text-xs text-slate-600 space-y-1 font-mono">
              <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                Preserved Campaign Attribution
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                <div>Source: <span className="text-brand-700 font-bold">{attribution.source}</span></div>
                <div>Medium: <span className="text-brand-700 font-bold">{attribution.medium}</span></div>
                <div>Variant: <span className="text-pink-600 font-bold">Variant {attribution.variant}</span></div>
                <div>Ref Code: <span className="text-emerald-700 font-bold">{attribution.ref || 'none (direct)'}</span></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul.sharma@engg.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. SRM / JNTU / RVCE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-brand-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Category
                  </label>
                  <select
                    value={collegeTier}
                    onChange={(e) => setCollegeTier(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:bg-white focus:border-brand-500 transition"
                  >
                    <option value="Tier 2">Tier 2 College</option>
                    <option value="Tier 3">Tier 3 / Affiliated College</option>
                    <option value="Tier 1">Tier 1 / Autonomous</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Interest Area
                  </label>
                  <select
                    value={interestArea}
                    onChange={(e) => setInterestArea(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:bg-white focus:border-brand-500 transition"
                  >
                    <option value="productivity">Productivity &amp; Assistants</option>
                    <option value="computervision">Computer Vision</option>
                    <option value="education">Education &amp; Flashcards</option>
                    <option value="business">Business &amp; Customer Support</option>
                    <option value="devtools">Developer Tools &amp; Automation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coding Comfort Level
                  </label>
                  <select
                    value={codingLevel}
                    onChange={(e) => setCodingLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:bg-white focus:border-brand-500 transition"
                  >
                    <option value="beginner">Beginner (Starting fresh)</option>
                    <option value="basics">I know the basics</option>
                    <option value="comfortable">Comfortable building apps</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-full font-bold bg-gradient-to-r from-violet-600 via-brand-500 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-cute-pink transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 fill-white/30" />
                  <span>{isSubmitting ? 'Confirming Seat...' : 'Confirm Free Registration 🎉'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By submitting, you simulate a verified registration event recorded in the Growth Analytics dashboard. No spam or commercial messages are sent.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-cute-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">Seat Confirmed! 🎉</h2>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your registration has been logged and attributed in the campaign database.
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-purple-50/60 border border-emerald-200 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Confirmation Reference:</span>
                <span className="font-mono font-bold text-emerald-700">{registeredRef}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Workshop:</span>
                <span className="font-bold text-slate-800">Build Your First AI Project in 60 Mins</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Attributed Channel:</span>
                <span className="font-bold text-brand-700">{attribution.source} / {attribution.medium}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Referral Code:</span>
                <span className="font-bold text-pink-600">{attribution.ref || 'Direct / None'}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 px-4 rounded-full font-bold bg-brand-600 hover:bg-brand-700 text-white transition text-sm cursor-pointer shadow-cute-sm"
              >
                Back to Launchpad ✨
              </button>

              <a
                href={CAMPAIGN_CONFIG.officialRegistrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition text-xs flex items-center justify-center gap-1.5"
              >
                <span>Visit Configured External Partner Endpoint</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
