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
import { useConfigsQuery } from '@/hooks/useConfigsQuery';
import type { Market, PaginationType } from '@/types/api';
import Pagination from '@/components/UI/Pagination';
import Skeleton from '@/components/UI/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
	const [baseSelectOpen, setBaseSelectOpen] = useState(false);
	const baseSelectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				baseSelectRef.current &&
				!baseSelectRef.current.contains(event.target as Node)
			) {
				setBaseSelectOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

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
	const { data: clientMarkets = [], isLoading: isLoadingMarkets } =
		useMarketsQuery({
			showAll: true,
			enabled: true,
			refetchInterval: 32000, // 32 seconds
		});

	// Fetch assets list and prices (all update every 32 seconds)
	const { data: assetsData, isLoading: isLoadingAssets } = useAssetsListQuery({
		pageSize: 10000,
		enabled: true,
		refetchInterval: 32000, // 32 seconds
	});

	const { data: pricesData, isLoading: isLoadingPrices } =
		useAssetsPriceListQuery({
			enabled: true,
			refetchInterval: 32000, // 32 seconds
		});

	const { data: configs } = useConfigsQuery();

	// USDT → IRT rate for table when base is تومان (from configs)
	const irtUsdtRate = useMemo(() => {
		if (!configs?.priceGroups?.length) return 0;
		const usdtGroup = configs.priceGroups.find((g) =>
			g.coins.some((c) => c.toUpperCase() === 'USDT'),
		);
		return (
			usdtGroup?.prices.irtUsdt ?? configs.priceGroups[0]?.prices.irtUsdt ?? 0
		);
	}, [configs]);

	// Check if any data is loading
	const isLoadingCards = isLoadingMarkets || isLoadingAssets || isLoadingPrices;

	// Use client-side markets if available, otherwise fall back to initial server-side data
	const allMarkets = clientMarkets.length > 0 ? clientMarkets : initialMarkets;

	// Cards always show USDT data; Base Transaction select only affects the table
	const CARD_BASE = 'USDT';

	// Filter markets for cards only (always USDT, no search/category)
	const baseFilteredMarkets = useMemo(() => {
		return allMarkets.filter((market) => market.quoteAsset === CARD_BASE);
	}, [allMarkets]);

	// Table always uses USDT pairs; IRT is calculated from USDT × irtUsdt rate
	const TABLE_BASE = 'USDT';

	// Filter markets for table (always USDT; display conversion to IRT happens in row formatting)
	const filteredMarkets = useMemo(() => {
		let filtered = allMarkets.filter(
			(market) => market.quoteAsset === TABLE_BASE,
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
	}, [allMarkets, searchQuery]);

	// Combine markets with assets and prices data (for cards - always USDT)
	// Include all assets from assetsData, even if not in market data
	const enrichedMarketsForCards = useMemo(() => {
		if (!assetsData?.coins) {
			return [];
		}

		// Cards: always USDT prices
		const filteredPrices =
			pricesData?.filter((price) => {
				const priceSymbolUpper = price.symbol.toUpperCase();
				return priceSymbolUpper.endsWith(CARD_BASE);
			}) || [];

		// Create maps for quick lookup
		const pricesMap = new Map(
			filteredPrices.map((price) => [price.symbol.toUpperCase(), price]),
		);
		const marketsMap = new Map(
			baseFilteredMarkets.map((market) => [
				market.baseAsset.toUpperCase(),
				market,
			]),
		);

		// Start with all trading-enabled and active assets
		const allAssets = assetsData.coins.filter(
			(asset) => asset.trading_enabled && asset.active,
		);

		// Combine assets with prices and markets (USDT only for cards)
		const enriched = allAssets.map((asset) => {
			const assetSymbol = asset.name.toUpperCase();
			const priceSymbol = `${assetSymbol}${CARD_BASE}`;
			const price = pricesMap.get(priceSymbol);
			const market = marketsMap.get(assetSymbol);

			return {
				market: market || null,
				asset,
				price: price || null,
			};
		});

		// Also include markets that don't have assets (if any)
		const marketsWithoutAssets = baseFilteredMarkets.filter((market) => {
			const assetExists = allAssets.some(
				(asset) => asset.name.toUpperCase() === market.baseAsset.toUpperCase(),
			);
			return !assetExists;
		});

		const additionalMarkets = marketsWithoutAssets.map((market) => {
			const assetSymbol = market.baseAsset.toUpperCase();
			const priceSymbol = `${assetSymbol}${CARD_BASE}`;
			const price = pricesMap.get(priceSymbol);

			return {
				market,
				asset: null,
				price: price || null,
			};
		});

		return [...enriched, ...additionalMarkets];
	}, [baseFilteredMarkets, assetsData, pricesData]);

	// Combine markets with assets and prices data (for table - always USDT)
	const enrichedMarkets = useMemo(() => {
		if (!assetsData?.coins) {
			return [];
		}

		const filteredPrices =
			pricesData?.filter((price) => {
				const priceSymbolUpper = price.symbol.toUpperCase();
				return priceSymbolUpper.endsWith(TABLE_BASE);
			}) || [];

		const pricesMap = new Map(
			filteredPrices.map((price) => [price.symbol.toUpperCase(), price]),
		);
		const marketsMap = new Map(
			filteredMarkets.map((market) => [market.baseAsset.toUpperCase(), market]),
		);

		let allAssets = assetsData.coins.filter(
			(asset) => asset.trading_enabled && asset.active,
		);

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			allAssets = allAssets.filter(
				(asset) =>
					asset.name.toLowerCase().includes(query) ||
					asset.full_name?.toLowerCase().includes(query),
			);
		}

		const enriched = allAssets.map((asset) => {
			const assetSymbol = asset.name.toUpperCase();
			const priceSymbol = `${assetSymbol}${TABLE_BASE}`;
			const price = pricesMap.get(priceSymbol);
			const market = marketsMap.get(assetSymbol);

			return {
				market: market || null,
				asset,
				price: price || null,
			};
		});

		let filtered = enriched;
		if (selectedCategory) {
			filtered = enriched.filter((item) => {
				if (!item.asset?.labels) return false;
				const mappedCategory = mapAssetToCategory(item.asset.labels);
				return mappedCategory === selectedCategory;
			});
		}

		return filtered;
	}, [
		filteredMarkets,
		assetsData,
		pricesData,
		selectedCategory,
		searchQuery,
	]);

	// Transform enriched markets to table rows (USDT data; convert to IRT when selected)
	const allMarketTableRows = useMemo(() => {
		const isIrt = baseTransaction === 'IRT' && irtUsdtRate > 0;

		return enrichedMarkets
			.filter((item) => item.price && item.asset)
			.map((item) => {
				const { market, price, asset } = item;
				const change24hPercent = price?.price_change_percentage ?? 0;
				const change24hPercentStr = `${
					change24hPercent >= 0 ? '+' : ''
				}${change24hPercent.toFixed(2)}%`;
				const isPositive = change24hPercent >= 0;

				const priceDecimalPlaces = market
					? parseInt(market.priceDecimalPlaces, 10) || 2
					: 2;
				const rawPrice = price?.price ? parseFloat(price.price) : 0;
				const rawVolume = price?.quote_volume
					? parseFloat(price.quote_volume.toString())
					: 0;
				const rawMarketCap = price?.volume
					? parseFloat(price.volume.toString())
					: 0;

				const formattedPrice = isIrt
					? Math.floor(rawPrice * irtUsdtRate).toLocaleString('en-US')
					: rawPrice
						? rawPrice.toLocaleString('en-US', {
								maximumFractionDigits: priceDecimalPlaces,
								minimumFractionDigits: priceDecimalPlaces,
							})
						: '0';

				const formattedVolume = isIrt
					? Math.floor(rawVolume * irtUsdtRate).toLocaleString('en-US')
					: rawVolume
						? rawVolume.toLocaleString('en-US', {
								maximumFractionDigits: 2,
							})
						: '0';

				const formattedMarketCap = isIrt
					? Math.floor(rawMarketCap * irtUsdtRate).toLocaleString('en-US')
					: rawMarketCap
						? rawMarketCap.toLocaleString('en-US', {
								maximumFractionDigits: 2,
							})
						: '0';

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				const symbol = market?.baseAsset || asset!.name.toUpperCase();
				const crypto = market?.name.split('/')[0] || asset!.full_name || symbol;

				return {
					crypto,
					symbol,
					lastPrice: formattedPrice,
					volume: formattedVolume,
					change24h: change24hPercentStr,
					changeType,
					marketCap: formattedMarketCap,
				};
			});
	}, [enrichedMarkets, baseTransaction, irtUsdtRate]);

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

				// Format price based on priceDecimalPlaces from market (or default to 2)
				const priceDecimalPlaces = market
					? parseInt(market.priceDecimalPlaces, 10) || 2
					: 2;
				const formattedPrice = price?.price
					? parseFloat(price.price).toLocaleString('en-US', {
							maximumFractionDigits: priceDecimalPlaces,
							minimumFractionDigits: priceDecimalPlaces,
						})
					: '0';

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				// Use market data if available, otherwise use asset data
				// asset is guaranteed to be non-null by the filter above
				const symbol = market?.baseAsset || asset!.name.toUpperCase();
				const name = asset!.full_name || market?.name.split('/')[0] || symbol;

				return {
					symbol,
					name,
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

		// Newest - filter by trading_enabled && active, sort by created_at (newest first) and take first 3
		// Filter to only include items with both price and asset (with created_at, trading_enabled, and active)
		const newest = enrichedMarketsForCards
			.filter((asset) => asset.asset?.trading_enabled && asset.asset?.active)
			.sort((a, b) => {
				// Sort by created_at descending (newest first)
				const dateA = new Date(a.asset!.created_at).getTime();
				const dateB = new Date(b.asset!.created_at).getTime();
				return dateB - dateA;
			})
			.slice(0, 3)
			.filter((item) => item.price && item.asset)
			.map((item) => {
				const { market, price, asset } = item;
				const change24hPercent = price?.price_change_percentage ?? 0;
				const change24hPercentStr = `${
					change24hPercent >= 0 ? '+' : ''
				}${change24hPercent.toFixed(2)}%`;
				const isPositive = change24hPercent >= 0;

				// Format price based on priceDecimalPlaces from market (or default to 2)
				const priceDecimalPlaces = market
					? parseInt(market.priceDecimalPlaces, 10) || 2
					: 2;
				const formattedPrice = price?.price
					? parseFloat(price.price).toLocaleString('en-US', {
							maximumFractionDigits: priceDecimalPlaces,
							minimumFractionDigits: priceDecimalPlaces,
						})
					: '0';

				const changeType: 'positive' | 'negative' = isPositive
					? 'positive'
					: 'negative';

				// Use market data if available, otherwise use asset data
				// asset is guaranteed to be non-null by the filter above
				const symbol = market?.baseAsset || asset!.name.toUpperCase();
				const name = asset!.full_name || market?.name.split('/')[0] || symbol;

				return {
					symbol,
					name,
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

	// Calculate table headers (outside conditional to avoid hook rule violation)
	const tableHeaders = useMemo(() => {
		// Replace USD with the selected baseTransaction (IRT or USD)
		return market.table.headers.map((header) =>
			header.replace(/USD/g, baseTransaction),
		);
	}, [market.table.headers, baseTransaction]);

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
				<Text
					variant="Main/32px/Black"
					gradient="primary"
					className="mb-4 px-6"
					type="h1"
				>
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
				{/* Overview Cards - Mobile: Swiper */}
				<div className="lg:hidden mb-14 -mx-6 lg:mx-0 px-6 lg:px-0">
					{isLoadingCards ? (
						<Swiper
							spaceBetween={16}
							slidesPerView={1.15}
							className="overflow-visible"
						>
							{[
								market.cards.mostPopular,
								market.cards.newest,
								market.cards.mostProfitable,
								market.cards.mostLosing,
							].map((card, i) => (
								<SwiperSlide key={i}>
									<MarketCardSkeleton title={card.title} />
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<Swiper
							spaceBetween={16}
							slidesPerView={1}
							pagination={{ clickable: true }}
							autoplay={{
								delay: 4000,
								disableOnInteraction: false,
							}}
							modules={[Autoplay]}
							className="overflow-visible"
						>
							<SwiperSlide>
								<MarketCard
									title={market.cards.mostPopular.title}
									items={cardItems.mostPopular}
								/>
							</SwiperSlide>
							<SwiperSlide>
								<MarketCard
									title={market.cards.newest.title}
									items={cardItems.newest}
								/>
							</SwiperSlide>
							<SwiperSlide>
								<MarketCard
									title={market.cards.mostProfitable.title}
									items={cardItems.mostProfitable}
								/>
							</SwiperSlide>
							<SwiperSlide>
								<MarketCard
									title={market.cards.mostLosing.title}
									items={cardItems.mostLosing}
								/>
							</SwiperSlide>
						</Swiper>
					)}
				</div>

				{/* Overview Cards - Desktop: Grid */}
				<div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-14">
					{isLoadingCards ? (
						<>
							<MarketCardSkeleton title={market.cards.mostPopular.title} />
							<MarketCardSkeleton title={market.cards.newest.title} />
							<MarketCardSkeleton title={market.cards.mostProfitable.title} />
							<MarketCardSkeleton title={market.cards.mostLosing.title} />
						</>
					) : (
						<>
							<MarketCard
								title={market.cards.mostPopular.title}
								items={cardItems.mostPopular}
							/>
							<MarketCard
								title={market.cards.newest.title}
								items={cardItems.newest}
							/>
							<MarketCard
								title={market.cards.mostProfitable.title}
								items={cardItems.mostProfitable}
							/>
							<MarketCard
								title={market.cards.mostLosing.title}
								items={cardItems.mostLosing}
							/>
						</>
					)}
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

					{/* Base Transaction Select - custom dropdown opens below */}
					<div className="flex justify-between lg:justify-start items-center gap-2 relative">
						<Text variant="Main/16px/Regular" className="text-grayscale-07!">
							{market.filters.baseTransaction}
						</Text>
						<div className="relative z-100" ref={baseSelectRef}>
							<button
								type="button"
								onClick={() => setBaseSelectOpen((o) => !o)}
								className="flex items-center gap-2 px-6 py-3 rounded-4xl border border-grayscale-03 bg-grayscale-02 text-grayscale-07 focus:outline-none focus:border-brand-primary cursor-pointer w-full min-w-[120px] justify-between"
								aria-expanded={baseSelectOpen}
								aria-haspopup="listbox"
								aria-label={market.filters.baseTransaction}
							>
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-07!"
								>
									{baseTransaction === 'USDT' ? 'دلار' : 'تومان'}
								</Text>
								<svg
									className={cn(
										'w-6 h-6 text-grayscale-07 transition-transform',
										baseSelectOpen && 'rotate-180',
									)}
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden
								>
									<path
										d="M17.1431 9.42894L12.0003 14.5718L6.85742 9.42894"
										stroke="currentColor"
										strokeWidth="1.28571"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							{baseSelectOpen && (
								<ul
									className="absolute top-full left-0 right-0 mt-1 py-1 rounded-2xl border border-grayscale-03 bg-grayscale-02 shadow-lg z-101"
									role="listbox"
								>
									{[
										{ value: 'USDT' as const, label: 'دلار' },
										{ value: 'IRT' as const, label: 'تومان' },
									].map((opt) => (
										<li
											key={opt.value}
											role="option"
											aria-selected={baseTransaction === opt.value}
										>
											<button
												type="button"
												onClick={() => {
													setBaseTransaction(opt.value);
													setBaseSelectOpen(false);
												}}
												className={cn(
													'w-full text-right px-4 py-2.5 text-grayscale-07 hover:bg-grayscale-03 transition-colors first:rounded-t-2xl last:rounded-b-2xl',
													baseTransaction === opt.value &&
														'bg-grayscale-03/50 text-white',
												)}
											>
												{opt.label}
											</button>
										</li>
									))}
								</ul>
							)}
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
				{isLoadingCards ? (
					<MarketTableSkeleton headers={tableHeaders} />
				) : (
					<MarketTable
						headers={tableHeaders}
						rows={marketTableRows}
						onOperations={(row) => {
							console.log('Operations clicked for:', row);
						}}
						onChart={(row) => {
							console.log('Chart clicked for:', row);
						}}
					/>
				)}

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

// MarketCard Skeleton Component
interface MarketCardSkeletonProps {
	title: string;
}

function MarketCardSkeleton({ title }: MarketCardSkeletonProps) {
	return (
		<div
			className="rounded-[28px] border-2 border-grayscale-03 p-8 flex flex-col justify-center items-start gap-6"
			style={
				{
					background:
						'linear-gradient(180deg, rgba(18, 27, 56, 0.00) 50%, rgba(255, 255, 255, 0.12) 100%)',
				} as React.CSSProperties
			}
		>
			<Text variant="Main/14px/SemiBold" className="text-grayscale-07! ">
				{title}
			</Text>
			<div className="flex flex-col gap-6 w-full">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3 flex-1">
							<Skeleton className="w-9 h-9 rounded-full bg-grayscale-03" />
							<Skeleton className="h-5 w-12 bg-grayscale-03" />
						</div>
						<Skeleton className="h-4 w-20 bg-grayscale-03" />
						<Skeleton className="h-5 w-16 bg-grayscale-03" />
					</div>
				))}
			</div>
		</div>
	);
}

// MarketTable Skeleton Component
interface MarketTableSkeletonProps {
	headers: string[];
}

function MarketTableSkeleton({ headers }: MarketTableSkeletonProps) {
	const rowsToShow = 10; // Show 10 skeleton rows

	return (
		<div className="mb-14">
			<div className="min-h-[400px]">
				<table className="w-full">
					<thead>
						<tr>
							{/* رمز ارز - Always visible */}
							<th className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[0]}
								</Text>
							</th>
							{/* آخرین قیمت - Always visible */}
							<th className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[1]}
								</Text>
							</th>
							{/* تغییرات 24h - Visible on tablet and above */}
							<th className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[3]}
								</Text>
							</th>
							{/* حجم معاملات - Visible on XL and above */}
							<th className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[2]}
								</Text>
							</th>
							{/* حجم بازار - Visible on XL and above */}
							<th className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[4]}
								</Text>
							</th>
							{/* عملیات ها - Always visible */}
							<th className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[5]}
								</Text>
							</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: rowsToShow }).map((_, index) => {
							const isLastRow = index === rowsToShow - 1;
							return (
								<tr
									key={index}
									className="border-b border-grayscale-03 last:border-0"
								>
									{/* Cryptocurrency - Always visible */}
									<td
										className={cn(
											'px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4',
											isLastRow && 'border-b-0',
										)}
									>
										<div className="flex items-center gap-3 flex-1">
											<Skeleton className="w-9 h-9 rounded-full bg-grayscale-03" />
											<Skeleton className="h-5 w-12 bg-grayscale-03" />
										</div>
									</td>
									{/* Last Price - Always visible */}
									<td className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
										<Skeleton className="h-5 w-20 bg-grayscale-03" />
									</td>
									{/* 24h Changes - Visible on tablet and above */}
									<td className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
										<Skeleton className="h-5 w-16 bg-grayscale-03" />
									</td>
									{/* Volume - Visible on XL and above */}
									<td className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
										<Skeleton className="h-5 w-24 bg-grayscale-03" />
									</td>
									{/* Market Cap - Visible on XL and above */}
									<td className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
										<Skeleton className="h-5 w-20 bg-grayscale-03" />
									</td>
									{/* Operations - Always visible */}
									<td className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
										<div className="flex items-center gap-2">
											{/* Chart Button Skeleton */}
											<Skeleton className="h-14 w-14 xl:w-[140px] rounded-[40px] bg-grayscale-03" />
											{/* Operations Button Skeleton */}
											<Skeleton className="h-14 w-14 md:w-[140px] rounded-[40px] bg-grayscale-03" />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
