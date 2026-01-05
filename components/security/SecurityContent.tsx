'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function SecurityContent() {
	const { security } = useTranslation();
	const { theme, mounted } = useTheme();

	const features = [
		{
			title: security.dedicatedAddresses.title,
			description: security.dedicatedAddresses.description,
		},
		{
			title: security.twoFactorAuth.title,
			description: security.twoFactorAuth.description,
		},
		{
			title: security.autoVerification.title,
			description: security.autoVerification.description,
		},
	];
	
	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/security/Header-Dark.png')] md:bg-[url('/assets/security/Header-MD-Dark.png')] lg:bg-[url('/assets/security/Header-LG-Dark.png')] 2xl:bg-[url('/assets/security/Header-XL-Dark.png')] "
			: "bg-[url('/assets/security/Header.png')] md:bg-[url('/assets/security/Header-MD.png')] lg:bg-[url('/assets/security/Header-LG.png')] 2xl:bg-[url('/assets/security/Header-XL.png')] ";
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
						{security.title}
					</Text>

					{/* Subtitle */}
					<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
							{security.subtitle.prefix}{' '}
						</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">{security.subtitle.highlight}</Text>
					<Text variant="Main/16px/Regular" color="#616161">
							{' '}
							{security.subtitle.suffix}
						</Text>
					</div>
				</div>
			<Container className="py-12 md:py-16 lg:py-20">
				{/* Introductory Paragraph */}
				<div className="mb-32">
					<Text variant="LongText/16px/Regular" color="#616161">
						{security.intro}
					</Text>
				</div>

				{/* Security Features */}
				<div className="space-y-8 md:space-y-10">
					{features.map((feature, index) => (
						<div key={index} className="flex gap-4 text-right">
							{/* Bullet Point */}
							<div className="shrink-0 mt-2">
								<div className="w-2 h-2 bg-grayscale-07 rounded-full" />
							</div>

							{/* Content */}
							<div className="flex-1">
								<Text variant="LongText/18px/Bold" className="mb-3" type="p">
									{feature.title}
								</Text>
								<Text variant="LongText/16px/Regular" color="#616161">
									{feature.description}
								</Text>
							</div>
						</div>
					))}
				</div>

				<DownloadSection />
			</Container>
		</div>
	);
}
