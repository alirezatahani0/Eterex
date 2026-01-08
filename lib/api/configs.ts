/**
 * Configs API functions
 */

import { apiClient } from './client';
import type { ConfigsResponse } from '@/types/api';

/**
 * Server-side function to fetch configs
 * @returns Promise<ConfigsResponse>
 */
export async function getConfigs(): Promise<ConfigsResponse> {
	try {
		const data = await apiClient.get<ConfigsResponse>('/Configs/v2');
		return data;
	} catch (error) {
		console.error('Error fetching configs:', error);
		throw error;
	}
}

/**
 * Client-side function to fetch configs (for use in client components)
 * This function can be used with polling hooks
 * Uses the API client which respects NEXT_PUBLIC_API_URL
 */
export async function fetchConfigs(): Promise<ConfigsResponse> {
	try {
		const data = await apiClient.get<ConfigsResponse>('/Configs/v2');
		return data;
	} catch (error) {
		console.error('Error fetching configs:', error);
		throw error;
	}
}

