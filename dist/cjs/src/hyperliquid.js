'use strict';

var hyperliquid$1 = require('./abstract/hyperliquid.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha3 = require('./static_dependencies/noble-hashes/sha3.js');
var secp256k1 = require('./static_dependencies/noble-curves/secp256k1.js');
var crypto = require('./base/functions/crypto.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class hyperliquid
 * @augments Exchange
 */
class hyperliquid extends hyperliquid$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'hyperliquid',
            'name': 'Hyperliquid',
            'countries': [],
            'version': 'v1',
            'rateLimit': 50,
            'certified': true,
            'pro': true,
            'dex': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': true,
                'future': true,
                'option': false,
                'addMargin': true,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'cancelAllOrders': false,
                'cancelAllOrdersAfter': true,
                'cancelOrder': true,
                'cancelOrders': true,
                'cancelOrdersForSymbols': true,
                'closeAllPositions': false,
                'closePosition': false,
                'createMarketBuyOrderWithCost': false,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrders': true,
                'createOrderWithTakeProfitAndStopLoss': true,
                'createReduceOnlyOrder': true,
                'createStopOrder': true,
                'createTriggerOrder': true,
                'editOrder': true,
                'editOrders': true,
                'fetchAccounts': false,
                'fetchBalance': true,
                'fetchBorrowInterest': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledAndClosedOrders': true,
                'fetchCanceledOrders': true,
                'fetchClosedOrders': true,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDeposits': true,
                'fetchDepositWithdrawFee': 'emulated',
                'fetchDepositWithdrawFees': false,
                'fetchFundingHistory': true,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': true,
                'fetchFundingRates': true,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchLedger': true,
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
                'fetchOpenInterests': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchOrderTrades': false,
                'fetchPosition': true,
                'fetchPositionMode': false,
                'fetchPositions': true,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': 'emulated',
                'fetchTickers': true,
                'fetchTime': false,
                'fetchTrades': true,
                'fetchTradingFee': true,
                'fetchTradingFees': false,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': true,
                'reduceMargin': true,
                'repayCrossMargin': false,
                'repayIsolatedMargin': false,
                'sandbox': true,
                'setLeverage': true,
                'setMarginMode': true,
                'setPositionMode': false,
                'transfer': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '3m': '3m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '2h': '2h',
                '4h': '4h',
                '8h': '8h',
                '12h': '12h',
                '1d': '1d',
                '3d': '3d',
                '1w': '1w',
                '1M': '1M',
            },
            'hostname': 'hyperliquid.xyz',
            'urls': {
                'logo': 'https://github.com/ccxt/ccxt/assets/43336371/b371bc6c-4a8c-489f-87f4-20a913dd8d4b',
                'api': {
                    'public': 'https://api.{hostname}',
                    'private': 'https://api.{hostname}',
                },
                'test': {
                    'public': 'https://api.hyperliquid-testnet.xyz',
                    'private': 'https://api.hyperliquid-testnet.xyz',
                },
                'www': 'https://hyperliquid.xyz',
                'doc': 'https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api',
                'fees': 'https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees',
                'referral': 'https://app.hyperliquid.xyz/',
            },
            'api': {
                'public': {
                    'post': {
                        'info': {
                            'cost': 20,
                            'byType': {
                                'l2Book': 2,
                                'allMids': 2,
                                'clearinghouseState': 2,
                                'orderStatus': 2,
                                'spotClearinghouseState': 2,
                                'exchangeStatus': 2,
                                'candleSnapshot': 4,
                            },
                        },
                    },
                },
                'private': {
                    'post': {
                        'exchange': 1,
                    },
                },
            },
            'fees': {
                'swap': {
                    'taker': this.parseNumber('0.00045'),
                    'maker': this.parseNumber('0.00015'),
                },
                'spot': {
                    'taker': this.parseNumber('0.0007'),
                    'maker': this.parseNumber('0.0004'),
                },
            },
            'requiredCredentials': {
                'apiKey': false,
                'secret': false,
                'walletAddress': true,
                'privateKey': true,
            },
            'exceptions': {
                'exact': {},
                'broad': {
                    'Price must be divisible by tick size.': errors.InvalidOrder,
                    'Order must have minimum value of $10': errors.InvalidOrder,
                    'Insufficient margin to place order.': errors.InsufficientFunds,
                    'Reduce only order would increase position.': errors.InvalidOrder,
                    'Post only order would have immediately matched,': errors.InvalidOrder,
                    'Order could not immediately match against any resting orders.': errors.InvalidOrder,
                    'Invalid TP/SL price.': errors.InvalidOrder,
                    'No liquidity available for market order.': errors.InvalidOrder,
                    'Order was never placed, already canceled, or filled.': errors.OrderNotFound,
                    'User or API Wallet ': errors.InvalidOrder,
                    'Order has invalid size': errors.InvalidOrder,
                    'Order price cannot be more than 80% away from the reference price': errors.InvalidOrder,
                    'Order has zero size.': errors.InvalidOrder,
                    'Insufficient spot balance asset': errors.InsufficientFunds,
                    'Insufficient balance for withdrawal': errors.InsufficientFunds,
                    'Insufficient balance for token transfer': errors.InsufficientFunds,
                },
            },
            'precisionMode': number.TICK_SIZE,
            'commonCurrencies': {},
            'options': {
                'defaultType': 'swap',
                'sandboxMode': false,
                'defaultSlippage': 0.05,
                'zeroAddress': '0x0000000000000000000000000000000000000000',
            },
            'features': {
                'default': {
                    'sandbox': true,
                    'createOrder': {
                        'marginMode': false,
                        'triggerPrice': false,
                        'triggerPriceType': undefined,
                        'triggerDirection': false,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': {
                            'triggerPriceType': {
                                'last': false,
                                'mark': false,
                                'index': false,
                            },
                            'triggerPrice': true,
                            'type': true,
                            'price': true,
                        },
                        'timeInForce': {
                            'IOC': true,
                            'FOK': false,
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
                        'max': 1000,
                    },
                    'fetchMyTrades': {
                        'marginMode': false,
                        'limit': 2000,
                        'daysBack': undefined,
                        'untilDays': undefined,
                        'symbolRequired': true,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': 2000,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOrders': {
                        'marginMode': false,
                        'limit': 2000,
                        'daysBack': undefined,
                        'untilDays': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': 2000,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOHLCV': {
                        'limit': 5000,
                    },
                },
                'spot': {
                    'extends': 'default',
                },
                'forPerps': {
                    'extends': 'default',
                    'createOrder': {
                        'stopLossPrice': true,
                        'takeProfitPrice': true,
                        'attachedStopLossTakeProfit': undefined, // todo, in two orders
                    },
                },
                'swap': {
                    'linear': {
                        'extends': 'forPerps',
                    },
                    'inverse': {
                        'extends': 'forPerps',
                    },
                },
                'future': {
                    'linear': {
                        'extends': 'forPerps',
                    },
                    'inverse': {
                        'extends': 'forPerps',
                    },
                },
            },
        });
    }
    setSandboxMode(enabled) {
        super.setSandboxMode(enabled);
        this.options['sandboxMode'] = enabled;
    }
    /**
     * @method
     * @name hyperliquid#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-metadata
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        if (this.checkRequiredCredentials(false)) {
            await this.handleBuilderFeeApproval();
        }
        const request = {
            'type': 'meta',
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "universe": [
        //                 {
        //                     "maxLeverage": 50,
        //                     "name": "SOL",
        //                     "onlyIsolated": false,
        //                     "szDecimals": 2
        //                 }
        //             ]
        //         }
        //     ]
        //
        const meta = this.safeList(response, 'universe', []);
        const result = {};
        for (let i = 0; i < meta.length; i++) {
            const data = this.safeDict(meta, i, {});
            const id = i;
            const name = this.safeString(data, 'name');
            const code = this.safeCurrencyCode(name);
            result[code] = this.safeCurrencyStructure({
                'id': id,
                'name': name,
                'code': code,
                'precision': undefined,
                'info': data,
                'active': undefined,
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
     * @name hyperliquid#fetchMarkets
     * @description retrieves data on all markets for hyperliquid
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-spot-asset-contexts
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const rawPromises = [
            this.fetchSwapMarkets(params),
            this.fetchSpotMarkets(params),
        ];
        const promises = await Promise.all(rawPromises);
        const swapMarkets = promises[0];
        const spotMarkets = promises[1];
        return this.arrayConcat(swapMarkets, spotMarkets);
    }
    /**
     * @method
     * @name hyperliquid#fetchSwapMarkets
     * @description retrieves data on all swap markets for hyperliquid
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchSwapMarkets(params = {}) {
        const request = {
            'type': 'metaAndAssetCtxs',
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "universe": [
        //                 {
        //                     "maxLeverage": 50,
        //                     "name": "SOL",
        //                     "onlyIsolated": false,
        //                     "szDecimals": 2
        //                 }
        //             ]
        //         },
        //         [
        //             {
        //                 "dayNtlVlm": "9450588.2273",
        //                 "funding": "0.0000198",
        //                 "impactPxs": [
        //                     "108.04",
        //                     "108.06"
        //                 ],
        //                 "markPx": "108.04",
        //                 "midPx": "108.05",
        //                 "openInterest": "10764.48",
        //                 "oraclePx": "107.99",
        //                 "premium": "0.00055561",
        //                 "prevDayPx": "111.81"
        //             }
        //         ]
        //     ]
        //
        //
        const meta = this.safeDict(response, 0, {});
        const universe = this.safeList(meta, 'universe', []);
        const assetCtxs = this.safeList(response, 1, []);
        const result = [];
        for (let i = 0; i < universe.length; i++) {
            const data = this.extend(this.safeDict(universe, i, {}), this.safeDict(assetCtxs, i, {}));
            data['baseId'] = i;
            result.push(data);
        }
        return this.parseMarkets(result);
    }
    /**
     * @method
     * @name hyperliquid#calculatePricePrecision
     * @description Helper function to calculate the Hyperliquid DECIMAL_PLACES price precision
     * @param {float} price the price to use in the calculation
     * @param {int} amountPrecision the amountPrecision to use in the calculation
     * @param {int} maxDecimals the maxDecimals to use in the calculation
     * @returns {int} The calculated price precision
     */
    calculatePricePrecision(price, amountPrecision, maxDecimals) {
        let pricePrecision = 0;
        const priceStr = this.numberToString(price);
        if (priceStr === undefined) {
            return 0;
        }
        const priceSplitted = priceStr.split('.');
        if (Precise["default"].stringEq(priceStr, '0')) {
            // Significant digits is always 5 in this case
            const significantDigits = 5;
            // Integer digits is always 0 in this case (0 doesn't count)
            const integerDigits = 0;
            // Calculate the price precision
            pricePrecision = Math.min(maxDecimals - amountPrecision, significantDigits - integerDigits);
        }
        else if (Precise["default"].stringGt(priceStr, '0') && Precise["default"].stringLt(priceStr, '1')) {
            // Significant digits, always 5 in this case
            const significantDigits = 5;
            // Get the part after the decimal separator
            const decimalPart = this.safeString(priceSplitted, 1, '');
            // Count the number of leading zeros in the decimal part
            let leadingZeros = 0;
            while ((leadingZeros <= decimalPart.length) && (decimalPart[leadingZeros] === '0')) {
                leadingZeros = leadingZeros + 1;
            }
            // Calculate price precision based on leading zeros and significant digits
            pricePrecision = leadingZeros + significantDigits;
            // Calculate the price precision based on maxDecimals - szDecimals and the calculated price precision from the previous step
            pricePrecision = Math.min(maxDecimals - amountPrecision, pricePrecision);
        }
        else {
            // Count the numbers before the decimal separator
            const integerPart = this.safeString(priceSplitted, 0, '');
            // Get significant digits, take the max() of 5 and the integer digits count
            const significantDigits = Math.max(5, integerPart.length);
            // Calculate price precision based on maxDecimals - szDecimals and significantDigits - integerPart.length
            pricePrecision = Math.min(maxDecimals - amountPrecision, significantDigits - integerPart.length);
        }
        return this.parseToInt(pricePrecision);
    }
    /**
     * @method
     * @name hyperliquid#fetchSpotMarkets
     * @description retrieves data on all spot markets for hyperliquid
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-spot-asset-contexts
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchSpotMarkets(params = {}) {
        const request = {
            'type': 'spotMetaAndAssetCtxs',
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        // [
        //     {
        //         "tokens": [
        //             {
        //                 "name": "USDC",
        //                 "szDecimals": 8,
        //                 "weiDecimals" 8,
        //                 "index": 0,
        //                 "tokenId": "0x6d1e7cde53ba9467b783cb7c530ce054",
        //                 "isCanonical": true,
        //                 "evmContract":null,
        //                 "fullName":null
        //             },
        //             {
        //                 "name": "PURR",
        //                 "szDecimals": 0,
        //                 "weiDecimals": 5,
        //                 "index": 1,
        //                 "tokenId": "0xc1fb593aeffbeb02f85e0308e9956a90",
        //                 "isCanonical": true,
        //                 "evmContract":null,
        //                 "fullName":null
        //             }
        //         ],
        //         "universe": [
        //             {
        //                 "name": "PURR/USDC",
        //                 "tokens": [1, 0],
        //                 "index": 0,
        //                 "isCanonical": true
        //             }
        //         ]
        //     },
        //     [
        //         {
        //             "dayNtlVlm":"8906.0",
        //             "markPx":"0.14",
        //             "midPx":"0.209265",
        //             "prevDayPx":"0.20432"
        //         }
        //     ]
        // ]
        //
        const first = this.safeDict(response, 0, {});
        const second = this.safeList(response, 1, []);
        const meta = this.safeList(first, 'universe', []);
        const tokens = this.safeList(first, 'tokens', []);
        const markets = [];
        for (let i = 0; i < meta.length; i++) {
            const market = this.safeDict(meta, i, {});
            const index = this.safeInteger(market, 'index');
            const extraData = this.safeDict(second, index, {});
            const marketName = this.safeString(market, 'name');
            // if (marketName.indexOf ('/') < 0) {
            //     // there are some weird spot markets in testnet, eg @2
            //     continue;
            // }
            // const marketParts = marketName.split ('/');
            // const baseName = this.safeString (marketParts, 0);
            // const quoteId = this.safeString (marketParts, 1);
            const fees = this.safeDict(this.fees, 'spot', {});
            const taker = this.safeNumber(fees, 'taker');
            const maker = this.safeNumber(fees, 'maker');
            const tokensPos = this.safeList(market, 'tokens', []);
            const baseTokenPos = this.safeInteger(tokensPos, 0);
            const quoteTokenPos = this.safeInteger(tokensPos, 1);
            const baseTokenInfo = this.safeDict(tokens, baseTokenPos, {});
            const quoteTokenInfo = this.safeDict(tokens, quoteTokenPos, {});
            const baseName = this.safeString(baseTokenInfo, 'name');
            const quoteId = this.safeString(quoteTokenInfo, 'name');
            const base = this.safeCurrencyCode(baseName);
            const quote = this.safeCurrencyCode(quoteId);
            const symbol = base + '/' + quote;
            const innerBaseTokenInfo = this.safeDict(baseTokenInfo, 'spec', baseTokenInfo);
            // const innerQuoteTokenInfo = this.safeDict (quoteTokenInfo, 'spec', quoteTokenInfo);
            const amountPrecisionStr = this.safeString(innerBaseTokenInfo, 'szDecimals');
            const amountPrecision = parseInt(amountPrecisionStr);
            const price = this.safeNumber(extraData, 'midPx');
            let pricePrecision = 0;
            if (price !== undefined) {
                pricePrecision = this.calculatePricePrecision(price, amountPrecision, 8);
            }
            const pricePrecisionStr = this.numberToString(pricePrecision);
            // const quotePrecision = this.parseNumber (this.parsePrecision (this.safeString (innerQuoteTokenInfo, 'szDecimals')));
            const baseId = this.numberToString(index + 10000);
            markets.push(this.safeMarketStructure({
                'id': marketName,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'baseName': baseName,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'subType': undefined,
                'margin': undefined,
                'swap': false,
                'future': false,
                'option': false,
                'active': true,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'taker': taker,
                'maker': maker,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.parseNumber(this.parsePrecision(amountPrecisionStr)),
                    'price': this.parseNumber(this.parsePrecision(pricePrecisionStr)),
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
                        'min': this.parseNumber('10'),
                        'max': undefined,
                    },
                },
                'created': undefined,
                'info': this.extend(extraData, market),
            }));
        }
        return markets;
    }
    parseMarket(market) {
        //
        //     {
        //         "maxLeverage": "50",
        //         "name": "ETH",
        //         "onlyIsolated": false,
        //         "szDecimals": "4",
        //         "dayNtlVlm": "1709813.11535",
        //         "funding": "0.00004807",
        //         "impactPxs": [
        //             "2369.3",
        //             "2369.6"
        //         ],
        //         "markPx": "2369.6",
        //         "midPx": "2369.45",
        //         "openInterest": "1815.4712",
        //         "oraclePx": "2367.3",
        //         "premium": "0.00090821",
        //         "prevDayPx": "2381.5"
        //     }
        //
        const quoteId = 'USDC';
        const baseName = this.safeString(market, 'name');
        const base = this.safeCurrencyCode(baseName);
        const quote = this.safeCurrencyCode(quoteId);
        const baseId = this.safeString(market, 'baseId');
        const settleId = 'USDC';
        const settle = this.safeCurrencyCode(settleId);
        let symbol = base + '/' + quote;
        const contract = true;
        const swap = true;
        {
            {
                symbol = symbol + ':' + settle;
            }
        }
        const fees = this.safeDict(this.fees, 'swap', {});
        const taker = this.safeNumber(fees, 'taker');
        const maker = this.safeNumber(fees, 'maker');
        const amountPrecisionStr = this.safeString(market, 'szDecimals');
        const amountPrecision = parseInt(amountPrecisionStr);
        const price = this.safeNumber(market, 'markPx', 0);
        let pricePrecision = 0;
        if (price !== undefined) {
            pricePrecision = this.calculatePricePrecision(price, amountPrecision, 6);
        }
        const pricePrecisionStr = this.numberToString(pricePrecision);
        const isDelisted = this.safeBool(market, 'isDelisted');
        let active = true;
        if (isDelisted !== undefined) {
            active = !isDelisted;
        }
        return this.safeMarketStructure({
            'id': baseId,
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'settle': settle,
            'baseId': baseId,
            'baseName': baseName,
            'quoteId': quoteId,
            'settleId': settleId,
            'type': 'swap',
            'spot': false,
            'margin': undefined,
            'swap': swap,
            'future': false,
            'option': false,
            'active': active,
            'contract': contract,
            'linear': true,
            'inverse': false,
            'taker': taker,
            'maker': maker,
            'contractSize': this.parseNumber('1'),
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': this.parseNumber(this.parsePrecision(amountPrecisionStr)),
                'price': this.parseNumber(this.parsePrecision(pricePrecisionStr)),
            },
            'limits': {
                'leverage': {
                    'min': undefined,
                    'max': this.safeInteger(market, 'maxLeverage'),
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
                    'min': this.parseNumber('10'),
                    'max': undefined,
                },
            },
            'created': undefined,
            'info': market,
        });
    }
    /**
     * @method
     * @name hyperliquid#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-a-users-token-balances
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-users-perpetuals-account-summary
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.type] wallet type, ['spot', 'swap'], defaults to swap
     * @param {string} [params.marginMode] 'cross' or 'isolated', for margin trading, uses this.options.defaultMarginMode if not passed, defaults to undefined/None/null
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchBalance', params);
        let type = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchBalance', undefined, params);
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchBalance', params);
        const isSpot = (type === 'spot');
        const request = {
            'type': (isSpot) ? 'spotClearinghouseState' : 'clearinghouseState',
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     {
        //         "assetPositions": [],
        //         "crossMaintenanceMarginUsed": "0.0",
        //         "crossMarginSummary": {
        //             "accountValue": "100.0",
        //             "totalMarginUsed": "0.0",
        //             "totalNtlPos": "0.0",
        //             "totalRawUsd": "100.0"
        //         },
        //         "marginSummary": {
        //             "accountValue": "100.0",
        //             "totalMarginUsed": "0.0",
        //             "totalNtlPos": "0.0",
        //             "totalRawUsd": "100.0"
        //         },
        //         "time": "1704261007014",
        //         "withdrawable": "100.0"
        //     }
        // spot
        //
        //     {
        //         "balances":[
        //            {
        //               "coin":"USDC",
        //               "hold":"0.0",
        //               "total":"1481.844"
        //            },
        //            {
        //               "coin":"PURR",
        //               "hold":"0.0",
        //               "total":"999.65004"
        //            }
        //     }
        //
        const balances = this.safeList(response, 'balances');
        if (balances !== undefined) {
            const spotBalances = { 'info': response };
            for (let i = 0; i < balances.length; i++) {
                const balance = balances[i];
                const code = this.safeCurrencyCode(this.safeString(balance, 'coin'));
                const account = this.account();
                const total = this.safeString(balance, 'total');
                const used = this.safeString(balance, 'hold');
                account['total'] = total;
                account['used'] = used;
                spotBalances[code] = account;
            }
            return this.safeBalance(spotBalances);
        }
        const data = this.safeDict(response, 'marginSummary', {});
        const usdcBalance = {
            'total': this.safeNumber(data, 'accountValue'),
        };
        if ((marginMode !== undefined) && (marginMode === 'isolated')) {
            usdcBalance['free'] = this.safeNumber(response, 'withdrawable');
        }
        else {
            usdcBalance['used'] = this.safeNumber(data, 'totalMarginUsed');
        }
        const result = {
            'info': response,
            'USDC': usdcBalance,
        };
        const timestamp = this.safeInteger(response, 'time');
        result['timestamp'] = timestamp;
        result['datetime'] = this.iso8601(timestamp);
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name hyperliquid#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#l2-book-snapshot
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'type': 'l2Book',
            'coin': market['swap'] ? market['baseName'] : market['id'],
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     {
        //         "coin": "ETH",
        //         "levels": [
        //             [
        //                 {
        //                     "n": "2",
        //                     "px": "2216.2",
        //                     "sz": "74.0637"
        //                 }
        //             ],
        //             [
        //                 {
        //                     "n": "2",
        //                     "px": "2216.5",
        //                     "sz": "70.5893"
        //                 }
        //             ]
        //         ],
        //         "time": "1704290104840"
        //     }
        //
        const data = this.safeList(response, 'levels', []);
        const result = {
            'bids': this.safeList(data, 0, []),
            'asks': this.safeList(data, 1, []),
        };
        const timestamp = this.safeInteger(response, 'time');
        return this.parseOrderBook(result, market['symbol'], timestamp, 'bids', 'asks', 'px', 'sz');
    }
    /**
     * @method
     * @name hyperliquid#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-spot-asset-contexts
     * @param {string[]} [symbols] unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.type] 'spot' or 'swap', by default fetches both
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        // at this stage, to get tickers data, we use fetchMarkets endpoints
        let response = [];
        const type = this.safeString(params, 'type');
        params = this.omit(params, 'type');
        if (type === 'spot') {
            response = await this.fetchSpotMarkets(params);
        }
        else if (type === 'swap') {
            response = await this.fetchSwapMarkets(params);
        }
        else {
            response = await this.fetchMarkets(params);
        }
        // same response as under "fetchMarkets"
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            const info = market['info'];
            const ticker = this.parseTicker(info, market);
            const symbol = this.safeString(ticker, 'symbol');
            result[symbol] = ticker;
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    /**
     * @method
     * @name hyperliquid#fetchFundingRates
     * @description retrieves data on all swap markets for hyperliquid
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
     * @param {string[]} [symbols] list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchFundingRates(symbols = undefined, params = {}) {
        const request = {
            'type': 'metaAndAssetCtxs',
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "universe": [
        //                 {
        //                     "maxLeverage": 50,
        //                     "name": "SOL",
        //                     "onlyIsolated": false,
        //                     "szDecimals": 2
        //                 }
        //             ]
        //         },
        //         [
        //             {
        //                 "dayNtlVlm": "9450588.2273",
        //                 "funding": "0.0000198",
        //                 "impactPxs": [
        //                     "108.04",
        //                     "108.06"
        //                 ],
        //                 "markPx": "108.04",
        //                 "midPx": "108.05",
        //                 "openInterest": "10764.48",
        //                 "oraclePx": "107.99",
        //                 "premium": "0.00055561",
        //                 "prevDayPx": "111.81"
        //             }
        //         ]
        //     ]
        //
        //
        const meta = this.safeDict(response, 0, {});
        const universe = this.safeList(meta, 'universe', []);
        const assetCtxs = this.safeList(response, 1, []);
        const result = [];
        for (let i = 0; i < universe.length; i++) {
            const data = this.extend(this.safeDict(universe, i, {}), this.safeDict(assetCtxs, i, {}));
            result.push(data);
        }
        return this.parseFundingRates(result, symbols);
    }
    parseFundingRate(info, market = undefined) {
        //
        //     {
        //         "maxLeverage": "50",
        //         "name": "ETH",
        //         "onlyIsolated": false,
        //         "szDecimals": "4",
        //         "dayNtlVlm": "1709813.11535",
        //         "funding": "0.00004807",
        //         "impactPxs": [
        //             "2369.3",
        //             "2369.6"
        //         ],
        //         "markPx": "2369.6",
        //         "midPx": "2369.45",
        //         "openInterest": "1815.4712",
        //         "oraclePx": "2367.3",
        //         "premium": "0.00090821",
        //         "prevDayPx": "2381.5"
        //     }
        //
        const base = this.safeString(info, 'name');
        const marketId = this.coinToMarketId(base);
        const symbol = this.safeSymbol(marketId, market);
        const funding = this.safeNumber(info, 'funding');
        const markPx = this.safeNumber(info, 'markPx');
        const oraclePx = this.safeNumber(info, 'oraclePx');
        const fundingTimestamp = (Math.floor(this.milliseconds() / 60 / 60 / 1000) + 1) * 60 * 60 * 1000;
        return {
            'info': info,
            'symbol': symbol,
            'markPrice': markPx,
            'indexPrice': oraclePx,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'fundingRate': funding,
            'fundingTimestamp': fundingTimestamp,
            'fundingDatetime': this.iso8601(fundingTimestamp),
            'nextFundingRate': undefined,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'interval': '1h',
        };
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "prevDayPx": "3400.5",
        //         "dayNtlVlm": "511297257.47936022",
        //         "markPx": "3464.7",
        //         "midPx": "3465.05",
        //         "oraclePx": "3460.1", // only in swap
        //         "openInterest": "64638.1108", // only in swap
        //         "premium": "0.00141614", // only in swap
        //         "funding": "0.00008727", // only in swap
        //         "impactPxs": [ "3465.0", "3465.1" ], // only in swap
        //         "coin": "PURR", // only in spot
        //         "circulatingSupply": "998949190.03400207", // only in spot
        //     },
        //
        const bidAsk = this.safeList(ticker, 'impactPxs');
        return this.safeTicker({
            'symbol': market['symbol'],
            'timestamp': undefined,
            'datetime': undefined,
            'previousClose': this.safeNumber(ticker, 'prevDayPx'),
            'close': this.safeNumber(ticker, 'midPx'),
            'bid': this.safeNumber(bidAsk, 0),
            'ask': this.safeNumber(bidAsk, 1),
            'quoteVolume': this.safeNumber(ticker, 'dayNtlVlm'),
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name hyperliquid#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#candle-snapshot
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents, support '1m', '15m', '1h', '1d'
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
        let useTail = since === undefined;
        const originalSince = since;
        if (since === undefined) {
            if (limit !== undefined) {
                // optimization if limit is provided
                const timeframeInMilliseconds = this.parseTimeframe(timeframe) * 1000;
                since = this.sum(until, timeframeInMilliseconds * limit * -1);
                useTail = false;
            }
            else {
                since = 0;
            }
        }
        params = this.omit(params, ['until']);
        const request = {
            'type': 'candleSnapshot',
            'req': {
                'coin': market['swap'] ? market['baseName'] : market['id'],
                'interval': this.safeString(this.timeframes, timeframe, timeframe),
                'startTime': since,
                'endTime': until,
            },
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "T": 1704287699999,
        //             "c": "2226.4",
        //             "h": "2247.9",
        //             "i": "15m",
        //             "l": "2224.6",
        //             "n": 46,
        //             "o": "2247.9",
        //             "s": "ETH",
        //             "t": 1704286800000,
        //             "v": "591.6427"
        //         }
        //     ]
        //
        return this.parseOHLCVs(response, market, timeframe, originalSince, limit, useTail);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //         "T": 1704287699999,
        //         "c": "2226.4",
        //         "h": "2247.9",
        //         "i": "15m",
        //         "l": "2224.6",
        //         "n": 46,
        //         "o": "2247.9",
        //         "s": "ETH",
        //         "t": 1704286800000,
        //         "v": "591.6427"
        //     }
        //
        return [
            this.safeInteger(ohlcv, 't'),
            this.safeNumber(ohlcv, 'o'),
            this.safeNumber(ohlcv, 'h'),
            this.safeNumber(ohlcv, 'l'),
            this.safeNumber(ohlcv, 'c'),
            this.safeNumber(ohlcv, 'v'),
        ];
    }
    /**
     * @method
     * @name hyperliquid#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills-by-time
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest trade
     * @param {string} [params.address] wallet address that made trades
     * @param {string} [params.user] wallet address that made trades
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchTrades', params);
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
            'user': userAddress,
        };
        if (since !== undefined) {
            request['type'] = 'userFillsByTime';
            request['startTime'] = since;
        }
        else {
            request['type'] = 'userFills';
        }
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "closedPnl": "0.19343",
        //             "coin": "ETH",
        //             "crossed": true,
        //             "dir": "Close Long",
        //             "fee": "0.050062",
        //             "hash": "0x09d77c96791e98b5775a04092584ab010d009445119c71e4005c0d634ea322bc",
        //             "liquidationMarkPx": null,
        //             "oid": 3929354691,
        //             "px": "2381.1",
        //             "side": "A",
        //             "startPosition": "0.0841",
        //             "sz": "0.0841",
        //             "tid": 128423918764978,
        //             "time": 1704262888911
        //         }
        //     ]
        //
        return this.parseTrades(response, market, since, limit);
    }
    amountToPrecision(symbol, amount) {
        const market = this.market(symbol);
        return this.decimalToPrecision(amount, number.ROUND, market['precision']['amount'], this.precisionMode, this.paddingMode);
    }
    priceToPrecision(symbol, price) {
        const market = this.market(symbol);
        const priceStr = this.numberToString(price);
        const integerPart = priceStr.split('.')[0];
        const significantDigits = Math.max(5, integerPart.length);
        const result = this.decimalToPrecision(price, number.ROUND, significantDigits, number.SIGNIFICANT_DIGITS, this.paddingMode);
        const maxDecimals = market['spot'] ? 8 : 6;
        const subtractedValue = maxDecimals - this.precisionFromString(this.safeString(market['precision'], 'amount'));
        return this.decimalToPrecision(result, number.ROUND, subtractedValue, number.DECIMAL_PLACES, this.paddingMode);
    }
    hashMessage(message) {
        return '0x' + this.hash(message, sha3.keccak_256, 'hex');
    }
    signHash(hash, privateKey) {
        const signature = crypto.ecdsa(hash.slice(-64), privateKey.slice(-64), secp256k1.secp256k1, undefined);
        return {
            'r': '0x' + signature['r'],
            's': '0x' + signature['s'],
            'v': this.sum(27, signature['v']),
        };
    }
    signMessage(message, privateKey) {
        return this.signHash(this.hashMessage(message), privateKey.slice(-64));
    }
    constructPhantomAgent(hash, isTestnet = true) {
        const source = (isTestnet) ? 'b' : 'a';
        return {
            'source': source,
            'connectionId': hash,
        };
    }
    actionHash(action, vaultAddress, nonce) {
        const dataBinary = this.packb(action);
        const dataHex = this.binaryToBase16(dataBinary);
        let data = dataHex;
        data += '00000' + this.intToBase16(nonce);
        if (vaultAddress === undefined) {
            data += '00';
        }
        else {
            data += '01';
            data += vaultAddress;
        }
        return this.hash(this.base16ToBinary(data), sha3.keccak_256, 'binary');
    }
    signL1Action(action, nonce, vaultAdress = undefined) {
        const hash = this.actionHash(action, vaultAdress, nonce);
        const isTestnet = this.safeBool(this.options, 'sandboxMode', false);
        const phantomAgent = this.constructPhantomAgent(hash, isTestnet);
        // const data: Dict = {
        //     'domain': {
        //         'chainId': 1337,
        //         'name': 'Exchange',
        //         'verifyingContract': '0x0000000000000000000000000000000000000000',
        //         'version': '1',
        //     },
        //     'types': {
        //         'Agent': [
        //             { 'name': 'source', 'type': 'string' },
        //             { 'name': 'connectionId', 'type': 'bytes32' },
        //         ],
        //         'EIP712Domain': [
        //             { 'name': 'name', 'type': 'string' },
        //             { 'name': 'version', 'type': 'string' },
        //             { 'name': 'chainId', 'type': 'uint256' },
        //             { 'name': 'verifyingContract', 'type': 'address' },
        //         ],
        //     },
        //     'primaryType': 'Agent',
        //     'message': phantomAgent,
        // };
        const zeroAddress = this.safeString(this.options, 'zeroAddress');
        const chainId = 1337; // check this out
        const domain = {
            'chainId': chainId,
            'name': 'Exchange',
            'verifyingContract': zeroAddress,
            'version': '1',
        };
        const messageTypes = {
            'Agent': [
                { 'name': 'source', 'type': 'string' },
                { 'name': 'connectionId', 'type': 'bytes32' },
            ],
        };
        const msg = this.ethEncodeStructuredData(domain, messageTypes, phantomAgent);
        const signature = this.signMessage(msg, this.privateKey);
        return signature;
    }
    signUserSignedAction(messageTypes, message) {
        const zeroAddress = this.safeString(this.options, 'zeroAddress');
        const chainId = 421614; // check this out
        const domain = {
            'chainId': chainId,
            'name': 'HyperliquidSignTransaction',
            'verifyingContract': zeroAddress,
            'version': '1',
        };
        const msg = this.ethEncodeStructuredData(domain, messageTypes, message);
        const signature = this.signMessage(msg, this.privateKey);
        return signature;
    }
    buildUsdSendSig(message) {
        const messageTypes = {
            'HyperliquidTransaction:UsdSend': [
                { 'name': 'hyperliquidChain', 'type': 'string' },
                { 'name': 'destination', 'type': 'string' },
                { 'name': 'amount', 'type': 'string' },
                { 'name': 'time', 'type': 'uint64' },
            ],
        };
        return this.signUserSignedAction(messageTypes, message);
    }
    buildUsdClassSendSig(message) {
        const messageTypes = {
            'HyperliquidTransaction:UsdClassTransfer': [
                { 'name': 'hyperliquidChain', 'type': 'string' },
                { 'name': 'amount', 'type': 'string' },
                { 'name': 'toPerp', 'type': 'bool' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.signUserSignedAction(messageTypes, message);
    }
    buildWithdrawSig(message) {
        const messageTypes = {
            'HyperliquidTransaction:Withdraw': [
                { 'name': 'hyperliquidChain', 'type': 'string' },
                { 'name': 'destination', 'type': 'string' },
                { 'name': 'amount', 'type': 'string' },
                { 'name': 'time', 'type': 'uint64' },
            ],
        };
        return this.signUserSignedAction(messageTypes, message);
    }
    buildApproveBuilderFeeSig(message) {
        const messageTypes = {
            'HyperliquidTransaction:ApproveBuilderFee': [
                { 'name': 'hyperliquidChain', 'type': 'string' },
                { 'name': 'maxFeeRate', 'type': 'string' },
                { 'name': 'builder', 'type': 'address' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.signUserSignedAction(messageTypes, message);
    }
    async approveBuilderFee(builder, maxFeeRate) {
        const nonce = this.milliseconds();
        const isSandboxMode = this.safeBool(this.options, 'sandboxMode', false);
        const payload = {
            'hyperliquidChain': isSandboxMode ? 'Testnet' : 'Mainnet',
            'maxFeeRate': maxFeeRate,
            'builder': builder,
            'nonce': nonce,
        };
        const sig = this.buildApproveBuilderFeeSig(payload);
        const action = {
            'hyperliquidChain': payload['hyperliquidChain'],
            'signatureChainId': '0x66eee',
            'maxFeeRate': payload['maxFeeRate'],
            'builder': payload['builder'],
            'nonce': nonce,
            'type': 'approveBuilderFee',
        };
        const request = {
            'action': action,
            'nonce': nonce,
            'signature': sig,
            'vaultAddress': undefined,
        };
        //
        // {
        //     "status": "ok",
        //     "response": {
        //         "type": "default"
        //     }
        // }
        //
        return await this.privatePostExchange(request);
    }
    async handleBuilderFeeApproval() {
        const buildFee = this.safeBool(this.options, 'builderFee', true);
        if (!buildFee) {
            return false; // skip if builder fee is not enabled
        }
        const approvedBuilderFee = this.safeBool(this.options, 'approvedBuilderFee', false);
        if (approvedBuilderFee) {
            return true; // skip if builder fee is already approved
        }
        try {
            const builder = this.safeString(this.options, 'builder', '0x6530512A6c89C7cfCEbC3BA7fcD9aDa5f30827a6');
            const maxFeeRate = this.safeString(this.options, 'feeRate', '0.01%');
            await this.approveBuilderFee(builder, maxFeeRate);
            this.options['approvedBuilderFee'] = true;
        }
        catch (e) {
            this.options['builderFee'] = false; // disable builder fee if an error occurs
        }
        return true;
    }
    /**
     * @method
     * @name hyperliquid#createOrder
     * @description create a trade order
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#place-an-order
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.timeInForce] 'Gtc', 'Ioc', 'Alo'
     * @param {bool} [params.postOnly] true or false whether the order is post-only
     * @param {bool} [params.reduceOnly] true or false whether the order is reduce-only
     * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
     * @param {string} [params.clientOrderId] client order id, (optional 128 bit hex string e.g. 0x1234567890abcdef1234567890abcdef)
     * @param {string} [params.slippage] the slippage for market order
     * @param {string} [params.vaultAddress] the vault address for order
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const [order, globalParams] = this.parseCreateEditOrderArgs(undefined, symbol, type, side, amount, price, params);
        const orders = await this.createOrders([order], globalParams);
        return orders[0];
    }
    /**
     * @method
     * @name hyperliquid#createOrders
     * @description create a list of trade orders
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#place-an-order
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrders(orders, params = {}) {
        await this.loadMarkets();
        await this.handleBuilderFeeApproval();
        const request = this.createOrdersRequest(orders, params);
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         "status": "ok",
        //         "response": {
        //             "type": "order",
        //             "data": {
        //                 "statuses": [
        //                     {
        //                         "resting": {
        //                             "oid": 5063830287
        //                         }
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        //
        const responseObj = this.safeDict(response, 'response', {});
        const data = this.safeDict(responseObj, 'data', {});
        const statuses = this.safeList(data, 'statuses', []);
        return this.parseOrders(statuses, undefined);
    }
    createOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        const market = this.market(symbol);
        type = type.toUpperCase();
        side = side.toUpperCase();
        const isMarket = (type === 'MARKET');
        const isBuy = (side === 'BUY');
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'client_id');
        const slippage = this.safeString(params, 'slippage');
        let defaultTimeInForce = (isMarket) ? 'ioc' : 'gtc';
        const postOnly = this.safeBool(params, 'postOnly', false);
        if (postOnly) {
            defaultTimeInForce = 'alo';
        }
        let timeInForce = this.safeStringLower(params, 'timeInForce', defaultTimeInForce);
        timeInForce = this.capitalize(timeInForce);
        let triggerPrice = this.safeString2(params, 'triggerPrice', 'stopPrice');
        const stopLossPrice = this.safeString(params, 'stopLossPrice', triggerPrice);
        const takeProfitPrice = this.safeString(params, 'takeProfitPrice');
        const isTrigger = (stopLossPrice || takeProfitPrice);
        let px = undefined;
        if (isMarket) {
            if (price === undefined) {
                throw new errors.ArgumentsRequired(this.id + '  market orders require price to calculate the max slippage price. Default slippage can be set in options (default is 5%).');
            }
            px = (isBuy) ? Precise["default"].stringMul(price, Precise["default"].stringAdd('1', slippage)) : Precise["default"].stringMul(price, Precise["default"].stringSub('1', slippage));
            px = this.priceToPrecision(symbol, px); // round after adding slippage
        }
        else {
            px = this.priceToPrecision(symbol, price);
        }
        const sz = this.amountToPrecision(symbol, amount);
        const reduceOnly = this.safeBool(params, 'reduceOnly', false);
        const orderType = {};
        if (isTrigger) {
            let isTp = false;
            if (takeProfitPrice !== undefined) {
                triggerPrice = this.priceToPrecision(symbol, takeProfitPrice);
                isTp = true;
            }
            else {
                triggerPrice = this.priceToPrecision(symbol, stopLossPrice);
            }
            orderType['trigger'] = {
                'isMarket': isMarket,
                'triggerPx': triggerPrice,
                'tpsl': (isTp) ? 'tp' : 'sl',
            };
        }
        else {
            orderType['limit'] = {
                'tif': timeInForce,
            };
        }
        params = this.omit(params, ['clientOrderId', 'slippage', 'triggerPrice', 'stopPrice', 'stopLossPrice', 'takeProfitPrice', 'timeInForce', 'client_id', 'reduceOnly', 'postOnly']);
        const orderObj = {
            'a': this.parseToInt(market['baseId']),
            'b': isBuy,
            'p': px,
            's': sz,
            'r': reduceOnly,
            't': orderType,
            // 'c': clientOrderId,
        };
        if (clientOrderId !== undefined) {
            orderObj['c'] = clientOrderId;
        }
        return orderObj;
    }
    createOrdersRequest(orders, params = {}) {
        /**
         * @method
         * @name hyperliquid#createOrdersRequest
         * @description create a list of trade orders
         * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#place-an-order
         * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        let defaultSlippage = this.safeString(this.options, 'defaultSlippage');
        defaultSlippage = this.safeString(params, 'slippage', defaultSlippage);
        let hasClientOrderId = false;
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const orderParams = this.safeDict(rawOrder, 'params', {});
            const clientOrderId = this.safeString2(orderParams, 'clientOrderId', 'client_id');
            if (clientOrderId !== undefined) {
                hasClientOrderId = true;
            }
        }
        if (hasClientOrderId) {
            for (let i = 0; i < orders.length; i++) {
                const rawOrder = orders[i];
                const orderParams = this.safeDict(rawOrder, 'params', {});
                const clientOrderId = this.safeString2(orderParams, 'clientOrderId', 'client_id');
                if (clientOrderId === undefined) {
                    throw new errors.ArgumentsRequired(this.id + ' createOrders() all orders must have clientOrderId if at least one has a clientOrderId');
                }
            }
        }
        params = this.omit(params, ['slippage', 'clientOrderId', 'client_id', 'slippage', 'triggerPrice', 'stopPrice', 'stopLossPrice', 'takeProfitPrice', 'timeInForce']);
        const nonce = this.milliseconds();
        const orderReq = [];
        let grouping = 'na';
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const marketId = this.safeString(rawOrder, 'symbol');
            const market = this.market(marketId);
            const symbol = market['symbol'];
            const type = this.safeStringUpper(rawOrder, 'type');
            const side = this.safeStringUpper(rawOrder, 'side');
            const amount = this.safeString(rawOrder, 'amount');
            const price = this.safeString(rawOrder, 'price');
            let orderParams = this.safeDict(rawOrder, 'params', {});
            const slippage = this.safeString(orderParams, 'slippage', defaultSlippage);
            orderParams['slippage'] = slippage;
            const stopLoss = this.safeValue(orderParams, 'stopLoss');
            const takeProfit = this.safeValue(orderParams, 'takeProfit');
            const isTrigger = (stopLoss || takeProfit);
            orderParams = this.omit(orderParams, ['stopLoss', 'takeProfit']);
            const mainOrderObj = this.createOrderRequest(symbol, type, side, amount, price, orderParams);
            orderReq.push(mainOrderObj);
            if (isTrigger) {
                // grouping opposed orders for sl/tp
                const stopLossOrderTriggerPrice = this.safeStringN(stopLoss, ['triggerPrice', 'stopPrice']);
                const stopLossOrderType = this.safeString(stopLoss, 'type');
                const stopLossOrderLimitPrice = this.safeStringN(stopLoss, ['price', 'stopLossPrice'], stopLossOrderTriggerPrice);
                const takeProfitOrderTriggerPrice = this.safeStringN(takeProfit, ['triggerPrice', 'stopPrice']);
                const takeProfitOrderType = this.safeString(takeProfit, 'type');
                const takeProfitOrderLimitPrice = this.safeStringN(takeProfit, ['price', 'takeProfitPrice'], takeProfitOrderTriggerPrice);
                grouping = 'normalTpsl';
                orderParams = this.omit(orderParams, ['stopLoss', 'takeProfit']);
                let triggerOrderSide = '';
                if (side === 'BUY') {
                    triggerOrderSide = 'sell';
                }
                else {
                    triggerOrderSide = 'buy';
                }
                if (takeProfit !== undefined) {
                    const orderObj = this.createOrderRequest(symbol, takeProfitOrderType, triggerOrderSide, amount, takeProfitOrderLimitPrice, this.extend(orderParams, {
                        'takeProfitPrice': takeProfitOrderTriggerPrice,
                        'reduceOnly': true,
                    }));
                    orderReq.push(orderObj);
                }
                if (stopLoss !== undefined) {
                    const orderObj = this.createOrderRequest(symbol, stopLossOrderType, triggerOrderSide, amount, stopLossOrderLimitPrice, this.extend(orderParams, {
                        'stopLossPrice': stopLossOrderTriggerPrice,
                        'reduceOnly': true,
                    }));
                    orderReq.push(orderObj);
                }
            }
        }
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams(params, 'createOrder', 'vaultAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const orderAction = {
            'type': 'order',
            'orders': orderReq,
            'grouping': grouping,
        };
        if (this.safeBool(this.options, 'approvedBuilderFee', false)) {
            const wallet = this.safeStringLower(this.options, 'builder', '0x6530512A6c89C7cfCEbC3BA7fcD9aDa5f30827a6');
            orderAction['builder'] = { 'b': wallet, 'f': this.safeInteger(this.options, 'feeInt', 10) };
        }
        const signature = this.signL1Action(orderAction, nonce, vaultAddress);
        const request = {
            'action': orderAction,
            'nonce': nonce,
            'signature': signature,
            // 'vaultAddress': vaultAddress,
        };
        if (vaultAddress !== undefined) {
            params = this.omit(params, 'vaultAddress');
            request['vaultAddress'] = vaultAddress;
        }
        return request;
    }
    /**
     * @method
     * @name hyperliquid#cancelOrder
     * @description cancels an open order
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s-by-cloid
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.clientOrderId] client order id, (optional 128 bit hex string e.g. 0x1234567890abcdef1234567890abcdef)
     * @param {string} [params.vaultAddress] the vault address for order
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        const orders = await this.cancelOrders([id], symbol, params);
        return this.safeDict(orders, 0);
    }
    /**
     * @method
     * @name hyperliquid#cancelOrders
     * @description cancel multiple orders
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s-by-cloid
     * @param {string[]} ids order ids
     * @param {string} [symbol] unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string|string[]} [params.clientOrderId] client order ids, (optional 128 bit hex string e.g. 0x1234567890abcdef1234567890abcdef)
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrders(ids, symbol = undefined, params = {}) {
        this.checkRequiredCredentials();
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' cancelOrders() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        let clientOrderId = this.safeValue2(params, 'clientOrderId', 'client_id');
        params = this.omit(params, ['clientOrderId', 'client_id']);
        const nonce = this.milliseconds();
        const request = {
            'nonce': nonce,
            // 'vaultAddress': vaultAddress,
        };
        const cancelReq = [];
        const cancelAction = {
            'type': '',
            'cancels': [],
        };
        const baseId = this.parseToNumeric(market['baseId']);
        if (clientOrderId !== undefined) {
            if (!Array.isArray(clientOrderId)) {
                clientOrderId = [clientOrderId];
            }
            cancelAction['type'] = 'cancelByCloid';
            for (let i = 0; i < clientOrderId.length; i++) {
                cancelReq.push({
                    'asset': baseId,
                    'cloid': clientOrderId[i],
                });
            }
        }
        else {
            cancelAction['type'] = 'cancel';
            for (let i = 0; i < ids.length; i++) {
                cancelReq.push({
                    'a': baseId,
                    'o': this.parseToNumeric(ids[i]),
                });
            }
        }
        cancelAction['cancels'] = cancelReq;
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'cancelOrders', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(cancelAction, nonce, vaultAddress);
        request['action'] = cancelAction;
        request['signature'] = signature;
        if (vaultAddress !== undefined) {
            params = this.omit(params, 'vaultAddress');
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         "status":"ok",
        //         "response":{
        //             "type":"cancel",
        //             "data":{
        //                 "statuses":[
        //                     "success"
        //                 ]
        //             }
        //         }
        //     }
        //
        const innerResponse = this.safeDict(response, 'response');
        const data = this.safeDict(innerResponse, 'data');
        const statuses = this.safeList(data, 'statuses');
        const orders = [];
        for (let i = 0; i < statuses.length; i++) {
            const status = statuses[i];
            orders.push(this.safeOrder({
                'info': status,
                'status': status,
            }));
        }
        return orders;
    }
    /**
     * @method
     * @name hyperliquid#cancelOrdersForSymbols
     * @description cancel multiple orders for multiple symbols
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#cancel-order-s-by-cloid
     * @param {CancellationRequest[]} orders each order should contain the parameters required by cancelOrder namely id and symbol, example [{"id": "a", "symbol": "BTC/USDT"}, {"id": "b", "symbol": "ETH/USDT"}]
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrdersForSymbols(orders, params = {}) {
        this.checkRequiredCredentials();
        await this.loadMarkets();
        const nonce = this.milliseconds();
        const request = {
            'nonce': nonce,
            // 'vaultAddress': vaultAddress,
        };
        const cancelReq = [];
        const cancelAction = {
            'type': '',
            'cancels': [],
        };
        let cancelByCloid = false;
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const clientOrderId = this.safeString(order, 'clientOrderId');
            if (clientOrderId !== undefined) {
                cancelByCloid = true;
            }
            const id = this.safeString(order, 'id');
            const symbol = this.safeString(order, 'symbol');
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' cancelOrdersForSymbols() requires a symbol argument in each order');
            }
            if (id !== undefined && cancelByCloid) {
                throw new errors.BadRequest(this.id + ' cancelOrdersForSymbols() all orders must have either id or clientOrderId');
            }
            const assetKey = cancelByCloid ? 'asset' : 'a';
            const idKey = cancelByCloid ? 'cloid' : 'o';
            const market = this.market(symbol);
            const cancelObj = {};
            cancelObj[assetKey] = this.parseToNumeric(market['baseId']);
            cancelObj[idKey] = cancelByCloid ? clientOrderId : this.parseToNumeric(id);
            cancelReq.push(cancelObj);
        }
        cancelAction['type'] = cancelByCloid ? 'cancelByCloid' : 'cancel';
        cancelAction['cancels'] = cancelReq;
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'cancelOrdersForSymbols', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(cancelAction, nonce, vaultAddress);
        request['action'] = cancelAction;
        request['signature'] = signature;
        if (vaultAddress !== undefined) {
            params = this.omit(params, 'vaultAddress');
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         "status":"ok",
        //         "response":{
        //             "type":"cancel",
        //             "data":{
        //                 "statuses":[
        //                     "success"
        //                 ]
        //             }
        //         }
        //     }
        //
        return [this.safeOrder({ 'info': response })];
    }
    /**
     * @method
     * @name hyperliquid#cancelAllOrdersAfter
     * @description dead man's switch, cancel all orders after the given timeout
     * @param {number} timeout time in milliseconds, 0 represents cancel the timer
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} the api result
     */
    async cancelAllOrdersAfter(timeout, params = {}) {
        this.checkRequiredCredentials();
        await this.loadMarkets();
        params = this.omit(params, ['clientOrderId', 'client_id']);
        const nonce = this.milliseconds();
        const request = {
            'nonce': nonce,
            // 'vaultAddress': vaultAddress,
        };
        const cancelAction = {
            'type': 'scheduleCancel',
            'time': nonce + timeout,
        };
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'cancelAllOrdersAfter', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(cancelAction, nonce, vaultAddress);
        request['action'] = cancelAction;
        request['signature'] = signature;
        if (vaultAddress !== undefined) {
            params = this.omit(params, 'vaultAddress');
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         "status":"err",
        //         "response":"Cannot set scheduled cancel time until enough volume traded. Required: $1000000. Traded: $373.47205."
        //     }
        //
        return response;
    }
    editOrdersRequest(orders, params = {}) {
        this.checkRequiredCredentials();
        let hasClientOrderId = false;
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const orderParams = this.safeDict(rawOrder, 'params', {});
            const clientOrderId = this.safeString2(orderParams, 'clientOrderId', 'client_id');
            if (clientOrderId !== undefined) {
                hasClientOrderId = true;
            }
        }
        if (hasClientOrderId) {
            for (let i = 0; i < orders.length; i++) {
                const rawOrder = orders[i];
                const orderParams = this.safeDict(rawOrder, 'params', {});
                const clientOrderId = this.safeString2(orderParams, 'clientOrderId', 'client_id');
                if (clientOrderId === undefined) {
                    throw new errors.ArgumentsRequired(this.id + ' editOrders() all orders must have clientOrderId if at least one has a clientOrderId');
                }
            }
        }
        params = this.omit(params, ['slippage', 'clientOrderId', 'client_id', 'slippage', 'triggerPrice', 'stopPrice', 'stopLossPrice', 'takeProfitPrice', 'timeInForce']);
        const modifies = [];
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const id = this.safeString(rawOrder, 'id');
            const marketId = this.safeString(rawOrder, 'symbol');
            const market = this.market(marketId);
            const symbol = market['symbol'];
            const type = this.safeStringUpper(rawOrder, 'type');
            const isMarket = (type === 'MARKET');
            const side = this.safeStringUpper(rawOrder, 'side');
            const isBuy = (side === 'BUY');
            const amount = this.safeString(rawOrder, 'amount');
            const price = this.safeString(rawOrder, 'price');
            let orderParams = this.safeDict(rawOrder, 'params', {});
            const defaultSlippage = this.safeString(this.options, 'defaultSlippage');
            const slippage = this.safeString(orderParams, 'slippage', defaultSlippage);
            let defaultTimeInForce = (isMarket) ? 'ioc' : 'gtc';
            const postOnly = this.safeBool(orderParams, 'postOnly', false);
            if (postOnly) {
                defaultTimeInForce = 'alo';
            }
            let timeInForce = this.safeStringLower(orderParams, 'timeInForce', defaultTimeInForce);
            timeInForce = this.capitalize(timeInForce);
            const clientOrderId = this.safeString2(orderParams, 'clientOrderId', 'client_id');
            let triggerPrice = this.safeString2(orderParams, 'triggerPrice', 'stopPrice');
            const stopLossPrice = this.safeString(orderParams, 'stopLossPrice', triggerPrice);
            const takeProfitPrice = this.safeString(orderParams, 'takeProfitPrice');
            const isTrigger = (stopLossPrice || takeProfitPrice);
            const reduceOnly = this.safeBool(orderParams, 'reduceOnly', false);
            orderParams = this.omit(orderParams, ['slippage', 'timeInForce', 'triggerPrice', 'stopLossPrice', 'takeProfitPrice', 'clientOrderId', 'client_id', 'postOnly', 'reduceOnly']);
            let px = this.numberToString(price);
            if (isMarket) {
                px = (isBuy) ? Precise["default"].stringMul(px, Precise["default"].stringAdd('1', slippage)) : Precise["default"].stringMul(px, Precise["default"].stringSub('1', slippage));
                px = this.priceToPrecision(symbol, px);
            }
            else {
                px = this.priceToPrecision(symbol, px);
            }
            const sz = this.amountToPrecision(symbol, amount);
            const orderType = {};
            if (isTrigger) {
                let isTp = false;
                if (takeProfitPrice !== undefined) {
                    triggerPrice = this.priceToPrecision(symbol, takeProfitPrice);
                    isTp = true;
                }
                else {
                    triggerPrice = this.priceToPrecision(symbol, stopLossPrice);
                }
                orderType['trigger'] = {
                    'isMarket': isMarket,
                    'triggerPx': triggerPrice,
                    'tpsl': (isTp) ? 'tp' : 'sl',
                };
            }
            else {
                orderType['limit'] = {
                    'tif': timeInForce,
                };
            }
            if (triggerPrice === undefined) {
                triggerPrice = '0';
            }
            const orderReq = {
                'a': this.parseToInt(market['baseId']),
                'b': isBuy,
                'p': px,
                's': sz,
                'r': reduceOnly,
                't': orderType,
                // 'c': clientOrderId,
            };
            if (clientOrderId !== undefined) {
                orderReq['c'] = clientOrderId;
            }
            const modifyReq = {
                'oid': this.parseToInt(id),
                'order': orderReq,
            };
            modifies.push(modifyReq);
        }
        const nonce = this.milliseconds();
        const modifyAction = {
            'type': 'batchModify',
            'modifies': modifies,
        };
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams(params, 'editOrder', 'vaultAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(modifyAction, nonce, vaultAddress);
        const request = {
            'action': modifyAction,
            'nonce': nonce,
            'signature': signature,
            // 'vaultAddress': vaultAddress,
        };
        if (vaultAddress !== undefined) {
            request['vaultAddress'] = vaultAddress;
        }
        return request;
    }
    /**
     * @method
     * @name hyperliquid#editOrder
     * @description edit a trade order
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#modify-multiple-orders
     * @param {string} id cancel order id
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.timeInForce] 'Gtc', 'Ioc', 'Alo'
     * @param {bool} [params.postOnly] true or false whether the order is post-only
     * @param {bool} [params.reduceOnly] true or false whether the order is reduce-only
     * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
     * @param {string} [params.clientOrderId] client order id, (optional 128 bit hex string e.g. 0x1234567890abcdef1234567890abcdef)
     * @param {string} [params.vaultAddress] the vault address for order
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        await this.loadMarkets();
        if (id === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' editOrder() requires an id argument');
        }
        const [order, globalParams] = this.parseCreateEditOrderArgs(id, symbol, type, side, amount, price, params);
        const orders = await this.editOrders([order], globalParams);
        return orders[0];
    }
    /**
     * @method
     * @name hyperliquid#editOrders
     * @description edit a list of trade orders
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#modify-multiple-orders
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrders(orders, params = {}) {
        await this.loadMarkets();
        const request = this.editOrdersRequest(orders, params);
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         "status": "ok",
        //         "response": {
        //             "type": "order",
        //             "data": {
        //                 "statuses": [
        //                     {
        //                         "resting": {
        //                             "oid": 5063830287
        //                         }
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        // when the order is filled immediately
        //     {
        //         "status":"ok",
        //         "response":{
        //            "type":"order",
        //            "data":{
        //               "statuses":[
        //                  {
        //                     "filled":{
        //                        "totalSz":"0.1",
        //                        "avgPx":"100.84",
        //                        "oid":6195281425
        //                     }
        //                  }
        //               ]
        //            }
        //         }
        //     }
        //
        const responseObject = this.safeDict(response, 'response', {});
        const dataObject = this.safeDict(responseObject, 'data', {});
        const statuses = this.safeList(dataObject, 'statuses', []);
        return this.parseOrders(statuses);
    }
    /**
     * @method
     * @name hyperliquid#createVault
     * @description creates a value
     * @param {string} name The name of the vault
     * @param {string} description The description of the vault
     * @param {number} initialUsd The initialUsd of the vault
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} the api result
     */
    async createVault(name, description, initialUsd, params = {}) {
        this.checkRequiredCredentials();
        await this.loadMarkets();
        const nonce = this.milliseconds();
        const request = {
            'nonce': nonce,
        };
        const usd = this.parseToInt(Precise["default"].stringMul(this.numberToString(initialUsd), '1000000'));
        const action = {
            'type': 'createVault',
            'name': name,
            'description': description,
            'initialUsd': usd,
            'nonce': nonce,
        };
        const signature = this.signL1Action(action, nonce);
        request['action'] = action;
        request['signature'] = signature;
        const response = await this.privatePostExchange(this.extend(request, params));
        //
        // {
        //     "status": "ok",
        //     "response": {
        //         "type": "createVault",
        //         "data": "0x04fddcbc9ce80219301bd16f18491bedf2a8c2b8"
        //     }
        // }
        //
        return response;
    }
    /**
     * @method
     * @name hyperliquid#fetchFundingRateHistory
     * @description fetches historical funding rate prices
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-historical-funding-rates
     * @param {string} symbol unified symbol of the market to fetch the funding rate history for
     * @param {int} [since] timestamp in ms of the earliest funding rate to fetch
     * @param {int} [limit] the maximum amount of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure} to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest funding rate
     * @returns {object[]} a list of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure}
     */
    async fetchFundingRateHistory(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchFundingRateHistory() requires a symbol argument');
        }
        const market = this.market(symbol);
        const request = {
            'type': 'fundingHistory',
            'coin': market['baseName'],
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        else {
            const maxLimit = (limit === undefined) ? 500 : limit;
            request['startTime'] = this.milliseconds() - maxLimit * 60 * 60 * 1000;
        }
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "coin": "ETH",
        //             "fundingRate": "0.0000125",
        //             "premium": "0.00057962",
        //             "time": 1704290400031
        //         }
        //     ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const entry = response[i];
            const timestamp = this.safeInteger(entry, 'time');
            result.push({
                'info': entry,
                'symbol': this.safeSymbol(undefined, market),
                'fundingRate': this.safeNumber(entry, 'fundingRate'),
                'timestamp': timestamp,
                'datetime': this.iso8601(timestamp),
            });
        }
        const sorted = this.sortBy(result, 'timestamp');
        return this.filterBySymbolSinceLimit(sorted, symbol, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-open-orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.method] 'openOrders' or 'frontendOpenOrders' default is 'frontendOpenOrders'
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchOpenOrders', params);
        let method = undefined;
        [method, params] = this.handleOptionAndParams(params, 'fetchOpenOrders', 'method', 'frontendOpenOrders');
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
            'type': method,
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "coin": "ETH",
        //             "limitPx": "2000.0",
        //             "oid": 3991946565,
        //             "origSz": "0.1",
        //             "side": "B",
        //             "sz": "0.1",
        //             "timestamp": 1704346468838
        //         }
        //     ]
        //
        const orderWithStatus = [];
        for (let i = 0; i < response.length; i++) {
            const order = response[i];
            const extendOrder = {};
            if (this.safeString(order, 'status') === undefined) {
                extendOrder['ccxtStatus'] = 'open';
            }
            orderWithStatus.push(this.extend(order, extendOrder));
        }
        return this.parseOrders(orderWithStatus, market, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchClosedOrders
     * @description fetch all unfilled currently closed orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const orders = await this.fetchOrders(symbol, undefined, undefined, params); // don't filter here because we don't want to catch open orders
        const closedOrders = this.filterByArray(orders, 'status', ['closed'], false);
        return this.filterBySymbolSinceLimit(closedOrders, symbol, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchCanceledOrders
     * @description fetch all canceled orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchCanceledOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const orders = await this.fetchOrders(symbol, undefined, undefined, params); // don't filter here because we don't want to catch open orders
        const closedOrders = this.filterByArray(orders, 'status', ['canceled'], false);
        return this.filterBySymbolSinceLimit(closedOrders, symbol, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchCanceledAndClosedOrders
     * @description fetch all closed and canceled orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchCanceledAndClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const orders = await this.fetchOrders(symbol, undefined, undefined, params); // don't filter here because we don't want to catch open orders
        const closedOrders = this.filterByArray(orders, 'status', ['canceled', 'closed', 'rejected'], false);
        return this.filterBySymbolSinceLimit(closedOrders, symbol, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchOrders
     * @description fetch all orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchOrders', params);
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
            'type': 'historicalOrders',
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "coin": "ETH",
        //             "limitPx": "2000.0",
        //             "oid": 3991946565,
        //             "origSz": "0.1",
        //             "side": "B",
        //             "sz": "0.1",
        //             "timestamp": 1704346468838
        //         }
        //     ]
        //
        return this.parseOrders(response, market, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchOrder
     * @description fetches information on an order made by the user
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-order-status-by-oid-or-cloid
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchOrder', params);
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const isClientOrderId = id.length >= 34;
        const request = {
            'type': 'orderStatus',
            'oid': isClientOrderId ? id : this.parseToNumeric(id),
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     {
        //         "order": {
        //             "order": {
        //                 "children": [],
        //                 "cloid": null,
        //                 "coin": "ETH",
        //                 "isPositionTpsl": false,
        //                 "isTrigger": false,
        //                 "limitPx": "2000.0",
        //                 "oid": "3991946565",
        //                 "orderType": "Limit",
        //                 "origSz": "0.1",
        //                 "reduceOnly": false,
        //                 "side": "B",
        //                 "sz": "0.1",
        //                 "tif": "Gtc",
        //                 "timestamp": "1704346468838",
        //                 "triggerCondition": "N/A",
        //                 "triggerPx": "0.0"
        //             },
        //             "status": "open",
        //             "statusTimestamp": "1704346468838"
        //         },
        //         "status": "order"
        //     }
        //
        const data = this.safeDict(response, 'order');
        return this.parseOrder(data, market);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrdersWs error
        //
        //  {error: 'Insufficient margin to place order. asset=159'}
        //
        //  fetchOpenOrders
        //
        //     {
        //         "coin": "ETH",
        //         "limitPx": "2000.0",
        //         "oid": 3991946565,
        //         "origSz": "0.1",
        //         "side": "B",
        //         "sz": "0.1",
        //         "timestamp": 1704346468838
        //     }
        // fetchClosedorders
        //    {
        //        "cloid": null,
        //        "closedPnl": "0.0",
        //        "coin": "SOL",
        //        "crossed": true,
        //        "dir": "Open Long",
        //        "fee": "0.003879",
        //        "hash": "0x4a2647998682b7f07bc5040ab531e1011400f9a51bfa0346a0b41ebe510e8875",
        //        "liquidationMarkPx": null,
        //        "oid": "6463280784",
        //        "px": "110.83",
        //        "side": "B",
        //        "startPosition": "1.64",
        //        "sz": "0.1",
        //        "tid": "232174667018988",
        //        "time": "1709142268394"
        //    }
        //
        //  fetchOrder
        //
        //     {
        //         "order": {
        //             "children": [],
        //             "cloid": null,
        //             "coin": "ETH",
        //             "isPositionTpsl": false,
        //             "isTrigger": false,
        //             "limitPx": "2000.0",
        //             "oid": "3991946565",
        //             "orderType": "Limit",
        //             "origSz": "0.1",
        //             "reduceOnly": false,
        //             "side": "B",
        //             "sz": "0.1",
        //             "tif": "Gtc",
        //             "timestamp": "1704346468838",
        //             "triggerCondition": "N/A",
        //             "triggerPx": "0.0"
        //         },
        //         "status": "open",
        //         "statusTimestamp": "1704346468838"
        //     }
        //
        // createOrder
        //
        //     {
        //         "resting": {
        //             "oid": 5063830287
        //         }
        //     }
        //
        //     {
        //        "filled":{
        //           "totalSz":"0.1",
        //           "avgPx":"100.84",
        //           "oid":6195281425
        //        }
        //     }
        // frontendOrder
        // {
        //     "children": [],
        //     "cloid": null,
        //     "coin": "BLUR",
        //     "isPositionTpsl": false,
        //     "isTrigger": true,
        //     "limitPx": "0.5",
        //     "oid": 8670487141,
        //     "orderType": "Stop Limit",
        //     "origSz": "20.0",
        //     "reduceOnly": false,
        //     "side": "B",
        //     "sz": "20.0",
        //     "tif": null,
        //     "timestamp": 1715523663687,
        //     "triggerCondition": "Price above 0.6",
        //     "triggerPx": "0.6"
        // }
        //
        const error = this.safeString(order, 'error');
        if (error !== undefined) {
            return this.safeOrder({
                'info': order,
                'status': 'rejected',
            });
        }
        let entry = this.safeDictN(order, ['order', 'resting', 'filled']);
        if (entry === undefined) {
            entry = order;
        }
        const coin = this.safeString(entry, 'coin');
        let marketId = undefined;
        if (coin !== undefined) {
            marketId = this.coinToMarketId(coin);
        }
        if (this.safeString(entry, 'id') === undefined) {
            market = this.safeMarket(marketId, undefined);
        }
        else {
            market = this.safeMarket(marketId, market);
        }
        const symbol = market['symbol'];
        const timestamp = this.safeInteger(entry, 'timestamp');
        const status = this.safeString2(order, 'status', 'ccxtStatus');
        order = this.omit(order, ['ccxtStatus']);
        let side = this.safeString(entry, 'side');
        if (side !== undefined) {
            side = (side === 'A') ? 'sell' : 'buy';
        }
        const totalAmount = this.safeString2(entry, 'origSz', 'totalSz');
        const remaining = this.safeString(entry, 'sz');
        const tif = this.safeStringUpper(entry, 'tif');
        let postOnly = undefined;
        if (tif !== undefined) {
            postOnly = (tif === 'ALO');
        }
        return this.safeOrder({
            'info': order,
            'id': this.safeString(entry, 'oid'),
            'clientOrderId': this.safeString(entry, 'cloid'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': this.safeInteger(order, 'statusTimestamp'),
            'symbol': symbol,
            'type': this.parseOrderType(this.safeStringLower(entry, 'orderType')),
            'timeInForce': tif,
            'postOnly': postOnly,
            'reduceOnly': this.safeBool(entry, 'reduceOnly'),
            'side': side,
            'price': this.safeString(entry, 'limitPx'),
            'triggerPrice': this.safeBool(entry, 'isTrigger') ? this.safeNumber(entry, 'triggerPx') : undefined,
            'amount': totalAmount,
            'cost': undefined,
            'average': this.safeString(entry, 'avgPx'),
            'filled': Precise["default"].stringSub(totalAmount, remaining),
            'remaining': remaining,
            'status': this.parseOrderStatus(status),
            'fee': undefined,
            'trades': undefined,
        }, market);
    }
    parseOrderStatus(status) {
        const statuses = {
            'triggered': 'open',
            'filled': 'closed',
            'open': 'open',
            'canceled': 'canceled',
            'rejected': 'rejected',
            'marginCanceled': 'canceled',
        };
        return this.safeString(statuses, status, status);
    }
    parseOrderType(status) {
        const statuses = {
            'stop limit': 'limit',
            'stop market': 'market',
        };
        return this.safeString(statuses, status, status);
    }
    /**
     * @method
     * @name hyperliquid#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills-by-time
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest trade
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchMyTrades', params);
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
            'user': userAddress,
        };
        if (since !== undefined) {
            request['type'] = 'userFillsByTime';
            request['startTime'] = since;
        }
        else {
            request['type'] = 'userFills';
        }
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     [
        //         {
        //             "closedPnl": "0.19343",
        //             "coin": "ETH",
        //             "crossed": true,
        //             "dir": "Close Long",
        //             "fee": "0.050062",
        //             "feeToken": "USDC",
        //             "hash": "0x09d77c96791e98b5775a04092584ab010d009445119c71e4005c0d634ea322bc",
        //             "liquidationMarkPx": null,
        //             "oid": 3929354691,
        //             "px": "2381.1",
        //             "side": "A",
        //             "startPosition": "0.0841",
        //             "sz": "0.0841",
        //             "tid": 128423918764978,
        //             "time": 1704262888911
        //         }
        //     ]
        //
        return this.parseTrades(response, market, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        //     {
        //         "closedPnl": "0.19343",
        //         "coin": "ETH",
        //         "crossed": true,
        //         "dir": "Close Long",
        //         "fee": "0.050062",
        //         "hash": "0x09d77c96791e98b5775a04092584ab010d009445119c71e4005c0d634ea322bc",
        //         "liquidationMarkPx": null,
        //         "oid": 3929354691,
        //         "px": "2381.1",
        //         "side": "A",
        //         "startPosition": "0.0841",
        //         "sz": "0.0841",
        //         "tid": 128423918764978,
        //         "time": 1704262888911
        //     }
        //
        const timestamp = this.safeInteger(trade, 'time');
        const price = this.safeString(trade, 'px');
        const amount = this.safeString(trade, 'sz');
        const coin = this.safeString(trade, 'coin');
        const marketId = this.coinToMarketId(coin);
        market = this.safeMarket(marketId, undefined);
        const symbol = market['symbol'];
        const id = this.safeString(trade, 'tid');
        let side = this.safeString(trade, 'side');
        if (side !== undefined) {
            side = (side === 'A') ? 'sell' : 'buy';
        }
        const fee = this.safeString(trade, 'fee');
        let takerOrMaker = undefined;
        const crossed = this.safeBool(trade, 'crossed');
        if (crossed !== undefined) {
            takerOrMaker = crossed ? 'taker' : 'maker';
        }
        return this.safeTrade({
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': id,
            'order': this.safeString(trade, 'oid'),
            'type': undefined,
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': price,
            'amount': amount,
            'cost': undefined,
            'fee': {
                'cost': fee,
                'currency': this.safeString(trade, 'feeToken'),
                'rate': undefined,
            },
        }, market);
    }
    /**
     * @method
     * @name hyperliquid#fetchPosition
     * @description fetch data on an open position
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-users-perpetuals-account-summary
     * @param {string} symbol unified market symbol of the market the position is held in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @returns {object} a [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
     */
    async fetchPosition(symbol, params = {}) {
        const positions = await this.fetchPositions([symbol], params);
        return this.safeDict(positions, 0, {});
    }
    /**
     * @method
     * @name hyperliquid#fetchPositions
     * @description fetch all open positions
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-users-perpetuals-account-summary
     * @param {string[]} [symbols] list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
     */
    async fetchPositions(symbols = undefined, params = {}) {
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchPositions', params);
        symbols = this.marketSymbols(symbols);
        const request = {
            'type': 'clearinghouseState',
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     {
        //         "assetPositions": [
        //             {
        //                 "position": {
        //                     "coin": "ETH",
        //                     "cumFunding": {
        //                         "allTime": "0.0",
        //                         "sinceChange": "0.0",
        //                         "sinceOpen": "0.0"
        //                     },
        //                     "entryPx": "2213.9",
        //                     "leverage": {
        //                         "rawUsd": "-475.23904",
        //                         "type": "isolated",
        //                         "value": "20"
        //                     },
        //                     "liquidationPx": "2125.00856238",
        //                     "marginUsed": "24.88097",
        //                     "maxLeverage": "50",
        //                     "positionValue": "500.12001",
        //                     "returnOnEquity": "0.0",
        //                     "szi": "0.2259",
        //                     "unrealizedPnl": "0.0"
        //                 },
        //                 "type": "oneWay"
        //             }
        //         ],
        //         "crossMaintenanceMarginUsed": "0.0",
        //         "crossMarginSummary": {
        //             "accountValue": "100.0",
        //             "totalMarginUsed": "0.0",
        //             "totalNtlPos": "0.0",
        //             "totalRawUsd": "100.0"
        //         },
        //         "marginSummary": {
        //             "accountValue": "100.0",
        //             "totalMarginUsed": "0.0",
        //             "totalNtlPos": "0.0",
        //             "totalRawUsd": "100.0"
        //         },
        //         "time": "1704261007014",
        //         "withdrawable": "100.0"
        //     }
        //
        const data = this.safeList(response, 'assetPositions', []);
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(this.parsePosition(data[i], undefined));
        }
        return this.filterByArrayPositions(result, 'symbol', symbols, false);
    }
    parsePosition(position, market = undefined) {
        //
        //     {
        //         "position": {
        //             "coin": "ETH",
        //             "cumFunding": {
        //                 "allTime": "0.0",
        //                 "sinceChange": "0.0",
        //                 "sinceOpen": "0.0"
        //             },
        //             "entryPx": "2213.9",
        //             "leverage": {
        //                 "rawUsd": "-475.23904",
        //                 "type": "isolated",
        //                 "value": "20"
        //             },
        //             "liquidationPx": "2125.00856238",
        //             "marginUsed": "24.88097",
        //             "maxLeverage": "50",
        //             "positionValue": "500.12001",
        //             "returnOnEquity": "0.0",
        //             "szi": "0.2259",
        //             "unrealizedPnl": "0.0"
        //         },
        //         "type": "oneWay"
        //     }
        //
        const entry = this.safeDict(position, 'position', {});
        const coin = this.safeString(entry, 'coin');
        const marketId = this.coinToMarketId(coin);
        market = this.safeMarket(marketId, undefined);
        const symbol = market['symbol'];
        const leverage = this.safeDict(entry, 'leverage', {});
        const marginMode = this.safeString(leverage, 'type');
        const isIsolated = (marginMode === 'isolated');
        const rawSize = this.safeString(entry, 'szi');
        let size = rawSize;
        let side = undefined;
        if (size !== undefined) {
            side = Precise["default"].stringGt(rawSize, '0') ? 'long' : 'short';
            size = Precise["default"].stringAbs(size);
        }
        const rawUnrealizedPnl = this.safeString(entry, 'unrealizedPnl');
        const absRawUnrealizedPnl = Precise["default"].stringAbs(rawUnrealizedPnl);
        const initialMargin = this.safeString(entry, 'marginUsed');
        const percentage = Precise["default"].stringMul(Precise["default"].stringDiv(absRawUnrealizedPnl, initialMargin), '100');
        return this.safePosition({
            'info': position,
            'id': undefined,
            'symbol': symbol,
            'timestamp': undefined,
            'datetime': undefined,
            'isolated': isIsolated,
            'hedged': undefined,
            'side': side,
            'contracts': this.parseNumber(size),
            'contractSize': undefined,
            'entryPrice': this.safeNumber(entry, 'entryPx'),
            'markPrice': undefined,
            'notional': this.safeNumber(entry, 'positionValue'),
            'leverage': this.safeNumber(leverage, 'value'),
            'collateral': this.safeNumber(entry, 'marginUsed'),
            'initialMargin': this.parseNumber(initialMargin),
            'maintenanceMargin': undefined,
            'initialMarginPercentage': undefined,
            'maintenanceMarginPercentage': undefined,
            'unrealizedPnl': this.parseNumber(rawUnrealizedPnl),
            'liquidationPrice': this.safeNumber(entry, 'liquidationPx'),
            'marginMode': marginMode,
            'percentage': this.parseNumber(percentage),
        });
    }
    /**
     * @method
     * @name hyperliquid#setMarginMode
     * @description set margin mode (symbol)
     * @param {string} marginMode margin mode must be either [isolated, cross]
     * @param {string} symbol unified market symbol of the market the position is held in, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.leverage] the rate of leverage, is required if setting trade mode (symbol)
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} response from the exchange
     */
    async setMarginMode(marginMode, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setMarginMode() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const leverage = this.safeInteger(params, 'leverage');
        if (leverage === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setMarginMode() requires a leverage parameter');
        }
        const asset = this.parseToInt(market['baseId']);
        const isCross = (marginMode === 'cross');
        const nonce = this.milliseconds();
        params = this.omit(params, ['leverage']);
        const updateAction = {
            'type': 'updateLeverage',
            'asset': asset,
            'isCross': isCross,
            'leverage': leverage,
        };
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'setMarginMode', 'vaultAddress', 'subAccountAddress');
        if (vaultAddress !== undefined) {
            if (vaultAddress.startsWith('0x')) {
                vaultAddress = vaultAddress.replace('0x', '');
            }
        }
        const signature = this.signL1Action(updateAction, nonce, vaultAddress);
        const request = {
            'action': updateAction,
            'nonce': nonce,
            'signature': signature,
            // 'vaultAddress': vaultAddress,
        };
        if (vaultAddress !== undefined) {
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         'response': {
        //             'type': 'default'
        //         },
        //         'status': 'ok'
        //     }
        //
        return response;
    }
    /**
     * @method
     * @name hyperliquid#setLeverage
     * @description set the level of leverage for a market
     * @param {float} leverage the rate of leverage
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] margin mode must be either [isolated, cross], default is cross
     * @returns {object} response from the exchange
     */
    async setLeverage(leverage, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const marginMode = this.safeString(params, 'marginMode', 'cross');
        const isCross = (marginMode === 'cross');
        const asset = this.parseToInt(market['baseId']);
        const nonce = this.milliseconds();
        params = this.omit(params, 'marginMode');
        const updateAction = {
            'type': 'updateLeverage',
            'asset': asset,
            'isCross': isCross,
            'leverage': leverage,
        };
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'setLeverage', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(updateAction, nonce, vaultAddress);
        const request = {
            'action': updateAction,
            'nonce': nonce,
            'signature': signature,
            // 'vaultAddress': vaultAddress,
        };
        if (vaultAddress !== undefined) {
            params = this.omit(params, 'vaultAddress');
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         'response': {
        //             'type': 'default'
        //         },
        //         'status': 'ok'
        //     }
        //
        return response;
    }
    /**
     * @method
     * @name hyperliquid#addMargin
     * @description add margin
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#update-isolated-margin
     * @param {string} symbol unified market symbol
     * @param {float} amount amount of margin to add
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=add-margin-structure}
     */
    async addMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, amount, 'add', params);
    }
    /**
     * @method
     * @name hyperliquid#reduceMargin
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#update-isolated-margin
     * @description remove margin from a position
     * @param {string} symbol unified market symbol
     * @param {float} amount the amount of margin to remove
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] the vault address
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=reduce-margin-structure}
     */
    async reduceMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, amount, 'reduce', params);
    }
    async modifyMarginHelper(symbol, amount, type, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const asset = this.parseToInt(market['baseId']);
        let sz = this.parseToInt(Precise["default"].stringMul(this.amountToPrecision(symbol, amount), '1000000'));
        if (type === 'reduce') {
            sz = -sz;
        }
        const nonce = this.milliseconds();
        const updateAction = {
            'type': 'updateIsolatedMargin',
            'asset': asset,
            'isBuy': true,
            'ntli': sz,
        };
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'modifyMargin', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        const signature = this.signL1Action(updateAction, nonce, vaultAddress);
        const request = {
            'action': updateAction,
            'nonce': nonce,
            'signature': signature,
            // 'vaultAddress': vaultAddress,
        };
        if (vaultAddress !== undefined) {
            request['vaultAddress'] = vaultAddress;
        }
        const response = await this.privatePostExchange(request);
        //
        //     {
        //         'response': {
        //             'type': 'default'
        //         },
        //         'status': 'ok'
        //     }
        //
        return this.extend(this.parseMarginModification(response, market), {
            'code': this.safeString(response, 'status'),
        });
    }
    parseMarginModification(data, market = undefined) {
        //
        //    {
        //        'type': 'default'
        //    }
        //
        return {
            'info': data,
            'symbol': this.safeSymbol(undefined, market),
            'type': undefined,
            'marginMode': 'isolated',
            'amount': undefined,
            'total': undefined,
            'code': this.safeString(market, 'settle'),
            'status': undefined,
            'timestamp': undefined,
            'datetime': undefined,
        };
    }
    /**
     * @method
     * @name hyperliquid#transfer
     * @description transfer currency internally between wallets on the same account
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#l1-usdc-transfer
     * @param {string} code unified currency code
     * @param {float} amount amount to transfer
     * @param {string} fromAccount account to transfer from *spot, swap*
     * @param {string} toAccount account to transfer to *swap, spot or address*
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] the vault address for order
     * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        this.checkRequiredCredentials();
        await this.loadMarkets();
        const isSandboxMode = this.safeBool(this.options, 'sandboxMode');
        const nonce = this.milliseconds();
        if (this.inArray(fromAccount, ['spot', 'swap', 'perp'])) {
            // handle swap <> spot account transfer
            if (!this.inArray(toAccount, ['spot', 'swap', 'perp'])) {
                throw new errors.NotSupported(this.id + ' transfer() only support spot <> swap transfer');
            }
            let strAmount = this.numberToString(amount);
            let vaultAddress = undefined;
            [vaultAddress, params] = this.handleOptionAndParams(params, 'transfer', 'vaultAddress');
            vaultAddress = this.formatVaultAddress(vaultAddress);
            if (vaultAddress !== undefined) {
                strAmount = strAmount + ' subaccount:' + vaultAddress;
            }
            const toPerp = (toAccount === 'perp') || (toAccount === 'swap');
            const transferPayload = {
                'hyperliquidChain': isSandboxMode ? 'Testnet' : 'Mainnet',
                'amount': strAmount,
                'toPerp': toPerp,
                'nonce': nonce,
            };
            const transferSig = this.buildUsdClassSendSig(transferPayload);
            const transferRequest = {
                'action': {
                    'hyperliquidChain': transferPayload['hyperliquidChain'],
                    'signatureChainId': '0x66eee',
                    'type': 'usdClassTransfer',
                    'amount': strAmount,
                    'toPerp': toPerp,
                    'nonce': nonce,
                },
                'nonce': nonce,
                'signature': transferSig,
            };
            if (vaultAddress !== undefined) {
                transferRequest['vaultAddress'] = vaultAddress;
            }
            const transferResponse = await this.privatePostExchange(transferRequest);
            return transferResponse;
        }
        // transfer between main account and subaccount
        if (code !== undefined) {
            code = code.toUpperCase();
            if (code !== 'USDC') {
                throw new errors.NotSupported(this.id + ' transfer() only support USDC');
            }
        }
        let isDeposit = false;
        let subAccountAddress = undefined;
        if (fromAccount === 'main') {
            subAccountAddress = toAccount;
            isDeposit = true;
        }
        else if (toAccount === 'main') {
            subAccountAddress = fromAccount;
        }
        else {
            throw new errors.NotSupported(this.id + ' transfer() only support main <> subaccount transfer');
        }
        this.checkAddress(subAccountAddress);
        const usd = this.parseToInt(Precise["default"].stringMul(this.numberToString(amount), '1000000'));
        const action = {
            'type': 'subAccountTransfer',
            'subAccountUser': subAccountAddress,
            'isDeposit': isDeposit,
            'usd': usd,
        };
        const sig = this.signL1Action(action, nonce);
        const request = {
            'action': action,
            'nonce': nonce,
            'signature': sig,
        };
        const response = await this.privatePostExchange(request);
        //
        // {'response': {'type': 'default'}, 'status': 'ok'}
        //
        return this.parseTransfer(response);
    }
    parseTransfer(transfer, currency = undefined) {
        //
        // {'response': {'type': 'default'}, 'status': 'ok'}
        //
        return {
            'info': transfer,
            'id': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'currency': undefined,
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': 'ok',
        };
    }
    /**
     * @method
     * @name hyperliquid#withdraw
     * @description make a withdrawal (only support USDC)
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#initiate-a-withdrawal-request
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#deposit-or-withdraw-from-a-vault
     * @param {string} code unified currency code
     * @param {float} amount the amount to withdraw
     * @param {string} address the address to withdraw to
     * @param {string} tag
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.vaultAddress] vault address withdraw from
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        this.checkRequiredCredentials();
        await this.loadMarkets();
        this.checkAddress(address);
        if (code !== undefined) {
            code = code.toUpperCase();
            if (code !== 'USDC') {
                throw new errors.NotSupported(this.id + ' withdraw() only support USDC');
            }
        }
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams(params, 'withdraw', 'vaultAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        params = this.omit(params, 'vaultAddress');
        const nonce = this.milliseconds();
        let action = {};
        let sig = undefined;
        if (vaultAddress !== undefined) {
            action = {
                'type': 'vaultTransfer',
                'vaultAddress': '0x' + vaultAddress,
                'isDeposit': false,
                'usd': amount,
            };
            sig = this.signL1Action(action, nonce);
        }
        else {
            const isSandboxMode = this.safeBool(this.options, 'sandboxMode', false);
            const payload = {
                'hyperliquidChain': isSandboxMode ? 'Testnet' : 'Mainnet',
                'destination': address,
                'amount': amount.toString(),
                'time': nonce,
            };
            sig = this.buildWithdrawSig(payload);
            action = {
                'hyperliquidChain': payload['hyperliquidChain'],
                'signatureChainId': '0x66eee',
                'destination': address,
                'amount': amount.toString(),
                'time': nonce,
                'type': 'withdraw3',
            };
        }
        const request = {
            'action': action,
            'nonce': nonce,
            'signature': sig,
        };
        const response = await this.privatePostExchange(request);
        return this.parseTransaction(response);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        // { status: 'ok', response: { type: 'default' } }
        //
        // fetchDeposits / fetchWithdrawals
        // {
        //     "time":1724762307531,
        //     "hash":"0x620a234a7e0eb7930575040f59482a01050058b0802163b4767bfd9033e77781",
        //     "delta":{
        //         "type":"accountClassTransfer",
        //         "usdc":"50.0",
        //         "toPerp":false
        //     }
        // }
        //
        const timestamp = this.safeInteger(transaction, 'time');
        const delta = this.safeDict(transaction, 'delta', {});
        let fee = undefined;
        const feeCost = this.safeInteger(delta, 'fee');
        if (feeCost !== undefined) {
            fee = {
                'currency': 'USDC',
                'cost': feeCost,
            };
        }
        let internal = undefined;
        const type = this.safeString(delta, 'type');
        if (type !== undefined) {
            internal = (type === 'internalTransfer');
        }
        return {
            'info': transaction,
            'id': undefined,
            'txid': this.safeString(transaction, 'hash'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'network': undefined,
            'address': undefined,
            'addressTo': this.safeString(delta, 'destination'),
            'addressFrom': this.safeString(delta, 'user'),
            'tag': undefined,
            'tagTo': undefined,
            'tagFrom': undefined,
            'type': undefined,
            'amount': this.safeNumber(delta, 'usdc'),
            'currency': undefined,
            'status': this.safeString(transaction, 'status'),
            'updated': undefined,
            'comment': undefined,
            'internal': internal,
            'fee': fee,
        };
    }
    /**
     * @method
     * @name hyperliquid#fetchTradingFee
     * @description fetch the trading fees for a market
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.user] user address, will default to this.walletAddress if not provided
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchTradingFee(symbol, params = {}) {
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchTradingFee', params);
        const market = this.market(symbol);
        const request = {
            'type': 'userFees',
            'user': userAddress,
        };
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        //     {
        //         "dailyUserVlm": [
        //             {
        //                 "date": "2024-07-08",
        //                 "userCross": "0.0",
        //                 "userAdd": "0.0",
        //                 "exchange": "90597185.23639999"
        //             }
        //         ],
        //         "feeSchedule": {
        //             "cross": "0.00035",
        //             "add": "0.0001",
        //             "tiers": {
        //                 "vip": [
        //                     {
        //                         "ntlCutoff": "5000000.0",
        //                         "cross": "0.0003",
        //                         "add": "0.00005"
        //                     }
        //                 ],
        //                 "mm": [
        //                     {
        //                         "makerFractionCutoff": "0.005",
        //                         "add": "-0.00001"
        //                     }
        //                 ]
        //             },
        //             "referralDiscount": "0.04"
        //         },
        //         "userCrossRate": "0.00035",
        //         "userAddRate": "0.0001",
        //         "activeReferralDiscount": "0.0"
        //     }
        //
        const data = {
            'userCrossRate': this.safeString(response, 'userCrossRate'),
            'userAddRate': this.safeString(response, 'userAddRate'),
        };
        return this.parseTradingFee(data, market);
    }
    parseTradingFee(fee, market = undefined) {
        //
        //     {
        //         "dailyUserVlm": [
        //             {
        //                 "date": "2024-07-08",
        //                 "userCross": "0.0",
        //                 "userAdd": "0.0",
        //                 "exchange": "90597185.23639999"
        //             }
        //         ],
        //         "feeSchedule": {
        //             "cross": "0.00035",
        //             "add": "0.0001",
        //             "tiers": {
        //                 "vip": [
        //                     {
        //                         "ntlCutoff": "5000000.0",
        //                         "cross": "0.0003",
        //                         "add": "0.00005"
        //                     }
        //                 ],
        //                 "mm": [
        //                     {
        //                         "makerFractionCutoff": "0.005",
        //                         "add": "-0.00001"
        //                     }
        //                 ]
        //             },
        //             "referralDiscount": "0.04"
        //         },
        //         "userCrossRate": "0.00035",
        //         "userAddRate": "0.0001",
        //         "activeReferralDiscount": "0.0"
        //     }
        //
        const symbol = this.safeSymbol(undefined, market);
        return {
            'info': fee,
            'symbol': symbol,
            'maker': this.safeNumber(fee, 'userAddRate'),
            'taker': this.safeNumber(fee, 'userCrossRate'),
            'percentage': undefined,
            'tierBased': undefined,
        };
    }
    /**
     * @method
     * @name hyperliquid#fetchLedger
     * @description fetch the history of changes, actions done by the user or operations that altered the balance of the user
     * @param {string} [code] unified currency code
     * @param {int} [since] timestamp in ms of the earliest ledger entry
     * @param {int} [limit] max number of ledger entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest ledger entry
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger}
     */
    async fetchLedger(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchLedger', params);
        const request = {
            'type': 'userNonFundingLedgerUpdates',
            'user': userAddress,
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const until = this.safeInteger(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
            params = this.omit(params, ['until']);
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        // [
        //     {
        //         "time":1724762307531,
        //         "hash":"0x620a234a7e0eb7930575040f59482a01050058b0802163b4767bfd9033e77781",
        //         "delta":{
        //             "type":"accountClassTransfer",
        //             "usdc":"50.0",
        //             "toPerp":false
        //         }
        //     }
        // ]
        //
        return this.parseLedger(response, undefined, since, limit);
    }
    parseLedgerEntry(item, currency = undefined) {
        //
        // {
        //     "time":1724762307531,
        //     "hash":"0x620a234a7e0eb7930575040f59482a01050058b0802163b4767bfd9033e77781",
        //     "delta":{
        //         "type":"accountClassTransfer",
        //         "usdc":"50.0",
        //         "toPerp":false
        //     }
        // }
        //
        const timestamp = this.safeInteger(item, 'time');
        const delta = this.safeDict(item, 'delta', {});
        let fee = undefined;
        const feeCost = this.safeInteger(delta, 'fee');
        if (feeCost !== undefined) {
            fee = {
                'currency': 'USDC',
                'cost': feeCost,
            };
        }
        const type = this.safeString(delta, 'type');
        const amount = this.safeString(delta, 'usdc');
        return this.safeLedgerEntry({
            'info': item,
            'id': this.safeString(item, 'hash'),
            'direction': undefined,
            'account': undefined,
            'referenceAccount': this.safeString(delta, 'user'),
            'referenceId': this.safeString(item, 'hash'),
            'type': this.parseLedgerEntryType(type),
            'currency': undefined,
            'amount': this.parseNumber(amount),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'before': undefined,
            'after': undefined,
            'status': undefined,
            'fee': fee,
        }, currency);
    }
    parseLedgerEntryType(type) {
        const ledgerType = {
            'internalTransfer': 'transfer',
            'accountClassTransfer': 'transfer',
        };
        return this.safeString(ledgerType, type, type);
    }
    /**
     * @method
     * @name hyperliquid#fetchDeposits
     * @description fetch all deposits made to an account
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch withdrawals for
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchDepositsWithdrawals', params);
        const request = {
            'type': 'userNonFundingLedgerUpdates',
            'user': userAddress,
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const until = this.safeInteger(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
            params = this.omit(params, ['until']);
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        // [
        //     {
        //         "time":1724762307531,
        //         "hash":"0x620a234a7e0eb7930575040f59482a01050058b0802163b4767bfd9033e77781",
        //         "delta":{
        //             "type":"accountClassTransfer",
        //             "usdc":"50.0",
        //             "toPerp":false
        //         }
        //     }
        // ]
        //
        const records = this.extractTypeFromDelta(response);
        const deposits = this.filterByArray(records, 'type', ['deposit'], false);
        return this.parseTransactions(deposits, undefined, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch withdrawals for
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchDepositsWithdrawals', params);
        const request = {
            'type': 'userNonFundingLedgerUpdates',
            'user': userAddress,
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const until = this.safeInteger(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
            params = this.omit(params, ['until']);
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        // [
        //     {
        //         "time":1724762307531,
        //         "hash":"0x620a234a7e0eb7930575040f59482a01050058b0802163b4767bfd9033e77781",
        //         "delta":{
        //             "type":"accountClassTransfer",
        //             "usdc":"50.0",
        //             "toPerp":false
        //         }
        //     }
        // ]
        //
        const records = this.extractTypeFromDelta(response);
        const withdrawals = this.filterByArray(records, 'type', ['withdraw'], false);
        return this.parseTransactions(withdrawals, undefined, since, limit);
    }
    /**
     * @method
     * @name hyperliquid#fetchOpenInterests
     * @description Retrieves the open interest for a list of symbols
     * @param {string[]} [symbols] Unified CCXT market symbol
     * @param {object} [params] exchange specific parameters
     * @returns {object} an open interest structure{@link https://docs.ccxt.com/#/?id=open-interest-structure}
     */
    async fetchOpenInterests(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const swapMarkets = await this.fetchSwapMarkets();
        return this.parseOpenInterests(swapMarkets, symbols);
    }
    /**
     * @method
     * @name hyperliquid#fetchOpenInterest
     * @description retrieves the open interest of a contract trading pair
     * @param {string} symbol unified CCXT market symbol
     * @param {object} [params] exchange specific parameters
     * @returns {object} an [open interest structure]{@link https://docs.ccxt.com/#/?id=open-interest-structure}
     */
    async fetchOpenInterest(symbol, params = {}) {
        symbol = this.symbol(symbol);
        await this.loadMarkets();
        const ois = await this.fetchOpenInterests([symbol], params);
        return ois[symbol];
    }
    parseOpenInterest(interest, market = undefined) {
        //
        //  {
        //      szDecimals: '2',
        //      name: 'HYPE',
        //      maxLeverage: '3',
        //      funding: '0.00014735',
        //      openInterest: '14677900.74',
        //      prevDayPx: '26.145',
        //      dayNtlVlm: '299643445.12560016',
        //      premium: '0.00081613',
        //      oraclePx: '27.569',
        //      markPx: '27.63',
        //      midPx: '27.599',
        //      impactPxs: [ '27.5915', '27.6319' ],
        //      dayBaseVlm: '10790652.83',
        //      baseId: 159
        //  }
        //
        interest = this.safeDict(interest, 'info', {});
        const coin = this.safeString(interest, 'name');
        let marketId = undefined;
        if (coin !== undefined) {
            marketId = this.coinToMarketId(coin);
        }
        return this.safeOpenInterest({
            'symbol': this.safeSymbol(marketId),
            'openInterestAmount': this.safeNumber(interest, 'openInterest'),
            'openInterestValue': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'info': interest,
        }, market);
    }
    /**
     * @method
     * @name hyperliquid#fetchFundingHistory
     * @description fetch the history of funding payments paid and received on this account
     * @param {string} [symbol] unified market symbol
     * @param {int} [since] the earliest time in ms to fetch funding history for
     * @param {int} [limit] the maximum number of funding history structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.subAccountAddress] sub account user address
     * @returns {object} a [funding history structure]{@link https://docs.ccxt.com/#/?id=funding-history-structure}
     */
    async fetchFundingHistory(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchFundingHistory', params);
        const request = {
            'user': userAddress,
            'type': 'userFunding',
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.publicPostInfo(this.extend(request, params));
        //
        // [
        //     {
        //         "time": 1734026400057,
        //         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        //         "delta": {
        //             "type": "funding",
        //             "coin": "SOL",
        //             "usdc": "75.635093",
        //             "szi": "-7375.9",
        //             "fundingRate": "0.00004381",
        //             "nSamples": null
        //         }
        //     }
        // ]
        //
        return this.parseIncomes(response, market, since, limit);
    }
    parseIncome(income, market = undefined) {
        //
        // {
        //     "time": 1734026400057,
        //     "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        //     "delta": {
        //         "type": "funding",
        //         "coin": "SOL",
        //         "usdc": "75.635093",
        //         "szi": "-7375.9",
        //         "fundingRate": "0.00004381",
        //         "nSamples": null
        //     }
        // }
        //
        const id = this.safeString(income, 'hash');
        const timestamp = this.safeInteger(income, 'time');
        const delta = this.safeDict(income, 'delta');
        const baseId = this.safeString(delta, 'coin');
        const marketSymbol = baseId + '/USDC:USDC';
        market = this.safeMarket(marketSymbol);
        const symbol = market['symbol'];
        const amount = this.safeString(delta, 'usdc');
        const code = this.safeCurrencyCode('USDC');
        const rate = this.safeNumber(delta, 'fundingRate');
        return {
            'info': income,
            'symbol': symbol,
            'code': code,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'id': id,
            'amount': this.parseNumber(amount),
            'rate': rate,
        };
    }
    extractTypeFromDelta(data = []) {
        const records = [];
        for (let i = 0; i < data.length; i++) {
            const record = data[i];
            record['type'] = record['delta']['type'];
            records.push(record);
        }
        return records;
    }
    formatVaultAddress(address = undefined) {
        if (address === undefined) {
            return undefined;
        }
        if (address.startsWith('0x')) {
            return address.replace('0x', '');
        }
        return address;
    }
    handlePublicAddress(methodName, params) {
        let userAux = undefined;
        [userAux, params] = this.handleOptionAndParams2(params, methodName, 'user', 'subAccountAddress');
        let user = userAux;
        [user, params] = this.handleOptionAndParams(params, methodName, 'address', userAux);
        if ((user !== undefined) && (user !== '')) {
            return [user, params];
        }
        if ((this.walletAddress !== undefined) && (this.walletAddress !== '')) {
            return [this.walletAddress, params];
        }
        throw new errors.ArgumentsRequired(this.id + ' ' + methodName + '() requires a user parameter inside \'params\' or the wallet address set');
    }
    coinToMarketId(coin) {
        if (coin.indexOf('/') > -1 || coin.indexOf('@') > -1) {
            return coin; // spot
        }
        return this.safeCurrencyCode(coin) + '/USDC:USDC';
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (!response) {
            return undefined; // fallback to default error handler
        }
        // {"status":"err","response":"User or API Wallet 0xb8a6f8b26223de27c31938d56e470a5b832703a5 does not exist."}
        //
        //     {
        //         status: 'ok',
        //         response: { type: 'order', data: { statuses: [ { error: 'Insufficient margin to place order. asset=4' } ] } }
        //     }
        // {"status":"ok","response":{"type":"order","data":{"statuses":[{"error":"Insufficient margin to place order. asset=84"}]}}}
        //
        const status = this.safeString(response, 'status', '');
        const error = this.safeString(response, 'error');
        let message = undefined;
        if (status === 'err') {
            message = this.safeString(response, 'response');
        }
        else if (error !== undefined) {
            message = error;
        }
        else {
            const responsePayload = this.safeDict(response, 'response', {});
            const data = this.safeDict(responsePayload, 'data', {});
            const statuses = this.safeList(data, 'statuses', []);
            const firstStatus = this.safeDict(statuses, 0);
            message = this.safeString(firstStatus, 'error');
        }
        const feedback = this.id + ' ' + body;
        const nonEmptyMessage = ((message !== undefined) && (message !== ''));
        if (nonEmptyMessage) {
            this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
        }
        if (nonEmptyMessage) {
            throw new errors.ExchangeError(feedback); // unknown message
        }
        return undefined;
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const url = this.implodeHostname(this.urls['api'][api]) + '/' + path;
        if (method === 'POST') {
            headers = {
                'Content-Type': 'application/json',
            };
            body = this.json(params);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    calculateRateLimiterCost(api, method, path, params, config = {}) {
        if (('byType' in config) && ('type' in params)) {
            const type = params['type'];
            const byType = config['byType'];
            if (type in byType) {
                return byType[type];
            }
        }
        return this.safeValue(config, 'cost', 1);
    }
    parseCreateEditOrderArgs(id, symbol, type, side, amount, price = undefined, params = {}) {
        const market = this.market(symbol);
        let vaultAddress = undefined;
        [vaultAddress, params] = this.handleOptionAndParams2(params, 'createOrder', 'vaultAddress', 'subAccountAddress');
        vaultAddress = this.formatVaultAddress(vaultAddress);
        symbol = market['symbol'];
        const order = {
            'symbol': symbol,
            'type': type,
            'side': side,
            'amount': amount,
            'price': price,
            'params': params,
        };
        const globalParams = {};
        if (vaultAddress !== undefined) {
            globalParams['vaultAddress'] = vaultAddress;
        }
        if (id !== undefined) {
            order['id'] = id;
        }
        return [order, globalParams];
    }
}

module.exports = hyperliquid;
