import Exchange from './abstract/elys.js';
import type { Market, Balances, Int, OHLCV, Strings, Currencies, Ticker, Tickers, Trade } from './base/types.js';
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
    parseMyTrade(trade: any, market?: Market): Trade;
}
