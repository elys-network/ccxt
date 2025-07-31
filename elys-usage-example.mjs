import ccxt from './js/ccxt.js';

// Basic Elys DEX usage example
async function elysBasicUsage() {
    console.log('Elys DEX Basic Usage Example\n');
    
    // Initialize the exchange
    const exchange = new ccxt.elys({
        // Elys DEX is read-only for public endpoints
        // No API keys required for public data
        'sandbox': false, // Set to true for testnet (default is testnet URL)
        'timeout': 30000,
        'enableRateLimit': true,
    });

    try {
        console.log('Exchange Info:');
        console.log('- Name:', exchange.name);
        console.log('- ID:', exchange.id);
        console.log('- Version:', exchange.version);
        console.log('- Is DEX:', exchange.dex);
        console.log('- Testnet URL:', exchange.urls.api.public);
        console.log('');

        // Fetch available currencies
        console.log('Fetching currencies...');
        const currencies = await exchange.fetchCurrencies();
        console.log('Available currencies:', Object.keys(currencies).join(', '));
        console.log('');

        // Fetch markets
        console.log('Fetching markets...');
        const markets = await exchange.fetchMarkets();
        console.log(`Found ${markets.length} markets:`);
        markets.slice(0, 5).forEach(market => {
            console.log(`- ${market.symbol} (Pool ID: ${market.id})`);
        });
        if (markets.length > 5) {
            console.log(`  ... and ${markets.length - 5} more`);
        }
        console.log('');

        // Fetch tickers for all markets
        console.log('Fetching tickers...');
        const tickers = await exchange.fetchTickers();
        console.log(`Received ${Object.keys(tickers).length} tickers:`);
        Object.values(tickers).slice(0, 3).forEach(ticker => {
            console.log(`- ${ticker.symbol}: $${ticker.last} (24h: ${ticker.percentage}%)`);
        });
        console.log('');

        // Fetch OHLCV data for the first market
        if (markets.length > 0) {
            const symbol = markets[0].symbol;
            console.log(`Fetching OHLCV data for ${symbol}...`);
            const ohlcv = await exchange.fetchOHLCV(symbol, '1h', undefined, 10);
            console.log(`Received ${ohlcv.length} candles:`);
            ohlcv.slice(-3).forEach(candle => {
                const [timestamp, open, high, low, close] = candle;
                const date = new Date(timestamp).toISOString();
                console.log(`  ${date}: O:${open} H:${high} L:${low} C:${close}`);
            });
            console.log('');
        }

        // Example: Fetch balance for a specific address
        console.log('Example: Fetching balance for an address...');
        console.log('Note: Replace with actual wallet address');
        const exampleAddress = 'elys1u8c28343vvhwgwhf29w6hlcz73hvq7lwxmrl46';
        try {
            const balance = await exchange.fetchBalance({ address: exampleAddress });
            console.log('Balance:', balance);
        } catch (error) {
            console.log('Balance fetch failed (expected - need real address):', error.message);
        }

        // Example: Fetch trade history for a specific address
        console.log('\nExample: Fetching trade history...');
        console.log('Note: This requires a valid wallet address with trade history');
        try {
            const testAddress = 'elys1u8c28343vvhwgwhf29w6hlcz73hvq7lwxmrl46';
            const symbol = 'ATOM/USDC'; // Use a common trading pair
            const trades = await exchange.fetchMyTrades(symbol, undefined, 10, { 
                address: testAddress,
                from: 0 
            });
            console.log(`✅ Successfully fetched ${trades.length} trades for ${symbol}`);
            if (trades.length > 0) {
                console.log('Recent trades:');
                for (let i = 0; i < Math.min(3, trades.length); i++) {
                    const trade = trades[i];
                    console.log(`  ${i+1}. ${trade.side} ${trade.amount} ${symbol} at ${trade.price} (${trade.datetime})`);
                }
            }
        } catch (error) {
            console.log(`Trade fetch failed: ${error.message.slice(0, 100)}...`);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the example
elysBasicUsage().catch(console.error);