import { useTranslation } from '@/hooks/useTranslation';
import Text from './Text';
import Link from 'next/link';

export const DownloadSection = () => {
	const { DownloadAppSection, common } = useTranslation();

	return (
		<>
			<div className='lg:hidden bg-[url("/assets/DownloadApp/Mobile.png")] md:bg-[url("/assets/DownloadApp/Tablet.png")] bg-cover bg-center bg-no-repeat h-[700px] md:h-[650px] pt-12 px-7 flex flex-col items-center my-[120px]'>
				<Text
					variant="Main/24px/Bold"
					type="p"
					className="mb-6 "
					color="text-[#fff]! "
				>
					{DownloadAppSection.title}
				</Text>
				<Text
					variant="LongText/14px/Regular"
					color="text-[#fff]!"
					className="mb-10 text-center! "
				>
					{DownloadAppSection.desc}
				</Text>
				<div className="gap-4 grid grid-cols-2 md:grid-cols-3 w-full">
					<Link
						href={DownloadAppSection.android}
						className="p-5 flex flex-col items-center gap-3 justify-center rounded-3xl bg-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M11 18V21C11 21.55 10.55 22 10 22C9.45 22 9 21.55 9 21V18H11Z"
								fill="#EB9E2A"
							/>
							<path
								d="M15 18V21C15 21.55 14.55 22 14 22C13.45 22 13 21.55 13 21V18H15Z"
								fill="#EB9E2A"
							/>
							<path
								d="M17 11V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V11C7 9.9 7.9 9 9 9H15C16.1 9 17 9.9 17 11Z"
								fill="#EB9E2A"
							/>
							<path
								d="M5 11V15C5 15.55 4.55 16 4 16C3.45 16 3 15.55 3 15V11C3 10.45 3.45 10 4 10C4.55 10 5 10.45 5 11Z"
								fill="#EB9E2A"
							/>
							<path
								d="M21 11V15C21 15.55 20.55 16 20 16C19.45 16 19 15.55 19 15V11C19 10.45 19.45 10 20 10C20.55 10 21 10.45 21 11Z"
								fill="#EB9E2A"
							/>
							<path
								d="M9.59998 7.60001H14.4C15.28 7.60001 16 6.88 16 6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6C8 6.88 8.71998 7.60001 9.59998 7.60001Z"
								fill="#EB9E2A"
							/>
						</svg>
						<Text variant="Main/14px/Bold" color="text-[#0F34F4]!">
							{DownloadAppSection.android}
						</Text>
					</Link>
					<Link
						href={DownloadAppSection.ios}
						className="p-5 flex flex-col items-center gap-3 justify-center rounded-3xl bg-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M19.0962 19.16C19.6862 18.26 19.9062 17.8 20.3562 16.79C17.0362 15.53 16.5062 10.8 19.7862 8.98999C18.7862 7.72999 17.3762 7 16.0462 7C15.0862 7 14.4262 7.25001 13.8362 7.48001C13.3362 7.67001 12.8862 7.84 12.3262 7.84C11.7262 7.84 11.1962 7.65001 10.6362 7.45001C10.0262 7.23001 9.38616 7 8.58616 7C7.09616 7 5.50616 7.91 4.49616 9.47C3.07616 11.67 3.32616 15.79 5.61616 19.31C6.43616 20.57 7.53616 21.98 8.96616 22C9.56616 22.01 9.95616 21.83 10.3862 21.64C10.8762 21.42 11.4062 21.18 12.3362 21.18C13.2662 21.17 13.7862 21.42 14.2762 21.64C14.6962 21.83 15.0762 22.01 15.6662 22C17.1162 21.98 18.2762 20.42 19.0962 19.16Z"
								fill="#EB9E2A"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.8365 2C15.9965 3.1 15.5465 4.19001 14.9565 4.95001C14.3265 5.77001 13.2265 6.41 12.1665 6.37C11.9765 5.31 12.4665 4.21999 13.0665 3.48999C13.7365 2.68999 14.8665 2.07 15.8365 2Z"
								fill="#EB9E2A"
							/>
						</svg>
						<Text variant="Main/14px/Bold" color="text-[#0F34F4]!">
							{DownloadAppSection.ios}
						</Text>
					</Link>
					<Link
						href={DownloadAppSection.web}
						className="p-5 flex-col items-center gap-3 justify-center rounded-3xl bg-white hidden md:flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M21.7431 11.07C21.6931 10.56 21.2631 10.18 20.7531 10.18H13.2031C12.6531 10.18 12.2031 10.63 12.2031 11.18V12.89C12.2031 13.44 12.6531 13.89 13.2031 13.89H17.7131C17.6031 14.81 17.0031 16.2 15.6731 17.13C14.8231 17.72 13.6931 18.13 12.2031 18.13C12.1331 18.13 12.0731 18.13 12.0031 18.12C9.45313 18.04 7.29313 16.33 6.51313 13.98C6.30313 13.35 6.18313 12.69 6.18313 12C6.18313 11.31 6.30313 10.64 6.50313 10.02C6.56313 9.83999 6.63313 9.66001 6.71313 9.48001C7.63313 7.41001 9.64313 5.95 12.0031 5.88C12.0631 5.87 12.1331 5.87 12.2031 5.87C13.6331 5.87 14.7031 6.33999 15.4531 6.85999C15.8431 7.12999 16.3631 7.06999 16.7031 6.73999L18.0931 5.38C18.5331 4.95 18.4931 4.21999 17.9931 3.85999C16.4031 2.68999 14.4631 2 12.2031 2C12.1331 2 12.0731 2.00001 12.0031 2.01001C8.17313 2.08001 4.88312 4.30001 3.27312 7.51001C2.59312 8.87001 2.20312 10.39 2.20312 12C2.20312 13.61 2.59312 15.13 3.27312 16.49H3.28313C4.89313 19.7 8.18313 21.92 12.0031 21.99C12.0731 22 12.1331 22 12.2031 22C14.9031 22 17.1731 21.11 18.8231 19.58C20.7131 17.83 21.8031 15.27 21.8031 12.22C21.8031 11.79 21.7831 11.42 21.7431 11.07Z"
								fill="#EB9E2A"
							/>
						</svg>
						<Text variant="Main/14px/Bold" color="text-[#0F34F4]!">
							{DownloadAppSection.web}
						</Text>
					</Link>
				</div>
			</div>
			<div className="hidden lg:grid grid-cols-2 gap-6 my-[120px]">
				<div className='bg-[url("/assets/DownloadApp/RightFrame.png")] h-[620px] 2xl:h-[800px] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-start gap-10 px-14 py-20 2xl:py-32 2xl:px-20'>
					<div className="px-4 py-3 flex items-center bg-white rounded-3xl w-fit gap-1">
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
						<Text
							variant="Main/14px/Bold"
							color="text-[#000]! "
							className="mr-1.5"
						>
							{common.simpler}
						</Text>
						<Text
							variant="Main/14px/SemiBold"
							type="p"
							color="text-[#808080]! "
						>
							{common.thanEver}
						</Text>
					</div>
					<div className="flex flex-col items-start gap-6">
						<Text
							variant="Main/24px/Bold"
							type="p"
							className="mb-6 "
							color="text-[#fff]! "
						>
							{DownloadAppSection.title}
						</Text>
						<Text
							variant="LongText/14px/Regular"
							color="text-[#fff]!"
							className="mb-10 text-start! max-w-[250px] "
						>
							{DownloadAppSection.desc}
						</Text>
					</div>
					<div>
						<div>
							<Text
								variant="Main/24px/Bold"
								color="text-[#fff]!"
								className="text-[48px]! "
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
				<div className='bg-[url("/assets/DownloadApp/LeftFrame.png")] h-[620px] 2xl:h-[800px] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-start px-14 py-20  2xl:py-32 2xl:px-20'>
					<div className="px-4 py-3 flex items-center bg-grayscale-02-variant rounded-3xl w-fit gap-1 mb-9">
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
						<Text
							variant="Main/14px/Bold"
							color="text-[#000]! "
							className="mr-1.5"
						>
							{common.now}
						</Text>
						<Text variant="Main/14px/SemiBold" color="text-[#808080]! ">
							{common.available}
						</Text>
						<Text variant="Main/14px/Bold" color="text-[#000]! ">
							{common.yours}
						</Text>
					</div>
					<div className="mb-10">
						<Text
							variant="LongText/14px/Regular"
							type="p"
							color="text-grayscale-06! "
						>
							{DownloadAppSection.desc2}
						</Text>
					</div>
					<div className="gap-5 grid grid-cols-3 w-full">
						<Link
							href={DownloadAppSection.android}
							className="p-6 flex flex-col items-center gap-3 justify-between rounded-3xl bg-grayscale-02-variant"
						>
							<div className="flex flex-row justify-between items-center w-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M19.1001 19.16C19.6901 18.26 19.9101 17.8 20.3601 16.79C17.0401 15.53 16.5101 10.8 19.7901 8.98999C18.7901 7.72999 17.3801 7 16.0501 7C15.0901 7 14.4301 7.25001 13.8401 7.48001C13.3401 7.67001 12.8901 7.84 12.3301 7.84C11.7301 7.84 11.2001 7.65001 10.6401 7.45001C10.0301 7.23001 9.39006 7 8.59006 7C7.10006 7 5.51007 7.91 4.50007 9.47C3.08007 11.67 3.33007 15.79 5.62007 19.31C6.44007 20.57 7.54007 21.98 8.97007 22C9.57007 22.01 9.96007 21.83 10.3901 21.64C10.8801 21.42 11.4101 21.18 12.3401 21.18C13.2701 21.17 13.7901 21.42 14.2801 21.64C14.7001 21.83 15.0801 22.01 15.6701 22C17.1201 21.98 18.2801 20.42 19.1001 19.16Z"
										fill="white"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M15.8404 2C16.0004 3.1 15.5504 4.19001 14.9604 4.95001C14.3304 5.77001 13.2304 6.41 12.1704 6.37C11.9804 5.31 12.4704 4.21999 13.0704 3.48999C13.7404 2.68999 14.8704 2.07 15.8404 2Z"
										fill="white"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M18.3493 15.2422L3.65234 6.75684M3.65234 6.75684L5.37781 13.1964M3.65234 6.75684L10.0919 5.03137"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div className="flex flex-col items-start gap-2 w-full">
								<Text
									variant="Main/14px/SemiBold"
									className="text-grayscale-07!"
								>
									{common.downlaod}
								</Text>
								<Text variant="Main/14px/Bold" className="text-grayscale-07!">
									{DownloadAppSection.ios}
								</Text>
							</div>
						</Link>
						<Link
							href={DownloadAppSection.android}
							className="p-6 flex flex-col items-center gap-3 justify-between rounded-3xl bg-grayscale-02-variant"
						>
							<div className="flex flex-row justify-between items-center w-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M11 18V21C11 21.55 10.55 22 10 22C9.45 22 9 21.55 9 21V18H11Z"
										fill="white"
									/>
									<path
										d="M15 18V21C15 21.55 14.55 22 14 22C13.45 22 13 21.55 13 21V18H15Z"
										fill="white"
									/>
									<path
										d="M17 11V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V11C7 9.9 7.9 9 9 9H15C16.1 9 17 9.9 17 11Z"
										fill="white"
									/>
									<path
										d="M5 11V15C5 15.55 4.55 16 4 16C3.45 16 3 15.55 3 15V11C3 10.45 3.45 10 4 10C4.55 10 5 10.45 5 11Z"
										fill="white"
									/>
									<path
										d="M21 11V15C21 15.55 20.55 16 20 16C19.45 16 19 15.55 19 15V11C19 10.45 19.45 10 20 10C20.55 10 21 10.45 21 11Z"
										fill="white"
									/>
									<path
										d="M9.59998 7.60001H14.4C15.28 7.60001 16 6.88 16 6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6C8 6.88 8.71998 7.60001 9.59998 7.60001Z"
										fill="white"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M18.3493 15.2422L3.65234 6.75684M3.65234 6.75684L5.37781 13.1964M3.65234 6.75684L10.0919 5.03137"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div className="flex flex-col items-start gap-2 w-full">
								<Text
									variant="Main/14px/SemiBold"
									className="text-grayscale-07!"
								>
									{common.downlaod}
								</Text>
								<Text variant="Main/14px/Bold" className="text-grayscale-07!">
									{DownloadAppSection.android}
								</Text>
							</div>
						</Link>
						<Link
							href={DownloadAppSection.android}
							className="p-6 flex flex-col items-center gap-3 justify-between rounded-3xl bg-grayscale-02-variant"
						>
							<div className="flex flex-row justify-between items-center w-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M21.7392 11.07C21.6892 10.56 21.2592 10.18 20.7492 10.18H13.1992C12.6492 10.18 12.1992 10.63 12.1992 11.18V12.89C12.1992 13.44 12.6492 13.89 13.1992 13.89H17.7092C17.5992 14.81 16.9992 16.2 15.6692 17.13C14.8192 17.72 13.6892 18.13 12.1992 18.13C12.1292 18.13 12.0692 18.13 11.9992 18.12C9.44922 18.04 7.28922 16.33 6.50922 13.98C6.29922 13.35 6.17922 12.69 6.17922 12C6.17922 11.31 6.29922 10.64 6.49922 10.02C6.55922 9.83999 6.62922 9.66001 6.70922 9.48001C7.62922 7.41001 9.63922 5.95 11.9992 5.88C12.0592 5.87 12.1292 5.87 12.1992 5.87C13.6292 5.87 14.6992 6.33999 15.4492 6.85999C15.8392 7.12999 16.3592 7.06999 16.6992 6.73999L18.0892 5.38C18.5292 4.95 18.4892 4.21999 17.9892 3.85999C16.3992 2.68999 14.4592 2 12.1992 2C12.1292 2 12.0692 2.00001 11.9992 2.01001C8.16922 2.08001 4.87922 4.30001 3.26922 7.51001C2.58922 8.87001 2.19922 10.39 2.19922 12C2.19922 13.61 2.58922 15.13 3.26922 16.49H3.27922C4.88922 19.7 8.17922 21.92 11.9992 21.99C12.0692 22 12.1292 22 12.1992 22C14.8992 22 17.1692 21.11 18.8192 19.58C20.7092 17.83 21.7992 15.27 21.7992 12.22C21.7992 11.79 21.7792 11.42 21.7392 11.07Z"
										fill="white"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M18.3493 15.2422L3.65234 6.75684M3.65234 6.75684L5.37781 13.1964M3.65234 6.75684L10.0919 5.03137"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div className="flex flex-col items-start gap-2 w-full">
								<Text
									variant="Main/14px/SemiBold"
									className="text-grayscale-07!"
								>
									{common.downlaod}
								</Text>
								<Text variant="Main/14px/Bold" className="text-grayscale-07!">
									{DownloadAppSection.web}
								</Text>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
