import {
    useFetchBinancePriceQuery,
    useFetchBinanceDetailsQuery,
} from 'features/exchanges/binanceApiSlice'

// import {
//     useFetchBitfinexPriceQuery,
//     useFetchBitfinexDetailsQuery,
// } from 'features/exchanges/bitfinexApiSlice'

import {
    useFetchHuobiPriceQuery,
    useFetchHuobiDetailsQuery,
} from 'features/exchanges/huobiApiSlice'

import SingleExchange from './SingleExchange'

export default function Exchanges() {
    return (
        <>
            <SingleExchange
                name="Binance"
                useFetch={useFetchBinancePriceQuery}
                useFetchDetails={useFetchBinanceDetailsQuery}
            />
            {/* <SingleExchange
                name="Bitfinex"
                useFetch={useFetchBitfinexPriceQuery}
                useFetchDetails={useFetchBitfinexDetailsQuery}
            /> */}
            <SingleExchange
                name="Huobi"
                useFetch={useFetchHuobiPriceQuery}
                useFetchDetails={useFetchHuobiDetailsQuery}
            />
        </>
    )
}
