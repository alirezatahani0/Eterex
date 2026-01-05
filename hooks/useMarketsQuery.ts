'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchMarkets } from '@/lib/api/market';
import type { Market } from '@/types/api';

interface UseMarketsQueryOptions {
	showAll?: boolean;
	enabled?: boolean;
	refetchInterval?: number; // in milliseconds
}

/**
 * React Query hook for fetching markets data
 * @param options - Query options
 * @returns Query result with markets data
 */
export function useMarketsQuery(
	options: UseMarketsQueryOptions = {},
) {
	const {
		showAll = true,
		enabled = true,
		refetchInterval = 32000, // 32 seconds default
	} = options;

	return useQuery<Market[], Error>({
		queryKey: ['markets', showAll],
		queryFn: () => fetchMarkets(showAll),
		enabled,
		refetchInterval,
		// Stale time: 30 seconds (data is considered fresh for 30 seconds)
		staleTime: 30 * 1000,
		// Keep data in cache for 5 minutes
		gcTime: 5 * 60 * 1000,
		// Retry failed requests
		retry: 2,
		// Don't refetch on window focus for this query
		refetchOnWindowFocus: false,
		// Refetch on reconnect
		refetchOnReconnect: true,
	});
}

