import React from 'react';
import Text from './Text';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'tertiary';
	size?: 'sm' | 'md' | 'lg';
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	prefixIcon,
	suffixIcon,
	children,
	className,
	...props
}) => {
	const baseStyles =
		'flex items-center gap-2 justify-center font-[500] rounded-[40px] transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed';
	const sizeStyles = {
		sm: 'px-5 py-2 text-[12px] font-bold leading-[20px] h-12',
		md: 'px-5 py-3 text-[14px] font-bold leading-[20px] h-13',
		lg: 'px-6 py-4 text-[14px] font-bold leading-[20px] h-14',
	};

	const variantStyles = {
		primary: `bg-brand-primary text-[#fff]
				${
					props.disabled
						? 'bg-grayscale-04 text-[#fff]'
						: 'hover:bg-[#0A7CFF] active:bg-[#0A7CFF] focus:ring-2 focus:ring-[#0A7CFF]'
				}`,
		secondary: `bg-black text-[#fff]
				${
					props.disabled
						? 'bg-grayscale-04 text-[#fff]'
						: 'hover:bg-base hover:text-[#141414] active:bg-base focus:ring-2 focus:ring-[#141414]'
				}`,
		ghost: `bg-brand-primary-container text-primary
				${
					props.disabled
						? 'bg-grayscale-04 text-[#fff]'
						: 'hover:bg-blue-100 active:bg-[#0A7CFF] focus:ring-2 focus:ring-[#0A7CFF]'
				}`,
		link: `text-black
				${
					props.disabled
						? 'bg-grayscale-04 text-[#fff]'
						: // : 'hover:text-[#0A7CFF] active:text-[#0A7CFF] focus:ring-2 focus:ring-[#0A7CFF]'
						  ''
				}`,
		tertiary: `text-[#F5F7FA] bg-[#1D2126] 
				${props.disabled ? '' : ''}`,
	};

	const mergedClasses = `${baseStyles} ${sizeStyles[size]} ${
		variantStyles[variant]
	} ${className || ''}`;

	return (
		<button className={mergedClasses} {...props}>
			{prefixIcon && (
				<Text variant="caption" className="text-[14px]">
					{prefixIcon}
				</Text>
			)}

			{children}

			{suffixIcon && (
				<Text variant="caption" className="text-[14px]">
					{suffixIcon}
				</Text>
			)}
		</button>
	);
};

export default Button;
