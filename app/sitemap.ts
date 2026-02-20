import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eterex.com';

	// Static pages
	const staticPages = [
		'',
		'/about',
		'/services',
		'/pricing',
		'/contact-us',
		'/faq',
		'/terms',
		'/privacy',
	];

	// Dynamic pages (market data pages)
	const dynamicPages = [
		'/bitcoin',
		'/market/ethereum',
		'/market/crypto',
	];

	const routes: MetadataRoute.Sitemap = [...staticPages, ...dynamicPages].map(
		(route) => {
			const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
				route.startsWith('/market') ? 'hourly' : 'weekly';
			return {
				url: `${baseUrl}${route}`,
				lastModified: new Date(),
				changeFrequency,
				priority: route === '' ? 1 : route.startsWith('/market') ? 0.8 : 0.7,
			};
		},
	);

	return routes;
}
