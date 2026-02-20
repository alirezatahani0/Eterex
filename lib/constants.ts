/**
 * Icon base URL for crypto/asset icons. Uses env at build time with fallback
 * so Docker builds without NEXT_PUBLIC_ICON_BASE_URL still work.
 */
export const ICON_BASE_URL =
	process.env.NEXT_PUBLIC_ICON_BASE_URL ||
	'https://static-dl.eterex.com/icons-v2/svg';

export const GAPIFY_WEBSITE_TOKEN =
	process.env.NEXT_PUBLIC_GAPIFY_WEBSITE_TOKEN;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
