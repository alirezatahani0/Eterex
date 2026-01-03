'use client';
import Coins from '@/components/home/Coins';
import HeroSection from '@/components/home/HeroSection';
import LatestEvents from '@/components/home/LatestEvents';
import ListedCryptos from '@/components/home/ListedCryptos';
import StatisticsSection from '@/components/home/StatisticsSection';
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
			
			<Container className="py-12 md:py-16 lg:py-20">
				<DownloadSection />
			</Container>
		</main>
	);
}
