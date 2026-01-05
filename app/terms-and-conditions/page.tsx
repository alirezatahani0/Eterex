import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import TermsAndConditionsContent from '@/components/rules/TermsAndConditionsContent';

export async function generateMetadata(): Promise<Metadata> {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: 'قوانین و مقررات صرافی اتراکس',
		description:
			'قوانین و شرایط استفاده از خدمات خرید و فروش ارز دیجیتال در صرافی اتراکس را بخوانید.',
		keywords: [
			'قوانین و مقررات',
			'شرایط استفاده',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
			'معاملات ارز دیجیتال',
			'موافقت‌نامه',
			'قوانین اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: 'قوانین و مقررات صرافی اتراکس',
			description:
				'قوانین و شرایط استفاده از خدمات خرید و فروش ارز دیجیتال در صرافی اتراکس را بخوانید.',
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/terms-and-conditions`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'قوانین و مقررات صرافی اتراکس',
			description:
				'قوانین و شرایط استفاده از خدمات خرید و فروش ارز دیجیتال در صرافی اتراکس را بخوانید.',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: `${siteUrl}/terms-and-conditions`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function TermsAndConditions() {
	const rules = getSection('fa', 'rules');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'قوانین و مقررات صرافی اتراکس',
		description:
			'قوانین و شرایط استفاده از خدمات خرید و فروش ارز دیجیتال در صرافی اتراکس را بخوانید.',
		url: `${siteUrl}/terms-and-conditions`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: rules.metaDescription,
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'خانه',
					item: siteUrl,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: rules.title,
					item: `${siteUrl}/terms-and-conditions`,
				},
			],
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<TermsAndConditionsContent />
		</>
	);
}

