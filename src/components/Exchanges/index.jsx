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
    const exchanges = [
        {
            name: 'Binance',
            useFetch: useFetchBinancePriceQuery,
            useFetchDetails: useFetchBinanceDetailsQuery,
            pricePath: 'price',
        },
        // {
        //     name: 'Bitfinex',
        //     useFetch: useFetchBitfinexPriceQuery,
        //     useFetchDetails: useFetchBitfinexDetailsQuery,
        // },
        {
            name: 'Huobi',
            useFetch: useFetchHuobiPriceQuery,
            useFetchDetails: useFetchHuobiDetailsQuery,
            pricePath: 'tick.ask.0',
        },
    ]

    return (
        <>
            {exchanges.map(props => (
                <SingleExchange key={props.name} {...props} />
            ))}
        </>
    )
}
