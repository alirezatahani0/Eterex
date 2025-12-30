'use client';

import { cn } from '@/lib/utils';
import Text from './Text';

interface FeesTableProps {
	headers: string[];
	rows: Record<string, string>[];
	className?: string;
	fieldOrder?: string[];
}

export default function FeesTable({
	headers,
	rows,
	className,
	fieldOrder,
}: FeesTableProps) {
	// Determine field order: use provided fieldOrder or infer from first row
	const getFieldOrder = () => {
		if (fieldOrder) return fieldOrder;
		if (rows.length > 0) {
			return Object.keys(rows[0]);
		}
		return [];
	};

	const orderedFields = getFieldOrder();

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
						{rows.map((row, index) => {
							const isLastRow = index === rows.length - 1;
							return (
								<tr key={index} >
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
													{row[field] || ''}
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
		</div>
	);
}

