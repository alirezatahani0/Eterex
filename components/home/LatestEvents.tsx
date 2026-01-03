'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface EventCard {
	date: string;
	title: string;
	description?: string;
}

export default function LatestEvents() {
	const { latestEvents } = useTranslation();

	// Mock data
	const events: EventCard[] = [
		{
			date: '۲۳ خرداد ۱۴۰۴',
			title: 'محمد نوری برنده خوش شانس قرعه کشی یک واحد اتریوم شد!',
			description:
				'بررسی رویداد هاوینگ تاثیراتش بر قیمت و اقتصاد بیت کوین و همچنین فرصت های پیش رو',
		},
		{
			date: '۲۰ خرداد ۱۴۰۴',
			title:
				'وبینار رایگان هاوینگ بیت کوین: روایتی از نوسانات و تاثیرات اقتصادی آن',
			description:
				'بررسی رویداد هاوینگ تاثیراتش بر قیمت و اقتصاد بیت کوین و همچنین فرصت های پیش رو',
		},
		{
			date: '۱۸ خرداد ۱۴۰۴',
			title: 'بهترین استراتژی های معاملاتی در بازار نزولی',
			description:
				'آموزش تکنیک‌های پیشرفته برای حفظ سرمایه و کسب سود در شرایط نزولی بازار',
		},
	];

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

			{/* Swiper */}
			<Swiper
				modules={[Navigation, EffectCoverflow]}
				spaceBetween={32}
				slidesPerView={1}
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				breakpoints={{
					640: {
						slidesPerView: 1.5,
					},
					1024: {
						slidesPerView: 2,
					},
				}}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
			>
				{events.map((event, index) => (
					<SwiperSlide key={index}>
						<div className="h-full rounded-[28px] border border-grayscale-03 p-5 flex flex-col justify-between relative overflow-hidden bg-[url('/assets/main/News.png')] bg-cover bg-center bg-no-repeat min-h-[420px]">
							{/* Date */}
							<div className="self-start">
								<div className="px-5 py-2 bg-grayscale-01-blur-74 rounded-4xl">
									<Text
										variant="Main/14px/SemiBold"
										className="text-grayscale-07!"
									>
										{event.date}
									</Text>
								</div>
							</div>

							{/* Title and Description and CTA Button */}
							<div className="flex flex-col gap-4">
								<div className="p-6 bg-grayscale-01-blur-74 backdrop-blur-sm rounded-3xl ">
									<Text
										variant="LongText/14px/SemiBold"
										className="text-grayscale-07!"
									>
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

									<button className="w-fit h-12 px-6 rounded-[40px] bg-brand-primary flex items-center justify-center gap-2 hover:bg-[#0A7CFF] transition-colors mt-5">
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
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</Container>
	);
}
