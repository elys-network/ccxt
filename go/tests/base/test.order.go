package base
import "github.com/ccxt/ccxt/go/v4"

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


    func TestOrder(exchange ccxt.ICoreExchange, skippedProperties interface{}, method interface{}, entry interface{}, symbol interface{}, now interface{})  {
        var format interface{} = map[string]interface{} {
            "info": map[string]interface{} {},
            "id": "123",
            "clientOrderId": "1234",
            "timestamp": 1649373600000,
            "datetime": "2022-04-07T23:20:00.000Z",
            "lastTradeTimestamp": 1649373610000,
            "symbol": "XYZ/USDT",
            "type": "limit",
            "timeInForce": "GTC",
            "postOnly": true,
            "side": "sell",
            "price": exchange.ParseNumber("1.23456"),
            "stopPrice": exchange.ParseNumber("1.1111"),
            "amount": exchange.ParseNumber("1.23"),
            "cost": exchange.ParseNumber("2.34"),
            "average": exchange.ParseNumber("1.234"),
            "filled": exchange.ParseNumber("1.23"),
            "remaining": exchange.ParseNumber("0.123"),
            "status": "ok",
            "fee": map[string]interface{} {},
            "trades": []interface{}{},
        }
        var emptyAllowedFor interface{} = []interface{}{"clientOrderId", "stopPrice", "trades", "timestamp", "datetime", "lastTradeTimestamp", "average", "type", "timeInForce", "postOnly", "side", "price", "amount", "cost", "filled", "remaining", "status", "fee"} // there are exchanges that return only order id, so we don't need to strictly requite all props to be set.
        AssertStructure(exchange, skippedProperties, method, entry, format, emptyAllowedFor)
        AssertTimestampAndDatetime(exchange, skippedProperties, method, entry, now)
        //
        AssertInArray(exchange, skippedProperties, method, entry, "timeInForce", []interface{}{"GTC", "GTK", "IOC", "FOK", "PO"})
        AssertInArray(exchange, skippedProperties, method, entry, "status", []interface{}{"open", "closed", "canceled"})
        AssertInArray(exchange, skippedProperties, method, entry, "side", []interface{}{"buy", "sell"})
        AssertInArray(exchange, skippedProperties, method, entry, "postOnly", []interface{}{true, false})
        AssertSymbol(exchange, skippedProperties, method, entry, "symbol", symbol)
        AssertGreater(exchange, skippedProperties, method, entry, "price", "0")
        AssertGreater(exchange, skippedProperties, method, entry, "stopPrice", "0")
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "cost", "0")
        AssertGreater(exchange, skippedProperties, method, entry, "average", "0")
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "filled", "0")
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "remaining", "0")
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "amount", "0")
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "amount", exchange.SafeString(entry, "remaining"))
        AssertGreaterOrEqual(exchange, skippedProperties, method, entry, "amount", exchange.SafeString(entry, "filled"))
        if !IsTrue((InOp(skippedProperties, "trades"))) {
            var skippedNew interface{} = exchange.DeepExtend(skippedProperties, map[string]interface{} {
                "timestamp": true,
                "datetime": true,
                "side": true,
            })
            if IsTrue(!IsEqual(GetValue(entry, "trades"), nil)) {
                for i := 0; IsLessThan(i, GetArrayLength(GetValue(entry, "trades"))); i++ {
                    TestTrade(exchange, skippedNew, method, GetValue(GetValue(entry, "trades"), i), symbol, now)
                }
            }
        }
        AssertFeeStructure(exchange, skippedProperties, method, entry, "fee")
    }
