'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { useBlogQuery } from '@/hooks/useBlogQuery';
import { useMemo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

interface EventCardProps {
	event: {
		id: number | string;
		date: string;
		title: string;
		description?: string;
		link: string;
		featured_image: string;
	};
	latestEvents: {
		viewNews: string;
	};
}

function EventCard({ event, latestEvents }: EventCardProps) {
	return (
		<div
			className="h-full rounded-[28px] border border-grayscale-03 flex flex-col justify-between relative overflow-hidden min-h-[420px]"

		>
			<Image
				src={event.featured_image}
				alt={event.title}
				width={392}
				height={206}
				className="w-full object-cover"
				onError={(e) => {
					// Fallback to default image on error
					e.currentTarget.src = '/assets/main/PostImage.png';
				}}
			/>
			{/* Date */}
			{/* <div className="self-start">
				<div className="px-5 py-2 bg-grayscale-01-blur-74 rounded-4xl">
					<Text variant="Main/14px/SemiBold" className="text-grayscale-07!">
						{event.date}
					</Text>
				</div>
			</div> */}

			{/* Title and Description and CTA Button */}
			<div className="flex flex-col gap-4 ">
				<div className="p-6 bg-grayscale-01-blur-74 backdrop-blur-sm rounded-3xl ">
					<Text variant="LongText/14px/SemiBold" className="text-grayscale-07!">
						{event.title}
					</Text>
					{event.description && (
						<div className="line-clamp-2">
							<Text
								variant="LongText/14px/Regular"
								className="text-grayscale-06! hidden lg:block"
							>
								{event.description}
							</Text>
						</div>
					)}

					<Link
						href={event.link}
						aria-label={`${latestEvents.viewNews}: ${event.title}`}
						className="w-fit h-12 px-6 rounded-[40px] bg-brand-primary flex items-center justify-center gap-2 hover:bg-[#0A7CFF] transition-colors mt-5"
					>
						<Text variant="Main/14px/Bold" className="text-white!">
							{latestEvents.viewNews}
						</Text>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M17.5 10H2.5M2.5 10L6.66667 5.83334M2.5 10L6.66667 14.1667"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function LatestEvents() {
	const { latestEvents } = useTranslation();
	const { data: blogPosts = [], isLoading } = useBlogQuery({ limit: 10 });

	// Get the two most important blog posts (first 2)
	const events = useMemo(() => {
		if (!blogPosts.length) return [];

		return blogPosts.slice(0, 2).map((post) => {
			// Format date to Persian format
			const date = new Date(post.date);
			const formattedDate = date.toLocaleDateString('fa-IR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			// Strip HTML from excerpt
			const excerpt = post.excerpt
				? post.excerpt.replace(/<[^>]*>/g, '').trim()
				: '';

			return {
				id: post.id,
				date: formattedDate,
				title: post.title,
				description: excerpt,
				link: post.link || `/blog/${post.slug}`,
				featured_image: post.featured_image || '/assets/main/News.png',
			};
		});
	}, [blogPosts]);

	return (
		<Container className="py-12 md:py-16 lg:py-20 lg:pl-0 xl:pl-0 2xl:pl-0">
			<div className="mb-14">
				{/* Tagline */}
				<div className="inline-flex items-center gap-2 px-4 py-2 bg-grayscale-02 rounded-2xl border border-grayscale-03 w-fit mb-10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<g clipPath="url(#clip0_3137_77919)">
							<path
								d="M7.28571 0C7.28571 0 7.68771 3.7521 9.25352 5.31791C10.8193 6.88372 14.5714 7.28571 14.5714 7.28571C14.5714 7.28571 10.8193 7.68771 9.25352 9.25352C7.68771 10.8193 7.28571 14.5714 7.28571 14.5714C7.28571 14.5714 6.88372 10.8193 5.31791 9.25352C3.7521 7.68771 0 7.28571 0 7.28571C0 7.28571 3.7521 6.88372 5.31791 5.31791C6.88372 3.7521 7.28571 0 7.28571 0Z"
								fill="#EB9E2A"
							/>
							<path
								opacity="0.7"
								d="M15 11C15 11 15.1655 12.545 15.8103 13.1897C16.455 13.8345 18 14 18 14C18 14 16.455 14.1655 15.8103 14.8103C15.1655 15.455 15 17 15 17C15 17 14.8345 15.455 14.1897 14.8103C13.545 14.1655 12 14 12 14C12 14 13.545 13.8345 14.1897 13.1897C14.8345 12.545 15 11 15 11Z"
								fill="#C6D2F8"
							/>
						</g>
						<defs>
							<clipPath id="clip0_3137_77919">
								<rect width="20" height="20" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<div className="flex flex-row items-center gap-1">
						<Text variant="Main/14px/SemiBold" className="text-grayscale-05!">
							{latestEvents.mostImportant}
						</Text>
						<Text variant="Main/14px/Bold" className="text-grayscale-07!">
							{latestEvents.announcements}
						</Text>
					</div>
				</div>

				{/* Title */}
				<div className="flex flex-row items-center gap-1">
					<Text variant="Main/32px/Bold" className="w-fit text-grayscale-07!">
						{latestEvents.title.prefix}
					</Text>
					<Text variant="Main/32px/Bold" gradient="primary" className="w-fit">
						{latestEvents.title.highlight}
					</Text>
				</div>
			</div>

			{/* Blog Posts - Mobile Swiper (hidden on md and up) */}
			{isLoading ? (
				<>
					{/* Mobile Loading Skeleton */}
					<div className="md:hidden">
						<div className="grid grid-cols-1 gap-8">
							{[1, 2].map((i) => (
								<div
									key={i}
									className="h-full rounded-[28px] border border-grayscale-03 p-5 flex flex-col justify-between relative overflow-hidden bg-grayscale-02 min-h-[420px] animate-pulse"
								>
									<div className="h-8 w-32 bg-grayscale-03 rounded-4xl" />
									<div className="p-6 bg-grayscale-02 rounded-3xl space-y-4">
										<div className="h-6 bg-grayscale-03 rounded w-3/4" />
										<div className="h-4 bg-grayscale-03 rounded w-full" />
										<div className="h-4 bg-grayscale-03 rounded w-2/3" />
										<div className="h-12 w-32 bg-grayscale-03 rounded-[40px] mt-5" />
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Desktop Loading Skeleton */}
					<div className="hidden md:grid md:grid-cols-2 gap-8">
						{[1, 2].map((i) => (
							<div
								key={i}
								className="h-full rounded-[28px] border border-grayscale-03 p-5 flex flex-col justify-between relative overflow-hidden bg-grayscale-02 min-h-[420px] animate-pulse"
							>
								<div className="h-8 w-32 bg-grayscale-03 rounded-4xl" />
								<div className="p-6 bg-grayscale-02 rounded-3xl space-y-4">
									<div className="h-6 bg-grayscale-03 rounded w-3/4" />
									<div className="h-4 bg-grayscale-03 rounded w-full" />
									<div className="h-4 bg-grayscale-03 rounded w-2/3" />
									<div className="h-12 w-32 bg-grayscale-03 rounded-[40px] mt-5" />
								</div>
							</div>
						))}
					</div>
				</>
			) : events.length > 0 ? (
				<>
					{/* Mobile Swiper (visible only on mobile) */}
					<div className="md:hidden">
						<Swiper
							modules={[Navigation]}
							spaceBetween={16}
							slidesPerView={1}
							navigation={false}
							className="latest-events-swiper"
						>
							{events.map((event) => (
								<SwiperSlide key={event.id}>
									<EventCard event={event} latestEvents={latestEvents} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Desktop Grid (visible only on md and up) */}
					<div className="hidden md:grid md:grid-cols-2 gap-8">
						{events.map((event) => (
							<EventCard
								key={event.id}
								event={event}
								latestEvents={latestEvents}
							/>
						))}
					</div>
				</>
			) : null}
		</Container>
	);
}
