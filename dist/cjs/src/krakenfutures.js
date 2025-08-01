'use strict';

var krakenfutures$1 = require('./abstract/krakenfutures.js');
var number = require('./base/functions/number.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');
var sha512 = require('./static_dependencies/noble-hashes/sha512.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class krakenfutures
 * @augments Exchange
 */
class krakenfutures extends krakenfutures$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'krakenfutures',
            'name': 'Kraken Futures',
            'countries': ['US'],
            'version': 'v3',
            'userAgent': undefined,
            'rateLimit': 600,
            'pro': true,
            'has': {
                'CORS': undefined,
                'spot': false,
                'margin': false,
                'swap': true,
                'future': true,
                'option': false,
                'cancelAllOrders': true,
                'cancelAllOrdersAfter': true,
                'cancelOrder': true,
                'cancelOrders': true,
                'createMarketOrder': false,
                'createOrder': true,
                'createPostOnlyOrder': true,
                'createReduceOnlyOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'createTriggerOrder': true,
                'editOrder': true,
                'fetchBalance': true,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledOrders': true,
                'fetchClosedOrders': true,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchFundingHistory': undefined,
                'fetchFundingRate': 'emulated',
                'fetchFundingRateHistory': true,
                'fetchFundingRates': true,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchIsolatedPositions': false,
                'fetchLeverage': true,
                'fetchLeverages': true,
                'fetchLeverageTiers': true,
                'fetchMarketLeverageTiers': 'emulated',
                'fetchMarkets': true,
                'fetchMarkOHLCV': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': false,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchPositions': true,
                'fetchPremiumIndexOHLCV': false,
                'fetchTickers': true,
                'fetchTrades': true,
                'sandbox': true,
                'setLeverage': true,
                'setMarginMode': false,
                'transfer': true,
            },
            'urls': {
                'test': {
                    'public': 'https://demo-futures.kraken.com/derivatives/api/',
                    'private': 'https://demo-futures.kraken.com/derivatives/api/',
                    'charts': 'https://demo-futures.kraken.com/api/charts/',
                    'history': 'https://demo-futures.kraken.com/api/history/',
                    'www': 'https://demo-futures.kraken.com',
                },
                'logo': 'https://user-images.githubusercontent.com/24300605/81436764-b22fd580-9172-11ea-9703-742783e6376d.jpg',
                'api': {
                    'charts': 'https://futures.kraken.com/api/charts/',
                    'history': 'https://futures.kraken.com/api/history/',
                    'feeschedules': 'https://futures.kraken.com/api/feeschedules/',
                    'public': 'https://futures.kraken.com/derivatives/api/',
                    'private': 'https://futures.kraken.com/derivatives/api/',
                },
                'www': 'https://futures.kraken.com/',
                'doc': [
                    'https://docs.futures.kraken.com/#introduction',
                ],
                'fees': 'https://support.kraken.com/hc/en-us/articles/360022835771-Transaction-fees-and-rebates-for-Kraken-Futures',
                'referral': undefined,
            },
            'api': {
                'public': {
                    'get': [
                        'feeschedules',
                        'instruments',
                        'orderbook',
                        'tickers',
                        'history',
                        'historicalfundingrates',
                    ],
                },
                'private': {
                    'get': [
                        'feeschedules/volumes',
                        'openpositions',
                        'notifications',
                        'accounts',
                        'openorders',
                        'recentorders',
                        'fills',
                        'transfers',
                        'leveragepreferences',
                        'pnlpreferences',
                        'assignmentprogram/current',
                        'assignmentprogram/history',
                    ],
                    'post': [
                        'sendorder',
                        'editorder',
                        'cancelorder',
                        'transfer',
                        'batchorder',
                        'cancelallorders',
                        'cancelallordersafter',
                        'withdrawal',
                        'assignmentprogram/add',
                        'assignmentprogram/delete',
                    ],
                    'put': [
                        'leveragepreferences',
                        'pnlpreferences',
                    ],
                },
                'charts': {
                    'get': [
                        '{price_type}/{symbol}/{interval}',
                    ],
                },
                'history': {
                    'get': [
                        'orders',
                        'executions',
                        'triggers',
                        'accountlogcsv',
                        'account-log',
                        'market/{symbol}/orders',
                        'market/{symbol}/executions',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber('0.0005'),
                    'maker': this.parseNumber('0.0002'),
                    'tiers': {
                        'taker': [
                            [this.parseNumber('0'), this.parseNumber('0.0005')],
                            [this.parseNumber('100000'), this.parseNumber('0.0004')],
                            [this.parseNumber('1000000'), this.parseNumber('0.0003')],
                            [this.parseNumber('5000000'), this.parseNumber('0.00025')],
                            [this.parseNumber('10000000'), this.parseNumber('0.0002')],
                            [this.parseNumber('20000000'), this.parseNumber('0.00015')],
                            [this.parseNumber('50000000'), this.parseNumber('0.000125')],
                            [this.parseNumber('100000000'), this.parseNumber('0.0001')],
                        ],
                        'maker': [
                            [this.parseNumber('0'), this.parseNumber('0.0002')],
                            [this.parseNumber('100000'), this.parseNumber('0.0015')],
                            [this.parseNumber('1000000'), this.parseNumber('0.000125')],
                            [this.parseNumber('5000000'), this.parseNumber('0.0001')],
                            [this.parseNumber('10000000'), this.parseNumber('0.000075')],
                            [this.parseNumber('20000000'), this.parseNumber('0.00005')],
                            [this.parseNumber('50000000'), this.parseNumber('0.000025')],
                            [this.parseNumber('100000000'), this.parseNumber('0')],
                        ],
                    },
                },
            },
            'exceptions': {
                'exact': {
                    'apiLimitExceeded': errors.RateLimitExceeded,
                    'marketUnavailable': errors.ContractUnavailable,
                    'requiredArgumentMissing': errors.BadRequest,
                    'unavailable': errors.ExchangeNotAvailable,
                    'authenticationError': errors.AuthenticationError,
                    'accountInactive': errors.ExchangeError,
                    'invalidAccount': errors.BadRequest,
                    'invalidAmount': errors.BadRequest,
                    'insufficientFunds': errors.InsufficientFunds,
                    'Bad Request': errors.BadRequest,
                    'Unavailable': errors.ExchangeNotAvailable,
                    'invalidUnit': errors.BadRequest,
                    'Json Parse Error': errors.ExchangeError,
                    'nonceBelowThreshold': errors.InvalidNonce,
                    'nonceDuplicate': errors.InvalidNonce,
                    'notFound': errors.BadRequest,
                    'Server Error': errors.ExchangeError,
                    'unknownError': errors.ExchangeError,
                },
                'broad': {
                    'invalidArgument': errors.BadRequest,
                    'nonceBelowThreshold': errors.InvalidNonce,
                    'nonceDuplicate': errors.InvalidNonce,
                },
            },
            'precisionMode': number.TICK_SIZE,
            'options': {
                'access': {
                    'history': {
                        'GET': {
                            'orders': 'private',
                            'executions': 'private',
                            'triggers': 'private',
                            'accountlogcsv': 'private',
                        },
                    },
                },
                'settlementCurrencies': {
                    'flex': ['USDT', 'BTC', 'USD', 'GBP', 'EUR', 'USDC'],
                },
                'symbol': {
                    'quoteIds': ['USD', 'XBT'],
                    'reversed': false,
                },
                'versions': {
                    'public': {
                        'GET': {
                            'historicalfundingrates': 'v4',
                        },
                    },
                    'charts': {
                        'GET': {
                            '{price_type}/{symbol}/{interval}': 'v1',
                        },
                    },
                    'history': {
                        'GET': {
                            'orders': 'v2',
                            'executions': 'v2',
                            'triggers': 'v2',
                            'accountlogcsv': 'v2',
                        },
                    },
                },
                'fetchTrades': {
                    'method': 'historyGetMarketSymbolExecutions', // historyGetMarketSymbolExecutions, publicGetHistory
                },
            },
            'features': {
                'default': {
                    'sandbox': true,
                    'createOrder': {
                        'marginMode': false,
                        'triggerPrice': true,
                        'triggerPriceType': {
                            'last': true,
                            'mark': true,
                            'index': true,
                        },
                        'triggerDirection': false,
                        'stopLossPrice': true,
                        'takeProfitPrice': true,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': true,
                            'GTD': false,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyByCost': false,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': false,
                        'iceberg': false,
                    },
                    'createOrders': {
                        'max': 100,
                    },
                    'fetchMyTrades': {
                        'marginMode': false,
                        'limit': undefined,
                        'daysBack': undefined,
                        'untilDays': 100000,
                        'symbolRequired': false,
                    },
                    'fetchOrder': undefined,
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': undefined,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOHLCV': {
                        'limit': 5000,
                    },
                },
                'spot': undefined,
                'swap': {
                    'linear': {
                        'extends': 'default',
                    },
                    'inverse': {
                        'extends': 'default',
                    },
                },
                'future': {
                    'linear': {
                        'extends': 'default',
                    },
                    'inverse': {
                        'extends': 'default',
                    },
                },
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '4h': '4h',
                '12h': '12h',
                '1d': '1d',
                '1w': '1w',
            },
        });
    }
    /**
     * @method
     * @name krakenfutures#fetchMarkets
     * @description Fetches the available trading markets from the exchange, Multi-collateral markets are returned as linear markets, but can be settled in multiple currencies
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-instrument-details-get-instruments
     * @param {object} [params] exchange specific params
     * @returns An array of market structures
     */
    async fetchMarkets(params = {}) {
        const response = await this.publicGetInstruments(params);
        //
        //    {
        //        "result": "success",
        //        "instruments": [
        //            {
        //                "symbol": "fi_ethusd_180928",
        //                "type": "futures_inverse", // futures_vanilla  // spot index
        //                "underlying": "rr_ethusd",
        //                "lastTradingTime": "2018-09-28T15:00:00.000Z",
        //                "tickSize": 0.1,
        //                "contractSize": 1,
        //                "tradeable": true,
        //                "marginLevels": [
        //                    {
        //                        "contracts":0,
        //                        "initialMargin":0.02,
        //                        "maintenanceMargin":0.01
        //                    },
        //                    {
        //                        "contracts":250000,
        //                        "initialMargin":0.04,
        //                        "maintenanceMargin":0.02
        //                    },
        //                    ...
        //                ],
        //                "isin": "GB00JVMLMP88",
        //                "retailMarginLevels": [
        //                    {
        //                        "contracts": 0,
        //                        "initialMargin": 0.5,
        //                        "maintenanceMargin": 0.25
        //                    }
        //                ],
        //                "tags": [],
        //            },
        //            {
        //                "symbol": "in_xbtusd",
        //                "type": "spot index",
        //                "tradeable":false
        //            }
        //        ]
        //        "serverTime": "2018-07-19T11:32:39.433Z"
        //    }
        //
        const instruments = this.safeValue(response, 'instruments', []);
        const result = [];
        for (let i = 0; i < instruments.length; i++) {
            const market = instruments[i];
            const id = this.safeString(market, 'symbol');
            const marketType = this.safeString(market, 'type');
            let type = undefined;
            const index = (marketType.indexOf(' index') >= 0);
            let linear = undefined;
            let inverse = undefined;
            let expiry = undefined;
            if (!index) {
                linear = (marketType.indexOf('_vanilla') >= 0);
                inverse = !linear;
                const settleTime = this.safeString(market, 'lastTradingTime');
                type = (settleTime === undefined) ? 'swap' : 'future';
                expiry = this.parse8601(settleTime);
            }
            else {
                type = 'index';
            }
            const swap = (type === 'swap');
            const future = (type === 'future');
            let symbol = id;
            const split = id.split('_');
            const splitMarket = this.safeString(split, 1);
            const baseId = splitMarket.slice(0, splitMarket.length - 3);
            const quoteId = 'usd'; // always USD
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            // swap == perpetual
            let settle = undefined;
            let settleId = undefined;
            const cvtp = this.safeString(market, 'contractValueTradePrecision');
            const amountPrecision = this.parseNumber(this.integerPrecisionToAmount(cvtp));
            const pricePrecision = this.safeNumber(market, 'tickSize');
            const contract = (swap || future || index);
            const swapOrFutures = (swap || future);
            if (swapOrFutures) {
                const exchangeType = this.safeString(market, 'type');
                if (exchangeType === 'futures_inverse') {
                    settle = base;
                    settleId = baseId;
                    inverse = true;
                }
                else {
                    settle = quote;
                    settleId = quoteId;
                    inverse = false;
                }
                linear = !inverse;
                symbol = base + '/' + quote + ':' + settle;
                if (future) {
                    symbol = symbol + '-' + this.yymmdd(expiry);
                }
            }
            result.push({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': settle,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': settleId,
                'type': type,
                'spot': false,
                'margin': false,
                'swap': swap,
                'future': future,
                'option': false,
                'index': index,
                'active': undefined,
                'contract': contract,
                'linear': linear,
                'inverse': inverse,
                'contractSize': this.safeNumber(market, 'contractSize'),
                'maintenanceMarginRate': undefined,
                'expiry': expiry,
                'expiryDatetime': this.iso8601(expiry),
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': amountPrecision,
                    'price': pricePrecision,
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
                'created': this.parse8601(this.safeString(market, 'openingDate')),
                'info': market,
            });
        }
        const settlementCurrencies = this.options['settlementCurrencies']['flex'];
        const currencies = [];
        for (let i = 0; i < settlementCurrencies.length; i++) {
            const code = settlementCurrencies[i];
            currencies.push({
                'id': code.toLowerCase(),
                'numericId': undefined,
                'code': code,
                'precision': undefined,
            });
        }
        this.currencies = this.mapToSafeMap(this.deepExtend(currencies, this.currencies));
        return result;
    }
    /**
     * @method
     * @name krakenfutures#fetchOrderBook
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-market-data-get-orderbook
     * @description Fetches a list of open orders in a market
     * @param {string} symbol Unified market symbol
     * @param {int} [limit] Not used by krakenfutures
     * @param {object} [params] exchange specific params
     * @returns An [order book structure]{@link https://docs.ccxt.com/#/?id=order-book-structure}
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetOrderbook(this.extend(request, params));
        //
        //    {
        //       "result": "success",
        //       "serverTime": "2016-02-25T09:45:53.818Z",
        //       "orderBook": {
        //          "bids": [
        //                [
        //                    4213,
        //                    2000,
        //                ],
        //                [
        //                    4210,
        //                    4000,
        //                ],
        //                ...
        //            ],
        //            "asks": [
        //                [
        //                    4218,
        //                    4000,
        //                ],
        //                [
        //                    4220,
        //                    5000,
        //                ],
        //                ...
        //            ],
        //        },
        //    }
        //
        const timestamp = this.parse8601(response['serverTime']);
        return this.parseOrderBook(response['orderBook'], symbol, timestamp);
    }
    /**
     * @method
     * @name krakenfutures#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-market-data-get-tickers
     * @param {string[]} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an array of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetTickers(params);
        //
        //    {
        //        "result": "success",
        //        "tickers": [
        //            {
        //                "tag": 'semiannual',  // 'month', 'quarter', "perpetual", "semiannual",
        //                "pair": "ETH:USD",
        //                "symbol": "fi_ethusd_220624",
        //                "markPrice": "2925.72",
        //                "bid": "2923.8",
        //                "bidSize": "16804",
        //                "ask": "2928.65",
        //                "askSize": "1339",
        //                "vol24h": "860493",
        //                "openInterest": "3023363.00000000",
        //                "open24h": "3021.25",
        //                "indexPrice": "2893.71",
        //                "last": "2942.25",
        //                "lastTime": "2022-02-18T14:08:15.578Z",
        //                "lastSize": "151",
        //                "suspended": false
        //            },
        //            {
        //                "symbol": "in_xbtusd", // "rr_xbtusd",
        //                "last": "40411",
        //                "lastTime": "2022-02-18T14:16:28.000Z"
        //            },
        //            ...
        //        ],
        //        "serverTime": "2022-02-18T14:16:29.440Z"
        //    }
        //
        const tickers = this.safeList(response, 'tickers');
        return this.parseTickers(tickers, symbols);
    }
    parseTicker(ticker, market = undefined) {
        //
        //    {
        //        "tag": 'semiannual',  // 'month', 'quarter', "perpetual", "semiannual",
        //        "pair": "ETH:USD",
        //        "symbol": "fi_ethusd_220624",
        //        "markPrice": "2925.72",
        //        "bid": "2923.8",
        //        "bidSize": "16804",
        //        "ask": "2928.65",
        //        "askSize": "1339",
        //        "vol24h": "860493",
        //        "openInterest": "3023363.00000000",
        //        "open24h": "3021.25",
        //        "indexPrice": "2893.71",
        //        "last": "2942.25",
        //        "lastTime": "2022-02-18T14:08:15.578Z",
        //        "lastSize": "151",
        //        "suspended": false
        //    }
        //
        //    {
        //        "symbol": "in_xbtusd", // "rr_xbtusd",
        //        "last": "40411",
        //        "lastTime": "2022-02-18T14:16:28.000Z"
        //    }
        //
        const marketId = this.safeString(ticker, 'symbol');
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        const timestamp = this.parse8601(this.safeString(ticker, 'lastTime'));
        const open = this.safeString(ticker, 'open24h');
        const last = this.safeString(ticker, 'last');
        const change = Precise["default"].stringSub(last, open);
        const percentage = Precise["default"].stringMul(Precise["default"].stringDiv(change, open), '100');
        const average = Precise["default"].stringDiv(Precise["default"].stringAdd(open, last), '2');
        const volume = this.safeString(ticker, 'vol24h');
        let baseVolume = undefined;
        let quoteVolume = undefined;
        const isIndex = this.safeBool(market, 'index', false);
        if (!isIndex) {
            if (market['linear']) {
                baseVolume = volume;
            }
            else if (market['inverse']) {
                quoteVolume = volume;
            }
        }
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': this.safeString(ticker, 'bid'),
            'bidVolume': this.safeString(ticker, 'bidSize'),
            'ask': this.safeString(ticker, 'ask'),
            'askVolume': this.safeString(ticker, 'askSize'),
            'vwap': undefined,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'markPrice': this.safeString(ticker, 'markPrice'),
            'indexPrice': this.safeString(ticker, 'indexPrice'),
            'info': ticker,
        });
    }
    /**
     * @method
     * @name krakenfutures#fetchOHLCV
     * @see https://docs.futures.kraken.com/#http-api-charts-candles
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchOHLCV', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDeterministic('fetchOHLCV', symbol, since, limit, timeframe, params, 5000);
        }
        const request = {
            'symbol': market['id'],
            'price_type': this.safeString(params, 'price', 'trade'),
            'interval': this.timeframes[timeframe],
        };
        params = this.omit(params, 'price');
        if (since !== undefined) {
            const duration = this.parseTimeframe(timeframe);
            request['from'] = this.parseToInt(since / 1000);
            if (limit === undefined) {
                limit = 5000;
            }
            limit = Math.min(limit, 5000);
            const toTimestamp = this.sum(request['from'], limit * duration - 1);
            const currentTimestamp = this.seconds();
            request['to'] = Math.min(toTimestamp, currentTimestamp);
        }
        else if (limit !== undefined) {
            limit = Math.min(limit, 5000);
            const duration = this.parseTimeframe(timeframe);
            request['to'] = this.seconds();
            request['from'] = this.parseToInt(request['to'] - (duration * limit));
        }
        const response = await this.chartsGetPriceTypeSymbolInterval(this.extend(request, params));
        //
        //    {
        //        "candles": [
        //            {
        //                "time": 1645198500000,
        //                "open": "309.15000000000",
        //                "high": "309.15000000000",
        //                "low": "308.70000000000",
        //                "close": "308.85000000000",
        //                "volume": 0
        //            }
        //        ],
        //        "more_candles": true
        //    }
        //
        const candles = this.safeList(response, 'candles');
        return this.parseOHLCVs(candles, market, timeframe, since, limit);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //    {
        //        "time": 1645198500000,
        //        "open": "309.15000000000",
        //        "high": "309.15000000000",
        //        "low": "308.70000000000",
        //        "close": "308.85000000000",
        //        "volume": 0
        //    }
        //
        return [
            this.safeInteger(ohlcv, 'time'),
            this.safeNumber(ohlcv, 'open'),
            this.safeNumber(ohlcv, 'high'),
            this.safeNumber(ohlcv, 'low'),
            this.safeNumber(ohlcv, 'close'),
            this.safeNumber(ohlcv, 'volume'), // trading volume, undefined for mark or index price
        ];
    }
    /**
     * @method
     * @name krakenfutures#fetchTrades
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-market-data-get-trade-history
     * @see https://docs.futures.kraken.com/#http-api-history-market-history-get-public-execution-events
     * @description Fetch a history of filled trades that this account has made
     * @param {string} symbol Unified CCXT market symbol
     * @param {int} [since] Timestamp in ms of earliest trade. Not used by krakenfutures except in combination with params.until
     * @param {int} [limit] Total number of trades, cannot exceed 100
     * @param {object} [params] Exchange specific params
     * @param {int} [params.until] Timestamp in ms of latest trade
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @param {string} [params.method] The method to use to fetch trades. Can be 'historyGetMarketSymbolExecutions' or 'publicGetHistory' default is 'historyGetMarketSymbolExecutions'
     * @returns An array of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchTrades', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchTrades', symbol, since, limit, params);
        }
        const market = this.market(symbol);
        let request = {
            'symbol': market['id'],
        };
        let method = undefined;
        [method, params] = this.handleOptionAndParams(params, 'fetchTrades', 'method', 'historyGetMarketSymbolExecutions');
        let rawTrades = undefined;
        const isFullHistoryEndpoint = (method === 'historyGetMarketSymbolExecutions');
        if (isFullHistoryEndpoint) {
            [request, params] = this.handleUntilOption('before', request, params);
            if (since !== undefined) {
                request['since'] = since;
                request['sort'] = 'asc';
            }
            if (limit !== undefined) {
                request['count'] = limit;
            }
            const response = await this.historyGetMarketSymbolExecutions(this.extend(request, params));
            //
            //    {
            //        "elements": [
            //            {
            //                "uid": "a5105030-f054-44cc-98ab-30d5cae96bef",
            //                "timestamp": "1710150778607",
            //                "event": {
            //                    "Execution": {
            //                        "execution": {
            //                            "uid": "2d485b71-cd28-4a1e-9364-371a127550d2",
            //                            "makerOrder": {
            //                                "uid": "0a25f66b-1109-49ec-93a3-d17bf9e9137e",
            //                                "tradeable": "PF_XBTUSD",
            //                                "direction": "Buy",
            //                                "quantity": "0.26500",
            //                                "timestamp": "1710150778570",
            //                                "limitPrice": "71907",
            //                                "orderType": "Post",
            //                                "reduceOnly": false,
            //                                "lastUpdateTimestamp": "1710150778570"
            //                            },
            //                            "takerOrder": {
            //                                "uid": "04de3ee0-9125-4960-bf8f-f63b577b6790",
            //                                "tradeable": "PF_XBTUSD",
            //                                "direction": "Sell",
            //                                "quantity": "0.0002",
            //                                "timestamp": "1710150778607",
            //                                "limitPrice": "71187.00",
            //                                "orderType": "Market",
            //                                "reduceOnly": false,
            //                                "lastUpdateTimestamp": "1710150778607"
            //                            },
            //                            "timestamp": "1710150778607",
            //                            "quantity": "0.0002",
            //                            "price": "71907",
            //                            "markPrice": "71903.32715463147",
            //                            "limitFilled": false,
            //                            "usdValue": "14.38"
            //                        },
            //                        "takerReducedQuantity": ""
            //                    }
            //                }
            //            },
            //            ... followed by older items
            //        ],
            //        "len": "1000",
            //        "continuationToken": "QTexMDE0OTe33NTcyXy8xNDIzAjc1NjY5MwI="
            //    }
            //
            const elements = this.safeList(response, 'elements', []);
            // we need to reverse the list to fix chronology
            rawTrades = [];
            const length = elements.length;
            for (let i = 0; i < length; i++) {
                const index = length - 1 - i;
                const element = elements[index];
                const event = this.safeDict(element, 'event', {});
                const executionContainer = this.safeDict(event, 'Execution', {});
                const rawTrade = this.safeDict(executionContainer, 'execution', {});
                rawTrades.push(rawTrade);
            }
        }
        else {
            [request, params] = this.handleUntilOption('lastTime', request, params);
            const response = await this.publicGetHistory(this.extend(request, params));
            //
            //    {
            //        "result": "success",
            //        "history": [
            //            {
            //                "time": "2022-03-18T04:55:37.692Z",
            //                "trade_id": 100,
            //                "price": 0.7921,
            //                "size": 1068,
            //                "side": "sell",
            //                "type": "fill",
            //                "uid": "6c5da0b0-f1a8-483f-921f-466eb0388265"
            //            },
            //            ...
            //        ],
            //        "serverTime": "2022-03-18T06:39:18.056Z"
            //    }
            //
            rawTrades = this.safeList(response, 'history', []);
        }
        return this.parseTrades(rawTrades, market, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchTrades (recent trades)
        //
        //    {
        //        "time": "2019-02-14T09:25:33.920Z",
        //        "trade_id": 100,
        //        "price": 3574,
        //        "size": 100,
        //        "side": "buy",
        //        "type": "fill" // fill, liquidation, assignment, termination
        //        "uid": "11c3d82c-9e70-4fe9-8115-f643f1b162d4"
        //    }
        //
        // fetchTrades (executions history)
        //
        //    {
        //        "timestamp": "1710152516830",
        //        "price": "71927.0",
        //        "quantity": "0.0695",
        //        "markPrice": "71936.38701675525",
        //        "limitFilled": true,
        //        "usdValue": "4998.93",
        //        "uid": "116ae634-253f-470b-bd20-fa9d429fb8b1",
        //        "makerOrder": { "uid": "17bfe4de-c01e-4938-926c-617d2a2d0597", "tradeable": "PF_XBTUSD", "direction": "Buy", "quantity": "0.0695", "timestamp": "1710152515836", "limitPrice": "71927.0", "orderType": "Post", "reduceOnly": false, "lastUpdateTimestamp": "1710152515836" },
        //        "takerOrder": { "uid": "d3e437b4-aa70-4108-b5cf-b1eecb9845b5", "tradeable": "PF_XBTUSD", "direction": "Sell", "quantity": "0.940100", "timestamp": "1710152516830", "limitPrice": "71915", "orderType": "IoC", "reduceOnly": false, "lastUpdateTimestamp": "1710152516830" }
        //    }
        //
        // fetchMyTrades (private)
        //
        //    {
        //        "fillTime": "2016-02-25T09:47:01.000Z",
        //        "order_id": "c18f0c17-9971-40e6-8e5b-10df05d422f0",
        //        "fill_id": "522d4e08-96e7-4b44-9694-bfaea8fe215e",
        //        "cliOrdId": "d427f920-ec55-4c18-ba95-5fe241513b30",     // OPTIONAL
        //        "symbol": "fi_xbtusd_180615",
        //        "side": "buy",
        //        "size": 2000,
        //        "price": 4255,
        //        "fillType": "maker"                                     // taker, takerAfterEdit, maker, liquidation, assignee
        //    }
        //
        // execution report (createOrder, editOrder)
        //
        //    {
        //        "executionId": "e1ec9f63-2338-4c44-b40a-43486c6732d7",
        //        "price": 7244.5,
        //        "amount": 10,
        //        "orderPriorEdit": null,
        //        "orderPriorExecution": {
        //            "orderId": "61ca5732-3478-42fe-8362-abbfd9465294",
        //            "cliOrdId": null,
        //            "type": "lmt",
        //            "symbol": "pi_xbtusd",
        //            "side": "buy",
        //            "quantity": 10,
        //            "filled": 0,
        //            "limitPrice": 7500,
        //            "reduceOnly": false,
        //            "timestamp": "2019-12-11T17:17:33.888Z",
        //            "lastUpdateTimestamp": "2019-12-11T17:17:33.888Z"
        //        },
        //        "takerReducedQuantity": null,
        //        "type": "EXECUTION"
        //    }
        //
        let timestamp = this.parse8601(this.safeString2(trade, 'time', 'fillTime'));
        const price = this.safeString(trade, 'price');
        const amount = this.safeStringN(trade, ['size', 'amount', 'quantity'], '0.0');
        let id = this.safeString2(trade, 'uid', 'fill_id');
        if (id === undefined) {
            id = this.safeString(trade, 'executionId');
        }
        let order = this.safeString(trade, 'order_id');
        let marketId = this.safeString(trade, 'symbol');
        let side = this.safeString(trade, 'side');
        let type = undefined;
        const priorEdit = this.safeValue(trade, 'orderPriorEdit');
        const priorExecution = this.safeValue(trade, 'orderPriorExecution');
        if (priorExecution !== undefined) {
            order = this.safeString(priorExecution, 'orderId');
            marketId = this.safeString(priorExecution, 'symbol');
            side = this.safeString(priorExecution, 'side');
            type = this.safeString(priorExecution, 'type');
        }
        else if (priorEdit !== undefined) {
            order = this.safeString(priorEdit, 'orderId');
            marketId = this.safeString(priorEdit, 'symbol');
            side = this.safeString(priorEdit, 'type');
            type = this.safeString(priorEdit, 'type');
        }
        if (type !== undefined) {
            type = this.parseOrderType(type);
        }
        market = this.safeMarket(marketId, market);
        let cost = undefined;
        const linear = this.safeBool(market, 'linear');
        if ((amount !== undefined) && (price !== undefined) && (market !== undefined)) {
            if (linear) {
                cost = Precise["default"].stringMul(amount, price); // in quote
            }
            else {
                cost = Precise["default"].stringDiv(amount, price); // in base
            }
            const contractSize = this.safeString(market, 'contractSize');
            cost = Precise["default"].stringMul(cost, contractSize);
        }
        let takerOrMaker = undefined;
        const fillType = this.safeString(trade, 'fillType');
        if (fillType !== undefined) {
            if (fillType.indexOf('taker') >= 0) {
                takerOrMaker = 'taker';
            }
            else if (fillType.indexOf('maker') >= 0) {
                takerOrMaker = 'maker';
            }
        }
        const isHistoricalExecution = ('takerOrder' in trade);
        if (isHistoricalExecution) {
            timestamp = this.safeInteger(trade, 'timestamp');
            const taker = this.safeDict(trade, 'takerOrder', {});
            if (taker !== undefined) {
                side = this.safeStringLower(taker, 'direction');
                takerOrMaker = 'taker';
            }
        }
        return this.safeTrade({
            'info': trade,
            'id': id,
            'symbol': this.safeString(market, 'symbol'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'order': order,
            'type': type,
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': price,
            'amount': linear ? amount : undefined,
            'cost': cost,
            'fee': undefined,
        });
    }
    createOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        const market = this.market(symbol);
        symbol = market['symbol'];
        type = this.safeString(params, 'orderType', type);
        const timeInForce = this.safeString(params, 'timeInForce');
        let postOnly = false;
        [postOnly, params] = this.handlePostOnly(type === 'market', type === 'post', params);
        if (postOnly) {
            type = 'post';
        }
        else if (timeInForce === 'ioc') {
            type = 'ioc';
        }
        else if (type === 'limit') {
            type = 'lmt';
        }
        else if (type === 'market') {
            type = 'mkt';
        }
        const request = {
            'symbol': market['id'],
            'side': side,
            'size': this.amountToPrecision(symbol, amount),
        };
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'cliOrdId');
        if (clientOrderId !== undefined) {
            request['cliOrdId'] = clientOrderId;
        }
        const triggerPrice = this.safeString2(params, 'triggerPrice', 'stopPrice');
        const isTriggerOrder = triggerPrice !== undefined;
        const stopLossTriggerPrice = this.safeString(params, 'stopLossPrice');
        const takeProfitTriggerPrice = this.safeString(params, 'takeProfitPrice');
        const isStopLossTriggerOrder = stopLossTriggerPrice !== undefined;
        const isTakeProfitTriggerOrder = takeProfitTriggerPrice !== undefined;
        const isStopLossOrTakeProfitTrigger = isStopLossTriggerOrder || isTakeProfitTriggerOrder;
        const triggerSignal = this.safeString(params, 'triggerSignal', 'last');
        let reduceOnly = this.safeValue(params, 'reduceOnly');
        if (isStopLossOrTakeProfitTrigger || isTriggerOrder) {
            request['triggerSignal'] = triggerSignal;
        }
        if (isTriggerOrder) {
            type = 'stp';
            request['stopPrice'] = this.priceToPrecision(symbol, triggerPrice);
        }
        else if (isStopLossOrTakeProfitTrigger) {
            reduceOnly = true;
            if (isStopLossTriggerOrder) {
                type = 'stp';
                request['stopPrice'] = this.priceToPrecision(symbol, stopLossTriggerPrice);
            }
            else if (isTakeProfitTriggerOrder) {
                type = 'take_profit';
                request['stopPrice'] = this.priceToPrecision(symbol, takeProfitTriggerPrice);
            }
        }
        if (reduceOnly) {
            request['reduceOnly'] = true;
        }
        request['orderType'] = type;
        if (price !== undefined) {
            request['limitPrice'] = this.priceToPrecision(symbol, price);
        }
        params = this.omit(params, ['clientOrderId', 'timeInForce', 'triggerPrice', 'stopLossPrice', 'takeProfitPrice']);
        return this.extend(request, params);
    }
    /**
     * @method
     * @name krakenfutures#createOrder
     * @description Create an order on the exchange
     * @see https://docs.kraken.com/api/docs/futures-api/trading/send-order
     * @param {string} symbol unified market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount number of contracts
     * @param {float} [price] limit order price
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.reduceOnly] set as true if you wish the order to only reduce an existing position, any order which increases an existing position will be rejected, default is false
     * @param {bool} [params.postOnly] set as true if you wish to make a postOnly order, default is false
     * @param {string} [params.clientOrderId] UUID The order identity that is specified from the user, It must be globally unique
     * @param {float} [params.triggerPrice] the price that a stop order is triggered at
     * @param {float} [params.stopLossPrice] the price that a stop loss order is triggered at
     * @param {float} [params.takeProfitPrice] the price that a take profit order is triggered at
     * @param {string} [params.triggerSignal] for triggerPrice, stopLossPrice and takeProfitPrice orders, the trigger price type, 'last', 'mark' or 'index', default is 'last'
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const orderRequest = this.createOrderRequest(symbol, type, side, amount, price, params);
        const response = await this.privatePostSendorder(orderRequest);
        //
        //    {
        //        "result": "success",
        //        "sendStatus": {
        //            "order_id": "salf320-e337-47ac-b345-30sdfsalj",
        //            "status": "placed",
        //            "receivedTime": "2022-02-28T19:32:17.122Z",
        //            "orderEvents": [
        //                {
        //                    "order": {
        //                        "orderId": "salf320-e337-47ac-b345-30sdfsalj",
        //                        "cliOrdId": null,
        //                        "type": "lmt",
        //                        "symbol": "pi_xrpusd",
        //                        "side": "buy",
        //                        "quantity": 1,
        //                        "filled": 0,
        //                        "limitPrice": 0.7,
        //                        "reduceOnly": false,
        //                        "timestamp": "2022-02-28T19:32:17.122Z",
        //                        "lastUpdateTimestamp": "2022-02-28T19:32:17.122Z"
        //                    },
        //                    "reducedQuantity": null,
        //                    "type": "PLACE"
        //                }
        //            ]
        //        },
        //        "serverTime": "2022-02-28T19:32:17.122Z"
        //    }
        //
        const sendStatus = this.safeValue(response, 'sendStatus');
        const status = this.safeString(sendStatus, 'status');
        this.verifyOrderActionSuccess(status, 'createOrder', ['filled']);
        return this.parseOrder(sendStatus, market);
    }
    /**
     * @method
     * @name krakenfutures#createOrders
     * @description create a list of trade orders
     * @see https://docs.kraken.com/api/docs/futures-api/trading/send-batch-order
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrders(orders, params = {}) {
        await this.loadMarkets();
        const ordersRequests = [];
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const marketId = this.safeString(rawOrder, 'symbol');
            const type = this.safeString(rawOrder, 'type');
            const side = this.safeString(rawOrder, 'side');
            const amount = this.safeValue(rawOrder, 'amount');
            const price = this.safeValue(rawOrder, 'price');
            const orderParams = this.safeValue(rawOrder, 'params', {});
            const extendedParams = this.extend(orderParams, params); // the request does not accept extra params since it's a list, so we're extending each order with the common params
            if (!('order_tag' in extendedParams)) {
                // order tag is mandatory so we will generate one if not provided
                extendedParams['order_tag'] = this.sum(i, 1).toString(); // sequential counter
            }
            extendedParams['order'] = 'send';
            const orderRequest = this.createOrderRequest(marketId, type, side, amount, price, extendedParams);
            ordersRequests.push(orderRequest);
        }
        const request = {
            'batchOrder': ordersRequests,
        };
        const response = await this.privatePostBatchorder(this.extend(request, params));
        //
        // {
        //     "result": "success",
        //     "serverTime": "2023-10-24T08:40:57.339Z",
        //     "batchStatus": [
        //        {
        //           "status": "requiredArgumentMissing",
        //           "orderEvents": []
        //        },
        //        {
        //           "status": "requiredArgumentMissing",
        //           "orderEvents": []
        //        }
        //     ]
        // }
        //
        const data = this.safeList(response, 'batchStatus', []);
        return this.parseOrders(data);
    }
    /**
     * @method
     * @name krakenfutures#editOrder
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-edit-order
     * @description Edit an open order on the exchange
     * @param {string} id order id
     * @param {string} symbol Not used by Krakenfutures
     * @param {string} type Not used by Krakenfutures
     * @param {string} side Not used by Krakenfutures
     * @param {float} amount Order size
     * @param {float} [price] Price to fill order at
     * @param {object} [params] Exchange specific params
     * @returns An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
            'orderId': id,
        };
        if (amount !== undefined) {
            request['size'] = amount;
        }
        if (price !== undefined) {
            request['limitPrice'] = price;
        }
        const response = await this.privatePostEditorder(this.extend(request, params));
        const status = this.safeString(response['editStatus'], 'status');
        this.verifyOrderActionSuccess(status, 'editOrder', ['filled']);
        const order = this.parseOrder(response['editStatus']);
        order['info'] = response;
        return order;
    }
    /**
     * @method
     * @name krakenfutures#cancelOrder
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-cancel-order
     * @description Cancel an open order on the exchange
     * @param {string} id Order id
     * @param {string} symbol Not used by Krakenfutures
     * @param {object} [params] Exchange specific params
     * @returns An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.privatePostCancelorder(this.extend({ 'order_id': id }, params));
        const status = this.safeString(this.safeValue(response, 'cancelStatus', {}), 'status');
        this.verifyOrderActionSuccess(status, 'cancelOrder');
        let order = {};
        if ('cancelStatus' in response) {
            order = this.parseOrder(response['cancelStatus']);
        }
        return this.extend({ 'info': response }, order);
    }
    /**
     * @method
     * @name krakenfutures#cancelOrders
     * @description cancel multiple orders
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-batch-order-management
     * @param {string[]} ids order ids
     * @param {string} [symbol] unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     *
     * EXCHANGE SPECIFIC PARAMETERS
     * @param {string[]} [params.clientOrderIds] max length 10 e.g. ["my_id_1","my_id_2"]
     * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrders(ids, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const orders = [];
        const clientOrderIds = this.safeValue(params, 'clientOrderIds', []);
        const clientOrderIdsLength = clientOrderIds.length;
        if (clientOrderIdsLength > 0) {
            for (let i = 0; i < clientOrderIds.length; i++) {
                orders.push({ 'order': 'cancel', 'cliOrdId': clientOrderIds[i] });
            }
        }
        else {
            for (let i = 0; i < ids.length; i++) {
                orders.push({ 'order': 'cancel', 'order_id': ids[i] });
            }
        }
        const request = {
            'batchOrder': orders,
        };
        const response = await this.privatePostBatchorder(this.extend(request, params));
        // {
        //     "result": "success",
        //     "serverTime": "2023-10-23T16:36:51.327Z",
        //     "batchStatus": [
        //       {
        //         "status": "cancelled",
        //         "order_id": "101c2327-f12e-45f2-8445-7502b87afc0b",
        //         "orderEvents": [
        //           {
        //             "uid": "101c2327-f12e-45f2-8445-7502b87afc0b",
        //             "order": {
        //               "orderId": "101c2327-f12e-45f2-8445-7502b87afc0b",
        //               "cliOrdId": null,
        //               "type": "lmt",
        //               "symbol": "PF_LTCUSD",
        //               "side": "buy",
        //               "quantity": "0.10000000000",
        //               "filled": "0E-11",
        //               "limitPrice": "50.00000000000",
        //               "reduceOnly": false,
        //               "timestamp": "2023-10-20T10:29:13.005Z",
        //               "lastUpdateTimestamp": "2023-10-20T10:29:13.005Z"
        //             },
        //             "type": "CANCEL"
        //           }
        //         ]
        //       }
        //     ]
        // }
        const batchStatus = this.safeList(response, 'batchStatus', []);
        return this.parseOrders(batchStatus);
    }
    /**
     * @method
     * @name krakenfutures#cancelAllOrders
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-cancel-all-orders
     * @description Cancels all orders on the exchange, including trigger orders
     * @param {str} symbol Unified market symbol
     * @param {dict} [params] Exchange specific params
     * @returns Response from exchange api
     */
    async cancelAllOrders(symbol = undefined, params = {}) {
        const request = {};
        if (symbol !== undefined) {
            request['symbol'] = this.marketId(symbol);
        }
        const response = await this.privatePostCancelallorders(this.extend(request, params));
        //
        //    {
        //        result: 'success',
        //        cancelStatus: {
        //          receivedTime: '2024-06-06T01:12:44.814Z',
        //          cancelOnly: 'PF_XRPUSD',
        //          status: 'cancelled',
        //          cancelledOrders: [ { order_id: '272fd0ac-45c0-4003-b84d-d39b9e86bd36' } ],
        //          orderEvents: [
        //            {
        //              uid: '272fd0ac-45c0-4003-b84d-d39b9e86bd36',
        //              order: {
        //                orderId: '272fd0ac-45c0-4003-b84d-d39b9e86bd36',
        //                cliOrdId: null,
        //                type: 'lmt',
        //                symbol: 'PF_XRPUSD',
        //                side: 'buy',
        //                quantity: '10',
        //                filled: '0',
        //                limitPrice: '0.4',
        //                reduceOnly: false,
        //                timestamp: '2024-06-06T01:11:16.045Z',
        //                lastUpdateTimestamp: '2024-06-06T01:11:16.045Z'
        //              },
        //              type: 'CANCEL'
        //            }
        //          ]
        //        },
        //        serverTime: '2024-06-06T01:12:44.814Z'
        //    }
        //
        const cancelStatus = this.safeDict(response, 'cancelStatus');
        const orderEvents = this.safeList(cancelStatus, 'orderEvents', []);
        const orders = [];
        for (let i = 0; i < orderEvents.length; i++) {
            const orderEvent = this.safeDict(orderEvents, 0);
            const order = this.safeDict(orderEvent, 'order', {});
            orders.push(order);
        }
        return this.parseOrders(orders);
    }
    /**
     * @method
     * @name krakenfutures#cancelAllOrdersAfter
     * @description dead man's switch, cancel all orders after the given timeout
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-dead-man-39-s-switch
     * @param {number} timeout time in milliseconds, 0 represents cancel the timer
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} the api result
     */
    async cancelAllOrdersAfter(timeout, params = {}) {
        await this.loadMarkets();
        const request = {
            'timeout': (timeout > 0) ? (this.parseToInt(timeout / 1000)) : 0,
        };
        const response = await this.privatePostCancelallordersafter(this.extend(request, params));
        //
        //     {
        //         "result": "success",
        //         "serverTime": "2018-06-19T16:51:23.839Z",
        //         "status": {
        //             "currentTime": "2018-06-19T16:51:23.839Z",
        //             "triggerTime": "0"
        //         }
        //     }
        //
        return response;
    }
    /**
     * @method
     * @name krakenfutures#fetchOpenOrders
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-order-management-get-open-orders
     * @description Gets all open orders, including trigger orders, for an account from the exchange api
     * @param {string} symbol Unified market symbol
     * @param {int} [since] Timestamp (ms) of earliest order. (Not used by kraken api but filtered internally by CCXT)
     * @param {int} [limit] How many orders to return. (Not used by kraken api but filtered internally by CCXT)
     * @param {object} [params] Exchange specific parameters
     * @returns An array of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const response = await this.privateGetOpenorders(params);
        const orders = this.safeList(response, 'openOrders', []);
        return this.parseOrders(orders, market, since, limit);
    }
    /**
     * @method
     * @name krakenfutures#fetchClosedOrders
     * @see https://docs.futures.kraken.com/#http-api-history-account-history-get-order-events
     * @description Gets all closed orders, including trigger orders, for an account from the exchange api
     * @param {string} symbol Unified market symbol
     * @param {int} [since] Timestamp (ms) of earliest order.
     * @param {int} [limit] How many orders to return.
     * @param {object} [params] Exchange specific parameters
     * @returns An array of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const request = {};
        if (limit !== undefined) {
            request['count'] = limit;
        }
        if (since !== undefined) {
            request['from'] = since;
        }
        const response = await this.historyGetOrders(this.extend(request, params));
        const allOrders = this.safeList(response, 'elements', []);
        const closedOrders = [];
        for (let i = 0; i < allOrders.length; i++) {
            const order = allOrders[i];
            const event = this.safeDict(order, 'event', {});
            const orderPlaced = this.safeDict(event, 'OrderPlaced');
            if (orderPlaced !== undefined) {
                const innerOrder = this.safeDict(orderPlaced, 'order', {});
                const filled = this.safeString(innerOrder, 'filled');
                if (filled !== '0') {
                    innerOrder['status'] = 'closed'; // status not available in the response
                    closedOrders.push(innerOrder);
                }
            }
        }
        return this.parseOrders(closedOrders, market, since, limit);
    }
    /**
     * @method
     * @name krakenfutures#fetchCanceledOrders
     * @see https://docs.futures.kraken.com/#http-api-history-account-history-get-order-events
     * @description Gets all canceled orders, including trigger orders, for an account from the exchange api
     * @param {string} symbol Unified market symbol
     * @param {int} [since] Timestamp (ms) of earliest order.
     * @param {int} [limit] How many orders to return.
     * @param {object} [params] Exchange specific parameters
     * @returns An array of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchCanceledOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const request = {};
        if (limit !== undefined) {
            request['count'] = limit;
        }
        if (since !== undefined) {
            request['from'] = since;
        }
        const response = await this.historyGetOrders(this.extend(request, params));
        const allOrders = this.safeList(response, 'elements', []);
        const canceledAndRejected = [];
        for (let i = 0; i < allOrders.length; i++) {
            const order = allOrders[i];
            const event = this.safeDict(order, 'event', {});
            const orderPlaced = this.safeDict(event, 'OrderPlaced');
            if (orderPlaced !== undefined) {
                const innerOrder = this.safeDict(orderPlaced, 'order', {});
                const filled = this.safeString(innerOrder, 'filled');
                if (filled === '0') {
                    innerOrder['status'] = 'canceled'; // status not available in the response
                    canceledAndRejected.push(innerOrder);
                }
            }
            const orderCanceled = this.safeDict(event, 'OrderCancelled');
            if (orderCanceled !== undefined) {
                const innerOrder = this.safeDict(orderCanceled, 'order', {});
                innerOrder['status'] = 'canceled'; // status not available in the response
                canceledAndRejected.push(innerOrder);
            }
            const orderRejected = this.safeDict(event, 'OrderRejected');
            if (orderRejected !== undefined) {
                const innerOrder = this.safeDict(orderRejected, 'order', {});
                innerOrder['status'] = 'rejected'; // status not available in the response
                canceledAndRejected.push(innerOrder);
            }
        }
        return this.parseOrders(canceledAndRejected, market, since, limit);
    }
    parseOrderType(orderType) {
        const typesMap = {
            'lmt': 'limit',
            'mkt': 'market',
            'post': 'limit',
            'ioc': 'market',
        };
        return this.safeString(typesMap, orderType, orderType);
    }
    verifyOrderActionSuccess(status, method, omit = []) {
        const errors$1 = {
            'invalidOrderType': errors.InvalidOrder,
            'invalidSide': errors.InvalidOrder,
            'invalidSize': errors.InvalidOrder,
            'invalidPrice': errors.InvalidOrder,
            'insufficientAvailableFunds': errors.InsufficientFunds,
            'selfFill': errors.ExchangeError,
            'tooManySmallOrders': errors.ExchangeError,
            'maxPositionViolation': errors.BadRequest,
            'marketSuspended': errors.ExchangeNotAvailable,
            'marketInactive': errors.ExchangeNotAvailable,
            'clientOrderIdAlreadyExist': errors.DuplicateOrderId,
            'clientOrderIdTooLong': errors.BadRequest,
            'outsidePriceCollar': errors.InvalidOrder,
            'postWouldExecute': errors.OrderImmediatelyFillable,
            'iocWouldNotExecute': errors.OrderNotFillable,
            'wouldNotReducePosition': errors.ExchangeError,
            'orderForEditNotFound': errors.OrderNotFound,
            'orderForEditNotAStop': errors.InvalidOrder,
            'filled': errors.OrderNotFound,
            'notFound': errors.OrderNotFound,
        };
        if ((status in errors$1) && !this.inArray(status, omit)) {
            throw new errors$1[status](this.id + ': ' + method + ' failed due to ' + status);
        }
    }
    parseOrderStatus(status) {
        const statuses = {
            'placed': 'open',
            'cancelled': 'canceled',
            'invalidOrderType': 'rejected',
            'invalidSide': 'rejected',
            'invalidSize': 'rejected',
            'invalidPrice': 'rejected',
            'insufficientAvailableFunds': 'rejected',
            'selfFill': 'rejected',
            'tooManySmallOrders': 'rejected',
            'maxPositionViolation': 'rejected',
            'marketSuspended': 'rejected',
            'marketInactive': 'rejected',
            'clientOrderIdAlreadyExist': 'rejected',
            'clientOrderIdTooLong': 'rejected',
            'outsidePriceCollar': 'rejected',
            // Should the next two be 'expired' ?
            'postWouldExecute': 'rejected',
            'iocWouldNotExecute': 'rejected',
            'wouldNotReducePosition': 'rejected',
            'edited': 'open',
            'orderForEditNotFound': 'rejected',
            'orderForEditNotAStop': 'rejected',
            'filled': 'closed',
            'notFound': 'rejected',
            'untouched': 'open',
            'partiallyFilled': 'open', // the size of the order is partially but not entirely filled
        };
        return this.safeString(statuses, status, status);
    }
    parseOrder(order, market = undefined) {
        //
        // LIMIT
        //
        //    {
        //        "order_id": "179f9af8-e45e-469d-b3e9-2fd4675cb7d0",
        //        "status": "placed",
        //        "receivedTime": "2019-09-05T16:33:50.734Z",
        //        "orderEvents": [
        //            {
        //                "uid": "614a5298-0071-450f-83c6-0617ce8c6bc4",
        //                "order": {
        //                    "orderId": "179f9af8-e45e-469d-b3e9-2fd4675cb7d0",
        //                    "cliOrdId": null,
        //                    "type": "lmt",
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity": 10000,
        //                    "filled": 0,
        //                    "limitPrice": 9400,
        //                    "reduceOnly": false,
        //                    "timestamp": "2019-09-05T16:33:50.734Z",
        //                    "lastUpdateTimestamp": "2019-09-05T16:33:50.734Z"
        //                },
        //                "reducedQuantity": null,
        //                "reason": "WOULD_NOT_REDUCE_POSITION", // REJECTED
        //                "type": "PLACE"
        //            }
        //        ]
        //    }
        //
        // CONDITIONAL
        //
        //    {
        //        "order_id": "1abfd3c6-af93-4b30-91cc-e4a93797f3f5",
        //        "status": "placed",
        //        "receivedTime": "2019-12-05T10:20:50.701Z",
        //        "orderEvents": [
        //            {
        //                "orderTrigger": {
        //                    "uid": "1abfd3c6-af93-4b30-91cc-e4a93797f3f5",
        //                    "clientId":null,
        //                    "type": "lmt",                                // "ioc" if stop market
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity":10,
        //                    "limitPrice":15000,
        //                    "triggerPrice":9500,
        //                    "triggerSide": "trigger_below",
        //                    "triggerSignal": "mark_price",
        //                    "reduceOnly":false,
        //                    "timestamp": "2019-12-05T10:20:50.701Z",
        //                    "lastUpdateTimestamp": "2019-12-05T10:20:50.701Z"
        //                },
        //                "type": "PLACE"
        //            }
        //        ]
        //    }
        //
        // EXECUTION
        //
        //    {
        //        "order_id": "61ca5732-3478-42fe-8362-abbfd9465294",
        //        "status": "placed",
        //        "receivedTime": "2019-12-11T17:17:33.888Z",
        //        "orderEvents": [
        //            {
        //                "executionId": "e1ec9f63-2338-4c44-b40a-43486c6732d7",
        //                "price": 7244.5,
        //                "amount": 10,
        //                "orderPriorEdit": null,
        //                "orderPriorExecution": {
        //                    "orderId": "61ca5732-3478-42fe-8362-abbfd9465294",
        //                    "cliOrdId": null,
        //                    "type": "lmt",
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity": 10,
        //                    "filled": 0,
        //                    "limitPrice": 7500,
        //                    "reduceOnly": false,
        //                    "timestamp": "2019-12-11T17:17:33.888Z",
        //                    "lastUpdateTimestamp": "2019-12-11T17:17:33.888Z"
        //                },
        //                "takerReducedQuantity": null,
        //                "type": "EXECUTION"
        //            }
        //        ]
        //    }
        //
        // EDIT ORDER
        //
        //    {
        //        "status": "edited",
        //        "orderId": "022774bc-2c4a-4f26-9317-436c8d85746d",
        //        "receivedTime": "2019-09-05T16:47:47.521Z",
        //        "orderEvents": [
        //            {
        //                "old": {
        //                    "orderId": "022774bc-2c4a-4f26-9317-436c8d85746d",
        //                    "cliOrdId":null,
        //                    "type": "lmt",
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity":1000,
        //                    "filled":0,
        //                    "limitPrice":9400.0,
        //                    "reduceOnly":false,
        //                    "timestamp": "2019-09-05T16:41:35.173Z",
        //                    "lastUpdateTimestamp": "2019-09-05T16:41:35.173Z"
        //                },
        //                "new": {
        //                    "orderId": "022774bc-2c4a-4f26-9317-436c8d85746d",
        //                    "cliOrdId": null,
        //                    "type": "lmt",
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity": 1501,
        //                    "filled": 0,
        //                    "limitPrice": 7200,
        //                    "reduceOnly": false,
        //                    "timestamp": "2019-09-05T16:41:35.173Z",
        //                    "lastUpdateTimestamp": "2019-09-05T16:47:47.519Z"
        //                },
        //                "reducedQuantity": null,
        //                "type": "EDIT"
        //            }
        //        ]
        //    }
        //
        // CANCEL ORDER
        //
        //    {
        //        "status": "cancelled",
        //        "orderEvents": [
        //            {
        //                "uid": "85c40002-3f20-4e87-9302-262626c3531b",
        //                "order": {
        //                    "orderId": "85c40002-3f20-4e87-9302-262626c3531b",
        //                    "cliOrdId": null,
        //                    "type": "lmt",
        //                    "symbol": "pi_xbtusd",
        //                    "side": "buy",
        //                    "quantity": 1000,
        //                    "filled": 0,
        //                    "limitPrice": 10144,
        //                    "stopPrice": null,
        //                    "reduceOnly": false,
        //                    "timestamp": "2019-08-01T15:26:27.790Z"
        //                },
        //                "type": "CANCEL"
        //            }
        //        ]
        //    }
        //
        // cancelAllOrders
        //
        //    {
        //        "orderId": "85c40002-3f20-4e87-9302-262626c3531b",
        //        "cliOrdId": null,
        //        "type": "lmt",
        //        "symbol": "pi_xbtusd",
        //        "side": "buy",
        //        "quantity": 1000,
        //        "filled": 0,
        //        "limitPrice": 10144,
        //        "stopPrice": null,
        //        "reduceOnly": false,
        //        "timestamp": "2019-08-01T15:26:27.790Z"
        //    }
        //
        // FETCH OPEN ORDERS
        //
        //    {
        //        "order_id": "59302619-41d2-4f0b-941f-7e7914760ad3",
        //        "symbol": "pi_xbtusd",
        //        "side": "sell",
        //        "orderType": "lmt",
        //        "limitPrice": 10640,
        //        "unfilledSize": 304,
        //        "receivedTime": "2019-09-05T17:01:17.410Z",
        //        "status": "untouched",
        //        "filledSize": 0,
        //        "reduceOnly": true,
        //        "lastUpdateTime": "2019-09-05T17:01:17.410Z"
        //    }
        //
        // createOrders error
        //    {
        //       "status": "requiredArgumentMissing",
        //       "orderEvents": []
        //    }
        // closed orders
        //    {
        //        uid: '2f00cd63-e61d-44f8-8569-adabde885941',
        //        timestamp: '1707258274849',
        //        event: {
        //          OrderPlaced: {
        //            order: {
        //              uid: '85805e01-9eed-4395-8360-ed1a228237c9',
        //              accountUid: '406142dd-7c5c-4a8b-acbc-5f16eca30009',
        //              tradeable: 'PF_LTCUSD',
        //              direction: 'Buy',
        //              quantity: '0',
        //              filled: '0.1',
        //              timestamp: '1707258274849',
        //              limitPrice: '69.2200000000',
        //              orderType: 'IoC',
        //              clientId: '',
        //              reduceOnly: false,
        //              lastUpdateTimestamp: '1707258274849'
        //            },
        //            reason: 'new_user_order',
        //            reducedQuantity: '',
        //            algoId: ''
        //          }
        //        }
        //    }
        //
        const orderEvents = this.safeValue(order, 'orderEvents', []);
        const errorStatus = this.safeString(order, 'status');
        const orderEventsLength = orderEvents.length;
        if (('orderEvents' in order) && (errorStatus !== undefined) && (orderEventsLength === 0)) {
            // creteOrders error response
            return this.safeOrder({ 'info': order, 'status': 'rejected' });
        }
        let details = undefined;
        let isPrior = false;
        let fixed = false;
        let statusId = undefined;
        let price = undefined;
        let trades = [];
        if (orderEventsLength) {
            const executions = [];
            for (let i = 0; i < orderEvents.length; i++) {
                const item = orderEvents[i];
                if (this.safeString(item, 'type') === 'EXECUTION') {
                    executions.push(item);
                }
                // Final order (after placement / editing / execution / canceling)
                const orderTrigger = this.safeValue(item, 'orderTrigger');
                if (details === undefined) {
                    details = this.safeValue2(item, 'new', 'order', orderTrigger);
                    if (details !== undefined) {
                        isPrior = false;
                        fixed = true;
                    }
                    else if (!fixed) {
                        const orderPriorExecution = this.safeValue(item, 'orderPriorExecution');
                        details = this.safeValue2(item, 'orderPriorExecution', 'orderPriorEdit');
                        price = this.safeString(orderPriorExecution, 'limitPrice');
                        if (details !== undefined) {
                            isPrior = true;
                        }
                    }
                }
            }
            trades = this.parseTrades(executions);
            statusId = this.safeString(order, 'status');
        }
        if (details === undefined) {
            details = order;
        }
        if (statusId === undefined) {
            statusId = this.safeString(details, 'status');
        }
        // This may be incorrectly marked as "open" if only execution report is given,
        // but will be fixed below
        let status = this.parseOrderStatus(statusId);
        let isClosed = this.inArray(status, ['canceled', 'rejected', 'closed']);
        const marketId = this.safeString(details, 'symbol');
        market = this.safeMarket(marketId, market);
        const timestamp = this.parse8601(this.safeString2(details, 'timestamp', 'receivedTime'));
        const lastUpdateTimestamp = this.parse8601(this.safeString(details, 'lastUpdateTime'));
        if (price === undefined) {
            price = this.safeString(details, 'limitPrice');
        }
        let amount = this.safeString(details, 'quantity');
        let filled = this.safeString2(details, 'filledSize', 'filled', '0.0');
        let remaining = this.safeString(details, 'unfilledSize');
        let average = undefined;
        let filled2 = '0.0';
        const tradesLength = trades.length;
        if (tradesLength > 0) {
            let vwapSum = '0.0';
            for (let i = 0; i < trades.length; i++) {
                const trade = trades[i];
                const tradeAmount = this.safeString(trade, 'amount');
                const tradePrice = this.safeString(trade, 'price');
                filled2 = Precise["default"].stringAdd(filled2, tradeAmount);
                vwapSum = Precise["default"].stringAdd(vwapSum, Precise["default"].stringMul(tradeAmount, tradePrice));
            }
            average = Precise["default"].stringDiv(vwapSum, filled2);
            if ((amount !== undefined) && (!isClosed) && isPrior && Precise["default"].stringGe(filled2, amount)) {
                status = 'closed';
                isClosed = true;
            }
            if (isPrior) {
                filled = Precise["default"].stringAdd(filled, filled2);
            }
            else {
                filled = Precise["default"].stringMax(filled, filled2);
            }
        }
        if (remaining === undefined) {
            if (isPrior) {
                if (amount !== undefined) {
                    // remaining amount before execution minus executed amount
                    remaining = Precise["default"].stringSub(amount, filled2);
                }
            }
            else {
                remaining = amount;
            }
        }
        // if fetchOpenOrders are parsed
        if ((amount === undefined) && (!isPrior) && (remaining !== undefined)) {
            amount = Precise["default"].stringAdd(filled, remaining);
        }
        let cost = undefined;
        if ((filled !== undefined) && (market !== undefined)) {
            const whichPrice = (average !== undefined) ? average : price;
            if (whichPrice !== undefined) {
                if (market['linear']) {
                    cost = Precise["default"].stringMul(filled, whichPrice); // in quote
                }
                else {
                    cost = Precise["default"].stringDiv(filled, whichPrice); // in base
                }
            }
        }
        let id = this.safeString2(order, 'order_id', 'orderId');
        if (id === undefined) {
            id = this.safeString2(details, 'orderId', 'uid');
        }
        const type = this.safeStringLower2(details, 'type', 'orderType');
        let timeInForce = 'gtc';
        if (type === 'ioc' || this.parseOrderType(type) === 'market') {
            timeInForce = 'ioc';
        }
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': this.safeStringN(details, ['clientOrderId', 'clientId', 'cliOrdId']),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': lastUpdateTimestamp,
            'symbol': this.safeString(market, 'symbol'),
            'type': this.parseOrderType(type),
            'timeInForce': timeInForce,
            'postOnly': type === 'post',
            'reduceOnly': this.safeBool2(details, 'reduceOnly', 'reduce_only'),
            'side': this.safeString(details, 'side'),
            'price': price,
            'triggerPrice': this.safeString(details, 'triggerPrice'),
            'amount': amount,
            'cost': cost,
            'average': average,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
            'fees': undefined,
            'trades': trades,
        });
    }
    /**
     * @method
     * @name krakenfutures#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-historical-data-get-your-fills
     * @param {string} symbol unified market symbol
     * @param {int} [since] *not used by the  api* the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        // todo: lastFillTime: this.iso8601(end)
        const response = await this.privateGetFills(params);
        //
        //    {
        //        "result": "success",
        //        "serverTime": "2016-02-25T09:45:53.818Z",
        //        "fills": [
        //            {
        //                "fillTime": "2016-02-25T09:47:01.000Z",
        //                "order_id": "c18f0c17-9971-40e6-8e5b-10df05d422f0",
        //                "fill_id": "522d4e08-96e7-4b44-9694-bfaea8fe215e",
        //                "cliOrdId": "d427f920-ec55-4c18-ba95-5fe241513b30", // EXTRA
        //                "symbol": "fi_xbtusd_180615",
        //                "side": "buy",
        //                "size": 2000,
        //                "price": 4255,
        //                "fillType": "maker"
        //            },
        //            ...
        //        ]
        //    }
        //
        return this.parseTrades(response['fills'], market, since, limit);
    }
    /**
     * @method
     * @name krakenfutures#fetchBalance
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-account-information-get-wallets
     * @description Fetch the balance for a sub-account, all sub-account balances are inside 'info' in the response
     * @param {object} [params] Exchange specific parameters
     * @param {string} [params.type] The sub-account type to query the balance of, possible values include 'flex', 'cash'/'main'/'funding', or a market symbol * defaults to 'flex' *
     * @param {string} [params.symbol] A unified market symbol, when assigned the balance for a trading market that matches the symbol is returned
     * @returns A [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        let type = this.safeString2(params, 'type', 'account');
        let symbol = this.safeString(params, 'symbol');
        params = this.omit(params, ['type', 'account', 'symbol']);
        const response = await this.privateGetAccounts(params);
        //
        //    {
        //        "result": "success",
        //        "accounts": {
        //            "fi_xbtusd": {
        //                "auxiliary": { usd: "0", pv: '0.0', pnl: '0.0', af: '0.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { xbt: "0.0" },
        //                "currency": "xbt",
        //                "type": "marginAccount"
        //            },
        //            "cash": {
        //                "balances": {
        //                    "eur": "0.0",
        //                    "gbp": "0.0",
        //                    "bch": "0.0",
        //                    "xrp": "2.20188538338",
        //                    "usd": "0.0",
        //                    "eth": "0.0",
        //                    "usdt": "0.0",
        //                    "ltc": "0.0",
        //                    "usdc": "0.0",
        //                    "xbt": "0.0"
        //                },
        //                "type": "cashAccount"
        //            },
        //            "fv_xrpxbt": {
        //                "auxiliary": { usd: "0", pv: '0.0', pnl: '0.0', af: '0.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { xbt: "0.0" },
        //                "currency": "xbt",
        //                "type": "marginAccount"
        //            },
        //            "fi_xrpusd": {
        //                "auxiliary": { usd: "0", pv: '11.0', pnl: '0.0', af: '11.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { xrp: "11.0" },
        //                "currency": "xrp",
        //                "type": "marginAccount"
        //            },
        //            "fi_ethusd": {
        //                "auxiliary": { usd: "0", pv: '0.0', pnl: '0.0', af: '0.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { eth: "0.0" },
        //                "currency": "eth",
        //                "type": "marginAccount"
        //            },
        //            "fi_ltcusd": {
        //                "auxiliary": { usd: "0", pv: '0.0', pnl: '0.0', af: '0.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { ltc: "0.0" },
        //                "currency": "ltc",
        //                "type": "marginAccount"
        //            },
        //            "fi_bchusd": {
        //                "auxiliary": { usd: "0", pv: '0.0', pnl: '0.0', af: '0.0', funding: "0.0" },
        //                "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //                "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //                "balances": { bch: "0.0" },
        //                "currency": "bch",
        //                "type": "marginAccount"
        //            },
        //            "flex": {
        //                "currencies": {},
        //                "initialMargin": "0.0",
        //                "initialMarginWithOrders": "0.0",
        //                "maintenanceMargin": "0.0",
        //                "balanceValue": "0.0",
        //                "portfolioValue": "0.0",
        //                "collateralValue": "0.0",
        //                "pnl": "0.0",
        //                "unrealizedFunding": "0.0",
        //                "totalUnrealized": "0.0",
        //                "totalUnrealizedAsMargin": "0.0",
        //                "availableMargin": "0.0",
        //                "marginEquity": "0.0",
        //                "type": "multiCollateralMarginAccount"
        //            }
        //        },
        //        "serverTime": "2022-04-12T07:48:07.475Z"
        //    }
        //
        const datetime = this.safeString(response, 'serverTime');
        if (type === 'marginAccount' || type === 'margin') {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' fetchBalance requires symbol argument for margin accounts');
            }
            type = symbol;
        }
        if (type === undefined) {
            type = (symbol === undefined) ? 'flex' : symbol;
        }
        const accountName = this.parseAccount(type);
        const accounts = this.safeValue(response, 'accounts');
        const account = this.safeValue(accounts, accountName);
        if (account === undefined) {
            type = (type === undefined) ? '' : type;
            symbol = (symbol === undefined) ? '' : symbol;
            throw new errors.BadRequest(this.id + ' fetchBalance has no account for ' + type);
        }
        const balance = this.parseBalance(account);
        balance['info'] = response;
        balance['timestamp'] = this.parse8601(datetime);
        balance['datetime'] = datetime;
        return balance;
    }
    parseBalance(response) {
        //
        // cashAccount
        //
        //    {
        //        "balances": {
        //            "eur": "0.0",
        //            "gbp": "0.0",
        //            "bch": "0.0",
        //            "xrp": "2.20188538338",
        //            "usd": "0.0",
        //            "eth": "0.0",
        //            "usdt": "0.0",
        //            "ltc": "0.0",
        //            "usdc": "0.0",
        //            "xbt": "0.0"
        //        },
        //        "type": "cashAccount"
        //    }
        //
        // marginAccount e,g, fi_xrpusd
        //
        //    {
        //        "auxiliary": {
        //            "usd": "0",
        //            "pv": "11.0",
        //            "pnl": "0.0",
        //            "af": "11.0",
        //            "funding": "0.0"
        //        },
        //        "marginRequirements": { im: '0.0', mm: '0.0', lt: '0.0', tt: "0.0" },
        //        "triggerEstimates": { im: '0', mm: '0', lt: "0", tt: "0" },
        //        "balances": { xrp: "11.0" },
        //        "currency": "xrp",
        //        "type": "marginAccount"
        //    }
        //
        // flex/multiCollateralMarginAccount
        //
        //    {
        //       "currencies": {
        //            "USDT": {
        //                "quantity": "1",
        //                "value": "1.0001",
        //                "collateral": "0.9477197625",
        //                "available": "1.0"
        //             }
        //       },
        //       "initialMargin": "0.0",
        //       "initialMarginWithOrders": "0.0",
        //       "maintenanceMargin": "0.0",
        //       "balanceValue": "1.0",
        //       "portfolioValue": "1.0",
        //       "collateralValue": "0.95",
        //       "pnl": "0.0",
        //       "unrealizedFunding": "0.0",
        //       "totalUnrealized": "0.0",
        //       "totalUnrealizedAsMargin": "0.0",
        //       "availableMargin": "0.95",
        //       "marginEquity": "0.95",
        //       "type": "multiCollateralMarginAccount"
        //    }
        //
        const accountType = this.safeString2(response, 'accountType', 'type');
        const isFlex = (accountType === 'multiCollateralMarginAccount');
        const isCash = (accountType === 'cashAccount');
        const balances = this.safeValue2(response, 'balances', 'currencies', {});
        const result = {};
        const currencyIds = Object.keys(balances);
        for (let i = 0; i < currencyIds.length; i++) {
            const currencyId = currencyIds[i];
            const balance = balances[currencyId];
            const code = this.safeCurrencyCode(currencyId);
            const splitCode = code.split('_');
            const codeLength = splitCode.length;
            if (codeLength > 1) {
                continue; // Removes contract codes like PI_XRPUSD
            }
            const account = this.account();
            if (isFlex) {
                account['total'] = this.safeString(balance, 'quantity');
                account['free'] = this.safeString(balance, 'available');
            }
            else if (isCash) {
                account['used'] = '0.0';
                account['total'] = balance;
            }
            else {
                const auxiliary = this.safeValue(response, 'auxiliary');
                account['free'] = this.safeString(auxiliary, 'af');
                account['total'] = this.safeString(auxiliary, 'pv');
            }
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name krakenfutures#fetchFundingRates
     * @description fetch the current funding rates for multiple markets
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-market-data-get-tickers
     * @param {string[]} symbols unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Order[]} an array of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
     */
    async fetchFundingRates(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const marketIds = this.marketIds(symbols);
        const response = await this.publicGetTickers(params);
        const tickers = this.safeList(response, 'tickers', []);
        const fundingRates = [];
        for (let i = 0; i < tickers.length; i++) {
            const entry = tickers[i];
            const entry_symbol = this.safeValue(entry, 'symbol');
            if (marketIds !== undefined) {
                if (!this.inArray(entry_symbol, marketIds)) {
                    continue;
                }
            }
            const market = this.safeMarket(entry_symbol);
            const parsed = this.parseFundingRate(entry, market);
            fundingRates.push(parsed);
        }
        return this.indexBy(fundingRates, 'symbol');
    }
    parseFundingRate(ticker, market = undefined) {
        //
        // {"ask": 26.283,
        //  "askSize": 4.6,
        //  "bid": 26.201,
        //  "bidSize": 190,
        //  "fundingRate": -0.000944642727438883,
        //  "fundingRatePrediction": -0.000872671532340275,
        //  "indexPrice": 26.253,
        //  "last": 26.3,
        //  "lastSize": 0.1,
        //  "lastTime": "2023-06-11T18:55:28.958Z",
        //  "markPrice": 26.239,
        //  "open24h": 26.3,
        //  "openInterest": 641.1,
        //  "pair": "COMP:USD",
        //  "postOnly": False,
        //  "suspended": False,
        //  "symbol": "pf_compusd",
        //  "tag": "perpetual",
        //  "vol24h": 0.1,
        //  "volumeQuote": 2.63}
        //
        const fundingRateMultiplier = '8'; // https://support.kraken.com/hc/en-us/articles/9618146737172-Perpetual-Contracts-Funding-Rate-Method-Prior-to-September-29-2022
        const marketId = this.safeString(ticker, 'symbol');
        const symbol = this.symbol(marketId);
        const timestamp = this.parse8601(this.safeString(ticker, 'lastTime'));
        const indexPrice = this.safeNumber(ticker, 'indexPrice');
        const markPriceString = this.safeString(ticker, 'markPrice');
        const markPrice = this.parseNumber(markPriceString);
        const fundingRateString = this.safeString(ticker, 'fundingRate');
        const fundingRateResult = Precise["default"].stringDiv(Precise["default"].stringMul(fundingRateString, fundingRateMultiplier), markPriceString);
        const fundingRate = this.parseNumber(fundingRateResult);
        const nextFundingRateString = this.safeString(ticker, 'fundingRatePrediction');
        const nextFundingRateResult = Precise["default"].stringDiv(Precise["default"].stringMul(nextFundingRateString, fundingRateMultiplier), markPriceString);
        const nextFundingRate = this.parseNumber(nextFundingRateResult);
        return {
            'info': ticker,
            'symbol': symbol,
            'markPrice': markPrice,
            'indexPrice': indexPrice,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'fundingRate': fundingRate,
            'fundingTimestamp': undefined,
            'fundingDatetime': undefined,
            'nextFundingRate': nextFundingRate,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'interval': undefined,
        };
    }
    /**
     * @method
     * @name krakenfutures#fetchFundingRateHistory
     * @description fetches historical funding rate prices
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-historical-funding-rates-historical-funding-rates
     * @param {string} symbol unified symbol of the market to fetch the funding rate history for
     * @param {int} [since] timestamp in ms of the earliest funding rate to fetch
     * @param {int} [limit] the maximum amount of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure} to fetch
     * @param {object} [params] extra parameters specific to the api endpoint
     * @returns {object[]} a list of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure}
     */
    async fetchFundingRateHistory(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchFundingRateHistory() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['swap']) {
            throw new errors.BadRequest(this.id + ' fetchFundingRateHistory() supports swap contracts only');
        }
        const request = {
            'symbol': market['id'].toUpperCase(),
        };
        const response = await this.publicGetHistoricalfundingrates(this.extend(request, params));
        //
        //    {
        //        "rates": [
        //          {
        //            "timestamp": '2018-08-31T16:00:00.000Z',
        //            "fundingRate": '2.18900669884E-7',
        //            "relativeFundingRate": '0.000060779960000000'
        //          },
        //          ...
        //        ]
        //    }
        //
        const rates = this.safeValue(response, 'rates');
        const result = [];
        for (let i = 0; i < rates.length; i++) {
            const item = rates[i];
            const datetime = this.safeString(item, 'timestamp');
            result.push({
                'info': item,
                'symbol': symbol,
                'fundingRate': this.safeNumber(item, 'relativeFundingRate'),
                'timestamp': this.parse8601(datetime),
                'datetime': datetime,
            });
        }
        const sorted = this.sortBy(result, 'timestamp');
        return this.filterBySymbolSinceLimit(sorted, symbol, since, limit);
    }
    /**
     * @method
     * @name krakenfutures#fetchPositions
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-account-information-get-open-positions
     * @description Fetches current contract trading positions
     * @param {string[]} symbols List of unified symbols
     * @param {object} [params] Not used by krakenfutures
     * @returns Parsed exchange response for positions
     */
    async fetchPositions(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        const response = await this.privateGetOpenpositions(request);
        //
        //    {
        //        "result": "success",
        //        "openPositions": [
        //            {
        //                "side": "long",
        //                "symbol": "pi_xrpusd",
        //                "price": "0.7533",
        //                "fillTime": "2022-03-03T22:51:16.566Z",
        //                "size": "230",
        //                "unrealizedFunding": "-0.001878596918214635"
        //            }
        //        ],
        //        "serverTime": "2022-03-03T22:51:16.566Z"
        //    }
        //
        const result = this.parsePositions(response);
        return this.filterByArrayPositions(result, 'symbol', symbols, false);
    }
    parsePositions(response, symbols = undefined, params = {}) {
        const result = [];
        const positions = this.safeValue(response, 'openPositions');
        for (let i = 0; i < positions.length; i++) {
            const position = this.parsePosition(positions[i]);
            result.push(position);
        }
        return result;
    }
    parsePosition(position, market = undefined) {
        // cross
        //    {
        //        "side": "long",
        //        "symbol": "pi_xrpusd",
        //        "price": "0.7533",
        //        "fillTime": "2022-03-03T22:51:16.566Z",
        //        "size": "230",
        //        "unrealizedFunding": "-0.001878596918214635"
        //    }
        //
        // isolated
        //    {
        //        "side":"long",
        //        "symbol":"pf_ftmusd",
        //        "price":"0.4921",
        //        "fillTime":"2023-02-22T11:37:16.685Z",
        //        "size":"1",
        //        "unrealizedFunding":"-8.155240068885155E-8",
        //        "pnlCurrency":"USD",
        //        "maxFixedLeverage":"1.0"
        //    }
        //
        const leverage = this.safeNumber(position, 'maxFixedLeverage');
        let marginType = 'cross';
        if (leverage !== undefined) {
            marginType = 'isolated';
        }
        const datetime = this.safeString(position, 'fillTime');
        const marketId = this.safeString(position, 'symbol');
        market = this.safeMarket(marketId, market);
        return {
            'info': position,
            'symbol': market['symbol'],
            'timestamp': this.parse8601(datetime),
            'datetime': datetime,
            'initialMargin': undefined,
            'initialMarginPercentage': undefined,
            'maintenanceMargin': undefined,
            'maintenanceMarginPercentage': undefined,
            'entryPrice': this.safeNumber(position, 'price'),
            'notional': undefined,
            'leverage': leverage,
            'unrealizedPnl': undefined,
            'contracts': this.safeNumber(position, 'size'),
            'contractSize': this.safeNumber(market, 'contractSize'),
            'marginRatio': undefined,
            'liquidationPrice': undefined,
            'markPrice': undefined,
            'collateral': undefined,
            'marginType': marginType,
            'side': this.safeString(position, 'side'),
            'percentage': undefined,
        };
    }
    /**
     * @method
     * @name krakenfutures#fetchLeverageTiers
     * @description retrieve information on the maximum leverage, and maintenance margin for trades of varying trade sizes
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-instrument-details-get-instruments
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [leverage tiers structures]{@link https://docs.ccxt.com/#/?id=leverage-tiers-structure}, indexed by market symbols
     */
    async fetchLeverageTiers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetInstruments(params);
        //
        //    {
        //        "result": "success",
        //        "instruments": [
        //            {
        //                "symbol": "fi_ethusd_180928",
        //                "type": "futures_inverse",  // futures_vanilla  // spot index
        //                "underlying": "rr_ethusd",
        //                "lastTradingTime": "2018-09-28T15:00:00.000Z",
        //                "tickSize": 0.1,
        //                "contractSize": 1,
        //                "tradeable": true,
        //                "marginLevels": [
        //                    {
        //                        "contracts":0,
        //                        "initialMargin":0.02,
        //                        "maintenanceMargin":0.01
        //                    },
        //                    {
        //                        "contracts":250000,
        //                        "initialMargin":0.04,
        //                        "maintenanceMargin":0.02
        //                    },
        //                    ...
        //                ],
        //                "isin": "GB00JVMLMP88",
        //                "retailMarginLevels": [
        //                    {
        //                        "contracts": 0,
        //                        "initialMargin": 0.5,
        //                        "maintenanceMargin": 0.25
        //                    }
        //                ],
        //                "tags": [],
        //            },
        //            {
        //                "symbol": "in_xbtusd",
        //                "type": "spot index",
        //                "tradeable":false
        //            }
        //        ]
        //        "serverTime": "2018-07-19T11:32:39.433Z"
        //    }
        //
        const data = this.safeList(response, 'instruments');
        return this.parseLeverageTiers(data, symbols, 'symbol');
    }
    parseMarketLeverageTiers(info, market = undefined) {
        /**
         * @method
         * @ignore
         * @param info Exchange market response for 1 market
         * @param market CCXT market
         */
        //
        //    {
        //        "symbol": "fi_ethusd_180928",
        //        "type": "futures_inverse",  // futures_vanilla  // spot index
        //        "underlying": "rr_ethusd",
        //        "lastTradingTime": "2018-09-28T15:00:00.000Z",
        //        "tickSize": 0.1,
        //        "contractSize": 1,
        //        "tradeable": true,
        //        "marginLevels": [
        //            {
        //                "contracts":0,
        //                "initialMargin":0.02,
        //                "maintenanceMargin":0.01
        //            },
        //            {
        //                "contracts":250000,
        //                "initialMargin":0.04,
        //                "maintenanceMargin":0.02
        //            },
        //            ...
        //        ],
        //        "isin": "GB00JVMLMP88",
        //        "retailMarginLevels": [
        //            {
        //                "contracts": 0,
        //                "initialMargin": 0.5,
        //                "maintenanceMargin": 0.25
        //            }
        //        ],
        //        "tags": [],
        //    }
        //
        const marginLevels = this.safeValue(info, 'marginLevels');
        const marketId = this.safeString(info, 'symbol');
        market = this.safeMarket(marketId, market);
        const tiers = [];
        if (marginLevels === undefined) {
            return tiers;
        }
        for (let i = 0; i < marginLevels.length; i++) {
            const tier = marginLevels[i];
            const initialMargin = this.safeString(tier, 'initialMargin');
            const minNotional = this.safeNumber(tier, 'numNonContractUnits');
            if (i !== 0) {
                const tiersLength = tiers.length;
                const previousTier = tiers[tiersLength - 1];
                previousTier['maxNotional'] = minNotional;
            }
            tiers.push({
                'tier': this.sum(i, 1),
                'symbol': this.safeSymbol(marketId, market),
                'currency': market['quote'],
                'minNotional': minNotional,
                'maxNotional': undefined,
                'maintenanceMarginRate': this.safeNumber(tier, 'maintenanceMargin'),
                'maxLeverage': this.parseNumber(Precise["default"].stringDiv('1', initialMargin)),
                'info': tier,
            });
        }
        return tiers;
    }
    parseTransfer(transfer, currency = undefined) {
        //
        // transfer
        //
        //    {
        //        "result": "success",
        //        "serverTime": "2022-04-12T01:22:53.420Z"
        //    }
        //
        const datetime = this.safeString(transfer, 'serverTime');
        return {
            'info': transfer,
            'id': undefined,
            'timestamp': this.parse8601(datetime),
            'datetime': datetime,
            'currency': this.safeString(currency, 'code'),
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': this.safeString(transfer, 'result'),
        };
    }
    parseAccount(account) {
        const accountByType = {
            'main': 'cash',
            'funding': 'cash',
            'future': 'cash',
            'futures': 'cash',
            'cashAccount': 'cash',
            'multiCollateralMarginAccount': 'flex',
            'multiCollateral': 'flex',
            'multiCollateralMargin': 'flex',
        };
        if (account in accountByType) {
            return accountByType[account];
        }
        else if (account in this.markets) {
            const market = this.market(account);
            const marketId = market['id'];
            const splitId = marketId.split('_');
            if (market['inverse']) {
                return 'fi_' + this.safeString(splitId, 1);
            }
            else {
                return 'fv_' + this.safeString(splitId, 1);
            }
        }
        else {
            return account;
        }
    }
    /**
     * @method
     * @name krakenfutures#transferOut
     * @description transfer from futures wallet to spot wallet
     * @param {str} code Unified currency code
     * @param {float} amount Size of the transfer
     * @param {dict} [params] Exchange specific parameters
     * @returns a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transferOut(code, amount, params = {}) {
        return await this.transfer(code, amount, 'future', 'spot', params);
    }
    /**
     * @method
     * @name krakenfutures#transfer
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-transfers-initiate-wallet-transfer
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-transfers-initiate-withdrawal-to-spot-wallet
     * @description transfers currencies between sub-accounts
     * @param {string} code Unified currency code
     * @param {float} amount Size of the transfer
     * @param {string} fromAccount 'main'/'funding'/'future', 'flex', or a unified market symbol
     * @param {string} toAccount 'main'/'funding', 'flex', 'spot' or a unified market symbol
     * @param {object} [params] Exchange specific parameters
     * @returns a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        if (fromAccount === 'spot') {
            throw new errors.BadRequest(this.id + ' transfer does not yet support transfers from spot');
        }
        const request = {
            'amount': amount,
        };
        let response = undefined;
        if (toAccount === 'spot') {
            if (this.parseAccount(fromAccount) !== 'cash') {
                throw new errors.BadRequest(this.id + ' transfer cannot transfer from ' + fromAccount + ' to ' + toAccount);
            }
            request['currency'] = currency['id'];
            response = await this.privatePostWithdrawal(this.extend(request, params));
        }
        else {
            request['fromAccount'] = this.parseAccount(fromAccount);
            request['toAccount'] = this.parseAccount(toAccount);
            request['unit'] = currency['id'];
            response = await this.privatePostTransfer(this.extend(request, params));
        }
        //
        //    {
        //        "result": "success",
        //        "serverTime": "2022-04-12T01:22:53.420Z"
        //    }
        //
        const transfer = this.parseTransfer(response, currency);
        return this.extend(transfer, {
            'amount': amount,
            'fromAccount': fromAccount,
            'toAccount': toAccount,
        });
    }
    /**
     * @method
     * @name krakenfutures#setLeverage
     * @description set the level of leverage for a market
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-multi-collateral-set-the-leverage-setting-for-a-market
     * @param {float} leverage the rate of leverage
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} response from the exchange
     */
    async setLeverage(leverage, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage() requires a symbol argument');
        }
        await this.loadMarkets();
        const request = {
            'maxLeverage': leverage,
            'symbol': this.marketId(symbol).toUpperCase(),
        };
        //
        // { result: "success", serverTime: "2023-08-01T09:40:32.345Z" }
        //
        return await this.privatePutLeveragepreferences(this.extend(request, params));
    }
    /**
     * @method
     * @name krakenfutures#fetchLeverages
     * @description fetch the set leverage for all contract and margin markets
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-multi-collateral-get-the-leverage-setting-for-a-market
     * @param {string[]} [symbols] a list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [leverage structures]{@link https://docs.ccxt.com/#/?id=leverage-structure}
     */
    async fetchLeverages(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.privateGetLeveragepreferences(params);
        //
        //     {
        //         "result": "success",
        //         "serverTime": "2024-03-06T02:35:46.336Z",
        //         "leveragePreferences": [
        //             {
        //                 "symbol": "PF_ETHUSD",
        //                 "maxLeverage": 30.00
        //             },
        //         ]
        //     }
        //
        const leveragePreferences = this.safeList(response, 'leveragePreferences', []);
        return this.parseLeverages(leveragePreferences, symbols, 'symbol');
    }
    /**
     * @method
     * @name krakenfutures#fetchLeverage
     * @description fetch the set leverage for a market
     * @see https://docs.futures.kraken.com/#http-api-trading-v3-api-multi-collateral-get-the-leverage-setting-for-a-market
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [leverage structure]{@link https://docs.ccxt.com/#/?id=leverage-structure}
     */
    async fetchLeverage(symbol, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchLeverage() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': this.marketId(symbol).toUpperCase(),
        };
        const response = await this.privateGetLeveragepreferences(this.extend(request, params));
        //
        //     {
        //         "result": "success",
        //         "serverTime": "2023-08-01T09:54:08.900Z",
        //         "leveragePreferences": [ { symbol: "PF_LTCUSD", maxLeverage: "5.00" } ]
        //     }
        //
        const leveragePreferences = this.safeList(response, 'leveragePreferences', []);
        const data = this.safeDict(leveragePreferences, 0, {});
        return this.parseLeverage(data, market);
    }
    parseLeverage(leverage, market = undefined) {
        const marketId = this.safeString(leverage, 'symbol');
        const leverageValue = this.safeInteger(leverage, 'maxLeverage');
        return {
            'info': leverage,
            'symbol': this.safeSymbol(marketId, market),
            'marginMode': undefined,
            'longLeverage': leverageValue,
            'shortLeverage': leverageValue,
        };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined;
        }
        if (code === 429) {
            throw new errors.DDoSProtection(this.id + ' ' + body);
        }
        const errors$1 = this.safeValue(response, 'errors');
        const firstError = this.safeValue(errors$1, 0);
        const firtErrorMessage = this.safeString(firstError, 'message');
        const message = this.safeString(response, 'error', firtErrorMessage);
        if (message === undefined) {
            return undefined;
        }
        const feedback = this.id + ' ' + body;
        this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
        this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
        if (code === 400) {
            throw new errors.BadRequest(feedback);
        }
        throw new errors.ExchangeError(feedback); // unknown message
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const apiVersions = this.safeValue(this.options['versions'], api, {});
        const methodVersions = this.safeValue(apiVersions, method, {});
        const defaultVersion = this.safeString(methodVersions, path, this.version);
        const version = this.safeString(params, 'version', defaultVersion);
        params = this.omit(params, 'version');
        const apiAccess = this.safeValue(this.options['access'], api, {});
        const methodAccess = this.safeValue(apiAccess, method, {});
        const access = this.safeString(methodAccess, path, 'public');
        const endpoint = version + '/' + this.implodeParams(path, params);
        params = this.omit(params, this.extractParams(path));
        let query = endpoint;
        let postData = '';
        if (path === 'batchorder') {
            postData = 'json=' + this.json(params);
            body = postData;
        }
        else if (Object.keys(params).length) {
            postData = this.urlencode(params);
            query += '?' + postData;
        }
        const url = this.urls['api'][api] + query;
        if (api === 'private' || access === 'private') {
            this.checkRequiredCredentials();
            let auth = postData + '/api/';
            if (api !== 'private') {
                auth += api + '/';
            }
            auth += endpoint; // 1
            const hash = this.hash(this.encode(auth), sha256.sha256, 'binary'); // 2
            const secret = this.base64ToBinary(this.secret); // 3
            const signature = this.hmac(hash, secret, sha512.sha512, 'base64'); // 4-5
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'APIKey': this.apiKey,
                'Authent': signature,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}

module.exports = krakenfutures;
