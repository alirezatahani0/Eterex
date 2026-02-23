'use client';

import { useState, useMemo, useEffect } from 'react';
import Text from '@/components/UI/Text';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useStakingQuery } from '@/hooks/useStakingQuery';
import { useConfigsQuery } from '@/hooks/useConfigsQuery';
import { useTheme } from '@/hooks/useTheme';
import { useAssetsPriceListQuery } from '@/hooks/useAssetsQuery';
import { ICON_BASE_URL } from '@/lib/constants';

export default function StakingCalculator() {
	const [selectedCoin, setSelectedCoin] = useState<string>('');
	const [amount, setAmount] = useState('1000');
	const [selectedDays, setSelectedDays] = useState(30);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const { theme, mounted } = useTheme();
	const { data: stakingPlans = [] } = useStakingQuery();
	const { data: configs } = useConfigsQuery();
	const { data: pricesData = [] } = useAssetsPriceListQuery();

	const activePlans = stakingPlans.filter((p) => p.status === 'Active');

	// Only 365-day plans; if multiple per asset, take the one with higher dailyPercent
	const plans365 = useMemo(() => {
		const with365 = activePlans.filter(
			(p) => Number(p.activeDays) === 365 || parseInt(p.activeDays, 10) === 365,
		);
		const byAsset = new Map<string, (typeof activePlans)[0]>();
		for (const p of with365) {
			const key = p.asset.toUpperCase();
			const existing = byAsset.get(key);
			const daily = parseFloat(p.dailyPercent) || 0;
			if (!existing || daily > (parseFloat(existing.dailyPercent) || 0)) {
				byAsset.set(key, p);
			}
		}
		return Array.from(byAsset.values());
	}, [activePlans]);

	const coins = useMemo(() => {
		return plans365.map((p) => ({
			symbol: p.asset.toUpperCase(),
			icon: `${p.asset.toLowerCase()}_.svg`,
			dailyPercent: parseFloat(p.dailyPercent) || 0,
		}));
	}, [plans365]);

	const defaultCoin = coins[0]?.symbol ?? 'USDT';
	const effectiveCoin = selectedCoin || defaultCoin;

	const selectedCoinData = coins.find((c) => c.symbol === effectiveCoin);

	const days = [30, 90, 180, 365];

	const effectiveDaysForPlan =
		days.length > 0 && days.includes(selectedDays)
			? selectedDays
			: (days[0] ?? 30);

	const matchingPlan = useMemo(() => {
		return (
			plans365.find((p) => p.asset.toUpperCase() === effectiveCoin) ?? null
		);
	}, [plans365, effectiveCoin]);

	const dailyPercent = matchingPlan
		? parseFloat(matchingPlan.dailyPercent) || 0
		: (selectedCoinData?.dailyPercent ?? 0);

	const amountNum = parseFloat(amount) || 0;

	// پاداش پیش‌بینی‌شده: amount * (dailyPercent/100) * days
	const totalReturn = amountNum * (dailyPercent / 100) * effectiveDaysForPlan;

	const irtUsdt = useMemo(() => {
		if (!configs?.priceGroups?.length) return 0;
		const usdtGroup = configs.priceGroups.find((g) =>
			g.coins.some((c) => c.toUpperCase() === 'USDT'),
		);
		return (
			usdtGroup?.prices.irtUsdt ?? configs.priceGroups[0]?.prices.irtUsdt ?? 0
		);
	}, [configs]);

	const assetPriceInUsdt = useMemo(() => {
		if (effectiveCoin === 'USDT') return 1;
		const pair = pricesData.find(
			(p) =>
				p.symbol.toUpperCase() === `${effectiveCoin}USDT` && p.type === 'sell',
		);
		return pair ? parseFloat(pair.price) : 0;
	}, [pricesData, effectiveCoin]);

	const totalReturnIRT = totalReturn * assetPriceInUsdt * irtUsdt;

	const formatNumberWithCommas = (value: string | number): string => {
		if (value === '' || value === null || value === undefined) return '';
		const numStr = String(value);
		const endsWithDot = numStr.trim().endsWith('.');
		const cleaned = numStr.replace(/[^\d.]/g, '');
		if (!cleaned) return '';
		if (cleaned === '.') return '0.';
		const parts = cleaned.split('.');
		let integerPart = parts[0] || '';
		const decimalPart = parts[1] || '';
		if (!integerPart && (decimalPart || endsWithDot)) integerPart = '0';
		const formattedInteger = integerPart
			? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			: '0';
		if (decimalPart || endsWithDot) return `${formattedInteger}.${decimalPart}`;
		return formattedInteger;
	};

	useEffect(() => {
		if (!selectedCoin && coins.length > 0) {
			setTimeout(() => {
				setSelectedCoin(coins[0].symbol);
			}, 0);
		}
	}, [coins, selectedCoin]);

	const displayDays = days;
	const displaySelectedDays = days.includes(selectedDays)
		? selectedDays
		: days[0];

	return (
		<div
			className="relative w-full flex flex-col overflow-hidden lg:flex-row-reverse justify-center lg:justify-between items-center gap-6 p-4 md:p-6 self-stretch rounded-[36px] border-2 border-grayscale-03 lg:container lg:m-auto"
			style={{
				background:
					'linear-gradient(180deg, var(--grayscale-01-blur-0) 50%, var(--glass-white-12) 100%)',
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
				src={
					mounted && theme === 'light'
						? '/assets/staking/calculatorPatternsLight.svg'
						: '/assets/staking/calculatorPatterns.svg'
				}
				width={200}
				height={200}
				alt="pattern"
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

			<div className="flex flex-col justify-center items-center lg:items-start gap-6 lg:w-2/3 w-full relative z-30">
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
							inputMode="decimal"
							value={formatNumberWithCommas(amount)}
							onChange={(e) => {
								const value = e.target.value;
								const cleaned = value.replace(/[^\d.]/g, '');
								if (cleaned === '') {
									setAmount('');
									return;
								}
								const parts = cleaned.split('.');
								let rawValue =
									parts.length > 2
										? `${parts[0]}.${parts.slice(1).join('')}`
										: cleaned;
								if (rawValue.includes('.')) {
									const [integerPart, decimalPart] = rawValue.split('.');
									if (decimalPart && decimalPart.length > 8) {
										rawValue = `${integerPart}.${decimalPart.slice(0, 8)}`;
									}
								}
								setAmount(rawValue);
							}}
							className="w-full h-15 px-2  pr-4 bg-glass-white-1 rounded-[40px] border border-grayscale-03 text-grayscale-07 text-xl font-semibold text-center focus:outline-none focus:border-brand-primary"
							placeholder="1000"
						/>
						<div className="absolute top-2 left-1.5 z-10 ">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="h-11 min-w-28 px-2 bg-glass-gray-11 backdrop-blur-xl rounded-[40px] flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden">
										<Image
											src={`${ICON_BASE_URL}/${selectedCoinData?.icon || `${effectiveCoin.toLowerCase()}_.svg`}`}
											alt={effectiveCoin}
											width={32}
											height={32}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex items-center justify-center gap-1 overflow-hidden">
										<Text
											variant="Main/16px/Regular"
											className="text-grayscale-07!"
										>
											{effectiveCoin}
										</Text>
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
									</div>
								</div>
							</button>

							{/* Dropdown */}
							{isDropdownOpen && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 overflow-hidden z-10">
									{coins.length === 0 ? (
										<div className="px-6 py-4">
											<Text
												variant="LongText/14px/Regular"
												className="text-grayscale-05"
											>
												در حال بارگذاری...
											</Text>
										</div>
									) : (
										coins.map((coin) => (
											<button
												key={coin.symbol}
												onClick={() => {
													setSelectedCoin(coin.symbol);
													setIsDropdownOpen(false);
												}}
												className="w-full px-3 py-3 flex items-center justify-between gap-3 hover:bg-grayscale-03 transition-colors"
											>
												<div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden">
													<Image
														src={`${ICON_BASE_URL}/${coin.icon}`}
														alt={coin.symbol}
														width={32}
														height={32}
														className="w-full h-full object-cover min-w-8 min-h-8"
													/>
												</div>
												<Text
													variant="Main/16px/Regular"
													className="text-grayscale-07!"
												>
													{coin.symbol}
												</Text>
											</button>
										))
									)}
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
						{displayDays.map((day) => (
							<button
								key={day}
								onClick={() => setSelectedDays(day)}
								className={cn(
									'w-13 h-11 rounded-4xl transition-all flex items-center justify-center',
									displaySelectedDays === day
										? 'bg-brand-primary-container'
										: '',
								)}
							>
								<Text
									variant="Main/14px/SemiBold"
									className={cn(
										displaySelectedDays === day
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
							'linear-gradient(180deg, var(--grayscale-01-blur-0) 50%, var(--glass-white-12) 100%), var(--grayscale-02);',
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
								{Number(totalReturn.toFixed(2)).toLocaleString()}
							</Text>
							<Text
								variant="Main/16px/Regular"
								className="text-grayscale-07! font-semibold"
							>
								{effectiveCoin}
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
								{effectiveCoin === 'IRT'
									? Number(totalReturn.toFixed(2)).toLocaleString()
									: Number(totalReturnIRT.toFixed(0)).toLocaleString('en-US')}
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
