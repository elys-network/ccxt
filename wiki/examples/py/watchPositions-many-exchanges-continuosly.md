- [Watchpositions Many Exchanges Continuosly](./examples/py/)


 ```python
 import os
import sys

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# AUTO-TRANSPILE #
# watch and handle constinuosly
async def watch_positions_continuously(exchange):
    while True:
        try:
            positions = await exchange.watch_positions()
            print('Fetched ', exchange.id, ' - Positions: ', positions)
        except Exception as e:
            print(e)
            break


# start exchanges and fetch OHLCV loop
async def start_exchange(exchange_name, config):
    ex = getattr(ccxt, exchange_name)(config)
    promises = []
    promises.append(watch_positions_continuously(ex))
    await asyncio.gather(*promises)
    await ex.close()


# main function    await ex.close()

async def example():
    exchanges = {
        'binanceusdm': {
            'apiKey': 'YOUR_API_KEY',
            'secret': 'YOUR_API_SECRET',
        },
        'okx': {
            'apiKey': 'YOUR_API_KEY',
            'secret': 'YOUR_API_SECRET',
        },
        'huobi': {
            'apiKey': 'YOUR_API_KEY',
            'secret': 'YOUR_API_SECRET',
        },
    }
    promises = []
    exchange_ids = list(exchanges.keys())
    for i in range(0, len(exchange_ids)):
        exchange_name = exchange_ids[i]
        config = exchanges[exchange_name]
        promises.append(start_exchange(exchange_name, config))
    await asyncio.gather(*promises)



asyncio.run(example())
 
```