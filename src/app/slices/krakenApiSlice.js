import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const krakenApiSlice = createApi({
    reducerPath: 'krakenApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders(headers) {
            headers.set('Content-Type', 'application/json')

            return headers
        },
    }),
    endpoints(builder) {
        return {
            fetchKrakenExchangeInfo: builder.query({
                query() {
                    return `AssetPairs`
                },
            }),
            fetchKrakenPrice: builder.query({
                query(symbol) {
                    return `Ticker?pair=${symbol}`
                },
            }),
            fetchKrakenDetails: builder.query({
                query(symbol) {
                    return `Trades?symbol=${symbol}`
                },
            }),
        }
    },
})

export const {
    useFetchKrakenExchangeInfoQuery,
    useFetchKrakenPriceQuery,
    useFetchKrakenDetailsQuery,
} = krakenApiSlice
