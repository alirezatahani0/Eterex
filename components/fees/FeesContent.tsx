'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container';
import { DownloadSection } from '../UI/DownloadSection';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import FeesTable from '@/components/UI/FeesTable';

export default function FeesContent() {
	const { fees } = useTranslation();
	const { theme, mounted } = useTheme();

	// Use light theme as default for SSR, only use actual theme after mount
	const bgUrls = useMemo(() => {
		if (!mounted) return '';
		return theme === 'dark'
			? "bg-[url('/assets/security/Header-Dark.png')] md:bg-[url('/assets/security/Header-MD-Dark.png')] lg:bg-[url('/assets/security/Header-LG-Dark.png')] 2xl:bg-[url('/assets/security/Header-XL-Dark.png')] "
			: "bg-[url('/assets/security/Header.png')] md:bg-[url('/assets/security/Header-MD.png')] lg:bg-[url('/assets/security/Header-LG.png')] 2xl:bg-[url('/assets/security/Header-XL.png')] ";
	}, [theme, mounted]);

	return (
		<div className="min-h-screen bg-grayscale-01">
			{/* Header Section */}
			<div
				className={cn(
					'text-center mt-12 py-10 relative z-10 w-full h-[400px] md:h-[480px] lg:h-[582px] 2xl:h-[640px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end',
					bgUrls,
				)}
			>
				{/* Title */}
				<Text variant="Main/32px/Black" gradient="primary" className="mb-4" type="h1">
					{fees.title}
				</Text>

				{/* Subtitle */}
				<div className="text-center">
					<Text variant="Main/16px/Regular" className="text-grayscale-06!">
						{fees.subtitle.prefix}{' '}
					</Text>
					<Text variant="Main/20px/Bold" gradient="grayscale">
						{fees.subtitle.highlight}
					</Text>
				</div>
			</div>

			<Container className="py-12 md:py-16 lg:py-20">
				{/* Introduction */}
				<div className="text-center mb-[120px]">
					<Text variant="Main/16px/Regular" className="text-grayscale-06!">
						{fees.intro.prefix}{' '}
					</Text>
					<Text variant="LongText/18px/Bold">{fees.intro.highlight}</Text>{' '}
					<Text variant="Main/16px/Regular" className="text-grayscale-06!">
						{fees.intro.suffix}{' '}
					</Text>
				</div>

				{/* Rial Deposit Fees */}
				<div className="mb-[120px] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6">
					<div>
						<Text
							variant="Main/24px/Bold"
							gradient="primary"
							className="mb-6 w-fit"
							type="h2"
						>
							{fees.rialDeposit.title}
						</Text>
						<Text
							variant="LongText/16px/Regular"
							color="text-grayscale-06!"
							className="mb-6"
						>
							{fees.rialDeposit.description}
						</Text>
					</div>

					{/* Table */}
					<FeesTable
						headers={fees.rialDeposit.table.headers}
						rows={fees.rialDeposit.table.rows}
						fieldOrder={['method', 'amount', 'fee']}
					/>
				</div>

				{/* Rial Withdrawal Fees */}
				<div className="mb-[120px]">
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{fees.rialWithdrawal.title}
					</Text>
					<div className="text-center">
						<Text variant="Main/16px/Regular" className="text-grayscale-06!">
							{fees.rialWithdrawal.description.prefix}{' '}
						</Text>
						<Text variant="LongText/18px/Bold">
							{fees.rialWithdrawal.description.highlight}
						</Text>{' '}
					</div>
				</div>

				{/* Cryptocurrency Withdrawal Fees */}
				<div className="mb-[120px] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6">
					<div>
						<Text
							variant="Main/24px/Bold"
							gradient="primary"
							className="mb-6 w-fit"
							type="h2"
						>
							{fees.cryptoWithdrawal.title}
						</Text>
						<Text
							variant="LongText/16px/Regular"
							color="text-grayscale-06!"
							className="mb-6"
						>
							{fees.cryptoWithdrawal.description}
						</Text>
					</div>

					{/* Table */}
					<FeesTable
						headers={fees.cryptoWithdrawal.table.headers}
						rows={fees.cryptoWithdrawal.table.rows}
						fieldOrder={['crypto', 'network', 'fee']}
					/>
				</div>

				{/* Cryptocurrency Deposit Fees */}
				<div className="mb-[120px]">
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{fees.cryptoDeposit.title}
					</Text>
					<div className="text-center">
						<Text variant="Main/16px/Regular" className="text-grayscale-06!">
							{fees.cryptoDeposit.description.prefix}{' '}
						</Text>
						<Text variant="LongText/18px/Bold">
							{fees.cryptoDeposit.description.highlight}
						</Text>{' '}
						<Text variant="Main/16px/Regular" className="text-grayscale-06!">
							{fees.cryptoDeposit.description.suffix}{' '}
						</Text>
					</div>
				</div>

				{/* Coin to Coin Conversion Fees */}
				<div className="mb-[120px]">
					<Text
						variant="Main/24px/Bold"
						gradient="primary"
						className="mb-6 w-fit"
						type="h2"
					>
						{fees.coinToCoin.title}
					</Text>
					<div className="text-center">
						<Text variant="Main/16px/Regular" className="text-grayscale-06!">
							{fees.coinToCoin.description.prefix}{' '}
						</Text>
						<Text variant="LongText/18px/Bold">
							{fees.coinToCoin.description.highlight}
						</Text>{' '}
						<Text variant="Main/16px/Regular" className="text-grayscale-06!">
							{fees.coinToCoin.description.suffix}{' '}
						</Text>
					</div>
				</div>

				<DownloadSection />
			</Container>
		</div>
	);
}
