import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bitfinexApiSlice = createApi({
    reducerPath: 'bitfinexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-pub.bitfinex.com/v2',
    }),
    endpoints(builder) {
        return {
            fetchBitfinexExchangeInfo: builder.query({
                query() {
                    return `/conf/pub:list:pair:exchange`
                },
            }),
            fetchBitfinexPrice: builder.query({
                query(symbol) {
                    return `/ticker/t${symbol}`
                },
            }),
            fetchBitfinexDetails: builder.query({
                query(symbol) {
                    return `/ticker/t${symbol}/hist`
                },
            }),
        }
    },
})

export const {
    useFetchBitfinexExchangeInfoQuery,
    useFetchBitfinexPriceQuery,
    useFetchBitfinexDetailsQuery,
} = bitfinexApiSlice
