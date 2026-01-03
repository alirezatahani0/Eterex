import HeroSection from '@/components/home/HeroSection';
import LatestEvents from '@/components/home/LatestEvents';
import ListedCryptos from '@/components/home/ListedCryptos';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<LatestEvents />
				<ListedCryptos />
			</div>
		</main>
	);
}
