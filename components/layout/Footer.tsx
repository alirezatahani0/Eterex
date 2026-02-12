'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Image from 'next/image';
import Collapse from '../UI/Collapse';
import Container from '../UI/Container';
import { useTheme } from '@/hooks/useTheme';

// Type definitions for footer data
type FooterData = {
	header: { title: string; desc: string };
	desc: { title: string; desc: string };
	aboutEterex: {
		title: string;
		security: string;
		aboutUs: string;
		contactUs: string;
		rules: string;
		userPanel: string;
	};
	guideSupport: {
		title: string;
		onlineSupport: string;
		fees: string;
		identityVerification: string;
		blog: string;
		faq: string;
	};
	educationNews: {
		title: string;
		latestNews: string;
		advancedTrading: string;
		depositWithdrawal: string;
	};
	copyright: string;
};

type MobileData = {
	account: string;
	downloadApp: string;
};

// Icons
const DownloadIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.8729 17.3815L18.8719 6.61751C18.8719 4.62 17.2519 3 15.2544 3H8.73861C6.74109 3 5.12109 4.62 5.12109 6.61849L5.12207 17.3825C5.12207 19.38 6.74207 21 8.73958 21H15.2544C17.2529 21 18.8729 19.38 18.8729 17.3815Z"
			stroke="#0F34F4"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9.80078 12.9555L11.9994 15.1638M11.9994 15.1638L14.199 12.9555M11.9994 15.1638L12 9"
			stroke="#0F34F4"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="15"
		height="18"
		viewBox="0 0 15 18"
		fill="none"
	>
		<path
			d="M0.75 16.7441C0.75 14.6362 2.41482 12.0117 7.21335 12.0117C12.0109 12.0117 13.6757 14.6172 13.6757 16.7261"
			stroke="#0F34F4"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.3422 4.8743C11.3422 7.15218 9.49387 8.99856 7.21356 8.99856C4.93425 8.99856 3.08594 7.15218 3.08594 4.8743C3.08594 2.59639 4.93425 0.75 7.21356 0.75C9.49387 0.75 11.3422 2.59639 11.3422 4.8743Z"
			stroke="#0F34F4"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const InstagramIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.78216 3H16.2169C19.165 3 21 5.08119 21 8.02638V15.9736C21 18.9188 19.165 21 16.2159 21H7.78216C4.83405 21 3 18.9188 3 15.9736V8.02638C3 5.08119 4.84281 3 7.78216 3Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M11.8445 8.82812C9.91023 8.82812 8.3418 10.3966 8.3418 12.3308C8.3418 14.2651 9.91023 15.8335 11.8445 15.8335C13.7788 15.8335 15.3472 14.2651 15.3472 12.3308C15.3472 10.3966 13.7788 8.82812 11.8445 8.82812Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16.8651 7.36374V7.43274M17.1471 7.37875C17.1471 7.53575 17.0201 7.66275 16.8631 7.66275C16.7061 7.66275 16.5781 7.53575 16.5781 7.37875C16.5781 7.22175 16.7061 7.09375 16.8631 7.09375C17.0201 7.09375 17.1471 7.22175 17.1471 7.37875Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const TelegramIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.5131 15.9608L10.1876 17.9466C9.77411 18.2988 9.13291 18.078 9.02491 17.5458L8.13859 13.1849L3.8418 12.64C2.86006 12.5154 2.68297 11.1688 3.59856 10.7942L19.7433 4.18663C20.4264 3.90739 21.1405 4.51356 20.9761 5.2326L17.8061 19.1093C17.632 19.8731 16.6843 20.1456 16.1306 19.5919L10.8512 14.3135"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M8.13867 13.1822L15.4293 8.27344"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const LinkedInIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.8179 9.38098C17.5228 9.1599 19.1158 9.82852 19.9196 11.4219C20.4819 12.5344 20.4921 13.7365 20.5002 14.9503C20.5 16.6418 20.5009 18.3332 20.5 20.0247C20.4998 20.2864 20.288 20.4988 20.0262 20.4994C19.1636 20.5011 18.3573 20.4993 17.4947 20.4997C17.2321 20.4998 17.0189 20.2873 17.0185 20.0248C17.0162 18.1752 17.0189 16.7324 17.0178 14.8828C17.0193 14.7258 16.9926 14.5705 16.9822 14.4144C16.6483 12.145 13.4748 12.1366 13.231 14.3214C13.1955 14.5661 13.2082 14.8135 13.2064 15.0596C13.2054 16.8505 13.208 18.2345 13.2057 20.0254C13.2054 20.2877 12.9925 20.5 12.7302 20.5C11.8596 20.4998 11.0298 20.4997 10.1592 20.5001C9.89608 20.5002 9.68275 20.2866 9.6836 20.0234C9.69432 16.7025 9.73443 13.3932 9.69021 10.0735C9.68667 9.80772 9.90111 9.59012 10.1669 9.59029C11.0349 9.59086 11.8626 9.59023 12.7307 9.59049C12.9934 9.59057 13.2062 9.80373 13.2064 10.0664C13.2066 10.4238 13.207 10.5916 13.2056 10.949C13.8068 10.0064 14.6962 9.53843 15.8179 9.38098Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3.63324 10.0656C3.63317 9.80304 3.84593 9.59008 4.10852 9.58999C4.96989 9.58972 5.83129 9.58986 6.69283 9.59007C6.95547 9.59013 7.16831 9.80313 7.16823 10.0658C7.1671 13.3854 7.17047 16.705 7.1667 20.0246C7.1664 20.2871 6.9534 20.4997 6.69091 20.4995C5.83076 20.4991 4.97049 20.4991 4.11034 20.4995C3.84783 20.4997 3.63483 20.2871 3.63455 20.0246C3.63099 16.7049 3.63415 13.3853 3.63324 10.0656Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M5.40195 7.3039C6.45237 7.3039 7.3039 6.45237 7.3039 5.40195C7.3039 4.35153 6.45237 3.5 5.40195 3.5C4.35153 3.5 3.5 4.35153 3.5 5.40195C3.5 6.45237 4.35153 7.3039 5.40195 7.3039Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const TwitterIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.4004 7.83826L21 5.41653L18.7194 5.75804C18.7194 5.75804 16.9631 3.39956 14.3867 4.1828C12.3006 4.81718 11.461 7.27783 11.6546 8.79858C8.74346 8.40842 6.04541 7.05988 3.98757 4.96507C2.91243 11.3643 5.01405 14.47 8.16746 16.2379C6.65157 17.2829 4.84086 17.8151 3 17.7567C4.63751 19.7309 7.98649 20.0705 9.8293 19.9537C16.2568 19.548 19.8305 14.4963 19.4257 8.06983L19.4004 7.83826Z"
			stroke="#EB9E2A"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Sub-components
const Logo = () => {
	const { theme, mounted } = useTheme();
	return (
		<Link href="/" aria-label="صفحه اصلی" className="flex items-center mb-6">
			{mounted ? (
				<Image
					src={theme === 'light' ? '/Logo-Black.png' : '/Logo.png'}
					alt="Eterex logo"
					width={120}
					height={36}
					priority
				/>
			) : (
				<Image
					src="/Logo-Black.png"
					alt="Eterex logo"
					width={120}
					height={36}
					priority
				/>
			)}
		</Link>
	);
};

const HeaderSection = ({ footer }: { footer: FooterData }) => (
	<div className="mb-10">
		<Text variant="LongText/14px/SemiBold" color="#000">
			{footer.header.title}
		</Text>
		<Text variant="LongText/14px/Regular" color="#616161">
			{footer.header.desc}
		</Text>
	</div>
);

const SocialIcons = () => {
	const socialLinks = [
		{
			href:
				process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
				'https://www.instagram.com/eterexchange?utm_medium=copy_link',
			icon: InstagramIcon,
			label: 'Instagram',
		},
		{
			href: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM || 'https://t.me/eterex',
			icon: TelegramIcon,
			label: 'Telegram',
		},
		{
			href:
				process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
				'https://www.linkedin.com/company/eterexchange',
			icon: LinkedInIcon,
			label: 'LinkedIn',
		},
		{
			href:
				process.env.NEXT_PUBLIC_SOCIAL_TWITTER ||
				'https://x.com/eterex_official',
			icon: TwitterIcon,
			label: 'Twitter',
		},
	];

	return (
		<div className="flex items-center justify-end flex-row-reverse gap-3">
			{socialLinks.map(({ href, icon: Icon, label }) => (
				<Link
					key={href}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="w-14 h-14 flex items-center justify-center rounded-full bg-grayscale-02 hover:bg-grayscale-03 transition-colors"
					aria-label={label}
				>
					<Icon />
				</Link>
			))}
		</div>
	);
};

const ActionButtons = ({ mobile }: { mobile: MobileData }) => (
	<div className="flex items-center justify-center md:justify-start gap-3">
		<Link
			href="https://app.eterex.com/login"
			className="flex items-center justify-center gap-2 w-[180px] pr-3 pl-4 h-14 rounded-[40px] bg-brand-primary-container"
		>
			<UserIcon />
			<span className="font-bold text-sm leading-5 text-primary">
				{mobile.account}
			</span>
		</Link>
		<Link
			href="/download"
			className="flex items-center justify-center gap-2 w-[180px] pr-3 pl-4 h-14 rounded-[40px] bg-brand-primary-container"
		>
			<DownloadIcon />
			<span className="font-bold text-sm leading-5 text-primary">
				{mobile.downloadApp}
			</span>
		</Link>
	</div>
);


const LinkColumn = ({
	title,
	links,
}: {
	title: string;
	links: Array<{ href: string; label: string }>;
}) => (
	<div>
		<Text variant="Main/24px/Regular">{title}</Text>
		<div className="flex flex-col gap-2 mt-6">
			{links.map((link, index) => (
				<Link key={`${link.href}-${index}-${link.label}`} href={link.href}>
					<Text variant="Main/14px/SemiBold" color="#808080">
						{link.label}
					</Text>
				</Link>
			))}
		</div>
	</div>
);

const LinkColumns = ({ footer }: { footer: FooterData }) => {
	const columns = [
		{
			title: footer.aboutEterex.title,
			links: [
				{ href: '/security', label: footer.aboutEterex.security },
				{ href: '/about-us', label: footer.aboutEterex.aboutUs },
				{ href: '/contact-us', label: footer.aboutEterex.contactUs },
				{ href: '/terms-and-conditions', label: footer.aboutEterex.rules },
				{
					href: 'https://app.eterex.com/login',
					label: footer.aboutEterex.userPanel,
				},
			],
		},
		{
			title: footer.guideSupport.title,
			links: [
				{ href: '/login', label: footer.guideSupport.onlineSupport },
				{ href: '/fees', label: footer.guideSupport.fees },
				{
					href: '/identity-verification',
					label: footer.guideSupport.identityVerification,
				},
				{ href: 'https://eterex.com/blog/', label: footer.guideSupport.blog },
				{ href: '/faq', label: footer.guideSupport.faq },
			],
		},
		{
			title: footer.educationNews.title,
			links: [
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.latestNews,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.advancedTrading,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.depositWithdrawal,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.advancedTrading,
				},
			],
		},
	];

	return (
		<div className="hidden md:grid grid-cols-3 gap-10">
			{columns.map((column, index) => (
				<LinkColumn key={index} title={column.title} links={column.links} />
			))}
		</div>
	);
};

const CollapsibleLinks = ({ footer }: { footer: FooterData }) => {
	const sections = [
		{
			title: footer.educationNews.title,
			links: [
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.latestNews,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.advancedTrading,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.depositWithdrawal,
				},
				{
					href: 'https://eterex.com/blog/',
					label: footer.educationNews.advancedTrading,
				},
			],
		},
		{
			title: footer.guideSupport.title,
			links: [
				{ href: '/login', label: footer.guideSupport.onlineSupport },
				{ href: '/fees', label: footer.guideSupport.fees },
				{
					href: '/identity-verification',
					label: footer.guideSupport.identityVerification,
				},
				{ href: 'https://eterex.com/blog/', label: footer.guideSupport.blog },
				{ href: '/faq', label: footer.guideSupport.faq },
			],
		},
		{
			title: footer.aboutEterex.title,
			links: [
				{ href: '/security', label: footer.aboutEterex.security },
				{ href: '/about-us', label: footer.aboutEterex.aboutUs },
				{ href: '/contact-us', label: footer.aboutEterex.contactUs },
				{ href: '/terms-and-conditions', label: footer.aboutEterex.rules },
				{
					href: 'https://app.eterex.com/login',
					label: footer.aboutEterex.userPanel,
				},
			],
		},
	];

	return (
		<div className="flex flex-col gap-10 my-20 md:hidden">
			{sections.map((section, index) => (
				<Collapse
					key={index}
					header={section.title}
					contentClassName="flex flex-col gap-2"
				>
					{section.links.map((link, linkIndex) => (
						<Link
							key={`${link.href}-${linkIndex}-${link.label}`}
							href={link.href}
						>
							<Text variant="Main/14px/SemiBold">{link.label}</Text>
						</Link>
					))}
				</Collapse>
			))}
		</div>
	);
};

const Copyright = ({ footer }: { footer: FooterData }) => (
	<div className="text-center! py-4 px-6 border-2 border-grayscale-03 rounded-[40px] bg-grayscale-02-blur backdrop-blur-xl">
		<Text variant="Main/14px/SemiBold" color="#808080">
			{footer.copyright}
		</Text>
	</div>
);

export default function Footer() {
	const { footer, mobile } = useTranslation();

	return (
		<footer className="border-t border-grayscale-03 lg:border-none pb-7 lg:pb-0 bg-grayscale-01">
			{/* Mobile & Tablet */}
			<Container className="flex flex-col lg:hidden relative bg-[url('/assets/footer/Frame-SM.avif')] z-20 bg-cover bg-center bg-no-repeat overflow-hidden">
				<div className="flex flex-col gap-20 pt-14 relative z-30">
					<div className="flex flex-col">
						<Logo />
						<HeaderSection footer={footer} />
						<SocialIcons />
					</div>
					<div className="flex flex-col gap-10">
						<ActionButtons mobile={mobile} />
					</div>
					{/* Association logos */}
					<div className="flex flex-wrap items-center gap-6">
						<a
							href="https://fintechaa.ir"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="انجمن فین‌تک"
						>
							<Image
								loading="lazy"
								width={78}
								height={99}
								src="/assets/footer/fintech.svg"
								alt="انجمن فین‌تک"
								className="h-[99px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
						<a
							href="https://iranblockchain.org"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="انجمن فناوران زنجیره بلوک"
						>
							<Image
								loading="lazy"
								width={108}
								height={91}
								src="/assets/footer/blockchain.svg"
								alt="انجمن فناوران زنجیره بلوک"
								className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
						<a
							href="https://www.ecoplatform.ir"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="سازمان نظام صنفی رایانه‌ای"
						>
							<Image
								loading="lazy"
								width={115}
								height={91}
								src="/assets/footer/nezamSenfi.png"
								alt="سازمان نظام صنفی رایانه‌ای"
								className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
					</div>
					<CollapsibleLinks footer={footer} />
					<div className="rounded-tr-[120px]">
						<div className="flex flex-col gap-20 rounded-tr-[120px]">
							<LinkColumns footer={footer} />
							<Copyright footer={footer} />
						</div>
					</div>
				</div>
			</Container>

			{/* Desktop */}
			<div className="hidden lg:grid lg:grid-cols-[1fr_2fr] gap-[96px] relative lg:pr-[76px] 2xl:pr-[156px]">
				<div className="flex flex-col gap-20">
					<div className="flex flex-col">
						<Logo />
						<HeaderSection footer={footer} />
						<SocialIcons />
					</div>
					<div className="flex flex-col gap-10">
						<ActionButtons mobile={mobile} />
					</div>
					{/* Association logos */}
					<div className="flex flex-wrap items-center gap-6 ">
						<a
							href="https://fintechaa.ir"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="انجمن فین‌تک"
						>
							<Image
								loading="lazy"
								width={78}
								height={99}
								src="/assets/footer/fintech.svg"
								alt="انجمن فین‌تک"
								className="h-[99px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
						<a
							href="https://iranblockchain.org"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="انجمن فناوران زنجیره بلوک"
						>
							<Image
								loading="lazy"
								width={108}
								height={91}
								src="/assets/footer/blockchain.svg"
								alt="انجمن فناوران زنجیره بلوک"
								className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
						<a
							href="https://www.ecoplatform.ir"
							rel="nofollow noopener noreferrer"
							target="_blank"
							aria-label="سازمان نظام صنفی رایانه‌ای"
						>
							<Image
								loading="lazy"
								width={115}
								height={91}
								src="/assets/footer/nezamSenfi.png"
								alt="سازمان نظام صنفی رایانه‌ای"
								className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
					</div>
				</div>

				<div className="relative rounded-tr-[120px] lg:border-2 lg:border-grayscale-03 overflow-hidden ">
					<div className="relative flex flex-col w-full gap-20 lg:py-[144px] lg:px-[76px] 2xl:pt-[128px] 2xl:pr-[156px] rounded-tr-[120px] z-20 bg-[url('/assets/footer/Frame.avif')] bg-cover bg-center bg-no-repeat overflow-hidden ">
						<LinkColumns footer={footer} />
						<Copyright footer={footer} />
					</div>
				</div>
			</div>
		</footer>
	);
}
