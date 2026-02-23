import Text from '@/components/UI/Text';
import Image from 'next/image';

const Page = () => {
	return (
		<div
			className="h-dvh w-full"
			style={{
				background: 'linear-gradient(180deg, #0b2ba5,#1f2de2, #1a27e6)',
			}}
		>
			<Image
				src="/assets/campaign/gads1404-g/Bottomless.png"
				alt="banner"
				width={1000}
				height={1000}
				className="w-full h-dvh sm:w-fit sm:mx-auto"
			/>
			<a
				href="https://app.eterex.com/register"
				target="_blank"
				rel="noopener noreferrer"
				className="absolute left-1/2 -translate-x-1/2 w-[80%] max-w-[420px] bottom-[10%] rounded-[120px] flex flex-col items-center justify-center py-4 gap-2 gelatine cursor-pointer hover:opacity-95 transition-opacity border-6 border-white border-double"
			>
				<Text variant="Main/20px/Bold" className="text-white">
					ثبت نام و شروع معامله
				</Text>
				<Text variant="Main/14px/Bold" className="text-white">
					در کمتر از ۵ دقیقه
				</Text>
			</a>
		</div>
	);
};
export default Page;
