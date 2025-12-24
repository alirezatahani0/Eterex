import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export default function Container({
	children,
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={cn(
				// Mobile: 24px from sides
				'px-6',
				// Tablet (md): 48px from sides
				'md:px-12',
				// Laptop (lg): 76px from sides
				'lg:px-[76px]',
				// More than 1440px (2xl): 156px from sides
				'2xl:px-[156px]',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

