'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/UI/Container';
import Text from '@/components/UI/Text';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/** Ordered by length desc so longer phrases match first */
const PHRASE_LINKS: { phrase: string; href: string; external?: boolean }[] = [
	{
		phrase: 'بازار ارز دیجیتال',
		href: 'https://eterex.com/market',
		external: true,
	},
];

/** Coin name (Persian) + (SYMBOL) or standalone → /coin/symbol. Longer phrases first. */
const COIN_LINKS: { phrase: string; symbol: string }[] = [
	{ phrase: 'بیت\u200cکوین (BTC)', symbol: 'btc' },
	{ phrase: 'اتریوم (ETH)', symbol: 'eth' },
	{ phrase: 'تتر (USDT)', symbol: 'usdt' },
	{ phrase: 'ترون (TRX)', symbol: 'trx' },
	{ phrase: 'شیبا (SHIB)', symbol: 'shib' },
	{ phrase: 'کیک (CAKE)', symbol: 'cake' },
	{ phrase: 'سولانا (SOL)', symbol: 'sol' },
	{ phrase: 'پپه (PEPE)', symbol: 'pepe' },
	{ phrase: 'فت (FET)', symbol: 'fet' },
	{ phrase: 'چیلیز (CHZ)', symbol: 'chz' },
	{ phrase: 'ای سی پی (ICP)', symbol: 'icp' },
	{ phrase: 'کارتسی (CTSI)', symbol: 'ctsi' },
	{ phrase: 'بیت کوین', symbol: 'btc' },
	{ phrase: 'اتریوم', symbol: 'eth' },
	{ phrase: 'تتر', symbol: 'usdt' },
];

const ALL_LINKS = [
	...PHRASE_LINKS.map(({ phrase, href, external }) => ({
		phrase,
		href,
		external,
	})),
	...COIN_LINKS.map(({ phrase, symbol }) => ({
		phrase,
		href: `/coin/${symbol}`,
		external: false,
	})),
].sort((a, b) => b.phrase.length - a.phrase.length);

function parseDescriptionWithLinks(
	description: string,
	blockIndex: number,
): (string | React.ReactElement)[] {
	const segments: (string | React.ReactElement)[] = [];
	let remaining = description;
	let linkSeq = 0;

	while (remaining.length > 0) {
		let earliestIndex = -1;
		let matchedPhrase: string | null = null;
		let matchedHref: string | null = null;
		let matchedExternal: boolean = false;

		for (const { phrase, href, external } of ALL_LINKS) {
			const idx = remaining.indexOf(phrase);
			if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
				earliestIndex = idx;
				matchedPhrase = phrase;
				matchedHref = href;
				matchedExternal = external ?? false;
			}
		}

		if (
			matchedPhrase === null ||
			matchedHref === null ||
			earliestIndex === -1
		) {
			segments.push(remaining);
			break;
		}

		if (earliestIndex > 0) {
			segments.push(remaining.slice(0, earliestIndex));
		}
		const key = `kw-b${blockIndex}-${linkSeq++}`;
		segments.push(
			matchedExternal ? (
				<Link
					key={key}
					href={matchedHref}
					target="_blank"
					rel="noopener noreferrer"
					className="text-brand-primary hover:opacity-90"
				>
					{matchedPhrase}
				</Link>
			) : (
				<Link
					key={key}
					href={matchedHref}
					className="text-brand-primary hover:opacity-90"
				>
					{matchedPhrase}
				</Link>
			),
		);
		remaining = remaining.slice(earliestIndex + matchedPhrase.length);
	}

	return segments;
}

// Chevron Icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={cn(
			'transition-transform duration-300 ease-in-out shrink-0 text-brand-primary',
			isOpen ? 'rotate-180' : 'rotate-0',
		)}
	>
		<path
			d="M6 9L12 15L18 9"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const H1_TITLE = 'دانلود اپلیکیشن اتراکس؛ روش آسان خرید ارز دیجیتال';

const H1_INTRO =
	'اپلیکیشن رسمی صرافی ارز دیجیتال اتراکس، ایمن‌ترین صرافی با رابط کاربری بسیار آسان برای خرید و فروش ارز دیجیتال در ایران است. با اپلیکیشن اتراکس شما می‌توانید در هر لحظه و هر مکانی قیمت لحظه‌ای ارزهای دیجیتال مانند بیت کوین (BTC)، اتریوم (ETH)، تتر (USDT) و بیش از ۴۰۰ رمزارز دیگر را مشاهده کنید و فقط با چند کلیک ساده معامله کنید.\n\nبا اپلیکیشن اتراکس شما بی‌نیاز از سیستم‌های پیچیده می‌شوید و آسان ترین روش خرید ارز دیجیتال با گوشی موبایل یا از طریق کامپیوتر برای شما مهیاست.';

const KEYWORD_POOL_BLOCKS: {
	title: string;
	description: string;
	isH3?: boolean;
}[] = [
	{
		title: 'خرید و فروش ارز دیجیتال فقط با چند کلیک!',
		description:
			'اپلیکیشن صرافی اتراکس برای آن دسته از کاربرانی ساخته شده است که به دنبال سرعت، امنیت و راحتی هستند.',
	},
	{
		title: 'با اپلیکیشن اتراکس قادر به چه کارهایی هستید:',
		description:
			'خرید بیت کوین، خرید اتریوم و خرید تتر با کارت بانکی\nفروش سریع ارز دیجیتال و تبدیل مستقیم به تومان\nمشاهده قیمت لحظه‌ای ارز دیجیتال به همراه نمودار تریدینگ‌ویو به‌صورت ۲۴ ساعته\nمدیریت سرمایه در کیف پول امن اتراکس',
		isH3: true,
	},
	{
		title: 'قیمت لحظه‌ای ارز دیجیتال در جیب شما',
		description:
			'بازار ارز دیجیتال همیشه در حال تغییر است. اپلیکیشن اتراکس به شما کمک می‌کند در هر لحظه قیمت‌ها را بررسی کرده و بهترین تصمیم را بگیرید.\n\nاز قیمت بیت کوین امروز گرفته تا قیمت اتریوم و تتر، همه چیز به‌صورت لحظه‌ای در دسترس شماست.',
	},
	{
		title: 'اپلیکیشن صرافی ایرانی معتبر؛ سریع، امن و همیشه در دسترس',
		description:
			'با اپلیکیشن اتراکس، شما به یک صرافی ایرانی معتبر دسترسی دارید که اولویت آن امنیت بالا، کارمزد پایین و پشتیبانی ۲۴ ساعته و به طور کلی آسودگی و اعتماد کاربران خود است.\n\nفرقی نمی‌کند تازه‌کار هستید یا حرفه‌ای! اپلیکیشن اتراکس مناسب‌ترین و ایده‌آل‌ترین انتخاب برای شماست.',
	},
	{
		title: 'همین حالا اپلیکیشن اتراکس را دانلود کنید.',
		description:
			'وقت آن است که وارد دنیای ارزهای دیجیتال شوید! همین حالا اپلیکیشن خرید و فروش ارز دیجیتال اتراکس را دانلود کنید، پس از ثبت‌نام با چند کلیک اولین معامله رمزارزی خود را انجام دهید.',
	},
];

export default function KeywordPool() {
	const [isOpen, setIsOpen] = useState(false);
	const [height, setHeight] = useState<number | string>(0);
	const contentRef = useRef<HTMLDivElement>(null);

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

	return (
		<Container className={'w-full mb-40 relative'}>
			{/* H1 + intro (always visible) */}
			<div className="space-y-4">
				<Text
					variant="Main/20px/Bold"
					gradient="primary"
					className="block font-bold"
					type="h1"
				>
					{H1_TITLE}
				</Text>
				<Text
					variant="LongText/14px/Regular"
					className="text-grayscale-06! whitespace-pre-line"
				>
					<>{parseDescriptionWithLinks(H1_INTRO, -1)}</>
				</Text>
			</div>
			{/* Fade overlay: transparent at top → solid at bottom (only when collapsed) */}
			<div
				className={cn(
					'absolute top-0 left-0 right-0 h-[calc(100%-24px)] pointer-events-none transition-opacity duration-300',
					isOpen ? 'opacity-0' : 'opacity-100',
				)}
				aria-hidden
				style={{
					background:
						'linear-gradient(to bottom, transparent 0%, var(--color-grayscale-01) 100%)',
				}}
			/>
			{/* Content with bottom fade overlay when collapsed */}
			<div
				id="collapse-content"
				className="overflow-hidden transition-all duration-500 ease-in-out"
				style={{
					height: typeof height === 'number' ? `${height}px` : height,
					opacity: isOpen ? 1 : 0,
				}}
			>
				<div ref={contentRef} className="flex flex-col gap-6 mt-6">
					{KEYWORD_POOL_BLOCKS.map((block, index) => (
						<div key={index} className="space-y-2">
							<Text
								variant={
									block.isH3 ? 'Main/14px/SemiBold' : 'Main/16px/Regular'
								}
								gradient="primary"
								className="block font-bold"
								type={block.isH3 ? 'h3' : 'h2'}
							>
								{block.title}
							</Text>
							<Text
								variant="LongText/14px/Regular"
								className="text-grayscale-06! whitespace-pre-line"
							>
								<>{parseDescriptionWithLinks(block.description, index)}</>
							</Text>
						</div>
					))}
				</div>
			</div>
			{/* Trigger */}
			<div
				className="flex flex-row w-full items-center justify-center mt-4 "
				onClick={toggle}
			>
				<Text variant="Main/14px/Bold" className="block">
					{isOpen ? 'نمایش کمتر' : 'نمایش بیشتر'}
				</Text>
				<ChevronIcon isOpen={isOpen} />
			</div>
		</Container>
	);
}
