import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import ConditionalShell from '@/components/layout/ConditionalShell';
import QueryProvider from '@/components/providers/QueryProvider';
import ScrollToTop from '@/components/UI/ScrollToTop';
import { Analytics } from '@/components/analytics/GoogleAnalytics';
// import { SpeedInsights } from "@vercel/speed-insights/next"

const vazirmatn = Vazirmatn({
	variable: '--font-vazirmatn',
	subsets: ['arabic', 'latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
	preload: true,
});

export const metadata: Metadata = {
	title: {
		default: 'اترکس | پلتفرم معاملات ارز دیجیتال',
		template: '%s | اترکس',
	},
	description:
		'پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین',
	keywords: ['ارز دیجیتال', 'بیت کوین', 'کریپتو', 'معاملات', 'اتریوم'],
	authors: [{ name: 'Eterex' }],
	creator: 'Eterex',
	publisher: 'Eterex',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com',
	),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'fa_IR',
		url: '/',
		siteName: 'اترکس',
		title: 'اترکس | پلتفرم معاملات ارز دیجیتال',
		description:
			'پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'اترکس | پلتفرم معاملات ارز دیجیتال',
		description:
			'پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین',
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
	verification: {
		google: process.env.GOOGLE_VERIFICATION,
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fa" dir="rtl">
			<head>
				<meta name="color-scheme" content="light" />
				<link
					rel="canonical"
					href={process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com'}
				/>
				{/* Preload LCP hero image (home) so browser starts loading immediately, reducing resource load delay */}
				<link
					rel="preload"
					as="image"
					href="/assets/main/Header.avif"
					media="(max-width: 767px)"
				/>
				<link
					rel="preload"
					as="image"
					href="/assets/main/Header-MD.avif"
					media="(min-width: 768px) and (max-width: 1023px)"
				/>
				<link
					rel="preload"
					as="image"
					href="/assets/main/Header-LG.avif"
					media="(min-width: 1024px) and (max-width: 1535px)"
				/>
				<link
					rel="preload"
					as="image"
					href="/assets/main/Header-XL.avif"
					media="(min-width: 1536px)"
				/>
			</head>
			<body
				className={`${vazirmatn.variable} font-sans antialiased bg-white`}
				dir="rtl"
			>
				<Analytics />
			
				<QueryProvider>
					<ScrollToTop />
					<ConditionalShell>{children}</ConditionalShell>
				</QueryProvider>
				{/* <SpeedInsights /> */}
			</body>
		</html>
	);
}
