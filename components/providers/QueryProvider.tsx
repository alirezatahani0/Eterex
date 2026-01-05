'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
	children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Stale time: 30 seconds (data is considered fresh for 30 seconds)
						staleTime: 30 * 1000,
						// Cache time: 5 minutes (keep unused data in cache for 5 minutes)
						gcTime: 5 * 60 * 1000,
						// Retry failed requests
						retry: 2,
						// Refetch on window focus
						refetchOnWindowFocus: false,
						// Refetch on reconnect
						refetchOnReconnect: true,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

