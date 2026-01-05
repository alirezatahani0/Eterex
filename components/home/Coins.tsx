'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface CryptoItem {
	symbol: string;
	name: string;
	listDate: string;
	price: string;
	icon?: string;
	change24h: string;
	changeType: string;
}

export default function Coins() {
	const { coins } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState('web3');

	// Mock data
	const cryptos: CryptoItem[] = [
		{
			symbol: 'BTC',
			name: 'Bitcoin',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'ETH',
			name: 'Ethereum',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'XRP',
			name: 'Ripple',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
		{
			symbol: 'USDT',
			name: 'Tether',
			listDate: '125,000,000 IRT',
			price: '231,245,000 IRT',
			icon: '/BTC.png',
			change24h: '+1.6',
			changeType: 'positive' as const,
		},
	];

	const categories = [
		{ key: 'web3', label: coins.filters.categories.favorits },
		{ key: 'memecoins', label: coins.filters.categories.newest },
		{ key: 'nft', label: coins.filters.categories.mostProfitable },
		{ key: 'ai', label: coins.filters.categories.mostLost },
		{ key: 'gaming', label: coins.filters.categories.recommend },
	];

	const tabs = [
		{ key: 'web3', label: coins.filters.tabs.volume },
		{ key: 'memecoins', label: coins.filters.tabs.marketCap },
		{ key: 'nft', label: coins.filters.tabs.spot },
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

				<div className="flex flex-col md:flex-row items-start md:items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{coins.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{coins.title.highlight}
					</Text>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
				{/* Table */}
				<div
					className="rounded-[28px] border-2 border-grayscale-03 overflow-hidden p-6 lg:p-8"
					style={{
						background:
							'linear-gradient(180deg, var(--grayscale-01-blur-0, rgba(18, 27, 56, 0.00)) 50%, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 100%)',
					} as React.CSSProperties}
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
											{coins.table.headers[1]}
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
											<td className={cn('h-18 w-[190px]')}>
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
											<td className="w-[170px] hidden md:table-cell">
												<Text
													variant="Main/16px/Regular"
													className="text-grayscale-07!"
												>
													{crypto.listDate}
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
														// onClick={() => onChart?.(row)}
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
														// onClick={() => onOperations?.(row)}
														className="h-14 w-14 2xl:w-[170px] rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
													>
														<Text
															variant="Main/14px/Bold"
															color="text-white!"
															className="hidden 2xl:block"
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
								})}
							</tbody>
						</table>
					</div>
				</div>
				{/* Coins */}
				<div className="bg-brand-primary rounded-3xl p-4 2xl:p-8 relative overflow-hidden z-10">
					<div className="bg-[url('/assets/main/Vector.png')] bg-no-repeat bg-center bg-contain absolute top-0 -right-1/4 w-full h-[450px] z-0" />
					{/* Category Filters */}
					<div className="border-2 border-[#ffffff3d] rounded-4xl p-2 max-w-[400px] md:max-w-full bg-[#2649FF] h-16 flex flex-row items-center justify-center gap-2 mb-4 relative z-10">
						{tabs.map((category) => (
							<button
								key={category.key}
								onClick={() => setSelectedCategory(category.key)}
								className={cn(
									'p-1 2xl:p-3 h-full flex flex-row items-center justify-center gap-2 rounded-4xl w-1/3',
									selectedCategory === category.key ? activeStyle : baseStyle,
								)}
							>
								<Text
									variant="Main/14px/SemiBold"
									className={
										selectedCategory === category.key
											? 'text-black! font-normal'
											: 'text-white! font-light'
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
									{coins.table.headers2.map((header, index) => (
										<th key={index} className={cn('pb-2 text-right')}>
											<Text
												variant="Main/14px/SemiBold"
												className="text-[#ACB9FF]! font-normal"
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
											<td className={cn('h-18')}>
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
														className="text-white! "
													>
														{crypto.symbol}
													</Text>
												</div>
											</td>
											<td>
												<Text
													variant="Main/16px/Regular"
													className="text-white!"
												>
													{crypto.listDate}
												</Text>
											</td>
											<td>
												<Text
													variant="Main/16px/Regular"
													className="text-white!"
												>
													{crypto.price}
												</Text>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Container>
	);
}
