'use client';

import { GA_MEASUREMENT_ID, GTM_ID } from '@/lib/constants';
import {
	GoogleTagManager,
	GoogleAnalytics,
	sendGTMEvent,
	sendGAEvent,
} from '@next/third-parties/google';

export { sendGTMEvent, sendGAEvent };

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
