'use strict';

var elys$1 = require('./abstract/elys.js');
var errors = require('./base/errors.js');
var number = require('./base/functions/number.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class elys
 * @augments Exchange
 */
class elys extends elys$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'elys',
            'name': 'Elys Network',
            'countries': ['US'],
            'version': 'v1',
            'rateLimit': 100,
            'certified': false,
            'pro': false,
            'dex': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': true,
                'future': true,
                'option': false,
                'addMargin': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'cancelAllOrders': false,
                'cancelAllOrdersAfter': false,
                'cancelOrder': false,
                'cancelOrders': false,
                'cancelOrdersForSymbols': false,
                'closeAllPositions': false,
                'closePosition': false,
                'createMarketBuyOrderWithCost': false,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': false,
                'createOrders': false,
                'createOrderWithTakeProfitAndStopLoss': false,
                'createReduceOnlyOrder': false,
                'createStopOrder': false,
                'createTriggerOrder': false,
                'editOrder': false,
                'editOrders': false,
                'fetchAccounts': false,
                'fetchBalance': true,
                'fetchBorrowInterest': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledAndClosedOrders': false,
                'fetchCanceledOrders': false,
                'fetchClosedOrders': false,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDeposits': false,
                'fetchDepositWithdrawFee': false,
                'fetchDepositWithdrawFees': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': true,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchLedger': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': false,
                'fetchLiquidations': false,
                'fetchMarginMode': undefined,
                'fetchMarketLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyLiquidations': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterest': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenInterests': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': false,
                'fetchOrders': true,
                'fetchOrderTrades': false,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': 'emulated',
                'fetchTickers': true,
                'fetchTime': false,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawals': false,
                'repayCrossMargin': false,
                'repayIsolatedMargin': false,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'signIn': false,
                'transfer': false,
                'withdraw': false,
            },
            'timeframes': {
                '1m': '1',
                '1h': '60',
                '1d': '1D',
            },
            'urls': {
                'logo': 'https://elys.network/logo.png',
                'api': {
                    'public': 'https://testnet-elys-ccxt-service-j5trp.ondigitalocean.app',
                    'private': 'https://testnet-elys-ccxt-service-j5trp.ondigitalocean.app',
                },
                'test': {
                    'public': 'https://testnet-elys-ccxt-service-j5trp.ondigitalocean.app',
                    'private': 'https://testnet-elys-ccxt-service-j5trp.ondigitalocean.app',
                },
                'www': 'https://elys.network',
                'doc': [
                    'https://docs.elys.network',
                ],
                'fees': [
                    'https://docs.elys.network/developers/fees',
                ],
            },
            'api': {
                'public': {
                    'get': {
                        'v1/currencies': 1,
                        'v1/markets': 1,
                        'v1/tickers': 1,
                        'v1/funding-rates': 1,
                        'v1/orders/open': 1,
                        'v1/orders': 1,
                        'v1/order': 1,
                        'v1/open-interest': 1,
                        'trades/{address}/{symbol}/{size}/{from}': 1,
                    },
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': false,
                    'percentage': true,
                    'taker': this.parseNumber('0.001'),
                    'maker': this.parseNumber('0.001'), // 0.1%
                },
            },
            'precisionMode': number.TICK_SIZE,
            'exceptions': {
                'exact': {},
                'broad': {},
            },
            'options': {
                'sandboxMode': false,
                'defaultType': 'swap',
                'defaultSubType': 'linear', // 'linear', 'inverse'
            },
            'commonCurrencies': {},
        });
    }
    setSandboxMode(enabled) {
        super.setSandboxMode(enabled);
        this.options['sandboxMode'] = enabled;
    }
    /**
     * @method
     * @name elys#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        const url = this.urls['api']['public'] + '/v1/currencies';
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // [
        //     {
        //         "decimals": 6,
        //         "denom": "USDC"
        //     },
        //     {
        //         "decimals": 8,
        //         "denom": "WBTC"
        //     }
        // ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const currency = response[i];
            const id = this.safeString(currency, 'denom');
            const code = this.safeCurrencyCode(id);
            const decimals = this.safeInteger(currency, 'decimals');
            result[code] = this.safeCurrencyStructure({
                'id': id,
                'name': id,
                'code': code,
                'precision': decimals,
                'info': currency,
                'active': true,
                'deposit': undefined,
                'withdraw': undefined,
                'networks': undefined,
                'fee': undefined,
                'type': 'crypto',
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
            });
        }
        return result;
    }
    /**
     * @method
     * @name elys#fetchMarkets
     * @description retrieves data on all markets for elys
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const url = this.urls['api']['public'] + '/v1/markets';
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //     "amm_pools": [
        //         {
        //             "pool_assets": [
        //                 {
        //                     "token": {
        //                         "amount": "1000000",
        //                         "denom": "WBTC"
        //                     },
        //                     "weight": "50"
        //                 },
        //                 {
        //                     "token": {
        //                         "amount": "50000000000",
        //                         "denom": "USDC"
        //                     },
        //                     "weight": "50"
        //                 }
        //             ],
        //             "pool_id": 1,
        //             "pool_params": {
        //                 "fee_denom": "USDC",
        //                 "swap_fee": "0.003"
        //             }
        //         }
        //     ]
        // }
        //
        const result = [];
        const ammPools = this.safeList(response, 'amm_pools', []);
        for (let i = 0; i < ammPools.length; i++) {
            const pool = ammPools[i];
            const poolAssets = this.safeList(pool, 'pool_assets', []);
            if (poolAssets.length >= 2) {
                const baseAsset = poolAssets[0];
                const quoteAsset = poolAssets[1];
                const baseToken = this.safeDict(baseAsset, 'token', {});
                const quoteToken = this.safeDict(quoteAsset, 'token', {});
                const baseId = this.safeString(baseToken, 'denom');
                const quoteId = this.safeString(quoteToken, 'denom');
                const base = this.safeCurrencyCode(baseId);
                const quote = this.safeCurrencyCode(quoteId);
                const poolId = this.safeString(pool, 'pool_id');
                const symbol = base + '/' + quote;
                const poolParams = this.safeDict(pool, 'pool_params', {});
                const swapFee = this.safeString(poolParams, 'swap_fee');
                result.push(this.safeMarketStructure({
                    'id': poolId,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'settle': undefined,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'settleId': undefined,
                    'type': 'swap',
                    'spot': false,
                    'margin': false,
                    'swap': true,
                    'future': false,
                    'option': false,
                    'active': true,
                    'contract': true,
                    'linear': true,
                    'inverse': false,
                    'taker': this.parseNumber(swapFee),
                    'maker': this.parseNumber(swapFee),
                    'contractSize': undefined,
                    'expiry': undefined,
                    'expiryDatetime': undefined,
                    'strike': undefined,
                    'optionType': undefined,
                    'precision': {
                        'amount': undefined,
                        'price': undefined,
                    },
                    'limits': {
                        'leverage': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'price': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'cost': {
                            'min': undefined,
                            'max': undefined,
                        },
                    },
                    'created': undefined,
                    'info': pool,
                }));
            }
        }
        return result;
    }
    /**
     * @method
     * @name elys#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of ticker structures
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        if (symbols !== undefined) {
            const marketIds = [];
            for (let i = 0; i < symbols.length; i++) {
                const symbol = symbols[i];
                const market = this.market(symbol);
                marketIds.push(market['base'] + '-' + market['quote']);
            }
        }
        const url = this.urls['api']['public'] + '/v1/tickers';
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // [
        //     {
        //         "instrument": "WBTC-USDC",
        //         "period24h": {
        //             "change": 1250.5,
        //             "changePercentage": 2.5,
        //             "high": 52000.0,
        //             "low": 49500.0,
        //             "open": 50000.0,
        //             "volume": 1500000.0
        //         },
        //         "price": 51250.5,
        //         "priceUsd": "51250.5",
        //         "timestamp": 1640995200000
        //     }
        // ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const ticker = this.parseTicker(response[i]);
            const symbol = ticker['symbol'];
            result[symbol] = ticker;
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    parseTicker(ticker, market = undefined) {
        //
        // {
        //     "instrument": "WBTC-USDC",
        //     "period24h": {
        //         "change": 1250.5,
        //         "changePercentage": 2.5,
        //         "high": 52000.0,
        //         "low": 49500.0,
        //         "open": 50000.0,
        //         "volume": 1500000.0
        //     },
        //     "price": 51250.5,
        //     "priceUsd": "51250.5",
        //     "timestamp": 1640995200000
        // }
        //
        const marketId = this.safeString(ticker, 'instrument');
        const symbol = this.safeSymbol(marketId, market, '-');
        const timestamp = this.safeInteger(ticker, 'timestamp');
        const period24h = this.safeDict(ticker, 'period24h', {});
        const last = this.safeString(ticker, 'price');
        const open = this.safeString(period24h, 'open');
        const high = this.safeString(period24h, 'high');
        const low = this.safeString(period24h, 'low');
        const change = this.safeString(period24h, 'change');
        const percentage = this.safeString(period24h, 'changePercentage');
        const baseVolume = this.safeString(period24h, 'volume');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': high,
            'low': low,
            'bid': undefined,
            'bidVolume': undefined,
            'ask': undefined,
            'askVolume': undefined,
            'vwap': undefined,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name elys#fetchFundingRates
     * @description fetch the funding rates for multiple markets
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the funding rates for, all market funding rates are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of funding rates structures
     */
    async fetchFundingRates(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const url = this.urls['api']['public'] + '/v1/funding-rates';
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // [
        //   {
        //     "symbol": "ATOM-USDC",
        //     "funding_rate": "-0.117462885648393966",
        //     "long_rate": "-0.189599831252923122",
        //     "short_rate": "0.117462885648393966",
        //     "timestamp": 1754361530209
        //   }
        // ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const fundingRate = this.parseFundingRate(response[i]);
            const symbol = fundingRate['symbol'];
            result[symbol] = fundingRate;
        }
        return this.filterByArray(result, 'symbol', symbols);
    }
    /**
     * @method
     * @name elys#fetchOpenInterest
     * @description fetch the open interest for a symbol
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an open interest structure
     */
    async fetchOpenInterest(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const query = {
            'symbol': market['base'] + '-' + market['quote'],
        };
        const url = this.urls['api']['public'] + '/v1/open-interest?' + this.urlencode(query);
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //   "openInterest": "-341.19996",
        //   "symbol": "ATOM-USDC",
        //   "time": 1754427059775
        // }
        //
        return this.parseOpenInterest(response, market);
    }
    parseFundingRate(fundingRate, market = undefined) {
        //
        // {
        //   "symbol": "ATOM-USDC",
        //   "funding_rate": "-0.117462885648393966",
        //   "long_rate": "-0.189599831252923122",
        //   "short_rate": "0.117462885648393966",
        //   "timestamp": 1754361530209
        // }
        //
        const marketId = this.safeString(fundingRate, 'symbol');
        const symbol = this.safeSymbol(marketId, market, '-');
        const timestamp = this.safeInteger(fundingRate, 'timestamp');
        const rate = this.safeString(fundingRate, 'funding_rate');
        return {
            'info': fundingRate,
            'symbol': symbol,
            'markPrice': undefined,
            'indexPrice': undefined,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'fundingRate': this.parseNumber(rate),
            'fundingTimestamp': timestamp,
            'fundingDatetime': this.iso8601(timestamp),
            'nextFundingRate': undefined,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
        };
    }
    parseOpenInterest(openInterest, market = undefined) {
        //
        // {
        //   "openInterest": "-341.19996",
        //   "symbol": "ATOM-USDC",
        //   "time": 1754427059775
        // }
        //
        const marketId = this.safeString(openInterest, 'symbol');
        const symbol = this.safeSymbol(marketId, market, '-');
        const openInterestAmount = this.safeString(openInterest, 'openInterest');
        const timestamp = this.safeInteger(openInterest, 'time');
        return {
            'symbol': symbol,
            'baseVolume': this.parseNumber(openInterestAmount),
            'quoteVolume': undefined,
            'openInterestAmount': this.parseNumber(openInterestAmount),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': openInterest,
        };
    }
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
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const until = this.safeInteger(params, 'until', this.milliseconds());
        let fromTime = since;
        if (fromTime === undefined) {
            if (limit !== undefined) {
                const timeframeInMilliseconds = this.parseTimeframe(timeframe) * 1000;
                fromTime = this.sum(until, timeframeInMilliseconds * limit * -1);
            }
            else {
                fromTime = 0;
            }
        }
        fromTime = Math.floor(fromTime / 1000); // convert to seconds
        const toTime = Math.floor(until / 1000); // convert to seconds
        params = this.omit(params, ['until']);
        const path = 'ohlcv/' + market['baseId'] + '/' + fromTime.toString() + '/' + toTime.toString() + '/' + this.safeString(this.timeframes, timeframe, timeframe);
        const url = this.urls['api']['public'] + '/' + path;
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // [
        //     {
        //         "close": 51000.0,
        //         "high": 51500.0,
        //         "low": 50500.0,
        //         "open": 50800.0,
        //         "timestamp": 1640995200
        //     }
        // ]
        //
        return this.parseOHLCVs(response, market, timeframe, since, limit);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        // {
        //     "close": 51000.0,
        //     "high": 51500.0,
        //     "low": 50500.0,
        //     "open": 50800.0,
        //     "timestamp": 1640995200
        // }
        //
        return [
            this.safeTimestamp(ohlcv, 'timestamp'),
            this.safeNumber(ohlcv, 'open'),
            this.safeNumber(ohlcv, 'high'),
            this.safeNumber(ohlcv, 'low'),
            this.safeNumber(ohlcv, 'close'),
            undefined, // volume not provided in response
        ];
    }
    /**
     * @method
     * @name elys#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} params.address the wallet address to fetch balance for
     * @returns {object} a balance structure
     */
    async fetchBalance(params = {}) {
        const address = this.safeString(params, 'address');
        if (address === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchBalance() requires an address parameter');
        }
        params = this.omit(params, ['address']);
        const path = 'v1/balance/' + address;
        const url = this.urls['api']['public'] + '/' + path;
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //     "leverage_lp_positions": [...],
        //     "liquid_assets": [
        //         {
        //             "amount": "1000000000",
        //             "denom": "USDC"
        //         },
        //         {
        //             "amount": "50000000",
        //             "denom": "WBTC"
        //         }
        //     ],
        //     "liquidity_positions": [...],
        //     "perpetual_positions": [...]
        // }
        //
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const liquidAssets = this.safeList(response, 'liquid_assets', []);
        for (let i = 0; i < liquidAssets.length; i++) {
            const balance = liquidAssets[i];
            const currencyId = this.safeString(balance, 'denom');
            const code = this.safeCurrencyCode(currencyId);
            const amount = this.safeString(balance, 'amount');
            const account = this.account();
            account['free'] = amount;
            account['total'] = amount;
            result[code] = account;
        }
        return this.safeBalance(result);
    }
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
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchMyTrades() requires a symbol parameter');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const address = this.safeString(params, 'address');
        if (address === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchMyTrades() requires an address parameter');
        }
        const fromParam = this.safeString(params, 'from', '0');
        const size = this.safeString(params, 'size', limit ? limit.toString() : '100');
        params = this.omit(params, ['address', 'from', 'size']);
        // Convert symbol to API format (base-quote)
        const symbolId = market['base'] + '-' + market['quote'];
        const path = 'trades/' + address + '/' + symbolId + '/' + size + '/' + fromParam;
        const url = this.urls['api']['public'] + '/' + path;
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //     "perpetual_position": [
        //         {
        //             "all_interests_paid": "string",
        //             "amm_pool_id": "string",
        //             "borrow_interest_paid_custody": "string",
        //             "closing_amount": "string",
        //             "closing_price": "string",
        //             "closing_ratio": "string",
        //             "collateral": "string",
        //             "collateral_amount": "string",
        //             "collateral_asset": "string",
        //             "created_at": "2019-08-24T14:15:22Z",
        //             "custody": "string",
        //             "custody_asset": "string",
        //             // ... more fields
        //             "txhash": "string",
        //             "type": "string"
        //         }
        //     ],
        //     "spot_orders": [
        //         {
        //             "amount": {
        //                 "amount": "string",
        //                 "denom": "string"
        //             },
        //             "created_at": "2019-08-24T14:15:22Z",
        //             "order_amount": {
        //                 "amount": "string",
        //                 "denom": "string"
        //             },
        //             "order_id": "string",
        //             "order_price": "string",
        //             "order_type": "string",
        //             "owner_address": "string",
        //             "spot_price": "string",
        //             "txhash": "string",
        //             "type": "string"
        //         }
        //     ]
        // }
        //
        const result = [];
        // Process perpetual position trades
        const perpetualPositions = this.safeList(response, 'perpetual_position', []);
        for (let i = 0; i < perpetualPositions.length; i++) {
            const trade = this.parseMyTrade(perpetualPositions[i], market);
            result.push(trade);
        }
        // Process spot order trades
        const spotOrders = this.safeList(response, 'spot_orders', []);
        for (let i = 0; i < spotOrders.length; i++) {
            const trade = this.parseMyTrade(spotOrders[i], market);
            result.push(trade);
        }
        return this.filterBySinceLimit(result, since, limit, 'timestamp');
    }
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
    async fetchTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchTrades() requires a symbol parameter');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const address = this.safeString(params, 'address');
        if (address === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchTrades() requires an address parameter');
        }
        const fromParam = this.safeString(params, 'from', '0');
        const size = this.safeString(params, 'size', limit ? limit.toString() : '100');
        params = this.omit(params, ['address', 'from', 'size']);
        // Convert symbol to API format (base-quote)
        const symbolId = market['base'] + '-' + market['quote'];
        const path = 'trades/' + address + '/' + symbolId + '/' + size + '/' + fromParam;
        const url = this.urls['api']['public'] + '/' + path;
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //     "perpetual_position": [
        //         {
        //             "type": "perpetual_mtp_open",
        //             "mtp_id": "64",
        //             "owner": "elys1u8c28343vvhwgwhf29w6hlcz73hvq7lwxmrl46",
        //             "position": "SHORT",
        //             "amm_pool_id": "1",
        //             "collateral_asset": "USDC",
        //             "collateral": "19.754485",
        //             "open_price": "4.345121747801747801",
        //             "created_at": "2025-07-30T21:44:56.048Z",
        //             "txhash": "68582DF04AE7F04302F66D937B18E2B7B181664A7C01247689473DA746DBC153"
        //         }
        //     ],
        //     "spot_orders": [
        //         {
        //             "type": "tradeshield_execute_market_buy_spot_order",
        //             "order_type": "MARKETBUY",
        //             "order_id": "0",
        //             "order_price": "5.354117447312775000",
        //             "order_amount": {
        //                 "denom": "ATOM",
        //                 "amount": "1"
        //             },
        //             "owner_address": "elys1u8c28343vvhwgwhf29w6hlcz73hvq7lwxmrl46",
        //             "created_at": "2025-05-12T12:40:38.309Z",
        //             "txhash": "7C8555767E7D8D492B62E132108EC4CE26DAC8D78F008611A5AE3C1FD3D2DCD5"
        //         }
        //     ]
        // }
        //
        const result = [];
        // Process perpetual position trades
        const perpetualPositions = this.safeList(response, 'perpetual_position', []);
        for (let i = 0; i < perpetualPositions.length; i++) {
            const trade = this.parseMyTrade(perpetualPositions[i], market);
            result.push(trade);
        }
        // Process spot order trades
        const spotOrders = this.safeList(response, 'spot_orders', []);
        for (let i = 0; i < spotOrders.length; i++) {
            const trade = this.parseMyTrade(spotOrders[i], market);
            result.push(trade);
        }
        return this.filterBySinceLimit(result, since, limit, 'timestamp');
    }
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
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOpenOrders() requires a symbol parameter');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const address = this.safeString(params, 'address');
        const query = {
            'symbol': market['base'] + '-' + market['quote'],
        };
        if (address !== undefined) {
            query['address'] = address;
        }
        params = this.omit(params, ['address']);
        const url = this.urls['api']['public'] + '/v1/orders/open?' + this.urlencode(query);
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //   "pending_spot_orders": null,
        //   "pending_perpetual_orders": [
        //     {
        //       "order_id": "24",
        //       "owner_address": "elys1wstfr2fx8h9tdxhs4wv4t8sjxdgrw6f9dpdpdf",
        //       "position": "LONG",
        //       "trigger_price": "0.000000000000000000",
        //       "collateral_denom": "USDC",
        //       "collateral_value": "4240.469631",
        //       "leverage": "3.000000000000000000",
        //       "take_profit_price": "0.000000000000000000",
        //       "stop_loss_price": "0.000000000000000000",
        //       "pool_id": "6",
        //       "liquidation_price": "2513.381153809520746186",
        //       "funding_rate": "0.000000000000000000",
        //       "borrow_interest_rate": "0.000000000000000000",
        //       "position_size_denom": "ETH",
        //       "position_size_value": "3.457635083"
        //     }
        //   ]
        // }
        //
        const result = [];
        // Process pending spot orders
        const spotOrders = this.safeList(response, 'pending_spot_orders', []);
        for (let i = 0; i < spotOrders.length; i++) {
            const order = this.parseOrder(spotOrders[i], market);
            result.push(order);
        }
        // Process pending perpetual orders
        const perpetualOrders = this.safeList(response, 'pending_perpetual_orders', []);
        for (let i = 0; i < perpetualOrders.length; i++) {
            const order = this.parseOrder(perpetualOrders[i], market);
            result.push(order);
        }
        return this.filterBySinceLimit(result, since, limit, 'timestamp');
    }
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
    async fetchOrder(id, symbol = undefined, params = {}) {
        if (id === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrder() requires an id parameter');
        }
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrder() requires a symbol parameter');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const address = this.safeString(params, 'address');
        if (address === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrder() requires an address parameter');
        }
        const query = {
            'id': id,
            'symbol': market['base'] + '-' + market['quote'],
            'address': address,
        };
        params = this.omit(params, ['address']);
        const url = this.urls['api']['public'] + '/v1/order?' + this.urlencode(query);
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // {
        //   "collateral_asset": "USDC",
        //   "trading_asset": "WBTC",
        //   "liability_asset": "USDC",
        //   "custody_asset": "WBTC",
        //   "collateral": "21.552225",
        //   "liability": "21.571616",
        //   "borrow_interest_paid_custody": "0",
        //   "borrow_interest_unpaid_liability": "19391",
        //   "custody": "38062",
        //   "health": "2.006222443084368180",
        //   "position": "LONG",
        //   "amm_pool_id": 5,
        //   "take_profit_price": "0.000000000000000000",
        //   "take_profit_borrow_factor": "1.000000000000000000",
        //   "funding_fee_paid_custody": "81",
        //   "funding_fee_received_custody": "181",
        //   "open_price": "113500.890943575154101469",
        //   "stop_loss_price": "58169.206608582266477003",
        //   "trading_asset_price": "113668.427604308776796146",
        //   "pnl": {
        //     "denom": "USDC",
        //     "amount": "0.153619"
        //   },
        //   "effective_leverage": "1.992036442801146611",
        //   "liquidation_price": "58022.183058726551416110",
        //   "fees": {
        //     "total_fees_base_currency": "92099",
        //     "borrow_interest_fees_liability_asset": "0",
        //     "borrow_interest_fees_base_currency": "0",
        //     "funding_fees_liquidity_asset": "81",
        //     "funding_fees_base_currency": "92099"
        //   },
        //   "id": 125
        // }
        //
        // This is actually a perpetual position, not a traditional order
        // We'll parse it as an order structure
        const position = this.safeString(response, 'position'); // 'LONG' or 'SHORT'
        const side = position ? position.toLowerCase() : undefined;
        const collateral = this.safeString(response, 'collateral');
        const openPrice = this.safeString(response, 'open_price');
        const orderId = this.safeString(response, 'id');
        const stopLossPrice = this.safeString(response, 'stop_loss_price');
        const takeProfitPrice = this.safeString(response, 'take_profit_price');
        const cost = (collateral && openPrice) ? this.numberToString(this.parseNumber(collateral) * this.parseNumber(openPrice)) : undefined;
        return this.safeOrder({
            'id': orderId,
            'clientOrderId': undefined,
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': 'market',
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'amount': collateral,
            'price': openPrice,
            'stopPrice': stopLossPrice,
            'triggerPrice': undefined,
            'takeProfitPrice': takeProfitPrice,
            'cost': cost,
            'average': openPrice,
            'filled': collateral,
            'remaining': '0',
            'status': 'closed',
            'fee': undefined,
            'trades': undefined,
        }, market);
    }
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
    async fetchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrders() requires a symbol parameter');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const address = this.safeString(params, 'address');
        const query = {
            'symbol': market['base'] + '-' + market['quote'],
        };
        if (address !== undefined) {
            query['address'] = address;
        }
        params = this.omit(params, ['address']);
        const url = this.urls['api']['public'] + '/v1/orders?' + this.urlencode(query);
        const response = await this.fetch(url, 'GET', undefined, undefined);
        //
        // [
        //   {
        //     "collateral_asset": "USDC",
        //     "trading_asset": "WBTC",
        //     "liability_asset": "USDC",
        //     "custody_asset": "WBTC",
        //     "collateral": "0.028661",
        //     "liability": "0.058045",
        //     "borrow_interest_paid_custody": "2486",
        //     "borrow_interest_unpaid_liability": "721",
        //     "custody": "42062",
        //     "health": "823.960724878386525358",
        //     "position": "LONG",
        //     "amm_pool_id": 5,
        //     "take_profit_price": "0.000000000000000000",
        //     "take_profit_borrow_factor": "1.000000000000000000",
        //     "funding_fee_paid_custody": "1767",
        //     "funding_fee_received_custody": "41984",
        //     "open_price": "107780.910665021660979213",
        //     "stop_loss_price": "74350.528603299143254436",
        //     "trading_asset_price": "113671.371393379478105303",
        //     "pnl": {
        //       "denom": "USDC",
        //       "amount": "47.740094"
        //     },
        //     "effective_leverage": "1.001200013156294978",
        //     "liquidation_price": "139.649738172221958061",
        //     "fees": {
        //       "total_fees_base_currency": "4835894",
        //       "borrow_interest_fees_liability_asset": "2486",
        //       "borrow_interest_fees_base_currency": "2826718",
        //       "funding_fees_liquidity_asset": "1767",
        //       "funding_fees_base_currency": "2009175"
        //     },
        //     "id": 2
        //   }
        // ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const position = response[i];
            // Parse each perpetual position as an order
            const positionSide = this.safeString(position, 'position'); // 'LONG' or 'SHORT'
            const side = positionSide ? positionSide.toLowerCase() : undefined;
            const collateral = this.safeString(position, 'collateral');
            const openPrice = this.safeString(position, 'open_price');
            const orderId = this.safeString(position, 'id');
            const stopLossPrice = this.safeString(position, 'stop_loss_price');
            const takeProfitPrice = this.safeString(position, 'take_profit_price');
            const cost = (collateral && openPrice) ? this.numberToString(this.parseNumber(collateral) * this.parseNumber(openPrice)) : undefined;
            const order = this.safeOrder({
                'id': orderId,
                'clientOrderId': undefined,
                'info': position,
                'timestamp': undefined,
                'datetime': undefined,
                'lastTradeTimestamp': undefined,
                'symbol': symbol,
                'type': 'market',
                'timeInForce': undefined,
                'postOnly': undefined,
                'side': side,
                'amount': collateral,
                'price': openPrice,
                'stopPrice': stopLossPrice,
                'triggerPrice': undefined,
                'takeProfitPrice': takeProfitPrice,
                'cost': cost,
                'average': openPrice,
                'filled': collateral,
                'remaining': '0',
                'status': 'closed',
                'fee': undefined,
                'trades': undefined,
            }, market);
            result.push(order);
        }
        return this.filterBySinceLimit(result, since, limit, 'timestamp');
    }
    parseMyTrade(trade, market = undefined) {
        //
        // Perpetual position trade:
        // {
        //     "all_interests_paid": "string",
        //     "amm_pool_id": "string",
        //     "closing_amount": "string",
        //     "closing_price": "string",
        //     "collateral_amount": "string",
        //     "created_at": "2019-08-24T14:15:22Z",
        //     "open_price": "string",
        //     "owner": "string",
        //     "position": "string",
        //     "txhash": "string",
        //     "type": "string"
        // }
        //
        // Spot order trade:
        // {
        //     "amount": {
        //         "amount": "string",
        //         "denom": "string"
        //     },
        //     "created_at": "2019-08-24T14:15:22Z",
        //     "order_amount": {
        //         "amount": "string",
        //         "denom": "string"
        //     },
        //     "order_id": "string",
        //     "order_price": "string",
        //     "order_type": "string",
        //     "owner_address": "string",
        //     "spot_price": "string",
        //     "txhash": "string",
        //     "type": "string"
        // }
        //
        const id = this.safeString2(trade, 'txhash', 'order_id');
        const timestamp = this.parse8601(this.safeString(trade, 'created_at'));
        const symbol = market ? market['symbol'] : undefined;
        // Determine if it's a perpetual or spot trade
        const isPerpetual = ('amm_pool_id' in trade);
        let amount;
        let price;
        let side;
        let type;
        if (isPerpetual) {
            // Perpetual position trade (can be open or closed)
            amount = this.safeString(trade, 'collateral'); // Use collateral as the position size
            price = this.safeString(trade, 'open_price'); // Use open_price for perpetual positions
            side = this.safeString(trade, 'position'); // 'long' or 'short'
            type = 'market'; // perpetual positions are typically market orders
        }
        else {
            // Spot order trade
            const orderAmount = this.safeDict(trade, 'order_amount', {});
            amount = this.safeString(orderAmount, 'amount');
            price = this.safeString2(trade, 'order_price', 'spot_price');
            const orderType = this.safeString(trade, 'order_type');
            side = (orderType === 'buy') ? 'buy' : 'sell';
            type = 'market'; // assuming market orders for now
        }
        const cost = (amount && price) ? this.numberToString(this.parseNumber(amount) * this.parseNumber(price)) : undefined;
        return this.safeTrade({
            'id': id,
            'order': this.safeString(trade, 'order_id'),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'amount': amount,
            'price': price,
            'cost': cost,
            'fee': undefined,
            'takerOrMaker': undefined,
        }, market);
    }
    parseOrder(order, market = undefined) {
        //
        // Perpetual Order:
        // {
        //   "order_id": "24",
        //   "owner_address": "elys1wstfr2fx8h9tdxhs4wv4t8sjxdgrw6f9dpdpdf",
        //   "position": "LONG",
        //   "trigger_price": "0.000000000000000000",
        //   "collateral_denom": "USDC",
        //   "collateral_value": "4240.469631",
        //   "leverage": "3.000000000000000000",
        //   "take_profit_price": "0.000000000000000000",
        //   "stop_loss_price": "0.000000000000000000",
        //   "pool_id": "6",
        //   "liquidation_price": "2513.381153809520746186",
        //   "funding_rate": "0.000000000000000000",
        //   "borrow_interest_rate": "0.000000000000000000",
        //   "position_size_denom": "ETH",
        //   "position_size_value": "3.457635083"
        // }
        //
        // Spot Order:
        // {
        //   "order_amount": "string",
        //   "order_denom": "string",
        //   "order_id": 0,
        //   "order_price": null,
        //   "order_target_denom": "string",
        //   "order_type": "string",
        //   "owner_address": "string",
        //   "status": "string"
        // }
        //
        const id = this.safeString(order, 'order_id');
        const symbol = market ? market['symbol'] : undefined;
        // Check if it's a perpetual order (has position field) or spot order (has order_type field)
        const isPerpetual = ('position' in order);
        let side;
        let amount;
        let price;
        let type;
        let status;
        if (isPerpetual) {
            // Perpetual order
            const position = this.safeString(order, 'position'); // 'LONG' or 'SHORT'
            side = position ? position.toLowerCase() : undefined;
            amount = this.safeString(order, 'position_size_value');
            const triggerPrice = this.safeString(order, 'trigger_price');
            price = (triggerPrice && triggerPrice !== '0.000000000000000000') ? triggerPrice : undefined;
            type = price ? 'limit' : 'market';
            status = 'open'; // perpetual orders are pending/open
        }
        else {
            // Spot order
            const orderType = this.safeString(order, 'order_type');
            side = (orderType === 'MARKETBUY' || orderType === 'LIMITBUY') ? 'buy' : 'sell';
            amount = this.safeString(order, 'order_amount');
            price = this.safeString(order, 'order_price');
            if (orderType && orderType.indexOf('MARKET') >= 0) {
                type = 'market';
            }
            else {
                type = 'limit';
            }
            status = this.safeString(order, 'status', 'open');
        }
        const cost = (amount && price) ? this.numberToString(this.parseNumber(amount) * this.parseNumber(price)) : undefined;
        return this.safeOrder({
            'id': id,
            'clientOrderId': undefined,
            'info': order,
            'timestamp': undefined,
            'datetime': undefined,
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'amount': amount,
            'price': price,
            'stopPrice': isPerpetual ? this.safeString(order, 'stop_loss_price') : undefined,
            'triggerPrice': isPerpetual ? this.safeString(order, 'trigger_price') : undefined,
            'takeProfitPrice': isPerpetual ? this.safeString(order, 'take_profit_price') : undefined,
            'cost': cost,
            'average': undefined,
            'filled': undefined,
            'remaining': amount,
            'status': status,
            'fee': undefined,
            'trades': undefined,
        }, market);
    }
}

module.exports = elys;
