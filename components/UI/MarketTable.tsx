'use client';

import { cn } from '@/lib/utils';
import Text from './Text';
import Image from 'next/image';

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
}

export default function MarketTable({
	headers,
	rows,
	onOperations,
	onChart,
	className,
}: MarketTableProps) {
	return (
		<div className={cn('overflow-x-auto', className)}>
			<div>
				<table className="w-full">
					<thead>
						<tr>
							{headers.map((header, index) => (
								<th key={index} className="px-6 py-4 text-right ">
									<Text
										variant="Main/16px/Regular"
										className="text-grayscale-04! text-[14px]"
									>
										{header}
									</Text>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							const isLastRow = index === rows.length - 1;
							return (
								<tr
									key={index}
									className="border-b border-grayscale-03 last:border-0"
								>
									{/* Cryptocurrency */}
									<td className={cn('px-6 py-4', isLastRow && 'border-b-0')}>
										<div className="flex items-center gap-3 flex-1">
											<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center">
												<Image
													src="/BTC.png"
													width={36}
													height={36}
													alt="BTC"
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
										</div>
									</td>
									{/* Last Price */}
									<td className="px-6 py-4 ">
										<Text
											variant="LongText/16px/Regular"
											className="text-grayscale-06!"
										>
											{row.lastPrice}
										</Text>
									</td>
									{/* Volume */}
									<td className="px-6 py-4">
										<Text
											variant="LongText/16px/Regular"
											className="text-grayscale-06!"
										>
											{row.volume}
										</Text>
									</td>
									{/* 24h Changes */}
									<td className="px-6 py-4 ">
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
									{/* Market Cap */}
									<td className="px-6 py-4">
										<Text
											variant="LongText/16px/Regular"
											className="text-grayscale-06!"
										>
											{row.marketCap}
										</Text>
									</td>
									{/* Operations */}
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												onClick={() => onChart?.(row)}
												className="h-14 w-[140px] pr-6 pl-7 rounded-[40px] bg-brand-primary-container hover:bg-[rgba(15,91,244,0.12)] transition-colors flex flex-row items-center justify-center gap-2"
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
												>
													نمودار
												</Text>
											</button>
											<button
												onClick={() => onOperations?.(row)}
												className="h-14 w-[140px] pr-6 pl-7 rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
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
												>
													عملیات
												</Text>
											</button>
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
