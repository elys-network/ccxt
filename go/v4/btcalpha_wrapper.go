package ccxt

type Btcalpha struct {
   *btcalpha
   Core *btcalpha
   exchangeTyped *ExchangeTyped
}

func NewBtcalpha(userConfig map[string]interface{}) *Btcalpha {
   p := &btcalpha{}
   p.Init(userConfig)
   return &Btcalpha{
       btcalpha: p,
       Core:  p,
       exchangeTyped: NewExchangeTyped(&p.Exchange),
   }
}

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


/**
 * @method
 * @name btcalpha#fetchMarkets
 * @description retrieves data on all markets for btcalpha
 * @see https://btc-alpha.github.io/api-docs/#list-all-currencies
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} an array of objects representing market data
 */
func (this *Btcalpha) FetchMarkets(params ...interface{}) ([]MarketInterface, error) {
    res := <- this.Core.FetchMarkets(params...)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewMarketInterfaceArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchTickers
 * @see https://btc-alpha.github.io/api-docs/#tickers
 * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
 * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Btcalpha) FetchTickers(options ...FetchTickersOptions) (Tickers, error) {

    opts := FetchTickersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbols interface{} = nil
    if opts.Symbols != nil {
        symbols = *opts.Symbols
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTickers(symbols, params)
    if IsError(res) {
        return Tickers{}, CreateReturnError(res)
    }
    return NewTickers(res), nil
}
/**
 * @method
 * @name btcalpha#fetchTicker
 * @see https://btc-alpha.github.io/api-docs/#tickers
 * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
 * @param {string} symbol unified symbol of the market to fetch the ticker for
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Btcalpha) FetchTicker(symbol string, options ...FetchTickerOptions) (Ticker, error) {

    opts := FetchTickerOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTicker(symbol, params)
    if IsError(res) {
        return Ticker{}, CreateReturnError(res)
    }
    return NewTicker(res), nil
}
/**
 * @method
 * @name btcalpha#fetchOrderBook
 * @see https://btc-alpha.github.io/api-docs/#get-orderbook
 * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
 * @param {string} symbol unified symbol of the market to fetch the order book for
 * @param {int} [limit] the maximum amount of order book entries to return
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
 */
func (this *Btcalpha) FetchOrderBook(symbol string, options ...FetchOrderBookOptions) (OrderBook, error) {

    opts := FetchOrderBookOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOrderBook(symbol, limit, params)
    if IsError(res) {
        return OrderBook{}, CreateReturnError(res)
    }
    return NewOrderBook(res), nil
}
/**
 * @method
 * @name btcalpha#fetchTrades
 * @description get the list of most recent trades for a particular symbol
 * @see https://btc-alpha.github.io/api-docs/#list-all-exchanges
 * @param {string} symbol unified symbol of the market to fetch trades for
 * @param {int} [since] timestamp in ms of the earliest trade to fetch
 * @param {int} [limit] the maximum amount of trades to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
 */
func (this *Btcalpha) FetchTrades(symbol string, options ...FetchTradesOptions) ([]Trade, error) {

    opts := FetchTradesOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTrades(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTradeArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchDeposits
 * @description fetch all deposits made to an account
 * @see https://btc-alpha.github.io/api-docs/#list-own-deposits
 * @param {string} code unified currency code
 * @param {int} [since] the earliest time in ms to fetch deposits for
 * @param {int} [limit] the maximum number of deposits structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Btcalpha) FetchDeposits(options ...FetchDepositsOptions) ([]Transaction, error) {

    opts := FetchDepositsOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var code interface{} = nil
    if opts.Code != nil {
        code = *opts.Code
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchDeposits(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTransactionArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchWithdrawals
 * @description fetch all withdrawals made from an account
 * @see https://btc-alpha.github.io/api-docs/#list-own-made-withdraws
 * @param {string} code unified currency code
 * @param {int} [since] the earliest time in ms to fetch withdrawals for
 * @param {int} [limit] the maximum number of withdrawals structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Btcalpha) FetchWithdrawals(options ...FetchWithdrawalsOptions) ([]Transaction, error) {

    opts := FetchWithdrawalsOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var code interface{} = nil
    if opts.Code != nil {
        code = *opts.Code
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchWithdrawals(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTransactionArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchOHLCV
 * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
 * @see https://btc-alpha.github.io/api-docs/#charts
 * @param {string} symbol unified symbol of the market to fetch OHLCV data for
 * @param {string} timeframe the length of time each candle represents
 * @param {int} [since] timestamp in ms of the earliest candle to fetch
 * @param {int} [limit] the maximum amount of candles to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
 */
func (this *Btcalpha) FetchOHLCV(symbol string, options ...FetchOHLCVOptions) ([]OHLCV, error) {

    opts := FetchOHLCVOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var timeframe interface{} = nil
    if opts.Timeframe != nil {
        timeframe = *opts.Timeframe
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOHLCV(symbol, timeframe, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOHLCVArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchBalance
 * @description query for balance and get the amount of funds available for trading or funds locked in orders
 * @see https://btc-alpha.github.io/api-docs/#list-own-wallets
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
 */
func (this *Btcalpha) FetchBalance(params ...interface{}) (Balances, error) {
    res := <- this.Core.FetchBalance(params...)
    if IsError(res) {
        return Balances{}, CreateReturnError(res)
    }
    return NewBalances(res), nil
}
/**
 * @method
 * @name btcalpha#createOrder
 * @see https://btc-alpha.github.io/api-docs/#create-order
 * @description create a trade order
 * @param {string} symbol unified symbol of the market to create an order in
 * @param {string} type 'limit'
 * @param {string} side 'buy' or 'sell'
 * @param {float} amount how much of currency you want to trade in units of base currency
 * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) CreateOrder(symbol string, typeVar string, side string, amount float64, options ...CreateOrderOptions) (Order, error) {

    opts := CreateOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var price interface{} = nil
    if opts.Price != nil {
        price = *opts.Price
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.CreateOrder(symbol, typeVar, side, amount, price, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name btcalpha#cancelOrder
 * @see https://btc-alpha.github.io/api-docs/#cancel-order
 * @description cancels an open order
 * @param {string} id order id
 * @param {string} symbol unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) CancelOrder(id string, options ...CancelOrderOptions) (Order, error) {

    opts := CancelOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.CancelOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name btcalpha#fetchOrder
 * @see https://btc-alpha.github.io/api-docs/#retrieve-single-order
 * @description fetches information on an order made by the user
 * @param {string} id the order id
 * @param {string} symbol not used by btcalpha fetchOrder
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) FetchOrder(id string, options ...FetchOrderOptions) (Order, error) {

    opts := FetchOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name btcalpha#fetchOrders
 * @see https://btc-alpha.github.io/api-docs/#list-own-orders
 * @description fetches information on multiple orders made by the user
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] the earliest time in ms to fetch orders for
 * @param {int} [limit] the maximum number of order structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) FetchOrders(options ...FetchOrdersOptions) ([]Order, error) {

    opts := FetchOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchOpenOrders
 * @description fetch all unfilled currently open orders
 * @see https://btc-alpha.github.io/api-docs/#list-own-orders
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch open orders for
 * @param {int} [limit] the maximum number of  open orders structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) FetchOpenOrders(options ...FetchOpenOrdersOptions) ([]Order, error) {

    opts := FetchOpenOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOpenOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchClosedOrders
 * @description fetches information on multiple closed orders made by the user
 * @see https://btc-alpha.github.io/api-docs/#list-own-orders
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] the earliest time in ms to fetch orders for
 * @param {int} [limit] the maximum number of order structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Btcalpha) FetchClosedOrders(options ...FetchClosedOrdersOptions) ([]Order, error) {

    opts := FetchClosedOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchClosedOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name btcalpha#fetchMyTrades
 * @description fetch all trades made by the user
 * @see https://btc-alpha.github.io/api-docs/#list-own-exchanges
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch trades for
 * @param {int} [limit] the maximum number of trades structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
 */
func (this *Btcalpha) FetchMyTrades(options ...FetchMyTradesOptions) ([]Trade, error) {

    opts := FetchMyTradesOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchMyTrades(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTradeArray(res), nil
}
// missing typed methods from base
//nolint
func (this *Btcalpha) CancelAllOrders(options ...CancelAllOrdersOptions) ([]Order, error) {return this.exchangeTyped.CancelAllOrders(options...)}
func (this *Btcalpha) CancelAllOrdersAfter(timeout int64, options ...CancelAllOrdersAfterOptions) (map[string]interface{}, error) {return this.exchangeTyped.CancelAllOrdersAfter(timeout, options...)}
func (this *Btcalpha) CancelOrdersForSymbols(orders []CancellationRequest, options ...CancelOrdersForSymbolsOptions) ([]Order, error) {return this.exchangeTyped.CancelOrdersForSymbols(orders, options...)}
func (this *Btcalpha) CreateConvertTrade(id string, fromCode string, toCode string, options ...CreateConvertTradeOptions) (Conversion, error) {return this.exchangeTyped.CreateConvertTrade(id, fromCode, toCode, options...)}
func (this *Btcalpha) CreateDepositAddress(code string, options ...CreateDepositAddressOptions) (DepositAddress, error) {return this.exchangeTyped.CreateDepositAddress(code, options...)}
func (this *Btcalpha) CreateLimitBuyOrder(symbol string, amount float64, price float64, options ...CreateLimitBuyOrderOptions) (Order, error) {return this.exchangeTyped.CreateLimitBuyOrder(symbol, amount, price, options...)}
func (this *Btcalpha) CreateLimitOrder(symbol string, side string, amount float64, price float64, options ...CreateLimitOrderOptions) (Order, error) {return this.exchangeTyped.CreateLimitOrder(symbol, side, amount, price, options...)}
func (this *Btcalpha) CreateLimitSellOrder(symbol string, amount float64, price float64, options ...CreateLimitSellOrderOptions) (Order, error) {return this.exchangeTyped.CreateLimitSellOrder(symbol, amount, price, options...)}
func (this *Btcalpha) CreateMarketBuyOrder(symbol string, amount float64, options ...CreateMarketBuyOrderOptions) (Order, error) {return this.exchangeTyped.CreateMarketBuyOrder(symbol, amount, options...)}
func (this *Btcalpha) CreateMarketBuyOrderWithCost(symbol string, cost float64, options ...CreateMarketBuyOrderWithCostOptions) (Order, error) {return this.exchangeTyped.CreateMarketBuyOrderWithCost(symbol, cost, options...)}
func (this *Btcalpha) CreateMarketOrder(symbol string, side string, amount float64, options ...CreateMarketOrderOptions) (Order, error) {return this.exchangeTyped.CreateMarketOrder(symbol, side, amount, options...)}
func (this *Btcalpha) CreateMarketOrderWithCost(symbol string, side string, cost float64, options ...CreateMarketOrderWithCostOptions) (Order, error) {return this.exchangeTyped.CreateMarketOrderWithCost(symbol, side, cost, options...)}
func (this *Btcalpha) CreateMarketSellOrder(symbol string, amount float64, options ...CreateMarketSellOrderOptions) (Order, error) {return this.exchangeTyped.CreateMarketSellOrder(symbol, amount, options...)}
func (this *Btcalpha) CreateMarketSellOrderWithCost(symbol string, cost float64, options ...CreateMarketSellOrderWithCostOptions) (Order, error) {return this.exchangeTyped.CreateMarketSellOrderWithCost(symbol, cost, options...)}
func (this *Btcalpha) CreateOrders(orders []OrderRequest, options ...CreateOrdersOptions) ([]Order, error) {return this.exchangeTyped.CreateOrders(orders, options...)}
func (this *Btcalpha) CreateOrderWithTakeProfitAndStopLoss(symbol string, typeVar string, side string, amount float64, options ...CreateOrderWithTakeProfitAndStopLossOptions) (Order, error) {return this.exchangeTyped.CreateOrderWithTakeProfitAndStopLoss(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreatePostOnlyOrder(symbol string, typeVar string, side string, amount float64, options ...CreatePostOnlyOrderOptions) (Order, error) {return this.exchangeTyped.CreatePostOnlyOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateReduceOnlyOrder(symbol string, typeVar string, side string, amount float64, options ...CreateReduceOnlyOrderOptions) (Order, error) {return this.exchangeTyped.CreateReduceOnlyOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateStopLimitOrder(symbol string, side string, amount float64, price float64, triggerPrice float64, options ...CreateStopLimitOrderOptions) (Order, error) {return this.exchangeTyped.CreateStopLimitOrder(symbol, side, amount, price, triggerPrice, options...)}
func (this *Btcalpha) CreateStopLossOrder(symbol string, typeVar string, side string, amount float64, options ...CreateStopLossOrderOptions) (Order, error) {return this.exchangeTyped.CreateStopLossOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateStopMarketOrder(symbol string, side string, amount float64, triggerPrice float64, options ...CreateStopMarketOrderOptions) (Order, error) {return this.exchangeTyped.CreateStopMarketOrder(symbol, side, amount, triggerPrice, options...)}
func (this *Btcalpha) CreateStopOrder(symbol string, typeVar string, side string, amount float64, options ...CreateStopOrderOptions) (Order, error) {return this.exchangeTyped.CreateStopOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateTakeProfitOrder(symbol string, typeVar string, side string, amount float64, options ...CreateTakeProfitOrderOptions) (Order, error) {return this.exchangeTyped.CreateTakeProfitOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateTrailingAmountOrder(symbol string, typeVar string, side string, amount float64, options ...CreateTrailingAmountOrderOptions) (Order, error) {return this.exchangeTyped.CreateTrailingAmountOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateTrailingPercentOrder(symbol string, typeVar string, side string, amount float64, options ...CreateTrailingPercentOrderOptions) (Order, error) {return this.exchangeTyped.CreateTrailingPercentOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) CreateTriggerOrder(symbol string, typeVar string, side string, amount float64, options ...CreateTriggerOrderOptions) (Order, error) {return this.exchangeTyped.CreateTriggerOrder(symbol, typeVar, side, amount, options...)}
func (this *Btcalpha) EditLimitBuyOrder(id string, symbol string, amount float64, options ...EditLimitBuyOrderOptions) (Order, error) {return this.exchangeTyped.EditLimitBuyOrder(id, symbol, amount, options...)}
func (this *Btcalpha) EditLimitOrder(id string, symbol string, side string, amount float64, options ...EditLimitOrderOptions) (Order, error) {return this.exchangeTyped.EditLimitOrder(id, symbol, side, amount, options...)}
func (this *Btcalpha) EditLimitSellOrder(id string, symbol string, amount float64, options ...EditLimitSellOrderOptions) (Order, error) {return this.exchangeTyped.EditLimitSellOrder(id, symbol, amount, options...)}
func (this *Btcalpha) EditOrder(id string, symbol string, typeVar string, side string, options ...EditOrderOptions) (Order, error) {return this.exchangeTyped.EditOrder(id, symbol, typeVar, side, options...)}
func (this *Btcalpha) EditOrders(orders []OrderRequest, options ...EditOrdersOptions) ([]Order, error) {return this.exchangeTyped.EditOrders(orders, options...)}
func (this *Btcalpha) FetchAccounts(params ...interface{}) ([]Account, error) {return this.exchangeTyped.FetchAccounts(params...)}
func (this *Btcalpha) FetchAllGreeks(options ...FetchAllGreeksOptions) ([]Greeks, error) {return this.exchangeTyped.FetchAllGreeks(options...)}
func (this *Btcalpha) FetchBidsAsks(options ...FetchBidsAsksOptions) (Tickers, error) {return this.exchangeTyped.FetchBidsAsks(options...)}
func (this *Btcalpha) FetchBorrowInterest(options ...FetchBorrowInterestOptions) ([]BorrowInterest, error) {return this.exchangeTyped.FetchBorrowInterest(options...)}
func (this *Btcalpha) FetchBorrowRate(code string, amount float64, options ...FetchBorrowRateOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchBorrowRate(code, amount, options...)}
func (this *Btcalpha) FetchCanceledAndClosedOrders(options ...FetchCanceledAndClosedOrdersOptions) ([]Order, error) {return this.exchangeTyped.FetchCanceledAndClosedOrders(options...)}
func (this *Btcalpha) FetchConvertCurrencies(params ...interface{}) (Currencies, error) {return this.exchangeTyped.FetchConvertCurrencies(params...)}
func (this *Btcalpha) FetchConvertQuote(fromCode string, toCode string, options ...FetchConvertQuoteOptions) (Conversion, error) {return this.exchangeTyped.FetchConvertQuote(fromCode, toCode, options...)}
func (this *Btcalpha) FetchConvertTrade(id string, options ...FetchConvertTradeOptions) (Conversion, error) {return this.exchangeTyped.FetchConvertTrade(id, options...)}
func (this *Btcalpha) FetchConvertTradeHistory(options ...FetchConvertTradeHistoryOptions) ([]Conversion, error) {return this.exchangeTyped.FetchConvertTradeHistory(options...)}
func (this *Btcalpha) FetchCrossBorrowRate(code string, options ...FetchCrossBorrowRateOptions) (CrossBorrowRate, error) {return this.exchangeTyped.FetchCrossBorrowRate(code, options...)}
func (this *Btcalpha) FetchCrossBorrowRates(params ...interface{}) (CrossBorrowRates, error) {return this.exchangeTyped.FetchCrossBorrowRates(params...)}
func (this *Btcalpha) FetchCurrencies(params ...interface{}) (Currencies, error) {return this.exchangeTyped.FetchCurrencies(params...)}
func (this *Btcalpha) FetchDepositAddress(code string, options ...FetchDepositAddressOptions) (DepositAddress, error) {return this.exchangeTyped.FetchDepositAddress(code, options...)}
func (this *Btcalpha) FetchDepositAddresses(options ...FetchDepositAddressesOptions) ([]DepositAddress, error) {return this.exchangeTyped.FetchDepositAddresses(options...)}
func (this *Btcalpha) FetchDepositAddressesByNetwork(code string, options ...FetchDepositAddressesByNetworkOptions) ([]DepositAddress, error) {return this.exchangeTyped.FetchDepositAddressesByNetwork(code, options...)}
func (this *Btcalpha) FetchDepositsWithdrawals(options ...FetchDepositsWithdrawalsOptions) ([]Transaction, error) {return this.exchangeTyped.FetchDepositsWithdrawals(options...)}
func (this *Btcalpha) FetchDepositWithdrawFee(code string, options ...FetchDepositWithdrawFeeOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchDepositWithdrawFee(code, options...)}
func (this *Btcalpha) FetchDepositWithdrawFees(options ...FetchDepositWithdrawFeesOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchDepositWithdrawFees(options...)}
func (this *Btcalpha) FetchFreeBalance(params ...interface{}) (Balance, error) {return this.exchangeTyped.FetchFreeBalance(params...)}
func (this *Btcalpha) FetchFundingHistory(options ...FetchFundingHistoryOptions) ([]FundingHistory, error) {return this.exchangeTyped.FetchFundingHistory(options...)}
func (this *Btcalpha) FetchFundingInterval(symbol string, options ...FetchFundingIntervalOptions) (FundingRate, error) {return this.exchangeTyped.FetchFundingInterval(symbol, options...)}
func (this *Btcalpha) FetchFundingIntervals(options ...FetchFundingIntervalsOptions) (FundingRates, error) {return this.exchangeTyped.FetchFundingIntervals(options...)}
func (this *Btcalpha) FetchFundingRate(symbol string, options ...FetchFundingRateOptions) (FundingRate, error) {return this.exchangeTyped.FetchFundingRate(symbol, options...)}
func (this *Btcalpha) FetchFundingRateHistory(options ...FetchFundingRateHistoryOptions) ([]FundingRateHistory, error) {return this.exchangeTyped.FetchFundingRateHistory(options...)}
func (this *Btcalpha) FetchFundingRates(options ...FetchFundingRatesOptions) (FundingRates, error) {return this.exchangeTyped.FetchFundingRates(options...)}
func (this *Btcalpha) FetchGreeks(symbol string, options ...FetchGreeksOptions) (Greeks, error) {return this.exchangeTyped.FetchGreeks(symbol, options...)}
func (this *Btcalpha) FetchIndexOHLCV(symbol string, options ...FetchIndexOHLCVOptions) ([]OHLCV, error) {return this.exchangeTyped.FetchIndexOHLCV(symbol, options...)}
func (this *Btcalpha) FetchIsolatedBorrowRate(symbol string, options ...FetchIsolatedBorrowRateOptions) (IsolatedBorrowRate, error) {return this.exchangeTyped.FetchIsolatedBorrowRate(symbol, options...)}
func (this *Btcalpha) FetchIsolatedBorrowRates(params ...interface{}) (IsolatedBorrowRates, error) {return this.exchangeTyped.FetchIsolatedBorrowRates(params...)}
func (this *Btcalpha) FetchLastPrices(options ...FetchLastPricesOptions) (LastPrices, error) {return this.exchangeTyped.FetchLastPrices(options...)}
func (this *Btcalpha) FetchLedger(options ...FetchLedgerOptions) ([]LedgerEntry, error) {return this.exchangeTyped.FetchLedger(options...)}
func (this *Btcalpha) FetchLedgerEntry(id string, options ...FetchLedgerEntryOptions) (LedgerEntry, error) {return this.exchangeTyped.FetchLedgerEntry(id, options...)}
func (this *Btcalpha) FetchLeverage(symbol string, options ...FetchLeverageOptions) (Leverage, error) {return this.exchangeTyped.FetchLeverage(symbol, options...)}
func (this *Btcalpha) FetchLeverages(options ...FetchLeveragesOptions) (Leverages, error) {return this.exchangeTyped.FetchLeverages(options...)}
func (this *Btcalpha) FetchLeverageTiers(options ...FetchLeverageTiersOptions) (LeverageTiers, error) {return this.exchangeTyped.FetchLeverageTiers(options...)}
func (this *Btcalpha) FetchLiquidations(symbol string, options ...FetchLiquidationsOptions) ([]Liquidation, error) {return this.exchangeTyped.FetchLiquidations(symbol, options...)}
func (this *Btcalpha) FetchLongShortRatio(symbol string, options ...FetchLongShortRatioOptions) (LongShortRatio, error) {return this.exchangeTyped.FetchLongShortRatio(symbol, options...)}
func (this *Btcalpha) FetchLongShortRatioHistory(options ...FetchLongShortRatioHistoryOptions) ([]LongShortRatio, error) {return this.exchangeTyped.FetchLongShortRatioHistory(options...)}
func (this *Btcalpha) FetchMarginAdjustmentHistory(options ...FetchMarginAdjustmentHistoryOptions) ([]MarginModification, error) {return this.exchangeTyped.FetchMarginAdjustmentHistory(options...)}
func (this *Btcalpha) FetchMarginMode(symbol string, options ...FetchMarginModeOptions) (MarginMode, error) {return this.exchangeTyped.FetchMarginMode(symbol, options...)}
func (this *Btcalpha) FetchMarginModes(options ...FetchMarginModesOptions) (MarginModes, error) {return this.exchangeTyped.FetchMarginModes(options...)}
func (this *Btcalpha) FetchMarketLeverageTiers(symbol string, options ...FetchMarketLeverageTiersOptions) ([]LeverageTier, error) {return this.exchangeTyped.FetchMarketLeverageTiers(symbol, options...)}
func (this *Btcalpha) FetchMarkOHLCV(symbol interface{}, options ...FetchMarkOHLCVOptions) ([]OHLCV, error) {return this.exchangeTyped.FetchMarkOHLCV(symbol, options...)}
func (this *Btcalpha) FetchMarkPrice(symbol string, options ...FetchMarkPriceOptions) (Ticker, error) {return this.exchangeTyped.FetchMarkPrice(symbol, options...)}
func (this *Btcalpha) FetchMarkPrices(options ...FetchMarkPricesOptions) (Tickers, error) {return this.exchangeTyped.FetchMarkPrices(options...)}
func (this *Btcalpha) FetchMyLiquidations(options ...FetchMyLiquidationsOptions) ([]Liquidation, error) {return this.exchangeTyped.FetchMyLiquidations(options...)}
func (this *Btcalpha) FetchOpenInterest(symbol string, options ...FetchOpenInterestOptions) (OpenInterest, error) {return this.exchangeTyped.FetchOpenInterest(symbol, options...)}
func (this *Btcalpha) FetchOpenInterestHistory(symbol string, options ...FetchOpenInterestHistoryOptions) ([]OpenInterest, error) {return this.exchangeTyped.FetchOpenInterestHistory(symbol, options...)}
func (this *Btcalpha) FetchOpenInterests(options ...FetchOpenInterestsOptions) (OpenInterests, error) {return this.exchangeTyped.FetchOpenInterests(options...)}
func (this *Btcalpha) FetchOption(symbol string, options ...FetchOptionOptions) (Option, error) {return this.exchangeTyped.FetchOption(symbol, options...)}
func (this *Btcalpha) FetchOptionChain(code string, options ...FetchOptionChainOptions) (OptionChain, error) {return this.exchangeTyped.FetchOptionChain(code, options...)}
func (this *Btcalpha) FetchOrderBooks(options ...FetchOrderBooksOptions) (OrderBooks, error) {return this.exchangeTyped.FetchOrderBooks(options...)}
func (this *Btcalpha) FetchOrderStatus(id string, options ...FetchOrderStatusOptions) (string, error) {return this.exchangeTyped.FetchOrderStatus(id, options...)}
func (this *Btcalpha) FetchOrderTrades(id string, options ...FetchOrderTradesOptions) ([]Trade, error) {return this.exchangeTyped.FetchOrderTrades(id, options...)}
func (this *Btcalpha) FetchPaymentMethods(params ...interface{}) (map[string]interface{}, error) {return this.exchangeTyped.FetchPaymentMethods(params...)}
func (this *Btcalpha) FetchPosition(symbol string, options ...FetchPositionOptions) (Position, error) {return this.exchangeTyped.FetchPosition(symbol, options...)}
func (this *Btcalpha) FetchPositionHistory(symbol string, options ...FetchPositionHistoryOptions) ([]Position, error) {return this.exchangeTyped.FetchPositionHistory(symbol, options...)}
func (this *Btcalpha) FetchPositionMode(options ...FetchPositionModeOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchPositionMode(options...)}
func (this *Btcalpha) FetchPositions(options ...FetchPositionsOptions) ([]Position, error) {return this.exchangeTyped.FetchPositions(options...)}
func (this *Btcalpha) FetchPositionsForSymbol(symbol string, options ...FetchPositionsForSymbolOptions) ([]Position, error) {return this.exchangeTyped.FetchPositionsForSymbol(symbol, options...)}
func (this *Btcalpha) FetchPositionsHistory(options ...FetchPositionsHistoryOptions) ([]Position, error) {return this.exchangeTyped.FetchPositionsHistory(options...)}
func (this *Btcalpha) FetchPositionsRisk(options ...FetchPositionsRiskOptions) ([]Position, error) {return this.exchangeTyped.FetchPositionsRisk(options...)}
func (this *Btcalpha) FetchPremiumIndexOHLCV(symbol string, options ...FetchPremiumIndexOHLCVOptions) ([]OHLCV, error) {return this.exchangeTyped.FetchPremiumIndexOHLCV(symbol, options...)}
func (this *Btcalpha) FetchStatus(params ...interface{}) (map[string]interface{}, error) {return this.exchangeTyped.FetchStatus(params...)}
func (this *Btcalpha) FetchTime(params ...interface{}) ( int64, error) {return this.exchangeTyped.FetchTime(params...)}
func (this *Btcalpha) FetchTradingFee(symbol string, options ...FetchTradingFeeOptions) (TradingFeeInterface, error) {return this.exchangeTyped.FetchTradingFee(symbol, options...)}
func (this *Btcalpha) FetchTradingFees(params ...interface{}) (TradingFees, error) {return this.exchangeTyped.FetchTradingFees(params...)}
func (this *Btcalpha) FetchTradingLimits(options ...FetchTradingLimitsOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchTradingLimits(options...)}
func (this *Btcalpha) FetchTransactionFee(code string, options ...FetchTransactionFeeOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchTransactionFee(code, options...)}
func (this *Btcalpha) FetchTransactionFees(options ...FetchTransactionFeesOptions) (map[string]interface{}, error) {return this.exchangeTyped.FetchTransactionFees(options...)}
func (this *Btcalpha) FetchTransactions(options ...FetchTransactionsOptions) ([]Transaction, error) {return this.exchangeTyped.FetchTransactions(options...)}
func (this *Btcalpha) FetchTransfer(id string, options ...FetchTransferOptions) (TransferEntry, error) {return this.exchangeTyped.FetchTransfer(id, options...)}
func (this *Btcalpha) FetchTransfers(options ...FetchTransfersOptions) ([]TransferEntry, error) {return this.exchangeTyped.FetchTransfers(options...)}
func (this *Btcalpha) SetMargin(symbol string, amount float64, options ...SetMarginOptions) (MarginModification, error) {return this.exchangeTyped.SetMargin(symbol, amount, options...)}
func (this *Btcalpha) SetMarginMode(marginMode string, options ...SetMarginModeOptions) (map[string]interface{}, error) {return this.exchangeTyped.SetMarginMode(marginMode, options...)}
func (this *Btcalpha) SetPositionMode(hedged bool, options ...SetPositionModeOptions) (map[string]interface{}, error) {return this.exchangeTyped.SetPositionMode(hedged, options...)}
func (this *Btcalpha) Transfer(code string, amount float64, fromAccount string, toAccount string, options ...TransferOptions) (TransferEntry, error) {return this.exchangeTyped.Transfer(code, amount, fromAccount, toAccount, options...)}
func (this *Btcalpha) Withdraw(code string, amount float64, address string, options ...WithdrawOptions) (Transaction, error) {return this.exchangeTyped.Withdraw(code, amount, address, options...)}