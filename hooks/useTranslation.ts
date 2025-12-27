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
    [locale]
  );

  const getNav = useMemo(
    () => () => getSection(locale, 'nav'),
    [locale]
  );

  const getCommon = useMemo(
    () => () => getSection(locale, 'common'),
    [locale]
  );

  const getFooter = useMemo(
    () => () => getSection(locale, 'footer'),
    [locale]
  );

  const getMobile = useMemo(
    () => () => getSection(locale, 'mobile'),
    [locale]
  );

  const getSecurity = useMemo(
    () => () => getSection(locale, 'security'),
    [locale]
  );

  const getDownloadAppSection = useMemo(
    () => () => getSection(locale, 'DownloadAppSection'),
    [locale]
  );

  const getAboutUs = useMemo(
    () => () => getSection(locale, 'aboutUs'),
    [locale]
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
  };
}

