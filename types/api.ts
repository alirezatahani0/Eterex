/**
 * Market data types
 */

export interface Market {
	id: string;
	symbol: string;
	name: string;
	baseAsset: string;
	quoteAsset: string;
	priceDecimalPlaces: string;
	baseQuantityDecimalPlaces: string;
	quoteQuantityDecimalPlaces: string;
	baseFeeDecimalPlaces: string;
	quoteFeeDecimalPlaces: string;
	baseQuantityMin: string;
	quoteQuantityMin: string;
	baseQuantityMax: string;
	quoteQuantityMax: string;
	maxOpenOrderCount: string;
	makerFeePercentage: string;
	takerFeePercentage: string;
	limitTypeAvailable: boolean;
	marketTypeAvailable: boolean;
	triggerMarketTypeAvailable: boolean;
	triggerLimitTypeAvailable: boolean;
	iocConditionAvailable: boolean;
	fokConditionAvailable: boolean;
	gttAvailable: boolean;
	orderPriceMaxDifferencePercentage: string;
	cancelOrderAvailable: boolean;
	status: 'Open' | 'JustCloseOrders' | 'Close';
	showDefault: boolean;
}

export interface ApiError {
	message: string;
	status?: number;
	code?: string;
}

export interface ApiResponse<T> {
	data: T;
	error?: ApiError;
}

/**
 * Asset/Coin data types
 */
export interface AssetLabel {
	0: string; // category/industry/platform/others
	1: string; // value
}

export interface Asset {
	id: number;
	updated_at: string;
	created_at: string;
	metadata: string;
	graph: number;
	name: string;
	active: boolean;
	full_name: string;
	deposit_enabled: boolean;
	withdraw_enabled: boolean;
	trading_enabled: boolean;
	convert_enabled: boolean;
	transfer_max_decimals: number;
	convert_max_decimals: number;
	admin_deposit_enabled: boolean;
	admin_withdraw_enabled: boolean;
	admin_trading_enabled: boolean;
	admin_convert_enabled: boolean;
	admin_buy_enabled: boolean;
	admin_sell_enabled: boolean;
	labels: AssetLabel[];
}

export interface AssetsListResponse {
	coins: Asset[];
}

/**
 * Asset Price data types
 */
export interface AssetPrice {
	symbol: string; // e.g., "0GUSDT", "BTCIRT"
	price: string;
	type: 'sell' | 'buy';
	exprires_at: string; // Note: API has typo "exprires_at" instead of "expires_at"
	price_change: number;
	price_change_percentage: number;
	volume: number;
	quote_volume: number;
}

// The prices API returns an array directly, not an object
export type AssetsPriceListResponse = AssetPrice[];

export type PaginationType = {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	itemCount: number;
	limit: number;
	page: number;
	pageCount: number;
};

/**
 * Blog Post data types
 */
export interface BlogPost {
	id: number | string;
	title: string;
	slug: string;
	excerpt?: string;
	content?: string;
	date: string;
	modified?: string;
	author?: {
		name: string;
		slug?: string;
	};
	featured_image?: string;
	categories?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
	tags?: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
	link?: string;
}

/**
 * Configs API data types
 */
export interface PriceGroup {
	name: string;
	prices: {
		usdtIrt: number;
		irtUsdt: number;
	};
	coins: string[];
}

export interface UtopiaNetworkRates {
	deposit: number;
	withdrawal: number;
}

export interface ConfigsResponse {
	priceGroups: PriceGroup[];
	assetPrices: unknown[];
	utopiaNetworkRates: UtopiaNetworkRates;
	fiatDepositGatewayMin: number;
	fiatDepositGatewayMax: number;
}

/**
 * Staking API data types
 */
export type StakingStatus = 'Active' | 'Inactive' | string;

export interface StakingPlan {
	id: string;
	asset: string;
	name: string;
	activeDays: string;
	minAmount: string;
	maxAmount: string;
	nowStaksAmount: string;
	maxStaksAmount: string;
	dailyPercent: string;
	isDaily: boolean;
	detail: string;
	image: string;
	status: StakingStatus;
}

export interface StakingDetail {
	id: string;
	activeStaksCount: string;
	allStaksCount: string;
	allStaksAmount: string;
	allStaksProfitAmount: string;
}

/** Response item from Staking/overal/detail */
export interface StakingOveralDetailItem {
	assetSymbol: string;
	activeStaksCount: string;
	activeStaksAmount: string;
	allStaksCount: string;
	allStaksAmount: string;
	allStaksProfitAmount: string;
}
