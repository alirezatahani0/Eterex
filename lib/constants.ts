/**
 * Icon base URL for crypto/asset icons. Uses env at build time with fallback
 * so Docker builds without NEXT_PUBLIC_ICON_BASE_URL still work.
 */
export const ICON_BASE_URL =
	process.env.NEXT_PUBLIC_ICON_BASE_URL ||
	'https://static-dl.eterex.com/icons-v2/svg';
