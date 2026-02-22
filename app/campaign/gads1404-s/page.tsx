import Text from '@/components/UI/Text';
import Image from 'next/image';

const Page = () => {
	return (
		<div
			className="h-screen w-full"
			style={{
				background: 'linear-gradient(180deg, #0b0c22,#1c1d40, #100f2c)',
			}}
		>
			<Image
				src="/assets/campaign/gads1404-s/Bottomless.jpg"
				alt="banner"
				width={1000}
				height={1000}
				className="w-full h-screen sm:w-fit sm:mx-auto"
			/>
			<a
				href="https://app.eterex.com/register"
				target="_blank"
				rel="noopener noreferrer"
				className="bg-[#0934f1] rounded-2xl flex flex-col items-center justify-center py-4 max-w-[80%] mx-auto gap-2 absolute left-0 right-0 sm:max-w-[420px] gelatine cursor-pointer hover:opacity-95 transition-opacity bottom-0 sm:bottom-40"
			>
				<Text variant="Main/24px/Bold" className="text-white">
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
