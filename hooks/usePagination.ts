'use client';

import useControlled from './useControlled';
import { MouseEvent } from 'react';

type PaginationItemType =
	| 'page'
	| 'first'
	| 'previous'
	| 'next'
	| 'last'
	| 'start-ellipsis'
	| 'end-ellipsis';

export interface UsePaginationProps {
	boundaryCount?: number;
	componentName?: string;
	count?: number;
	defaultPage?: number;
	disabled?: boolean;
	hideNextButton?: boolean;
	hidePrevButton?: boolean;
	onChange?: (
		event: MouseEvent<HTMLButtonElement>,
		page: number,
		index: number,
	) => void;
	page?: number;
	showFirstButton?: boolean;
	showLastButton?: boolean;
	siblingCount?: number;
	[key: string]: unknown; // for other props
}

export interface PaginationItem {
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	type: PaginationItemType;
	page: number | null;
	selected: boolean;
	disabled: boolean;
	'aria-current'?: 'page';
}

export default function usePagination(props: UsePaginationProps = {}) {
	const {
		boundaryCount = 1,
		componentName = 'usePagination',
		count = 1,
		defaultPage = 1,
		disabled = false,
		hideNextButton = false,
		hidePrevButton = false,
		onChange: handleChange,
		page: pageProp,
		showFirstButton = false,
		showLastButton = false,
		siblingCount = 1,
		...other
	} = props;

	const [page, setPageState] = useControlled({
		controlled: pageProp,
		default: defaultPage,
		name: componentName,
		state: 'page',
	});

	const handleClick = (
		event: MouseEvent<HTMLButtonElement>,
		value: number | null,
		index: number,
	) => {
		if (!pageProp && value !== null) {
			setPageState(value);
		}
		if (handleChange && value !== null) {
			handleChange(event, value, index);
		}
	};

	const range = (start: number, end: number) => {
		const length = end - start + 1;
		return Array.from({ length }, (_, i) => start + i);
	};

	const startPages = range(1, Math.min(boundaryCount, count));
	const endPages = range(
		Math.max(count - boundaryCount + 1, boundaryCount + 1),
		count,
	);

	const siblingsStart = Math.max(
		Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
		boundaryCount + 2,
	);

	const siblingsEnd = Math.min(
		Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
		count - boundaryCount - 1,
	);

	//@ts-expect-error TODO
	const itemList: (number | PaginationItemType)[] = [
		...(showFirstButton ? ['first'] : []),
		...(hidePrevButton ? [] : ['previous']),
		...startPages,
		...(siblingsStart > boundaryCount + 2
			? ['start-ellipsis']
			: boundaryCount + 1 < count - boundaryCount
			? [boundaryCount + 1]
			: []),
		...range(siblingsStart, siblingsEnd),
		...(siblingsEnd < count - boundaryCount - 1
			? ['end-ellipsis']
			: count - boundaryCount > boundaryCount
			? [count - boundaryCount]
			: []),
		...endPages,
		...(hideNextButton ? [] : ['next']),
		...(showLastButton ? ['last'] : []),
	];

	const buttonPage = (type: PaginationItemType): number | null => {
		switch (type) {
			case 'first':
				return 1;
			case 'previous':
				return page - 1;
			case 'next':
				return page + 1;
			case 'last':
				return count;
			default:
				return null;
		}
	};

	const items: PaginationItem[] = itemList.map((item, index) => {
		if (typeof item === 'number') {
			return {
				onClick: (event) => handleClick(event, item, index + 1),
				type: 'page',
				page: item,
				selected: item === page,
				disabled,
				'aria-current': item === page ? 'page' : undefined,
			};
		}

		return {
			onClick: (event) => handleClick(event, buttonPage(item), index + 1),
			type: item,
			page: buttonPage(item),
			selected: false,
			disabled:
				disabled ||
				(!item.includes('ellipsis') &&
					(item === 'next' || item === 'last' ? page >= count : page <= 1)),
		};
	});

	return {
		items,
		...other,
	};
}
