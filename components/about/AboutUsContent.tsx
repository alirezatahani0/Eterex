'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DownloadSection } from '../UI/DownloadSection';

export default function AboutUsContent() {
	const { aboutUs } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/aboutUs/Header-Dark.png')] md:bg-[url('/assets/aboutUs/Header-MD-Dark.png')] lg:bg-[url('/assets/aboutUs/Header-LG-Dark.png')] 2xl:bg-[url('/assets/aboutUs/Header-XL-Dark.png')] "
			: "bg-[url('/assets/aboutUs/Header.png')] md:bg-[url('/assets/aboutUs/Header-MD.png')] lg:bg-[url('/assets/aboutUs/Header-LG.png')] 2xl:bg-[url('/assets/aboutUs/Header-XL.png')] ";
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
