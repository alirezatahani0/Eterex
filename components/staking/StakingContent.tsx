'use client';

import { useState, useEffect } from 'react';
import Text from '@/components/UI/Text';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import StakingCalculator from './StakingCalculator';
import { Autoplay } from 'swiper/modules';
import { Timeline } from 'primereact/timeline';
import { PrimeReactProvider } from 'primereact/api';
import { DownloadSection } from '../UI/DownloadSection';
import { useStakingQuery } from '@/hooks/useStakingQuery';
import { useStakingOveralDetailQuery } from '@/hooks/useStakingOveralDetailQuery';
import { useTheme } from '@/hooks/useTheme';
import type { StakingPlan } from '@/types/api';
import type { StakingOveralDetailItem } from '@/types/api';
import { ICON_BASE_URL } from '@/lib/constants';

const FEATURES = [
	{
		id: 1,
		desc: 'بدون پیچیدگی‌های اضافی، می‌توانید به راحتی استیکینگ را آغاز کنید و به سود ماهانه برسید.',
		name: 'آسان‌ترین راه استیکینگ',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<path
					d="M37.4848 25.3806C39.2924 30.2602 37.5138 36.717 34.3462 39.8846C30.3044 43.9264 19.0091 44.2336 15.3112 39.635C12.9645 36.717 11.1406 33.1754 9.99093 30.002C9.37431 28.3 10.2791 26.4646 11.9693 25.8164C13.4654 25.2424 15.1599 25.7676 16.0692 27.087L18.3401 30.3816V12.1742C18.3401 10.4211 19.7612 9 21.5142 9C23.2482 9 24.6614 10.3916 24.688 12.1254L24.8142 20.3374C29.2564 20.7616 35.6886 20.5324 37.4848 25.3806Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M18.0347 19C15.8603 17.721 14.3906 15.2779 14.3906 12.4742C14.3906 8.34632 17.5765 5 21.5064 5C25.4364 5 28.6224 8.34632 28.6224 12.4742C28.6224 15.2332 27.1992 17.643 25.0818 18.9379"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		id: 2,
		desc: 'با استفاده از بهترین ارزهای دیجیتال برای استیکینگ، بهترین نرخ سود ماهانه از ارزهای دیجیتال معتبر را دریافت کنید.',
		name: 'بالاترین بازدهی',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<path
					d="M37.8984 10.1003L40.9986 7"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M7 41.0001L10.1001 37.8999"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10.1001 10.1003L7 7"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M40.9986 41.0001L37.8984 37.8999"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M24.0039 9.30859L27.9719 20.032L38.6953 24L27.9719 27.968L24.0039 38.6914L20.0359 27.968L9.3125 24L20.0359 20.032L24.0039 9.30859Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		id: 3,
		desc: 'صرافی ارز دیجیتال اتراکس با استفاده از بالاترین استانداردهای امنیتی، آرامش و اعتماد برای شما در جهت حفظ سرمایه‌های شما فراهم می‌کند.',
		name: 'پلتفرم امن و معتبر',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<path
					d="M11.7817 11.7814L14.2701 14.2716M23.9987 6.72021V10.2396M41.2787 24.0002H37.7594M23.9987 41.2802V37.759M6.71875 24.0002H10.24M36.2195 11.7814L33.7293 14.2716M11.7817 36.2191L14.2701 33.7289M36.2195 36.2191L33.7293 33.7289"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M41.2787 24.0002C41.2787 14.4559 33.5431 6.72021 23.9987 6.72021C14.4544 6.72021 6.71875 14.4559 6.71875 24.0002C6.71875 33.5446 14.4544 41.2802 23.9987 41.2802C33.5431 41.2802 41.2787 33.5446 41.2787 24.0002Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M24.006 17.0928C27.8191 17.0928 30.9103 20.1839 30.9103 23.997C30.9103 27.8101 27.8191 30.9015 24.006 30.9015C20.1929 30.9015 17.1016 27.8101 17.1016 23.997C17.1016 20.1839 20.1929 17.0928 24.006 17.0928Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M24.3672 23.4164L28.7486 19.0352"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		id: 4,
		desc: 'تیم پشتیبانی آنلاین ما در ۲۴ ساعت شبانه‌روز آماده پاسخگویی به سوالات شما است.',
		name: 'پشتیبانی 24/7',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.9946 34.947C11.9851 36.6634 14.1802 37.253 15.8965 36.2606C17.6089 35.27 18.1966 33.079 17.208 31.3626L14.1938 26.1416C13.2052 24.4272 11.0122 23.8396 9.29777 24.8262L8.87549 25.0694C7.79939 25.6902 7.25451 26.9686 7.62231 28.1556C8.27809 30.271 9.39701 32.5476 10.9946 34.947Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M37.0215 34.947C36.0309 36.6634 33.8359 37.253 32.1197 36.2606C30.4071 35.27 29.8195 33.079 30.8081 31.3626L33.8223 26.1416C34.8109 24.4272 37.0039 23.8396 38.7183 24.8262L39.1407 25.0694C40.2167 25.6902 40.7615 26.9686 40.3937 28.1556C39.7381 30.271 38.6191 32.5476 37.0215 34.947Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M22.7344 41.9477C27.3268 41.9477 30.5824 42.8895 33.873 36.7383"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M39.674 30.0734C40.6158 27.9542 41.145 25.5996 41.145 23.1282C41.145 13.667 33.4644 6 24.0032 6C14.5557 6 6.875 13.667 6.875 23.1282C6.875 25.2766 7.27198 27.3354 7.99392 29.221"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

const ROTATE_INTERVAL_MS = 5000;

function formatStatValue(value: string): string {
	const num = parseFloat(value);
	if (Number.isNaN(num)) return '—';
	return num.toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
}

export default function StakingContent() {
	const { data: overalDetails = [], isLoading: isLoadingOveral } =
		useStakingOveralDetailQuery();
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentItem: StakingOveralDetailItem | null =
		overalDetails.length > 0 ? overalDetails[currentIndex % overalDetails.length]! : null;

	// Rotate to next asset every 5 seconds
	useEffect(() => {
		if (overalDetails.length <= 1) return;
		const id = setInterval(() => {
			setCurrentIndex((i) => (i + 1) % overalDetails.length);
		}, ROTATE_INTERVAL_MS);
		return () => clearInterval(id);
	}, [overalDetails.length]);

	return (
		<div>
			{/* Header Section */}
			<div
				className={cn(
					'text-center pt-14 md:pt-22 relative z-10 w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end lg:container lg:m-auto lg:my-10 lg:rounded-3xl lg:border-2 lg:border-grayscale-03 lg:items-start lg:p-24',
					"bg-[url('/assets/staking/bg-SM.avif')] md:bg-[url('/assets/staking/bg-MD.avif')] lg:bg-[url('/assets/staking/bg-LG.avif')] 2xl:bg-[url('/assets/staking/bg-XL.avif')]",
				)}
			>
				{/* Tagline */}
				<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit mb-8">
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
							سود روزشمار واقعی با
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							استیکینگ
						</Text>
					</div>
				</div>

				{/* Subtitle */}
				<div className="text-center flex flex-col md:flex-row gap-2 items-center mb-10">
					<Text variant="Main/32px/Black" className="text-grayscale-07!">
						از خواب سرمایه‌ت هم
					</Text>
					<Text variant="Main/32px/Black" gradient="gold">
						سود بگیر!
					</Text>
				</div>
				<div className="px-7 md:px-16 text-center mb-8 lg:px-0  xl:max-w-[50%]">
					<Text variant="LongText/14px/Regular" className="text-grayscale-06!">
						با استیکینگ دارایی رمزارزی یا موجودی تومانی خود در صرافی اتراکس،
						بسته به طرح انتخابی{' '}
					</Text>
					<Text variant="LongText/14px/SemiBold" className="text-grayscale-07!">
						سود روزانه پایدار تا بیش از ۴۰٪
					</Text>
					<Text variant="LongText/14px/Regular" className="text-grayscale-06!">
						{' '}
						دریافت کنید.{' '}
					</Text>
				</div>
				<div className="px-7 md:px-16 flex items-center gap-2 mb-13 lg:hidden">
					<button
						aria-label="ثبت نام"
						className="h-14 w-40 rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
					>
						<Text variant="Main/14px/Bold" color="text-white!">
							ثبت نام
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
					<button
						aria-label="محاسبه بازدهی استیکینگ"
						className="flex h-14 w-50 rounded-[40px] bg-brand-primary-container hover:bg-[rgba(15,91,244,0.12)] transition-colors flex-row items-center justify-center gap-2"
					>
						<Text variant="Main/14px/Bold" color="text-grayscale-07!">
							محاسبه بازدهی استیکینگ{' '}
						</Text>
					</button>
				</div>
				<Image
					src="/assets/staking/money.avif"
					width={1200}
					height={220}
					alt="Hero Image"
					className="object-cover w-full lg:hidden"
				/>
				<div className="hidden lg:flex flex-row items-start justify-between relative w-full mb-54 xl:mb-30">
					<div className="flex items-center gap-2 w-full">
						<button
							aria-label="ثبت نام"
							className="h-14 w-40 rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
						>
							<Text variant="Main/14px/Bold" color="text-white!">
								ثبت نام
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
						<button
							aria-label="محاسبه بازدهی استیکینگ"
							className="flex h-14 w-50 rounded-[40px] bg-brand-primary-container hover:bg-[rgba(15,91,244,0.12)] transition-colors flex-row items-center justify-center gap-2"
						>
							<Text variant="Main/14px/Bold" color="text-grayscale-07!">
								محاسبه بازدهی استیکینگ{' '}
							</Text>
						</button>
					</div>
					<Image
						src="/assets/staking/money.avif"
						width={600}
						height={220}
						alt="Hero Image"
						className="object-cover absolute -left-12 xl:w-[800px] xl:-top-44"
					/>
				</div>
			</div>
			{/* Statistics Section - from API Staking/overal/detail, rotates per asset every 5s */}
			<div className="p-8 bg-grayscale-01 border-2 border-grayscale-03 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:w-[75%] xl:w-[55%] lg:m-auto lg:rounded-4xl lg:-mt-24 lg:relative lg:z-30 ">
				<div className="flex flex-col gap-4 items-center justify-between">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
						استیک‌های فعال {currentItem ? `(${currentItem.assetSymbol})` : ''}
					</Text>
					<Text variant="Main/24px/Bold" className="text-grayscale-07!">
						{currentItem
							? formatStatValue(currentItem.activeStaksCount)
							: isLoadingOveral
								? '...'
								: '—'}
					</Text>
				</div>
				<div className="flex flex-col gap-4 items-center justify-between">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
						دوره‌های تکمیل‌شده {currentItem ? `(${currentItem.assetSymbol})` : ''}
					</Text>
					<Text variant="Main/24px/Bold" className="text-grayscale-07!">
						{currentItem
							? formatStatValue(currentItem.allStaksCount)
							: isLoadingOveral
								? '...'
								: '—'}
					</Text>
				</div>
				<div className="flex flex-col gap-4 items-center justify-between">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
						مجموع سود پرداخت‌شده{' '}
					</Text>
					<div className="flex flex-row items-center gap-2">
						<Text
							variant="Main/14px/SemiBold"
							className="text-brand-secondary-variant!"
						>
							{currentItem ? currentItem.assetSymbol : '—'}
						</Text>
						<Text
							variant="Main/24px/Bold"
							className="text-brand-secondary-variant!"
						>
							{currentItem
								? formatStatValue(currentItem.allStaksProfitAmount)
								: isLoadingOveral
									? '...'
									: '—'}
						</Text>
					</div>
				</div>
				<div className="flex flex-col gap-4 items-center justify-between">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
						مجموع دارایی قفل‌شده{' '}
					</Text>
					<div className="flex flex-row items-center gap-2">
						<Text variant="Main/14px/SemiBold" className="text-brand-primary!">
							{currentItem ? currentItem.assetSymbol : '—'}
						</Text>
						<Text variant="Main/24px/Bold" className="text-brand-primary!">
							{currentItem
								? formatStatValue(currentItem.allStaksAmount)
								: isLoadingOveral
									? '...'
									: '—'}
						</Text>
					</div>
				</div>
			</div>

			<section className="flex flex-col pt-30 gap-10 items-center justify-start">
				{/* Tagline */}
				<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							دنیای اتراکس، انتخابی{' '}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							مطمئن
						</Text>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center lg:flex-row lg:gap-2">
					<Text
						variant="Main/24px/Bold"
						className="text-grayscale-07! lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						استیکینگ در اتراکس،
					</Text>
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						راه مطمئن سود روزانه
					</Text>
				</div>
				<StakingCards />
			</section>

			<section className="flex flex-col pt-30 gap-10 items-center justify-start">
				{/* Tagline */}
				<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							برترین{' '}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							خدمات
						</Text>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							معاملاتی{' '}
						</Text>
					</div>
				</div>

				<div className="px-6 w-full">
					<StakingCalculator />
				</div>
			</section>

			<section className="flex flex-col pt-30 gap-10 items-center justify-start">
				{/* Tagline */}
				<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							دنیای اتراکس، انتخابی{' '}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							مطمئن
						</Text>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center mb-14 gap-2">
					<Text
						variant="Main/24px/Bold"
						className="text-grayscale-07! lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						فهرست ارزهای{' '}
					</Text>
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						قابل استیک در اتراکس{' '}
					</Text>
				</div>
				{/* 8 Coin Cards - Swiper on mobile/tablet, Grid on desktop */}
				<FeaturedCoinsSection />
			</section>

			<section className="flex flex-col pt-30 gap-10 items-center justify-start">
				{/* Tagline */}
				<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							ویژگی‌های
						</Text>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							استیکینگ در اتراکس{' '}
						</Text>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center mb-14 gap-2">
					<Text
						variant="Main/24px/Bold"
						className="text-grayscale-07! lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						ویژگی‌های استیکینگ
					</Text>
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
					>
						در اتراکس
					</Text>
				</div>
				<div className="w-full p-6 bg-brand-primary lg:rounded-4xl lg:container relative overflow-hidden">
					{/* Mobile & Tablet: Ticker with coin cards */}
					<Image
						src="/assets/staking/patternWhite.svg"
						width={200}
						height={200}
						alt="white pattern"
						className="absolute top-0 left-0"
					/>
					<Image
						src="/assets/staking/patternWhite.svg"
						width={200}
						height={200}
						alt="white pattern"
						className="absolute bottom-0 right-0 rotate-180"
					/>
					<div className="block lg:hidden w-full space-x-4 ">
						<Swiper
							spaceBetween={18}
							slidesPerView={1.2}
							effect={'coverflow'}
							grabCursor={true}
							centeredSlides={true}
							loop
							initialSlide={1}
							pagination={{ clickable: true }}
							breakpoints={{
								640: {
									slidesPerView: 1.8,
									initialSlide: 1,
								},
								1024: {
									slidesPerView: 3.5,
								},
							}}
							coverflowEffect={{
								rotate: 0,
								stretch: 0,
								depth: 0,
								modifier: 1,
								slideShadows: false,
							}}
							autoplay={{
								delay: 1500,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
								reverseDirection: false,
							}}
							modules={[Autoplay]}
						>
							{FEATURES.map((card) => (
								<SwiperSlide key={card.id}>
									<FeatureCard {...card} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Desktop: Grid of all 8 */}
					<div className="hidden lg:grid grid-cols-4 gap-6">
						{FEATURES.map((coin) => (
							<FeatureCard key={coin.id} {...coin} />
						))}
					</div>
				</div>
			</section>

			<section className="flex flex-col pt-30 gap-10 px-6 items-center justify-start">
				<PrimeReactProvider>
					{/* Tagline */}
					<div className="px-4 inline-flex items-center gap-2 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							<Text variant="Main/14px/Bold" className="text-grayscale-07!">
								راهنمای
							</Text>
							<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
								شروع
							</Text>
						</div>
					</div>
					<div className="flex flex-row items-center justify-center mb-14 gap-1">
						<Text
							variant="Main/24px/Bold"
							className="text-grayscale-07! lg:font-bold lg:text-[32px] lg:leading-[48px]"
						>
							چگونه
						</Text>
						<Text
							variant="Main/24px/Bold"
							gradient="primary"
							className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
						>
							استیک کنیم؟
						</Text>
					</div>
					<div className="hidden lg:block w-full lg:container lg:m-auto">
						<Timeline
							align="alternate"
							value={[
								{
									name: 'مرحله یک: ثبت نام در اتراکس',
									description:
										'اولین گام برای استیکینگ ارزهای دیجیتال، ثبت نام در صرافی اتراکس است',
								},
								{
									name: 'مرحله دو: مقایسه و انتخاب طرح',
									description:
										'می‌توانید انواع ارزهای دیجیتال مناسب برای استیکینگ را در طرح‌ها و بازدهی‌های زمانی مختلف انتخاب کنید.',
								},
								{
									name: 'مرحله سه: شروع استیکینگ',
									description:
										'با تائید قرارداد استیکنیگ بسته به طرح انتخابی سود روزشمار برای شما فعال خواهد شد',
								},
								{
									name: 'مرحله چهار: دریافت سود روزانه',
									description:
										'هر ۲۴ ساعت سود تحقق یافته شما به صورت کامل قابل دریافت و برداشت خواهد بود',
								},
							]}
							className="timeline-container"
							content={(item: { name: string; description: string }) => (
								<div
									className="rounded-[28px] border border-grayscale-03 flex flex-col justify-center items-start gap-4 p-7 flex-[1_0_0] mb-6"
									style={{
										background: `
								linear-gradient(104deg, var(--grayscale-01-blur-0) 0%, var(--brand-primary-container) 100%),
								linear-gradient(105deg, var(--grayscale-02) 0%, var(--grayscale-01-blur-0) 100%),
								linear-gradient(180deg, var(--grayscale-01-blur-0) 50%, var(--glass-white-12) 100%)
							  `,
									}}
								>
									<Text
										variant="Main/16px/Regular"
										className="text-grayscale-07! font-bold "
									>
										{item.name}
									</Text>
									<Text
										variant="LongText/14px/Regular"
										className="text-grayscale-06!"
									>
										{item.description}
									</Text>
								</div>
							)}
							marker={(item, index) => (
								<Text
									variant="Main/20px/Bold"
									gradient="primary"
									className="p-timeline-event-marker"
								>
									{index + 1}
								</Text>
							)}
						/>
					</div>
					<div className="lg:hidden ">
						<Timeline
							align="left"
							value={[
								{
									name: 'مرحله یک: ثبت نام در اتراکس',
									description:
										'اولین گام برای استیکینگ ارزهای دیجیتال، ثبت نام در صرافی اتراکس است',
								},
								{
									name: 'مرحله دو: مقایسه و انتخاب طرح',
									description:
										'می‌توانید انواع ارزهای دیجیتال مناسب برای استیکینگ را در طرح‌ها و بازدهی‌های زمانی مختلف انتخاب کنید.',
								},
								{
									name: 'مرحله سه: شروع استیکینگ',
									description:
										'با تائید قرارداد استیکنیگ بسته به طرح انتخابی سود روزشمار برای شما فعال خواهد شد',
								},
								{
									name: 'مرحله چهار: دریافت سود روزانه',
									description:
										'هر ۲۴ ساعت سود تحقق یافته شما به صورت کامل قابل دریافت و برداشت خواهد بود',
								},
							]}
							className="timeline-container"
							content={(item: { name: string; description: string }) => (
								<div
									className="rounded-[28px] border border-grayscale-03 flex flex-col justify-center items-start gap-4 p-7 flex-[1_0_0] mb-6"
									style={{
										background: `
								linear-gradient(104deg, var(--grayscale-01-blur-0) 0%, var(--brand-primary-container) 100%),
								linear-gradient(105deg, var(--grayscale-02) 0%, var(--grayscale-01-blur-0) 100%),
								linear-gradient(180deg, var(--grayscale-01-blur-0) 50%, var(--glass-white-12) 100%)
							  `,
									}}
								>
									<Text
										variant="Main/16px/Regular"
										className="text-grayscale-07! font-bold "
									>
										{item.name}
									</Text>
									<Text
										variant="LongText/14px/Regular"
										className="text-grayscale-06!"
									>
										{item.description}
									</Text>
								</div>
							)}
							marker={(item, index) => (
								<Text
									variant="Main/20px/Bold"
									gradient="primary"
									className="p-timeline-event-marker"
								>
									{index + 1}
								</Text>
							)}
						/>
					</div>
					<div className="w-full flex items-center justify-end lg:container lg:m-auto">
						<button
							aria-label="ثبت نام"
							className="h-14 w-40 rounded-[40px] bg-brand-primary transition-colors flex flex-row items-center justify-center gap-2"
						>
							<Text variant="Main/14px/Bold" color="text-white!">
								شروع کنیم{' '}
							</Text>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M18.3532 15.2422L3.65625 6.75684M3.65625 6.75684L5.38171 13.1964M3.65625 6.75684L10.0958 5.03137"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</PrimeReactProvider>
			</section>

			<section className="flex flex-col pt-30 px-6 gap-10 items-start justify-start lg:container lg:m-auto">
				<Text
					variant="Main/24px/Bold"
					gradient="primary"
					className="lg:font-bold lg:text-[32px] lg:leading-[48px]"
				>
					انواع طرح‌های استیکینگ تتر
				</Text>
				<Text variant="LongText/16px/Regular" className="text-grayscale-06!">
					در صرافی اتراکس، کاربران برای استیکینگ تتر می‌توانند پس از تعیین مقدار
					موردنظر، یکی از طرح‌های زمانی یک‌ماهه، سه‌ماهه، شش‌ماهه یا یک‌ساله را
					انتخاب کنند. مطابق اطلاعات درج‌شده در صفحه استیکینگ ارز دیجیتال، حداقل
					مبلغ استیکینگ ۱۰ USDT است و نرخ سود سالیانه (APR) به‌صورت تضمینی ۱۵٪
					در نظر گرفته شده است. همچنین امکان لغو طرح بر اساس قوانین اعلام‌شده
					برای کاربران فعال است.
				</Text>
				<Text variant="LongText/16px/Regular" className="text-grayscale-06!">
					یکی از مزیت‌های مهم استیکینگ تتر در اتراکس این است که سود به‌صورت
					روزشمار محاسبه می‌شود و قابلیت دریافت روزانه دارد؛ بنابراین، سودی که
					هر روز به دارایی شما تعلق می‌گیرد، قابل برداشت خواهد بود.
				</Text>
				<Text variant="LongText/16px/Regular" className="text-grayscale-06!">
					در جدول زیر، نمای کلی پلن‌های فعال استیکینگ تتر در اتراکس ارائه شده
					است. ارقام سود تقریبی بوده و بر مبنای استیک ۱۰۰ USDT با APR سالیانه
					۱۵٪ و همچنین زمان تسویه هر پلن پس از پایان دوره محاسبه شده‌اند:
				</Text>
			</section>

			<section className="px-6 lg:container lg:m-auto">
				<DownloadSection />
			</section>
		</div>
	);
}
// استیکینگ‌های فعال: فقط این چهار دارایی دکمه «شروع استیکینگ» دارند؛ بقیه «به زودی»
const ACTIVE_STAKING_SYMBOLS = new Set(['USDT', 'TRX', 'PAXG', 'IRT']);

// لیست کوین‌های بخش featured: اول چهار تای فعال، بعد بقیه (به زودی)
const FEATURED_COINS = [
	{ id: 1, symbol: 'USDT', name: 'تتر', icon: 'usdt_.svg' },
	{ id: 2, symbol: 'TRX', name: 'ترون', icon: 'trx_.svg' },
	{ id: 3, symbol: 'PAXG', name: 'پکس‌گلد', icon: 'paxg_.svg' },
	{ id: 4, symbol: 'IRT', name: 'ریال', icon: 'irt_.svg' },
	{ id: 5, symbol: 'BTC', name: 'بیت‌کوین', icon: 'btc_.svg' },
	{ id: 6, symbol: 'ETH', name: 'اتریوم', icon: 'eth_.svg' },
	{ id: 7, symbol: 'BNB', name: 'بایننس کوین', icon: 'bnb_.svg' },
	{ id: 8, symbol: 'XRP', name: 'ریپل', icon: 'xrp_.svg' },
];

const FeaturedCoinsSection = () => {
	const featuredCoinsWithAvailability = FEATURED_COINS.map((coin) => ({
		...coin,
		isAvailable: ACTIVE_STAKING_SYMBOLS.has(coin.symbol),
	}));

	return (
		<div className="w-full px-4 md:px-8">
			{/* Mobile & Tablet: Ticker with coin cards */}
			<div className="block lg:hidden w-full space-y-4 ">
				<Swiper
					spaceBetween={18}
					slidesPerView={1.5}
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					loop
					initialSlide={1}
					pagination={{ clickable: true }}
					breakpoints={{
						640: {
							slidesPerView: 2.2,
							initialSlide: 1,
						},
						1024: {
							slidesPerView: 3.5,
						},
					}}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 0,
						modifier: 1,
						slideShadows: false,
					}}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
						reverseDirection: false,
					}}
					modules={[Autoplay]}
				>
					{featuredCoinsWithAvailability.map((card) => (
						<SwiperSlide key={card.id}>
							<FeaturedCoinCard {...card} />
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					spaceBetween={18}
					slidesPerView={1.5}
					effect={'coverflow'}
					grabCursor={true}
					loop
					initialSlide={1}
					pagination={{ clickable: true }}
					breakpoints={{
						640: {
							slidesPerView: 2.2,
							initialSlide: 1,
						},
						1024: {
							slidesPerView: 3.5,
						},
					}}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 0,
						modifier: 1,
						slideShadows: false,
					}}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
						reverseDirection: true,
					}}
					modules={[Autoplay]}
				>
					{featuredCoinsWithAvailability.map((card) => (
						<SwiperSlide key={card.id}>
							<FeaturedCoinCard {...card} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Desktop: Grid of all 8 */}
			<div className="hidden lg:grid grid-cols-4 gap-6 lg:container lg:m-auto">
				{featuredCoinsWithAvailability.map((coin) => (
					<FeaturedCoinCard key={coin.id} {...coin} />
				))}
			</div>
		</div>
	);
};

export const FeaturedCoinCard = ({
	symbol,
	name,
	icon,
	isAvailable = true,
}: {
	symbol: string;
	name: string;
	icon: string;
	isAvailable?: boolean;
}) => {
	const { theme, mounted } = useTheme();
	return (
		<div className="relative overflow-hidden w-full p-6 bg-grayscale-02 rounded-4xl flex flex-col items-center gap-6 min-h-[140px] justify-center ml-6">
			<Image
				src={
					mounted && theme === 'light'
						? '/assets/staking/patternsCoinsListLight.svg'
						: '/assets/staking/patternsCoinsList.svg'
				}
				width={200}
				height={200}
				alt="pattern"
				className="absolute top-0 left-0 z-10"
			/>
			<Image
				src={`${ICON_BASE_URL}/${icon}`}
				alt={symbol}
				width={52}
				height={52}
				className="w-13 h-13 rounded-full object-cover z-10"
				onError={(e) => {
					e.currentTarget.style.display = 'none';
				}}
			/>
			<div className="flex flex-col items-center justify-center gap-2 relative z-10">
				<Text variant="Main/20px/Bold" className="text-grayscale-07!">
					استیکینگ {name}
				</Text>
				<Text variant="Main/14px/SemiBold" className="text-grayscale-06!">
					{symbol} Staking
				</Text>
			</div>
			{isAvailable ? (
				<button className="h-14 px-6 bg-brand-primary-container rounded-4xl flex items-center justify-center relative z-10">
					<Text variant="Main/14px/Bold" className="text-brand-primary!">
						شروع استیکینگ
					</Text>
				</button>
			) : (
				<div className="h-14 px-6 bg-grayscale-03 rounded-4xl flex items-center justify-center relative z-10">
					<Text variant="Main/14px/Bold" className="text-grayscale-05!">
						به زودی
					</Text>
				</div>
			)}
		</div>
	);
};

function mapStakingPlanToCard(plan: StakingPlan): StackingCardProps {
	const nowAmount = parseFloat(plan.nowStaksAmount) || 0;
	const maxAmount = parseFloat(plan.maxStaksAmount) || 1;
	const progressPercent =
		maxAmount > 0 ? Math.round((nowAmount / maxAmount) * 100) : 0;
	const rate =
		Number(Number(plan.dailyPercent) * Number(plan.activeDays)).toFixed(2) || 0;
	const formattedNow = Number(maxAmount - nowAmount).toLocaleString('en-US', {
		maximumFractionDigits: 0,
	});
	const assetSymbol = plan.asset.toUpperCase();

	return {
		id: plan.id,
		symbol: assetSymbol,
		name: plan.name,
		icon: plan.image || `${plan.asset.toLowerCase()}_.svg`,
		rate: Number(rate),
		duration: `${plan.activeDays} روزه`,
		payment: plan.isDaily ? 'روزانه' : 'ماهانه',
		earlyWithdrawal: 'ندارد',
		minEntry: `${Number(plan.minAmount).toLocaleString()} ${assetSymbol}`,
		capacity: `${100 - progressPercent}% (${formattedNow} ${assetSymbol})`,
		progressWidth: `${Math.min(progressPercent, 100)}%`,
		badge: null,
	};
}

const StakingCards = () => {
	const { data: stakingPlans = [], isLoading, isError } = useStakingQuery();

	const stakingData = stakingPlans
		.filter(
			(plan) =>
				plan.status === 'Active' &&
				ACTIVE_STAKING_SYMBOLS.has(plan.asset.toUpperCase()),
		)
		.map(mapStakingPlanToCard);

	if (isLoading) {
		return (
			<div className="w-full px-4 md:px-8 flex justify-center py-16">
				<div className="animate-pulse h-64 w-full max-w-sm rounded-4xl bg-grayscale-03" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="w-full px-4 md:px-8 flex justify-center py-16">
				<Text variant="LongText/16px/Regular" className="text-grayscale-05">
					خطا در دریافت اطلاعات استیکینگ. لطفاً دوباره تلاش کنید.
				</Text>
			</div>
		);
	}

	if (stakingData.length === 0) {
		return (
			<div className="w-full px-4 md:px-8 flex justify-center py-16">
				<Text variant="LongText/16px/Regular" className="text-grayscale-05">
					در حال حاضر طرح استیکینگ فعالی وجود ندارد.
				</Text>
			</div>
		);
	}

	return (
		<div className="w-full px-4 md:px-8">
			{/* Swiper for screens < XL */}

			<div className="w-full">
				<Swiper
					spaceBetween={18}
					slidesPerView={1.3}
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					loop
					initialSlide={1}
					pagination={{ clickable: true }}
					breakpoints={{
						640: {
							slidesPerView: 1.8,
							initialSlide: 1,
						},
						1024: {
							slidesPerView: 4,
							initialSlide: 2,
						},
						1440: {
							slidesPerView: 4,
							initialSlide: 2,
						},
					}}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 0,
						modifier: 1,
						slideShadows: false,
					}}
				>
					{stakingData.map((card) => (
						<SwiperSlide key={card.id}>
							<StackingCard
								symbol={card.symbol}
								name={card.name}
								icon={card.icon}
								rate={card.rate}
								duration={card.duration}
								payment={card.payment}
								earlyWithdrawal={card.earlyWithdrawal}
								minEntry={card.minEntry}
								capacity={card.capacity}
								progressWidth={card.progressWidth}
								badge={card.badge}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

interface StackingCardProps {
	id?: string;
	symbol: string;
	name: string;
	icon: string;
	rate: number;
	duration: string;
	payment: string;
	earlyWithdrawal: string;
	minEntry: string;
	capacity: string;
	progressWidth: string;
	badge: string | null;
}

const StackingCard = ({
	symbol,
	name,
	icon,
	rate,
	duration,
	payment,
	earlyWithdrawal,
	minEntry,
	capacity,
	progressWidth,
	badge,
}: StackingCardProps) => {
	const { theme, mounted } = useTheme();
	return (
		<div className="w-full p-4 bg-grayscale-02 rounded-4xl h-full relative overflow-hidden">
			<Image
				src={
					mounted && theme === 'light'
						? '/assets/staking/stakingPatternLight.svg'
						: '/assets/staking/stakingPattern.svg'
				}
				width={200}
				height={200}
				alt="pattern"
				className="absolute top-0 left-0 z-0"
			/>
			<div className="flex flex-row items-center justify-between ">
				<div className="flex flex-col items-start">
					<Image
						src={icon}
						alt={`${symbol} Staking Card`}
						width={44}
						height={44}
						className="object-cover w-11 h-11 rounded-full mb-4"
						onError={(e) => {
							e.currentTarget.style.display = 'none';
						}}
					/>
					<div className="flex flex-row items-center gap-2">
						<Text variant="Main/24px/Bold" className="text-grayscale-07!">
							{symbol}
						</Text>
						{badge && (
							<div className="h-6 w-16 rounded-2xl bg-[#FF6026] flex items-center justify-center">
								<Text variant="Main/14px/SemiBold" className="text-white">
									{badge}
								</Text>
							</div>
						)}
					</div>
					<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
						سبد سرمایه‌گذاری {name}
					</Text>
				</div>
				<div>
					<div className="relative mb-2 z-10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="66"
							height="66"
							viewBox="0 0 66 66"
							fill="none"
						>
							<path
								d="M28.0019 2.16765C30.3682 -0.722556 34.788 -0.722557 37.1543 2.16765C38.7626 4.13207 41.4453 4.85088 43.8203 3.9538C47.3147 2.63394 51.1424 4.84386 51.7465 8.52999C52.1571 11.0354 54.121 12.9992 56.6263 13.4098C60.3125 14.014 62.5224 17.8417 61.2025 21.336C60.3055 23.7111 61.0243 26.3937 62.9887 28.002C65.8789 30.3683 65.8789 34.7881 62.9887 37.1544C61.0243 38.7627 60.3055 41.4454 61.2025 43.8204C62.5224 47.3148 60.3125 51.1424 56.6263 51.7466C54.121 52.1572 52.1571 54.121 51.7465 56.6264C51.1424 60.3126 47.3147 62.5225 43.8203 61.2026C41.4453 60.3056 38.7626 61.0244 37.1543 62.9888C34.788 65.879 30.3682 65.879 28.0019 62.9888C26.3936 61.0244 23.711 60.3056 21.3359 61.2026C17.8416 62.5225 14.0139 60.3126 13.4097 56.6264C12.9991 54.1211 11.0353 52.1572 8.5299 51.7466C4.84377 51.1424 2.63385 47.3148 3.95371 43.8204C4.85078 41.4454 4.13198 38.7627 2.16756 37.1544C-0.722648 34.7881 -0.722648 30.3683 2.16756 28.002C4.13198 26.3937 4.85078 23.7111 3.95371 21.336C2.63385 17.8417 4.84377 14.014 8.5299 13.4098C11.0353 12.9992 12.9991 11.0354 13.4097 8.52999C14.0139 4.84386 17.8416 2.63394 21.3359 3.9538C23.711 4.85088 26.3936 4.13207 28.0019 2.16765Z"
								fill="url(#paint0_linear_3470_22986)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_3470_22986"
									x1="32.5781"
									y1="-3.42178"
									x2="32.5781"
									y2="68.5782"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#9ADBAE" />
									<stop offset="1" stopColor="#00BC9A" />
								</linearGradient>
							</defs>
						</svg>
						<Text
							variant="Main/20px/Bold"
							className="text-white! absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
						>
							{Number(rate).toLocaleString()}
							<Text variant="Main/14px/SemiBold" className="text-white!">
								%
							</Text>
						</Text>
					</div>
					<Text variant="Main/14px/SemiBold" className="text-grayscale-07! ">
						سود سالانه
					</Text>
				</div>
			</div>
			<div className="border-t border-grayscale-03 my-6" />
			<div className="flex flex-col gap-5">
				{[
					{
						id: 1,
						title: 'مدت استیکینگ',
						value: duration,
					},
					{
						id: 2,
						title: 'پرداخت سود',
						value: payment,
					},
					{
						id: 3,
						title: 'قابلیت برداشت قبل از سررسید',
						value: earlyWithdrawal,
					},
					{
						id: 4,
						title: 'حداقل ورود',
						value: minEntry,
					},
					{
						id: 5,
						title: 'تا پر شدن سقف',
						value: capacity,
					},
				].map((item) => {
					return (
						<div
							key={item.id}
							className="flex flex-row items-start justify-between w-full"
						>
							<Text
								variant="Main/14px/SemiBold"
								className="text-grayscale-05! font-normal!"
							>
								{item.title}
							</Text>
							<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
								{item.value}
							</Text>
						</div>
					);
				})}
			</div>

			<div className="flex flex-row items-center justify-between gap-1 mt-6">
				<div
					className="h-2 rounded-3xl bg-primary"
					style={{ width: progressWidth }}
				></div>
				<div
					className="h-2 rounded-3xl bg-glass-gray-11"
					style={{ width: `calc(100% - ${progressWidth})` }}
				></div>
			</div>
			<button className="w-full h-14 rounded-4xl bg-brand-primary text-white! flex items-center justify-center mt-6">
				<Text variant="Main/14px/Bold" className="text-white!">
					شروع استیکینگ
				</Text>
			</button>
		</div>
	);
};

const FeatureCard = ({
	icon,
	name,
	desc,
}: {
	icon: React.ReactElement;
	name: string;
	desc: string;
}) => {
	return (
		<div className="w-full h-[300px] flex flex-col gap-6 items-center justify-start p-6">
			{icon}
			<Text variant="Main/24px/Bold" className="text-white!">
				{name}
			</Text>
			<Text
				variant="LongText/14px/Regular"
				className="text-white! text-center!"
			>
				{desc}
			</Text>
		</div>
	);
};
