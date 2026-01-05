import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import SecurityContent from '@/components/security/SecurityContent';

export async function generateMetadata(): Promise<Metadata> {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: 'امنیت دارایی های دیجیتال شما در اتراکس',
		description:
			'امنیت حساب، دارایی و معاملات شما با پیشرفته‌ترین امکانات امنیتی در صرافی اتراکس.',
		keywords: [
			'امنیت صرافی',
			'امنیت ارز دیجیتال',
			'احراز هویت دو مرحله ای',
			'آدرس اختصاصی کیف پول',
			'امنیت معاملات',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'امنیت بلاک چین',
			'Google Authenticator',
			'احراز هویت ویدیویی',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: 'امنیت دارایی های دیجیتال شما در اتراکس',
			description:
				'امنیت حساب، دارایی و معاملات شما با پیشرفته‌ترین امکانات امنیتی در صرافی اتراکس.',
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/security`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'امنیت دارایی های دیجیتال شما در اتراکس',
			description:
				'امنیت حساب، دارایی و معاملات شما با پیشرفته‌ترین امکانات امنیتی در صرافی اتراکس.',
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
			canonical: `${siteUrl}/security`,
		},
		// AI Agent Crawlers - Additional meta tags
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Security() {
	const security = getSection('fa', 'security');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'امنیت دارایی های دیجیتال شما در اتراکس',
		description:
			'امنیت حساب، دارایی و معاملات شما با پیشرفته‌ترین امکانات امنیتی در صرافی اتراکس.',
		url: `${siteUrl}/security`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Thing',
			name: 'Cryptocurrency Exchange Security',
			description: security.metaDescription,
		},
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: security.dedicatedAddresses.title,
					description: security.dedicatedAddresses.description,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: security.twoFactorAuth.title,
					description: security.twoFactorAuth.description,
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: security.autoVerification.title,
					description: security.autoVerification.description,
				},
			],
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
					name: security.title,
					item: `${siteUrl}/security`,
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
			<SecurityContent />
		</>
	);
}
