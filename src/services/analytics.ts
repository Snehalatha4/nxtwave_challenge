import type {
  TrackingEvent,
  EventType,
  ReferralCode,
  ConfirmedRegistration,
  BudgetCategory,
  ExperimentVariantMetrics,
} from '../types';
import { CAMPAIGN_CONFIG } from './config';

// Storage keys
const STORAGE_EVENTS_KEY = 'nxtwave_launchpad_events';
const STORAGE_REGISTRATIONS_KEY = 'nxtwave_launchpad_registrations';
const STORAGE_REFERRALS_KEY = 'nxtwave_launchpad_referrals';
const STORAGE_DEMO_MODE_KEY = 'nxtwave_launchpad_demo_mode';
const STORAGE_SESSION_ID_KEY = 'nxtwave_launchpad_session_id';
const STORAGE_BUDGET_KEY = 'nxtwave_launchpad_budget';

// Default Referral Codes
export const DEFAULT_REFERRAL_CODES: ReferralCode[] = [
  {
    code: 'club01',
    label: 'Campus Coding Club - Lead Rohit',
    ownerType: 'club',
    ownerName: 'Rohit Verma (Coding Club Lead)',
    college: 'SREC Warangal (Tier 2)',
    active: true,
    createdAt: '2026-10-22',
  },
  {
    code: 'campus02',
    label: 'Campus Ambassador - Priya S.',
    ownerType: 'ambassador',
    ownerName: 'Priya Sharma (Student Ambassador)',
    college: 'MVJ College of Engineering (Tier 2)',
    active: true,
    createdAt: '2026-10-23',
  },
  {
    code: 'student03',
    label: 'Final Year CSE Rep - Ankit',
    ownerType: 'student',
    ownerName: 'Ankit Patel (CSE Class Rep)',
    college: 'BMS Institute of Technology',
    active: true,
    createdAt: '2026-10-24',
  },
];

// Initial Proposed Budget
export const DEFAULT_BUDGET: BudgetCategory[] = [
  {
    id: 'b1',
    name: 'Targeted Promotion Experiment',
    allocated: 1000,
    spent: 450,
    description: 'Focused WhatsApp broadcast boosts & targeted student developer group outreach.',
  },
  {
    id: 'b2',
    name: 'Campus Ambassador Activation',
    allocated: 500,
    spent: 350,
    description: 'Micro-incentives (certificates, book vouchers) for top 3 campus club leaders.',
  },
  {
    id: 'b3',
    name: 'Creative Assets & QR Materials',
    allocated: 200,
    spent: 120,
    description: 'Printable notice-board QR posters and digital share badges.',
  },
  {
    id: 'b4',
    name: 'Contingency & Reserve',
    allocated: 300,
    spent: 0,
    description: 'Reserved for mid-week channel adjustments or Day 6 final sprint.',
  },
];

// Helper to get or generate anonymous session ID
export function getOrCreateSessionId(): string {
  try {
    let sid = sessionStorage.getItem(STORAGE_SESSION_ID_KEY);
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      sessionStorage.setItem(STORAGE_SESSION_ID_KEY, sid);
    }
    return sid;
  } catch {
    return 'sess_fallback_' + Date.now();
  }
}

// Generate random UUID
function generateId(): string {
  return 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
}

// Check if Demo Mode is currently active (defaults to true for assignment demonstration)
export function isDemoMode(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_DEMO_MODE_KEY);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

export function setDemoMode(active: boolean): void {
  try {
    localStorage.setItem(STORAGE_DEMO_MODE_KEY, String(active));
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Error saving demo mode state', e);
  }
}

// Read raw stored live events
export function getStoredLiveEvents(): TrackingEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Read raw stored live registrations
export function getStoredLiveRegistrations(): ConfirmedRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_REGISTRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Read referral codes
export function getReferralCodes(): ReferralCode[] {
  try {
    const raw = localStorage.getItem(STORAGE_REFERRALS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_REFERRAL_CODES;
  } catch {
    return DEFAULT_REFERRAL_CODES;
  }
}

// Save referral codes
export function saveReferralCodes(codes: ReferralCode[]): void {
  try {
    localStorage.setItem(STORAGE_REFERRALS_KEY, JSON.stringify(codes));
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Error saving referral codes', e);
  }
}

// Read budget
export function getBudgetCategories(): BudgetCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_BUDGET_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_BUDGET;
  } catch {
    return DEFAULT_BUDGET;
  }
}

// Save budget
export function saveBudgetCategories(categories: BudgetCategory[]): void {
  try {
    localStorage.setItem(STORAGE_BUDGET_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Error saving budget', e);
  }
}

// Track an event (Live)
export function trackEvent(
  type: EventType,
  params: {
    source?: string;
    medium?: string;
    variant?: 'A' | 'B';
    referralCode?: string;
    metadata?: Record<string, any>;
  } = {}
): TrackingEvent {
  const currentEvents = getStoredLiveEvents();
  const sessionId = getOrCreateSessionId();

  // Deduplication check: prevent multiple identical events within 1.5 seconds for same session
  const now = Date.now();
  const recentDuplicate = currentEvents.find(
    (e) =>
      e.sessionId === sessionId &&
      e.type === type &&
      now - new Date(e.timestamp).getTime() < 1500
  );

  if (recentDuplicate) {
    return recentDuplicate;
  }

  const newEvent: TrackingEvent = {
    id: generateId(),
    type,
    timestamp: new Date().toISOString(),
    campaignId: CAMPAIGN_CONFIG.defaultCampaign,
    source: params.source || CAMPAIGN_CONFIG.defaultSource,
    medium: params.medium || CAMPAIGN_CONFIG.defaultMedium,
    variant: params.variant || 'A',
    referralCode: params.referralCode,
    sessionId,
    metadata: params.metadata,
  };

  try {
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify([newEvent, ...currentEvents]));
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Failed to persist tracking event', e);
  }

  return newEvent;
}

// Record a confirmed registration (Live)
export function recordConfirmedRegistration(params: {
  source: string;
  medium: string;
  referralCode?: string;
  variant: 'A' | 'B';
  interestArea?: string;
  codingLevel?: string;
  collegeTier?: 'Tier 1' | 'Tier 2' | 'Tier 3';
}): ConfirmedRegistration {
  const currentRegs = getStoredLiveRegistrations();
  const randomRef = 'NW-REG-' + Math.floor(10000 + Math.random() * 90000);

  const newReg: ConfirmedRegistration = {
    id: 'reg_' + Date.now(),
    registrationRef: randomRef,
    timestamp: new Date().toISOString(),
    source: params.source || 'direct',
    medium: params.medium || 'organic',
    referralCode: params.referralCode,
    variant: params.variant,
    interestArea: params.interestArea,
    codingLevel: params.codingLevel,
    collegeTier: params.collegeTier || 'Tier 2',
    verifiedSource: 'demo_form',
  };

  try {
    localStorage.setItem(
      STORAGE_REGISTRATIONS_KEY,
      JSON.stringify([newReg, ...currentRegs])
    );
    // Also record tracking event
    trackEvent('registration_confirmed', {
      source: params.source,
      medium: params.medium,
      variant: params.variant,
      referralCode: params.referralCode,
      metadata: { registrationRef: randomRef },
    });
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Failed to persist confirmed registration', e);
  }

  return newReg;
}

// Reset live or demo data
export function resetData(clearLiveOnly = false): void {
  try {
    localStorage.removeItem(STORAGE_EVENTS_KEY);
    localStorage.removeItem(STORAGE_REGISTRATIONS_KEY);
    if (!clearLiveOnly) {
      localStorage.removeItem(STORAGE_REFERRALS_KEY);
      localStorage.removeItem(STORAGE_BUDGET_KEY);
    }
    window.dispatchEvent(new Event('nxtwave_storage_updated'));
  } catch (e) {
    console.error('Failed to reset storage data', e);
  }
}

// ---------------------------------------------------------------------------
// DETERMINISTIC SIMULATED DEMO DATASET
// ---------------------------------------------------------------------------
// Realistic 7-day campaign metrics representing progress towards 500 registrations
// Total Visits: 1,840 | Starts: 780 | Completions: 595 | CTA: 360 | Confirmed: 177 (35.4% of goal)
// ---------------------------------------------------------------------------

export interface DailyTrendItem {
  day: string;
  date: string;
  visits: number;
  passportStarts: number;
  passportCompletions: number;
  ctaClicks: number;
  confirmedRegistrations: number;
  targetPacing: number; // 500 / 7 = ~71 per day pace
}

export const DEMO_DAILY_TRENDS: DailyTrendItem[] = [
  {
    day: 'Day 1',
    date: 'Oct 22',
    visits: 180,
    passportStarts: 75,
    passportCompletions: 54,
    ctaClicks: 32,
    confirmedRegistrations: 16,
    targetPacing: 71,
  },
  {
    day: 'Day 2',
    date: 'Oct 23',
    visits: 230,
    passportStarts: 98,
    passportCompletions: 76,
    ctaClicks: 46,
    confirmedRegistrations: 23,
    targetPacing: 142,
  },
  {
    day: 'Day 3',
    date: 'Oct 24',
    visits: 290,
    passportStarts: 125,
    passportCompletions: 96,
    ctaClicks: 59,
    confirmedRegistrations: 29,
    targetPacing: 213,
  },
  {
    day: 'Day 4',
    date: 'Oct 25',
    visits: 310,
    passportStarts: 132,
    passportCompletions: 104,
    ctaClicks: 63,
    confirmedRegistrations: 31,
    targetPacing: 284,
  },
  {
    day: 'Day 5',
    date: 'Oct 26',
    visits: 360,
    passportStarts: 155,
    passportCompletions: 120,
    ctaClicks: 74,
    confirmedRegistrations: 37,
    targetPacing: 355,
  },
  {
    day: 'Day 6',
    date: 'Oct 27',
    visits: 260,
    passportStarts: 110,
    passportCompletions: 83,
    ctaClicks: 50,
    confirmedRegistrations: 24,
    targetPacing: 426,
  },
  {
    day: 'Day 7',
    date: 'Oct 28',
    visits: 210,
    passportStarts: 90,
    passportCompletions: 68,
    ctaClicks: 39,
    confirmedRegistrations: 17,
    targetPacing: 500,
  },
];

export const DEMO_CHANNEL_METRICS = [
  {
    channel: 'WhatsApp Communities',
    visits: 760,
    passportCompletions: 265,
    ctaClicks: 162,
    confirmedRegistrations: 79,
    cvr: '10.4%',
    color: '#22c55e', // green
  },
  {
    channel: 'Campus Connectors & Clubs',
    visits: 540,
    passportCompletions: 180,
    ctaClicks: 108,
    confirmedRegistrations: 53,
    cvr: '9.8%',
    color: '#6366f1', // indigo
  },
  {
    channel: 'Passport Viral Referrals',
    visits: 330,
    passportCompletions: 105,
    ctaClicks: 62,
    confirmedRegistrations: 31,
    cvr: '9.4%',
    color: '#06b6d4', // cyan
  },
  {
    channel: 'Direct / Email / QR',
    visits: 210,
    passportCompletions: 45,
    ctaClicks: 28,
    confirmedRegistrations: 14,
    cvr: '6.7%',
    color: '#f59e0b', // amber
  },
];

export const DEMO_REFERRAL_PERFORMANCE = [
  {
    code: 'club01',
    label: 'Campus Coding Club - Lead Rohit',
    owner: 'Rohit Verma',
    college: 'SREC Warangal (Tier 2)',
    visits: 285,
    passportStarts: 124,
    ctaClicks: 62,
    confirmed: 31,
    cvr: '10.9%',
    active: true,
  },
  {
    code: 'campus02',
    label: 'Campus Ambassador - Priya S.',
    owner: 'Priya Sharma',
    college: 'MVJ College of Engg (Tier 2)',
    visits: 195,
    passportStarts: 84,
    ctaClicks: 41,
    confirmed: 20,
    cvr: '10.3%',
    active: true,
  },
  {
    code: 'student03',
    label: 'CSE Class Rep - Ankit',
    owner: 'Ankit Patel',
    college: 'BMS Institute of Tech',
    visits: 130,
    passportStarts: 52,
    ctaClicks: 26,
    confirmed: 13,
    cvr: '10.0%',
    active: true,
  },
];

export const DEMO_EXPERIMENT_METRICS: Record<'A' | 'B', ExperimentVariantMetrics> = {
  A: {
    variant: 'A',
    heading: 'Build Your First AI Project in 60 Minutes',
    subheading: 'Direct workshop outcome positioning',
    visits: 910,
    passportStarts: 355,
    passportCompletions: 265,
    ctaClicks: 155,
    confirmedRegistrations: 77,
  },
  B: {
    variant: 'B',
    heading: 'What AI Project Could You Build Today?',
    subheading: 'Curiosity-led passport quiz discovery first',
    visits: 930,
    passportStarts: 425,
    passportCompletions: 330,
    ctaClicks: 205,
    confirmedRegistrations: 100,
  },
};
