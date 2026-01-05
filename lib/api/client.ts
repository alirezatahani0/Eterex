/**
 * API Client Configuration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.eterex.com/api';

export interface ApiConfig {
	baseURL?: string;
	headers?: Record<string, string>;
	timeout?: number;
}

class ApiClient {
	private baseURL: string;
	private defaultHeaders: Record<string, string>;
	private timeout: number;

	constructor(config: ApiConfig = {}) {
		this.baseURL = config.baseURL || API_BASE_URL;
		this.defaultHeaders = {
			'Content-Type': 'application/json',
			...config.headers,
		};
		this.timeout = config.timeout || 30000;
	}

	private async fetchWithTimeout(
		url: string,
		options: RequestInit = {},
	): Promise<Response> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
				headers: {
					...this.defaultHeaders,
					...options.headers,
				},
			});

			clearTimeout(timeoutId);
			return response;
		} catch (error) {
			clearTimeout(timeoutId);
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('Request timeout');
			}
			throw error;
		}
	}

	async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
		const url = new URL(`${this.baseURL}${endpoint}`);
		
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, value);
			});
		}

		const response = await this.fetchWithTimeout(url.toString(), {
			method: 'GET',
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const response = await this.fetchWithTimeout(url, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const response = await this.fetchWithTimeout(url, {
			method: 'PUT',
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}

	async delete<T>(endpoint: string): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const response = await this.fetchWithTimeout(url, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}
}

// Create a default instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export default ApiClient;

