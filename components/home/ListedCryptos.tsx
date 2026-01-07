'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
	useAssetsListQuery,
	useAssetsPriceListQuery,
} from '@/hooks/useAssetsQuery';
import { useMemo, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ListedCryptos() {
	const { listedCryptos } = useTranslation();
	const { theme, mounted } = useTheme();
	const [currentPage, setCurrentPage] = useState(0);

	const { data: assetsData, isLoading: isLoadingAssets } = useAssetsListQuery();
	const { data: pricesData = [], isLoading: isLoadingPrices } =
		useAssetsPriceListQuery();

	const itemsPerPage = 4;

	// Transform assets to crypto items, sorted by created_at
	const cryptos = useMemo(() => {
		if (!assetsData?.coins || !pricesData.length) return [];

		// Filter assets that are trading enabled and sort by created_at (newest first)
		const sortedAssets = [...assetsData.coins]
			.filter((asset) => asset.trading_enabled && asset.active)
			.sort((a, b) => {
				const dateA = new Date(a.created_at).getTime();
				const dateB = new Date(b.created_at).getTime();
				return dateB - dateA; // Descending (newest first)
			})

		// Map to CryptoItem format
		return sortedAssets.map((asset) => {
			// Format date to Persian format
			const date = new Date(asset.created_at);
			const formattedDate = date.toLocaleDateString('fa-IR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});

			// Find price for this asset (look for IRT pair, e.g., "BTCIRT")
			const priceSymbol = `${asset.name.toUpperCase()}IRT`;
			const assetPrice = pricesData.find(
				(price) =>
					price.symbol.toUpperCase() === priceSymbol && price.type === 'buy',
			);

			// Format price
			let priceText = '—';
			if (assetPrice) {
				const priceNum = parseFloat(assetPrice.price);
				if (!isNaN(priceNum)) {
					priceText = `${priceNum.toLocaleString('fa-IR')} IRT`;
				}
			}

			// Get icon URL
			const iconUrl = asset.name
				? `${
						process.env.NEXT_PUBLIC_ICON_BASE_URL
				  }/${asset.name.toLowerCase()}_.svg`
				: undefined;

			return {
				symbol: asset.name.toUpperCase(),
				name: asset.full_name || asset.name,
				listDate: formattedDate,
				price: priceText,
				icon: iconUrl,
			};
		});
	}, [assetsData, pricesData]);

	const isLoading = isLoadingAssets || isLoadingPrices;

	// Calculate pagination
	const totalPages = Math.ceil(cryptos.length / itemsPerPage);
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedCryptos = cryptos.slice(startIndex, endIndex);

	// Pagination handlers
	const handlePreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const isFirstPage = currentPage === 0;
	const isLastPage = currentPage >= totalPages - 1;

	return (
		<Container className="py-12 md:py-16 lg:py-20 lg:pr-0 xl:pr-0 2xl:pr-0 hidden lg:block">
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
							{listedCryptos.newest}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{listedCryptos.tagline}
						</Text>
					</div>
				</div>

				{/* Title */}
				<div className="flex flex-row items-center justify-between w-full">
					<div className="flex flex-row items-center gap-1">
						<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
							{listedCryptos.title.prefix}
						</Text>
						<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
							{listedCryptos.title.highlight}
						</Text>
					</div>
					<div className="flex flex-row items-center gap-3">
						<button
							onClick={handlePreviousPage}
							disabled={isFirstPage || isLoading}
							className={cn(
								'w-13 h-13 rounded-full bg-grayscale-02 flex items-center justify-center transition-opacity',
								isFirstPage || isLoading
									? 'opacity-50 cursor-not-allowed'
									: 'hover:opacity-80 cursor-pointer',
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="7"
								viewBox="0 0 16 7"
								fill="none"
								className={
									mounted && theme === 'light'
										? '[&>path]:stroke-black'
										: '[&>path]:stroke-white'
								}
							>
								<path
									d="M0.5 0.500136C0.5 0.500136 2.62066 6.50014 8 6.50014C13.3793 6.50014 15.2719 0.500136 15.5 0.500136"
									strokeLinecap="round"
									strokeWidth="1.5"
								/>
							</svg>
						</button>
						<button
							onClick={handleNextPage}
							disabled={isLastPage || isLoading}
							className={cn(
								'w-13 h-13 rounded-full bg-grayscale-02 flex items-center justify-center transition-opacity',
								isLastPage || isLoading
									? 'opacity-50 cursor-not-allowed'
									: 'hover:opacity-80 cursor-pointer',
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="7"
								viewBox="0 0 16 7"
								fill="none"
								className={
									mounted && theme === 'light'
										? '[&>path]:stroke-black'
										: '[&>path]:stroke-white'
								}
							>
								<path
									d="M0.5 6.5C0.5 6.5 2.62066 0.5 8 0.5C13.3793 0.5 15.2719 6.5 15.5 6.5"
									strokeLinecap="round"
									strokeWidth="1.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div
				className="rounded-[28px] border-2 border-grayscale-03 overflow-hidden p-9"
				style={
					{
						background:
							'linear-gradient(180deg, var(--grayscale-01-blur-0, rgba(18, 27, 56, 0.00)) 50%, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 100%)',
					} as React.CSSProperties
				}
			>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr>
								{listedCryptos.table.headers.map((header, index) => (
									<th key={index} className={cn('pb-4 text-right')}>
										<Text
											variant="Main/14px/SemiBold"
											className="text-grayscale-05! font-normal"
										>
											{header}
										</Text>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								// Loading skeleton
								Array.from({ length: itemsPerPage }).map((_, i) => (
									<tr
										key={i}
										className={cn(
											'hover:bg-grayscale-02 border-b border-grayscale-03',
											i === 3 ? 'border-b-0' : '',
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
										<td>
											<div className="h-11 w-11 rounded-full bg-grayscale-03 animate-pulse" />
										</td>
									</tr>
								))
							) : paginatedCryptos.length > 0 ? (
								paginatedCryptos.map((crypto, index) => {
									const isLastRow = index === paginatedCryptos.length - 1;

									return (
										<tr
											key={crypto.symbol}
											className={cn(
												'hover:bg-grayscale-02 border-b border-grayscale-03',
												isLastRow ? 'border-b-0' : '',
											)}
										>
											{/* Cryptocurrency Name */}
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
														className="text-grayscale-07! "
													>
														{crypto.symbol}
													</Text>
												</Link>
											</td>
											{/* Listing Date */}
											<td>
												<Text
													variant="Main/16px/Regular"
													className="text-grayscale-07!"
												>
													{crypto.listDate}
												</Text>
											</td>
											{/* Buy Price */}
											<td>
												<Text
													variant="Main/16px/Regular"
													className="text-grayscale-07!"
												>
													{crypto.price}
												</Text>
											</td>
											{/* Operations */}
											<td>
												<button className="h-11 w-11 rounded-full bg-brand-primary-container flex items-center justify-center gap-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
													>
														<path
															d="M21 12H3M3 12L8 7M3 12L8 17"
															stroke="#294BFF"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan={4} className="text-center py-8">
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
		</Container>
	);
}
