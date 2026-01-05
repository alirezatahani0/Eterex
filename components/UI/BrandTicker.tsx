'use client';

import Image from 'next/image';
import Text from '@/components/UI/Text';

interface BrandLogo {
	src: string;
	alt: string;
	text: string;
	width?: number;
	height?: number;
}

interface BrandTickerProps {
	logos: BrandLogo[];
	speed?: number; // Duration in seconds for one full cycle
	direction?: 'left' | 'right';
	className?: string;
}

export default function BrandTicker({ logos }: BrandTickerProps) {
	return (
		<div className="w-full">
			<div className="relative overflow-hidden bg-brand-primary h-20">
				{/* Ticker content */}
				<div className="relative flex whitespace-nowrap h-20">
					<div className="ticker-content">
						{logos.map((logo, idx) => (
							<div
								key={`logo-${idx}`}
								className="shrink-0 flex items-center gap-4 justify-center opacity-75"
							>
								<Image
									src={logo.src}
									alt={logo.alt}
									width={logo.width || 120}
									height={logo.height || 60}
									className="h-auto object-contain transition-all"
								/>
								<Text variant="Main/24px/Bold" className="text-white!">
									{logo.text}
								</Text>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
