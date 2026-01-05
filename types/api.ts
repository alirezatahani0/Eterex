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

