import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import AboutUsContent from '@/components/about/AboutUsContent';

export async function generateMetadata(): Promise<Metadata> {
	const aboutUs = getSection('fa', 'aboutUs');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: aboutUs.metaTitle,
		description: aboutUs.metaDescription,
		keywords: [
			'درباره ما',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
			'معاملات ارز دیجیتال',
			'پرفکت کریپتو',
			'تاریخچه اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: aboutUs.metaTitle,
			description: aboutUs.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/about-us`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: aboutUs.metaTitle,
			description: aboutUs.metaDescription,
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
			canonical: `${siteUrl}/about-us`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function AboutUs() {
	const aboutUs = getSection('fa', 'aboutUs');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: aboutUs.metaTitle,
		description: aboutUs.metaDescription,
		url: `${siteUrl}/about-us`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: aboutUs.metaDescription,
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
					name: aboutUs.title,
					item: `${siteUrl}/about-us`,
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
			<AboutUsContent />
		</>
	);
}

