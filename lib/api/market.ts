/**
 * Market API functions
 */

import { apiClient } from './client';
import type { Market } from '@/types/api';

/**
 * Server-side function to fetch all markets
 * @param showAll - Whether to show all markets (default: true)
 * @returns Promise<Market[]>
 */
export async function getMarkets(showAll = true): Promise<Market[]> {
	try {
		const data = await apiClient.get<Market[]>('/Market', {
			showall: showAll.toString(),
		});
		return data;
	} catch (error) {
		console.error('Error fetching markets:', error);
		throw error;
	}
}

/**
 * Server-side function to fetch a single market by ID
 * @param id - Market ID
 * @returns Promise<Market | null>
 */
export async function getMarketById(id: string): Promise<Market | null> {
	try {
		const markets = await getMarkets();
		return markets.find((market) => market.id === id) || null;
	} catch (error) {
		console.error('Error fetching market by ID:', error);
		throw error;
	}
}

/**
 * Server-side function to fetch markets by symbol
 * @param symbol - Market symbol (e.g., 'BTCIRT')
 * @returns Promise<Market | null>
 */
export async function getMarketBySymbol(symbol: string): Promise<Market | null> {
	try {
		const markets = await getMarkets();
		return markets.find((market) => market.symbol === symbol) || null;
	} catch (error) {
		console.error('Error fetching market by symbol:', error);
		throw error;
	}
}

/**
 * Client-side function to fetch markets (for use in client components)
 * This function can be used with polling hooks
 * Uses the API client which respects NEXT_PUBLIC_API_URL
 */
export async function fetchMarkets(showAll = true): Promise<Market[]> {
	try {
		const data = await apiClient.get<Market[]>('/Market', {
			showall: showAll.toString(),
		});
		return data;
	} catch (error) {
		console.error('Error fetching markets:', error);
		throw error;
	}
}

