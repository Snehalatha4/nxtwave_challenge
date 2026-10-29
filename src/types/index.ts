export type EventType =
  | 'landing_page_view'
  | 'passport_started'
  | 'passport_completed'
  | 'share_clicked'
  | 'registration_cta_clicked'
  | 'registration_confirmed'
  | 'referral_visit';

export interface TrackingEvent {
  id: string;
  type: EventType;
  timestamp: string; // ISO string
  campaignId: string;
  source: string; // e.g., 'whatsapp', 'campus', 'linkedin', 'direct', 'email'
  medium: string; // e.g., 'community', 'ambassador', 'organic', 'qr'
  variant: 'A' | 'B';
  referralCode?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export type InterestArea =
  | 'productivity'
  | 'computervision'
  | 'education'
  | 'business'
  | 'devtools';

export type CodingLevel = 'beginner' | 'basics' | 'comfortable';

export type StudentGoal = 'resume' | 'practical' | 'explore';

export interface ProjectRecommendation {
  id: string;
  title: string;
  tag: string;
  interestMatch: InterestArea;
  minCodingLevel: CodingLevel;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToPrototype: string;
  shortDesc: string;
  matchReason: string;
  implementationSteps: [string, string, string];
  suggestedTech: string[];
  learningOutcomes: string[];
  portfolioExtension: string;
  shareHook: string;
}

export interface ReferralCode {
  code: string;
  label: string;
  ownerType: 'ambassador' | 'club' | 'student';
  ownerName: string;
  college: string;
  active: boolean;
  createdAt: string;
}

export interface ConfirmedRegistration {
  id: string;
  registrationRef: string;
  timestamp: string;
  source: string;
  medium: string;
  referralCode?: string;
  variant: 'A' | 'B';
  interestArea?: string;
  codingLevel?: string;
  collegeTier?: 'Tier 1' | 'Tier 2' | 'Tier 3';
  verifiedSource: 'demo_form' | 'webhook_sim' | 'manual_test';
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  description: string;
  isLocked?: boolean;
}

export interface ExperimentVariantMetrics {
  variant: 'A' | 'B';
  heading: string;
  subheading: string;
  visits: number;
  passportStarts: number;
  passportCompletions: number;
  ctaClicks: number;
  confirmedRegistrations: number;
}

export interface AnalyticsFilters {
  dateRange: 'all' | 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7';
  channel: string;
  referralCode: string;
  variant: 'all' | 'A' | 'B';
}
