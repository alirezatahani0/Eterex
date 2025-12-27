'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DownloadSection } from '../UI/DownloadSection';

// Information Icon Component with glowing effect
const InfoIcon = () => (
	<div className="mb-8 flex items-center justify-center">
		<svg
			width="120"
			height="120"
			viewBox="0 0 120 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="drop-shadow-[0_0_40px_rgba(123,144,255,0.6)]"
		>
			{/* Outer glow */}
			<circle cx="60" cy="60" r="58" fill="url(#infoGradient)" opacity="0.3" />
			{/* Main circle */}
			<circle cx="60" cy="60" r="55" fill="url(#infoGradient)" />
			<defs>
				<linearGradient id="infoGradient" x1="0" y1="0" x2="120" y2="120">
					<stop offset="0%" stopColor="#7B90FF" />
					<stop offset="100%" stopColor="#0F34F4" />
				</linearGradient>
			</defs>
			<text
				x="60"
				y="85"
				fontSize="72"
				fontWeight="bold"
				fill="white"
				textAnchor="middle"
				dominantBaseline="middle"
				fontFamily="Arial, sans-serif"
			>
				i
			</text>
		</svg>
	</div>
);

export default function AboutUsContent() {
	const { aboutUs } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/security/Header-Dark.png')] md:bg-[url('/assets/security/Header-MD-Dark.png')] lg:bg-[url('/assets/security/Header-LG-Dark.png')] 2xl:bg-[url('/assets/security/Header-XL-Dark.png')] "
			: "bg-[url('/assets/security/Header.png')] md:bg-[url('/assets/security/Header-MD.png')] lg:bg-[url('/assets/security/Header-LG.png')] 2xl:bg-[url('/assets/security/Header-XL.png')] ";
	}, [theme, mounted]);

	const twoColumnSections = [
		{
			left: {
				title: aboutUs.whatDoesEterexMean.title,
				description: aboutUs.whatDoesEterexMean.description,
			},
			right: {
				title: aboutUs.beHeroes.title,
				description: aboutUs.beHeroes.description,
			},
		},
		{
			left: {
				title: aboutUs.beCustomerCentric.title,
				description: aboutUs.beCustomerCentric.description,
			},
			right: {
				title: aboutUs.beUsefulToSociety.title,
				description: aboutUs.beUsefulToSociety.description,
			},
		},
	];

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[400px] md:h-[480px] lg:h-[582px] 2xl:h-[640px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text variant="Main/32px/Black" gradient="primary" className="mb-4">
					{aboutUs.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{aboutUs.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{aboutUs.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{' '}
						{aboutUs.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				{/* Introductory Paragraph */}
				<div className="mb-[120px]">
					<Text variant="LongText/16px/Regular" color="#616161">
						{aboutUs.intro}
					</Text>
				</div>

				{/* Two-Column Sections */}
				<div className="space-y-12 md:space-y-16 mb-[120px]">
					{twoColumnSections.map((section, index) => (
						<div
							key={index}
							className="grid grid-cols-1 md:grid-cols-2 gap-[120px] md:gap-6 mb-[120px]"
						>
							{/* Right Column */}
							<div className="flex flex-col gap-6 text-right">
								{/* Mobile and lg+: Main/32px/Bold */}
								<Text
									variant="Main/32px/Bold"
									type="h2"
									className="block md:hidden lg:block w-fit"
									gradient="primary"
								>
									{section.right.title}
								</Text>
								{/* Only md: Main/24px/Bold */}
								<Text
									variant="Main/24px/Bold"
									type="h2"
									className="hidden md:block lg:hidden w-fit"
									gradient="primary"
								>
									{section.right.title}
								</Text>
								<Text variant="LongText/16px/Regular" color="#616161">
									{section.right.description}
								</Text>
							</div>

							{/* Left Column */}
							<div className="flex flex-col gap-6 text-right">
								{/* Mobile and lg+: Main/32px/Bold */}
								<Text
									variant="Main/32px/Bold"
									type="h2"
									className="block md:hidden lg:block w-fit"
									gradient="primary"
								>
									{section.left.title}
								</Text>
								{/* Only md: Main/24px/Bold */}
								<Text
									variant="Main/24px/Bold"
									type="h2"
									className="hidden md:block lg:hidden w-fit"
									gradient="primary"
								>
									{section.left.title}
								</Text>
								<Text variant="LongText/16px/Regular" color="#616161">
									{section.left.description}
								</Text>
							</div>
						</div>
					))}
				</div>

				{/* Foundation Section */}
				<div className="flex flex-col gap-6 text-right">
					{/* Mobile and lg+: Main/32px/Bold */}
					<Text
						variant="Main/32px/Bold"
						type="h2"
						className="block md:hidden lg:block w-fit"
						gradient="primary"
					>
						{aboutUs.foundation.title}
					</Text>
					{/* Only md: Main/24px/Bold */}
					<Text
						variant="Main/24px/Bold"
						type="h2"
						className="hidden md:block lg:hidden w-fit"
						gradient="primary"
					>
						{aboutUs.foundation.title}
					</Text>
					<Text variant="LongText/16px/Regular" color="#616161">
						{aboutUs.foundation.description}
					</Text>
				</div>

				<DownloadSection />
			</Container>
		</div>
	);
}
