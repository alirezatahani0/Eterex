'use client';

import { useEffect, useState } from 'react';
import { GAPIFY_WEBSITE_TOKEN } from '@/lib/constants';
import Script from 'next/script';

const BASE_URL = 'https://app.gapify.ai';

/** Scroll depth (0–1) before loading the widget. Delaying load avoids opening a WebSocket until the user engages, so back/forward cache (bfcache) can work for quick navigations. */
const SCROLL_DEPTH_THRESHOLD = 0.2;
/** Fallback: load widget after this many ms even without scroll, so long sessions still get chat. */
const LOAD_AFTER_MS = 30_000;

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
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (!websiteToken) return;

		const onScroll = () => {
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			if (maxScroll <= 0 || window.scrollY >= maxScroll * SCROLL_DEPTH_THRESHOLD) {
				setShouldLoad(true);
			}
		};

		const timeoutId = window.setTimeout(() => setShouldLoad(true), LOAD_AFTER_MS);
		window.addEventListener('scroll', onScroll, { passive: true });
		// Check in case already scrolled (e.g. restored from bfcache)
		onScroll();

		return () => {
			window.clearTimeout(timeoutId);
			window.removeEventListener('scroll', onScroll);
		};
	}, [websiteToken]);

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

	if (!websiteToken || !shouldLoad) return null;

	return (
		<Script
			src={`${BASE_URL}/packs/js/sdk.js`}
			strategy="lazyOnload"
			onLoad={handleLoad}
		/>
	);
}
