'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Text from './Text';
interface CollapseProps {
	header: ReactNode;
	children: ReactNode;
	defaultOpen?: boolean;
	className?: string;
	headerClassName?: string;
	contentClassName?: string;
}

// Chevron Icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={cn(
			'transition-transform duration-300 ease-in-out shrink-0 ',
			isOpen ? 'rotate-180' : 'rotate-0',
		)}
	>
		<path
			d="M6 9L12 15L18 9"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function Collapse2({
	header,
	children,
	defaultOpen = false,
	className,
	headerClassName,
	contentClassName,
}: CollapseProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const [height, setHeight] = useState<number | string>(
		defaultOpen ? 'auto' : 0,
	);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			if (isOpen) {
				setHeight(contentRef.current.scrollHeight);
			} else {
				setHeight(0);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && contentRef.current) {
			const resizeObserver = new ResizeObserver(() => {
				if (contentRef.current) {
					setHeight(contentRef.current.scrollHeight);
				}
			});
			resizeObserver.observe(contentRef.current);
			return () => resizeObserver.disconnect();
		}
	}, [isOpen]);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={cn('w-full', className)}>
			{/* Header/Trigger */}
			<button
				type="button"
				onClick={toggle}
				className={cn(
					'w-full flex items-center justify-between gap-4',
					headerClassName,
				)}
				aria-expanded={isOpen}
				aria-controls="collapse-content"
			>
				<Text variant="Main/24px/Regular" gradient="primary">{header}</Text>

				<div className="rounded-full w-9 h-9 flex items-center justify-center">
					<ChevronIcon isOpen={isOpen} />
				</div>
			</button>

			{/* Content */}
			<div
				id="collapse-content"
				className="overflow-hidden transition-all duration-300 ease-in-out mt-6"
				style={{
					height: typeof height === 'number' ? `${height}px` : height,
					opacity: isOpen ? 1 : 0,
				}}
			>
				<div ref={contentRef} className={cn('pt-4', contentClassName)}>
					{children}
				</div>
			</div>
		</div>
	);
}
