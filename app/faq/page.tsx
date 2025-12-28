import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import FAQContent from '@/components/faq/FAQContent';

export async function generateMetadata(): Promise<Metadata> {
	const faq = getSection('fa', 'faq');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: faq.metaTitle,
		description: faq.metaDescription,
		keywords: [
			'سوالات متداول',
			'FAQ',
			'پاسخ سوالات',
			'راهنمای اتراکس',
			'درباره اتراکس',
			'واریز و برداشت',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: faq.metaTitle,
			description: faq.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/faq`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: faq.metaTitle,
			description: faq.metaDescription,
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
			canonical: `${siteUrl}/faq`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function FAQ() {
	const faq = getSection('fa', 'faq');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: faq.metaTitle,
		description: faq.metaDescription,
		url: `${siteUrl}/faq`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: faq.metaDescription,
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
					name: faq.title,
					item: `${siteUrl}/faq`,
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
			<FAQContent />
		</>
	);
}

