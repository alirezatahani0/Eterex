import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import MarketContent from '@/components/market/MarketContent';

export async function generateMetadata(): Promise<Metadata> {
	const market = getSection('fa', 'market');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: market.metaTitle,
		description: market.metaDescription,
		keywords: [
			'بازار ارزهای دیجیتال',
			'قیمت لحظه‌ای',
			'معاملات رمزارز',
			'بیت کوین',
			'اتریوم',
			'کریپتو',
			'صرافی اتراکس',
			'حجم معاملات',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: market.metaTitle,
			description: market.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/market`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: market.metaTitle,
			description: market.metaDescription,
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
			canonical: `${siteUrl}/market`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Market() {
	const market = getSection('fa', 'market');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: market.metaTitle,
		description: market.metaDescription,
		url: `${siteUrl}/market`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: market.metaDescription,
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
					name: market.title,
					item: `${siteUrl}/market`,
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
			<MarketContent />
		</>
	);
}

