'use client';

import { cn } from '@/lib/utils';
import Text from './Text';
import Image from 'next/image';
import Link from 'next/link';
import { ICON_BASE_URL } from '@/lib/constants';

interface CryptoItem {
	symbol: string;
	name: string;
	price: string;
	change: string;
	changeType: 'positive' | 'negative';
	icon?: React.ReactNode;
}

interface MarketCardProps {
	title: string;
	items: CryptoItem[];
	className?: string;
}

export default function MarketCard({
	title,
	items,
	className,
}: MarketCardProps) {
	return (
		<div
			className={cn(
				'rounded-[28px] border-2 border-grayscale-03 p-8 flex flex-col justify-center items-start gap-6',
				className,
			)}
			style={
				{
					background:
						'linear-gradient(180deg, rgba(18, 27, 56, 0.00) 50%, rgba(255, 255, 255, 0.12) 100%)',
				} as React.CSSProperties
			}
		>
			<Text variant="Main/14px/SemiBold" className="text-grayscale-07! ">
				{title}
			</Text>
			<div className="flex flex-col gap-6 w-full">
				{items.map((item, index) => (
					<Link
						key={index}
						href={`/coin/${item.symbol.toLowerCase()}`}
						className="flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
					>
						<div className="flex items-center gap-3 flex-1">
							<div className="w-9 h-9 rounded-full bg-grayscale-03 flex items-center justify-center overflow-hidden relative">
								<Image
									src={`${ICON_BASE_URL}/${item.symbol.toLowerCase()}_.svg`}
									width={36}
									height={36}
									alt={item.symbol}
									className="w-full h-full object-cover"
									onError={(e) => {
										// Hide the image on error, gray background will show
										e.currentTarget.style.display = 'none';
									}}
								/>
							</div>
							<div className="flex-1 max-w-16 overflow-x-hidden whitespace-nowrap text-ellipsis">
								<Text variant="Main/14px/Bold" className="text-grayscale-07!">
									{item.symbol}
								</Text>
							</div>
						</div>
						<div className="text-left!">
							<Text
								variant="LongText/14px/Regular"
								className="text-grayscale-06!"
							>
								{item.price}
							</Text>
						</div>
						<Text
							variant="Main/14px/Bold"
							className={cn(
								item.changeType === 'positive' ? 'text-green' : 'text-red-500!',
							)}
						>
							{item.change}
						</Text>
					</Link>
				))}
			</div>
		</div>
	);
}
