'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import { ICON_BASE_URL } from '@/lib/constants';

export default function StatisticsSection() {
	const { statistics } = useTranslation();
	const { theme, mounted } = useTheme();

	// Theme-aware gradient colors
	const gradientStart = theme === 'dark' ? '#294BFF' : '#0F34F4';
	const gradientStop = theme === 'dark' ? '#1B2440' : '#F5F4F0';

	return (
		<Container className="py-12 md:py-16 lg:py-20">
			{/* Header */}
			<div className="mb-12 text-center flex flex-col items-center">
				{/* Tagline */}
				<div className="inline-flex items-center gap-2 px-4 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit mb-6">
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
							{statistics.tagline.prefix}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{statistics.tagline.highlight}
						</Text>
					</div>
				</div>

				{/* Title */}
				<div className="flex flex-col md:flex-row items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{statistics.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{statistics.title.highlight}
					</Text>
				</div>
			</div>

			{/* Statistics Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Right Column - Weekly Volume Card */}
				<div
					className={cn(
						'rounded-[36px] bg-grayscale-02 p-10 flex flex-col justify-between relative overflow-hidden z-10',
					)}
				>
					<Image
						src={`/assets/main/${theme === 'light' && mounted ? 'patterns2Light' : 'patterns2'}.svg`}
						width={300}
						height={300}
						alt="white pattern"
						className="absolute top-0 left-0 z-10"
					/>
					<div className="flex flex-col">
						<Text variant="Main/32px/Black" className="text-grayscale-07! mb-3">
							{statistics.weeklyVolume.value}
						</Text>
						<Text
							variant="Main/20px/Bold"
							gradient="primary"
							className="mb-3 w-fit"
						>
							{statistics.weeklyVolume.label}
						</Text>
						<Text
							variant="LongText/16px/Regular"
							className="text-grayscale-06! mb-10 leading-7"
						>
							{statistics.weeklyVolume.description}
						</Text>
					</div>

					{/* Graph Placeholder */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="297"
						height="137"
						viewBox="0 0 297 137"
						fill="none"
						className=" lg:hidden"
					>
						<path
							d="M2.5 134.5C9.13636 134.5 9.13636 114.832 15.7727 114.832C22.4091 114.832 22.4091 102.411 29.0455 102.411C35.6818 102.411 35.6818 107.586 42.3182 107.586C48.9545 107.586 48.9545 117.938 55.5909 117.938C62.2273 117.938 62.2273 95.1648 68.8636 95.1648C75.5 95.1648 75.5 73.427 82.1364 73.427C88.7727 73.427 88.7727 92.0856 95.4091 92.0856C102.045 92.0856 102.045 43.4109 108.682 43.4109C115.318 43.4109 115.318 74.4825 121.955 74.4825C128.591 74.4825 128.591 86.9422 135.227 86.9422C141.864 86.9422 141.864 103.169 148.5 103.169C155.136 103.169 155.136 74.8028 161.773 74.8028C168.409 74.8028 168.409 89.6174 175.045 89.6174C181.682 89.6174 181.682 53.9451 188.318 53.9451C194.955 53.9451 194.955 28.5478 201.591 28.5478C208.227 28.5478 208.227 46.5439 214.864 46.5439C221.5 46.5439 221.5 24.8061 228.136 24.8061C234.773 24.8061 234.773 32.3097 241.409 32.3097C248.045 32.3097 248.045 2.5 254.682 2.5C261.318 2.5 261.318 51.9036 267.955 51.9036C274.591 51.9036 274.591 63.9909 281.227 63.9909C287.864 63.9909 287.864 32.8544 294.5 32.8544"
							stroke="url(#paint0_linear_stats_mobile)"
							strokeWidth="5"
							strokeLinecap="round"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_stats_mobile"
								x1="294.5"
								y1="-10.2333"
								x2="14.0069"
								y2="-67.0438"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor={gradientStart} />
								<stop offset="1" stopColor={gradientStop} />
							</linearGradient>
						</defs>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="539"
						height="195"
						viewBox="0 0 539 195"
						fill="none"
						className="hidden lg:flex 2xl:hidden"
					>
						<path
							d="M2.5 192.5C14.6364 192.5 14.6364 164.191 26.7727 164.191C38.9091 164.191 38.9091 146.311 51.0454 146.311C63.1818 146.311 63.1818 153.761 75.3182 153.761C87.4545 153.761 87.4545 168.66 99.5909 168.66C111.727 168.66 111.727 135.881 123.864 135.881C136 135.881 136 104.592 148.136 104.592C160.273 104.592 160.273 131.449 172.409 131.449C184.545 131.449 184.545 61.387 196.682 61.387C208.818 61.387 208.818 106.111 220.955 106.111C233.091 106.111 233.091 124.046 245.227 124.046C257.364 124.046 257.364 147.402 269.5 147.402C281.636 147.402 281.636 106.572 293.773 106.572C305.909 106.572 305.909 127.896 318.045 127.896C330.182 127.896 330.182 76.5498 342.318 76.5498C354.455 76.5498 354.455 39.993 366.591 39.993C378.727 39.993 378.727 65.8965 390.864 65.8965C403 65.8965 403 34.6072 415.136 34.6072C427.273 34.6072 427.273 45.4079 439.409 45.4079C451.545 45.4079 451.545 2.5 463.682 2.5C475.818 2.5 475.818 73.6113 487.955 73.6113C500.091 73.6113 500.091 91.0096 512.227 91.0096C524.364 91.0096 524.364 46.1919 536.5 46.1919"
							stroke="url(#paint0_linear_stats_tablet)"
							strokeWidth="5"
							strokeLinecap="round"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_stats_tablet"
								x1="536.5"
								y1="-15.8282"
								x2="35.6649"
								y2="-144.706"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor={gradientStart} />
								<stop offset="1" stopColor={gradientStop} />
							</linearGradient>
						</defs>
					</svg>
					<svg
						className="hidden 2xl:flex"
						xmlns="http://www.w3.org/2000/svg"
						width="717"
						height="245"
						viewBox="0 0 717 245"
						fill="none"
					>
						<path
							d="M2.5 242.5C18.6818 242.5 18.6818 206.741 34.8636 206.741C51.0454 206.741 51.0454 184.156 67.2273 184.156C83.4091 184.156 83.4091 193.566 99.5909 193.566C115.773 193.566 115.773 212.387 131.955 212.387C148.136 212.387 148.136 170.981 164.318 170.981C180.5 170.981 180.5 131.458 196.682 131.458C212.864 131.458 212.864 165.383 229.045 165.383C245.227 165.383 245.227 76.8835 261.409 76.8835C277.591 76.8835 277.591 133.377 293.773 133.377C309.955 133.377 309.955 156.031 326.136 156.031C342.318 156.031 342.318 185.534 358.5 185.534C374.682 185.534 374.682 133.96 390.864 133.96C407.045 133.96 407.045 160.895 423.227 160.895C439.409 160.895 439.409 96.0366 455.591 96.0366C471.773 96.0366 471.773 49.8596 487.955 49.8596C504.136 49.8596 504.136 82.5798 520.318 82.5798C536.5 82.5798 536.5 43.0565 552.682 43.0565C568.864 43.0565 568.864 56.6995 585.045 56.6995C601.227 56.6995 601.227 2.5 617.409 2.5C633.591 2.5 633.591 92.3248 649.773 92.3248C665.955 92.3248 665.955 114.302 682.136 114.302C698.318 114.302 698.318 57.6898 714.5 57.6898"
							stroke="url(#paint0_linear_stats_desktop)"
							strokeWidth="5"
							strokeLinecap="round"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_stats_desktop"
								x1="714.5"
								y1="-20.6514"
								x2="51.4226"
								y2="-200.758"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor={gradientStart} />
								<stop offset="1" stopColor={gradientStop} />
							</linearGradient>
						</defs>
					</svg>
				</div>

				{/* Left Column */}
				<div className="flex flex-col gap-6">
					{/* Active Traders Card */}
					<div
						className={cn(
							'rounded-[36px] bg-grayscale-02 p-10 flex flex-col relative overflow-hidden z-10',
						)}
					>
						<Image
							src={`/assets/main/${theme === 'light' && mounted ? 'patterns2Light' : 'patterns2'}.svg`}
							width={300}
							height={300}
							alt="white pattern"
							className="absolute top-0 left-0 z-10"
						/>
						<Text variant="Main/32px/Black" className="text-grayscale-07! mb-3">
							{statistics.activeTraders.value}
						</Text>
						<Text
							variant="Main/20px/Bold"
							gradient="primary"
							className="mb-3 w-fit"
						>
							{statistics.activeTraders.label}
						</Text>
						<Text
							variant="LongText/16px/Regular"
							className="text-grayscale-06! mb-10 leading-7"
						>
							{statistics.activeTraders.description}
						</Text>
					</div>

					{/* Listed Cryptocurrencies Card */}
					<div
						className={cn(
							'rounded-[36px] bg-grayscale-02 p-10 flex flex-col relative overflow-hidden z-10',
						)}
					>
						<Image
							src={`/assets/main/${theme === 'light' && mounted ? 'patterns2Light' : 'patterns2'}.svg`}
							width={300}
							height={300}
							alt="white pattern"
							className="absolute top-0 left-0 z-10"
						/>
						<div className="flex flex-row items-center justify-between w-full mb-3 relative z-10">
							<Text variant="Main/32px/Black" className="text-grayscale-07!">
								{statistics.listedCryptos.value}
							</Text>

							{/* Crypto Icons */}
							<div className="flex items-center">
								{/* Placeholder for crypto icons - will be replaced with actual images */}
								<Image
									src={`${ICON_BASE_URL}/xrp_.svg`}
									alt={'XRP'}
									width={40}
									height={40}
									className="w-10 h-10 object-cover border border-grayscale-03 -ml-4 z-30 rounded-full"
								/>
								<Image
									src={`${ICON_BASE_URL}/btc_.svg`}
									alt={'BTC'}
									width={40}
									height={40}
									className="w-10 h-10 object-cover border border-grayscale-03 -ml-4 z-20 rounded-full"
								/>
								<Image
									src={`${ICON_BASE_URL}/eth_.svg`}
									alt={'ETH'}
									width={40}
									height={40}
									className="w-10 h-10 object-cover border border-grayscale-03 -ml-4 z-10 rounded-full"
								/>
								<Image
									src={`${ICON_BASE_URL}/usdt_.svg`}
									alt={'USDT'}
									width={40}
									height={40}
									className="w-10 h-10 object-cover border border-grayscale-03 -ml-4 rounded-full z-0"
								/>
							</div>
						</div>
						<Text
							variant="Main/20px/Bold"
							gradient="primary"
							className="mb-3 w-fit"
						>
							{statistics.listedCryptos.label}
						</Text>
						<Text
							variant="LongText/16px/Regular"
							className="text-grayscale-06! mb-10 leading-7"
						>
							{statistics.listedCryptos.description}
						</Text>
					</div>
				</div>
			</div>
		</Container>
	);
}
