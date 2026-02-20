import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import IdentityVerificationContent from '@/components/identity/IdentityVerificationContent';

export async function generateMetadata(): Promise<Metadata> {
	const identityVerification = getSection('fa', 'identityVerification');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: identityVerification.metaTitle,
		description: identityVerification.metaDescription,
		keywords: [
			'احراز هویت',
			'احراز هویت اتراکس',
			'احراز هویت ویدیویی',
			'احراز هویت کلاسیک',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
			'معاملات ارز دیجیتال',
			'مدارک احراز هویت',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: identityVerification.metaTitle,
			description: identityVerification.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/authentication`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: identityVerification.metaTitle,
			description: identityVerification.metaDescription,
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
			canonical: `${siteUrl}/authentication`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function IdentityVerification() {
	const identityVerification = getSection('fa', 'identityVerification');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: identityVerification.metaTitle,
		description: identityVerification.metaDescription,
		url: `${siteUrl}/authentication`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: identityVerification.metaDescription,
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
					name: identityVerification.title,
					item: `${siteUrl}/authentication`,
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
			<IdentityVerificationContent />
		</>
	);
}
