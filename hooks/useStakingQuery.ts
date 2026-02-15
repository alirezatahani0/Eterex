'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStakingPlans } from '@/lib/api/staking';
import type { StakingPlan } from '@/types/api';

interface UseStakingQueryOptions {
	enabled?: boolean;
	refetchInterval?: number;
}

/**
 * React Query hook for fetching staking plans list
 * @param options - Query options
 * @returns Query result with staking plans data
 */
export function useStakingQuery(options: UseStakingQueryOptions = {}) {
	const {
		enabled = true,
		refetchInterval = 60000, // 60 seconds
	} = options;

	return useQuery<StakingPlan[], Error>({
		queryKey: ['staking', 'plans'],
		queryFn: () => fetchStakingPlans(),
		enabled,
		refetchInterval,
		staleTime: 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: 2,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}
