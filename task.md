# Crypto Exchange App

Our goal is to create a simple web app that provides quick access to the current
market prices of selected cryptocurrency pairs. Targeted Exchanges with open
APIs:

### Binance - https://www.binance.com/en

### Bitfinex - https://www.bitfinex.com/

### Huobi - https://www.huobi.com/en-us/

### Kraken - https://www.kraken.com/

The initial screen should consist of search functionality where the user can
type the cryptocurrency pair of interest, for example - `BTC/USD`, `BTC/USDT`,
`ETH/USD`, etc. The application should crawl the data from all the exchanges
listed above and visualise the current market price for each of them, e.g.
Binance: 1 BTC = $40,000 USDT. The application should consider the case the pair
is not supported on selected exchange and communicate it properly in the
interface.

### The user should be able to:

-   Search for a particular cryptocurrency exchange pair.
-   Get the results and being able to sort them by price.
-   Click on the price to view additional historical information about the last
    few trades (sell/buy) on that exchange, visualized in a modal window.
-   Initiate the search functionality by opening the application through url
    containing the pair string: `http://url.com/{cryptocurrency_pair}/`, and
    opening the detail view on a pair by
    `http://url.com/{cryptocurrency_pair}/details` UX, styling and attention to
    detail is up to you.
-   Bonus: While staying on the results page, update the market prices
    automatically in a reasonable time intervals.

### What can be used:

-   ReactJS
-   Redux
-   Webpack
-   Any other library considered necessary

---

Please upload your complete source code to a GitHub repo.

### How we will test your code:

1. `git clone`
2. `yarn && yarn start`

---

## Cryptocurrency pair of interest

-   simple web app that provides quick access to the current market prices of
    selected cryptocurrency pairs

-   case the pair is not supported on selected exchange and communicate it
    properly in the interface.

### The user should be able to:

-   Search for a particular cryptocurrency exchange pair. Search by route
    `http://url.com/{cryptocurrency_pair}/`
-   Get the results and being able to sort them by price.
-   Click on the price to view additional historical information about the last
    few trades (sell/buy) on that exchange, visualized in a modal window.
-   Initiate the search functionality by opening the application through url
    containing the pair string: `http://url.com/{cryptocurrency_pair}/`, and
    opening the detail view on a pair by
    `http://url.com/{cryptocurrency_pair}/details` UX, styling and attention to
    detail is up to you.
-   Bonus: While staying on the results page, update the market prices
    automatically in a reasonable time intervals.

### Binance - https://www.binance.com/en

https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams

https://api.binance.com/api/v3/exchangeInfo
https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=5

### Bitfinex - https://www.bitfinex.com/

https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange
https://api-pub.bitfinex.com/v2/ticker/tBTCUSD
https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist

### Huobi - https://www.huobi.com/en-us/

https://api.huobi.pro/market/tickers
https://api.huobi.pro/market/detail/merged?symbol=btcusdc
https://api.huobi.pro/market/history/kline?period=1day&size=5&symbol=btcusdt

### Kraken - https://www.kraken.com/

https://api.kraken.com/0/public/AssetPairs
https://api.kraken.com/0/public/Ticker?pair=WBTCUSD
https://api.kraken.com/0/public/Trades?pair=XBTUSD&since=1663712570607

---

    // const ws = new WebSocket(
    //     'wss://stream.binance.com:9443/ws/etheur@trade',
    // )
    // ws.onmessage = e => console.log(e.data)


    // https://api.binance.com/api/v3/ticker/price
