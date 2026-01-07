'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState } from 'react';
import Image from 'next/image';

export default function CoinPageContent() {
	const { coin, common } = useTranslation();
	const params = useParams();
	const { theme, mounted } = useTheme();
	const [buyOrSell, setBuyOrSell] = useState<'buy' | 'sell'>('buy');

	const symbol = params?.symbol ?? '';

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/Download/Header-Dark.png')] md:bg-[url('/assets/Download/Header-MD-Dark.png')] lg:bg-[url('/assets/Download/Header-LG-Dark.png')] 2xl:bg-[url('/assets/Download/Header-XL-Dark.png')] "
			: "bg-[url('/assets/Download/Header.png')] md:bg-[url('/assets/Download/Header-MD.png')] lg:bg-[url('/assets/Download/Header-LG.png')] 2xl:bg-[url('/assets/Download/Header-XL.png')] ";
	}, [theme, mounted]);

	const baseStyle = 'bg-[#4D6CFF] border border-[#ffffff3d]';
	const activeStyle = 'bg-[#fff] border border-[#ffffff3d]';

	return (
		<div className="flex flex-col gap-8">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[200px] md:h-[240px] lg:h-[291px] 2xl:h-[320px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center',
					bgUrls,
				)}
			>
				<div className="flex flex-row items-center gap-6 justify-center">
					{/* Title */}
					<Text variant="Main/32px/Black" gradient="primary">
						{String(symbol).toUpperCase()}
					</Text>

					<div className="w-14 h-20 flex items-start justify-start pt-2">
						<Image
							src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${String(
								symbol,
							).toLowerCase()}_.svg`}
							width={56}
							height={56}
							alt={String(symbol) ?? 'Coin'}
						/>
					</div>
				</div>

				<div className="flex flex-row-reverse items-center justify-center gap-3">
					<div className="flex flex-row items-center justify-center gap-3">
						<Text variant="Main/24px/Bold" gradient="grayscale">
							۹۹,۵۰۰
						</Text>
						<Text variant="Main/16px/Regular" gradient="grayscale">
							تومان
						</Text>
					</div>
					<div>
						<Text
							variant="Main/20px/Bold"
							className="font-normal"
							gradient="grayscale"
						>
							=
						</Text>
					</div>
					<div className="flex flex-row items-center justify-center gap-3">
						<Text variant="Main/16px/Regular" gradient="grayscale">
							{String(symbol).toUpperCase()}
						</Text>
						<Text variant="Main/24px/Bold" gradient="grayscale">
							1
						</Text>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
				<div>
					<Image
						src="/Frame.png"
						width={700}
						height={400}
						alt="chart"
						className="w-full"
					/>
				</div>
				<div className="bg-brand-primary rounded-[40px] p-8 flex flex-col items-center justify-start">
					<div className="border-2 border-[#ffffff3d] rounded-4xl p-2 max-w-[400px] bg-[#2649FF] h-16 flex flex-row items-center justify-center gap-4 mb-10">
						<div
							className={cn(
								'p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
								buyOrSell === 'buy' ? activeStyle : baseStyle,
							)}
							onClick={() => setBuyOrSell('buy')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="19"
								viewBox="0 0 20 19"
								fill="none"
								className={
									buyOrSell === 'buy'
										? '[&>path]:stroke-black'
										: '[&>path]:stroke-white'
								}
							>
								<path
									d="M0.75 18.2013H18.1341"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8.5502 1.81204L2.38195 7.98035C0.890473 9.47185 1.01111 11.4643 2.50649 12.9597L6.5402 16.9944C8.0356 18.4897 10.0232 18.6143 11.5206 17.1179L17.6879 10.9506C19.1852 9.45335 19.0597 7.46566 17.5643 5.97029L13.5296 1.9356C12.0343 0.440228 10.0466 0.315698 8.5502 1.81204Z"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M3.19727 13.653L14.2214 2.62891"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9.02344 14.3614L10.8418 12.543"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<Text
								variant="Main/14px/SemiBold"
								color={buyOrSell === 'buy' ? 'text-black!' : 'text-white!'}
								className="leading-5 font-medium"
							>
								{common.buy}
							</Text>
						</div>
						<div
							className={cn(
								' p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
								buyOrSell === 'sell' ? activeStyle : baseStyle,
							)}
							onClick={() => setBuyOrSell('sell')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="19"
								height="20"
								viewBox="0 0 19 20"
								fill="none"
								className={
									buyOrSell === 'sell'
										? '[&>path]:stroke-black'
										: '[&>path]:stroke-white'
								}
							>
								<path
									d="M15.0314 6.9314H3.82483C1.92933 6.9314 0.75 8.26936 0.75 10.162V15.5196C0.75 17.4131 1.92933 18.7501 3.82581 18.7501H15.0314C16.9259 18.7501 18.1053 17.4131 18.1053 15.5196V10.162C18.1053 8.26936 16.9211 6.9314 15.0314 6.9314Z"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M3.84961 9.5918H5.20214"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M15.0048 16.0918H13.6523"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M7.2207 12.8416C7.2207 11.6234 8.20833 10.6357 9.42663 10.6357C10.6448 10.6357 11.6325 11.6234 11.6325 12.8416C11.6325 14.0599 10.6448 15.0476 9.42663 15.0476C8.20833 15.0476 7.2207 14.0599 7.2207 12.8416Z"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.54492 4.08714V2.59546"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.3066 4.08714V2.59546"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9.42578 4.08756V0.75"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<Text
								variant="Main/14px/SemiBold"
								color={buyOrSell === 'sell' ? 'text-black!' : 'text-white!'}
								className="leading-5 font-medium"
							>
								{common.sell}
							</Text>
						</div>
					</div>
					<div className="w-full relative mb-4">
						<input
							id="pairAmount"
							type="number"
							inputMode="decimal"
							min={0}
							className="py-2 pl-6 pr-28 border-2 border-glass-white-24 bg-glass-white-12 backdrop-blur-xl rounded-[40px] text-base text-white placeholder:text-base placeholder:text-white focus:outline-0 text-left! h-[72px] w-full"
							placeholder="مقدار را وارد کنید"
						/>
						<div className="h-8 flex items-center justify-center absolute right-6 top-5 gap-4">
							<Image
								src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/${String(
									symbol,
								).toLowerCase()}_.svg`}
								width={36}
								height={36}
								alt={String(symbol) ?? 'Coin'}
							/>
							<Text variant="Main/16px/Regular" className='text-white!'>
								{String(symbol).toUpperCase()}
							</Text>
						</div>
					</div>
					<div className="w-full relative mb-6">
						<input
							id="pairAmount"
							type="number"
							inputMode="decimal"
							min={0}
							className="py-2 pl-6 pr-28 border-2 border-glass-white-24 bg-glass-white-12 backdrop-blur-xl rounded-[40px] text-base text-white placeholder:text-base placeholder:text-white focus:outline-0 text-left! h-[72px] w-full"
							placeholder="مقدار را وارد کنید"
						/>
						<div className="h-8 flex items-center justify-center absolute right-6 top-5 gap-4">
							<Image
								src={`${process.env.NEXT_PUBLIC_ICON_BASE_URL}/irt_.svg`}
								width={36}
								height={36}
								alt={String(symbol) ?? 'Coin'}
							/>
							<Text variant="Main/16px/Regular" className='text-white!'>
								IRT
							</Text>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
