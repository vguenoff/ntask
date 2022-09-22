const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    // kraken
    app.use(
        '/AssetPairs',
        createProxyMiddleware({
            target: 'https://api.kraken.com/0/public',
            changeOrigin: true,
        }),
    )
    app.use(
        '/Ticker?pair=:symbol',
        createProxyMiddleware({
            target: 'https://api.kraken.com/0/public',
            changeOrigin: true,
        }),
    )
    app.use(
        '/Trades?pair=:symbol',
        createProxyMiddleware({
            target: 'https://api.kraken.com/0/public',
            changeOrigin: true,
        }),
    )
    // bitfinex
    app.use(
        '/conf/pub:list:pair:exchange',
        createProxyMiddleware({
            target: 'https://api-pub.bitfinex.com/v2',
            changeOrigin: true,
        }),
    )
    app.use(
        '/ticker/t:symbol',
        createProxyMiddleware({
            target: 'https://api-pub.bitfinex.com/v2',
            changeOrigin: true,
        }),
    )
    app.use(
        '/tickers/hist?symbols=t:symbol&limit=5',
        createProxyMiddleware({
            target: 'https://api-pub.bitfinex.com/v2',
            changeOrigin: true,
        }),
    )
}
