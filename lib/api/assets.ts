/**
 * Assets API functions
 */

import type { AssetsListResponse, AssetsPriceListResponse } from '@/types/api';

const PUBLIC_API_BASE_URL =
	process.env.NEXT_PUBLIC_PUBLIC_API_URL ||
	'https://publicv2.eterex.com/public/api';

/**
 * Server-side function to fetch all assets/coins
 * @param pageSize - Number of assets to fetch (default: 10000)
 * @returns Promise<AssetsListResponse>
 */
export async function getAssetsList(
	pageSize = 10000,
): Promise<AssetsListResponse> {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/assets/list?page_size=${pageSize}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching assets list:', error);
		throw error;
	}
}

/**
 * Client-side function to fetch assets list (for use in client components)
 */
export async function fetchAssetsList(
	pageSize = 10000,
): Promise<AssetsListResponse> {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/assets/list?page_size=${pageSize}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching assets list:', error);
		throw error;
	}
}

/**
 * Server-side function to fetch asset prices
 * @returns Promise<AssetsPriceListResponse> (array of prices)
 */
export async function getAssetsPriceList(): Promise<AssetsPriceListResponse> {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/assets/price/list`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		// API returns array directly
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching assets price list:', error);
		throw error;
	}
}

/**
 * Client-side function to fetch asset prices (for use in client components)
 */
export async function fetchAssetsPriceList(): Promise<AssetsPriceListResponse> {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/assets/price/list`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		// API returns array directly
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching assets price list:', error);
		throw error;
	}
}

