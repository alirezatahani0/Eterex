'use client';

import { useState, useEffect } from 'react';

/** Breakpoint under which we consider the device "mobile" for autoplay etc. (1024 = md) */
const MOBILE_BREAKPOINT = 1024;

/**
 * Returns true when viewport width is below MOBILE_BREAKPOINT (mobile/tablet).
 * Useful for enabling Swiper autoplay only on mobile.
 */
export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const update = () => setIsMobile(mql.matches);
		update();
		mql.addEventListener('change', update);
		return () => mql.removeEventListener('change', update);
	}, []);

	return isMobile;
}
