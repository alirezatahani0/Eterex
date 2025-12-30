'use client';

import { ReactNode, useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Text from './Text';
import { useTheme } from '@/hooks/useTheme';
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
		xmlns="http://www.w3.org/2000/svg"
		width="17"
		height="8"
		viewBox="0 0 17 8"
		fill="none"
		className={cn(
			'transition-transform duration-300 ease-in-out shrink-0 ',
			isOpen ? 'rotate-180' : 'rotate-0',
		)}
	>
		<path
			d="M0.75 0.750213C0.75 0.750213 2.87066 6.75021 8.25 6.75021C13.6293 6.75021 15.5219 0.750213 15.75 0.750213"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function Collapse({
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
	const { theme, mounted } = useTheme();

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

	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/QA/QA-Dark.png')]"
			: "bg-[url('/assets/QA/QA.png')]";
	}, [theme, mounted]);


	return (
		<div
			className={cn(
				'w-full p-8 rounded-3xl border-2 border-grayscale-03 bg-grayscale-02 relative overflow-hidden',
				className,
			)}
		>
			<div className={cn("bg-contain bg-top-right bg-no-repeat w-[400px] h-[400px] absolute top-0 right-0 z-0", bgUrls)}></div>
			{/* Header/Trigger */}
			<button
				type="button"
				onClick={toggle}
				className={cn(
					'w-full flex items-center justify-between gap-4 z-10 relative',
					headerClassName,
				)}
				aria-expanded={isOpen}
				aria-controls="collapse-content"
			>
				<Text variant="Main/16px/Regular" className='font-bold'>{header}</Text>

				<div className="w-6 h-6 flex items-center justify-center">
					<ChevronIcon isOpen={isOpen} />
				</div>
			</button>

			{/* Content */}
			<div
				id="collapse-content"
				className="overflow-hidden transition-all duration-300 ease-in-out z-10 relative"
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
