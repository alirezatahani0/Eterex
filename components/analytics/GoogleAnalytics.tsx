'use client';

import { GA_MEASUREMENT_ID, GTM_ID } from '@/lib/constants';
import {
	GoogleTagManager,
	GoogleAnalytics,
	sendGTMEvent,
	sendGAEvent,
} from '@next/third-parties/google';

export { sendGTMEvent, sendGAEvent };

/**
 * Analytics are loaded via Google Tag Manager (GTM). The container may include:
 * - Google Analytics, Yektanet, Mediaad (third-party cookies may be blocked; prefer first-party/server-side in GTM).
 * - Matomo: if you see "Failed to load resource: 404" for cdn.matomo.cloud, update or remove the Matomo tag in GTM.
 * Chrome DevTools Issues panel may report Cookie / third-party issues for Yektanet (cdn.yektanet.com, ua.yektanet.com, audience.yektanet.com) and Mediaad (s1.mediaad.org, mediacdn.mediaad.org, api.mediaad.org). These come from GTM-loaded tags; to reduce issues use server-side tagging or first-party endpoints in GTM where supported.
 * @see https://developer.chrome.com/docs/privacy-sandbox/cookie-deprecation/
 */
export function Analytics() {
	const gtmId = GTM_ID;
	const gaId = GA_MEASUREMENT_ID;

	return (
		<>
			{gtmId && (
				<>
					<GoogleTagManager gtmId={gtmId} />
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
							height={0}
							width={0}
							style={{ display: 'none', visibility: 'hidden' }}
							title="Google Tag Manager"
						/>
					</noscript>
				</>
			)}
			{gaId && <GoogleAnalytics gaId={gaId} />}
		</>
	);
}
