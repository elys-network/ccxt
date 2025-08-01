// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

namespace ccxt;

public partial class elys : Exchange
{
    public elys (object args = null): base(args) {}

    public async Task<object> publicGetV1Currencies (object parameters = null)
    {
        return await this.callAsync ("publicGetV1Currencies",parameters);
    }

    public async Task<object> publicGetV1Markets (object parameters = null)
    {
        return await this.callAsync ("publicGetV1Markets",parameters);
    }

    public async Task<object> publicGetV1Tickers (object parameters = null)
    {
        return await this.callAsync ("publicGetV1Tickers",parameters);
    }

}