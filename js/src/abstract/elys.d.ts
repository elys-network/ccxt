import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetV1Currencies(params?: {}): Promise<implicitReturnType>;
    publicGetV1Markets(params?: {}): Promise<implicitReturnType>;
    publicGetV1Tickers(params?: {}): Promise<implicitReturnType>;
    publicGetV1FundingRates(params?: {}): Promise<implicitReturnType>;
    publicGetV1OrdersOpen(params?: {}): Promise<implicitReturnType>;
    publicGetV1Orders(params?: {}): Promise<implicitReturnType>;
    publicGetV1Order(params?: {}): Promise<implicitReturnType>;
    publicGetV1OpenInterest(params?: {}): Promise<implicitReturnType>;
    publicGetTradesAddressSymbolSizeFrom(params?: {}): Promise<implicitReturnType>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
