'use client';

import Image from 'next/image';
import Text from '@/components/UI/Text';
import { useRef, useState, useEffect } from 'react';

interface BrandLogo {
	src: string;
	alt: string;
	text: string;
	width?: number;
	height?: number;
}

interface BrandTickerProps {
	logos: BrandLogo[];
	speed?: number; // Pixels per second
	direction?: 'left' | 'right';
	className?: string;
}

const GAP = 100; // px between items

export default function BrandTicker({
	logos: initialLogos,
	speed = 60,
	direction = 'left',
	className,
}: BrandTickerProps) {
	const logos = initialLogos.slice(0, 10);
	const [queue, setQueue] = useState<BrandLogo[]>(() =>
		initialLogos.slice(0, 10),
	);
	const scrollOffset = useRef(0);
	const trackRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const lastRecycleScroll = useRef(0);
	const recycleCooldown = useRef(false);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (logos.length === 0) return;

		let rafId: number;
		const basePxPerFrame = (speed / 60) * (direction === 'left' ? 1 : -1);

		const animate = () => {
			const pxPerFrame = isPaused ? 0 : basePxPerFrame;
			scrollOffset.current += pxPerFrame;

			if (trackRef.current) {
				trackRef.current.style.transform = `translateX(-${scrollOffset.current}px)`;
			}

			// Cooldown: must scroll at least 50px since last recycle
			if (recycleCooldown.current) {
				if (scrollOffset.current - lastRecycleScroll.current > 50) {
					recycleCooldown.current = false;
				}
				rafId = requestAnimationFrame(animate);
				return;
			}

			const firstEl = itemRefs.current[0];
			const secondEl = itemRefs.current[1];
			const container = containerRef.current;

			if (firstEl && secondEl && container && logos.length >= 2) {
				const containerRect = container.getBoundingClientRect();
				const firstRect = firstEl.getBoundingClientRect();
				const secondRect = secondEl.getBoundingClientRect();

				// Both fully out of view on the left
				const firstOut = firstRect.right < containerRect.left;
				const secondOut = secondRect.right < containerRect.left;

				if (firstOut && secondOut) {
					const firstWidth = firstRect.width + GAP;

					setQueue((prev) => {
						const [first, ...rest] = prev;
						return [...rest, first];
					});
					scrollOffset.current -= firstWidth;
					lastRecycleScroll.current = scrollOffset.current;
					recycleCooldown.current = true;
				}
			}

			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [speed, direction, logos.length, isPaused]);

	return (
		<div className={className}>
			<div
				ref={containerRef}
				className="relative overflow-hidden bg-brand-primary h-20 cursor-default"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div className="relative flex h-20">
					<div
						ref={trackRef}
						className="flex flex-row-reverse items-center whitespace-nowrap will-change-transform"
						style={{ gap: GAP }}
					>
						{queue.map((logo, idx) => (
							<div
								key={`${logo.src}-${logo.alt}`}
								ref={(el) => {
									itemRefs.current[idx] = el;
								}}
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
