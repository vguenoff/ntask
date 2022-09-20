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
        }
    },
})

export const { useFetchExchangeInfoQuery } = binanceApiSlice
