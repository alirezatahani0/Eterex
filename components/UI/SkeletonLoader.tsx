import React from 'react';
import Skeleton from './Skeleton';

type SkeletonLoaderProps = {
	avatar?: boolean | { size?: number };
	paragraph?: boolean | { lines?: number };
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
	avatar,
	paragraph,
}) => {
	return (
		<div className="flex items-start space-x-4">
			{/* Avatar */}
			{avatar && (
				<Skeleton
					className="rounded-full shrink-0"
					style={{
						width: typeof avatar === 'object' ? avatar.size ?? 40 : 40,
						height: typeof avatar === 'object' ? avatar.size ?? 40 : 40,
					}}
				/>
			)}

			{/* Paragraph */}
			{paragraph && (
				<div className="flex-1 space-y-2">
					{Array.from({
						length: typeof paragraph === 'object' ? paragraph.lines ?? 3 : 3,
					}).map((_, i) => (
						<Skeleton
							key={i}
							className="h-4"
							style={{ width: `${90 - i * 10}%` }}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SkeletonLoader;
