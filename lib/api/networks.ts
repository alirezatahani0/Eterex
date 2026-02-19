/**
 * DEX/Networks API – fee and network list
 */

import type { NetworksListResponse } from '@/types/api';

const NETWORKS_API_BASE =
	process.env.NEXT_PUBLIC_DEX_API_URL || 'https://dex.eterex.com/public/api';

/**
 * Fetches networks list (withdrawal/deposit fees) from DEX API
 * @returns Promise<NetworksListResponse>
 */
export async function fetchNetworksList(): Promise<NetworksListResponse> {
	const baseUrl = NETWORKS_API_BASE.replace(/\/$/, '');
	const url = `${baseUrl}/networks/list`;
	const response = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		throw new Error(`Networks API Error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}
