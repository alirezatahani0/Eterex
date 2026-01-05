import usePagination, { PaginationItem } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { PaginationType } from '@/types/api';
import { useEffect, useRef } from 'react';
import Text from '@/components/UI/Text';

type PaginationProps = {
	pagination: PaginationType;
	onChange?: (value: number) => void;
};

const Pagination = ({ pagination, onChange }: PaginationProps) => {
	const navRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);
	const posRef = useRef(0);
	const widRef = useRef(0);
	const animatingRef = useRef(false);

	const { items } = usePagination({
		page: pagination.page,
		count: pagination.pageCount,
		onChange(event, page, index) {
			handleClick(page, index);
		},
		hideNextButton: false,
		hidePrevButton: false,
	});

	useEffect(() => {
		const index = items.findIndex((item) => item.page === pagination.page);
		const tabEl = navRef.current?.children[index + 1] as HTMLElement;

		if (tabEl && lineRef.current) {
			const { offsetLeft, offsetWidth } = tabEl;
			lineRef.current.style.left = offsetLeft + 'px';
			lineRef.current.style.width = offsetWidth + 'px';

			posRef.current = offsetLeft;
			widRef.current = offsetWidth;
		}
	}, [items, pagination, pagination.page]);

	const animate = (
		el: HTMLElement,
		props: { left?: number; width?: number },
		duration: number,
		callback?: () => void,
	) => {
		const startLeft = parseFloat(el.style.left) || 0;
		const startWidth = parseFloat(el.style.width) || 0;
		const endLeft = props.left ?? startLeft;
		const endWidth = props.width ?? startWidth;

		const startTime = performance.now();

		const frame = (now: number) => {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const ease = progress; // linear for now

			const currentLeft = startLeft + (endLeft - startLeft) * ease;
			const currentWidth = startWidth + (endWidth - startWidth) * ease;

			if (props.left !== undefined) el.style.left = currentLeft + 'px';
			if (props.width !== undefined) el.style.width = currentWidth + 'px';

			if (progress < 1) requestAnimationFrame(frame);
			else callback?.();
		};

		requestAnimationFrame(frame);
	};

	const handleClick = (page: number, index: number) => {
		if (animatingRef.current) return;

		const button = navRef.current?.children[index] as HTMLElement;

		const position = button?.offsetLeft;
		const width = button?.offsetWidth;
		const line = lineRef.current!;
		const pos = posRef.current;
		const wid = widRef.current;

		animatingRef.current = true;

		const finish = () => {
			posRef.current = position;
			widRef.current = width;
			onChange?.(page);
			animatingRef.current = false;
		};

		if (position >= pos) {
			animate(line, { width: position - pos + width }, 300, () => {
				animate(line, { width: width, left: position }, 150, finish);
			});
		} else {
			animate(
				line,
				{ left: position, width: pos - position + wid },
				300,
				() => {
					animate(line, { width: width }, 150, finish);
				},
			);
		}
	};

	const renderItem = (item: PaginationItem, itemIsSelected: boolean) => {
		switch (item.type) {
			case 'page': {
				return (
					<Text
						variant="Main/16px/Regular"
						className={cn(
							'leading-[23px]!',
							itemIsSelected ? 'text-white' : '',
						)}
					>
						{item.page}
					</Text>
				);
			}
			case 'first': {
				return <Text variant="Main/16px/Regular">اولین</Text>;
			}
			case 'last': {
				return <Text variant="Main/16px/Regular">آخرین</Text>;
			}
			case 'next': {
				return (
					<div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-grayscale-03">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M14.5703 17.1437L9.42746 12.0008L14.5703 6.85797"
								stroke="#294BFF"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				);
			}
			case 'previous': {
				return (
					<div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-grayscale-03">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M9.42969 6.85631L14.5725 11.9992L9.42969 17.142"
								stroke="#294BFF"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				);
			}
			case 'end-ellipsis':
			case 'start-ellipsis': {
				return <Text variant="Main/16px/Regular">...</Text>;
			}
		}
	};

	if (pagination.pageCount === 1) return null;

	return (
		<div
			ref={navRef}
			data-testid="tabs-container"
			className={cn(
				'relative w-fit h-12 p-1 flex items-center justify-between gap-3 ',
			)}
			style={{ userSelect: 'none' }}
		>
			<div
				ref={lineRef}
				data-testid="tabs-indicator"
				className={cn('absolute h-10')}
				style={{ left: 0, width: 0 }}
			/>
			{items.map((item, index) => (
				<button
					key={index}
					disabled={item.disabled}
					data-testid={`pagination-button-${index}`}
					onClick={item.onClick}
					className={cn(
						'relative z-10 flex justify-center rounded-full items-center whitespace-nowrap min-w-12 h-12 cursor-pointer',
						item.selected ? 'bg-brand-primary' : '',
					)}
				>
					{renderItem(item, item.selected)}
				</button>
			))}
		</div>
	);
};

export default Pagination;
