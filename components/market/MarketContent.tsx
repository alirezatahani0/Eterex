'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketCard from '@/components/UI/MarketCard';
import MarketTable from '@/components/UI/MarketTable';

export default function MarketContent() {
	const { market } = useTranslation();
	const { theme, mounted } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('web3');
	const [searchQuery, setSearchQuery] = useState('');
	const [baseTransaction, setBaseTransaction] = useState('dollar');

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/Download/Header-Dark.png')] md:bg-[url('/assets/Download/Header-MD-Dark.png')] lg:bg-[url('/assets/Download/Header-LG-Dark.png')] 2xl:bg-[url('/assets/Download/Header-XL-Dark.png')] "
			: "bg-[url('/assets/Download/Header.png')] md:bg-[url('/assets/Download/Header-MD.png')] lg:bg-[url('/assets/Download/Header-LG.png')] 2xl:bg-[url('/assets/Download/Header-XL.png')] ";
	}, [theme, mounted]);

	// Mock data for cards
	const mostLosingItems = [
		{
			symbol: 'BNB',
			name: 'Binance Coin',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'ETH',
			name: 'Ethereum',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'XRP',
			name: 'Ripple',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
	];

	const mostProfitableItems = [
		{
			symbol: 'BTC',
			name: 'Bitcoin',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'ETH',
			name: 'Ethereum',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'AVAX',
			name: 'Avalanche',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
	];

	const newestItems = [
		{
			symbol: 'BTC',
			name: 'Bitcoin',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'MATIC',
			name: 'Polygon',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
	];

	const mostPopularItems = [
		{
			symbol: 'BTC',
			name: 'Bitcoin',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'ETH',
			name: 'Ethereum',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
		{
			symbol: 'XRP',
			name: 'Ripple',
			price: '$109,318',
			change: '+2.68%',
			changeType: 'positive' as const,
		},
	];

	// Mock data for table
	const marketTableRows = [
		{
			crypto: 'Bitcoin',
			symbol: 'BTC',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Ethereum',
			symbol: 'ETH',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Ripple',
			symbol: 'XRP',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Tether',
			symbol: 'USDT',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Binance Coin',
			symbol: 'BNB',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Avalanche',
			symbol: 'AVAX',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
		{
			crypto: 'Polygon',
			symbol: 'MATIC',
			lastPrice: '231,245,000',
			volume: '1,200,215,309.53',
			change24h: '+1.6',
			changeType: 'positive' as const,
			marketCap: '10,797.46',
		},
	];

	const categories = [
		{ key: 'web3', label: market.filters.categories.web3 },
		{ key: 'memecoins', label: market.filters.categories.memecoins },
		{ key: 'nft', label: market.filters.categories.nft },
		{ key: 'ai', label: market.filters.categories.ai },
		{ key: 'gaming', label: market.filters.categories.gaming },
		{ key: 'decentralized', label: market.filters.categories.decentralized },
		{ key: 'iot', label: market.filters.categories.iot },
	];

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[200px] md:h-[240px] lg:h-[291px] 2xl:h-[320px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text variant="Main/32px/Black" gradient="primary" className="mb-4">
					{market.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{market.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" className="text-grayscale-06! mr-1">
						{market.subtitle.suffix}{' '}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				{/* Overview Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
					<MarketCard
						title={market.cards.mostPopular.title}
						items={mostPopularItems}
					/>
					<MarketCard title={market.cards.newest.title} items={newestItems} />{' '}
					<MarketCard
						title={market.cards.mostProfitable.title}
						items={mostProfitableItems}
					/>
					<MarketCard
						title={market.cards.mostLosing.title}
						items={mostLosingItems}
					/>
				</div>

				{/* Filters and Search Section */}
				<div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
					{/* Search Bar */}
					<div className="flex-1 lg:max-w-md">
						<div className="relative">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder={market.filters.searchPlaceholder}
								className="w-full px-5 py-3 pr-12 rounded-4xl bg-grayscale-02 text-grayscale-07 placeholder:text-grayscale-05 focus:outline-none focus:border-brand-primary"
							/>
							<svg
								className="[&>path]:stroke-grayscale-04 absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grayscale-05"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M14.8871 15.3338L18.31 18.75M9.1624 0.75C13.8086 0.75 17.5747 4.51847 17.5747 9.1675C17.5747 13.8166 13.8086 17.586 9.1624 17.586C4.51616 17.586 0.75 13.8166 0.75 9.1675C0.75 4.51847 4.51616 0.75 9.1624 0.75Z"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10.8633 4.49084C12.2606 4.91605 13.3653 6.00388 13.8136 7.39042"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>

					{/* Base Transaction Select */}
					<div className="flex items-center gap-2">
						<Text variant="Main/16px/Regular" className="text-grayscale-07!">
							{market.filters.baseTransaction}
						</Text>
						<select
							value={baseTransaction}
							onChange={(e) => setBaseTransaction(e.target.value)}
							className="px-6 py-3 rounded-4xl border border-grayscale-03 bg-grayscale-02 text-grayscale-07 focus:outline-none focus:border-brand-primary"
						>
							<option value="dollar">دلار</option>
							<option value="toman">تومان</option>
						</select>
					</div>
				</div>

				{/* Category Filters */}
				<div className="mb-6 flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.key}
							onClick={() => setSelectedCategory(category.key)}
							className={cn(
								'px-6 py-3 rounded-4xl transition-colors',
								selectedCategory === category.key
									? 'bg-brand-primary-container '
									: '',
							)}
						>
							<Text
								variant="Main/14px/SemiBold"
								className={
									selectedCategory === category.key
										? 'text-brand-primary!'
										: 'text-grayscale-07! font-medium'
								}
							>
								{category.label}
							</Text>
						</button>
					))}
				</div>

				{/* Market Table */}
				<MarketTable
					headers={market.table.headers}
					rows={marketTableRows}
					onOperations={(row) => {
						console.log('Operations clicked for:', row);
					}}
					onChart={(row) => {
						console.log('Chart clicked for:', row);
					}}
				/>
			</Container>
		</div>
	);
}
