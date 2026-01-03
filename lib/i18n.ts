import faTranslations from '@/locales/fa.json';
import enTranslations from '@/locales/en.json';

export type Locale = 'fa' | 'en';

export const locales: Locale[] = ['fa', 'en'];

export const defaultLocale: Locale = 'fa';

const translations = {
	fa: faTranslations,
	en: enTranslations,
} as const;

export type TranslationKey =
	| `common.${keyof typeof faTranslations.common}`
	| `nav.${keyof typeof faTranslations.nav}`
	| `footer.${keyof typeof faTranslations.footer}`
	| `mobile.${keyof typeof faTranslations.mobile}`
	| `security.${keyof typeof faTranslations.security}`
	| `metadata.${keyof typeof faTranslations.metadata}`
	| `DownloadAppSection.${keyof typeof faTranslations.DownloadAppSection}`
	| `aboutUs.${keyof typeof faTranslations.aboutUs}`
	| `rules.${keyof typeof faTranslations.rules}`
	| `identityVerification.${keyof typeof faTranslations.identityVerification}`
	| `contact.${keyof typeof faTranslations.contact}`
	| `faq.${keyof typeof faTranslations.faq}`
	| `Download.${keyof typeof faTranslations.Download}`
	| `fees.${keyof typeof faTranslations.fees}`
	| `market.${keyof typeof faTranslations.market}`
	| `hero.${keyof typeof faTranslations.hero}`
	| `latestEvents.${keyof typeof faTranslations.latestEvents}`
	| `coins.${keyof typeof faTranslations.coins}`
	| `listedCryptos.${keyof typeof faTranslations.listedCryptos}`
	| `statistics.${keyof typeof faTranslations.statistics}`;

/**
 * Get translation for a given key
 * @param locale - The locale to use
 * @param key - The translation key (e.g., 'common.brandName')
 * @returns The translated string
 */
export function t(locale: Locale, key: TranslationKey): string {
	const keys = key.split('.') as [string, string];
	const [section, item] = keys;

	const translation = translations[locale];
	const sectionTranslations = translation[section as keyof typeof translation];
	if (sectionTranslations && typeof sectionTranslations === 'object') {
		return (sectionTranslations as Record<string, string>)[item] || key;
	}
	return key;
}

/**
 * Get all translations for a section
 * @param locale - The locale to use
 * @param section - The section name (e.g., 'common', 'nav')
 * @returns The section translations object
 */
export function getSection<T extends keyof typeof faTranslations>(
	locale: Locale,
	section: T,
): (typeof translations)[Locale][T] {
	return translations[locale][section];
}

/**
 * Get metadata translations
 */
export function getMetadata(locale: Locale) {
	return translations[locale].metadata;
}
