'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';

export default function SecurityContent() {
	const { security } = useTranslation();

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

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div className="text-center mt-12 py-10 relative z-10 bg-[url('/assets/security/Header.png')] md:bg-[url('/assets/security/Header-MD.png')] lg:bg-[url('/assets/security/Header-LG.png')] 2xl:bg-[url('/assets/security/Header-XL.png')] w-full h-[400px] md:h-[480px] lg:h-[582px] 2xl:h-[640px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end">
				{/* Title */}
				<Text variant="Main/32px/Black" className="mb-4">
					{security.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{security.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold">{security.subtitle.highlight}</Text>
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
			</Container>
		</div>
	);
}
