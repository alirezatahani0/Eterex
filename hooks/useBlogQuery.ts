'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types/api';

interface UseBlogQueryOptions {
	limit?: number;
	enabled?: boolean;
	refetchInterval?: number; // in milliseconds, 0 to disable polling
}

/**
 * React Query hook for fetching blog posts
 * @param options - Query options
 * @returns Query result with blog posts data
 */
export function useBlogQuery(options: UseBlogQueryOptions = {}) {
	const {
		limit = 10,
		enabled = true,
		refetchInterval = 0, // No polling by default for blog posts
	} = options;

	return useQuery<BlogPost[], Error>({
		queryKey: ['blog', 'posts', limit],
		queryFn: () => fetchBlogPosts(limit),
		enabled,
		refetchInterval,
		// Stale time: 5 minutes (blog posts don't change as frequently)
		staleTime: 5 * 60 * 1000,
		// Keep data in cache for 10 minutes
		gcTime: 10 * 60 * 1000,
		// Retry failed requests
		retry: 2,
		// Don't refetch on window focus
		refetchOnWindowFocus: false,
		// Refetch on reconnect
		refetchOnReconnect: true,
	});
}

