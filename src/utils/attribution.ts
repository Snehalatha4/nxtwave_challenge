import { CAMPAIGN_CONFIG } from '../services/config';

export interface CampaignParams {
  source: string;
  medium: string;
  campaign: string;
  ref?: string;
  variant: 'A' | 'B';
}

const ATTRIBUTION_STORAGE_KEY = 'nxtwave_launchpad_attribution';

/**
 * Extracts campaign parameters from current URL or stored session.
 * Always preserves attribution parameters across page changes.
 */
export function getAttributionParams(): CampaignParams {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const storedRaw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const stored: Partial<CampaignParams> = storedRaw ? JSON.parse(storedRaw) : {};

    const source = urlParams.get('source') || stored.source || CAMPAIGN_CONFIG.defaultSource;
    const medium = urlParams.get('medium') || stored.medium || CAMPAIGN_CONFIG.defaultMedium;
    const campaign = urlParams.get('campaign') || stored.campaign || CAMPAIGN_CONFIG.defaultCampaign;
    const ref = urlParams.get('ref') || stored.ref || undefined;
    const variantRaw = urlParams.get('variant') || stored.variant;
    const variant: 'A' | 'B' = variantRaw === 'B' ? 'B' : 'A';

    const current: CampaignParams = { source, medium, campaign, ref, variant };

    // Persist for session duration so internal navigation does not drop attribution
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));

    return current;
  } catch {
    return {
      source: CAMPAIGN_CONFIG.defaultSource,
      medium: CAMPAIGN_CONFIG.defaultMedium,
      campaign: CAMPAIGN_CONFIG.defaultCampaign,
      variant: 'A',
    };
  }
}

/**
 * Builds a clean tracking URL with query parameters
 */
export function buildCampaignUrl(options: {
  path?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  ref?: string;
  variant?: 'A' | 'B';
}): string {
  const base = window.location.origin + (options.path || '/');
  const params = new URLSearchParams();

  if (options.source) params.set('source', options.source);
  if (options.medium) params.set('medium', options.medium);
  if (options.campaign) params.set('campaign', options.campaign);
  if (options.ref) params.set('ref', options.ref);
  if (options.variant) params.set('variant', options.variant);

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

/**
 * Generates an official WhatsApp click-to-chat URL with properly encoded message
 */
export function buildWhatsAppShareUrl(text: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
