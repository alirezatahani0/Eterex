import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import DownloadContent from '@/components/download/DownloadContent';

export async function generateMetadata(): Promise<Metadata> {
	const download = getSection('fa', 'Download');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: download.metaTitle,
		description: download.metaDescription,
		keywords: [
			'دانلود اپلیکیشن اتراکس',
			'اپلیکیشن موبایل',
			'دانلود اندروید',
			'دانلود iOS',
			'اپلیکیشن اتراکس',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: download.metaTitle,
			description: download.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/download`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: download.metaTitle,
			description: download.metaDescription,
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
			canonical: `${siteUrl}/download`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Download() {
	const download = getSection('fa', 'Download');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: download.metaTitle,
		description: download.metaDescription,
		url: `${siteUrl}/download`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: download.metaDescription,
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
					name: download.title,
					item: `${siteUrl}/download`,
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
			<DownloadContent />
		</>
	);
}

