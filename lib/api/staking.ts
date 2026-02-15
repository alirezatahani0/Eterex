/**
 * Staking API functions
 */

import type { StakingPlan, StakingDetail } from '@/types/api';

const STAKING_API_BASE =
	process.env.NEXT_PUBLIC_STAKING_API_URL ||
	process.env.NEXT_PUBLIC_API_URL ||
	'https://api.stage.eterex.net/api';

/**
 * Fetches staking plans list from the Staking API
 * Uses NEXT_PUBLIC_STAKING_API_URL or falls back to NEXT_PUBLIC_API_URL or stage URL
 * @returns Promise<StakingPlan[]>
 */
export async function fetchStakingPlans(): Promise<StakingPlan[]> {
	try {
		const baseUrl = STAKING_API_BASE.replace(/\/$/, '');
		const url = `${baseUrl}/Staking`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching staking plans:', error);
		throw error;
	}
}

/**
 * Fetches staking detail for a specific staking plan
 * @param stakingId - Staking plan ID
 * @returns Promise<StakingDetail>
 */
export async function fetchStakingDetail(
	stakingId: string,
): Promise<StakingDetail> {
	try {
		const baseUrl = STAKING_API_BASE.replace(/\/$/, '');
		const url = `${baseUrl}/Staking/${stakingId}/detail`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching staking detail:', error);
		throw error;
	}
}
