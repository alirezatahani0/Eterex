'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

interface UseThemeReturn {
	theme: Theme;
	mounted: boolean;
	changeTheme: (newTheme: Theme) => void;
	toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

// Custom event to sync theme across all hook instances
const dispatchThemeChange = (newTheme: Theme) => {
	window.dispatchEvent(
		new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: newTheme } })
	);
};

/**
 * Get initial theme synchronously (for SSR-safe initialization)
 */
function getInitialTheme(): Theme {
	if (typeof window === 'undefined') {
		return 'light';
	}
	
	try {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		if (storedTheme === 'dark' || storedTheme === 'light') {
			return storedTheme;
		}
		
		const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';
		return systemTheme;
	} catch {
		return 'light';
	}
}

/**
 * Custom hook for managing theme state
 * Handles localStorage persistence, system preference fallback, and DOM updates
 */
export function useTheme(): UseThemeReturn {
	// Initialize with correct theme to prevent flash
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === 'undefined') {
			return 'light';
		}
		// Read from DOM class (set by blocking script) or fallback to storage/system
		const htmlClass = document.documentElement.classList.contains('dark') ? 'dark' : 
			document.documentElement.classList.contains('light') ? 'light' : null;
		return htmlClass || getInitialTheme();
	});
	const [mounted, setMounted] = useState(false);

	// Apply theme to DOM
	const applyTheme = useCallback((newTheme: Theme) => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove('dark', 'light');
			document.documentElement.classList.add(newTheme);
		}
	}, []);

	// Initialize theme on mount
	useEffect(() => {
		// Get current theme from DOM (set by blocking script) or storage/system
		const htmlClass = document.documentElement.classList.contains('dark') ? 'dark' : 
			document.documentElement.classList.contains('light') ? 'light' : null;
		const currentTheme = htmlClass || getInitialTheme();

		// Ensure theme is applied (in case script didn't run)
		applyTheme(currentTheme);

		// Update state with minimal delay to avoid React warning about cascading renders
		// Use requestAnimationFrame for next tick (very fast, ~16ms)
		const rafId = requestAnimationFrame(() => {
			setMounted(true);
			setTheme(currentTheme);
		});

		// Listen for theme changes from other hook instances
		const handleThemeChange = (e: Event) => {
			const customEvent = e as CustomEvent<{ theme: Theme }>;
			if (customEvent.detail?.theme) {
				const newTheme = customEvent.detail.theme;
				// Defer state update to avoid setState during render
				setTimeout(() => {
					setTheme(newTheme);
					applyTheme(newTheme);
				}, 0);
			}
		};

		// Listen for storage changes (when theme is changed in another tab)
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === THEME_STORAGE_KEY && e.newValue) {
				const newTheme = e.newValue as Theme;
				// Defer state update to avoid setState during render
				setTimeout(() => {
					setTheme(newTheme);
					applyTheme(newTheme);
				}, 0);
			}
		};

		window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
		window.addEventListener('storage', handleStorageChange);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [applyTheme]);

	// Change theme explicitly
	const changeTheme = useCallback(
		(newTheme: Theme) => {
			setTheme(newTheme);
			localStorage.setItem(THEME_STORAGE_KEY, newTheme);
			applyTheme(newTheme);
			// Defer event dispatch to avoid setState during render
			setTimeout(() => {
				dispatchThemeChange(newTheme);
			}, 0);
		},
		[applyTheme]
	);

	// Toggle between light and dark
	const toggleTheme = useCallback(() => {
		setTheme((currentTheme) => {
			const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
			localStorage.setItem(THEME_STORAGE_KEY, newTheme);
			applyTheme(newTheme);
			// Defer event dispatch to avoid setState during render
			setTimeout(() => {
				dispatchThemeChange(newTheme);
			}, 0);
			return newTheme;
		});
	}, [applyTheme]);

	return {
		theme,
		mounted,
		changeTheme,
		toggleTheme,
	};
}

