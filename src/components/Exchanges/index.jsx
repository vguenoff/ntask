import { useState, useEffect } from 'react'

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

import useSplitParams from 'hooks/useSplitParams'
import { getObjValueFromPath } from 'utils'

import SingleExchange from './SingleExchange'

import './index.scss'

export default function Exchanges() {
    const [exchanges, setExchanges] = useState([])
    const [sortedDown, setSortedDown] = useState(false)

    const { symbol } = useSplitParams()
    const { data: binanceData, isFetching: isBinanceFetching } =
        useFetchBinancePriceQuery(symbol)
    const { data: huobiData, isFetching: isHuobiFetching } =
        useFetchHuobiPriceQuery(symbol)

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
                },
                {
                    name: 'Huobi',
                    useFetchDetails: useFetchHuobiDetailsQuery,
                    isFetching: isHuobiFetching,
                    priceAvailable: Number(
                        getObjValueFromPath(huobiData, 'tick.ask.0'),
                    ),
                },
            ]

            setExchanges(exchangesInitial)
        }
    }, [binanceData, isBinanceFetching, huobiData, isHuobiFetching])

    return (
        <>
            {exchanges && (
                <>
                    <div className="Exchanges">
                        <p className="sorting">
                            <span>{symbol}</span>{' '}
                            <span
                                className="sort"
                                onClick={() => {
                                    const sorted = [...exchanges].sort(
                                        (a, b) =>
                                            a.priceAvailable - b.priceAvailable,
                                    )

                                    setExchanges(sorted)
                                    setSortedDown(true)
                                }}
                            >
                                {sortedDown ? '▼ Sorted' : '► Sort'} by price
                            </span>
                        </p>
                        {exchanges.map(props => (
                            <SingleExchange key={props.name} {...props} />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
