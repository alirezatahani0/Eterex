import type { Metadata } from 'next';
import { getSection } from '@/lib/i18n';
import ContactContent from '@/components/contact/ContactContent';

export async function generateMetadata(): Promise<Metadata> {
	const contact = getSection('fa', 'contact');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	return {
		title: contact.metaTitle,
		description: contact.metaDescription,
		keywords: [
			'تماس با ما',
			'پشتیبانی اتراکس',
			'شماره تماس اتراکس',
			'ایمیل اتراکس',
			'آدرس اتراکس',
			'شبکه های اجتماعی اتراکس',
			'اتریوم',
			'بیت کوین',
			'کریپتو',
			'صرافی اتراکس',
		],
		authors: [{ name: 'Eterex' }],
		creator: 'Eterex',
		publisher: 'Eterex',
		openGraph: {
			title: contact.metaTitle,
			description: contact.metaDescription,
			type: 'website',
			locale: 'fa_IR',
			url: `${siteUrl}/contact-us`,
			siteName: 'اترکس',
		},
		twitter: {
			card: 'summary_large_image',
			title: contact.metaTitle,
			description: contact.metaDescription,
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
			canonical: `${siteUrl}/contact-us`,
		},
		other: {
			'AI-Agent': 'enabled',
			'AI-Crawler': 'allowed',
			'X-Robots-Tag':
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		},
	};
}

export default function Contact() {
	const contact = getSection('fa', 'contact');
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Structured Data for SEO and AI Crawlers
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: contact.metaTitle,
		description: contact.metaDescription,
		url: `${siteUrl}/contact-us`,
		inLanguage: 'fa-IR',
		about: {
			'@type': 'Organization',
			name: 'Eterex',
			description: contact.metaDescription,
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
					name: contact.title,
					item: `${siteUrl}/contact-us`,
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
			<ContactContent />
		</>
	);
}

