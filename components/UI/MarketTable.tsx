'use client';

import { cn } from '@/lib/utils';
import Text from './Text';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MarketTableRow {
	crypto: string;
	symbol: string;
	lastPrice: string;
	volume: string;
	change24h: string;
	changeType: 'positive' | 'negative';
	marketCap: string;
	icon?: React.ReactNode;
}

interface MarketTableProps {
	headers: string[];
	rows: MarketTableRow[];
	onOperations?: (row: MarketTableRow) => void;
	onChart?: (row: MarketTableRow) => void;
	className?: string;
	emptyMessage?: string;
}

export default function MarketTable({
	headers,
	rows,
	onOperations,
	onChart,
	className,
	emptyMessage = 'هیچ داده‌ای یافت نشد',
}: MarketTableProps) {
	const router = useRouter();
	// Determine which columns to show based on headers
	// Headers order: [رمز ارز, آخرین قیمت, حجم معاملات, تغییرات 24h, حجم بازار, عملیات ها]
	const cryptoIndex = 0;
	const priceIndex = 1;
	const volumeIndex = 2;
	const change24hIndex = 3;
	const marketCapIndex = 4;
	const operationsIndex = 5;

	return (
		<div className={cn('mb-14', className)}>
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
									{headers[cryptoIndex]}
								</Text>
							</th>
							{/* آخرین قیمت - Always visible */}
							<th className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[priceIndex]}
								</Text>
							</th>
							{/* تغییرات 24h - Visible on tablet and above */}
							<th className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[change24hIndex]}
								</Text>
							</th>
							{/* حجم معاملات - Visible on XL and above */}
							<th className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[volumeIndex]}
								</Text>
							</th>
							{/* حجم بازار - Visible on XL and above */}
							<th className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[marketCapIndex]}
								</Text>
							</th>
							{/* عملیات ها - Always visible */}
							<th className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right">
								<Text
									variant="Main/16px/Regular"
									className="text-grayscale-04! text-[14px]"
								>
									{headers[operationsIndex]}
								</Text>
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="px-6 py-20 text-center"
								>
									<Text
										variant="Main/16px/Regular"
										className="text-grayscale-05!"
									>
										{emptyMessage}
									</Text>
								</td>
							</tr>
						) : (
							rows.map((row, index) => {
								const isLastRow = index === rows.length - 1;
								return (
									<tr
										key={index}
										className="border-b border-grayscale-03 last:border-0"
									>
										{/* Cryptocurrency - Always visible */}
										<td className={cn('px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4', isLastRow && 'border-b-0')}>
											<Link
												href={`/coin/${row.symbol.toLowerCase()}`}
												className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
											>
												<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden relative">
													<Image
														src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${row.symbol.toLowerCase()}_.svg`}
														width={36}
														height={36}
														alt={row.symbol}
														className="w-full h-full object-cover"
														onError={(e) => {
															// Hide the image on error, gray background will show
															e.currentTarget.style.display = 'none';
														}}
													/>
												</div>
												<div className="flex-1">
													<Text
														variant="Main/14px/Bold"
														className="text-grayscale-07!"
													>
														{row.symbol}
													</Text>
												</div>
											</Link>
										</td>
										{/* Last Price - Always visible */}
										<td className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
											<Text
												variant="LongText/16px/Regular"
												className="text-grayscale-06!"
											>
												{row.lastPrice}
											</Text>
										</td>
										{/* 24h Changes - Visible on tablet and above */}
										<td className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
											<Text
												variant="LongText/16px/Regular"
												className={cn(
													row.changeType === 'positive'
														? 'text-green'
														: 'text-red-500!',
												)}
											>
												{row.change24h}
											</Text>
										</td>
										{/* Volume - Visible on XL and above */}
										<td className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
											<Text
												variant="LongText/16px/Regular"
												className="text-grayscale-06!"
											>
												{row.volume}
											</Text>
										</td>
										{/* Market Cap - Visible on XL and above */}
										<td className="hidden xl:table-cell px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
											<Text
												variant="LongText/16px/Regular"
												className="text-grayscale-06!"
											>
												{row.marketCap}
											</Text>
										</td>
										{/* Operations - Always visible */}
										<td className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4">
											<div className="flex items-center gap-2">
												{/* Chart Button - Icon only on mobile and tablet, text on XL+ */}
												<button
													onClick={() => {
														router.push(`/coin/${row.symbol.toLowerCase()}`);
														onChart?.(row);
													}}
													aria-label="نمودار"
													className={cn(
														'h-14 rounded-[40px] bg-brand-primary-container hover:bg-[rgba(15,91,244,0.12)] transition-colors flex flex-row items-center justify-center gap-2',
														// Mobile & Tablet: icon only (w-14), XL+: with text (w-[140px])
														'w-14 xl:w-[140px] xl:pr-6 xl:pl-7 pl-0 pr-0',
													)}
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
														className="hidden xl:block"
													>
														نمودار
													</Text>
												</button>
												{/* Operations Button */}
												<button
													onClick={() => onOperations?.(row)}
													aria-label="خرید و فروش"
													className={cn(
														'h-14 rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2',
														// Mobile: icon only, Tablet+: with text
														'w-14 md:w-[140px] md:pr-6 md:pl-7 pl-0 pr-0',
													)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="18"
														viewBox="0 0 16 18"
														fill="none"
													>
														<path
															d="M5.01641 16.75L1.81641 13.55M1.81641 13.55L5.01641 10.35M1.81641 13.55H11.4164C13.1837 13.55 14.6164 12.1173 14.6164 10.35V9.28333"
															stroke="white"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M0.75 8.2167V7.15C0.75 5.38269 2.18269 3.95 3.95 3.95H13.55M13.55 3.95L10.35 7.15M13.55 3.95L10.35 0.75"
															stroke="white"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<Text
														variant="Main/14px/Bold"
														color="text-white!"
														className="hidden md:block"
													>
														عملیات
													</Text>
												</button>
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
