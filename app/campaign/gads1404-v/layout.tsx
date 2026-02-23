import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'خرید و فروش یوووچر',
	description: 'کمپین جاذبه ۱۴۰۴ اترکس - یوچر',
	openGraph: {
		title: 'خرید و فروش یوووچر',
		description: 'کمپین جاذبه ۱۴۰۴ اترکس - یوچر',
	},
	keywords: [],
	robots: {
		index: false,
		follow: false,
	},
};

/** Campaign layout: no site Header/Footer (handled by root ConditionalShell). Minimal wrapper for campaign pages. */
export default function CampaignLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen w-full bg-white" dir="rtl">
			{children}
		</div>
	);
}
