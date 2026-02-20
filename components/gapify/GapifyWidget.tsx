'use client';

import { GAPIFY_WEBSITE_TOKEN } from '@/lib/constants';
import Script from 'next/script';

const BASE_URL = 'https://app.gapify.ai';

declare global {
	interface Window {
		gapifySettings?: {
			hideMessageBubble?: boolean;
			position?: 'left' | 'right';
			locale?: string;
			useBrowserLanguage?: boolean;
			type?: 'standard' | 'expanded_bubble';
			darkMode?: 'light' | 'auto';
			showPopoutButton?: boolean;
		};
		gapifySDK?: {
			run: (config: { websiteToken: string; baseUrl: string }) => void;
		};
	}
}

export function GapifyWidget() {
	const websiteToken = GAPIFY_WEBSITE_TOKEN;

	const handleLoad = () => {
		if (!websiteToken || !window.gapifySDK) return;

		window.gapifySettings = {
			hideMessageBubble: false,
			position: 'left',
			locale: 'fa',
			useBrowserLanguage: false,
			type: 'standard',
			darkMode: 'light',
			showPopoutButton: false,
		};

		window.gapifySDK.run({
			websiteToken,
			baseUrl: BASE_URL,
		});
	};

	if (!websiteToken) return null;

	return (
		<Script
			src={`${BASE_URL}/packs/js/sdk.js`}
			strategy="lazyOnload"
			onLoad={handleLoad}
		/>
	);
}
