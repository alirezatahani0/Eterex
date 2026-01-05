'use client';
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
		</main>
	);
}
