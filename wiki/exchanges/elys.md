
<a name="elys" id="elys"></a>

## elys{docsify-ignore}
**Kind**: global class  
**Extends**: <code>Exchange</code>  

* [fetchCurrencies](#fetchcurrencies)
* [fetchMarkets](#fetchmarkets)
* [fetchTickers](#fetchtickers)
* [fetchOHLCV](#fetchohlcv)
* [fetchBalance](#fetchbalance)
* [fetchMyTrades](#fetchmytrades)

<a name="fetchCurrencies" id="fetchcurrencies"></a>

### fetchCurrencies{docsify-ignore}
fetches all available currencies on an exchange

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>object</code> - an associative dictionary of currencies


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |


```javascript
elys.fetchCurrencies ([params])
```


<a name="fetchMarkets" id="fetchmarkets"></a>

### fetchMarkets{docsify-ignore}
retrieves data on all markets for elys

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>Array&lt;object&gt;</code> - an array of objects representing market data


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |


```javascript
elys.fetchMarkets ([params])
```


<a name="fetchTickers" id="fetchtickers"></a>

### fetchTickers{docsify-ignore}
fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>object</code> - a dictionary of ticker structures


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| symbols | <code>Array&lt;string&gt;</code>, <code>undefined</code> | Yes | unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |


```javascript
elys.fetchTickers (symbols[, params])
```


<a name="fetchOHLCV" id="fetchohlcv"></a>

### fetchOHLCV{docsify-ignore}
fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>Array&lt;Array&lt;int&gt;&gt;</code> - A list of candles ordered as timestamp, open, high, low, close, volume


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| symbol | <code>string</code> | Yes | unified symbol of the market to fetch OHLCV data for |
| timeframe | <code>string</code> | Yes | the length of time each candle represents, support '1m', '1h', '1d' |
| since | <code>int</code> | No | timestamp in ms of the earliest candle to fetch |
| limit | <code>int</code> | No | the maximum amount of candles to fetch |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |
| params.until | <code>int</code> | No | timestamp in ms of the latest candle to fetch |


```javascript
elys.fetchOHLCV (symbol, timeframe[, since, limit, params])
```


<a name="fetchBalance" id="fetchbalance"></a>

### fetchBalance{docsify-ignore}
query for balance and get the amount of funds available for trading or funds locked in orders

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>object</code> - a balance structure


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |
| params.address | <code>string</code> | Yes | the wallet address to fetch balance for |


```javascript
elys.fetchBalance ([params])
```


<a name="fetchMyTrades" id="fetchmytrades"></a>

### fetchMyTrades{docsify-ignore}
fetch all trades made by the user

**Kind**: instance method of [<code>elys</code>](#elys)  
**Returns**: <code>Array&lt;Trade&gt;</code> - a list of trade structures


| Param | Type | Required | Description |
| --- | --- | --- | --- |
| symbol | <code>string</code> | Yes | unified market symbol |
| since | <code>int</code> | No | the earliest time in ms to fetch trades for |
| limit | <code>int</code> | No | the maximum number of trades structures to retrieve |
| params | <code>object</code> | No | extra parameters specific to the exchange API endpoint |
| params.address | <code>string</code> | Yes | the wallet address to fetch trades for |
| params.from | <code>int</code> | No | pagination offset, defaults to 0 |


```javascript
elys.fetchMyTrades (symbol[, since, limit, params])
```

