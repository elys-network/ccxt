- [Fetch Ohlcv Many Exchanges Continuosly](./examples/py/)


 ```python
 import os
import sys

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# AUTO-TRANSPILE #
# fetch and handle constinuosly
async def fetch_ohlcv_continuously(exchange, symbol):
    while True:
        try:
            ohlcv = await exchange.fetch_ohlcv(symbol)
            ohlcv_length = len(ohlcv)
            print('Fetched ', exchange.id, ' - ', symbol, ' candles. last candle: ', ohlcv[ohlcv_length - 1])
        except Exception as e:
            print(e)
            break


# start exchanges and fetch OHLCV loop
async def start_exchange(exchange_name, symbols):
    ex = getattr(ccxt, exchange_name)({})
    promises = []
    for i in range(0, len(symbols)):
        symbol = symbols[i]
        promises.append(fetch_ohlcv_continuously(ex, symbol))
    await asyncio.gather(*promises)
    await ex.close()


# main function    await ex.close()

async def example():
    exchanges = ['binance', 'okx', 'kraken']
    symbols = ['BTC/USDT', 'ETH/USDT']
    promises = []
    for i in range(0, len(exchanges)):
        exchange_name = exchanges[i]
        promises.append(start_exchange(exchange_name, symbols))
    await asyncio.gather(*promises)



asyncio.run(example())
 
```