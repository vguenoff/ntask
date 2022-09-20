import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import { binanceApiSlice } from '../features/exchanges/exchangesApiSlice'

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        [binanceApiSlice.reducerPath]: binanceApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(binanceApiSlice.middleware)
    },
})
