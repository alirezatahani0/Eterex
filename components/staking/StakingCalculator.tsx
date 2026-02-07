'use client';

import { useState } from 'react';
import Text from '@/components/UI/Text';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function StakingCalculator() {
	const [selectedCoin, setSelectedCoin] = useState('USDT');
	const [amount, setAmount] = useState('1000');
	const [selectedDays, setSelectedDays] = useState(30);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const coins = [
		{ symbol: 'USDT', icon: 'usdt_.svg', apy: 12.6 },
		{ symbol: 'BTC', icon: 'btc_.svg', apy: 12 },
		{ symbol: 'ETH', icon: 'eth_.svg', apy: 15 },
		{ symbol: 'BNB', icon: 'bnb_.svg', apy: 18 },
	];

	const days = [30, 90, 180, 360];

	const selectedCoinData = coins.find((c) => c.symbol === selectedCoin);
	const apy = selectedCoinData?.apy || 0;

	// Calculate daily return
	const dailyReturn = (parseFloat(amount) || 0) * (apy / 100 / 365);
	const totalReturn = dailyReturn * selectedDays;

	// Calculate IRT equivalent (example rate: 1 USDT = 164,590 IRT)
	const irtRate = 164590;
	const totalReturnIRT = totalReturn * irtRate;

	return (
		<div
			className="relative w-full flex flex-col overflow-hidden lg:flex-row-reverse justify-center lg:justify-between items-center gap-6 p-6 self-stretch rounded-[36px] border-2 border-grayscale-03 lg:container lg:m-auto"
			style={{
				background:
					'linear-gradient(180deg, rgba(18, 27, 56, 0.00) 50%, rgba(255, 255, 255, 0.12) 100%)',
			}}
			onClick={(e) => e.stopPropagation()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="671"
				height="748"
				viewBox="0 0 671 748"
				fill="none"
				className="absolute top-0 left-0"
			>
				<g opacity="0.15" filter="url(#filter0_f_3383_122170)">
					<path
						d="M-110.873 116.798L580.237 507.701L54.6767 -84L-110.873 116.798Z"
						fill="#294BFF"
					/>
				</g>
				<defs>
					<filter
						id="filter0_f_3383_122170"
						x="-360.875"
						y="-334"
						width="1191.11"
						height="1091.7"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						/>
						<feGaussianBlur
							stdDeviation="125"
							result="effect1_foregroundBlur_3383_122170"
						/>
					</filter>
				</defs>
			</svg>
			<Image
				src={'/assets/staking/calculatorPatterns.svg'}
				width={200}
				height={200}
				alt="white pattern"
				className="absolute top-0 left-0 z-10"
			/>
			{/* Calculator Icon */}
			<div className="flex justify-center mb-6">
				<Image
					src="/assets/staking/calculator2.png"
					alt="calculator"
					width={152}
					height={152}
					className="md:w-[200px] md:h-[200px] lg:w-[400px] lg:h-[400px] z-20"
				/>
			</div>

			<div className="flex flex-col justify-center items-center lg:items-start gap-6 lg:w-2/3 w-full">
				{/* Title */}
				<div className="text-center lg:text-right! mb-8">
					<Text
						variant="Main/24px/Bold"
						className="text-grayscale-07! lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						محاسبه{' '}
						<Text
							variant="Main/24px/Bold"
							gradient="primary"
							className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
						>
							بازدهی استیکینگ
						</Text>
					</Text>
				</div>

				<div className="flex flex-row items-center justify-between gap-2 w-full ">
					{/* Coin Selector */}
					<div className="flex items-center justify-between">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
							می‌خواهم
						</Text>
					</div>

					{/* Amount Input */}
					<div className="relative lg:w-full">
						<input
							type="text"
							value={amount}
							onChange={(e) => {
								const value = e.target.value.replace(/[^\d]/g, '');
								setAmount(value);
							}}
							className="w-full h-15 px-2 pr-4 bg-glass-white-1 rounded-[40px] border border-grayscale-03 text-grayscale-07 text-xl font-semibold text-center focus:outline-none focus:border-brand-primary"
							placeholder="1000"
						/>
						<div className="absolute top-2 left-1.5 z-10 ">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="w-full h-11 px-6 bg-glass-gray-11 backdrop-blur-xl rounded-[40px] flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden">
										<Image
											src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${selectedCoinData?.icon}`}
											alt={selectedCoin}
											width={32}
											height={32}
											className="w-full h-full object-cover"
										/>
									</div>
									<Text
										variant="Main/16px/Regular"
										className="text-grayscale-07!"
									>
										{selectedCoin}
									</Text>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									className={cn(
										'transition-transform',
										isDropdownOpen && 'rotate-180',
									)}
								>
									<path
										d="M5 7.5L10 12.5L15 7.5"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-grayscale-05"
									/>
								</svg>
							</button>

							{/* Dropdown */}
							{isDropdownOpen && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 overflow-hidden z-10">
									{coins.map((coin) => (
										<button
											key={coin.symbol}
											onClick={() => {
												setSelectedCoin(coin.symbol);
												setIsDropdownOpen(false);
											}}
											className="w-full px-6 py-3 flex items-center gap-3 hover:bg-grayscale-03 transition-colors"
										>
											<div className="w-8 h-8 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden">
												<Image
													src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${coin.icon}`}
													alt={coin.symbol}
													width={32}
													height={32}
													className="w-full h-full object-cover"
												/>
											</div>
											<Text
												variant="Main/16px/Regular"
												className="text-grayscale-07!"
											>
												{coin.symbol}
											</Text>
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Days Selector */}
				<div className="flex flex-row items-center justify-start gap-2 lg:gap-6 w-full">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
						را به مدت
					</Text>
					<div className="flex items-center justify-between gap-2">
						{days.map((day) => (
							<button
								key={day}
								onClick={() => setSelectedDays(day)}
								className={cn(
									'w-13 h-11 rounded-4xl transition-all flex items-center justify-center',
									selectedDays === day ? 'bg-brand-primary-container' : '',
								)}
							>
								<Text
									variant="Main/14px/SemiBold"
									className={cn(
										selectedDays === day
											? 'text-brand-primary!'
											: 'text-grayscale-07!',
									)}
								>
									{day}
								</Text>
							</button>
						))}
					</div>
					<div className="text-right hidden lg:flex">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07! ">
							روز در اتراکس استیک کنم:
						</Text>
					</div>
				</div>

				<div className="w-full text-right lg:hidden">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-07! ">
						روز در اتراکس استیک کنم:
					</Text>
				</div>
				{/* Results */}
				<div
					className="p-6 rounded-3xl w-full"
					style={{
						background:
							'linear-gradient(180deg, var(--grayscale-01-blur-0, rgba(18, 27, 56, 0.00)) 50%, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 100%), var(--Grayscale-02, #1B2440);',
					}}
				>
					{/* Daily Return */}
					<div className="flex items-center justify-between w-full mb-5">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
							پاداش پیش‌بینی‌شده
						</Text>
						<div className="flex items-center gap-2">
							<Text
								variant="Main/16px/Regular"
								className="text-grayscale-07! font-semibold"
							>
								{totalReturn.toFixed(2)}
							</Text>
							<Text
								variant="Main/16px/Regular"
								className="text-grayscale-07! font-semibold"
							>
								{selectedCoin}
							</Text>
						</div>
					</div>

					{/* IRT Equivalent */}
					<div className="flex items-center justify-between w-full">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
							معادل حدود
						</Text>
						<div className="flex items-center gap-2">
							<Text
								variant="Main/16px/Regular"
								className="text-grayscale-07! font-semibold"
							>
								{Number(totalReturnIRT.toFixed(0)).toLocaleString('en-US')}
							</Text>
							<Text
								variant="Main/16px/Regular"
								className="text-grayscale-07! font-semibold"
							>
								تومان
							</Text>
						</div>
					</div>
					<div className="w-full h-px border-t border-grayscale-03 my-6" />
					{/* Warning Message */}
					<div className="text-center w-full flex items-center justify-center">
						<Text
							variant="LongText/14px/SemiBold"
							className="text-grayscale-05! leading-relaxed"
						>
							پاداش شما به صورت روزانه قابل برداشت است.
						</Text>
					</div>
				</div>
			</div>
		</div>
	);
}
