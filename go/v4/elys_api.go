// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

package ccxt

func (this *elys) PublicGetV1Currencies (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetV1Currencies", args...)
}

func (this *elys) PublicGetV1Markets (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetV1Markets", args...)
}

func (this *elys) PublicGetV1Tickers (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetV1Tickers", args...)
}
