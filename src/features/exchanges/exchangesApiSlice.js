import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const binanceApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.binance.com/api/v3',
    }),
    endpoints(builder) {
        return {
            fetchExchangeInfo: builder.query({
                query() {
                    return `/exchangeInfo`
                },
            }),
            fetchPrice: builder.query({
                query(symbol) {
                    return `/ticker/price?symbol=${symbol}`
                },
            }),
            fetchDetails: builder.query({
                query(symbol) {
                    return `/trades?symbol=${symbol}&limit=5`
                },
            }),
        }
    },
})

export const {
    useFetchExchangeInfoQuery,
    useFetchPriceQuery,
    useFetchDetailsQuery,
} = binanceApiSlice
