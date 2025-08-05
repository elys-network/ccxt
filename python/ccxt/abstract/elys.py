from ccxt.base.types import Entry


class ImplicitAPI:
    public_get_v1_currencies = publicGetV1Currencies = Entry('v1/currencies', 'public', 'GET', {'cost': 1})
    public_get_v1_markets = publicGetV1Markets = Entry('v1/markets', 'public', 'GET', {'cost': 1})
    public_get_v1_tickers = publicGetV1Tickers = Entry('v1/tickers', 'public', 'GET', {'cost': 1})
    public_get_v1_funding_rates = publicGetV1FundingRates = Entry('v1/funding-rates', 'public', 'GET', {'cost': 1})
    public_get_v1_orders_open = publicGetV1OrdersOpen = Entry('v1/orders/open', 'public', 'GET', {'cost': 1})
    public_get_v1_orders = publicGetV1Orders = Entry('v1/orders', 'public', 'GET', {'cost': 1})
    public_get_v1_order = publicGetV1Order = Entry('v1/order', 'public', 'GET', {'cost': 1})
    public_get_v1_open_interest = publicGetV1OpenInterest = Entry('v1/open-interest', 'public', 'GET', {'cost': 1})
    public_get_trades_address_symbol_size_from = publicGetTradesAddressSymbolSizeFrom = Entry('trades/{address}/{symbol}/{size}/{from}', 'public', 'GET', {'cost': 1})
