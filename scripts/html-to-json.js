/**
 * HTML to JSON Converter for Coin Data
 * 
 * This script reads HTML files containing coin information and converts them to JSON format.
 * 
 * Usage:
 *   node scripts/html-to-json.js [options]
 * 
 * Options:
 *   --input-dir <path>    Directory containing HTML files (default: ./html-coins)
 *   --output-dir <path>   Directory to save JSON files (default: ./data/coins)
 *   --single-file         Save all coins in a single JSON file (default: false)
 *   --output-file <name>  Output filename when using --single-file (default: coins-data.json)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname, basename, extname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as cheerio from 'cheerio';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default configuration
const DEFAULT_CONFIG = {
	inputDir: join(__dirname, '../html-coins'),
	outputDir: join(__dirname, '../public/data/coins'), // Output to public so files are accessible via fetch
	singleFile: false,
	outputFile: 'coins-data.json',
};

// Parse command line arguments
function parseArgs() {
	const args = process.argv.slice(2);
	const config = { ...DEFAULT_CONFIG };
	
	for (let i = 0; i < args.length; i++) {
		switch (args[i]) {
			case '--input-dir':
				config.inputDir = resolve(args[++i] || DEFAULT_CONFIG.inputDir);
				break;
			case '--output-dir':
				config.outputDir = resolve(args[++i] || DEFAULT_CONFIG.outputDir);
				break;
			case '--single-file':
				config.singleFile = true;
				break;
			case '--output-file':
				config.outputFile = args[++i] || DEFAULT_CONFIG.outputFile;
				break;
			case '--help':
			case '-h':
				console.log(`
HTML to JSON Converter for Coin Data

Usage:
  node scripts/html-to-json.js [options]

Options:
  --input-dir <path>     Directory containing HTML files (default: ./html-coins)
  --output-dir <path>    Directory to save JSON files (default: ./data/coins)
  --single-file          Save all coins in a single JSON file (default: false)
  --output-file <name>   Output filename when using --single-file (default: coins-data.json)
  --help, -h             Show this help message

Examples:
  node scripts/html-to-json.js
  node scripts/html-to-json.js --input-dir ./my-html-files --output-dir ./output
  node scripts/html-to-json.js --single-file --output-file all-coins.json
				`);
				process.exit(0);
				break;
		}
	}
	
	return config;
}

/**
 * Extract coin symbol from filename
 * Examples: "bitcoin.html" -> "BTC", "ethereum.html" -> "ETH"
 */
function extractSymbolFromFilename(filename) {
	const name = basename(filename, extname(filename));
	// Try to extract symbol from filename
	// You can customize this logic based on your naming convention
	return name.toUpperCase();
}

/**
 * Extract coin data from HTML content
 * Structure: <section> -> <div> -> <h3> (title) + <p> (description)
 */
function extractCoinData(html, filename) {
	const $ = cheerio.load(html);
	const symbol = extractSymbolFromFilename(filename);
	
	// Extract all sections from the HTML
	const sections = [];
	
	// Find all divs within section that contain h3 and p
	$('section > div').each((_, divEl) => {
		const $div = $(divEl);
		const $h3 = $div.find('h3').first();
		const $p = $div.find('p').first();
		
		const title = $h3.text().trim();
		const description = $p.text().trim();
		
		if (title && description) {
			sections.push({
				title: title,
				description: description,
			});
		}
	});
	
	// Try to identify and map common sections
	const coinData = {
		symbol: symbol,
		sections: sections,
		convertedAt: new Date().toISOString(),
		source: filename,
	};
	
	// Map sections to specific fields based on title patterns
	const titleMappings = {
		// What is X? / X چیست؟
		whatIs: /(چیست|what is)/i,
		// Buy and Sell / خرید و فروش
		buySell: /(خرید و فروش|buy.*sell|sell.*buy)/i,
		// Price / قیمت
		price: /(قیمت|price)/i,
		// Wallet / کیف پول
		wallet: /(کیف پول|wallet)/i,
		// History / تاریخچه
		history: /(تاریخچه|history)/i,
		// Advantages / مزایا
		advantages: /(مزایا|advantages|benefits)/i,
		// Best time to buy / بهترین زمان خرید
		bestTimeToBuy: /(بهترین زمان|best time)/i,
		// Free / رایگان
		free: /(رایگان|free)/i,
		// Mining / ماینینگ
		mining: /(ماینینگ|mining)/i,
		// Whitepaper / وایت پیپر
		whitepaper: /(وایت پیپر|whitepaper|white paper)/i,
		// How to buy / چگونه بخریم
		howToBuy: /(چگونه.*بخر|how.*buy)/i,
		// Features / خصوصیات
		features: /(خصوصیات|features|characteristics)/i,
		// Future / آینده
		future: /(آینده|future)/i,
		// Summary / جمع‌بندی
		summary: /(جمع‌بندی|summary|conclusion)/i,
	};
	
	// Extract and map sections
	const mappedFields = {};
	
	sections.forEach((section, index) => {
		const title = section.title.toLowerCase();
		
		// Try to match title to known patterns
		for (const [field, pattern] of Object.entries(titleMappings)) {
			if (pattern.test(title)) {
				if (!mappedFields[field]) {
					mappedFields[field] = section.description;
				}
				break;
			}
		}
		
		// Use first section as general description if not already set
		if (index === 0 && !coinData.description) {
			coinData.description = section.description;
		}
	});
	
	// Add mapped fields to coinData
	if (Object.keys(mappedFields).length > 0) {
		coinData.mappedFields = mappedFields;
	}
	
	// Try to extract coin name from first section or symbol
	if (!coinData.name) {
		// Look for "X چیست؟" pattern or use symbol
		const whatIsSection = sections.find(s => /چیست/i.test(s.title));
		if (whatIsSection) {
			// Try to extract coin name from the title
			const match = whatIsSection.title.match(/(.+?)\s*چیست/i);
			if (match) {
				coinData.name = match[1].trim();
			}
		}
		coinData.name = coinData.name || symbol;
	}
	
	return coinData;
}

/**
 * Get all HTML files from directory
 */
function getHtmlFiles(dir) {
	if (!existsSync(dir)) {
		console.error(`❌ Input directory does not exist: ${dir}`);
		console.log(`💡 Create the directory and add your HTML files there, or use --input-dir to specify a different path.`);
		process.exit(1);
	}
	
	const files = readdirSync(dir)
		.filter(file => file.toLowerCase().endsWith('.html'))
		.map(file => join(dir, file));
	
	if (files.length === 0) {
		console.error(`❌ No HTML files found in: ${dir}`);
		process.exit(1);
	}
	
	return files;
}

/**
 * Process a single HTML file
 */
function processHtmlFile(filePath, outputDir, singleFile = false) {
	try {
		console.log(`📄 Processing: ${basename(filePath)}`);
		
		const html = readFileSync(filePath, 'utf-8');
		const coinData = extractCoinData(html, basename(filePath));
		
		if (singleFile) {
			return coinData;
		}
		
		// Save individual JSON file
		const outputPath = join(outputDir, `${basename(filePath, '.html')}.json`);
		writeFileSync(outputPath, JSON.stringify(coinData, null, 2), 'utf-8');
		console.log(`  ✓ Saved: ${basename(outputPath)}`);
		
		return coinData;
	} catch (error) {
		console.error(`  ✗ Error processing ${basename(filePath)}:`, error.message);
		return null;
	}
}

/**
 * Main function
 */
async function main() {
	console.log('🚀 Starting HTML to JSON conversion...\n');
	
	const config = parseArgs();
	
	console.log('Configuration:');
	console.log(`  Input directory: ${config.inputDir}`);
	console.log(`  Output directory: ${config.outputDir}`);
	console.log(`  Mode: ${config.singleFile ? 'Single file' : 'Individual files'}\n`);
	
	// Ensure output directory exists
	if (!existsSync(config.outputDir)) {
		mkdirSync(config.outputDir, { recursive: true });
		console.log(`📁 Created output directory: ${config.outputDir}\n`);
	}
	
	// Get all HTML files
	const htmlFiles = getHtmlFiles(config.inputDir);
	console.log(`Found ${htmlFiles.length} HTML file(s)\n`);
	
	// Process files
	const results = {};
	let successCount = 0;
	let errorCount = 0;
	
	for (const filePath of htmlFiles) {
		const coinData = processHtmlFile(filePath, config.outputDir, config.singleFile);
		
		if (coinData) {
			if (config.singleFile) {
				results[coinData.symbol] = coinData;
			}
			successCount++;
		} else {
			errorCount++;
		}
	}
	
	// Save single file if requested
	if (config.singleFile) {
		const outputPath = join(config.outputDir, config.outputFile);
		writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
		console.log(`\n💾 Saved ${Object.keys(results).length} coins to ${outputPath}`);
	}
	
	// Summary
	console.log(`\n=== Summary ===`);
	console.log(`✅ Successfully converted: ${successCount}`);
	console.log(`❌ Errors: ${errorCount}`);
	console.log(`📊 Total: ${htmlFiles.length}`);
	
	if (config.singleFile) {
		console.log(`\n📄 Output file: ${join(config.outputDir, config.outputFile)}`);
	} else {
		console.log(`\n📁 Output directory: ${config.outputDir}`);
	}
	
	console.log('\n✅ Conversion completed!');
}

// Run if executed directly
const isMainModule = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
	main().catch(error => {
		console.error('\n❌ Fatal error:', error);
		process.exit(1);
	});
}

const htmlToJsonConverter = { extractCoinData, processHtmlFile };
export default htmlToJsonConverter;
