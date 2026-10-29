// Central configuration for Project Launchpad & NxtWave Workshop Campaign

export const CAMPAIGN_CONFIG = {
  productName: 'Project Launchpad',
  tagline: 'Discover your first AI project. Build your next opportunity.',
  workshopTitle: 'Build Your First AI Project in 60 Minutes',
  organizer: 'NxtWave',
  workshopDurationMinutes: 60,
  cost: '100% Free',
  targetRegistrations: 500,
  campaignDurationDays: 7,
  totalBudgetINR: 2000,
  audience: 'Final-year engineering students & aspiring software developers',

  // Configurable official registration endpoint
  // When an official partner URL is provided, paste it here.
  // By default, the application uses an integrated Demo Registration Flow to simulate conversions reliably.
  officialRegistrationUrl:
    import.meta.env.VITE_OFFICIAL_REGISTRATION_URL ||
    'https://learning.ccbp.in/workshops/ai-project-60min?ref=launchpad',

  // Default campaign tracking parameters
  defaultCampaign: 'ai60_launchpad',
  defaultSource: 'direct',
  defaultMedium: 'organic',
  defaultVariant: 'A' as const,

  // Campaign Variants
  variants: {
    A: {
      id: 'A' as const,
      name: 'Direct Outcome Focus',
      heroHeading: 'Build Your First AI Project in 60 Minutes',
      heroSupporting:
        "Join NxtWave's free hands-on workshop designed specifically for final-year engineering students. Zero complex setup, pure practical building.",
      badgeText: 'Live Interactive Workshop',
    },
    B: {
      id: 'B' as const,
      name: 'Curiosity & Passport First',
      heroHeading: 'What AI Project Could You Build Today?',
      heroSupporting:
        "Take a 45-second quiz to unlock your personalized AI Project Passport, then build it live in NxtWave's free 60-minute workshop.",
      badgeText: 'Interactive Project Passport Inside',
    },
  },
};
