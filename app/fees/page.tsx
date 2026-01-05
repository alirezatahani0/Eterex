import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import FeesContent from '@/components/fees/FeesContent';

export async function generateMetadata(): Promise<Metadata> {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: 'کارمزد معاملات رمزارزی در صرافی اتراکس',
		description:
			'بررسی شیوه محاسبه و پرداخت کارمزد خرید و فروش ارز دیجیتال در صرافی اتراکس.',
		keywords: [
			'کارمزدها',
			'کارمزد اتراکس',
			'کارمزد واریز',
			'کارمزد برداشت',
			'کارمزد رمزارز',
			'کارمزد تبدیل',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: 'کارمزد معاملات رمزارزی در صرافی اتراکس',
			description:
				'بررسی شیوه محاسبه و پرداخت کارمزد خرید و فروش ارز دیجیتال در صرافی اتراکس.',
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/fees`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'کارمزد معاملات رمزارزی در صرافی اتراکس',
			description:
				'بررسی شیوه محاسبه و پرداخت کارمزد خرید و فروش ارز دیجیتال در صرافی اتراکس.',
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
			canonical: `${siteUrl}/fees`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Fees() {
	const fees = getSection('fa', 'fees');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'کارمزد معاملات رمزارزی در صرافی اتراکس',
		description:
			'بررسی شیوه محاسبه و پرداخت کارمزد خرید و فروش ارز دیجیتال در صرافی اتراکس.',
		url: `${siteUrl}/fees`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: fees.metaDescription,
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
					name: fees.title,
					item: `${siteUrl}/fees`,
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
			<FeesContent />
		</>
	);
}

