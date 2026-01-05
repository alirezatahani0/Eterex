'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchAssetsList, fetchAssetsPriceList } from '@/lib/api/assets';
import type {
	AssetsListResponse,
	AssetsPriceListResponse,
} from '@/types/api';

interface UseAssetsListQueryOptions {
	pageSize?: number;
	enabled?: boolean;
	refetchInterval?: number; // in milliseconds, 0 to disable polling
}

/**
 * React Query hook for fetching assets list
 * @param options - Query options
 * @returns Query result with assets list data
 */
export function useAssetsListQuery(
	options: UseAssetsListQueryOptions = {},
) {
	const {
		pageSize = 10000,
		enabled = true,
		refetchInterval = 32000, // 32 seconds default (same as other queries)
	} = options;

	return useQuery<AssetsListResponse, Error>({
		queryKey: ['assets', 'list', pageSize],
		queryFn: () => fetchAssetsList(pageSize),
		enabled,
		refetchInterval,
		// Stale time: 30 seconds (data should be fresh)
		staleTime: 30 * 1000,
		// Keep data in cache for 5 minutes
		gcTime: 5 * 60 * 1000,
		// Retry failed requests
		retry: 2,
		// Don't refetch on window focus
		refetchOnWindowFocus: false,
		// Refetch on reconnect
		refetchOnReconnect: true,
	});
}

interface UseAssetsPriceListQueryOptions {
	enabled?: boolean;
	refetchInterval?: number; // in milliseconds, 0 to disable polling
}

/**
 * React Query hook for fetching assets price list
 * @param options - Query options
 * @returns Query result with assets price list data
 */
export function useAssetsPriceListQuery(
	options: UseAssetsPriceListQueryOptions = {},
) {
	const {
		enabled = true,
		refetchInterval = 32000, // 32 seconds default (same as markets)
	} = options;

	return useQuery<AssetsPriceListResponse, Error>({
		queryKey: ['assets', 'price', 'list'],
		queryFn: () => fetchAssetsPriceList(),
		enabled,
		refetchInterval,
		// Stale time: 30 seconds (price data should be fresh)
		staleTime: 30 * 1000,
		// Keep data in cache for 5 minutes
		gcTime: 5 * 60 * 1000,
		// Retry failed requests
		retry: 2,
		// Don't refetch on window focus
		refetchOnWindowFocus: false,
		// Refetch on reconnect
		refetchOnReconnect: true,
	});
}

