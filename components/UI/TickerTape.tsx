import NewsTicker from 'react-advanced-news-ticker';

export interface TickerTapeProps<T = React.ReactNode> {
	items: T[];
	renderItem?: (item: T, index: number) => React.ReactNode;
	speed?: number; // pixels per second
	direction?: 'toLeft' | 'toRight';
	className?: string;
}

export default function TickerTape<T = React.ReactNode>({
	items,
	renderItem,
	speed = 500,
	direction = 'toLeft',
	className = '',
}: TickerTapeProps<T>) {
	if (!items?.length) return null;

	return (
		<NewsTicker
			rowHeight={48}
			maxRows={2}
			speed={600}
			direction={''}
			duration={4000}
			autoStart={true}
			pauseOnHover={false}
			id="myId"
			className="myClassName1 myClassName2"
			style={{ marginTop: 34 }}
		>
			{items.map((item, index) => renderItem?.(item, index))}
		</NewsTicker>
	);
}
