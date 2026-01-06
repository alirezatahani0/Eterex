/**
 * Blog API functions
 */

import type { BlogPost } from '@/types/api';

const BLOG_BASE_URL =
	process.env.NEXT_PUBLIC_BLOG_URL || 'https://eterex.com/blog';

/**
 * WordPress API response types
 */
interface WordPressTerm {
	id?: number;
	term_id?: number;
	name: string;
	slug: string;
}

interface WordPressAuthor {
	name: string;
	slug?: string;
	code?: string;
}

interface WordPressMedia {
	source_url?: string;
	code?: string;
	media_details?: {
		sizes?: {
			full?: { source_url?: string };
			medium_large?: { source_url?: string };
		};
	};
}

interface WordPressPost {
	id: number;
	slug: string;
	date: string;
	modified?: string;
	modified_gmt?: string;
	link: string;
	title: string | { rendered: string };
	excerpt: string | { rendered: string };
	content: string | { rendered: string };
	_embedded?: {
		author?: WordPressAuthor[];
		'wp:featuredmedia'?: WordPressMedia[];
		'wp:term'?: WordPressTerm[][];
	};
}

/**
 * Transform WordPress API response to BlogPost format
 */
function transformWordPressPost(wpPost: WordPressPost): BlogPost {
	// Extract author from embedded data (handle 404 errors gracefully)
	let authorName = '';
	let authorSlug = '';

	if (wpPost._embedded?.['author']?.[0]) {
		const embeddedAuthor = wpPost._embedded['author'][0];
		// Check if it's an error object
		if (!embeddedAuthor.code && embeddedAuthor.name) {
			authorName = embeddedAuthor.name;
			authorSlug = embeddedAuthor.slug || '';
		}
	}

	// Extract featured image from embedded media
	const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
	let featuredImageUrl = '';

	if (featuredMedia && !featuredMedia.code) {
		// Try source_url first, then media_details sizes
		featuredImageUrl =
			featuredMedia.source_url ||
			featuredMedia.media_details?.sizes?.full?.source_url ||
			featuredMedia.media_details?.sizes?.medium_large?.source_url ||
			'';
	}

	// Extract categories from embedded data (wp:term[0] contains categories)
	const embeddedCategories = wpPost._embedded?.['wp:term']?.[0] || [];
	const categories = Array.isArray(embeddedCategories)
		? embeddedCategories.map((cat: WordPressTerm) => ({
				id: cat.id || cat.term_id || 0,
				name: cat.name || '',
				slug: cat.slug || '',
		  }))
		: [];

	// Extract tags from embedded data (wp:term[1] contains tags)
	const embeddedTags = wpPost._embedded?.['wp:term']?.[1] || [];
	const tags = Array.isArray(embeddedTags)
		? embeddedTags.map((tag: WordPressTerm) => ({
				id: tag.id || tag.term_id || 0,
				name: tag.name || '',
				slug: tag.slug || '',
		  }))
		: [];

	// Extract title, excerpt, and content (handle both string and object formats)
	const title =
		typeof wpPost.title === 'string'
			? wpPost.title
			: wpPost.title?.rendered || '';
	const excerpt =
		typeof wpPost.excerpt === 'string'
			? wpPost.excerpt
			: wpPost.excerpt?.rendered || '';
	const content =
		typeof wpPost.content === 'string'
			? wpPost.content
			: wpPost.content?.rendered || '';

	return {
		id: wpPost.id,
		title,
		slug: wpPost.slug || '',
		excerpt,
		content,
		date: wpPost.date || '',
		modified: wpPost.modified || wpPost.modified_gmt || '',
		author: authorName
			? {
					name: authorName,
					slug: authorSlug,
			  }
			: undefined,
		featured_image: featuredImageUrl,
		categories,
		tags,
		link: wpPost.link || `${BLOG_BASE_URL}/${wpPost.slug}`,
	};
}

/**
 * Server-side function to fetch blog posts
 * @param limit - Number of posts to fetch (default: 10)
 * @returns Promise<BlogPost[]>
 */
export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
	try {
		// Try WordPress REST API first (common for blog sites)
		const wpApiUrl = `${BLOG_BASE_URL}/wp-json/wp/v2/posts`;

		const response = await fetch(
			`${wpApiUrl}?per_page=${limit}&_embed=true&orderby=date&order=desc`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				next: { revalidate: 300 }, // Revalidate every 5 minutes
			},
		);

		if (!response.ok) {
			throw new Error(
				`Blog API Error: ${response.status} ${response.statusText}`,
			);
		}

		const wpPosts = await response.json();

		// Transform WordPress posts to our BlogPost format
		return wpPosts.map(transformWordPressPost);
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		// Return empty array on error to prevent breaking the UI
		return [];
	}
}

/**
 * Client-side function to fetch blog posts (for use in client components)
 * @param limit - Number of posts to fetch (default: 10)
 * @returns Promise<BlogPost[]>
 */
export async function fetchBlogPosts(limit = 10): Promise<BlogPost[]> {
	try {
		// Try WordPress REST API first (common for blog sites)
		const wpApiUrl = `${BLOG_BASE_URL}/wp-json/wp/v2/posts`;

		const response = await fetch(
			`${wpApiUrl}?per_page=${limit}&_embed=true&orderby=date&order=desc`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			throw new Error(
				`Blog API Error: ${response.status} ${response.statusText}`,
			);
		}

		const wpPosts = await response.json();

		// Transform WordPress posts to our BlogPost format
		return wpPosts.map(transformWordPressPost);
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}
