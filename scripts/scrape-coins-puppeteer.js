/**
 * Coin Scraper Script using Puppeteer
 *
 * This script scrapes coin information from eterex.com/coin/[symbol] pages
 * Install dependencies: npm install puppeteer
 *
 * Usage:
 *   node scripts/scrape-coins-puppeteer.js
 */

import { launch } from 'puppeteer';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
	COINS_API_URL: 'https://api.eterex.com/api',
	OUTPUT_FILE: join(__dirname, '../data/coins-data.json'),
	DELAY_MS: 3000, // 3 seconds between requests
	MAX_RETRIES: 3,
	HEADLESS: true, // Set to false to see browser
	TIMEOUT: 30000, // 30 seconds timeout per page

	// Source website - Eterex coin pages
	SOURCE: {
		BASE_URL: 'https://eterex.com/coin',
	},
};

/**
 * Fetch list of coins from API
 */
async function getCoinsList() {
	try {
		console.log('Fetching coins list from API...');
		const response = await fetch(`https://publicv2.eterex.com/public/api/assets/price/list`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		const coins =
			data?.map((asset) => ({
				symbol: asset.symbol.split("USDT")[0],
				name: asset.full_name || asset.symbol,
				id: asset.id,
			})) || [];

		console.log(`Found ${coins.length} coins`);
		return coins;
	} catch (error) {
		console.error('Error fetching coins list:', error);
		throw error;
	}
}

/**
 * Scrape coin page using Puppeteer
 */
async function scrapeCoinPage(browser, symbol, coinName) {
	const url = `${CONFIG.SOURCE.BASE_URL}/${symbol.toLowerCase()}`;
	const page = await browser.newPage();

	try {
		// Set viewport and user agent
		await page.setViewport({ width: 1920, height: 1080 });
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		);

		// Navigate to page
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: CONFIG.TIMEOUT,
		});

		// Extract data from page
		const data = await page.evaluate(() => {
			const getAllText = (selector) => {
				const els = Array.from(document.querySelectorAll(selector));
				return els
					.map((el) => el.textContent.trim())
					.filter((text) => text.length > 0);
			};

			// Extract price from header (look for price in تومان)
			const bodyText = document.body.innerText;
			const priceMatch = bodyText.match(/([\d,]+)\s*تومان/);
			const price = priceMatch ? priceMatch[1].replace(/,/g, '') : null;

			// Find the main content area (div#asset-content or similar)
			const contentArea =
				document.querySelector(
					'#asset-content, [class*="asset-content"], main, article',
				) || document.body;

			// Extract sections based on headings (h2, h3)
			const sections = {};
			const headings = Array.from(contentArea.querySelectorAll('h2, h3, h4'));

			headings.forEach((heading) => {
				const headingText = heading.textContent.trim();
				if (!headingText) return;

				let content = '';

				// Get content after heading until next heading
				let nextSibling = heading.nextElementSibling;
				const contentParts = [];

				while (nextSibling && nextSibling !== contentArea.lastElementChild) {
					// Stop if we hit another heading
					if (['H1', 'H2', 'H3', 'H4'].includes(nextSibling.tagName)) {
						break;
					}

					// Collect text from paragraphs and divs
					const text = nextSibling.textContent?.trim();
					if (text && text.length > 20) {
						contentParts.push(text);
					}

					nextSibling = nextSibling.nextElementSibling;
				}

				content = contentParts.join(' ').trim();

				if (content.length > 50) {
					// Map Persian headings to structured keys
					if (
						headingText.includes('خرید و فروش') ||
						headingText.includes('Buy and Sell')
					) {
						sections.howToBuy = content;
						sections.howToSell = content; // Often combined
					} else if (
						headingText.includes('قیمت لحظه') ||
						headingText.includes('Live Price') ||
						headingText.includes('قیمت لحظه')
					) {
						sections.priceInfo = content;
					} else if (
						headingText.includes('کیف پول') ||
						headingText.includes('Wallet')
					) {
						sections.wallets = content;
					} else if (
						headingText.includes('چیست') ||
						headingText.includes('What is') ||
						headingText.includes('تتر چیست')
					) {
						sections.description = content;
					} else if (
						headingText.includes('رایگان') ||
						headingText.includes('Free') ||
						headingText.includes('تتر رایگان')
					) {
						sections.free = content;
					} else if (
						headingText.includes('ماینینگ') ||
						headingText.includes('Mining') ||
						headingText.includes('ماینینگ تتر')
					) {
						sections.mining = content;
					} else if (
						headingText.includes('وایت پیپر') ||
						headingText.includes('Whitepaper') ||
						headingText.includes('وایت پیپر تتر')
					) {
						sections.whitepaper = content;
					} else if (
						headingText.includes('تاریخچه') ||
						headingText.includes('History')
					) {
						sections.history = content;
					} else if (
						headingText.includes('مزایای') ||
						headingText.includes('Advantages')
					) {
						sections.advantages = content;
					} else if (
						headingText.includes('بهترین زمان') ||
						headingText.includes('Best time')
					) {
						sections.bestTime = content;
					} else {
						// Store other sections with sanitized key
						const key = headingText
							.toLowerCase()
							.replace(/[^\w\s]/g, '')
							.replace(/\s+/g, '_')
							.substring(0, 50);
						if (key) {
							sections[key] = content;
						}
					}
				}
			});

			// Extract all paragraphs for full description
			const allParagraphs = getAllText('p');
			const fullDescription = allParagraphs.join(' ').trim();

			// Get main description (usually "What is" section or first substantial paragraph)
			const mainDescription =
				sections.description ||
				allParagraphs.find((p) => p.length > 100) ||
				fullDescription.substring(0, 500);

			return {
				price: price,
				mainDescription: mainDescription,
				fullDescription: fullDescription.substring(0, 10000), // Increased limit
				sections: sections,
				allHeadings: headings.map((h) => h.textContent.trim()),
				bodyText: bodyText.substring(0, 20000), // Store more text for reference
			};
		});

		// Structure the data based on extracted content
		return {
			symbol: symbol.toUpperCase(),
			name: coinName,
			description: data.sections.description || data.mainDescription || '',
			price: data.price || null,
			marketInfo: {
				title: 'اطلاعات بازار',
				description: data.sections.priceInfo || '',
				price: data.price,
			},
			howToBuy: {
				title: 'نحوه خرید',
				description: data.sections.howToBuy || '',
				steps: [],
			},
			howToSell: {
				title: 'نحوه فروش',
				description: data.sections.howToSell || data.sections.howToBuy || '',
				steps: [],
			},
			transactionFee: {
				title: 'کارمزد معامله',
				description: '',
				fee: null,
			},
			wallets: {
				title: 'کیف پول‌های ارزی',
				description: data.sections.wallets || '',
				supportedWallets: [],
			},
			learning: {
				title: 'آموزش خرید ارزان',
				description:
					data.sections.free ||
					data.sections.mining ||
					data.sections.whitepaper ||
					'',
				resources: [],
			},
			additionalInfo: {
				history: data.sections.history || '',
				advantages: data.sections.advantages || '',
				bestTime: data.sections.bestTime || '',
				free: data.sections.free || '',
				mining: data.sections.mining || '',
				whitepaper: data.sections.whitepaper || '',
				allHeadings: data.allHeadings,
				// Store other sections that don't fit into main categories
				other: Object.entries(data.sections)
					.filter(
						([key]) =>
							![
								'description',
								'howToBuy',
								'howToSell',
								'priceInfo',
								'wallets',
								'free',
								'mining',
								'whitepaper',
								'history',
								'advantages',
								'bestTime',
							].includes(key),
					)
					.reduce((acc, [key, value]) => {
						acc[key] = value;
						return acc;
					}, {}),
			},
			scrapedAt: new Date().toISOString(),
			source: url,
		};
	} catch (error) {
		console.error(`Error scraping ${symbol}:`, error.message);
		return null;
	} finally {
		await page.close();
	}
}

/**
 * Process coins with Puppeteer
 */
async function processCoins(coins, existingData = {}) {
	const browser = await launch({
		headless: CONFIG.HEADLESS,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	const results = { ...existingData };
	let processed = 0;
	let skipped = 0;
	let failed = 0;

	try {
		for (let i = 0; i < coins.length; i++) {
			const coin = coins[i];

			// Skip if already scraped
			if (results[coin.symbol]) {
				console.log(`  ✓ ${coin.symbol} - already exists, skipping`);
				skipped++;
				continue;
			}

			console.log(`\n[${i + 1}/${coins.length}] Scraping ${coin.symbol}...`);

			let retries = 0;
			while (retries < CONFIG.MAX_RETRIES) {
				try {
					const data = await scrapeCoinPage(browser, coin.symbol, coin.name);

					if (data && (data.description || data.fullDescription)) {
						results[coin.symbol] = data;
						console.log(`  ✓ ${coin.symbol} - scraped successfully`);
						processed++;
						break;
					} else {
						throw new Error('No data extracted');
					}
				} catch (err) {
					retries++;
					if (retries < CONFIG.MAX_RETRIES) {
						console.log(
							`  ⚠ ${coin.symbol} - retry ${retries}/${CONFIG.MAX_RETRIES}: ${err.message}`,
						);
						await new Promise((resolve) =>
							setTimeout(resolve, CONFIG.DELAY_MS * 2),
						);
					} else {
						console.log(
							`  ✗ ${coin.symbol} - failed after ${CONFIG.MAX_RETRIES} retries: ${err.message}`,
						);
						failed++;
					}
				}
			}

			// Delay between requests
			if (i < coins.length - 1) {
				await new Promise((resolve) => setTimeout(resolve, CONFIG.DELAY_MS));
			}

			// Save progress every 10 coins
			if ((i + 1) % 10 === 0) {
				saveResults(results);
				console.log(`  💾 Progress saved (${i + 1}/${coins.length})`);
			}
		}
	} finally {
		await browser.close();
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
	const dataDir = dirname(CONFIG.OUTPUT_FILE);
	if (!existsSync(dataDir)) {
		mkdirSync(dataDir, { recursive: true });
	}

	writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');

	console.log(
		`\n💾 Saved ${Object.keys(data).length} coins to ${CONFIG.OUTPUT_FILE}`,
	);
}

/**
 * Load existing data
 */
function loadExistingData() {
	if (existsSync(CONFIG.OUTPUT_FILE)) {
		try {
			const data = JSON.parse(readFileSync(CONFIG.OUTPUT_FILE, 'utf-8'));
			console.log(`📂 Loaded ${Object.keys(data).length} existing coins`);
			return data;
		} catch {
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
	console.log('🚀 Starting coin scraper for eterex.com...\n');

	try {
		const existingData = loadExistingData();
		const coins = await getCoinsList();
		const results = await processCoins(coins, existingData);
		saveResults(results);

		console.log('\n✅ Scraping completed!');
		console.log(`📁 Data saved to: ${CONFIG.OUTPUT_FILE}`);
	} catch (error) {
		console.error('\n❌ Error:', error);
		process.exit(1);
	}
}

// Run if executed directly (ES module way)
const isMainModule =
	import.meta.url === `file://${process.argv[1]}` ||
	process.argv[1]?.endsWith('scrape-coins-puppeteer.js');
if (isMainModule) {
	main();
}

const exports = { scrapeCoinPage, getCoinsList, processCoins };
export default exports;
