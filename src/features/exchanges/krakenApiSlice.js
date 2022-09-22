import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const krakenApiSlice = createApi({
    reducerPath: 'krakenApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kraken.com/0/public',
        prepareHeaders(headers) {
            headers.set('Accept', 'application/json')

            return headers
        },
    }),
    endpoints(builder) {
        return {
            fetchKrakenExchangeInfo: builder.query({
                query() {
                    return `/AssetPairs`
                },
            }),
            // fetchKrakenPrice: builder.query({
            //     query(symbol) {
            //         return `/ticker/price?symbol=${symbol}`
            //     },
            // }),
            // fetchKrakenDetails: builder.query({
            //     query(symbol) {
            //         return `/trades?symbol=${symbol}&limit=5`
            //     },
            // }),
        }
    },
})

export const {
    useFetchKrakenExchangeInfoQuery,
    // useFetchKrakenPriceQuery,
    // useFetchKrakenDetailsQuery,
} = krakenApiSlice
