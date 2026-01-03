'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CryptoItem {
	symbol: string;
	name: string;
	listDate: string;
	price: string;
	icon?: string;
}

export default function ListedCryptos() {
	const { listedCryptos } = useTranslation();

	// Mock data
	const cryptos: CryptoItem[] = [
		{
			symbol: 'BTC',
			name: 'Bitcoin',
			listDate: '1404/05/26',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
		},
		{
			symbol: 'ETH',
			name: 'Ethereum',
			listDate: '1404/05/26',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
		},
		{
			symbol: 'XRP',
			name: 'Ripple',
			listDate: '1404/05/26',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			listDate: '1404/05/26',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
		},
	];

	return (
		<Container className="py-12 md:py-16 lg:py-20 lg:pr-0 xl:pr-0 2xl:pr-0">
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
				<div className="flex flex-row items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{listedCryptos.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{listedCryptos.title.highlight}
					</Text>
				</div>
			</div>

			{/* Table */}
			<div
				className="rounded-[28px] border-2 border-grayscale-03 overflow-hidden p-9"
				style={{
					background:
						'linear-gradient(180deg, var(--grayscale-01-blur-0, rgba(18, 27, 56, 0.00)) 50%, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 100%);',
				}}
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
							{cryptos.map((crypto, index) => {
								const isLastRow = index === cryptos.length - 1;

								return (
									<tr
										key={index}
										className={cn(
											'hover:bg-grayscale-02 border-b border-grayscale-03',
											isLastRow ? 'border-b-0' : '',
										)}
									>
										{/* Cryptocurrency Name */}
										<td className={cn('h-14')}>
											<div className="flex items-center gap-3">
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
											</div>
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
							})}
						</tbody>
					</table>
				</div>
			</div>
		</Container>
	);
}
