# Coin Scraper Scripts

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

