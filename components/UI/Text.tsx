import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type TextVariant = 'main-title' | 'content' | 'content-title' | 'title' | 'desc' | 'gradient-center' | 'center-text';

interface TextProps {
	variant: TextVariant;
	children: ReactNode;
	color?: string;
	className?: string;
	as?: ElementType;
}

const variantClasses: Record<TextVariant, string> = {
	'main-title': 'font-pelak font-black text-[32px] leading-[48px] md:text-[32px] md:leading-[48px] xl:text-[50.4px] xl:leading-[72px] 2xl:text-[56px] 2xl:leading-[80px] text-center tracking-[0%]',
	content: 'font-pelak font-normal text-base leading-[36px] text-justify tracking-[0%] text-grayscale-06',
	'content-title': 'font-pelak font-bold text-lg leading-[32px] text-justify tracking-[0%] text-grayscale-07',
	title: 'font-pelak font-bold text-[32px] leading-[48px] text-right tracking-[0%] text-white',
	desc: 'font-pelak font-normal text-sm leading-[28px] text-right tracking-[0%] text-white',
	'gradient-center': 'font-pelak font-bold text-[20px] leading-[32px] text-center tracking-[0%]',
	'center-text': 'font-pelak font-normal text-base leading-[24px] text-center tracking-[0%] text-black',
};

const gradientStyles: Record<'main-title' | 'gradient-center', string> = {
	'main-title': 'linear-gradient(92.3deg, #7B90FF -6.82%, #0F34F4 75.93%)',
	'gradient-center': 'linear-gradient(180deg, #000000 0%, #808080 100%)',
};

export default function Text({
	variant,
	children,
	color,
	className,
	as = 'span',
}: TextProps) {
	const Tag = as as ElementType;
	
	// Check if this is a gradient variant
	const isGradient = (variant === 'main-title' || variant === 'gradient-center') && !color;
	
	// Get base classes and remove color classes if custom color is provided
	let baseClasses = variantClasses[variant];
	if (color && !isGradient) {
		// Remove default color classes when custom color is provided
		baseClasses = baseClasses.split(' ').filter(c => !c.startsWith('text-')).join(' ');
	}
	
	// Build the className
	const classes = cn(baseClasses, className);
	
	// Build style object
	const style: React.CSSProperties = {};
	
	if (isGradient) {
		// Apply gradient styles for gradient variants
		style.background = gradientStyles[variant as 'main-title' | 'gradient-center'];
		style.WebkitBackgroundClip = 'text';
		style.WebkitTextFillColor = 'transparent';
		style.backgroundClip = 'text';
		style.color = 'transparent';
	} else if (color) {
		// Apply custom color if provided
		style.color = color;
	}

	return (
		<Tag className={classes} style={Object.keys(style).length > 0 ? style : undefined}>
			{children}
		</Tag>
	);
}
