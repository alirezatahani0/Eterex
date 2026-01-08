'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchConfigs } from '@/lib/api/configs';
import type { ConfigsResponse } from '@/types/api';

interface UseConfigsQueryOptions {
	enabled?: boolean;
	refetchInterval?: number; // in milliseconds
}

/**
 * React Query hook for fetching configs data
 * @param options - Query options
 * @returns Query result with configs data
 */
export function useConfigsQuery(options: UseConfigsQueryOptions = {}) {
	const {
		enabled = true,
		refetchInterval = 60000, // 60 seconds default (configs change less frequently)
	} = options;

	return useQuery<ConfigsResponse, Error>({
		queryKey: ['configs'],
		queryFn: () => fetchConfigs(),
		enabled,
		refetchInterval,
		// Stale time: 60 seconds (data is considered fresh for 60 seconds)
		staleTime: 60 * 1000,
		// Keep data in cache for 10 minutes
		gcTime: 10 * 60 * 1000,
		// Retry failed requests
		retry: 2,
		// Don't refetch on window focus for this query
		refetchOnWindowFocus: false,
		// Refetch on reconnect
		refetchOnReconnect: true,
	});
}

