'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMarketsQuery } from '@/hooks/useMarketsQuery';
import {
	useAssetsListQuery,
	useAssetsPriceListQuery,
} from '@/hooks/useAssetsQuery';
import { useConfigsQuery } from '@/hooks/useConfigsQuery';

export default function Coins() {
	const { coins } = useTranslation();
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('newest');
	const [selectedTab, setSelectedTab] = useState('volume');
	const [priceInToman, setPriceInToman] = useState(false);

	const { data: marketsData = [], isLoading: isLoadingMarkets } =
		useMarketsQuery({ showAll: true });
	const { data: assetsData, isLoading: isLoadingAssets } = useAssetsListQuery();
	const { data: pricesData = [], isLoading: isLoadingPrices } =
		useAssetsPriceListQuery();
	const { data: configs, isLoading: isLoadingConfigs } = useConfigsQuery();

	const isLoading =
		isLoadingMarkets || isLoadingAssets || isLoadingPrices || isLoadingConfigs;

	// Base data transformation (no sorting)
	const baseCryptos = useMemo(() => {
		if (!marketsData.length || !assetsData?.coins || !pricesData.length) {
			return [];
		}

		const pricesMap = new Map(
			pricesData.map((price) => [price.symbol.toUpperCase(), price]),
		);

		const allAssets = assetsData.coins.filter(
			(asset) => asset.trading_enabled && asset.active,
		);

		const marketsMap = new Map(
			marketsData.map((market) => [market.baseAsset.toUpperCase(), market]),
		);

		// Find price group for a coin from configs
		const getPriceGroup = (symbol: string) => {
			if (!configs?.priceGroups) return null;
			return (
				configs.priceGroups.find((group) =>
					group.coins.some((coin) => coin.toUpperCase() === symbol),
				) || null
			);
		};

		return allAssets
			.map((asset) => {
				const assetSymbol = asset.name.toUpperCase();
				const priceSymbol = `${assetSymbol}USDT`;
				const price = pricesMap.get(priceSymbol);
				const market = marketsMap.get(assetSymbol);

				if (!asset || !price) return null;

				if (!asset.trading_enabled || !asset.active) return null;

				if (price.type === 'buy') return null;

				const priceNum = parseFloat(price.price);
				const decimalPlaces =
					parseInt(market?.priceDecimalPlaces || '4', 10) || 4;
				const priceGroup = getPriceGroup(assetSymbol);

				const change24h = price.price_change_percentage || 0;
				const changeType: 'positive' | 'negative' =
					change24h >= 0 ? 'positive' : 'negative';
				const changeText = `${change24h >= 0 ? '+' : ''}${change24h.toFixed(
					2,
				)}%`;

				const iconUrl = asset.name
					? `${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${asset.name.toLowerCase()}_.svg`
					: undefined;

				const date = new Date(asset.created_at);
				const formattedDate = date.toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				});

				return {
					symbol: assetSymbol,
					name: asset.full_name || asset.name,
					listDate: formattedDate,
					priceNum,
					decimalPlaces,
					priceGroup,
					icon: iconUrl,
					change24h: changeText,
					changeType,
					volume: price.volume || 0,
					volumeFormatted: (price.volume || 0).toLocaleString('en-US'),
					marketCap: priceNum * (price.volume || 0),
					created_at: asset.created_at,
					priceChange: change24h,
				};
			})
			.filter(
				(
					item,
				): item is NonNullable<typeof item> & {
					created_at: string;
					priceChange: number;
				} => item !== null,
			);
	}, [marketsData, assetsData, pricesData, configs]);

	// Get display price based on toggle and coin's price group
	const getDisplayPrice = (crypto: (typeof baseCryptos)[number]) => {
		if (isNaN(crypto.priceNum)) return '—';
		if (priceInToman) {
			console.log(crypto.priceGroup, 'crypto.priceGroup');
			if (!crypto.priceGroup) return '—';
			const irtPrice = Math.floor(
				crypto.priceNum * crypto.priceGroup.prices.irtUsdt,
			);
			return irtPrice.toLocaleString('en-US');
		}
		return crypto.priceNum.toLocaleString('en-US', {
			minimumFractionDigits: crypto.decimalPlaces,
			maximumFractionDigits: crypto.decimalPlaces,
		});
	};

	// Left table data - filtered by category only
	const leftTableCryptos = useMemo(() => {
		if (!baseCryptos.length) return [];

		let filtered = [...baseCryptos];
		if (selectedCategory === 'newest') {
			// Sort by created_at (newest first) - matching Markets page
			// baseCryptos already filtered by trading_enabled && active
			filtered = [...baseCryptos].sort((a, b) => {
				const dateA = new Date(a.created_at).getTime();
				const dateB = new Date(b.created_at).getTime();
				return dateB - dateA; // Descending (newest first)
			});
		} else if (selectedCategory === 'mostProfit') {
			filtered = [...baseCryptos].sort((a, b) => b.priceChange - a.priceChange);
		} else if (selectedCategory === 'mostLost') {
			filtered = [...baseCryptos].sort((a, b) => a.priceChange - b.priceChange);
		}

		return filtered.slice(0, 7);
	}, [baseCryptos, selectedCategory]);

	// Right table data - sorted by tab only
	const rightTableCryptos = useMemo(() => {
		if (!baseCryptos.length) return [];

		let filtered = [...baseCryptos];
		if (selectedTab === 'volume') {
			filtered = [...baseCryptos].sort(
				(a, b) => (b.volume || 0) - (a.volume || 0),
			);
		} else if (selectedTab === 'marketCap') {
			filtered = [...baseCryptos].sort(
				(a, b) => (b.marketCap || 0) - (a.marketCap || 0),
			);
		} else if (selectedTab === 'spotTrades') {
			filtered = [...baseCryptos].sort(
				(a, b) => (b.volume || 0) - (a.volume || 0),
			);
		}

		return filtered.slice(0, 7);
	}, [baseCryptos, selectedTab]);

	const categories = [
		{ key: 'newest', label: coins.filters.categories.newest },
		{ key: 'mostProfit', label: coins.filters.categories.mostProfitable },
		{ key: 'mostLost', label: coins.filters.categories.mostLost },
	];

	const tabs = [
		{ key: 'volume', label: coins.filters.tabs.volume },
		{ key: 'marketCap', label: coins.filters.tabs.marketCap },
		{ key: 'spotTrades', label: coins.filters.tabs.spot },
	];

	const baseStyle = 'bg-[#4D6CFF] border border-[#ffffff3d]';
	const activeStyle = 'bg-[#fff] border border-[#ffffff3d]';

	return (
		<Container className="py-12 md:py-16 lg:py-20">
			<div className="mb-14">
				{/* Tagline */}
				<div className="inline-flex items-center gap-2 px-4 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit mb-10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<g clipPath="url(#clip0_3137_77919)">
							<path
								d="M7.28571 0C7.28571 0 7.68771 3.7521 9.25352 5.31791C10.8193 6.88372 14.5714 7.28571 14.5714 7.28571C14.5714 7.28571 10.8193 7.68771 9.25352 9.25352C7.68771 10.8193 7.28571 14.5714 7.28571 14.5714C7.28571 14.5714 6.88372 10.8193 5.31791 9.25352C3.7521 7.68771 0 7.28571 0 7.28571C0 7.28571 3.7521 6.88372 5.31791 5.31791C6.88372 3.7521 7.28571 0 7.28571 0Z"
								fill="#EB9E2A"
							/>
							<path
								opacity="0.7"
								d="M15 11C15 11 15.1655 12.545 15.8103 13.1897C16.455 13.8345 18 14 18 14C18 14 16.455 14.1655 15.8103 14.8103C15.1655 15.455 15 17 15 17C15 17 14.8345 15.455 14.1897 14.8103C13.545 14.1655 12 14 12 14C12 14 13.545 13.8345 14.1897 13.1897C14.8345 12.545 15 11 15 11Z"
								fill="#C6D2F8"
							/>
						</g>
						<defs>
							<clipPath id="clip0_3137_77919">
								<rect width="20" height="20" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<div className="flex flex-row items-center gap-1">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							{coins.tagline.prefix}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{coins.tagline.highlight}
						</Text>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							{coins.tagline.suffix}
						</Text>
					</div>
				</div>

				<div className="flex flex-row items-center justify-between w-full">
					<div className="flex flex-col md:flex-row items-start md:items-center gap-1">
						<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
							{coins.title.prefix}
						</Text>
						<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
							{coins.title.highlight}
						</Text>
					</div>
					<button
						onClick={() => setPriceInToman((prev) => !prev)}
						className={cn(
							'rounded-[40px] border-2 h-14 pr-7 pl-6 flex flex-row gap-2 items-center justify-center transition-colors',
							'border-grayscale-03',
						)}
					>
						<Text variant="Main/14px/Bold" className={'text-grayscale-07!'}>
							{priceInToman ? 'قیمت به تومان' : 'قیمت به USDT'}
						</Text>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M9.33477 20L6.13477 16.8M6.13477 16.8L9.33477 13.6M6.13477 16.8H15.7348C17.5021 16.8 18.9348 15.3673 18.9348 13.6V12.5333"
								stroke="#294BFF"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5.06738 11.4667V10.4C5.06738 8.63269 6.50007 7.2 8.26738 7.2H17.8674M17.8674 7.2L14.6674 10.4M17.8674 7.2L14.6674 4"
								stroke="#294BFF"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-6">
				{/* Table */}
				<div
					className="rounded-[28px] border-2 border-grayscale-03 overflow-hidden p-6 lg:p-8"
					style={
						{
							background:
								'linear-gradient(180deg, var(--grayscale-01-blur-0, rgba(18, 27, 56, 0.00)) 50%, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 100%)',
						} as React.CSSProperties
					}
				>
					{/* Category Filters */}
					<div className="mb-6 flex flex-row gap-2 overflow-x-auto overflow-y-hidden ">
						{categories.map((category) => (
							<button
								key={category.key}
								onClick={() => setSelectedCategory(category.key)}
								className={cn(
									'p-4 rounded-4xl border-2 border-grayscale-03 transition-colors min-w-[145px] flex flex-row items-center justify-center max-h-14',
									selectedCategory === category.key ? 'bg-grayscale-07 ' : '',
								)}
							>
								<Text
									variant="Main/14px/SemiBold"
									className={
										selectedCategory === category.key
											? 'text-grayscale-01!'
											: 'text-grayscale-05! font-medium'
									}
								>
									{category.label}
								</Text>
							</button>
						))}
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr>
									<th className={cn('pb-4 text-right')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										>
											{coins.table.headers[0]}
										</Text>
									</th>
									<th className={cn('pb-4 text-right hidden md:table-cell')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										>
											{coins.table.headers[1]} {priceInToman ? 'IRT' : 'USDT'}
										</Text>
									</th>
									<th className={cn('pb-4 text-right hidden md:table-cell')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										>
											{coins.table.headers[2]}
										</Text>
									</th>
									<th className={cn('pb-4 text-right hidden md:table-cell')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										></Text>
									</th>
									<th className={cn('pb-4 text-right block md:hidden')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										>
											{coins.table.headers[3]}
										</Text>
									</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									Array.from({ length: 7 }).map((_, i) => (
										<tr
											key={i}
											className={cn(
												'border-b border-grayscale-03',
												i === 6 ? 'border-b-0' : '',
											)}
										>
											<td className="h-18 w-[190px]">
												<div className="flex items-center gap-3">
													<div className="w-9 h-9 rounded-full bg-grayscale-03 animate-pulse" />
													<div className="h-5 w-16 bg-grayscale-03 rounded animate-pulse" />
												</div>
											</td>
											<td className="w-[170px] hidden md:table-cell">
												<div className="h-5 w-24 bg-grayscale-03 rounded animate-pulse" />
											</td>
											<td className="w-[170px] hidden md:table-cell">
												<div className="h-5 w-16 bg-grayscale-03 rounded animate-pulse" />
											</td>
											<td className="w-[170px] flex flex-col md:hidden items-end pl-4 justify-center h-18">
												<div className="h-5 w-24 bg-grayscale-03 rounded animate-pulse mb-2" />
												<div className="h-5 w-16 bg-grayscale-03 rounded animate-pulse" />
											</td>
											<td>
												<div className="flex items-center gap-2">
													<div className="h-14 w-14 bg-grayscale-03 rounded-[40px] animate-pulse" />
													<div className="h-14 w-14 bg-grayscale-03 rounded-[40px] animate-pulse" />
												</div>
											</td>
										</tr>
									))
								) : leftTableCryptos.length > 0 ? (
									leftTableCryptos.map((crypto, index) => {
										const isLastRow = index === leftTableCryptos.length - 1;

										return (
											<tr
												key={crypto.symbol}
												className={cn(
													'border-b border-grayscale-03',
													isLastRow ? 'border-b-0' : '',
												)}
											>
												<td className={cn('h-18 w-[190px]')}>
													<Link
														href={`/coin/${crypto.symbol.toLowerCase()}`}
														className="flex items-center gap-3 hover:opacity-80 transition-opacity"
													>
														{crypto.icon && (
															<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden relative">
																<Image
																	src={crypto.icon}
																	alt={crypto.symbol}
																	width={36}
																	height={36}
																	className="w-full h-full object-cover"
																	onError={(e) => {
																		// Hide the image on error, gray background will show
																		e.currentTarget.style.display = 'none';
																	}}
																/>
															</div>
														)}
														<Text
															variant="Main/16px/Regular"
															className="text-grayscale-07! "
														>
															{crypto.symbol}
														</Text>
													</Link>
												</td>
												<td className="w-[170px] hidden md:table-cell">
													<Text
														variant="Main/16px/Regular"
														className="text-grayscale-07!"
													>
														{getDisplayPrice(crypto)}
													</Text>
												</td>
												<td className="w-[170px] hidden md:table-cell">
													<Text
														variant="LongText/16px/Regular"
														className={cn(
															crypto.changeType === 'positive'
																? 'text-green'
																: 'text-red-500!',
														)}
													>
														{crypto.change24h}
													</Text>
												</td>
												<td className="w-[170px] flex flex-col md:hidden items-end pl-4 justify-center h-18">
													<Text
														variant="Main/16px/Regular"
														className="text-grayscale-07!"
													>
														{crypto.listDate}
													</Text>
													<Text
														variant="LongText/16px/Regular"
														className={cn(
															'leading-5',
															crypto.changeType === 'positive'
																? 'text-green'
																: 'text-red-500!',
														)}
													>
														{crypto.change24h}
													</Text>
												</td>
												<td>
													<div className="flex items-center gap-2">
														<button
															onClick={() =>
																router.push(
																	`/coin/${crypto.symbol.toLowerCase()}`,
																)
															}
															aria-label="نمودار"
															className="hidden md:flex h-14 w-14 2xl:w-[140px] rounded-[40px] bg-brand-primary-container hover:bg-[rgba(15,91,244,0.12)] transition-colors flex-row items-center justify-center gap-2"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																height="19"
																viewBox="0 0 20 19"
																fill="none"
															>
																<path
																	d="M6.75076 7.95422H2.55496C1.55747 7.95422 0.75 8.76164 0.75 9.75913V17.8657H6.75076V7.95422V7.95422Z"
																	stroke="#294BFF"
																	strokeWidth="1.5"
																	strokeMiterlimit="10"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	d="M10.9499 0.75H8.54325C7.54575 0.75 6.73828 1.55752 6.73828 2.55501V17.85H12.7391V2.55501C12.7391 1.55752 11.9474 0.75 10.9499 0.75Z"
																	stroke="#294BFF"
																	strokeWidth="1.5"
																	strokeMiterlimit="10"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	d="M16.9458 10.6459H12.75V17.8501H18.7508V12.4509C18.735 11.4534 17.9275 10.6459 16.9458 10.6459Z"
																	stroke="#294BFF"
																	strokeWidth="1.5"
																	strokeMiterlimit="10"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<Text
																variant="Main/14px/Bold"
																color="text-brand-primary!"
																className="hidden 2xl:block"
															>
																نمودار
															</Text>
														</button>
														<button
															aria-label="خرید و فروش"
															className="h-14 w-14 lg:w-[170px] rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
														>
															<Text
																variant="Main/14px/Bold"
																color="text-white!"
																className="hidden lg:block"
															>
																خرید و فروش
															</Text>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																height="12"
																viewBox="0 0 20 12"
																fill="none"
															>
																<path
																	d="M18.75 5.75H0.75M0.75 5.75L5.75 0.75M0.75 5.75L5.75 10.75"
																	stroke="white"
																	strokeWidth="1.5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</button>
													</div>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={5} className="text-center py-8">
											<Text
												variant="Main/16px/Regular"
												className="text-grayscale-05!"
											>
												هیچ داده‌ای یافت نشد
											</Text>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				{/* Coins */}
				<div className="bg-brand-primary rounded-3xl px-2 py-4 2xl:p-8 relative overflow-hidden z-10">
					<Image
						src={'/assets/main/patterns.svg'}
						width={200}
						height={200}
						alt="white pattern"
						className="absolute top-0 right-0 z-10"
					/>
					{/* Category Filters */}
					<div className="border-2 border-[#ffffff3d] rounded-4xl p-1 max-w-[400px] md:max-w-full bg-[#2649FF] h-14 flex flex-row items-center justify-center gap-2 mb-4 relative z-10">
						{tabs.map((tab) => (
							<button
								key={tab.key}
								onClick={() => setSelectedTab(tab.key)}
								className={cn(
									'p-1 2xl:p-3 h-full flex flex-row items-center justify-center gap-2 rounded-4xl w-1/3',
									selectedTab === tab.key ? activeStyle : baseStyle,
								)}
							>
								<Text
									variant="Main/14px/SemiBold"
									className={
										selectedTab === tab.key
											? 'text-black! font-normal'
											: 'text-white! font-light'
									}
								>
									{tab.label}
								</Text>
							</button>
						))}
					</div>
					<div className="overflow-x-auto relative z-10">
						<table className="w-full">
							<thead>
								<tr>
									{coins.table.headers2.map((header, index) => (
										<th key={index} className={cn('pb-2 text-right')}>
											<Text
												variant="Main/14px/SemiBold"
												className="text-[#ACB9FF]! font-normal"
											>
												{index === 1
													? `${header} ${priceInToman ? 'IRT' : 'USDT'}`
													: header}
											</Text>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									// Loading skeleton
									Array.from({ length: 7 }).map((_, i) => (
										<tr
											key={i}
											className={cn(
												'border-b border-grayscale-03',
												i === 6 ? 'border-b-0' : '',
											)}
										>
											<td className="h-18">
												<div className="flex items-center gap-3">
													<div className="w-9 h-9 rounded-full bg-grayscale-03 animate-pulse" />
													<div className="h-5 w-16 bg-grayscale-03 rounded animate-pulse" />
												</div>
											</td>
											<td>
												<div className="h-5 w-24 bg-grayscale-03 rounded animate-pulse" />
											</td>
											<td>
												<div className="h-5 w-32 bg-grayscale-03 rounded animate-pulse" />
											</td>
										</tr>
									))
								) : rightTableCryptos.length > 0 ? (
									rightTableCryptos.map((crypto, index) => {
										const isLastRow = index === rightTableCryptos.length - 1;

										return (
											<tr
												key={crypto.symbol}
												className={cn(
													'border-b border-grayscale-03',
													isLastRow ? 'border-b-0' : '',
												)}
											>
												<td className={cn('h-18')}>
													<Link
														href={`/coin/${crypto.symbol.toLowerCase()}`}
														className="flex items-center gap-3 hover:opacity-80 transition-opacity"
													>
														{crypto.icon && (
															<div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
																<Image
																	src={crypto.icon}
																	alt={crypto.symbol}
																	width={36}
																	height={36}
																	className="w-full h-full object-cover"
																/>
															</div>
														)}
														<Text
															variant="Main/16px/Regular"
															className="text-white! "
														>
															{crypto.symbol}
														</Text>
													</Link>
												</td>
												<td>
													<Text
														variant="Main/16px/Regular"
														className="text-white!"
													>
														{getDisplayPrice(crypto)}
													</Text>
												</td>
												<td>
													<Text
														variant="Main/16px/Regular"
														className="text-white!"
													>
														{crypto.volumeFormatted || '—'}
													</Text>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={3} className="text-center py-8">
											<Text variant="Main/16px/Regular" className="text-white!">
												هیچ داده‌ای یافت نشد
											</Text>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Container>
	);
}
