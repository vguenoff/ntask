import { useState, useEffect } from 'react'

import {
    useFetchBinancePriceQuery,
    useFetchBinanceDetailsQuery,
} from 'app/slices/binanceApiSlice'

// import {
//     useFetchBitfinexPriceQuery,
//     useFetchBitfinexDetailsQuery,
// } from 'app/apiSlices/bitfinexApiSlice'

import {
    useFetchHuobiPriceQuery,
    useFetchHuobiDetailsQuery,
} from 'app/slices/huobiApiSlice'

import useSplitParams from 'hooks/useSplitParams'
import { getObjValueFromPath } from 'utils'

export default function useAllExchangesWIthPrice() {
    const [exchanges, setExchanges] = useState([])

    const { symbol } = useSplitParams()
    const {
        data: binanceData,
        isFetching: isBinanceFetching,
        error: binanceDataError,
    } = useFetchBinancePriceQuery(symbol)
    const {
        data: huobiData,
        isFetching: isHuobiFetching,
        error: huobiDataError,
    } = useFetchHuobiPriceQuery(symbol)

    useEffect(() => {
        if (!(isBinanceFetching && isHuobiFetching)) {
            const exchangesInitial = [
                {
                    name: 'Binance',
                    useFetchDetails: useFetchBinanceDetailsQuery,
                    isFetching: isBinanceFetching,
                    priceAvailable: Number(
                        getObjValueFromPath(binanceData, 'price'),
                    ),
                    error: binanceDataError,
                },
                {
                    name: 'Huobi',
                    useFetchDetails: useFetchHuobiDetailsQuery,
                    isFetching: isHuobiFetching,
                    priceAvailable: Number(
                        getObjValueFromPath(huobiData, 'tick.ask.0'),
                    ),
                    error: huobiDataError,
                },
            ]

            setExchanges(exchangesInitial)
        }
    }, [
        binanceData,
        isBinanceFetching,
        huobiData,
        isHuobiFetching,
        binanceDataError,
        huobiDataError,
    ])

    return [exchanges, setExchanges]
}
