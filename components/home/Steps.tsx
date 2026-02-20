'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export default function StepsSection() {
	const { steps } = useTranslation();
	const { theme, mounted } = useTheme();
	const _steps = [
		{
			title: steps.items.verification.title,
			desc: steps.items.verification.description,
		},
		{
			title: steps.items.topup.title,
			desc: steps.items.topup.description,
		},
		{
			title: steps.items.trading.title,
			desc: steps.items.trading.description,
			action: steps.button,
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
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{steps.tagline.highlight}
						</Text>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							{steps.tagline.suffix}
						</Text>
					</div>
				</div>

				{/* Title */}
				<div className="lg:hidden flex flex-col md:flex-row items-center gap-1">
					<Text variant="Main/24px/Bold" className="w-fit text-grayscale-07! text-center!">
						{steps.title.prefix}
					</Text>
					<Text variant="Main/24px/Bold" gradient="primary" className="w-fit">
						{steps.title.highlight}
					</Text>
				</div>
				{/* Title */}
				<div className="hidden lg:flex flex-col md:flex-row items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{steps.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{steps.title.highlight}
					</Text>
				</div>
			</div>

			{/* Steps  */}
			<div className="">
				{_steps.map((step, index) => {
					return (
						<div
							key={index}
							className="flex flex-row items-start justify-start gap-6 py-8 border-b border-grayscale-03 last:border-b-0"
						>
							<div
								className="w-14 h-14 min-w-14 min-h-14 rounded-full border-2 border-[#ffffff3d] flex items-center justify-center"
								style={
									{
										background:
											'linear-gradient(180deg, var(--glass-white-glass-12, rgba(255, 255, 255, 0.12)) 0%, var(--glass-white-glass-1, rgba(255, 255, 255, 0.01)) 100%)',
									} as React.CSSProperties
								}
							>
								<Text variant="Main/24px/Bold" gradient="primary">
									{index + 1}
								</Text>
							</div>
							<div className="flex flex-col lg:flex-row lg:items-center lg:w-full lg:justify-between">
								<div>
									<Text
										type="p"
										variant="Main/16px/Regular"
										className="font-bold text-grayscale-07! mb-3"
									>
										{step.title}
									</Text>
									<Text
										type="p"
										variant="LongText/14px/Regular"
										className={cn(
											'text-grayscale-06!',
											step.action ? 'mb-8 lg:mb-0' : '',
										)}
									>
										{step.desc}
									</Text>
								</div>
								{step.action ? (
									<a
										href="https://app.eterex.com"
										target="_blank"
										rel="noopener noreferrer"
										className="h-14 min-h-14 rounded-[40px] bg-grayscale-07 flex flex-row items-center justify-center gap-2 px-7 w-fit hover:opacity-90 transition-opacity"
									>
										<Text
											variant="Main/14px/Bold"
											className="text-grayscale-01!"
										>
											{step.action}
										</Text>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M18.3493 15.2422L3.65234 6.75684M3.65234 6.75684L5.37781 13.1964M3.65234 6.75684L10.0919 5.03137"
												stroke={mounted && theme === 'dark' ? 'black' : 'white'}
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</a>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
}
