import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'استیک در اتراکس',
	description: 'کمپین جاذبه ۱۴۰۴ اترکس - استیکینگ',
	openGraph: {
		title: 'استیک در اتراکس',
		description: 'کمپین جاذبه ۱۴۰۴ اترکس - استیکینگ',
	},
	robots: {
		index: true,
		follow: true,
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
