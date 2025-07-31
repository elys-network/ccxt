from ccxt.base.types import Entry


class ImplicitAPI:
    public_get_v1_currencies = publicGetV1Currencies = Entry('v1/currencies', 'public', 'GET', {'cost': 1})
    public_get_v1_markets = publicGetV1Markets = Entry('v1/markets', 'public', 'GET', {'cost': 1})
    public_get_v1_tickers = publicGetV1Tickers = Entry('v1/tickers', 'public', 'GET', {'cost': 1})
