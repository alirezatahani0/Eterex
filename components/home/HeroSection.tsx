'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import CircularCarousel from '../UI/CircularCarousel';

const APP_REGISTER_URL = 'https://app.eterex.com/register';

export default function HeroSection() {
	const { hero } = useTranslation();
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleRegister = () => {
		const normalized = phoneNumber
			.trim()
			.replace(/\s/g, '')
			.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
			.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
		const mobile = normalized;
		const url = mobile
			? `${APP_REGISTER_URL}?phone=${encodeURIComponent(mobile)}`
			: APP_REGISTER_URL;
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	return (
		<>
			<div
				className={cn(
					'bg-cover bg-center bg-no-repeat h-[calc(100vh-89px)] min-h-[800px] lg:hidden overflow-hidden relative',
					"bg-[url('/assets/main/Header.avif')] md:bg-[url('/assets/main/Header-MD.avif')] lg:bg-[url('/assets/main/Header-LG.avif')] 2xl:bg-[url('/assets/main/Header-XL.avif')]",
				)}
			>
				<Container className="relative z-10 py-12 md:py-16 lg:py-20 ">
					<div className="flex flex-col items-center">
						{/* Tagline */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							<Text variant="Main/14px/Bold" className="text-grayscale-05!">
								{hero.tagline}
							</Text>
						</div>

						{/* Main Title */}
						<h1 className="flex flex-row items-center gap-1 mt-8 mb-6">
							<Text
								variant="Main/32px/Black"
								className="w-fit text-grayscale-07!"
								type="span"
							>
								{hero.exchange}
							</Text>
							<Text
								variant="Main/32px/Black"
								gradient="primary"
								className="w-fit"
								type="span"
							>
								{hero.eterex}
							</Text>
						</h1>

						{/* Description */}
						<div className="text-center mb-8">
							<Text variant="LongText/14px/Regular" color="text-graysclae-06!">
								{hero.description.prefix}{' '}
							</Text>
							<Text variant="LongText/14px/SemiBold" color="text-graysclae-07!">
								{hero.description.highlight}
							</Text>
							<Text variant="LongText/14px/Regular" color="text-graysclae-06!">
								{hero.description.suffix}
							</Text>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-row gap-4 w-full md:max-w-md">
							{/* Phone Input */}
							<div className="relative flex flex-row items-start gap-2 w-full">
								<input
									type="tel"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									placeholder={hero.phonePlaceholder}
									id="phone"
									className="w-full h-14 p-4 pr-12 rounded-[40px] border border-glass-gray-11 bg-glass-white-1 text-[14px] text-grayscale-07! placeholder:text-grayscale-07! leading-[20px] font-bold focus:outline-none focus:border-brand-primary transition-colors"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.7101 12.7136C8.9312 16.4916 7.8077 11.8542 5.4015 14.2584C3.0813 16.5776 1.7481 17.0424 4.6864 19.9807C5.0553 20.2764 7.3943 23.8368 15.6148 15.6183C23.8353 7.39977 20.2788 5.05784 19.9831 4.68994C17.0369 1.74374 16.58 3.08481 14.2598 5.403C11.8546 7.80922 16.489 8.93568 12.7101 12.7136Z"
										stroke="url(#paint0_linear_2822_52564)"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_2822_52564"
											x1="12"
											y1="3"
											x2="12"
											y2="20.9996"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#7B90FF" />
											<stop offset="1" stopColor="#294BFF" />
										</linearGradient>
									</defs>
								</svg>
							</div>

							<button
								type="button"
								onClick={handleRegister}
								className="h-14 rounded-full w-14 px-4 bg-brand-primary flex items-center justify-center md:w-[160px] md:gap-2"
							>
								<Text
									variant="Main/14px/Bold"
									className="hidden md:flex w-fit text-white!"
								>
									{hero.registerButton}
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M21 12H3M3 12L8 7M3 12L8 17"
										stroke="#FAF8F4"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</Container>
				<div className="flex flex-col items-center justify-center absolute -bottom-[160px] right-0 left-0 md:hidden">
					<CircularCarousel logoSize={280} coinsSize={140} borderDistance={50}/>
				</div>
				<div className="hidden flex-col items-center justify-center absolute -bottom-[320px] right-0 left-0 md:flex">
					<CircularCarousel logoSize={400} coinsSize={200} borderDistance={120}/>
				</div>
			</div>

			<Container className="hidden lg:flex relative z-10 py-12 md:py-16 lg:py-20">
				<div
					className={cn(
						'bg-cover bg-center bg-no-repeat h-full',
						'grid grid-cols-2 border-2 border-grayscale-03 rounded-3xl',
						"bg-[url('/assets/main/Header.avif')] md:bg-[url('/assets/main/Header-MD.avif')] lg:bg-[url('/assets/main/Header-LG.avif')] 2xl:bg-[url('/assets/main/Header-XL.avif')]",
					)}
				>
					<div className="flex flex-col items-start justify-center pr-[96px]">
						{/* Tagline */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit">
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
							<Text variant="Main/14px/Bold" className="text-grayscale-05!">
								{hero.tagline}
							</Text>
						</div>

						{/* Main Title */}
						<h1 className="flex flex-row items-center gap-1 mt-8 mb-6">
							<Text
								variant="Main/32px/Black"
								className="w-fit text-grayscale-07!"
								type="span"
							>
								{hero.exchange}
							</Text>
							<Text
								variant="Main/32px/Black"
								gradient="primary"
								className="w-fit"
								type="span"
							>
								{hero.eterex}
							</Text>
						</h1>

						{/* Description */}
						<div className="text-center mb-8">
							<Text variant="LongText/14px/Regular" color="text-graysclae-06!">
								{hero.description.prefix}{' '}
							</Text>
							<Text variant="LongText/14px/SemiBold" color="text-graysclae-07!">
								{hero.description.highlight}
							</Text>
							<Text variant="LongText/14px/Regular" color="text-graysclae-06!">
								{hero.description.suffix}
							</Text>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-row gap-4 w-full md:max-w-md">
							{/* Phone Input */}
							<div className="relative flex flex-row items-start gap-2 w-full">
								<input
									type="tel"
									id="phone"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									placeholder={hero.phonePlaceholder}
									className="w-full h-14 p-4 pr-12 rounded-[40px] border border-glass-gray-11 bg-glass-white-1 text-[14px] text-grayscale-07! placeholder:text-grayscale-07! leading-[20px] font-bold focus:outline-none focus:border-brand-primary transition-colors"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.7101 12.7136C8.9312 16.4916 7.8077 11.8542 5.4015 14.2584C3.0813 16.5776 1.7481 17.0424 4.6864 19.9807C5.0553 20.2764 7.3943 23.8368 15.6148 15.6183C23.8353 7.39977 20.2788 5.05784 19.9831 4.68994C17.0369 1.74374 16.58 3.08481 14.2598 5.403C11.8546 7.80922 16.489 8.93568 12.7101 12.7136Z"
										stroke="url(#paint0_linear_2893_78040)"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_2893_78040"
											x1="12"
											y1="3"
											x2="12"
											y2="20.9996"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#7B90FF" />
											<stop offset="1" stopColor="#294BFF" />
										</linearGradient>
									</defs>
								</svg>
							</div>

							<button
								type="button"
								onClick={handleRegister}
								className="h-14 rounded-full w-14 px-4 bg-brand-primary flex items-center justify-center md:w-[160px] md:gap-2"
							>
								<Text
									variant="Main/14px/Bold"
									className="hidden md:flex w-fit text-white!"
								>
									{hero.registerButton}
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M21 12H3M3 12L8 7M3 12L8 17"
										stroke="#FAF8F4"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div className="flex flex-col h-full items-center justify-center">
						<CircularCarousel />
					</div>
				</div>
			</Container>
		</>
	);
}
