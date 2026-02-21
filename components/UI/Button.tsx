'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const variantStyles = {
	primary:
		'bg-brand-primary text-white hover:brightness-90 transition-[background-color,filter] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
	secondary:
		'bg-brand-primary-container text-brand-primary hover:bg-[rgba(15,91,244,0.12)] transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
	ghost:
		'bg-transparent text-grayscale-07 hover:bg-grayscale-02 transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-04',
	link: 'bg-transparent text-brand-primary hover:underline underline-offset-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
	outline:
		'border-2 border-grayscale-03 bg-transparent text-grayscale-07 hover:bg-grayscale-02 transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-04',
	danger:
		'bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
} as const;

const sizeStyles = {
	default: 'h-14 min-h-14 px-4 gap-2 rounded-full text-[14px] font-bold',
	sm: 'h-10 min-h-10 px-3 gap-1.5 rounded-full text-[13px] font-semibold',
	md: 'h-12 min-h-12 px-6 gap-2 rounded-[40px] text-[14px] font-bold',
	lg: 'h-16 min-h-16 px-6 gap-3 rounded-full text-[16px] font-bold',
	icon: 'h-14 w-14 min-w-14 min-h-14 p-0 rounded-full',
	iconSm: 'h-10 w-10 min-w-10 min-h-10 p-0 rounded-full',
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
	/** When set, renders as Next.js Link instead of button. */
	href?: string;
	/** Use with href for external links. */
	target?: string;
	rel?: string;
}

const buttonContent = (
	leftIcon?: React.ReactNode,
	rightIcon?: React.ReactNode,
	children?: React.ReactNode,
) => (
	<>
		{leftIcon && (
			<span className="inline-flex shrink-0" aria-hidden>
				{leftIcon}
			</span>
		)}
		{children && <span className="truncate">{children}</span>}
		{rightIcon && (
			<span className="inline-flex shrink-0" aria-hidden>
				{rightIcon}
			</span>
		)}
	</>
);

const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'default',
			leftIcon,
			rightIcon,
			className,
			children,
			disabled,
			type = 'button',
			href,
			target,
			rel,
			...props
		},
		ref,
	) => {
		const isIconOnly = !children && (!!leftIcon || !!rightIcon);
		const effectiveSize = isIconOnly && size === 'default' ? 'icon' : size;
		const classNames = cn(
			'inline-flex items-center justify-center font-bold disabled:opacity-50 disabled:pointer-events-none',
			variantStyles[variant],
			sizeStyles[effectiveSize],
			className,
		);

		if (href) {
			return (
				<Link
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					target={target}
					rel={rel}
					className={classNames}
					aria-disabled={disabled}
					{...(disabled && { tabIndex: -1, 'aria-disabled': true })}
				>
					{buttonContent(leftIcon, rightIcon, children)}
				</Link>
			);
		}

		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				type={type}
				disabled={disabled}
				className={classNames}
				{...props}
			>
				{buttonContent(leftIcon, rightIcon, children)}
			</button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
