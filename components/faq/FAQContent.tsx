'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import Collapse from '../UI/QACollapse';

export default function FAQContent() {
	const { faq } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/QA/Header-Dark.avif')] md:bg-[url('/assets/QA/Header-MD-Dark.avif')] lg:bg-[url('/assets/QA/Header-LG-Dark.avif')] 2xl:bg-[url('/assets/QA/Header-XL-Dark.avif')] "
			: "bg-[url('/assets/QA/Header.avif')] md:bg-[url('/assets/QA/Header-MD.avif')] lg:bg-[url('/assets/QA/Header-LG.avif')] 2xl:bg-[url('/assets/QA/Header-XL.avif')] ";
	}, [theme, mounted]);

	const categories = [
		{
			title: faq.categories.aboutEterex.title,
			questions: faq.categories.aboutEterex.questions,
		},
		{
			title: faq.categories.rialDepositWithdrawal.title,
			questions: faq.categories.rialDepositWithdrawal.questions,
		},
		{
			title: faq.categories.fees.title,
			questions: faq.categories.fees.questions,
		},
		{
			title: faq.categories.advancedTrading.title,
			questions: faq.categories.advancedTrading.questions,
		},
		{
			title: faq.categories.staking.title,
			questions: faq.categories.staking.questions,
		},
		{
			title: faq.categories.uVoucher.title,
			questions: faq.categories.uVoucher.questions,
		},
	];

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[400px] md:h-[480px] lg:h-[582px] 2xl:h-[640px] bg-cover lg:bg-contain bg-center bg-no-repeat flex flex-col items-center justify-end',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text
					variant="Main/32px/Black"
					gradient="primary"
					className="mb-4"
					type="h1"
				>
					{faq.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{faq.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{faq.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{' '}
						{faq.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				<div className="space-y-12">
					{categories.map((category, categoryIndex) => (
						<div key={categoryIndex} className="space-y-6 mb-[120px]">
							{/* Category Title */}
							<Text
								variant="Main/24px/Bold"
								gradient="primary"
								className="w-fit"
								type="h2"
							>
								{category.title}
							</Text>

							{/* Questions */}
							<div className="space-y-4">
								{category.questions.map((item, questionIndex) => (
									<Collapse
										key={questionIndex}
										header={
											<>
												{Number(questionIndex + 1).toLocaleString('fa-IR')}.
												{item.question}
											</>
										}
										headerClassName="text-right"
										contentClassName="text-right"
									>
										<Text
											variant="LongText/16px/Regular"
											color="text-grayscale-06!"
											className="whitespace-pre-line"
										>
											{item.answer}
										</Text>
									</Collapse>
								))}
							</div>
						</div>
					))}
				</div>

				{faq.footer && (
					<div className="text-center py-8">
						<Text variant="LongText/18px/Bold" color="text-grayscale-06!">
							{faq.footer}
						</Text>
					</div>
				)}

				<DownloadSection />
			</Container>
		</div>
	);
}
