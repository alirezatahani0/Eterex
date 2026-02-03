# Coin Scraper Scripts

This directory contains scripts for working with coin data:
1. **HTML to JSON Converter** - Converts HTML files to JSON format
2. **Coin Scraper** - Scrapes coin information from eterex.com pages

---

## HTML to JSON Converter

Converts HTML files containing coin information into JSON format.

### Quick Start

1. **Place your HTML files** in a directory (default: `./html-coins`)

2. **Run the converter:**
   ```bash
   npm run convert:html-to-json
   ```
   
   Or directly:
   ```bash
   node scripts/html-to-json.js
   ```

### Usage Options

**Basic usage (individual JSON files):**
```bash
npm run convert:html-to-json
```
This creates one JSON file per HTML file in `public/data/coins/` (accessible via fetch in the browser)

**Single output file:**
```bash
npm run convert:html-to-json -- --single-file --output-file all-coins.json
```
This combines all coins into a single JSON file.

**Note:** By default, files are output to `public/data/coins/` so they can be accessed via fetch in the browser. If you need to output to a different location, use the `--output-dir` option.

**Custom directories:**
```bash
npm run convert:html-to-json -- --input-dir ./my-html-files --output-dir ./output
```

**Help:**
```bash
node scripts/html-to-json.js --help
```

### What It Extracts

The script automatically extracts:
- Coin symbol (from filename)
- Coin name (from `<h1>` or `<title>`)
- Description
- Market information (rank, market cap, volume, supply, price)
- "How to Buy" information
- "How to Sell" information
- Transaction fees
- Supported wallets
- Learning resources
- Custom metadata (from `data-*` attributes)

### HTML Structure

The script looks for data in various HTML structures. You can use:
- **Data attributes**: `data-coin-name`, `data-description`, `data-market-cap`, etc.
- **CSS classes**: `.description`, `.market-cap`, `.price`, etc.
- **Semantic HTML**: `<h1>`, `<title>`, `<meta name="description">`, etc.

**Example HTML structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Bitcoin - BTC</title>
  <meta name="description" content="Bitcoin is a decentralized digital currency...">
</head>
<body>
  <h1>Bitcoin</h1>
  
  <div class="description">
    Bitcoin is a decentralized digital currency...
  </div>
  
  <div data-market-cap="1000000000">Market Cap: $1,000,000,000</div>
  <div class="price" data-price="50000">Price: $50,000</div>
  
  <div class="how-to-buy">
    <h2>How to Buy</h2>
    <ul class="buy-steps">
      <li>Create an account</li>
      <li>Verify your identity</li>
      <li>Deposit funds</li>
    </ul>
  </div>
  
  <div class="wallets">
    <ul>
      <li>Hardware Wallet</li>
      <li>Mobile Wallet</li>
    </ul>
  </div>
</body>
</html>
```

### Output Format

Individual files (e.g., `bitcoin.json`):
```json
{
  "symbol": "BTC",
  "name": "Bitcoin",
  "description": "...",
  "marketInfo": {
    "rank": 1,
    "marketCap": 1000000000,
    "volume24h": 50000000
  },
  "howToBuy": {
    "description": "...",
    "steps": ["Step 1", "Step 2"]
  },
  "convertedAt": "2025-01-XX...",
  "source": "bitcoin.html"
}
```

Single file format:
```json
{
  "BTC": { ... },
  "ETH": { ... },
  ...
}
```

---

## Coin Scraper

These scripts scrape coin information from **eterex.com/coin/[symbol]** pages and save it to a JSON file.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Puppeteer** (install with `npm install puppeteer`)

## Quick Start

1. **Install Puppeteer:**
   ```bash
   npm install puppeteer
   ```

2. **Run the scraper:**
   ```bash
   npm run scrape:coins:puppeteer
   ```
   
   Or directly:
   ```bash
   node scripts/scrape-coins-puppeteer.js
   ```

## What It Does

The script will:
1. ✅ Fetch all coins from your API (400+ coins)
2. ✅ Visit each coin page at `https://eterex.com/coin/[symbol]`
3. ✅ Extract all content including:
   - Price information
   - Descriptions
   - "How to Buy" sections
   - "How to Sell" sections
   - Wallet information
   - Learning resources
   - Additional info (free, mining, whitepaper, etc.)
4. ✅ Save progress incrementally (every 10 coins)
5. ✅ Resume from where it left off if interrupted

## Output

The scraped data will be saved to:
```
data/coins-data.json
```

Format:
```json
{
  "BTC": {
    "symbol": "BTC",
    "name": "Bitcoin",
    "description": "...",
    "marketInfo": { ... },
    "howToBuy": { ... },
    "howToSell": { ... },
    "transactionFee": { ... },
    "wallets": { ... },
    "learning": { ... },
    "scrapedAt": "2025-01-XX...",
    "source": "https://..."
  },
  ...
}
```

## Features

- ✅ Fetches coin list from your API
- ✅ Processes coins in batches
- ✅ Saves progress incrementally
- ✅ Resumes from existing data (skips already scraped coins)
- ✅ Retry logic for failed requests
- ✅ Rate limiting to be respectful

## Configuration

You can customize the script by editing `CONFIG` in the script:

- **DELAY_MS**: Delay between requests (default: 3000ms)
- **HEADLESS**: Set to `false` to see the browser (default: `true`)
- **TIMEOUT**: Page load timeout (default: 30000ms)
- **MAX_RETRIES**: Retry attempts for failed requests (default: 3)

## Notes

- The script respects rate limits with delays between requests (3 seconds)
- Progress is saved every 10 coins, so you can stop and resume
- Failed coins are logged but don't stop the process
- The script automatically skips coins that are already scraped
- Estimated time: ~20 minutes for 400 coins (3 seconds per coin)

## Troubleshooting

If you encounter issues:

1. **Install Puppeteer**: `npm install puppeteer`
2. **Check network**: Make sure you can access eterex.com
3. **Increase timeout**: If pages load slowly, increase `TIMEOUT` in CONFIG
4. **Run with visible browser**: Set `HEADLESS: false` to debug

