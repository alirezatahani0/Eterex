import type { Metadata } from 'next';
import BlogSection from '@/components/home/Blog';
import Coins from '@/components/home/Coins';
import FeaturesSection from '@/components/home/Features';
import HeroSection from '@/components/home/HeroSection';
import LatestEvents from '@/components/home/LatestEvents';
import ListedCryptos from '@/components/home/ListedCryptos';
import StatisticsSection from '@/components/home/StatisticsSection';
import StepsSection from '@/components/home/Steps';
import BrandTicker from '@/components/UI/BrandTicker';
import Container from '@/components/UI/Container';
import { DownloadSection } from '@/components/UI/DownloadSection';
import KeywordPool from '@/components/home/KeywordPool';

export const metadata: Metadata = {
	title: 'صرافی اتراکس | معتبرترین صرافی ارز دیجیتال ایرانی',
	description:
		'صرافی اتراکس، بستر امن و سریع خرید و فروش ارز دیجیتال با پشتیبانی ۲۴ ساعته و کارمزد رقابتی',
	keywords: [
		'صرافی ارز دیجیتال',
		'خرید ارز دیجیتال',
		'فروش ارز دیجیتال',
		'بیت کوین',
		'اتریوم',
		'کریپتو',
		'صرافی اتراکس',
		'معاملات رمزارز',
	],
	authors: [{ name: 'Eterex' }],
	creator: 'Eterex',
	publisher: 'Eterex',
	openGraph: {
		title: 'صرافی اتراکس | معتبرترین صرافی ارز دیجیتال ایرانی',
		description:
			'صرافی اتراکس، بستر امن و سریع خرید و فروش ارز دیجیتال با پشتیبانی ۲۴ ساعته و کارمزد رقابتی',
		type: 'website',
		locale: 'fa_IR',
		url: '/',
		siteName: 'اترکس',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'صرافی اتراکس | معتبرترین صرافی ارز دیجیتال ایرانی',
		description:
			'صرافی اتراکس، بستر امن و سریع خرید و فروش ارز دیجیتال با پشتیبانی ۲۴ ساعته و کارمزد رقابتی',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function Home() {
	return (
		<main>
			<HeroSection />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<LatestEvents />
				<ListedCryptos />
			</div>

			<Coins />
			<StatisticsSection />
			<FeaturesSection />
			<StepsSection />
			<BrandTicker
				logos={[
					{
						src: '/assets/partners/آی تی ساز.png',
						alt: 'آی تی ساز',
						width: 64,
						height: 64,
						text: 'آی تی ساز',
					},
					{
						src: '/assets/partners/انجمن بلاکچین.png',
						alt: 'انجمن بلاکچین',
						width: 64,
						height: 64,
						text: 'انجمن بلاکچین',
					},
					{
						src: '/assets/partners/انجمن فینتک.png',
						alt: 'انجمن فینتک',
						width: 64,
						height: 64,
						text: 'انجمن فینتک',
					},
					{
						src: '/assets/partners/بانک رسالت.png',
						alt: 'بانک رسالت',
						width: 64,
						height: 64,
						text: 'بانک رسالت',
					},
					{
						src: '/assets/partners/بانک گردشگری.png',
						alt: 'بانک گردشگری',
						width: 64,
						height: 64,
						text: 'بانک گردشگری',
					},
					{
						src: '/assets/partners/بانک ملی.png',
						alt: 'بانک ملی',
						width: 64,
						height: 64,
						text: 'بانک ملی',
					},
					{
						src: '/assets/partners/جیبیت.png',
						alt: 'جیبیت',
						width: 64,
						height: 64,
						text: 'جیبیت',
					},
					{
						src: '/assets/partners/زیبال.png',
						alt: 'زیبال',
						width: 64,
						height: 64,
						text: 'زیبال',
					},
					{
						src: '/assets/partners/فینوتک.png',
						alt: 'فینوتک',
						width: 64,
						height: 64,
						text: 'فینوتک',
					},
					{
						src: '/assets/partners/نظام صنفی رایانه\u200cای.png',
						alt: 'نظام صنفی رایانه\u200cای',
						width: 64,
						height: 64,
						text: 'نظام صنفی رایانه\u200cای',
					},
					{
						src: '/assets/partners/وندار.png',
						alt: 'وندار',
						width: 64,
						height: 64,
						text: 'وندار',
					},
					{
						src: '/assets/Brand/saman.png',
						alt: 'saman',
						width: 64,
						height: 64,
						text: 'بانک سامان',
					},
					{
						src: '/assets/Brand/saderat.png',
						alt: 'saderat',
						width: 64,
						height: 64,
						text: 'بانک صادرات',
					},
					{
						src: '/assets/Brand/ayande.png',
						alt: 'ayande',
						width: 64,
						height: 64,
						text: 'بانک آینده',
					},
					{
						src: '/assets/Brand/middleEast.png',
						alt: 'middleEast',
						width: 64,
						height: 64,
						text: 'بانک خاورمیانه',
					},
					{
						src: '/assets/Brand/blu.png',
						alt: 'blu',
						width: 64,
						height: 64,
						text: ' بلو بانک',
					},
					{
						src: '/assets/Brand/parsian.png',
						alt: 'parsian',
						width: 64,
						height: 64,
						text: 'بانک پارسیان',
					},
				]}
			/>
			<BlogSection />

			<Container className="py-12 md:py-16 lg:py-20">
				<DownloadSection />
			</Container>

			<KeywordPool />
		</main>
	);
}
