'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/** Renders Header and Footer only when the route is not a campaign (or other minimal layout). */
export default function ConditionalShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname() ?? '';
	const isCampaign = pathname.startsWith('/campaign');

	if (isCampaign) {
		return <>{children}</>;
	}

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
