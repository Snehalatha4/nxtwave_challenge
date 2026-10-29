import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Layers,
  Code2,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import type { InterestArea, CodingLevel, StudentGoal, ProjectRecommendation } from '../types';
import { getRecommendedProject } from '../data/projectsCatalog';
import { trackEvent } from '../services/analytics';
import { getAttributionParams, buildWhatsAppShareUrl } from '../utils/attribution';
import { CAMPAIGN_CONFIG } from '../services/config';

interface ProjectPassportPageProps {
  onOpenRegisterModal: (project?: ProjectRecommendation) => void;
}

export const ProjectPassportPage: React.FC<ProjectPassportPageProps> = ({ onOpenRegisterModal }) => {
  const attribution = getAttributionParams();

  // Questionnaire state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedInterest, setSelectedInterest] = useState<InterestArea | null>(null);
  const [selectedCodingLevel, setSelectedCodingLevel] = useState<CodingLevel | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<StudentGoal | null>(null);

  // Result state
  const [recommendation, setRecommendation] = useState<ProjectRecommendation | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Track questionnaire entry
    trackEvent('passport_started', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
    });
  }, [attribution.source, attribution.medium, attribution.variant, attribution.ref]);

  // Question definitions
  const interestOptions: { id: InterestArea; label: string; desc: string; icon: string }[] = [
    {
      id: 'productivity',
      label: 'Productivity & Personal Assistants',
      desc: 'Build AI schedulers, smart task organizers, or automated drafting agents.',
      icon: '⚡',
    },
    {
      id: 'computervision',
      label: 'Computer Vision & Visual Intelligence',
      desc: 'Identify real-world objects, detect lab components, or process webcam feeds.',
      icon: '👁️',
    },
    {
      id: 'education',
      label: 'Education & Learning Systems',
      desc: 'Generate interactive flashcards, explain algorithms, or build study tutors.',
      icon: '🎓',
    },
    {
      id: 'business',
      label: 'Business & Customer Support',
      desc: 'Design empathetic support bots, ticket triage, or sentiment analysis tools.',
      icon: '💼',
    },
    {
      id: 'devtools',
      label: 'Developer Tools & Automation',
      desc: 'Automate git commits, API documentation helpers, or code review bots.',
      icon: '🛠️',
    },
  ];

  const codingOptions: { id: CodingLevel; label: string; desc: string }[] = [
    {
      id: 'beginner',
      label: 'Beginner (Starting Fresh)',
      desc: 'I know minimal coding or am exploring programming for the first time.',
    },
    {
      id: 'basics',
      label: 'I Know the Basics',
      desc: 'Comfortable with basic syntax, loops, functions, and simple data structures.',
    },
    {
      id: 'comfortable',
      label: 'Comfortable Building Small Applications',
      desc: 'Have built full-stack apps or worked with REST APIs and modern frameworks.',
    },
  ];

  const goalOptions: { id: StudentGoal; label: string; desc: string }[] = [
    {
      id: 'resume',
      label: 'Build a High-Impact Resume Project',
      desc: 'Stand out in campus placements with a working deployment recruiters can test.',
    },
    {
      id: 'practical',
      label: 'Understand AI Practically',
      desc: 'Demystify prompts, LLMs, and APIs through hands-on code instead of theory.',
    },
    {
      id: 'explore',
      label: 'Explore Project Ideas & Directions',
      desc: 'Find inspiration for my final-year major/minor engineering project exhibition.',
    },
  ];

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 1) {
      if (!selectedInterest) {
        setValidationError('Please select the interest area that excites you most.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedCodingLevel) {
        setValidationError('Please select your current coding comfort level.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedGoal) {
        setValidationError('Please select your primary objective.');
        return;
      }
      generatePassport();
    }
  };

  const generatePassport = () => {
    if (!selectedInterest || !selectedCodingLevel || !selectedGoal) return;

    const project = getRecommendedProject(selectedInterest, selectedCodingLevel, selectedGoal);
    setRecommendation(project);
    setCurrentStep(4);

    // Track passport completed
    trackEvent('passport_completed', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
      metadata: {
        projectId: project.id,
        interest: selectedInterest,
        codingLevel: selectedCodingLevel,
        goal: selectedGoal,
      },
    });

    // Confetti effect
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#A78BFA', '#FB7185', '#38BDF8', '#FDE68A'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedInterest(null);
    setSelectedCodingLevel(null);
    setSelectedGoal(null);
    setRecommendation(null);
    setValidationError(null);
  };

  const getShareText = () => {
    if (!recommendation) return '';
    const shareUrl = window.location.origin + (attribution.ref ? `?ref=${attribution.ref}` : '');
    return `🎯 I just unlocked my AI Project Passport: "${recommendation.title}"!\n\nI'm building this in NxtWave's free 60-minute workshop: "${CAMPAIGN_CONFIG.workshopTitle}".\n\nDiscover what you could build here: ${shareUrl}`;
  };

  const handleCopyShare = async () => {
    const text = getShareText();
    trackEvent('share_clicked', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
      metadata: { method: 'clipboard', projectId: recommendation?.id },
    });

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = getShareText();
    trackEvent('share_clicked', {
      source: attribution.source,
      medium: attribution.medium,
      variant: attribution.variant,
      referralCode: attribution.ref,
      metadata: { method: 'whatsapp', projectId: recommendation?.id },
    });
    window.open(buildWhatsAppShareUrl(text), '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My AI Project Passport: ${recommendation?.title}`,
          text: getShareText(),
          url: window.location.origin,
        });
        trackEvent('share_clicked', {
          source: attribution.source,
          medium: attribution.medium,
          variant: attribution.variant,
          referralCode: attribution.ref,
          metadata: { method: 'native_share', projectId: recommendation?.id },
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopyShare();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header Bar */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 mb-3 shadow-xs">
          <Compass className="w-3.5 h-3.5 text-brand-600" />
          Interactive Diagnostic Engine ✨
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Project Passport 🎫
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Discover a curated starter blueprint calibrated to your interests, current coding level, and career aspirations.
        </p>

        {/* Cute Progress Pills */}
        {currentStep <= 3 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentStep === step
                    ? 'w-10 bg-gradient-to-r from-violet-600 to-pink-500 shadow-xs'
                    : currentStep > step
                    ? 'w-5 bg-emerald-400'
                    : 'w-5 bg-purple-100'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* QUESTIONNAIRE CARDS */}
      {currentStep <= 3 ? (
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-9 shadow-cute-card">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-brand-600 uppercase">Question 01 of 03</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">What interests you most?</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose the domain where you'd be most excited to see an AI application in action.
                </p>
              </div>

              <div className="space-y-3">
                {interestOptions.map((opt) => {
                  const isSelected = selectedInterest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedInterest(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50/80 border-2 border-brand-500 shadow-cute-sm'
                          : 'bg-slate-50/70 border-slate-200/90 hover:bg-purple-50/50 hover:border-purple-200 text-slate-700'
                      }`}
                    >
                      <div className="text-2xl p-1.5 bg-white rounded-xl shadow-xs border border-purple-100/60">{opt.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-brand-600 uppercase">Question 02 of 03</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  What is your current coding comfort level?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  We use this to tailor the project complexity so you're neither overwhelmed nor bored.
                </p>
              </div>

              <div className="space-y-3">
                {codingOptions.map((opt) => {
                  const isSelected = selectedCodingLevel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedCodingLevel(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50/80 border-2 border-brand-500 shadow-cute-sm'
                          : 'bg-slate-50/70 border-slate-200/90 hover:bg-purple-50/50 hover:border-purple-200 text-slate-700'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-brand-600 uppercase">Question 03 of 03</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">What is your main goal?</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  We calibrate the portfolio extensions and talking points based on your priority.
                </p>
              </div>

              <div className="space-y-3">
                {goalOptions.map((opt) => {
                  const isSelected = selectedGoal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedGoal(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50/80 border-2 border-brand-500 shadow-cute-sm'
                          : 'bg-slate-50/70 border-slate-200/90 hover:bg-purple-50/50 hover:border-purple-200 text-slate-700'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error message */}
          {validationError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mt-4 font-semibold">
              {validationError}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setCurrentStep(currentStep - 1);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-full font-bold bg-gradient-to-r from-violet-600 via-brand-500 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-cute-pink transition-all flex items-center gap-2 text-xs cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{currentStep === 3 ? 'Generate My Project Passport ✨' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 4: GENERATED PROJECT PASSPORT CARD (CUTE TECH BOARDING PASS) */
        recommendation && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Passport Container */}
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-10 shadow-cute-lg relative overflow-hidden">
              {/* Cute Passport Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-600 font-extrabold">
                      PASSPORT ISSUED • VERIFIED STARTER BLUEPRINT
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {recommendation.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {recommendation.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                    {recommendation.difficulty}
                  </span>
                </div>
              </div>

              {/* Passport Body Grid */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Project Overview
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{recommendation.shortDesc}</p>
                </div>

                {/* Why it matches */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50/60 border border-purple-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-700 mb-1">
                    <Lightbulb className="w-4 h-4 text-brand-600" />
                    Why This Matches Your Profile
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{recommendation.matchReason}</p>
                </div>

                {/* 3-Step Implementation Plan */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    3-Step Implementation Blueprint
                  </h3>
                  <div className="space-y-2.5">
                    {recommendation.implementationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                      >
                        <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                          0{idx + 1}
                        </span>
                        <span className="text-xs text-slate-700 leading-relaxed font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech & Learning Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                      <Code2 className="w-4 h-4 text-brand-600" />
                      Suggested Starter Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {recommendation.suggestedTech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      What You'll Learn
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 font-medium">
                      {recommendation.learningOutcomes.map((outcome, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Portfolio Extension */}
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200">
                  <h4 className="text-xs font-bold text-pink-700 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Portfolio &amp; Placement Level-Up Extension ✨
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {recommendation.portfolioExtension}
                  </p>
                </div>

                {/* Scope Note */}
                <div className="text-[11px] text-slate-500 italic">
                  Note: This passport presents a suggested blueprint demonstrating practical project directions. The 60-minute workshop teaches hands-on foundations to build and adapt projects like this.
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-8 pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restart Quiz
                </button>

                <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyShare}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-purple-200 shadow-cute-sm cursor-pointer"
                    title="Copy share message to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-emerald-200 shadow-xs cursor-pointer"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="px-3 py-2.5 rounded-full bg-white hover:bg-purple-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1 transition border border-purple-200 shadow-cute-sm cursor-pointer"
                    title="Share via device native share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('registration_cta_clicked', {
                        source: attribution.source,
                        medium: attribution.medium,
                        variant: attribution.variant,
                        referralCode: attribution.ref,
                        metadata: { projectId: recommendation.id },
                      });
                      onOpenRegisterModal(recommendation);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold bg-gradient-to-r from-violet-600 via-brand-500 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-cute-pink transition text-xs flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Register for Free Workshop 🚀</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
