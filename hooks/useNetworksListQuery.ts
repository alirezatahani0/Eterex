'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNetworksList } from '@/lib/api/networks';
import type { NetworksListResponse } from '@/types/api';

/**
 * React Query hook for fetching networks list (withdrawal/deposit fees)
 */
export function useNetworksListQuery() {
	return useQuery<NetworksListResponse, Error>({
		queryKey: ['networks', 'list'],
		queryFn: () => fetchNetworksList(),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: 2,
		refetchOnWindowFocus: false,
	});
}
