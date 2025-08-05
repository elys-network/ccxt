import Exchange from './abstract/elys.js';
import type { Market, Balances, Int, OHLCV, Strings, Currencies, Ticker, Tickers, Trade, FundingRate, FundingRates, Order, OpenInterest } from './base/types.js';
/**
 * @class elys
 * @augments Exchange
 */
export default class elys extends Exchange {
    describe(): any;
    setSandboxMode(enabled: any): void;
    /**
     * @method
     * @name elys#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    fetchCurrencies(params?: {}): Promise<Currencies>;
    /**
     * @method
     * @name elys#fetchMarkets
     * @description retrieves data on all markets for elys
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    fetchMarkets(params?: {}): Promise<Market[]>;
    /**
     * @method
     * @name elys#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of ticker structures
     */
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    parseTicker(ticker: any, market?: Market): Ticker;
    /**
     * @method
     * @name elys#fetchFundingRates
     * @description fetch the funding rates for multiple markets
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the funding rates for, all market funding rates are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of funding rates structures
     */
    fetchFundingRates(symbols?: Strings, params?: {}): Promise<FundingRates>;
    /**
     * @method
     * @name elys#fetchOpenInterest
     * @description fetch the open interest for a symbol
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an open interest structure
     */
    fetchOpenInterest(symbol: string, params?: {}): Promise<OpenInterest>;
    parseFundingRate(fundingRate: any, market?: Market): FundingRate;
    parseOpenInterest(openInterest: any, market?: Market): OpenInterest;
    /**
     * @method
     * @name elys#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents, support '1m', '1h', '1d'
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest candle to fetch
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    /**
     * @method
     * @name elys#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} params.address the wallet address to fetch balance for
     * @returns {object} a balance structure
     */
    fetchBalance(params?: {}): Promise<Balances>;
    /**
     * @method
     * @name elys#fetchMyTrades
     * @description fetch all trades made by the user
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} params.address the wallet address to fetch trades for
     * @param {int} [params.from] pagination offset, defaults to 0
     * @returns {Trade[]} a list of trade structures
     */
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    /**
     * @method
     * @name elys#fetchTrades
     * @description fetch historical trades for a symbol
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} params.address the wallet address to fetch trades for (required)
     * @param {int} [params.from] pagination offset, defaults to 0
     * @returns {Trade[]} a list of trade structures
     */
    fetchTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    /**
     * @method
     * @name elys#fetchOpenOrders
     * @description fetch open orders for a symbol
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of orders to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.address] the wallet address to fetch orders for
     * @returns {Order[]} a list of order structures
     */
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    /**
     * @method
     * @name elys#fetchOrder
     * @description fetch a specific order by id
     * @param {string} id order id
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} params.address the wallet address that owns the order (required)
     * @returns {object} an order structure
     */
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    /**
     * @method
     * @name elys#fetchOrders
     * @description fetch all orders (perpetual positions) for a symbol
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of orders to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.address] optional address to filter orders
     * @returns {Order[]} a list of order structures
     */
    fetchOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    parseMyTrade(trade: any, market?: Market): Trade;
    parseOrder(order: any, market?: Market): Order;
}
