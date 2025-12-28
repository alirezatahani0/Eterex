'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function IdentityVerificationContent() {
	const { identityVerification } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/identity/Header-Dark.png')] md:bg-[url('/assets/identity/Header-MD-Dark.png')] lg:bg-[url('/assets/identity/Header-LG-Dark.png')] 2xl:bg-[url('/assets/identity/Header-XL-Dark.png')] "
			: "bg-[url('/assets/identity/Header.png')] md:bg-[url('/assets/identity/Header-MD.png')] lg:bg-[url('/assets/identity/Header-LG.png')] 2xl:bg-[url('/assets/identity/Header-XL.png')] ";
	}, [theme, mounted]);

	const faqQuestions = [
		identityVerification.faq.question1,
		identityVerification.faq.question2,
		identityVerification.faq.question3,
		identityVerification.faq.question4,
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
					{identityVerification.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{identityVerification.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{identityVerification.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{' '}
						{identityVerification.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20 ">
				{/* Introduction Paragraph */}
				<div className="mb-14">
					<Text
						variant="Main/20px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{identityVerification.introQuestion}
					</Text>
					<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
						{identityVerification.intro}
					</Text>
				</div>

				{/* Requirements Section */}
				<div className="mb-14">
					<Text
						variant="Main/20px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{identityVerification.requirements.title}
					</Text>
					<Text
						variant="LongText/16px/Regular"
						color="text-grayscale-06!"
						className="mb-8"
					>
						{identityVerification.requirements.intro}
					</Text>

					<div className="space-y-14 mt-14">
						{/* Method 1 */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="mb-3 text-grayscale-07!"
							>
								{identityVerification.requirements.method1.title}:
							</Text>
							<Text
								variant="LongText/16px/Regular"
								color="text-grayscale-06!"
								className="mb-3"
							>
								{' '}
								{identityVerification.requirements.method1.description}
							</Text>
							<div className="space-y-2 mt-4">
								<Text
									variant="LongText/16px/Regular"
									color="text-grayscale-06!"
								>
									{identityVerification.requirements.method1.note1}
								</Text>
								<Text
									variant="LongText/16px/Regular"
									color="text-grayscale-06!"
								>
									{identityVerification.requirements.method1.note2}
								</Text>
							</div>
						</div>

						{/* Method 2 */}
						<div>
							<Text
								variant="LongText/18px/Bold"
								className="mb-3 text-grayscale-07!"
							>
								{identityVerification.requirements.method2.title}:
							</Text>
							<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
								{' '}
								{identityVerification.requirements.method2.description}
							</Text>
						</div>
					</div>

					{/* Tutorial Question */}
					<div className="mt-14">
						<Text
							variant="Main/20px/Bold"
							gradient="primary"
							className="mb-6 w-fit"
							type="h2"
						>
							{identityVerification.requirements.tutorial.question}
						</Text>
						<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
							{identityVerification.requirements.tutorial.answer}
						</Text>
					</div>
				</div>

				{/* FAQ Section */}
				<div className="mb-14">
					<div className="space-y-14">
					{faqQuestions.map((faq, index) => (
							<div key={index} >
								<Text
									variant="Main/20px/Bold"
									gradient="primary"
									className="mb-6 w-fit"
									type="h2"
								>
									{faq.question}
								</Text>
								<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
									{faq.answer}
								</Text>
							</div>
						))}
					</div>
				</div>

				<DownloadSection />
			</Container>
		</div>
	);
}
