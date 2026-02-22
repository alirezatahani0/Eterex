import Text from '@/components/UI/Text';
import Image from 'next/image';

const Page = () => {
	return (
		<div
			className="h-dvh w-full"
			style={{
				background: 'linear-gradient(180deg, #0b0c22,#1c1d40, #100f2c)',
			}}
		>
			<Image
				src="/assets/campaign/gads1404-v/Bottomless.png"
				alt="banner"
				width={1000}
				height={1000}
				className="w-full h-dvh sm:w-fit sm:mx-auto"
			/>
			<a
				href="https://app.eterex.com/register"
				target="_blank"
				rel="noopener noreferrer"
				className="absolute left-1/2 -translate-x-1/2 w-[80%] max-w-[420px] bottom-[12%] bg-[#0934f1] rounded-2xl flex flex-col items-center justify-center py-4 gap-2 gelatine cursor-pointer hover:opacity-95 transition-opacity"
			>
				<Text variant="Main/20px/Bold" className="text-white">
					ثبت نام و شروع خرید و فروش
				</Text>
				<Text variant="Main/14px/Bold" className="text-white">
					کمتر از ۵ دقیقه
				</Text>
			</a>
		</div>
	);
};
export default Page;
