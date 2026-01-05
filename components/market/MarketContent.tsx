'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import MarketCard from '@/components/UI/MarketCard';
import MarketTable from '@/components/UI/MarketTable';
import { useMarketsQuery } from '@/hooks/useMarketsQuery';
import {
	useAssetsListQuery,
	useAssetsPriceListQuery,
} from '@/hooks/useAssetsQuery';
import type { Market, PaginationType } from '@/types/api';
import Pagination from '@/components/UI/Pagination';

interface MarketContentProps {
	initialMarkets?: Market[];
}

export default function MarketContent({
	initialMarkets = [],
}: MarketContentProps) {
	const { market } = useTranslation();
	const { theme, mounted } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [baseTransaction, setBaseTransaction] = useState<'IRT' | 'USDT'>(
		'USDT',
	);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 10;
	const prevFiltersRef = useRef<string>('');

	// Old categories from translations
	const oldCategories = [
		{ key: 'web3', label: market.filters.categories.web3 },
		{ key: 'memecoins', label: market.filters.categories.memecoins },
		{ key: 'nft', label: market.filters.categories.nft },
		{ key: 'ai', label: market.filters.categories.ai },
		{ key: 'gaming', label: market.filters.categories.gaming },
		{ key: 'decentralized', label: market.filters.categories.decentralized },
		{ key: 'iot', label: market.filters.categories.iot },
	];

	// Function to map API labels to old categories
	const mapAssetToCategory = (
		labels: Array<{ 0: string; 1: string }>,
	): string | null => {
		if (!labels || labels.length === 0) return null;

		const labelValues = labels.map((label) => label[1].toLowerCase());

		// Check for memecoins
		if (
			labelValues.some(
				(val) =>
					val.includes('meme') ||
					val.includes('memecoin') ||
					val === 'doggone doggerel',
			)
		) {
			return 'memecoins';
		}

		// Check for NFT
		if (
			labelValues.some(
				(val) =>
					val.includes('nft') ||
					val.includes('collectibles') ||
					val.includes('non-fungible'),
			)
		) {
			return 'nft';
		}

		// Check for AI
		if (
			labelValues.some(
				(val) =>
					val.includes('ai') ||
					val.includes('artificial intelligence') ||
					val.includes('generative ai') ||
					val.includes('machine learning'),
			)
		) {
			return 'ai';
		}

		// Check for Gaming
		if (
			labelValues.some(
				(val) =>
					val.includes('gaming') ||
					val.includes('game') ||
					val.includes('play-to-earn') ||
					val.includes('gamefi'),
			)
		) {
			return 'gaming';
		}

		// Check for Decentralized
		if (
			labelValues.some(
				(val) =>
					val.includes('defi') ||
					val.includes('decentralized') ||
					val.includes('dex') ||
					val.includes('dao'),
			)
		) {
			return 'decentralized';
		}

		// Check for IoT
		if (
			labelValues.some(
				(val) =>
					val.includes('iot') ||
					val.includes('internet of things') ||
					val.includes('depin'),
			)
		) {
			return 'iot';
		}

		// Check for Web3 (default for Layer 1, Layer 2, Platform, etc.)
		if (
			labelValues.some(
				(val) =>
					val.includes('web3') ||
					val.includes('layer 1') ||
					val.includes('layer 2') ||
					val.includes('platform') ||
					val.includes('blockchain') ||
					val.includes('smart contracts') ||
					val.includes('rollups') ||
					val.includes('scaling'),
			)
		) {
			return 'web3';
		}

		return null;
	};

	// Use React Query for client-side polling (updates every 32 seconds)
	const { data: clientMarkets = [] } = useMarketsQuery({
		showAll: true,
		enabled: true,
		refetchInterval: 32000, // 32 seconds
	});

	// Fetch assets list and prices
	const { data: assetsData } = useAssetsListQuery({
		pageSize: 10000,
		enabled: true,
	});

	const { data: pricesData } = useAssetsPriceListQuery({
		enabled: true,
		refetchInterval: 32000, // 32 seconds
	});

	// Use client-side markets if available, otherwise fall back to initial server-side data
	const allMarkets = clientMarkets.length > 0 ? clientMarkets : initialMarkets;

	// Filter markets based on baseTransaction only (for cards - no search/category filter)
	const baseFilteredMarkets = useMemo(() => {
		return allMarkets.filter((market) => market.quoteAsset === baseTransaction);
	}, [allMarkets, baseTransaction]);

	// Filter markets based on baseTransaction, search query, and category (for table)
	const filteredMarkets = useMemo(() => {
		let filtered = allMarkets.filter(
			(market) => market.quoteAsset === baseTransaction,
		);

		// Apply search filter if search query exists
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter(
				(market) =>
					market.symbol.toLowerCase().includes(query) ||
					market.name.toLowerCase().includes(query) ||
					market.baseAsset.toLowerCase().includes(query),
			);
		}

		return filtered;
	}, [allMarkets, baseTransaction, searchQuery]);

	// Combine markets with assets and prices data (for cards - no filters)
	const enrichedMarketsForCards = useMemo(() => {
		if (
			!baseFilteredMarkets.length ||
			!assetsData?.coins ||
			!pricesData?.length
		) {
			return [];
		}

		// Filter prices by quote pair (USDT or IRT) - prices should end with the selected baseTransaction
		const filteredPrices = pricesData.filter((price) => {
			const priceSymbolUpper = price.symbol.toUpperCase();
			return priceSymbolUpper.endsWith(baseTransaction.toUpperCase());
		});

		// Create maps for quick lookup
		const assetsMap = new Map(
			assetsData.coins.map((asset) => [asset.name.toUpperCase(), asset]),
		);
		const pricesMap = new Map(
			filteredPrices.map((price) => [price.symbol.toUpperCase(), price]),
		);

		return baseFilteredMarkets.map((market) => {
			const asset = assetsMap.get(market.baseAsset.toUpperCase());
			// Match price by market symbol (e.g., "BTCUSDT" or "BTCIRT")
			const price = pricesMap.get(market.symbol.toUpperCase());

			return {
				market,
				asset,
				price,
			};
		});
	}, [baseFilteredMarkets, assetsData, pricesData, baseTransaction]);

	// Combine markets with assets and prices data (for table - with filters)
	const enrichedMarkets = useMemo(() => {
		if (!filteredMarkets.length || !assetsData?.coins || !pricesData?.length) {
			return [];
		}

		// Filter prices by quote pair (USDT or IRT) - prices should end with the selected baseTransaction
		const filteredPrices = pricesData.filter((price) => {
			const priceSymbolUpper = price.symbol.toUpperCase();
			return priceSymbolUpper.endsWith(baseTransaction.toUpperCase());
		});

		// Create maps for quick lookup
		const assetsMap = new Map(
			assetsData.coins.map((asset) => [asset.name.toUpperCase(), asset]),
		);
		const pricesMap = new Map(
			filteredPrices.map((price) => [price.symbol.toUpperCase(), price]),
		);

		let enriched = filteredMarkets.map((market) => {
			const asset = assetsMap.get(market.baseAsset.toUpperCase());
			// Match price by market symbol (e.g., "BTCUSDT" or "BTCIRT")
			const price = pricesMap.get(market.symbol.toUpperCase());

			return {
				market,
				asset,
				price,
			};
		});

		// Filter by selected category if one is selected
		if (selectedCategory) {
			enriched = enriched.filter((item) => {
				if (!item.asset?.labels) return false;
				const mappedCategory = mapAssetToCategory(item.asset.labels);
				return mappedCategory === selectedCategory;
			});
		}

		return enriched;
	}, [filteredMarkets, assetsData, pricesData, selectedCategory, baseTransaction]);

	// Transform enriched markets to table rows
	const allMarketTableRows = useMemo(() => {
		return enrichedMarkets
			.filter((item) => item.price) // Only show markets with price data
			.map((item) => {
				const { market, price } = item;
				const change24hPercent = price?.price_change_percentage ?? 0;
				const change24hPercentStr = `${
					change24hPercent >= 0 ? '+' : ''
				}${change24hPercent.toFixed(2)}%`;
				const isPositive = change24hPercent >= 0;

				// Format price based on priceDecimalPlaces from market
				const priceDecimalPlaces = parseInt(market.priceDecimalPlaces, 10) || 2;
				const formattedPrice = price?.price
					? parseFloat(price.price).toLocaleString('fa-IR', {
							maximumFractionDigits: priceDecimalPlaces,
							minimumFractionDigits: priceDecimalPlaces,
					  })
					: '0';

				// Format volume (using quote_volume which is in the quote currency)
				const formattedVolume = price?.quote_volume
					? parseFloat(price.quote_volume.toString()).toLocaleString('fa-IR', {
							maximumFractionDigits: 2,
					  })
					: '0';

				// Market cap not available in price API, use volume as placeholder or empty
				const formattedMarketCap = '—'; // Not available in API

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				return {
					crypto: market.name.split('/')[0] || market.baseAsset,
					symbol: market.baseAsset,
					lastPrice: formattedPrice,
					volume: formattedVolume,
					change24h: change24hPercentStr,
					changeType,
					marketCap: formattedMarketCap,
				};
			});
	}, [enrichedMarkets]);

	// Pagination logic
	const pagination: PaginationType = useMemo(() => {
		const totalItems = allMarketTableRows.length;
		const pageCount = Math.ceil(totalItems / rowsPerPage);
		return {
			page: currentPage,
			pageCount: pageCount || 1,
			limit: rowsPerPage,
			itemCount: totalItems,
			hasNextPage: currentPage < pageCount,
			hasPreviousPage: currentPage > 1,
		};
	}, [allMarketTableRows.length, currentPage, rowsPerPage]);

	// Get paginated rows
	const marketTableRows = useMemo(() => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;
		return allMarketTableRows.slice(startIndex, endIndex);
	}, [allMarketTableRows, currentPage, rowsPerPage]);

	// Reset to page 1 when filters change
	const currentFilterKey = `${selectedCategory}-${searchQuery}-${baseTransaction}`;
	useEffect(() => {
		if (prevFiltersRef.current !== currentFilterKey) {
			prevFiltersRef.current = currentFilterKey;
			// Use setTimeout to avoid synchronous state update warning
			setTimeout(() => setCurrentPage(1), 0);
		}
	}, [currentFilterKey]);

	// Transform enriched markets to card items (using cards data, not filtered)
	const cardItems = useMemo(() => {
		if (!enrichedMarketsForCards.length)
			return {
				mostPopular: [],
				newest: [],
				mostProfitable: [],
				mostLosing: [],
			};

		const itemsWithPrices = enrichedMarketsForCards
			.filter((item) => item.price && item.asset)
			.map((item) => {
				const { market, price, asset } = item;
				const change24hPercent = price?.price_change_percentage ?? 0;
				const change24hPercentStr = `${
					change24hPercent >= 0 ? '+' : ''
				}${change24hPercent.toFixed(2)}%`;
				const isPositive = change24hPercent >= 0;

				// Format price based on priceDecimalPlaces from market
				const priceDecimalPlaces = parseInt(market.priceDecimalPlaces, 10) || 2;
				const formattedPrice = price?.price
					? parseFloat(price.price).toLocaleString('fa-IR', {
							maximumFractionDigits: priceDecimalPlaces,
							minimumFractionDigits: priceDecimalPlaces,
					  })
					: '0';

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				return {
					symbol: market.baseAsset,
					name:
						asset?.full_name || market.name.split('/')[0] || market.baseAsset,
					price: formattedPrice,
					change: change24hPercentStr,
					changeType,
					changeValue: change24hPercent,
					assetId: asset?.id,
					createdAt: asset?.created_at, // Keep created_at for sorting
				};
			})
			.sort((a, b) => {
				// Sort by change value (descending)
				return b.changeValue - a.changeValue;
			});

		// Most profitable (highest positive change)
		const mostProfitable = itemsWithPrices
			.filter((item) => item.changeType === 'positive')
			.slice(0, 3);

		// Most losing (lowest negative change)
		const mostLosing = itemsWithPrices
			.filter((item) => item.changeType === 'negative')
			.slice(-3)
			.reverse();

		// Most popular - hardcoded to BTC, ETH, TRX
		const mostPopular = ['BTC', 'ETH', 'TRX']
			.map((symbol) => {
				const item = itemsWithPrices.find(
					(item) => item.symbol.toUpperCase() === symbol.toUpperCase(),
				);
				return item;
			})
			.filter((item): item is NonNullable<typeof item> => item !== undefined)
			.slice(0, 3);

		// Newest - sort all by created_at (newest first) and take first 3
		// Filter to only include items with both price and asset (with created_at)
		const newest = enrichedMarketsForCards
			.filter((item) => item.price && item.asset && item.asset.created_at)
			.sort((a, b) => {
				// Sort by created_at descending (newest first)
				const dateA = new Date(a.asset!.created_at).getTime();
				const dateB = new Date(b.asset!.created_at).getTime();
				return dateB - dateA;
			})
			.slice(0, 3)
			.map((item) => {
				const { market, price, asset } = item;
				const change24hPercent = price?.price_change_percentage ?? 0;
				const change24hPercentStr = `${
					change24hPercent >= 0 ? '+' : ''
				}${change24hPercent.toFixed(2)}%`;
				const isPositive = change24hPercent >= 0;

				// Format price based on priceDecimalPlaces from market
				const priceDecimalPlaces = parseInt(market.priceDecimalPlaces, 10) || 2;
				const formattedPrice = price?.price
					? parseFloat(price.price).toLocaleString('fa-IR', {
							maximumFractionDigits: priceDecimalPlaces,
							minimumFractionDigits: priceDecimalPlaces,
					  })
					: '0';

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				return {
					symbol: market.baseAsset,
					name:
						asset?.full_name || market.name.split('/')[0] || market.baseAsset,
					price: formattedPrice,
					change: change24hPercentStr,
					changeType,
				};
			});

		return {
			mostPopular: mostPopular.map(
				({ symbol, name, price, change, changeType }) => ({
					symbol,
					name,
					price,
					change,
					changeType,
				}),
			),
			newest: newest.map(({ symbol, name, price, change, changeType }) => ({
				symbol,
				name,
				price,
				change,
				changeType,
			})),
			mostProfitable: mostProfitable.map(
				({ symbol, name, price, change, changeType }) => ({
					symbol,
					name,
					price,
					change,
					changeType,
				}),
			),
			mostLosing: mostLosing.map(
				({ symbol, name, price, change, changeType }) => ({
					symbol,
					name,
					price,
					change,
					changeType,
				}),
			),
		};
	}, [enrichedMarketsForCards]);

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/Download/Header-Dark.png')] md:bg-[url('/assets/Download/Header-MD-Dark.png')] lg:bg-[url('/assets/Download/Header-LG-Dark.png')] 2xl:bg-[url('/assets/Download/Header-XL-Dark.png')] "
			: "bg-[url('/assets/Download/Header.png')] md:bg-[url('/assets/Download/Header-MD.png')] lg:bg-[url('/assets/Download/Header-LG.png')] 2xl:bg-[url('/assets/Download/Header-XL.png')] ";
	}, [theme, mounted]);

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
				<div className="flex xl:grid xl:grid-cols-4 gap-6 mb-14 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 -mx-6 xl:mx-0 px-6 xl:px-0 scrollbar-hide xl:scrollbar-default">
					<div className="min-w-[380px] xl:min-w-0">
						<MarketCard
							title={market.cards.mostPopular.title}
							items={cardItems.mostPopular}
						/>
					</div>
					<div className="min-w-[380px] xl:min-w-0">
						<MarketCard
							title={market.cards.newest.title}
							items={cardItems.newest}
						/>
					</div>
					<div className="min-w-[380px] xl:min-w-0">
						<MarketCard
							title={market.cards.mostProfitable.title}
							items={cardItems.mostProfitable}
						/>
					</div>
					<div className="min-w-[380px] xl:min-w-0">
						<MarketCard
							title={market.cards.mostLosing.title}
							items={cardItems.mostLosing}
						/>
					</div>
				</div>

				{/* Filters and Search Section */}
				<div className="mb-6 flex flex-row lg:items-center lg:justify-between gap-4">
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
						<div className="relative">
							<select
								name="quoteAsset"
								value={baseTransaction}
								onChange={(e) =>
									setBaseTransaction(e.target.value as 'IRT' | 'USDT')
								}
								className="px-6 pl-10 py-3 rounded-4xl border border-grayscale-03 bg-grayscale-02 text-grayscale-07 focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
							>
								<option value="USDT">دلار</option>
								<option value="IRT">تومان</option>
							</select>
							<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M17.1431 9.42894L12.0003 14.5718L6.85742 9.42894"
										stroke="currentColor"
										strokeWidth="1.28571"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-grayscale-07"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Category Filters */}
				<div className="mb-6 flex gap-2 overflow-x-auto xl:flex-wrap xl:overflow-x-visible pb-2 xl:pb-0 -mx-6 xl:mx-0 px-6 xl:px-0 scrollbar-hide xl:scrollbar-default">
					<button
						onClick={() => setSelectedCategory(null)}
						className={cn(
							'px-6 py-3 rounded-4xl transition-colors shrink-0',
							selectedCategory === null ? 'bg-brand-primary-container ' : '',
						)}
					>
						<Text
							variant="Main/14px/SemiBold"
							className={
								selectedCategory === null
									? 'text-brand-primary!'
									: 'text-grayscale-07! font-medium'
							}
						>
							همه
						</Text>
					</button>
					{oldCategories.map((category) => (
						<button
							key={category.key}
							onClick={() =>
								setSelectedCategory(
									selectedCategory === category.key ? null : category.key,
								)
							}
							className={cn(
								'px-6 py-3 rounded-4xl transition-colors shrink-0',
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
					headers={useMemo(() => {
						// Replace USD with the selected baseTransaction (IRT or USD)
						return market.table.headers.map((header) =>
							header.replace(/USD/g, baseTransaction),
						);
					}, [market.table.headers, baseTransaction])}
					rows={marketTableRows}
					onOperations={(row) => {
						console.log('Operations clicked for:', row);
					}}
					onChart={(row) => {
						console.log('Chart clicked for:', row);
					}}
				/>

				{/* Pagination */}
				{pagination.pageCount > 1 && (
					<div className="mt-6 flex justify-center">
						<Pagination
							pagination={pagination}
							onChange={(page) => setCurrentPage(page)}
						/>
					</div>
				)}
			</Container>
		</div>
	);
}
