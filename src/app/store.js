import { configureStore } from '@reduxjs/toolkit'
import { binanceApiSlice } from 'features/exchanges/binanceApiSlice'
import { bitfinexApiSlice } from 'features/exchanges/bitfinexApiSlice'
import { huobiApiSlice } from 'features/exchanges/huobiApiSlice'
import { krakenApiSlice } from 'features/exchanges/krakenApiSlice'

export const store = configureStore({
    reducer: {
        [binanceApiSlice.reducerPath]: binanceApiSlice.reducer,
        [bitfinexApiSlice.reducerPath]: bitfinexApiSlice.reducer,
        [huobiApiSlice.reducerPath]: huobiApiSlice.reducer,
        [krakenApiSlice.reducerPath]: krakenApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(binanceApiSlice.middleware)
            .concat(bitfinexApiSlice.middleware)
            .concat(huobiApiSlice.middleware)
            .concat(krakenApiSlice.middleware)
    },
})
