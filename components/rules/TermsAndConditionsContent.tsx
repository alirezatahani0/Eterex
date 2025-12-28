'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function TermsAndConditionsContent() {
	const { rules } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/terms/Header-Dark.png')] md:bg-[url('/assets/terms/Header-MD-Dark.png')] lg:bg-[url('/assets/terms/Header-LG-Dark.png')] 2xl:bg-[url('/assets/terms/Header-XL-Dark.png')] "
			: "bg-[url('/assets/terms/Header.png')] md:bg-[url('/assets/terms/Header-MD.png')] lg:bg-[url('/assets/terms/Header-LG.png')] 2xl:bg-[url('/assets/terms/Header-XL.png')] ";
	}, [theme, mounted]);

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
					{rules.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{rules.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{rules.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{' '}
						{rules.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				{/* Introduction Paragraphs */}
				<div className="mb-[120px] space-y-6">
					<Text variant="LongText/16px/Regular" color="#616161">
						{rules.intro.paragraph1}
					</Text>
					<Text variant="LongText/16px/Regular" color="#616161">
						{rules.intro.paragraph2}
					</Text>
					<Text variant="LongText/16px/Regular" color="#616161">
						{rules.intro.paragraph3}
					</Text>
				</div>

				{/* Definitions Section */}
				<div className="mb-[120px]">
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{rules.definitions.title}
					</Text>
					<Text
						variant="LongText/16px/Regular"
						color="#616161"
						className="mb-8"
					>
						{rules.definitions.intro}
					</Text>

					<div className="space-y-8 mt-4">
						{/* Eterex Platform */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="text-grayscale-07! mb-3 ml-1"
							>
								{rules.definitions.eterxPlatform.title}:
							</Text>
							<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
								{' '}
								{rules.definitions.eterxPlatform.description}
							</Text>
						</div>

						{/* Cryptocurrency Conversion */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="text-grayscale-07! mb-3 ml-1"
							>
								{rules.definitions.cryptocurrencyConversion.title}:
							</Text>
							<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
								{' '}
								{rules.definitions.cryptocurrencyConversion.description}
							</Text>
						</div>

						{/* Iranian Laws */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="text-grayscale-07! mb-3 ml-1"
							>
								{rules.definitions.iranianLaws.title}:
							</Text>
							<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
								{' '}
								{rules.definitions.iranianLaws.description}
							</Text>
						</div>

						{/* Identity Verification */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="text-grayscale-07! mb-3 ml-1"
							>
								{rules.definitions.identityVerification.title}:
							</Text>
							<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
								{' '}
								{rules.definitions.identityVerification.description}
							</Text>
						</div>
					</div>
				</div>

				{/* Service Provision Section */}
				<div className="mb-[120px]">
					<Text
						variant="Main/24px/Bold"
						className="mb-6 w-fit max-w-[80%]"
						gradient="primary"
						type="h2"
					>
						{rules.serviceProvision.title}
					</Text>

					<ul className="space-y-6 list-disc list-inside">
						{Object.values(rules.serviceProvision.points).map(
							(point, index) => (
								<li key={index}>
									<Text
										variant="LongText/16px/Regular"
										color="text-grayscale-06!"
									>
										{point}
									</Text>
								</li>
							),
						)}
					</ul>
				</div>

				<DownloadSection />
			</Container>
		</div>
	);
}
