'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

const HamburgerIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="16"
		viewBox="0 0 18 16"
		fill="none"
	>
		<path
			d="M0.75 14.75H16.75"
			stroke="black"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M0.75 0.75L16.75 0.750001"
			stroke="black"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M0.75 7.75H16.75"
			stroke="black"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const CloseIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M6 6L18 18"
			stroke="black"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M18 6L6 18"
			stroke="black"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Chevron Icon for navigation links
const ChevronIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M14.5703 17.1433L9.42746 12.0004L14.5703 6.85754"
			stroke="black"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// Download Icon
const DownloadIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M18.8729 17.3815L18.8719 6.61751C18.8719 4.62 17.2519 3 15.2544 3H8.73861C6.74109 3 5.12109 4.62 5.12109 6.61849L5.12207 17.3825C5.12207 19.38 6.74207 21 8.73958 21H15.2544C17.2529 21 18.8729 19.38 18.8729 17.3815Z"
			stroke="#0F34F4"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M9.80078 12.9555L11.9994 15.1638M11.9994 15.1638L14.199 12.9555M11.9994 15.1638L12 9"
			stroke="#0F34F4"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// User Icon
const UserIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5.53711 19.9943C5.53711 17.8864 7.20192 15.2618 12.0005 15.2618C16.798 15.2618 18.4628 17.8673 18.4628 19.9762"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M16.1273 8.1243C16.1273 10.4022 14.279 12.2486 11.9987 12.2486C9.71941 12.2486 7.87109 10.4022 7.87109 8.1243C7.87109 5.84639 9.71941 4 11.9987 4C14.279 4 16.1273 5.84639 16.1273 8.1243Z"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// Social Media Icons
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
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M11.8445 8.82812C9.91023 8.82812 8.3418 10.3966 8.3418 12.3308C8.3418 14.2651 9.91023 15.8335 11.8445 15.8335C13.7788 15.8335 15.3472 14.2651 15.3472 12.3308C15.3472 10.3966 13.7788 8.82812 11.8445 8.82812Z"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M16.8651 7.36374V7.43274M17.1471 7.37875C17.1471 7.53575 17.0201 7.66275 16.8631 7.66275C16.7061 7.66275 16.5781 7.53575 16.5781 7.37875C16.5781 7.22175 16.7061 7.09375 16.8631 7.09375C17.0201 7.09375 17.1471 7.22175 17.1471 7.37875Z"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
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
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M8.13867 13.1822L15.4293 8.27344"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
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
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M3.63324 10.0656C3.63317 9.80304 3.84593 9.59008 4.10852 9.58999C4.96989 9.58972 5.83129 9.58986 6.69283 9.59007C6.95547 9.59013 7.16831 9.80313 7.16823 10.0658C7.1671 13.3854 7.17047 16.705 7.1667 20.0246C7.1664 20.2871 6.9534 20.4997 6.69091 20.4995C5.83076 20.4991 4.97049 20.4991 4.11034 20.4995C3.84783 20.4997 3.63483 20.2871 3.63455 20.0246C3.63099 16.7049 3.63415 13.3853 3.63324 10.0656Z"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M5.40195 7.3039C6.45237 7.3039 7.3039 6.45237 7.3039 5.40195C7.3039 4.35153 6.45237 3.5 5.40195 3.5C4.35153 3.5 3.5 4.35153 3.5 5.40195C3.5 6.45237 4.35153 7.3039 5.40195 7.3039Z"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
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
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M19.4004 7.83826L21 5.41653L18.7194 5.75804C18.7194 5.75804 16.9631 3.39956 14.3867 4.1828C12.3006 4.81718 11.461 7.27783 11.6546 8.79858C8.74346 8.40842 6.04541 7.05988 3.98757 4.96507C2.91243 11.3643 5.01405 14.47 8.16746 16.2379C6.65157 17.2829 4.84086 17.8151 3 17.7567C4.63751 19.7309 7.98649 20.0705 9.8293 19.9537C16.2568 19.548 19.8305 14.4963 19.4257 8.06983L19.4004 7.83826Z"
			stroke="#EB9E2A"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// Mobile Theme Toggle (simplified version)
function MobileThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as
			| 'light'
			| 'dark'
			| null;
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';
		const currentTheme = storedTheme || systemTheme;

		if (currentTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		const timeoutId = setTimeout(() => {
			setMounted(true);
			setTheme(currentTheme);
		}, 0);

		return () => clearTimeout(timeoutId);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);

		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	if (!mounted) {
		return (
			<button
				className="flex relative w-17 h-10 p-1.5 items-center gap-0.5 rounded-[65px] bg-brand-primary transition-colors"
				aria-label="Toggle theme"
			>
				<div className="w-7 h-7 bg-white rounded-full"></div>
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className={`flex relative w-17 h-10 p-1.5 items-center gap-0.5 rounded-[65px] transition-colors duration-300 ease-in-out ${
				theme !== 'light' ? 'bg-brand-secondary' : 'bg-brand-primary'
			}`}
			aria-label="Toggle theme"
		>
			<div className="shrink-0 z-10 absolute left-2">
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
			</div>
			<div
				className="absolute w-7 h-7 z-20 bg-white rounded-full transition-transform duration-300 ease-in-out"
				style={{
					left: '6px',
					transform: theme === 'light' ? 'translateX(28px)' : 'translateX(0)',
				}}
			/>
			{theme === 'dark' && <div className="shrink-0 w-[21px]" />}
		</button>
	);
}

export default function MobileMenu() {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [animating, setAnimating] = useState<boolean>(false);
	const btnRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const { nav, mobile } = useTranslation();

	const handleClick = () => {
		if (animating) return;
		setAnimating(true);

		const animationClass = expanded
			? 'animate-[rotateAndExpandOut_0.5s_ease-in-out_forwards]'
			: 'animate-[rotateAndExpandIn_0.5s_ease-in-out_forwards]';

		const buttonAnim = expanded
			? 'animate-[spinAccelDecelOut_0.8s_ease-in-out_forwards]'
			: 'animate-[spinAccelDecelIn_0.8s_ease-in-out_forwards]';

		if (menuRef.current) {
			menuRef.current.classList.remove(
				'animate-[rotateAndExpandIn_0.5s_ease-in-out_forwards]',
				'animate-[rotateAndExpandOut_0.5s_ease-in-out_forwards]',
			);
			void menuRef.current.offsetWidth;
			menuRef.current.classList.add(animationClass);
		}

		if (btnRef.current) {
			btnRef.current.classList.remove(
				'animate-[spinAccelDecelIn_0.8s_ease-in-out_forwards]',
				'animate-[spinAccelDecelOut_0.8s_ease-in-out_forwards]',
			);
			void btnRef.current.offsetWidth;
			btnRef.current.classList.add(buttonAnim);

			setTimeout(() => {
				setExpanded((prev) => !prev);
				setAnimating(false);
				if (btnRef.current) {
					btnRef.current.innerHTML = expanded
						? renderToStaticMarkup(HamburgerIcon)
						: renderToStaticMarkup(CloseIcon);
				}
			}, 600);
		}
	};

	useEffect(() => {
		if (expanded) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
		return () => document.body.classList.remove('overflow-hidden');
	}, [expanded]);

	const navLinks = [
		{ href: '/', label: nav.home },
		{ href: '/markets', label: nav.markets },
		{ href: '/trade', label: nav.trade },
		{ href: '/blog', label: nav.blog },
		{ href: '/about', label: nav.about },
		{ href: '/fees', label: nav.fees },
		{ href: '/faq', label: nav.faq },
	];

	return (
		<>
			<div className="2xl:hidden min-w-12 h-12 md:h-14 md:w-14 relative border border-grayscale-03 rounded-full z-30">
				<button
					ref={btnRef}
					onClick={handleClick}
					className="relative 2xl:hidden z-30 rounded-[40px] flex items-center justify-center bg-brand-tertiary w-12 h-12 md:w-14 md:h-14"
				>
					{HamburgerIcon}
				</button>
			</div>

			{/* Full Screen Menu Overlay */}
			{/* Dark Background */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm w-screen h-screen top-0 right-0 z-40"
				onClick={handleClick}
				style={{
					opacity: expanded ? 1 : 0,
					visibility: expanded ? 'visible' : 'hidden',
					transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
				}}
			/>

			{/* Menu Container */}
			<div
				ref={menuRef}
				className="absolute w-[350px] h-[66dvh] opacity-0 2xl:hidden rounded-l-[40px] right-0 top-0 overflow-hidden bg-brand-tertiary z-50 transition-all duration-300 ease-in-out translate-x-full"
			>
				<div className="flex flex-col h-full p-6 bg-white">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						{/* Logo */}
						<div className="flex flex-row items-center gap-2">
							<button
								onClick={handleClick}
								className="relative 2xl:hidden z-30 flex items-center justify-center bg-brand-tertiary w-12 h-12 border border-grayscale-03 rounded-full "
							>
								{CloseIcon}
							</button>
							<Link href="/" className="flex items-center">
								<Image
									src="/Logo.png"
									alt="Eterex logo"
									width={120}
									height={36}
									priority
								/>
							</Link>
						</div>

						{/* Theme Toggle */}
						<MobileThemeToggle />
					</div>

					{/* Navigation Links */}
					<nav className="flex-1 mb-10">
						<ul className="space-y-2">
							{navLinks.map((link) => {
								return (
									<li key={link.href}>
										<Link
											href={link.href}
											onClick={handleClick}
											className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full justify-between`}
										>
											<span className="font-semibold text-base leading-6 text-right text-grayscale-07">
												{link.label}
											</span>{' '}
											<ChevronIcon />
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Action Buttons */}
					<div className="border-t border-grayscale-03 pt-10 flex flex-row items-center gap-4">
						{/* Account Button */}
						<Link
							href="/login"
							onClick={handleClick}
							className="flex items-center justify-between w-full pr-3 pl-4 h-14 rounded-[40px] bg-primary "
						>
							<UserIcon />
							<span className="font-bold text-sm leading-5 text-white">
								{mobile.account}
							</span>
						</Link>

						{/* Download App Button */}
						<Link
							href="/download"
							onClick={handleClick}
							className="flex items-center justify-between w-full pr-3 pl-4 h-14 rounded-[40px] bg-brand-primary-container"
						>
							<DownloadIcon />
							<span className="font-bold text-sm leading-5 text-primary">
								{mobile.downloadApp}
							</span>
						</Link>
					</div>

					{/* Social Media Icons */}
					<div className="flex items-center justify-center flex-row-reverse gap-4 pt-10">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-20 h-14 flex items-center justify-center rounded-full bg-grayscale-02 hover:bg-grayscale-03 transition-colors"
							aria-label="Instagram"
						>
							<InstagramIcon />
						</a>
						<a
							href="https://telegram.org"
							target="_blank"
							rel="noopener noreferrer"
							className="w-20 h-14 flex items-center justify-center rounded-full bg-grayscale-02 hover:bg-grayscale-03 transition-colors"
							aria-label="Telegram"
						>
							<TelegramIcon />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-20 h-14 flex items-center justify-center rounded-full bg-grayscale-02 hover:bg-grayscale-03 transition-colors"
							aria-label="LinkedIn"
						>
							<LinkedInIcon />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-20 h-14 flex items-center justify-center rounded-full bg-grayscale-02 hover:bg-grayscale-03 transition-colors"
							aria-label="Twitter"
						>
							<TwitterIcon />
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
