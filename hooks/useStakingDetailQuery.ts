'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStakingDetail } from '@/lib/api/staking';
import type { StakingDetail } from '@/types/api';

interface UseStakingDetailQueryOptions {
	stakingId: string | null;
	enabled?: boolean;
	refetchInterval?: number;
}

/**
 * React Query hook for fetching staking detail by ID
 * @param options - Query options including stakingId
 * @returns Query result with staking detail data
 */
export function useStakingDetailQuery(
	options: UseStakingDetailQueryOptions,
) {
	const {
		stakingId,
		enabled = true,
		refetchInterval = 60000,
	} = options;

	return useQuery<StakingDetail, Error>({
		queryKey: ['staking', 'detail', stakingId],
		queryFn: () => fetchStakingDetail(stakingId!),
		enabled: enabled && !!stakingId,
		refetchInterval,
		staleTime: 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: 2,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}
