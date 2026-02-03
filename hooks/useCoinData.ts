import { useState, useEffect } from 'react';

interface CoinSection {
	title: string;
	description: string;
}

interface CoinData {
	symbol: string;
	name?: string;
	sections: CoinSection[];
	description?: string;
	mappedFields?: Record<string, string>;
	convertedAt?: string;
	source?: string;
}

export function useCoinData(symbol: string) {
	const [coinData, setCoinData] = useState<CoinData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!symbol) {
			setIsLoading(false);
			return;
		}

		const loadCoinData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// Try to load the JSON file
				const response = await fetch(`/data/coins/${symbol.toUpperCase()}.json`);
				
				if (!response.ok) {
					throw new Error(`Failed to load coin data: ${response.statusText}`);
				}

				const data: CoinData = await response.json();
				setCoinData(data);
			} catch (err) {
				// Silently fail if coin data doesn't exist
				setCoinData(null);
				setError(err instanceof Error ? err.message : 'Failed to load coin data');
			} finally {
				setIsLoading(false);
			}
		};

		loadCoinData();
	}, [symbol]);

	return { coinData, isLoading, error };
}
