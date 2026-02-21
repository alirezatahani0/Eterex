'use client';

import { useEffect, useState } from 'react';
import { GAPIFY_WEBSITE_TOKEN } from '@/lib/constants';
import Script from 'next/script';

const BASE_URL = 'https://app.gapify.ai';

/** Scroll depth (0–1) before loading the widget. Delaying load avoids opening a WebSocket until the user engages, so back/forward cache (bfcache) can work for quick navigations. */
const SCROLL_DEPTH_THRESHOLD = 0.2;
/** Fallback: load widget after this many ms even without scroll, so long sessions still get chat. */
const LOAD_AFTER_MS = 30_000;

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	strokeWidth="2"
	strokeLinecap="round"
	strokeLinejoin="round"
	className="lucide lucide-bot _icon_1l0d7_6 w-6! h-6! mr-2 stroke-white!"
>
	<path d="M12 8V4H8"></path>
	<rect width="16" height="12" x="4" y="8" rx="2"></rect>
	<path d="M2 14h2"></path>
	<path d="M20 14h2"></path>
	<path d="M15 13v2"></path>
	<path d="M9 13v2"></path>
</svg>;

declare global {
	interface Window {
		gapifySettings?: {
			hideMessageBubble?: boolean;
			position?: 'left' | 'right';
			locale?: string;
			baseDomain?: string;
			useBrowserLanguage?: boolean;
			type?: 'standard' | 'expanded_bubble';
			darkMode?: 'light' | 'auto';
			launcherTitle?: string;
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
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			if (
				maxScroll <= 0 ||
				window.scrollY >= maxScroll * SCROLL_DEPTH_THRESHOLD
			) {
				setShouldLoad(true);
			}
		};

		const timeoutId = window.setTimeout(
			() => setShouldLoad(true),
			LOAD_AFTER_MS,
		);
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
			baseDomain: 'eterex.com',
			position: 'left',
			locale: 'fa',
			useBrowserLanguage: false,
			type: 'expanded_bubble',
			darkMode: 'auto',
			showPopoutButton: false,
			launcherTitle: 'پشتیبانی اتراکس',
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
