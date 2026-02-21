'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from '../UI/MobileMenu';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import Container from '../UI/Container';

// Icons
// Sun Icon for Theme Toggle Switch
const SunIconSwitch = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="21"
		height="21"
		viewBox="0 0 21 21"
		fill="none"
	>
		<path
			d="M10.3325 2.57141V3.74733M10.3325 16.8241V18M18.0467 10.2858H16.8708M3.79408 10.2858H2.61816M15.7871 4.83069L14.9557 5.66217M5.70933 14.909L4.87785 15.7405M15.7871 15.7405L14.9557 14.909M5.70933 5.66258L4.87785 4.8311"
			stroke="#7B90FF"
			strokeWidth="1.28571"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.3325 6.68976C12.319 6.68976 13.9286 8.30018 13.9286 10.2859C13.9286 12.2724 12.319 13.8828 10.3325 13.8828C8.34591 13.8828 6.73633 12.2724 6.73633 10.2859C6.73633 8.30018 8.34591 6.68976 10.3325 6.68976Z"
			stroke="#7B90FF"
			strokeWidth="1.28571"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="13"
		height="15"
		viewBox="0 0 13 15"
		fill="none"
	>
		<path
			d="M0.75 14.0786C0.75 12.322 2.13735 10.1349 6.13613 10.1349C10.1341 10.1349 11.5214 12.3061 11.5214 14.0635"
			className="stroke-grayscale-01"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.57747 4.18692C9.57747 6.08515 8.03721 7.6238 6.13695 7.6238C4.23753 7.6238 2.69727 6.08515 2.69727 4.18692C2.69727 2.28866 4.23753 0.75 6.13695 0.75C8.03721 0.75 9.57747 2.28866 9.57747 4.18692Z"
			className="stroke-grayscale-01"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Theme Toggle Switch Component
function ThemeToggle() {
	const { theme, mounted, toggleTheme } = useTheme();

	if (!mounted) {
		return (
			<button
				className="hidden 2xl:flex w-[54.6px] h-7 p-1.5 justify-center items-center gap-0.5 rounded-[65px] bg-brand-secondary transition-colors"
				aria-label="Toggle theme"
			>
				<div className="w-4 h-4 bg-white rounded-full"></div>
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className={`hidden lg:flex relative w-17 h-10 p-1.5 items-center gap-0.5 rounded-[65px] transition-colors duration-300 ease-in-out ${
				theme !== 'light' ? 'bg-brand-secondary' : 'bg-brand-primary'
			}`}
			aria-label="Toggle theme"
		>
			{/* Sun Icon - shown on left in light mode */}
			<div className="shrink-0 z-10 absolute left-2 transition-opacity duration-300">
				<SunIconSwitch />
			</div>

			{/* Switch Circle - moves from right (light) to left (dark) with smooth transform */}
			<div
				className="absolute w-7 h-7 z-20 bg-white rounded-full transition-transform duration-300 ease-in-out"
				style={{
					left: '6px',
					transform: theme === 'light' ? 'translateX(28px)' : 'translateX(0)',
				}}
			/>

			{/* Spacer for dark mode to push circle left */}
			{theme === 'dark' && (
				<div className="shrink-0 w-[21px] transition-opacity duration-300" />
			)}
		</button>
	);
}

// Active Link Indicator Circle
const ActiveIndicator = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="8"
		height="8"
		viewBox="0 0 8 8"
		fill="none"
		className="absolute -bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2"
	>
		<circle cx="4" cy="4" r="4" fill="#0F34F4" />
	</svg>
);

export default function Header() {
	const { nav, common } = useTranslation();
	const pathname = usePathname();
	const { theme, mounted } = useTheme();

	// Navigation Links (for desktop)
	const navLinks = [
		{ href: '/', label: nav.home, external: false },
		{ href: '/market', label: nav.markets, external: false },
		{
			href: 'https://app.eterex.com/advanced-trade/USDTIRT',
			label: nav.trade,
			external: true,
		},
		{ href: '/staking', label: nav.staking, external: false },
		{ href: '/blog', label: nav.blog },
		// { href: '/about-us', label: nav.about, external: false },
		// { href: '/contact-us', label: nav.contact, external: false },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-glass-gray-11 bg-grayscale-01-blur-74 backdrop-blur-xl py-5 md:py-4">
			<Container>
				<nav className="flex flex-row-reverse items-center justify-between h-12 md:h-14">
					{/* Left Side - Mobile: 3 items, Tablet: +2 icons, Desktop: +1 theme toggle */}
					<div className="flex items-center gap-4">
						<ThemeToggle />
						{mounted && (
							<div className="flex items-center justify-center gap-2">
								<Link
									href="/download"
									aria-label="دانلود اپلیکیشن"
									className="relative hidden z-30 md:flex items-center justify-center bg-brand-tertiary w-14 h-14 border border-grayscale-03 rounded-full hover:opacity-80 transition-opacity"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="20"
										viewBox="0 0 15 20"
										fill="none"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M13.3944 15.0244L13.3934 4.26039C13.3934 2.26288 11.7734 0.642883 9.77586 0.642883H4.2601C2.26258 0.642883 0.642578 2.26288 0.642578 4.26137L0.643558 15.0254C0.643558 17.0229 2.26356 18.6429 4.26107 18.6429H9.77586C11.7744 18.6429 13.3944 17.0229 13.3944 15.0244Z"
											stroke={theme === 'dark' ? 'white' : 'black'}
											strokeWidth="1.28571"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M6.91962 14.3004V14.2329M6.91962 13.8786C6.72614 13.8786 6.56934 14.0354 6.56934 14.2283C6.56934 14.4218 6.72614 14.5786 6.91962 14.5786C7.11324 14.5786 7.27004 14.4218 7.27004 14.2283C7.27004 14.0354 7.11324 13.8786 6.91962 13.8786Z"
											stroke={theme === 'dark' ? 'white' : 'black'}
											strokeWidth="1.28571"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
								<Link
									href="/market"
									aria-label="بازارها"
									className="relative hidden z-30 md:flex items-center justify-center bg-brand-tertiary w-14 h-14 border border-grayscale-03 rounded-full hover:opacity-80 transition-opacity"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="19"
										height="20"
										viewBox="0 0 19 20"
										fill="none"
									>
										<path
											d="M14.7797 15.2267L18.2026 18.6429M9.05498 0.642883C13.7011 0.642883 17.4673 4.41135 17.4673 9.06038C17.4673 13.7095 13.7011 17.4789 9.05498 17.4789C4.40874 17.4789 0.642578 13.7095 0.642578 9.06038C0.642578 4.41135 4.40874 0.642883 9.05498 0.642883Z"
											stroke={theme === 'dark' ? 'white' : 'black'}
											strokeWidth="1.28571"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10.7559 4.38373C12.1532 4.80894 13.2579 5.89676 13.7062 7.2833"
											stroke={theme === 'dark' ? 'white' : 'black'}
											strokeWidth="1.28571"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
							</div>
						)}

						{/* Login Button - Always visible */}
						<Link
							href="https://app.eterex.com/login"
							className="bg-grayscale-07 rounded-[40px] h-12 md:h-14 px-4 md:px-6 text-[12px] md:text-base font-bold text-grayscale-01 flex items-center justify-center gap-2"
						>
							<UserIcon />
							{common.login}
						</Link>
					</div>

					{/* Right Side - Logo and Menu */}
					<div className="flex items-center gap-4 md:gap-6 2xl:gap-20">
						{/* Mobile Menu - Hamburger */}
						<div className="xl:hidden">
							<MobileMenu />
						</div>

						{/* Logo */}
						<Link href="/" aria-label="صفحه اصلی" className="flex items-center">
							{mounted ? (
								<Image
									src={theme === 'light' ? '/Logo-Black.png' : '/Logo-white.png'}
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

						{/* Desktop Navigation Links (>= 1440px) */}
						<div className="hidden xl:flex items-center gap-12">
							{navLinks.map((link) => {
								const isActive =
									!link.external &&
									(link.href === '/'
										? pathname === '/'
										: pathname.startsWith(link.href));
								const linkProps = {
									href: link.href,
									className: `relative text-[14px] font-semibold leading-[20px] transition-colors ${
										isActive ? 'text-grayscale-07' : 'text-grayscale-06'
									}`,
									style: {
										fontFamily: "Pelak, 'Vazirmatn', Tahoma, Arial, sans-serif",
									} as React.CSSProperties,
									...(link.external && {
										target: '_blank',
										rel: 'noopener noreferrer',
									}),
								};
								return (
									<Link key={link.href} {...linkProps}>
										{link.label}
										{isActive && <ActiveIndicator />}
									</Link>
								);
							})}
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
}
