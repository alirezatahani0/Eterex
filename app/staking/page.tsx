import type { Metadata } from 'next';
import StakingContent from '@/components/staking/StakingContent';

export async function generateMetadata(): Promise<Metadata> {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: 'استیکینگ | استیکینگ ارزهای دیجیتال در اتراکس',
		description:
			'استیکینگ ارزهای دیجیتال در اتراکس. کسب سود از دارایی‌های دیجیتال خود با استیکینگ امن و مطمئن.',
		keywords: [
			'استیکینگ',
			'استیکینگ ارز دیجیتال',
			'استیکینگ کریپتو',
			'سود استیکینگ',
			'استیکینگ اتراکس',
			'staking',
			'crypto staking',
			'delegated staking',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: 'استیکینگ | استیکینگ ارزهای دیجیتال در اتراکس',
			description:
				'استیکینگ ارزهای دیجیتال در اتراکس. کسب سود از دارایی‌های دیجیتال خود با استیکینگ امن و مطمئن.',
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/staking`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'استیکینگ | استیکینگ ارزهای دیجیتال در اتراکس',
			description:
				'استیکینگ ارزهای دیجیتال در اتراکس. کسب سود از دارایی‌های دیجیتال خود با استیکینگ امن و مطمئن.',
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
			canonical: `${siteUrl}/staking`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Staking() {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'استیکینگ | استیکینگ ارزهای دیجیتال در اتراکس',
		description:
			'استیکینگ ارزهای دیجیتال در اتراکس. کسب سود از دارایی‌های دیجیتال خود با استیکینگ امن و مطمئن.',
		url: `${siteUrl}/staking`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: 'صرافی ارزهای دیجیتال اتراکس - استیکینگ امن و مطمئن',
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
					name: 'استیکینگ',
					item: `${siteUrl}/staking`,
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
			<StakingContent />
		</>
	);
}

