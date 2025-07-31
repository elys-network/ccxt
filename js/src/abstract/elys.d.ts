import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetV1Currencies(params?: {}): Promise<implicitReturnType>;
    publicGetV1Markets(params?: {}): Promise<implicitReturnType>;
    publicGetV1Tickers(params?: {}): Promise<implicitReturnType>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
