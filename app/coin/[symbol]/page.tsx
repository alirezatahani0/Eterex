import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import Container from '@/components/UI/Container';
import CoinPageContent from '@/components/coin/CoinPageContent';
import { getCoinPersianName } from '@/lib/coinNames';
import { getMarkets } from '@/lib/api/market';

interface CoinPageProps {
	params: Promise<{
		symbol: string;
	}>;
}

/** Returns set of valid coin symbols (baseAsset) from the market API. */
async function getValidCoinSymbols(): Promise<Set<string>> {
	try {
		const markets = await getMarkets(true);
		return new Set(markets.map((m) => m.baseAsset.toUpperCase()));
	} catch {
		return new Set();
	}
}

export async function generateMetadata({
	params,
}: CoinPageProps): Promise<Metadata> {
	const { symbol } = await params;
	const symbolUpper = symbol.toUpperCase();
	const validSymbols = await getValidCoinSymbols();
	if (!validSymbols.has(symbolUpper)) {
		return { title: 'یافت نشد | اترکس' };
	}
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

export default async function CoinPage({ params }: CoinPageProps) {
	const { symbol } = await params;
	const symbolLower = symbol.toLowerCase();
	if (symbol !== symbolLower) {
		redirect(`/coin/${symbolLower}`);
	}
	const symbolUpper = symbolLower.toUpperCase();
	const validSymbols = await getValidCoinSymbols();
	if (!validSymbols.has(symbolUpper)) {
		notFound();
	}
	return (
		<div className="min-h-screen bg-grayscale-01">
			<Container className="py-12 md:py-16 lg:py-20">
				<CoinPageContent />
			</Container>
		</div>
	);
}
