'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function DownloadContent() {
	const { Download: download } = useTranslation();
	const { theme, mounted } = useTheme();

	const [device, setDevice] = useState<'android' | 'ios'>('android');
	const { DownloadAppSection, common } = useTranslation();

	const baseStyle = 'bg-[#4D6CFF] border border-[#ffffff3d]';
	const activeStyle = 'bg-[#fff] border border-[#ffffff3d]';

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/Download/Header-Dark.png')] md:bg-[url('/assets/Download/Header-MD-Dark.png')] lg:bg-[url('/assets/Download/Header-LG-Dark.png')] 2xl:bg-[url('/assets/Download/Header-XL-Dark.png')] "
			: "bg-[url('/assets/Download/Header.png')] md:bg-[url('/assets/Download/Header-MD.png')] lg:bg-[url('/assets/Download/Header-LG.png')] 2xl:bg-[url('/assets/Download/Header-XL.png')] ";
	}, [theme, mounted]);

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[200px] md:h-[240px] lg:h-[291px] 2xl:h-[320px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text variant="Main/32px/Black" gradient="primary" className="mb-4">
					{download.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{download.subtitle.prefix}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{download.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{download.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				<div className="bg-[url('/assets/DownloadApp/Mobile.png')] md:bg-[url('/assets/DownloadApp/Tablet.png')] lg:bg-[url('/assets/Download/Frame.png')] xl:bg-[url('/assets/Download/Frame-LG.png')] bg-cover bg-center bg-no-repeat h-[700px] md:h-[644px] lg:h-[840px] 2xl:h-[1200px] pt-12 px-7 flex flex-col items-center mb-[120px]">
					<div className="border-2 border-[#ffffff3d] rounded-4xl p-2 max-w-[400px] bg-[#2649FF] h-16 flex flex-row items-center justify-center gap-4 mb-10">
						<div
							className={cn(
								' p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
								device === 'android' ? activeStyle : baseStyle,
							)}
							onClick={() => setDevice('android')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M10.5 18.5V21C10.5 21.2739 10.2739 21.5 10 21.5C9.72614 21.5 9.5 21.2739 9.5 21V18.5H10.5Z"
									fill={device === 'android' ? 'black' : 'white'}
									stroke={device === 'android' ? 'black' : 'white'}
								/>
								<path
									d="M14.5 18.5V21C14.5 21.2739 14.2739 21.5 14 21.5C13.7261 21.5 13.5 21.2739 13.5 21V18.5H14.5Z"
									fill={device === 'android' ? 'black' : 'white'}
									stroke={device === 'android' ? 'black' : 'white'}
								/>
								<path
									d="M9 9.5H15C15.8239 9.5 16.5 10.1761 16.5 11V16C16.5 16.8239 15.8239 17.5 15 17.5H9C8.17614 17.5 7.5 16.8239 7.5 16V11C7.5 10.1761 8.17614 9.5 9 9.5Z"
									fill={device === 'android' ? 'black' : 'white'}
									stroke={device === 'android' ? 'black' : 'white'}
								/>
								<path
									d="M5 11V15C5 15.55 4.55 16 4 16C3.45 16 3 15.55 3 15V11C3 10.45 3.45 10 4 10C4.55 10 5 10.45 5 11Z"
									fill={device === 'android' ? 'black' : 'white'}
								/>
								<path
									d="M21 11V15C21 15.55 20.55 16 20 16C19.45 16 19 15.55 19 15V11C19 10.45 19.45 10 20 10C20.55 10 21 10.45 21 11Z"
									fill={device === 'android' ? 'black' : 'white'}
								/>
								<path
									d="M9.59998 7.60001H14.4C15.28 7.60001 16 6.88 16 6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6C8 6.88 8.71998 7.60001 9.59998 7.60001Z"
									fill={device === 'android' ? 'black' : 'white'}
								/>
							</svg>
							<Text
								variant="Main/14px/SemiBold"
								color={device === 'android' ? 'text-black!' : 'text-white!'}
								className="leading-5 font-medium"
							>
								{common.android}
							</Text>
						</div>{' '}
						<div
							className={cn(
								'p-3 flex flex-row items-center justify-center gap-2 rounded-4xl w-[146px]',
								device === 'ios' ? activeStyle : baseStyle,
							)}
							onClick={() => setDevice('ios')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M16.0498 7.5C17.0551 7.5 18.1539 7.98646 19.0303 8.88281C16.0919 10.995 16.614 15.465 19.6973 17.0391C19.3781 17.7384 19.1568 18.1609 18.6816 18.8857L18.6807 18.8877C18.2742 19.5122 17.8051 20.1758 17.2754 20.6836C16.7417 21.1952 16.2049 21.4925 15.6631 21.5H15.6611C15.1954 21.5078 14.9078 21.3752 14.4863 21.1846L14.4844 21.1836C13.9842 20.959 13.3813 20.6695 12.3398 20.6797C11.3038 20.6797 10.6956 20.9545 10.1875 21.1826C9.75616 21.3732 9.45705 21.508 8.97852 21.5H8.97754C8.43371 21.4924 7.91398 21.2207 7.40527 20.752C6.89652 20.2832 6.4437 19.6589 6.03906 19.0371C4.9371 17.3432 4.32928 15.5094 4.16602 13.8457C4.00203 12.1738 4.28913 10.7174 4.91895 9.74121L4.91992 9.74219C5.85423 8.29909 7.29776 7.50009 8.58984 7.5C9.29236 7.5 9.85758 7.6988 10.4707 7.91992L10.4717 7.9209C11.0192 8.11644 11.6298 8.33984 12.3301 8.33984C12.9941 8.33984 13.5248 8.13452 14.0176 7.94727L14.0215 7.94629C14.6002 7.72069 15.1877 7.50005 16.0498 7.5Z"
									fill={device === 'ios' ? 'black' : 'white'}
									stroke={device === 'ios' ? 'black' : 'white'}
								/>
								<path
									d="M15.3691 2.58984C15.3331 3.34408 15.0011 4.08237 14.5654 4.64355L14.5635 4.64551C14.1025 5.24531 13.3634 5.71476 12.6309 5.83789C12.6491 5.10718 13.0007 4.36061 13.4561 3.80664C13.9319 3.24034 14.6734 2.7813 15.3691 2.58984Z"
									fill={device === 'ios' ? 'black' : 'white'}
									stroke={device === 'ios' ? 'black' : 'white'}
								/>
							</svg>
							<Text
								variant="Main/14px/SemiBold"
								color={device === 'ios' ? 'text-black!' : 'text-white!'}
								className="leading-5 font-medium"
							>
								{common.ios}
							</Text>
						</div>
					</div>
					<div
						className={cn(
							'gap-4 grid grid-cols-2 w-full lg:max-w-[800px]',
							device === 'android' ? 'md:grid-cols-2' : 'md:grid-cols-3',
						)}
					>
						{device === 'android' && (
							<>
								<DownloadButton
									href={DownloadAppSection.bazar}
									icon={
										<Image
											src="/assets/Download/bazar.png"
											alt="Bazar"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.bazar}
								/>
								<DownloadButton
									href={DownloadAppSection.myket}
									icon={
										<Image
											src="/assets/Download/myket.png"
											alt="Myket"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.myket}
								/>
								<DownloadButton
									href={DownloadAppSection.direct}
									icon={
										<Image
											src="/assets/Download/direct.png"
											alt="Direct"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.direct}
								/>
								<DownloadButton
									href={DownloadAppSection.googlePlay}
									icon={
										<Image
											src="/assets/Download/googlePlay.png"
											alt="GooglePlay"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.googlePlay}
								/>
							</>
						)}
						{device === 'ios' && (
							<>
								<DownloadButton
									href={DownloadAppSection.appStar}
									icon={
										<Image
											src="/assets/Download/appStar.png"
											alt="AppStar"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.appStar}
								/>
								<DownloadButton
									href={DownloadAppSection.iapps}
									icon={
										<Image
											src="/assets/Download/iapps.png"
											alt="Iapps"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.iapps}
								/>
								<DownloadButton
									href={DownloadAppSection.pwa}
									icon={
										<Image
											src="/assets/Download/direct.png"
											alt="Web"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.pwa}
								/>
								<DownloadButton
									href={DownloadAppSection.sibapp}
									icon={
										<Image
											src="/assets/Download/sibapp.png"
											alt="Sibapp"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.sibapp}
								/>
								<DownloadButton
									href={DownloadAppSection.sibirani}
									icon={
										<Image
											src="/assets/Download/sibirani.png"
											alt="Sibirani"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.sibirani}
								/>
								<DownloadButton
									href={DownloadAppSection.sibche}
									icon={
										<Image
											src="/assets/Download/sibche.png"
											alt="Sibche"
											width={20}
											height={20}
											className="w-5 h-5"
										/>
									}
									label={DownloadAppSection.sibche}
								/>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}

// Download Button Components
interface DownloadButtonProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	downloadLabel?: string;
	variant?: 'mobile' | 'desktop';
}

const DownloadButton = ({ href, icon, label }: DownloadButtonProps) => {
	return (
		<Link
			href={href}
			className="h-12 pl-4 pr-3 flex flex-row gap-2 items-center justify-center bg-white rounded-[40px]"
		>
			{icon}
			<Text variant="Main/14px/Bold" color="text-[#000]! text-[12px]!">
				{label}
			</Text>
		</Link>
	);
};
