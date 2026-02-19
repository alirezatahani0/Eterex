'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Text from './Text';

interface FeesTableProps {
	headers: string[];
	rows: Record<string, string>[];
	className?: string;
	fieldOrder?: string[];
	/** When set, show this many rows per page and render pagination below the table */
	pageSize?: number;
}

export default function FeesTable({
	headers,
	rows,
	className,
	fieldOrder,
	pageSize,
}: FeesTableProps) {
	const [currentPage, setCurrentPage] = useState(0);

	const getFieldOrder = () => {
		if (fieldOrder) return fieldOrder;
		if (rows.length > 0) {
			return Object.keys(rows[0]);
		}
		return [];
	};

	const orderedFields = getFieldOrder();

	const totalPages = pageSize ? Math.ceil(rows.length / pageSize) || 1 : 1;
	const effectivePage = Math.min(currentPage, totalPages - 1);
	const displayRows = useMemo(() => {
		if (!pageSize || rows.length <= pageSize) return rows;
		const start = effectivePage * pageSize;
		return rows.slice(start, start + pageSize);
	}, [rows, pageSize, effectivePage]);

	const isPaginated = Boolean(pageSize && rows.length > pageSize);

	return (
		<div className={cn('overflow-x-auto mt-6', className)}>
			<div className="rounded-[20px] border-2 border-grayscale-03">
				<table className="w-full rounded-[20px]">
					<thead>
						<tr className="bg-glass-gray-11">
							{headers.map((header, index) => (
								<th
									key={index}
									className={cn(
										'px-6 py-4 text-center! border-x-2 border-grayscale-03',
										index === 0 && 'rounded-tr-[20px] border-r-0',
										index === headers.length - 1 &&
											'rounded-tl-[20px] border-l-0',
									)}
								>
									<Text
										variant="LongText/16px/Regular"
										className="text-grayscale-07!"
									>
										{header}
									</Text>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{displayRows.map((row, index) => {
							const isLastRow = index === displayRows.length - 1;
							return (
								<tr key={effectivePage * (pageSize ?? 0) + index}>
									{orderedFields.map((field, cellIndex) => {
										const isFirstCell = cellIndex === 0;
										const isLastCell = cellIndex === orderedFields.length - 1;
										return (
											<td
												key={cellIndex}
												className={cn(
													'px-6 py-4 text-center! border-y-2 border-grayscale-03',
													isFirstCell &&
														'border-l-2 rounded-br-[20px] border-b-0',
													isLastCell &&
														'border-r-2 rounded-bl-[20px] border-b-0',
													!isFirstCell &&
														!isLastCell &&
														'border-x-2 border-b-0',
													isLastRow && 'border-b-0',
												)}
											>
												<Text
													variant="LongText/16px/Regular"
													color="text-grayscale-06!"
												>
													{row[field] ?? ''}
												</Text>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{isPaginated && (
				<div className="flex flex-wrap items-center justify-center gap-2 mt-4">
					<button
						type="button"
						onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
						disabled={effectivePage === 0}
						className="h-10 min-w-10 px-3 rounded-xl border-2 border-grayscale-03 bg-grayscale-02 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grayscale-03 transition-colors"
						aria-label="صفحه قبل"
					>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
							قبلی
						</Text>
					</button>
					<div className="flex items-center justify-center gap-1">
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setCurrentPage(i)}
								className={cn(
									'h-10 min-w-10 rounded-xl border-2 transition-colors flex items-center justify-center',
									i === effectivePage
										? 'border-brand-primary bg-brand-primary-container text-brand-primary'
										: 'border-grayscale-03 bg-grayscale-02 hover:bg-grayscale-03 text-grayscale-07',
								)}
							>
								<Text variant="Main/14px/SemiBold">
									{(i + 1).toLocaleString('fa-IR')}
								</Text>
							</button>
						))}
					</div>
					<button
						type="button"
						onClick={() =>
							setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
						}
						disabled={effectivePage >= totalPages - 1}
						className="h-10 min-w-10 px-3 rounded-xl border-2 border-grayscale-03 bg-grayscale-02 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grayscale-03 transition-colors"
						aria-label="صفحه بعد"
					>
						<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
							بعدی
						</Text>
					</button>
				</div>
			)}
		</div>
	);
}
