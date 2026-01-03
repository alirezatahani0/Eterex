'use client';

import { useMemo } from 'react';
import { t, getSection, type Locale, defaultLocale } from '@/lib/i18n';

/**
 * Hook to use translations in client components
 * @param locale - The locale to use (defaults to 'fa')
 * @returns Translation function and helper methods
 */
export function useTranslation(locale: Locale = defaultLocale) {
	const translate = useMemo(
		() => (key: Parameters<typeof t>[1]) => t(locale, key),
		[locale],
	);

	const getNav = useMemo(() => () => getSection(locale, 'nav'), [locale]);

	const getCommon = useMemo(() => () => getSection(locale, 'common'), [locale]);

	const getFooter = useMemo(() => () => getSection(locale, 'footer'), [locale]);

	const getMobile = useMemo(() => () => getSection(locale, 'mobile'), [locale]);

	const getSecurity = useMemo(
		() => () => getSection(locale, 'security'),
		[locale],
	);

	const getDownloadAppSection = useMemo(
		() => () => getSection(locale, 'DownloadAppSection'),
		[locale],
	);

	const getAboutUs = useMemo(
		() => () => getSection(locale, 'aboutUs'),
		[locale],
	);

	const getRules = useMemo(() => () => getSection(locale, 'rules'), [locale]);

	const getIdentityVerification = useMemo(
		() => () => getSection(locale, 'identityVerification'),
		[locale],
	);

	const getContact = useMemo(
		() => () => getSection(locale, 'contact'),
		[locale],
	);

	const getFaq = useMemo(() => () => getSection(locale, 'faq'), [locale]);

	const getDownload = useMemo(
		() => () => getSection(locale, 'Download'),
		[locale],
	);

	const getFees = useMemo(() => () => getSection(locale, 'fees'), [locale]);

	const getMarket = useMemo(() => () => getSection(locale, 'market'), [locale]);

	const getHero = useMemo(() => () => getSection(locale, 'hero'), [locale]);

	const getLatestEvents = useMemo(
		() => () => getSection(locale, 'latestEvents'),
		[locale],
	);

	const getListedCryptos = useMemo(
		() => () => getSection(locale, 'listedCryptos'),
		[locale],
	);

	const getCoins = useMemo(() => () => getSection(locale, 'coins'), [locale]);

	const getStatistics = useMemo(
		() => () => getSection(locale, 'statistics'),
		[locale],
	);

	return {
		t: translate,
		nav: getNav(),
		common: getCommon(),
		footer: getFooter(),
		mobile: getMobile(),
		security: getSecurity(),
		DownloadAppSection: getDownloadAppSection(),
		aboutUs: getAboutUs(),
		rules: getRules(),
		identityVerification: getIdentityVerification(),
		contact: getContact(),
		faq: getFaq(),
		Download: getDownload(),
		fees: getFees(),
		market: getMarket(),
		hero: getHero(),
		latestEvents: getLatestEvents(),
		listedCryptos: getListedCryptos(),
		coins: getCoins(),
		statistics: getStatistics(),
	};
}
