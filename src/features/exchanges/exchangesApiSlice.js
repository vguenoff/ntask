import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const binanceApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.binance.com/api/v3',
    }),
    // prepareHeaders(headers) {
    //     headers.set('Access-Control-Allow-Origin', '*')

    //     return headers
    // },
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
        }
    },
})

export const { useFetchExchangeInfoQuery, useFetchPriceQuery } = binanceApiSlice
