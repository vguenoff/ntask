import { configureStore } from '@reduxjs/toolkit'
import { binanceApiSlice } from 'app/slices/binanceApiSlice'
import { bitfinexApiSlice } from 'app/slices/bitfinexApiSlice'
import { huobiApiSlice } from 'app/slices/huobiApiSlice'
import { krakenApiSlice } from 'app/slices/krakenApiSlice'

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
