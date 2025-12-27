'use client';
import React from 'react';

type Variant =
	| 'LongText/14px/Regular'
	| 'LongText/14px/SemiBold'
	| 'LongText/16px/Regular'
	| 'LongText/18px/Bold'
	| 'Main/14px/Bold'
	| 'Main/14px/SemiBold'
	| 'Main/16px/Regular'
	| 'Main/20px/Bold'
	| 'Main/24px/Regular'
	| 'Main/24px/Bold'
	| 'Main/32px/Black';

type Type = 'span' | 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Color = 'primary' | 'secondary' | 'muted' | 'danger' | 'inherit' | string;
type Weight = 'normal' | 'medium' | 'semibold' | 'bold' | number;

interface TextProps extends React.HTMLAttributes<HTMLElement> {
	variant?: Variant;
	type?: Type;
	color?: Color;
	weight?: Weight;
	href?: string;
	className?: string;
	children?: React.ReactNode;
	i18nKey?: string;
	i18nParams?: Record<string, string | number>;
}

const variantToTag: Record<Variant, Type> = {
	'LongText/14px/Regular': 'span',
	'LongText/14px/SemiBold': 'span',
	'LongText/16px/Regular': 'span',
	'LongText/18px/Bold': 'p',
	'Main/14px/Bold': 'span',
	'Main/14px/SemiBold': 'span',
	'Main/16px/Regular': 'span',
	'Main/20px/Bold': 'span',
	'Main/24px/Regular': 'span',
	'Main/24px/Bold': 'span',
	'Main/32px/Black': 'h1',
};

const variantStyles: Record<Variant, string> = {
	'LongText/14px/Regular': 'text-[14px] text-grayscale-06 leading-[28px]',
	'LongText/14px/SemiBold':
		'text-[14px] text-grayscale-07 leading-[28px] font-[600]',
	'LongText/16px/Regular':
		'text-[16px] text-grayscale-06 leading-[36px] font-[400]',
	'LongText/18px/Bold':
		'text-[18px] text-grayscale-07 leading-[32px] font-[700]',
	'Main/14px/SemiBold':
		'text-[14px] text-grayscale-05 leading-[20px] font-[700]',
	'Main/16px/Regular':
		'text-[16px] text-grayscale-05 leading-[24px] font-[400]',
	'Main/20px/Bold': 'text-[20px] text-grayscale-05 leading-[32px] font-[700]',
	'Main/14px/Bold': 'text-[14px] text-brand-primary leading-[20px] font-[600]',
	'Main/24px/Regular':
		'text-[24px] text-grayscale-07 leading-[36px] font-[400]',
	'Main/24px/Bold': 'text-[24px] text-grayscale-07 leading-[36px] font-[700]',
	'Main/32px/Black':
		'text-grayscale-07 font-[900] text-[32px] leading-[48px] md:text-[32px] md:leading-[48px] xl:text-[50.4px] xl:leading-[72px] 2xl:text-[56px] 2xl:leading-[80px] ',
};

const gradientStyles: Record<'Main/32px/Black' | 'Main/20px/Bold', string> = {
	'Main/32px/Black': 'linear-gradient(92.3deg, #7B90FF -6.82%, #0F34F4 75.93%)',
	'Main/20px/Bold': 'linear-gradient(180deg, #000000 0%, #808080 100%)',
};

const colorMap: Record<string, string> = {
	primary: '!text-[#0A7CFF]',
	secondary: '!text-[#141414]',
	muted: '!text-gray-600',
	danger: '!text-red-500',
};

const weightMap: Record<Weight, string> = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	400: 'font-normal',
	500: 'font-medium',
	600: 'font-semibold',
	700: 'font-bold',
};

const Text = ({
	variant = 'Main/24px/Regular',
	type = 'span',
	color = '',
	weight,
	href,
	className = '',
	children,
	...props
}: TextProps) => {
	// Use i18n translation if key is provided, otherwise use children
	const content = children;
	const Tag = type || variantToTag[variant];
	const variantClass = variantStyles[variant] || '';
	const colorClass = colorMap[color] || color;
	const weightClass = weight ? weightMap[weight] || 'font-normal' : '';
	const allClass =
		`${className} ${weightClass} ${colorClass} ${variantClass}`.trim();

	// Build style object
	const style: React.CSSProperties = {};
	const isGradient =
		(variant === 'Main/32px/Black' || variant === 'Main/20px/Bold') && !color;

	if (isGradient) {
		// Apply gradient styles for gradient variants
		style.background =
			gradientStyles[variant as 'Main/32px/Black' | 'Main/20px/Bold'];
		style.WebkitBackgroundClip = 'text';
		style.WebkitTextFillColor = 'transparent';
		style.backgroundClip = 'text';
		style.color = 'transparent';
	}

	if (Tag === 'a') {
		return (
			<a href={href} className={allClass} {...props}>
				{content}
			</a>
		);
	}
	return React.createElement(
		Tag,
		{
			className: allClass,
			style: Object.keys(style).length > 0 ? style : undefined,
			...props,
		},
		content,
	);
};

export default Text;
