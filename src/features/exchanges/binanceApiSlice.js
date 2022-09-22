import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const binanceApiSlice = createApi({
    reducerPath: 'binanceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.binance.com/api/v3',
    }),
    endpoints(builder) {
        return {
            fetchBinanceExchangeInfo: builder.query({
                query() {
                    return `/exchangeInfo`
                },
            }),
            fetchBinancePrice: builder.query({
                query(symbol) {
                    return `/ticker/price?symbol=${symbol}`
                },
            }),
            fetchBinanceDetails: builder.query({
                query(symbol) {
                    return `/trades?symbol=${symbol}&limit=5`
                },
            }),
            // fetchBinancePriceWS: builder.query({
            //     query: symbol => `ws/${symbol.toLowerCase()}@trade`,
            //     async onCacheEntryAdded(
            //         arg,
            //         { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            //     ) {
            //         const ws = new WebSocket('wss://stream.binance.com:9443')

            //         try {
            //             await cacheDataLoaded
            //             const listener = event => {
            //                 const data = JSON.parse(event.data)
            //                 // if (!isMessage(data) || data.channel !== arg) return

            //                 updateCachedData(draft => {
            //                     draft.push(data)
            //                 })
            //             }

            //             ws.addEventListener('message', listener)
            //         } catch {}
            //         await cacheEntryRemoved

            //         ws.close()
            //     },
            // }),
        }
    },
})

export const {
    useFetchBinanceExchangeInfoQuery,
    useFetchBinancePriceQuery,
    useFetchBinanceDetailsQuery,
    useFetchBinancePriceWSQuery,
} = binanceApiSlice
