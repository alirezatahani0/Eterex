import type { Metadata } from 'next';
import Container from '@/components/UI/Container';
import CoinPageContent from '@/components/coin/CoinPageContent';

interface CoinPageProps {
	params: Promise<{
		symbol: string;
	}>;
}

export async function generateMetadata({
	params,
}: CoinPageProps): Promise<Metadata> {
	const { symbol } = await params;
	const symbolUpper = symbol.toUpperCase();

	return {
		title: `${symbolUpper} | قیمت، خرید و فروش ${symbolUpper}`,
		description: `اطلاعات کامل ${symbolUpper}، قیمت لحظه‌ای، نحوه خرید و فروش، کارمزد معامله و کیف پول‌های پشتیبانی شده`,
		keywords: [
			symbolUpper,
			`خرید ${symbolUpper}`,
			`فروش ${symbolUpper}`,
			`قیمت ${symbolUpper}`,
			'ارز دیجیتال',
			'کریپتو',
		],
	};
}

export default function CoinPage() {
	return (
		<div className="min-h-screen bg-grayscale-01">
			<Container className="py-12 md:py-16 lg:py-20">
				<CoinPageContent />
			</Container>
		</div>
	);
}
