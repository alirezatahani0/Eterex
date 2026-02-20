'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SLOT_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-', '—', ' '];

const SLOT_DURATION_MS = 500;
const DEFAULT_ITEM_HEIGHT_PX = 28;
const DEFAULT_VISIBLE_SLOTS = 5; // show 2 above + center + 2 below (multiple numbers visible like a real slot)

function SlotColumn({
	char,
	className,
	durationMs,
	itemHeight,
	visibleSlots,
}: {
	char: string;
	className?: string;
	durationMs?: number;
	itemHeight: number;
	visibleSlots: number;
}) {
	const normalizedChar = char === '' || char === ' ' ? ' ' : char;
	const charIndex = SLOT_CHARS.indexOf(normalizedChar);
	// Build strip: 3 full loops so we can scroll to any char and have context above/below
	const strip = [...SLOT_CHARS, ...SLOT_CHARS, ...SLOT_CHARS];
	const blockSize = SLOT_CHARS.length;
	const centerStripIndex = blockSize + charIndex; // middle block + offset to current char
	// Position strip so strip[centerStripIndex] is in the visual center of the window
	const centerOffset = ((visibleSlots - 1) / 2) * itemHeight;
	const targetTranslate = centerOffset - centerStripIndex * itemHeight;

	const [offset, setOffset] = useState(targetTranslate);

	useEffect(() => {
		setOffset(targetTranslate);
	}, [targetTranslate]);

	const windowHeight = visibleSlots * itemHeight;

	return (
		<div
			className="overflow-hidden flex flex-col items-center justify-center min-w-[1ch]"
			style={{ height: windowHeight }}
		>
			<div
				className="flex flex-col items-center transition-transform ease-out"
				style={{
					transform: `translateY(${offset}px)`,
					transitionDuration: `${durationMs ?? SLOT_DURATION_MS}ms`,
				}}
			>
				{strip.map((c, i) => (
					<div
						key={`${c}-${i}`}
						className="flex items-center justify-center shrink-0 w-full"
						style={{ height: itemHeight }}
					>
						<span className={cn('tabular-nums', className)}>{c}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export interface SlotMachineNumberProps {
	value: string;
	className?: string;
	durationMs?: number;
	/** When true, render as plain text (no slot effect) for loading/empty */
	plain?: boolean;
	/** Height of each slot row in px */
	itemHeight?: number;
	/** Number of slot rows visible in the window (e.g. 5 = 2 above + center + 2 below) */
	visibleSlots?: number;
}

export default function SlotMachineNumber({
	value,
	className,
	durationMs = SLOT_DURATION_MS,
	plain = false,
	itemHeight = DEFAULT_ITEM_HEIGHT_PX,
	visibleSlots = DEFAULT_VISIBLE_SLOTS,
}: SlotMachineNumberProps) {
	const chars = value.split('');

	if (plain) {
		return <span className={cn('tabular-nums', className)}>{value}</span>;
	}

	return (
		<div className="inline-flex items-center justify-center gap-0">
			{chars.map((char, i) => (
				<SlotColumn
					key={i}
					char={char}
					className={className}
					durationMs={durationMs}
					itemHeight={itemHeight}
					visibleSlots={visibleSlots}
				/>
			))}
		</div>
	);
}
