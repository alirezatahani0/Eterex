'use client';

import Image from 'next/image';
import Text from '@/components/UI/Text';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BrandLogo {
	src: string;
	alt: string;
	text: string;
	width?: number;
	height?: number;
}

interface BrandTickerProps {
	logos: BrandLogo[];
	duration?: number; // Seconds for one full cycle (slower = higher number)
	className?: string;
}

const GAP = 80;

export default function BrandTicker({
	logos,
	duration = 20,
	className,
}: BrandTickerProps) {
	const duplicatedBrands = [...logos, ...logos];

	return (
		<div className={className}>
			<div className="relative overflow-hidden bg-brand-primary h-20" dir="ltr">
				<div className="relative flex h-20 overflow-hidden">
					<motion.div
						className="flex gap-6 px-4"
						animate={{ x: '-50%' }}
						transition={{
							duration: 50,
							repeat: Infinity,
							ease: 'linear',
							repeatType: 'loop',
						}}
						style={{ width: 'fit-content', flexDirection: 'row-reverse', gap: 80 }}
					>
						{duplicatedBrands.map((logo) => (
							<motion.div
								key={`${logo.src}-${logo.alt}-a`}
								className={`shrink-0 
									flex items-center justify-center transition-transform duration-300 gap-2
									`}
							>
								<Image
									src={logo.src}
									alt={logo.alt}
									width={logo.width || 120}
									height={logo.height || 60}
									className="h-auto object-contain"
								/>
								<Text variant="Main/24px/Bold" className="text-white!">
									{logo.text}
								</Text>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
