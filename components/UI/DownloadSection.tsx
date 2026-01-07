'use client';
import { useTranslation } from '@/hooks/useTranslation';
import Text from './Text';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Icons
const AndroidIcon = ({ fill = '#EB9E2A' }: { fill?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M11 18V21C11 21.55 10.55 22 10 22C9.45 22 9 21.55 9 21V18H11Z"
			fill={fill}
		/>
		<path
			d="M15 18V21C15 21.55 14.55 22 14 22C13.45 22 13 21.55 13 21V18H15Z"
			fill={fill}
		/>
		<path
			d="M17 11V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V11C7 9.9 7.9 9 9 9H15C16.1 9 17 9.9 17 11Z"
			fill={fill}
		/>
		<path
			d="M5 11V15C5 15.55 4.55 16 4 16C3.45 16 3 15.55 3 15V11C3 10.45 3.45 10 4 10C4.55 10 5 10.45 5 11Z"
			fill={fill}
		/>
		<path
			d="M21 11V15C21 15.55 20.55 16 20 16C19.45 16 19 15.55 19 15V11C19 10.45 19.45 10 20 10C20.55 10 21 10.45 21 11Z"
			fill={fill}
		/>
		<path
			d="M9.59998 7.60001H14.4C15.28 7.60001 16 6.88 16 6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6C8 6.88 8.71998 7.60001 9.59998 7.60001Z"
			fill={fill}
		/>
	</svg>
);

const IOSIcon = ({ fill = '#EB9E2A' }: { fill?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.0962 19.16C19.6862 18.26 19.9062 17.8 20.3562 16.79C17.0362 15.53 16.5062 10.8 19.7862 8.98999C18.7862 7.72999 17.3762 7 16.0462 7C15.0862 7 14.4262 7.25001 13.8362 7.48001C13.3362 7.67001 12.8862 7.84 12.3262 7.84C11.7262 7.84 11.1962 7.65001 10.6362 7.45001C10.0262 7.23001 9.38616 7 8.58616 7C7.09616 7 5.50616 7.91 4.49616 9.47C3.07616 11.67 3.32616 15.79 5.61616 19.31C6.43616 20.57 7.53616 21.98 8.96616 22C9.56616 22.01 9.95616 21.83 10.3862 21.64C10.8762 21.42 11.4062 21.18 12.3362 21.18C13.2662 21.17 13.7862 21.42 14.2762 21.64C14.6962 21.83 15.0762 22.01 15.6662 22C17.1162 21.98 18.2762 20.42 19.0962 19.16Z"
			fill={fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.8365 2C15.9965 3.1 15.5465 4.19001 14.9565 4.95001C14.3265 5.77001 13.2265 6.41 12.1665 6.37C11.9765 5.31 12.4665 4.21999 13.0665 3.48999C13.7365 2.68999 14.8665 2.07 15.8365 2Z"
			fill={fill}
		/>
	</svg>
);

const WebIcon = ({ fill = '#EB9E2A' }: { fill?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M21.7431 11.07C21.6931 10.56 21.2631 10.18 20.7531 10.18H13.2031C12.6531 10.18 12.2031 10.63 12.2031 11.18V12.89C12.2031 13.44 12.6531 13.89 13.2031 13.89H17.7131C17.6031 14.81 17.0031 16.2 15.6731 17.13C14.8231 17.72 13.6931 18.13 12.2031 18.13C12.1331 18.13 12.0731 18.13 12.0031 18.12C9.45313 18.04 7.29313 16.33 6.51313 13.98C6.30313 13.35 6.18313 12.69 6.18313 12C6.18313 11.31 6.30313 10.64 6.50313 10.02C6.56313 9.83999 6.63313 9.66001 6.71313 9.48001C7.63313 7.41001 9.64313 5.95 12.0031 5.88C12.0631 5.87 12.1331 5.87 12.2031 5.87C13.6331 5.87 14.7031 6.33999 15.4531 6.85999C15.8431 7.12999 16.3631 7.06999 16.7031 6.73999L18.0931 5.38C18.5331 4.95 18.4931 4.21999 17.9931 3.85999C16.4031 2.68999 14.4631 2 12.2031 2C12.1331 2 12.0731 2.00001 12.0031 2.01001C8.17313 2.08001 4.88312 4.30001 3.27312 7.51001C2.59312 8.87001 2.20312 10.39 2.20312 12C2.20312 13.61 2.59312 15.13 3.27312 16.49H3.28313C4.89313 19.7 8.18313 21.92 12.0031 21.99C12.0731 22 12.1331 22 12.2031 22C14.9031 22 17.1731 21.11 18.8231 19.58C20.7131 17.83 21.8031 15.27 21.8031 12.22C21.8031 11.79 21.7831 11.42 21.7431 11.07Z"
			fill={fill}
		/>
	</svg>
);

const DownloadArrowIcon = ({ stroke = 'white' }: { stroke?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M18.3493 15.2422L3.65234 6.75684M3.65234 6.75684L5.37781 13.1964M3.65234 6.75684L10.0919 5.03137"
			stroke={stroke}
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const SparkleIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
	>
		<path
			d="M7.28571 0C7.28571 0 7.68771 3.7521 9.25352 5.31791C10.8193 6.88372 14.5714 7.28571 14.5714 7.28571C14.5714 7.28571 10.8193 7.68771 9.25352 9.25352C7.68771 10.8193 7.28571 14.5714 7.28571 14.5714C7.28571 14.5714 6.88372 10.8193 5.31791 9.25352C3.7521 7.68771 0 7.28571 0 7.28571C0 7.28571 3.7521 6.88372 5.31791 5.31791C6.88372 3.7521 7.28571 0 7.28571 0Z"
			fill="#EB9E2A"
		/>
		<path
			opacity="0.7"
			d="M15 11C15 11 15.1655 12.545 15.8103 13.1897C16.455 13.8345 18 14 18 14C18 14 16.455 14.1655 15.8103 14.8103C15.1655 15.455 15 17 15 17C15 17 14.8345 15.455 14.1897 14.8103C13.545 14.1655 12 14 12 14C12 14 13.545 13.8345 14.1897 13.1897C14.8345 12.545 15 11 15 11Z"
			fill="#808080"
		/>
	</svg>
);

// Download Button Components
interface DownloadButtonProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	downloadLabel?: string;
	variant?: 'mobile' | 'desktop';
}

const DownloadButton = ({
	href,
	icon,
	label,
	downloadLabel,
	variant = 'mobile',
}: DownloadButtonProps) => {
	const { theme } = useTheme();

	if (variant === 'mobile') {
		return (
			<Link
				href={href}
				className="p-5 flex flex-col items-center gap-3 justify-center rounded-3xl bg-white w-full"
			>
				{icon}
				<Text variant="Main/14px/Bold" color="text-[#0F34F4]!">
					{label}
				</Text>
			</Link>
		);
	}

	return (
		<Link
			href={href}
			className="p-6 flex flex-col items-center gap-3 justify-between rounded-3xl bg-grayscale-02-variant"
		>
			<div className="flex flex-row justify-between items-center w-full">
				{icon}
				<DownloadArrowIcon stroke={theme === 'dark' ? 'white' : 'black'} />
			</div>
			<div className="flex flex-col items-start gap-2 w-full">
				{downloadLabel && (
					<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
						{downloadLabel}
					</Text>
				)}
				<Text variant="Main/14px/Bold" className="text-grayscale-07!">
					{label}
				</Text>
			</div>
		</Link>
	);
};

// Badge Component
interface BadgeProps {
	icon: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

const Badge = ({ icon, children, className = '' }: BadgeProps) => (
	<div
		className={`px-4 py-3 flex items-center rounded-3xl w-fit gap-1 ${className}`}
	>
		{icon}
		{children}
	</div>
);

// Mobile/Tablet View
const MobileView = () => {
	const { DownloadAppSection } = useTranslation();

	return (
		<div className="lg:hidden relative bg-brand-primary rounded-[40px] pt-12 px-7 flex flex-col items-center my-[120px]">
			<Text
				variant="Main/24px/Bold"
				type="p"
				className="mb-6"
				color="text-[#fff]!"
			>
				{DownloadAppSection.title}
			</Text>
			<Text
				variant="LongText/14px/Regular"
				color="text-[#fff]!"
				className="mb-10 text-center!"
			>
				{DownloadAppSection.desc}
			</Text>
			<div className="gap-4 grid grid-cols-2 md:grid-cols-3 w-full mb-10">
				<DownloadButton
					href="/download"
					icon={<AndroidIcon />}
					label={DownloadAppSection.android}
				/>
				<DownloadButton
					href="/download"
					icon={<IOSIcon />}
					label={DownloadAppSection.ios}
				/>
				<div className="hidden md:flex w-full">
					<DownloadButton
						href="/download"
						icon={<WebIcon />}
						label={DownloadAppSection.web}
					/>
				</div>
			</div>
			<div className="bg-[url('/assets/main/Vector.avif')] bg-no-repeat bg-center bg-contain absolute top-0 -right-2/5 w-full h-[250px] z-0" />

			<Image
				src="/assets/DownloadApp/MobileFrame.avif"
				alt="download"
				width={270}
				height={350}
				className="min-w-[380px] min-h-[350px] relative -bottom-3 -right-2"
			/>
		</div>
	);
};

// Desktop View - Right Frame
const RightFrame = () => {
	const { DownloadAppSection, common } = useTranslation();

	return (
		<div className="bg-[url('/assets/DownloadApp/RightFrame.avif')] h-[600px] 2xl:h-[696px] bg-contain bg-center bg-no-repeat flex flex-col items-start justify-start gap-10 px-14 py-20 2xl:py-32 2xl:px-20">
			<Badge icon={<SparkleIcon />} className="bg-white">
				<Text variant="Main/14px/Bold" color="text-[#000]!" className="mr-1.5">
					{common.simpler}
				</Text>
				<Text variant="Main/14px/SemiBold" type="p" color="text-[#808080]!">
					{common.thanEver}
				</Text>
			</Badge>

			<div className="flex flex-col items-start gap-6">
				<Text
					variant="Main/24px/Bold"
					type="p"
					className="mb-6"
					color="text-[#fff]!"
				>
					{DownloadAppSection.title}
				</Text>
				<Text
					variant="LongText/14px/Regular"
					color="text-[#fff]!"
					className="mb-10 text-start! max-w-[250px]"
				>
					{DownloadAppSection.desc}
				</Text>
			</div>

			<div>
				<div>
					<Text
						variant="Main/24px/Bold"
						color="text-[#fff]!"
						className="text-[48px]!"
					>
						{DownloadAppSection.Count}
					</Text>
					<Text variant="Main/32px/Black" color="text-[#679AFF]!">
						+
					</Text>
				</div>
				<div className="flex flex-row gap-1 items-center">
					<Text variant="Main/14px/Bold" color="text-[#679AFF]!">
						{DownloadAppSection.successDownload}
					</Text>
					<Text variant="Main/14px/SemiBold" color="text-[#fff]!">
						{common.application}
					</Text>
				</div>
			</div>
		</div>
	);
};

// Desktop View - Left Frame
const LeftFrame = () => {
	const { DownloadAppSection, common } = useTranslation();
	const { theme, mounted } = useTheme();

	const bgUrl = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/DownloadApp/LeftFrameDark.avif')]"
			: "bg-[url('/assets/DownloadApp/LeftFrame.avif')]";
	}, [mounted, theme]);

	return (
		<div
			className={cn(
				'h-[600px] 2xl:h-[696px] bg-contain bg-center bg-no-repeat flex flex-col items-start justify-start px-14 py-20 2xl:py-32 2xl:px-20',
				bgUrl,
			)}
		>
			<Badge icon={<SparkleIcon />} className="bg-grayscale-02-variant mb-9">
				<Text variant="Main/14px/Bold" className="mr-1.5 text-grayscale-05!">
					{common.now}
				</Text>
				<Text variant="Main/14px/SemiBold" color="text-grayscale-07!">
					{common.available}
				</Text>
				<Text variant="Main/14px/Bold" color="text-grayscale-05!">
					{common.yours}
				</Text>
			</Badge>

			<div className="mb-10">
				<Text
					variant="LongText/14px/Regular"
					type="p"
					color="text-grayscale-06!"
				>
					{DownloadAppSection.desc2}
				</Text>
			</div>

			<div className="gap-5 grid grid-cols-3 w-full">
				<DownloadButton
					href="/download"
					icon={<IOSIcon fill={theme === 'dark' ? 'white' : 'black'} />}
					label={DownloadAppSection.ios}
					downloadLabel={common.downlaod}
					variant="desktop"
				/>
				<DownloadButton
					href="/download"
					icon={<AndroidIcon fill={theme === 'dark' ? 'white' : 'black'} />}
					label={DownloadAppSection.android}
					downloadLabel={common.downlaod}
					variant="desktop"
				/>
				<DownloadButton
					href="/download"
					icon={<WebIcon fill={theme === 'dark' ? 'white' : 'black'} />}
					label={DownloadAppSection.web}
					downloadLabel={common.downlaod}
					variant="desktop"
				/>
			</div>
		</div>
	);
};

// Main Component
export const DownloadSection = () => {
	return (
		<>
			<MobileView />
			<div className="hidden lg:grid grid-cols-2 gap-6 my-[120px]">
				<RightFrame />
				<LeftFrame />
			</div>
		</>
	);
};
