'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CircularCarouselProps {
	className?: string;
	logoSize?: number;
	coinsSize?: number;
	borderDistance?: number;
	rotationSpeed?: number; // seconds for one full rotation
}

export default function CircularCarousel({
	className,
	logoSize = 260,
	coinsSize = 144,
	borderDistance = 80,
	rotationSpeed = 20,
}: CircularCarouselProps) {
	const [sizes, setSizes] = useState({
		logo: logoSize,
		coins: coinsSize,
		border: borderDistance,
	});

	useEffect(() => {
		const updateSizes = () => {
			const width = window.innerWidth;
			if (width < 640) {
				// Mobile: smallest sizes
				setSizes({
					logo: logoSize * 0.8,
					coins: coinsSize * 0.8,
					border: borderDistance * 0.9,
				});
			} else if (width < 768) {
				// Small tablets
				setSizes({
					logo: logoSize,
					coins: coinsSize,
					border: borderDistance,
				});
			} else if (width < 1024) {
				// Tablets
				setSizes({
					logo: logoSize * 0.8,
					coins: coinsSize * 0.8,
					border: borderDistance * 0.9,
				});
			} else if (width < 1280) {
				// Small laptops
				setSizes({
					logo: logoSize * 0.8,
					coins: coinsSize * 0.8,
					border: borderDistance * 0.9,
				});
			} else {
				// Desktop: full sizes
				setSizes({
					logo: logoSize,
					coins: coinsSize,
					border: borderDistance,
				});
			}
		};

		updateSizes();
		window.addEventListener('resize', updateSizes);
		return () => window.removeEventListener('resize', updateSizes);
	}, [logoSize, coinsSize, borderDistance]);
	// All carousel images except Logo.png
	const carouselImages = [
		'Bitcoin_3D-1.png',
		'Bitcoin_3D-2.png',
		'Bitcoin_3D-3.png',
		'Bitcoin_3D-4.png',
		'Bitcoin_3D-5.png',
		'Bitcoin_3D-6.png',
		'Bitcoin_3D.png',
	];

	// Calculate the radius of the circle (logo center to image center)
	// borderDistance is from logo edge to border, so we need logo radius + borderDistance + image radius
	// For simplicity, we'll use borderDistance as the radius from center
	const radius = sizes.border + sizes.logo / 2;

	// Calculate positions for each image around the circle
	const imagePositions = carouselImages.map((_, index) => {
		const angle = (index * 360) / carouselImages.length;
		const radian = (angle * Math.PI) / 180;
		const x = Math.cos(radian) * radius;
		const y = Math.sin(radian) * radius;
		return { x, y, angle };
	});

	// Calculate border radius (distance from center to border)
	// Border is 200px from logo, so: logo radius + 200px
	const borderRadius = sizes.logo / 2 + sizes.border;

	// Calculate container size to accommodate rotating images
	// Need to account for image size when rotated (diagonal = sqrt(2) * size)
	const maxImageDiagonal = sizes.coins * Math.sqrt(2);
	const containerSize = borderRadius * 2 + maxImageDiagonal + 20; // Extra padding

	return (
		<div
			className={cn(
				'relative flex items-center justify-center h-full overflow-hidden',
				className,
			)}
			style={{
				width: `${containerSize}px`,
				height: `${containerSize}px`,
				maxWidth: '100%',
				maxHeight: '100%',
				contain: 'layout style paint',
			}}
		>
			{/* Circular border */}
			<div
				className="absolute rounded-full border-2 border-grayscale-07 opacity-5"
				style={{
					width: `${borderRadius * 2}px`,
					height: `${borderRadius * 2}px`,
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>

			{/* Rotating container for carousel images */}
			<div
				className="absolute left-1/2 top-1/2 origin-center"
				style={{
					width: '1px',
					height: '1px',
					transform: 'translate(-50%, -50%) translateZ(0)',
					animation: `circularCarouselRotate ${rotationSpeed}s linear infinite`,
					willChange: 'transform',
					backfaceVisibility: 'hidden',
				}}
			>
				{imagePositions.map((position, index) => (
					<div
						key={carouselImages[index]}
						className="absolute"
						style={{
							left: `${position.x}px`,
							top: `${position.y}px`,
							transform: 'translate(-50%, -50%) translateZ(0)',
							width: sizes.coins,
							height: sizes.coins,
							animation: `circularCarouselCounterRotate ${rotationSpeed}s linear infinite`,
							willChange: 'transform',
							backfaceVisibility: 'hidden',
						}}
					>
						<Image
							src={`/assets/carousel/${carouselImages[index]}`}
							alt={`Carousel image ${index + 1}`}
							width={sizes.coins}
							height={sizes.coins}
							className="object-contain"
							unoptimized
						/>
					</div>
				))}
			</div>

			{/* Center logo */}
			<div className="relative z-10">
				<Image
					src="/assets/carousel/Logo.png"
					alt="Logo"
					width={sizes.logo}
					height={sizes.logo}
					className="object-contain relative top-5 right-5 "
					priority
					unoptimized
				/>
			</div>
		</div>
	);
}
