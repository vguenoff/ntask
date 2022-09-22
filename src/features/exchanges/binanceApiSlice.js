import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const binanceApiSlice = createApi({
    reducerPath: 'api',
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
        }
    },
})

export const {
    useFetchBinanceExchangeInfoQuery,
    useFetchBinancePriceQuery,
    useFetchBinanceDetailsQuery,
} = binanceApiSlice
