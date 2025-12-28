'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ContactContent() {
	const { contact } = useTranslation();
	const { theme, mounted } = useTheme();
	const [copied, setCopied] = useState(false);

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/contactUs/Header-Dark.png')] md:bg-[url('/assets/contactUs/Header-MD-Dark.png')] lg:bg-[url('/assets/contactUs/Header-LG-Dark.png')] 2xl:bg-[url('/assets/contactUs/Header-XL-Dark.png')] "
			: "bg-[url('/assets/contactUs/Header.png')] md:bg-[url('/assets/contactUs/Header-MD.png')] lg:bg-[url('/assets/contactUs/Header-LG.png')] 2xl:bg-[url('/assets/contactUs/Header-XL.png')] ";
	}, [theme, mounted]);

	const handleCopyPhone = () => {
		navigator.clipboard.writeText(contact.phone.number);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSendEmail = () => {
		window.location.href = `mailto:${contact.email.address}`;
	};

	// Icons
	const CopyIcon = useMemo(
		() => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="17"
				viewBox="0 0 15 17"
				fill="none"
			>
				<path
					d="M9.94773 2.81102C9.75698 1.58067 8.87098 0.75 7.53582 0.75H3.20487C1.69715 0.75 0.75 1.82091 0.75 3.33373V8.91283C0.75 10.2909 1.53772 11.3065 2.82922 11.4667"
					stroke='white'
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.7609 5.01108H7.43145C5.92295 5.01108 4.97656 6.07908 4.97656 7.59118V13.1703C4.97656 14.6823 5.91786 15.7503 7.43145 15.7503H11.7602C13.2745 15.7503 14.2158 14.6823 14.2158 13.1703V7.59118C14.2158 6.07908 13.2745 5.01108 11.7609 5.01108Z"
					stroke='white'
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const EmailIcon = useMemo(
		() => (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.1667 3.33333H5.83333C3.33333 3.33333 1.66667 4.58333 1.66667 7.5V12.5C1.66667 15.4167 3.33333 16.6667 5.83333 16.6667H14.1667C16.6667 16.6667 18.3333 15.4167 18.3333 12.5V7.5C18.3333 4.58333 16.6667 3.33333 14.1667 3.33333Z"
					stroke='white'
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43333 9.58333L5.83333 7.5"
					stroke='white'
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const LinkedInIcon = useMemo(
		() => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="19"
				height="19"
				viewBox="0 0 19 19"
				fill="none"
			>
				<path
					d="M13.0679 6.63098C14.7728 6.4099 16.3658 7.07852 17.1696 8.6719C17.7319 9.7844 17.7421 10.9865 17.7502 12.2003C17.75 13.8918 17.7509 15.5832 17.75 17.2747C17.7498 17.5364 17.538 17.7488 17.2762 17.7494C16.4136 17.7511 15.6073 17.7493 14.7447 17.7497C14.4821 17.7498 14.2689 17.5373 14.2685 17.2748C14.2662 15.4252 14.2689 13.9824 14.2678 12.1328C14.2693 11.9758 14.2426 11.8205 14.2322 11.6644C13.8983 9.395 10.7248 9.3866 10.481 11.5714C10.4455 11.8161 10.4582 12.0635 10.4564 12.3096C10.4554 14.1005 10.458 15.4845 10.4557 17.2754C10.4554 17.5377 10.2425 17.75 9.9802 17.75C9.1096 17.7498 8.2798 17.7497 7.4092 17.7501C7.14608 17.7502 6.93275 17.5366 6.9336 17.2734C6.94432 13.9525 6.98443 10.6432 6.94021 7.3235C6.93667 7.05772 7.15111 6.84012 7.4169 6.84029C8.2849 6.84086 9.1126 6.84023 9.9807 6.84049C10.2434 6.84057 10.4562 7.05373 10.4564 7.3164C10.4566 7.6738 10.457 7.8416 10.4556 8.199C11.0568 7.2564 11.9462 6.78843 13.0679 6.63098Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M0.883242 7.3156C0.883172 7.05304 1.09593 6.84008 1.35852 6.83999C2.21989 6.83972 3.08129 6.83986 3.94283 6.84007C4.20547 6.84013 4.41831 7.05313 4.41823 7.3158C4.4171 10.6354 4.42047 13.955 4.4167 17.2746C4.4164 17.5371 4.2034 17.7497 3.94091 17.7495C3.08076 17.7491 2.22049 17.7491 1.36034 17.7495C1.09783 17.7497 0.884832 17.5371 0.884552 17.2746C0.880992 13.9549 0.884152 10.6353 0.883242 7.3156Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2.65195 4.5539C3.70237 4.5539 4.5539 3.70237 4.5539 2.65195C4.5539 1.60153 3.70237 0.75 2.65195 0.75C1.60153 0.75 0.75 1.60153 0.75 2.65195C0.75 3.70237 1.60153 4.5539 2.65195 4.5539Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const InstagramIcon = useMemo(
		() => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
			>
				<path
					d="M5.53216 0.75H13.9669C16.915 0.75 18.75 2.83119 18.75 5.77638V13.7236C18.75 16.6688 16.915 18.75 13.9659 18.75H5.53216C2.58405 18.75 0.75 16.6688 0.75 13.7236V5.77638C0.75 2.83119 2.59281 0.75 5.53216 0.75Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.59645 6.57812C7.66218 6.57812 6.09375 8.1466 6.09375 10.0808C6.09375 12.0151 7.66218 13.5835 9.59645 13.5835C11.5307 13.5835 13.0992 12.0151 13.0992 10.0808C13.0992 8.1466 11.5307 6.57812 9.59645 6.57812Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M14.6151 5.11374V5.18274M14.8971 5.12875C14.8971 5.28575 14.7701 5.41275 14.6131 5.41275C14.4561 5.41275 14.3281 5.28575 14.3281 5.12875C14.3281 4.97175 14.4561 4.84375 14.6131 4.84375C14.7701 4.84375 14.8971 4.97175 14.8971 5.12875Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const TelegramIcon = useMemo(
		() => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="18"
				viewBox="0 0 20 18"
				fill="none"
			>
				<path
					d="M10.2631 12.595L7.9376 14.5808C7.52411 14.933 6.88291 14.7122 6.77491 14.18L5.88859 9.81912L1.5918 9.27422C0.61006 9.14962 0.43297 7.80302 1.34856 7.42842L17.4933 0.820847C18.1764 0.541607 18.8905 1.14778 18.7261 1.86682L15.5561 15.7435C15.382 16.5073 14.4343 16.7798 13.8806 16.2261L8.6012 10.9477"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M5.89062 9.81641L13.1813 4.90765"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const TwitterIcon = useMemo(
		() => (
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
					d="M19.4004 7.83826L21 5.41653L18.7194 5.75804C18.7194 5.75804 16.9631 3.39956 14.3867 4.1828C12.3006 4.81718 11.461 7.27783 11.6546 8.79858C8.74346 8.40842 6.04541 7.05988 3.98757 4.96507C2.91243 11.3643 5.01405 14.47 8.16746 16.2379C6.65157 17.2829 4.84086 17.8151 3 17.7567C4.63751 19.7309 7.98649 20.0705 9.8293 19.9537C16.2568 19.548 19.8305 14.4963 19.4257 8.06983L19.4004 7.83826Z"
					stroke="#294BFF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		[],
	);

	const socialLinks = [
		{
			name: contact.socialNetworks.linkedin,
			icon: LinkedInIcon,
			href: 'https://linkedin.com',
		},
		{
			name: contact.socialNetworks.instagram,
			icon: InstagramIcon,
			href: 'https://instagram.com',
		},
		{
			name: contact.socialNetworks.telegram,
			icon: TelegramIcon,
			href: 'https://telegram.org',
		},
		{
			name: contact.socialNetworks.twitter,
			icon: TwitterIcon,
			href: 'https://twitter.com',
		},
	];

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[400px] md:h-[480px] lg:h-[582px] 2xl:h-[640px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text variant="Main/32px/Black" gradient="primary" className="mb-4">
					{contact.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" color="#616161">
						{contact.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{contact.subtitle.highlight}
					</Text>
					<Text variant="Main/16px/Regular" color="#616161">
						{' '}
						{contact.subtitle.suffix}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20 gap-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-8 lg:grid-rows-[142px_142px_1fr]">
				{/* Phone Card */}
				<div className="bg-grayscale-02 rounded-3xl p-8 flex flex-col gap-8 h-[140px] lg:col-start-1 lg:col-end-5 lg:row-start-1 ">
					<div className="flex items-center justify-between gap-4 h-full">
						<div className="flex flex-col items-start justify-between h-full">
							<Text
								variant="Main/20px/Bold"
								gradient="primary"
								className="w-fit"
							>
								{contact.phone.label}
							</Text>
							<Text variant="Main/16px/Regular" color="text-grayscale-06!">
								{contact.phone.number}+
							</Text>
						</div>
						<button
							onClick={handleCopyPhone}
							className="bg-brand-primary rounded-[40px] px-4 py-2 flex items-center gap-2 hover:bg-brand-primary/90 transition-colors h-12"
						>
							{CopyIcon}
							<Text variant="Main/14px/Bold" className="text-white!">
								{copied ? 'کپی شد!' : contact.phone.copyButton}
							</Text>
						</button>
					</div>
				</div>

				{/* Email Card */}
				<div className="bg-grayscale-02 rounded-3xl p-8 flex flex-col gap-8 h-[140px] lg:col-start-1 lg:col-end-5 lg:row-start-2">
					<div className="flex items-center justify-between gap-4 h-full">
						<div className="flex flex-col items-start justify-between h-full">
							<Text
								variant="Main/20px/Bold"
								gradient="primary"
								className="w-fit"
							>
								{contact.email.label}
							</Text>
							<Text variant="Main/16px/Regular" color="text-grayscale-06!">
								{contact.email.address}
							</Text>
						</div>
						<button
							onClick={handleSendEmail}
							className="bg-brand-primary rounded-[40px] px-4 py-2 flex items-center gap-2 hover:bg-brand-primary/90 transition-colors h-12"
						>
							{EmailIcon}
							<Text variant="Main/14px/Bold" className="text-white!">
								{contact.email.sendButton}
							</Text>
						</button>
					</div>
				</div>

				{/* Address Card */}
				<div
					className={cn(
						'rounded-3xl p-8 flex flex-col items-center justify-start gap-8 bg-cover bg-center bg-no-repeat relative lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-3',
						theme === 'dark' && mounted
							? "bg-[url('/assets/contactUs/AddressContainerDark.png')]"
							: "bg-[url('/assets/contactUs/AddressContainer.png')]",
					)}
				>
					<Text variant="Main/20px/Bold" gradient="primary" className="w-fit">
						{contact.address.label}
					</Text>
					<Text variant="LongText/16px/Regular" color="text-grayscale-06!">
						{contact.address.text}
					</Text>
					{/* Map placeholder - you can replace this with an actual map component */}
					<div className="w-full h-[300px] bg-grayscale-03 rounded-xl flex items-center justify-center">
						<Text variant="LongText/16px/Regular" color="#808080">
							نقشه
						</Text>
					</div>
				</div>

				{/* Social Networks Card */}
				<div
					className={cn(
						'rounded-3xl px-8 py-16 flex flex-col items-center justify-center gap-8 bg-cover bg-center bg-no-repeat relative lg:col-start-7 lg:col-end-9 lg:row-start-1 lg:row-end-3',
						theme === 'dark' && mounted
							? "bg-[url('/assets/contactUs/SocialMediaContainerDark.png')]"
							: "bg-[url('/assets/contactUs/SocialMediaContainer.png')]",
					)}
				>
					<Text variant="Main/20px/Bold" gradient="primary" className="w-fit">
						{contact.socialNetworks.label}
					</Text>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
						{socialLinks.map((social, index) => {
							const Icon = social.icon;
							return (
								<Link
									key={index}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-brand-primary-container rounded-[40px] h-14 p-4 flex flex-row items-center gap-2 transition-colors"
								>
									{Icon}
									<Text variant="Main/14px/SemiBold" className="text-primary!">
										{social.name}
									</Text>
								</Link>
							);
						})}
					</div>
				</div>

				<div className="w-full lg:col-start-1 lg:col-end-9 lg:row-start-3 lg:row-end-4">
					<DownloadSection />
				</div>
			</Container>
		</div>
	);
}
