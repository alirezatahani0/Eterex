'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { useTheme } from '@/hooks/useTheme';

export default function FeaturesSection() {
	const { features } = useTranslation();
	const { theme, mounted } = useTheme();

	const cards = [
		{
			key: 'instantTrading',
			label: features.cards.instantTrading.title,
			desc: features.cards.instantTrading.description,
		},
		{
			key: 'autoVerification',
			label: features.cards.autoVerification.title,
			desc: features.cards.autoVerification.description,
		},
		{
			key: 'support24',
			label: features.cards.support24.title,
			desc: features.cards.support24.description,
		},
		{
			key: 'directPayment',
			label: features.cards.directPayment.title,
			desc: features.cards.directPayment.description,
		},
		{
			key: 'lowFee',
			label: features.cards.lowFee.title,
			desc: features.cards.lowFee.description,
		},
		{
			key: 'unlimitedDeposit',
			label: features.cards.unlimitedDeposit.title,
			desc: features.cards.unlimitedDeposit.description,
		},
		{
			key: 'smartFee',
			label: features.cards.smartFee.title,
			desc: features.cards.smartFee.description,
		},
		{
			key: 'staking',
			label: features.cards.staking.title,
			desc: features.cards.staking.description,
		},
	];

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
							{features.tagline.prefix}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{features.tagline.highlight}
						</Text>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							{features.tagline.suffix}
						</Text>
					</div>
				</div>

				{/* Title */}
				<div className="flex flex-col md:flex-row items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{features.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{features.title.highlight}
					</Text>
				</div>
			</div>

			{/* Statistics Grid */}
			<div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
				{cards.map((card) => {
					return (
						<div
							key={card.key}
							className={cn(
								'rounded-[36px] p-10 relative overflow-hidden z-10 grid grid-cols-[2fr_176px] gap-4 bg-feature-card',
							)}
						>
							<Image
								src={`/assets/main/${theme === 'light' && mounted ? 'patterns3Light' : 'patterns3'}.svg`}
								width={300}
								height={300}
								alt="white pattern"
								className="absolute top-0 left-0 z-10"
							/>
							<div className="flex flex-col relative z-10">
								<Text
									variant="Main/32px/Bold"
									className="text-grayscale-07! mb-6 text-[24px]! lg:text-[32px]!"
								>
									{card.label}
								</Text>
								<Text
									variant="LongText/14px/Regular"
									className="w-fit text-grayscale-06!"
								>
									{card.desc}
								</Text>
							</div>
							<Image
								className="relative z-10"
								src={`/assets/main/${card.key}.avif`}
								alt={card.key}
								width={176}
								height={176}
							/>
						</div>
					);
				})}
			</div>
			{/* Swiper */}
			<div className="md:hidden">
				<Swiper
					modules={[Navigation, EffectCoverflow, Autoplay]}
					spaceBetween={32}
					slidesPerView={1}
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: {
							slidesPerView: 1.5,
						},
						1024: {
							slidesPerView: 2,
						},
					}}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}}
				>
					{cards.map((card, index) => (
						<SwiperSlide key={index}>
							<div
								key={card.key}
								className={cn(
									'rounded-[36px] p-10 relative overflow-hidden z-10 flex flex-col gap-4 items-center bg-feature-card min-h-[530px]',
								)}
							>
								<div className="bg-[url('/assets/main/Vector-Dark.png')] bg-no-repeat bg-center bg-cover absolute top-0 left-0 w-full h-[250px] z-0 opacity-10" />
								<Image
									className="relative z-10"
									src={`/assets/main/${card.key}.avif`}
									alt={card.key}
									width={176}
									height={176}
								/>
								<div className="flex flex-col relative z-10">
									<Text
										variant="Main/32px/Bold"
										className="text-grayscale-07! mb-6 text-[24px]! lg:text-[32px]! text-center!"
									>
										{card.label}
									</Text>
									<Text
										variant="LongText/14px/Regular"
										className="w-fit text-grayscale-06! text-center!"
									>
										{card.desc}
									</Text>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Container>
	);
}
