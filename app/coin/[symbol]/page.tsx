import type { Metadata } from 'next';
import Container from '@/components/UI/Container';
import CoinPageContent from '@/components/coin/CoinPageContent';
import { getCoinPersianName } from '@/lib/coinNames';

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
	const nameFa = getCoinPersianName(symbolUpper);

	const title = `نمودار تکنیکال و فاندامنتال و قیمت لحظه ای ${nameFa} و ${symbolUpper}`;
	const description = `بررسی قیمت لحظه ای ارز ${nameFa} در صرافی اتراکس | خرید و فروش ارز دیجیتال ${symbolUpper} با کمترین کارمزد | بررسی نمودار قیمت لحظه ای ${nameFa} | خرید ${symbolUpper}`;

	return {
		title,
		description,
		keywords: [
			symbolUpper,
			nameFa,
			`خرید ${symbolUpper}`,
			`فروش ${symbolUpper}`,
			`قیمت ${symbolUpper}`,
			`قیمت ${nameFa}`,
			'ارز دیجیتال',
			'کریپتو',
			'صرافی اتراکس',
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
