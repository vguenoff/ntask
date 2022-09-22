import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bitfinexApiSlice = createApi({
    reducerPath: 'bitfinexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    endpoints(builder) {
        return {
            fetchBitfinexExchangeInfo: builder.query({
                query() {
                    return `conf/pub:list:pair:exchange`
                },
            }),
            fetchBitfinexPrice: builder.query({
                query(symbol) {
                    return `ticker/t${symbol}`
                },
            }),
            fetchBitfinexDetails: builder.query({
                query(symbol) {
                    return `tickers/hist?symbols=t${symbol}&limit=5`
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
