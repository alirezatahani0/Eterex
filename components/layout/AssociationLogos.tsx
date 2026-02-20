'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AssetModal from '@/components/UI/AssetModal';

const logoClass =
	'h-[99px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer';

export default function AssociationLogos() {
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		type: 'pdf' | 'image';
		src: string;
		title: string;
	} | null>(null);

	const openPdfModal = () => {
		setModalState({
			isOpen: true,
			type: 'pdf',
			src: '/assets/footer/eterexFintech.pdf',
			title: 'انجمن فین‌تک',
		});
	};

	const openImageModal = () => {
		setModalState({
			isOpen: true,
			type: 'image',
			src: '/assets/footer/senfi.png',
			title: 'سازمان نظام صنفی رایانه‌ای',
		});
	};

	return (
		<>
			<div className="flex flex-row items-center justify-between gap-6">
				{/* Fintech - opens PDF modal */}
				<button
					type="button"
					onClick={openPdfModal}
					aria-label="انجمن فین‌تک"
					className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
				>
					<Image
						loading="lazy"
						width={78}
						height={99}
						src="/assets/footer/fintech.svg"
						alt="انجمن فین‌تک"
						className={logoClass}
					/>
				</button>

				{/* Blockchain - external link */}
				<Link
					href="https://iranblockchain.org/blockchain-ecosystem/?gv_search=eterex.com&filter_16=&mode=any"
					rel="nofollow noopener noreferrer"
					target="_blank"
					aria-label="انجمن فناوران زنجیره بلوک"
					className="block"
				>
					<Image
						loading="lazy"
						width={108}
						height={91}
						src="/assets/footer/blockchain.svg"
						alt="انجمن فناوران زنجیره بلوک"
						className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
					/>
				</Link>

				{/* Nezam senfi - opens image modal */}
				<button
					type="button"
					onClick={openImageModal}
					aria-label="سازمان نظام صنفی رایانه‌ای"
					className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
				>
					<Image
						loading="lazy"
						width={115}
						height={91}
						src="/assets/footer/nezamSenfi.png"
						alt="سازمان نظام صنفی رایانه‌ای"
						className="h-[91px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
					/>
				</button>
			</div>

			{modalState && (
				<AssetModal
					isOpen={modalState.isOpen}
					onClose={() => setModalState(null)}
					type={modalState.type}
					src={modalState.src}
					title={modalState.title}
				/>
			)}
		</>
	);
}
