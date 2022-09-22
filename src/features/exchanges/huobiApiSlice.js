import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const huobiApiSlice = createApi({
    reducerPath: 'huobiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.huobi.pro',
    }),
    endpoints(builder) {
        return {
            fetchHuobiExchangeInfo: builder.query({
                query() {
                    return `/v1/settings/common/symbols`
                },
            }),
            fetchHuobiPrice: builder.query({
                query(symbol) {
                    return `/market/detail/merged?symbol=${symbol.toLowerCase()}`
                },
            }),
            fetchHuobiDetails: builder.query({
                query(symbol) {
                    return `/market/history/kline?period=1day&size=5&symbol=${symbol}`
                },
            }),
        }
    },
})

export const {
    useFetchHuobiExchangeInfoQuery,
    useFetchHuobiPriceQuery,
    useFetchHuobiDetailsQuery,
} = huobiApiSlice
