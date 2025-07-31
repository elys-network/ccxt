import ccxt from './js/ccxt.js';

// Debug Elys URL construction
async function debugElysUrl() {
    const exchange = new ccxt.elys({
        'timeout': 30000,
        'enableRateLimit': true,
    });

    console.log('Base URL:', exchange.urls.api.public);
    
    // Try to manually construct the URL
    try {
        console.log('Testing manual request construction...');
        const response = await exchange.request('v1/currencies', 'public', 'GET', {});
        console.log('Manual request succeeded:', response);
    } catch (error) {
        console.log('Manual request failed:', error.message);
        console.log('Full error:', error);
    }
}

debugElysUrl().catch(console.error);