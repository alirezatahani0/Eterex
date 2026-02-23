'use client';

import Link from 'next/link';
import Text from '../UI/Text';
import Image from 'next/image';

/* Pixel-perfect 404 page from Figma */


const ChatOutlineIcon = () => (
	<svg
		width="21"
		height="24"
		viewBox="0 0 21 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2_271)" className="[&>path]:stroke-grayscale-01!">
			<path
				d="M6.90735 18.9948C8.57611 19.8508 10.4957 20.0827 12.3203 19.6486C14.1449 19.2145 15.7545 18.143 16.859 16.6272C17.9634 15.1114 18.4902 13.2509 18.3443 11.3811C18.1985 9.51127 17.3896 7.75501 16.0634 6.42882C14.7372 5.10263 12.9809 4.29371 11.1111 4.14784C9.24124 4.00197 7.38078 4.52873 5.86497 5.63321C4.34915 6.73769 3.27765 8.34725 2.84357 10.1718C2.40948 11.9964 2.64135 13.9161 3.49739 15.5848L1.74869 20.7435L6.90735 18.9948Z"
				strokeWidth="1.7487"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2_271">
				<rect width="20.9844" height="24" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

const DocumentOutlineIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="[&>path]:stroke-grayscale-01!"
	>
		<path
			d="M15 18H10"
			stroke="#030213"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M18 14H10"
			stroke="#030213"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V20C6 20.5304 5.78929 21.0391 5.41421 21.4142C5.03914 21.7893 4.53043 22 4 22ZM4 22C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H6"
			stroke="#030213"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M17 6H11C10.4477 6 10 6.44772 10 7V9C10 9.55228 10.4477 10 11 10H17C17.5523 10 18 9.55228 18 9V7C18 6.44772 17.5523 6 17 6Z"
			stroke="#030213"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const UserSolidIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M7 20.662V19C7 18.4696 7.21071 17.9609 7.58579 17.5858C7.96086 17.2107 8.46957 17 9 17H15C15.5304 17 16.0391 17.2107 16.4142 17.5858C16.7893 17.9609 17 18.4696 17 19V20.662"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function NotFoundContent() {
	return (
		<main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 md:py-16">
			<Image src="/assets/main/404.avif" alt="404" width={500} height={500} />
			<div className="flex flex-col items-center text-center justify-start w-full -mt-14">
				{/* Heading */}
				<Text
					type="h1"
					variant="Main/32px/Black"
					className="text-grayscale-07! my-6"
				>
					چیزی که دنبالش بودی اینجا نیست!
				</Text>

				{/* Paragraphs */}
				<Text variant="Main/16px/Regular" className="text-grayscale-06! my-4">
					ممکنه لینک اشتباه باشه یا صفحه منتقل شده باشه.
				</Text>
				<Text variant="Main/16px/Regular" className="text-grayscale-06! mb-8">
					اگر نیاز به راهنمایی دارید از گزینه‌های زیر استفاده کنید
				</Text>

				{/* Buttons */}
				<div className="flex flex-wrap items-center justify-center gap-3 w-full">
					<Link
						href="https://app.eterex.com/login"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex bg-brand-primary items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl text-white font-medium text-sm transition-opacity hover:opacity-95"
					>
						<UserSolidIcon />
						<Text
							variant="Main/14px/Bold"
							className="leading-tight text-white!"
						>
							حساب کاربری
						</Text>
					</Link>
					<Link
						href="/contact-us"
						className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl border border-grayscale-03 bg-grayscale-07 hover:bg-grayscale-02 transition-colors"
					>
						<ChatOutlineIcon />
						<Text
							variant="Main/14px/Bold"
							className="leading-tight text-grayscale-01!"
						>
							ارتباط با پشتیبانی
						</Text>
					</Link>
					<Link
						href="https://eterex.com/blog/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl border border-grayscale-03 bg-grayscale-07 hover:bg-grayscale-02 transition-colors"
					>
						<DocumentOutlineIcon />
						<Text
							variant="Main/14px/Bold"
							className="leading-tight text-grayscale-01!"
						>
							وبلاگ اتراکس
						</Text>
					</Link>
				</div>
			</div>
		</main>
	);
}
