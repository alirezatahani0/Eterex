'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStakingOveralDetail } from '@/lib/api/staking';
import type { StakingOveralDetailItem } from '@/types/api';

/**
 * React Query hook for fetching staking overall detail (per-asset stats)
 * @returns Query result with array of StakingOveralDetailItem
 */
export function useStakingOveralDetailQuery() {
	return useQuery<StakingOveralDetailItem[], Error>({
		queryKey: ['staking', 'overal-detail'],
		queryFn: () => fetchStakingOveralDetail(),
		staleTime: 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: 2,
		refetchOnWindowFocus: false,
	});
}
