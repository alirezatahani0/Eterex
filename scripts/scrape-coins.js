/**
 * Coin Scraper Script
 * 
 * This script scrapes coin information from external sources and saves it to a JSON file.
 * 
 * Usage:
 *   node scripts/scrape-coins.js
 * 
 * Configuration:
 *   - Update SOURCE_URL to the website you want to scrape
 *   - Update SELECTORS to match the page structure
 *   - Update DELAY_MS to control request rate (be respectful!)
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

// Configuration
const CONFIG = {
	// API endpoint to get list of coins
	COINS_API_URL: process.env.NEXT_PUBLIC_PUBLIC_API_URL || 'https://publicv2.eterex.com/public/api',
	
	// Output file
	OUTPUT_FILE: join(__dirname, '../data/coins-data.json'),
	
	// Delay between requests (milliseconds) - be respectful!
	DELAY_MS: 2000, // 2 seconds between requests
	
	// Maximum retries for failed requests
	MAX_RETRIES: 3,
	
	// Batch size for processing
	BATCH_SIZE: 10,
	
	// Source website configuration
	// Update these based on the website you're scraping
	SOURCE: {
		// Example: CoinMarketCap
		BASE_URL: 'https://coinmarketcap.com/currencies',
		// Example: CoinGecko
		// BASE_URL: 'https://www.coingecko.com/en/coins',
		
		// Selectors for extracting data (update based on actual page structure)
		SELECTORS: {
			description: 'p, .description, [data-description]',
			marketCap: '[data-market-cap], .market-cap',
			volume: '[data-volume], .volume',
			price: '[data-price], .price',
			// Add more selectors as needed
		}
	}
};

/**
 * Fetch list of coins from API
 */
async function getCoinsList() {
	try {
		console.log('Fetching coins list from API...');
		const response = await fetch(`${CONFIG.COINS_API_URL}/assets/list?page_size=10000`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		
		// Extract symbols from the response
		const coins = data.data?.map(asset => ({
			symbol: asset.symbol,
			name: asset.full_name || asset.name,
			id: asset.id
		})) || [];
		
		console.log(`Found ${coins.length} coins`);
		return coins;
	} catch (error) {
		console.error('Error fetching coins list:', error);
		throw error;
	}
}

/**
 * Scrape coin information from a single page
 * This is a template - you'll need to customize based on the actual website structure
 */
async function scrapeCoinPage(symbol, coinName) {
	// This is a placeholder - you'll need to implement actual scraping logic
	// Options:
	// 1. Use Puppeteer for JavaScript-heavy sites
	// 2. Use Cheerio for static HTML
	// 3. Use the website's API if available
	
	const url = `${CONFIG.SOURCE.BASE_URL}/${symbol.toLowerCase()}`;
	
	try {
		// Example using fetch (for static content or APIs)
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
			}
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const html = await response.text();
		
		// Parse HTML and extract data
		// You'll need to use Cheerio or similar to parse HTML
		// For now, returning placeholder structure
		
		return {
			symbol: symbol.toUpperCase(),
			name: coinName,
			description: '', // Extract from page
			marketInfo: {
				rank: null,
				marketCap: null,
				volume24h: null,
				circulatingSupply: null,
				maxSupply: null
			},
			howToBuy: {
				description: '',
				steps: []
			},
			howToSell: {
				description: '',
				steps: []
			},
			transactionFee: {
				description: '',
				fee: null
			},
			wallets: {
				description: '',
				supportedWallets: []
			},
			learning: {
				description: '',
				resources: []
			},
			scrapedAt: new Date().toISOString(),
			source: url
		};
	} catch (error) {
		console.error(`Error scraping ${symbol}:`, error.message);
		return null;
	}
}

/**
 * Process coins in batches with delay
 */
async function processCoins(coins, existingData = {}) {
	const results = { ...existingData };
	let processed = 0;
	let skipped = 0;
	let failed = 0;
	
	for (let i = 0; i < coins.length; i += CONFIG.BATCH_SIZE) {
		const batch = coins.slice(i, i + CONFIG.BATCH_SIZE);
		
		console.log(`\nProcessing batch ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} (${i + 1}-${Math.min(i + CONFIG.BATCH_SIZE, coins.length)} of ${coins.length})`);
		
		const batchPromises = batch.map(async (coin) => {
			// Skip if already scraped
			if (results[coin.symbol]) {
				console.log(`  ✓ ${coin.symbol} - already exists, skipping`);
				skipped++;
				return;
			}
			
			// Add delay between requests
			await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_MS));
			
			let retries = 0;
			while (retries < CONFIG.MAX_RETRIES) {
				try {
					const data = await scrapeCoinPage(coin.symbol, coin.name);
					if (data) {
						results[coin.symbol] = data;
						console.log(`  ✓ ${coin.symbol} - scraped successfully`);
						processed++;
						return;
					}
				} catch (error) {
					retries++;
					if (retries < CONFIG.MAX_RETRIES) {
						console.log(`  ⚠ ${coin.symbol} - retry ${retries}/${CONFIG.MAX_RETRIES}`);
						await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_MS * 2));
					} else {
						console.log(`  ✗ ${coin.symbol} - failed after ${CONFIG.MAX_RETRIES} retries`);
						failed++;
					}
				}
			}
		});
		
		await Promise.all(batchPromises);
		
		// Save progress after each batch
		saveResults(results);
	}
	
	console.log(`\n=== Summary ===`);
	console.log(`Processed: ${processed}`);
	console.log(`Skipped: ${skipped}`);
	console.log(`Failed: ${failed}`);
	console.log(`Total: ${Object.keys(results).length} coins in database`);
	
	return results;
}

/**
 * Save results to JSON file
 */
function saveResults(data) {
	// Ensure data directory exists
	const dataDir = dirname(CONFIG.OUTPUT_FILE);
	if (!existsSync(dataDir)) {
		mkdirSync(dataDir, { recursive: true });
	}
	
	writeFileSync(
		CONFIG.OUTPUT_FILE,
		JSON.stringify(data, null, 2),
		'utf-8'
	);
	
	console.log(`\n💾 Saved ${Object.keys(data).length} coins to ${CONFIG.OUTPUT_FILE}`);
}

/**
 * Load existing data if file exists
 */
function loadExistingData() {
	if (existsSync(CONFIG.OUTPUT_FILE)) {
		try {
			const data = JSON.parse(readFileSync(CONFIG.OUTPUT_FILE, 'utf-8'));
			console.log(`📂 Loaded ${Object.keys(data).length} existing coins`);
			return data;
		} catch (error) {
			console.warn('⚠️  Could not load existing data, starting fresh');
			return {};
		}
	}
	return {};
}

/**
 * Main function
 */
async function main() {
	console.log('🚀 Starting coin scraper...\n');
	
	try {
		// Load existing data
		const existingData = loadExistingData();
		
		// Get list of coins
		const coins = await getCoinsList();
		
		// Process coins
		const results = await processCoins(coins, existingData);
		
		// Final save
		saveResults(results);
		
		console.log('\n✅ Scraping completed!');
	} catch (error) {
		console.error('\n❌ Error:', error);
		process.exit(1);
	}
}

// Run if executed directly
if (require.main === module) {
	main();
}

export default { scrapeCoinPage, getCoinsList, processCoins };

