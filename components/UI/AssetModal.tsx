'use client';

import { useEffect, useCallback } from 'react';

type AssetModalProps = {
	isOpen: boolean;
	onClose: () => void;
	type: 'pdf' | 'image';
	src: string;
	title?: string;
};

export default function AssetModal({
	isOpen,
	onClose,
	type,
	src,
	title,
}: AssetModalProps) {
	const handleEscape = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		},
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	}, [isOpen, handleEscape]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	if (!isOpen) return null;

	const preventDownload = (e: React.MouseEvent | React.DragEvent | React.ClipboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div
			className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-label={title}
		>
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
				aria-label="بستن"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<div
				className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white dark:bg-grayscale-02"
				onContextMenu={preventDownload}
				onDragStart={preventDownload}
			>
				{type === 'pdf' ? (
					<iframe
						src={`${src}#toolbar=0&navpanes=0`}
						title={title ?? 'PDF'}
						className="min-h-[80vh] w-full min-w-[min(90vw,600px)] border-0"
						style={{ pointerEvents: 'auto' }}
					/>
				) : (
					<div
						className="relative h-[80vh] min-h-[200px] w-full min-w-[min(90vw,600px)] max-w-4xl select-none"
						style={{
							userSelect: 'none',
							WebkitUserSelect: 'none',
							WebkitUserDrag: 'none',
							pointerEvents: 'auto',
						} as React.CSSProperties}
						onContextMenu={preventDownload}
						onDragStart={preventDownload}
						onCopy={preventDownload}
						onCut={preventDownload}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={src}
							alt={title ?? ''}
							className="absolute inset-0 h-full w-full object-contain"
							draggable={false}
							onContextMenu={preventDownload}
							onDragStart={preventDownload}
							referrerPolicy="no-referrer"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
