import { cn } from '@/lib/utils';
import React from 'react';

type SkeletonProps = {
	className?: string;
	style?: React.CSSProperties;
};

const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => {
	return (
		<div
			className={cn(
				'animate-pulse bg-gray-200 dark:bg-gray-400 rounded',
				className,
			)}
			style={style}
		/>
	);
};

export default Skeleton;
