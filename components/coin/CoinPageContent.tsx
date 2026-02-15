'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useConfigsQuery } from '@/hooks/useConfigsQuery';
import { useAssetsPriceListQuery } from '@/hooks/useAssetsQuery';
import { useMarketsQuery } from '@/hooks/useMarketsQuery';
import { useCoinData } from '@/hooks/useCoinData';
import Collapse2 from '@/components/UI/Collapse2';
import Link from 'next/link';
import { getCoinPersianName } from '@/lib/coinNames';

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M18.3493 15.2423L3.65234 6.75696M3.65234 6.75696L5.37781 13.1965M3.65234 6.75696L10.0919 5.03149"
			className="stroke-grayscale-01"
			strokeWidth="1.5"
			strokeLinecap="round"
			stroke-Linejoin="round"
		/>
	</svg>
);

export default function CoinPageContent() {
	const { common } = useTranslation();
	const params = useParams();
	const { theme, mounted } = useTheme();
	const [buyOrSell, setBuyOrSell] = useState<'buy' | 'sell'>('buy');
	const [coinAmount, setCoinAmount] = useState<string>('1'); // Store raw value (without commas)
	const [irtAmount, setIrtAmount] = useState<string>(''); // Store raw value (without commas)
	const initializedRef = useRef(false);

	const symbol = params?.symbol ?? '';
	const symbolUpper = String(symbol).toUpperCase();

	// Fetch configs, prices, and markets
	const { data: configs, isLoading: isLoadingConfigs } = useConfigsQuery();
	const { data: pricesData = [], isLoading: isLoadingPrices } =
		useAssetsPriceListQuery();
	const { data: marketsData = [], isLoading: isLoadingMarkets } =
		useMarketsQuery();

	// Load coin data from JSON file
	const { coinData } = useCoinData(symbolUpper);

	// Find which price group the coin belongs to
	const priceGroup = useMemo(() => {
		if (!configs?.priceGroups || !symbolUpper) return null;

		return (
			configs.priceGroups.find((group) =>
				group.coins.some((coin) => coin.toUpperCase() === symbolUpper),
			) || null
		);
	}, [configs, symbolUpper]);

	// Get market data for this coin (to get decimal places)
	const marketData = useMemo(() => {
		if (!marketsData.length || !symbolUpper) return null;

		// Try to find market with this coin as base asset (e.g., "BTCIRT" or "BTCUSDT")
		const market = marketsData.find(
			(market) =>
				market.baseAsset.toUpperCase() === symbolUpper &&
				(market.quoteAsset.toUpperCase() === 'IRT' ||
					market.quoteAsset.toUpperCase() === 'USDT'),
		);

		return market || null;
	}, [marketsData, symbolUpper]);

	// Get market for chart iframe - prefer IRT pair for Iranian users
	const chartMarketId = useMemo(() => {
		if (!marketsData.length || !symbolUpper) return null;
		const irtMarket = marketsData.find(
			(m) =>
				m.baseAsset.toUpperCase() === symbolUpper &&
				m.quoteAsset.toUpperCase() === 'IRT',
		);
		const usdtMarket = marketsData.find(
			(m) =>
				m.baseAsset.toUpperCase() === symbolUpper &&
				m.quoteAsset.toUpperCase() === 'USDT',
		);
		return irtMarket?.id ?? usdtMarket?.id ?? null;
	}, [marketsData, symbolUpper]);

	// Get decimal places allowed for coin amount (base quantity decimal places)
	const coinDecimalPlaces = useMemo(() => {
		if (marketData?.baseQuantityDecimalPlaces) {
			return parseInt(marketData.baseQuantityDecimalPlaces, 10) || 8;
		}
		// Default to 8 decimal places if not found
		return 8;
	}, [marketData]);

	// Get coin price in USDT
	const coinPriceInUsdt = useMemo(() => {
		if (!pricesData.length || !symbolUpper) return null;
		if (symbolUpper === 'USDT') {
			return 1;
		}

		// Try to find USDT pair (e.g., "BTCUSDT")
		const usdtPair = pricesData.find(
			(price) =>
				price.symbol.toUpperCase() === `${symbolUpper}USDT` &&
				price.type === 'sell',
		);

		if (usdtPair) {
			return parseFloat(usdtPair.price);
		}

		return null;
	}, [pricesData, symbolUpper]);

	// Calculate price in IRT based on buy/sell mode
	const priceInIrt = useMemo(() => {
		if (!priceGroup || !coinPriceInUsdt) return null;

		const exchangeRate =
			buyOrSell === 'buy'
				? priceGroup.prices.irtUsdt // Use irtUsdt for buy
				: priceGroup.prices.usdtIrt; // Use usdtIrt for sell

		// Calculate: coin price in USDT * exchange rate = price in IRT
		// For buy: if irtUsdt = 149200, it means 1 USDT costs 149200 IRT
		// For sell: if usdtIrt = 148000, it means 1 USDT = 148000 IRT
		return coinPriceInUsdt * exchangeRate;
	}, [priceGroup, coinPriceInUsdt, buyOrSell]);

	// Price data for market info section (volume, change %, etc.)
	const priceDataForInfo = useMemo(() => {
		if (!pricesData.length || !symbolUpper) return null;
		const usdtPair = pricesData.find(
			(p) =>
				p.symbol.toUpperCase() === `${symbolUpper}USDT` && p.type === 'sell',
		);
		return usdtPair ?? null;
	}, [pricesData, symbolUpper]);

	// Toman price for display (buy rate)
	const tomanPriceForInfo = useMemo(() => {
		if (!priceGroup || !coinPriceInUsdt) return null;
		return coinPriceInUsdt * priceGroup.prices.irtUsdt;
	}, [priceGroup, coinPriceInUsdt]);

	// Helper function to format number with commas (for coin amount - allows decimals)
	const formatNumberWithCommas = (value: string | number): string => {
		if (value === '' || value === null || value === undefined) return '';
		const numStr = String(value);

		// If the string ends with a decimal point, preserve it (user is still typing)
		const endsWithDot = numStr.trim().endsWith('.');

		// Remove all non-digit and non-decimal characters (but preserve the structure)
		const cleaned = numStr.replace(/[^\d.]/g, '');
		if (!cleaned) return '';

		// Handle cases where user types just "." or starts with "."
		if (cleaned === '.') {
			return '0.';
		}

		// Split by decimal point
		const parts = cleaned.split('.');
		let integerPart = parts[0] || '';
		const decimalPart = parts[1] || '';

		// If integer part is empty but we have a decimal, use '0'
		if (!integerPart && (decimalPart || endsWithDot)) {
			integerPart = '0';
		}

		// Add commas to integer part (only if not empty)
		const formattedInteger = integerPart
			? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			: '0';

		// Return formatted number with decimal part if it exists or ends with dot
		if (decimalPart || endsWithDot) {
			return `${formattedInteger}.${decimalPart}`;
		}

		return formattedInteger;
	};

	// Helper function to format integer with commas (for IRT - no decimals)
	const formatIntegerWithCommas = (value: string | number): string => {
		if (!value && value !== 0) return '';
		const numStr =
			typeof value === 'number' ? Math.floor(value).toString() : value;
		// Remove all non-digit characters (no decimals for IRT)
		const cleaned = numStr.replace(/[^\d]/g, '');
		if (!cleaned) return '';

		// Add commas
		return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	// Initialize IRT amount when price is first loaded or buy/sell mode changes
	useEffect(() => {
		if (priceInIrt && !initializedRef.current) {
			const calculatedIrt = 1 * priceInIrt;
			// Store raw integer value (without commas, no decimals)
			setIrtAmount(Math.floor(calculatedIrt).toString());
			initializedRef.current = true;
		} else if (priceInIrt && initializedRef.current) {
			// Update when buy/sell mode changes
			const coinNum = parseFloat(coinAmount) || 1;
			const calculatedIrt = coinNum * priceInIrt;
			// Store raw integer value (without commas, no decimals)
			setIrtAmount(Math.floor(calculatedIrt).toString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceInIrt, buyOrSell]);

	const isLoading = isLoadingConfigs || isLoadingPrices || isLoadingMarkets;

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/Download/Header-Dark.avif')] md:bg-[url('/assets/Download/Header-MD-Dark.avif')] lg:bg-[url('/assets/Download/Header-LG-Dark.avif')] 2xl:bg-[url('/assets/Download/Header-XL-Dark.avif')] "
			: "bg-[url('/assets/Download/Header.avif')] md:bg-[url('/assets/Download/Header-MD.avif')] lg:bg-[url('/assets/Download/Header-LG.avif')] 2xl:bg-[url('/assets/Download/Header-XL.avif')] ";
	}, [theme, mounted]);

	const baseStyle = 'bg-[#4D6CFF] border border-[#ffffff3d]';
	const activeStyle = 'bg-[#fff] border border-[#ffffff3d]';
	const nameFa = getCoinPersianName(symbolUpper);
	// Use empty string when Farsi name not found (getCoinPersianName returns symbol as fallback)
	const nameFaOrEmpty = nameFa !== symbolUpper ? nameFa : '';

	return (
		<div className="flex flex-col gap-8">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[200px] md:h-[240px] lg:h-[291px] 2xl:h-[320px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center',
					bgUrls,
				)}
			>
				<div className="flex flex-row items-center gap-6 justify-center">
					{/* Title */}
					<Text
						variant="Main/32px/Black"
						gradient="primary"
						type="h1"
						className="tracking-wider"
					>
						{String(symbol).toUpperCase()}
					</Text>

					<div className="w-14 h-20 flex items-start justify-start pt-2">
						<Image
							src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${String(
								symbol,
							).toLowerCase()}_.svg`}
							width={56}
							height={56}
							alt={String(symbol) ?? 'Coin'}
							onError={(e) => {
								// Hide the image on error, gray background will show
								e.currentTarget.style.display = 'none';
							}}
						/>
					</div>
				</div>

				<div className="flex flex-row-reverse items-center justify-center gap-3">
					{isLoading ? (
						<Text variant="Main/24px/Bold" gradient="grayscale">
							...
						</Text>
					) : priceInIrt ? (
						<>
							<div className="flex flex-row items-center justify-center gap-3">
								<Text variant="Main/24px/Bold" gradient="grayscale">
									{formatIntegerWithCommas(Math.floor(priceInIrt))}
								</Text>
								<Text variant="Main/16px/Regular" gradient="grayscale">
									تومان
								</Text>
							</div>
							<div>
								<Text
									variant="Main/20px/Bold"
									className="font-normal"
									gradient="grayscale"
								>
									=
								</Text>
							</div>
							<div className="flex flex-row items-center justify-center gap-3">
								<Text variant="Main/16px/Regular" gradient="grayscale">
									{symbolUpper}
								</Text>
								<Text variant="Main/24px/Bold" gradient="grayscale">
									1
								</Text>
							</div>
						</>
					) : null}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
				<div>
					<div className="flex flex-col items-start mb-10 gap-4">
						<div className="flex flex-row items-center gap-2">
							<Text type="h1" variant="Main/32px/Bold">
								قیمت، خرید و فروش
							</Text>
							<Text type="h1" variant="Main/32px/Bold" gradient="primary">
								ارز {nameFaOrEmpty && `${nameFaOrEmpty} `}
								{symbolUpper}
							</Text>
						</div>
						<div className="flex flex-row items-center gap-4">
							<Text
								type="h2"
								variant="Main/16px/Regular"
								className="text-grayscale-05!"
							>
								قیمت ارز دیجیتال {symbolUpper} {nameFaOrEmpty}
							</Text>
							<Text variant="Main/16px/Regular" className="text-grayscale-05!">
								-
							</Text>
							<Text
								type="h2"
								variant="Main/16px/Regular"
								className="text-grayscale-05!"
							>
								قیمت لحظه‌ای {symbolUpper} {nameFaOrEmpty}
							</Text>
						</div>
					</div>
					{chartMarketId ? (
						<iframe
							src={`https://app.eterex.com/chart?marketId=${chartMarketId}&mode=${theme}`}
							title={`نمودار قیمت ${symbolUpper}`}
							width={700}
							height={460}
							className="w-full rounded-4xl border-0 min-h-[460px]"
							sandbox="allow-scripts allow-same-origin"
						/>
					) : null}
				</div>
				<div className="flex flex-col items-start sticky top-30">
					<div className="flex flex-col items-start mb-10 gap-4">
						<div className="flex flex-row items-center gap-2">
							<Text type="h3" variant="Main/32px/Bold">
								خرید و فروش
							</Text>
							<Text type="h3" variant="Main/32px/Bold" gradient="primary">
								ارز {symbolUpper}
							</Text>
						</div>
						<div className="flex flex-row items-center gap-4">
							<Text variant="Main/16px/Regular" className="text-grayscale-05!">
								تبدیل با احتساب کارمزد 0.01%{' '}
							</Text>
						</div>
					</div>
					<div className="overflow-hidden bg-brand-primary rounded-[40px] p-8 flex flex-col items-center justify-start h-fit relative">
						<div className="border-2 border-[#ffffff3d] rounded-4xl p-2 max-w-[400px] bg-[#2649FF] h-16 flex flex-row items-center justify-center gap-4 mb-10 relative z-10">
							<div
								className={cn(
									'cursor-pointer p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
									buyOrSell === 'buy' ? activeStyle : baseStyle,
								)}
								onClick={() => setBuyOrSell('buy')}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="19"
									viewBox="0 0 20 19"
									fill="none"
									className={
										buyOrSell === 'buy'
											? '[&>path]:stroke-black'
											: '[&>path]:stroke-white'
									}
								>
									<path
										d="M0.75 18.2013H18.1341"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M8.5502 1.81204L2.38195 7.98035C0.890473 9.47185 1.01111 11.4643 2.50649 12.9597L6.5402 16.9944C8.0356 18.4897 10.0232 18.6143 11.5206 17.1179L17.6879 10.9506C19.1852 9.45335 19.0597 7.46566 17.5643 5.97029L13.5296 1.9356C12.0343 0.440228 10.0466 0.315698 8.5502 1.81204Z"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3.19727 13.653L14.2214 2.62891"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.02344 14.3614L10.8418 12.543"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>

								<Text
									variant="Main/14px/SemiBold"
									color={buyOrSell === 'buy' ? 'text-black!' : 'text-white!'}
									className="leading-5 font-medium"
								>
									{common.buy}
								</Text>
							</div>
							<div
								className={cn(
									'cursor-pointer p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
									buyOrSell === 'sell' ? activeStyle : baseStyle,
								)}
								onClick={() => setBuyOrSell('sell')}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="19"
									height="20"
									viewBox="0 0 19 20"
									fill="none"
									className={
										buyOrSell === 'sell'
											? '[&>path]:stroke-black'
											: '[&>path]:stroke-white'
									}
								>
									<path
										d="M15.0314 6.9314H3.82483C1.92933 6.9314 0.75 8.26936 0.75 10.162V15.5196C0.75 17.4131 1.92933 18.7501 3.82581 18.7501H15.0314C16.9259 18.7501 18.1053 17.4131 18.1053 15.5196V10.162C18.1053 8.26936 16.9211 6.9314 15.0314 6.9314Z"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3.84961 9.5918H5.20214"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M15.0048 16.0918H13.6523"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7.2207 12.8416C7.2207 11.6234 8.20833 10.6357 9.42663 10.6357C10.6448 10.6357 11.6325 11.6234 11.6325 12.8416C11.6325 14.0599 10.6448 15.0476 9.42663 15.0476C8.20833 15.0476 7.2207 14.0599 7.2207 12.8416Z"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5.54492 4.08714V2.59546"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M13.3066 4.08714V2.59546"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.42578 4.08756V0.75"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>

								<Text
									variant="Main/14px/SemiBold"
									color={buyOrSell === 'sell' ? 'text-black!' : 'text-white!'}
									className="leading-5 font-medium"
								>
									{common.sell}
								</Text>
							</div>
						</div>
						<div className="w-full relative mb-4">
							<input
								id="coinAmount"
								type="text"
								inputMode="decimal"
								value={formatNumberWithCommas(coinAmount)}
								onChange={(e) => {
									const value = e.target.value;

									// Allow only numbers and decimal point
									const cleaned = value.replace(/[^\d.]/g, '');

									// If empty, allow it
									if (cleaned === '') {
										setCoinAmount('');
										setIrtAmount('');
										return;
									}

									// Ensure only one decimal point
									const parts = cleaned.split('.');
									let rawValue =
										parts.length > 2
											? `${parts[0]}.${parts.slice(1).join('')}`
											: cleaned;

									// Limit decimal places based on coinDecimalPlaces
									if (rawValue.includes('.')) {
										const [integerPart, decimalPart] = rawValue.split('.');
										if (decimalPart && decimalPart.length > coinDecimalPlaces) {
											rawValue = `${integerPart}.${decimalPart.slice(
												0,
												coinDecimalPlaces,
											)}`;
										}
									}

									// Store raw value (without commas)
									setCoinAmount(rawValue);

									if (priceInIrt && rawValue) {
										const coinNum = parseFloat(rawValue) || 0;
										if (coinNum > 0) {
											const calculatedIrt = coinNum * priceInIrt;
											// Store raw integer value (without commas, no decimals)
											setIrtAmount(Math.floor(calculatedIrt).toString());
										} else {
											setIrtAmount('');
										}
									} else {
										setIrtAmount('');
									}
								}}
								className="py-2 pl-6 pr-28 border-2 border-glass-white-24 bg-glass-white-12 backdrop-blur-xl rounded-[40px] text-xl font-semibold text-white placeholder:text-base placeholder:text-white focus:outline-0 text-left! h-[72px] w-full"
								placeholder="مقدار را وارد کنید"
							/>
							<div className="h-8 flex items-center justify-center absolute right-6 top-5 gap-4">
								<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden relative">
									<Image
										src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${String(
											symbol,
										).toLowerCase()}_.svg`}
										width={36}
										height={36}
										alt={symbolUpper ?? 'Coin'}
										className="w-full h-full object-cover"
										onError={(e) => {
											e.currentTarget.style.display = 'none';
										}}
									/>
								</div>
								<Text variant="Main/16px/Regular" className="text-white!">
									{symbolUpper}
								</Text>
							</div>
						</div>
						<div className="w-full relative mb-6">
							<input
								id="irtAmount"
								type="text"
								inputMode="numeric"
								value={formatIntegerWithCommas(irtAmount)}
								onChange={(e) => {
									const value = e.target.value;
									// Allow only numbers (no decimal point for IRT)
									const rawValue = value.replace(/[^\d]/g, '');

									// Store raw integer value (without commas)
									setIrtAmount(rawValue);

									if (priceInIrt && rawValue) {
										const irtNum = parseInt(rawValue, 10) || 0;
										const calculatedCoin = irtNum / priceInIrt;
										const coinValue = calculatedCoin
											.toFixed(8)
											.replace(/\.?0+$/, '');
										// Store raw value for coin amount
										setCoinAmount(coinValue || '');
									} else {
										setCoinAmount('');
									}
								}}
								className="py-2 pl-6 pr-28 border-2 border-glass-white-24 bg-glass-white-12 backdrop-blur-xl rounded-[40px] text-xl font-semibold text-white placeholder:text-base placeholder:text-white focus:outline-0 text-left! h-[72px] w-full"
								placeholder="مقدار را وارد کنید"
							/>
							<div className="h-8 flex items-center justify-center absolute right-6 top-5 gap-4">
								<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden relative">
									<Image
										src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/irt_.svg`}
										width={36}
										height={36}
										alt="IRT"
										className="w-full h-full object-cover"
										onError={(e) => {
											e.currentTarget.style.display = 'none';
										}}
									/>
								</div>
								<Text variant="Main/16px/Regular" className="text-white!">
									IRT
								</Text>
							</div>
						</div>
						<div className="flex flex-row items-center justify-between w-full mb-6">
							<Text variant="Main/14px/SemiBold" className="text-white">
								نرخ تبدیل
							</Text>
							<div className="flex flex-row-reverse items-center justify-center gap-3">
								{isLoading ? (
									<Text variant="Main/24px/Bold" className="text-white">
										...
									</Text>
								) : priceInIrt ? (
									<>
										<div className="flex flex-row items-center justify-center gap-2">
											<Text variant="Main/16px/Regular" className="text-white">
												{symbolUpper}
											</Text>
											<Text variant="Main/20px/Bold" className="text-white">
												1
											</Text>
										</div>
										<div>
											<Text
												variant="Main/16px/Regular"
												className="font-normal text-white"
											>
												=
											</Text>
										</div>
										<div className="flex flex-row items-center justify-center gap-2">
											<Text variant="Main/16px/Regular" className="text-white">
												IRT
											</Text>
											<Text variant="Main/20px/Bold" className="text-white">
												{
													buyOrSell === 'buy'
														? Number(
																priceGroup?.prices.irtUsdt,
															).toLocaleString() // Use irtUsdt for buy
														: Number(
																priceGroup?.prices.usdtIrt,
															).toLocaleString() // Use usdtIrt for sell
												}
											</Text>
										</div>
									</>
								) : null}
							</div>
						</div>
						<div className="flex flex-row items-center justify-between w-full">
							<button className="h-14 w-full bg-white flex flex-row items-center justify-center rounded-[40px] ">
								<Text variant="Main/14px/Bold" className="text-black!">
									معامله
								</Text>
							</button>
						</div>
						<Image
							src="/assets/Download/VectorRight.png"
							alt="Download"
							width={200}
							height={200}
							className="w-[200px] h-[200px] object-cover absolute right-0 -top-18 z-0"
						/>
					</div>
				</div>

				<div>
					<div className="my-[120px] rounded-4xl border-2 border-grayscale-03 p-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b-2 border-grayscale-03">
							<div className="flex flex-col gap-6 items-center md:items-start justify-center">
								<div className="flex flex-row items-center gap-2">
									<Text variant="Main/32px/Bold">چگونه</Text>
									<Text variant="Main/32px/Bold" gradient="primary">
										{getCoinPersianName(symbolUpper)} بخریم؟
									</Text>
								</div>
								<Text variant="Main/16px/Regular">
									فرایند خرید {getCoinPersianName(symbolUpper)} در صرافی اتراکس
									را به طور کلی در ویدئو زیر توضیح دادیم:
								</Text>
							</div>
							<Image
								src="/assets/main/howtoBuy.png"
								alt="Download"
								width={200}
								height={200}
								className="w-full h-[200px] object-cover rounded-2xl"
							/>
						</div>

						<div className="pt-8 flex flex-col gap-8">
							<div className="flex flex-row items-center justify-between gap-8 w-full">
								<div className="flex flex-row items-center gap-8">
									<Text variant="Main/24px/Bold" gradient="primary">
										۱
									</Text>
									<div className="flex flex-col justify-center items-start gap-3">
										<Text variant="Main/20px/Bold">ثبت‌نام</Text>
										<Text variant="Main/16px/Regular">
											ابتدا در سایت یا اپلیکیشن اتراکس ثبت‌نام کنید
										</Text>
									</div>
								</div>
								<Link
									href="https://app.eterex.com/login"
									className="bg-grayscale-07 rounded-[40px] h-12 md:h-14 px-4 md:px-6 text-[12px] md:text-base font-bold text-grayscale-01 flex items-center justify-center gap-2"
								>
									ثبت‌نام <UserIcon />
								</Link>
							</div>
							<div className="flex flex-row items-center justify-start gap-8 w-full">
								<Text variant="Main/24px/Bold" gradient="primary">
									۲
								</Text>
								<div className="flex flex-col justify-center items-start gap-3">
									<Text variant="Main/20px/Bold">احراز هویت</Text>
									<Text variant="Main/16px/Regular">
										با احراز هویت اتوماتیک، در لحظه دسترسی‌تان فعال می‌شود.
									</Text>
								</div>
							</div>
							<div className="flex flex-row items-center justify-start gap-8 w-full">
								<Text variant="Main/24px/Bold" gradient="primary">
									۳
								</Text>
								<div className="flex flex-col justify-center items-start gap-3">
									<Text variant="Main/20px/Bold">شارژ حساب</Text>
									<Text variant="Main/16px/Regular">
										از درگاه بانکی، شماره شبا و یا حتی واریز مستقیم استفاده کنید
										تا کیف‌پول خود را در سریع‌ترین زمان شارژ کنید.{' '}
									</Text>
								</div>
							</div>
							<div className="flex flex-row items-center justify-start gap-8 w-full">
								<Text variant="Main/24px/Bold" gradient="primary">
									۴
								</Text>
								<div className="flex flex-col justify-center items-start gap-3">
									<Text variant="Main/20px/Bold">خرید ارز دیجیتال </Text>
									<Text variant="Main/16px/Regular">
										اکنون می‌توانید به‌صورت لحظه‌ای رمزارزهای دلخواهتان را در
										اتراکس معامله کنید؛ سریع، مطمئن و بدون محدودیت.{' '}
									</Text>
								</div>
							</div>
						</div>
					</div>
					{/* Info Section */}
					{/* Market Info Section */}
					<div className="py-5 border-b border-grayscale-03 bg-white dark:bg-grayscale-01 mt-8">
						<Collapse2
							header={`اطلاعات بازار ${nameFaOrEmpty || symbolUpper}`}
							defaultOpen={true}
							headerClassName="text-right"
							contentClassName="text-right"
						>
							<div className="flex flex-col gap-3 text-right">
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">رتبه در بازار</Text>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-05"
									>
										—
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">تغییرات ۲۴ ساعته</Text>
									<Text
										variant="LongText/16px/Regular"
										className={
											(priceDataForInfo?.price_change_percentage ?? 0) >= 0
												? 'text-green'
												: 'text-red'
										}
									>
										{priceDataForInfo?.price_change_percentage != null
											? `%${priceDataForInfo.price_change_percentage.toFixed(0)}`
											: '—'}
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">قیمت دلاری</Text>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-05"
									>
										{coinPriceInUsdt != null
											? `$${coinPriceInUsdt.toLocaleString('en-US', {
													minimumFractionDigits: 2,
													maximumFractionDigits: 6,
												})}`
											: '—'}
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">قیمت تومانی</Text>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-05"
									>
										{tomanPriceForInfo != null
											? `${tomanPriceForInfo.toLocaleString('fa-IR')} تومان`
											: '—'}
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">ارز در دسترس</Text>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-05"
									>
										—
									</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">
										حداکثر ارز قابل عرضه
									</Text>
									<Text variant="LongText/16px/Regular">نامحدود</Text>
								</div>
								<div className="grid grid-cols-2 gap-10">
									<Text variant="LongText/16px/Regular">ارز در گردش</Text>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-05"
									>
										نامحدود
									</Text>
								</div>
							</div>
						</Collapse2>
					</div>

					{coinData && coinData.sections && coinData.sections.length > 0 && (
						<div className="flex flex-col gap-6 mt-8">
							<div className="flex flex-col gap-4">
								{coinData.sections.map((section, index) => (
									<div
										key={index}
										className="py-5 border-b border-grayscale-03 last:border-b-0 bg-white dark:bg-grayscale-01"
									>
										<Collapse2
											header={section.title}
											defaultOpen={index === 0}
											headerClassName="text-right"
											contentClassName="text-right"
										>
											<Text
												variant="LongText/16px/Regular"
												className="whitespace-pre-line leading-relaxed"
											>
												{section.description
													.replace(/\n\s+/g, ' ')
													.replace(/\s+/g, ' ')
													.trim()}
											</Text>
										</Collapse2>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
