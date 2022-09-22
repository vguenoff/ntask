import { useState, useEffect } from 'react'
import { useFetchBinanceExchangeInfoQuery } from 'features/exchanges/binanceApiSlice'
// import { useFetchBitfinexExchangeInfoQuery } from 'features/exchanges/bitfinexApiSlice'
import { useFetchHuobiExchangeInfoQuery } from 'features/exchanges/huobiApiSlice'
// import { useFetchKrakenExchangeInfoQuery } from 'features/exchanges/krakenApiSlice'

import { removeDuplicates } from 'utils'

export default function useAllExchangeInfoData() {
    const [uniqueData, setUniqueData] = useState([])
    const { data: binanceData = {} } = useFetchBinanceExchangeInfoQuery()
    // const { data: bitfinexData = [] } = useFetchBitfinexExchangeInfoQuery() // cors error
    const { data: huobiData = {} } = useFetchHuobiExchangeInfoQuery()
    // const { data: krakenData = {} } = useFetchKrakenExchangeInfoQuery()

    useEffect(() => {
        if (binanceData.symbols && huobiData.data) {
            const binanceDataNormalized = binanceData?.symbols?.map(
                ({ baseAsset, quoteAsset, symbol }) => ({
                    baseAsset,
                    quoteAsset,
                    symbol,
                }),
            )
            const huobiDataNormalized = huobiData?.data?.map(
                ({ bc, qc, symbol }) => ({
                    baseAsset: bc.toUpperCase(),
                    quoteAsset: qc.toUpperCase(),
                    symbol: symbol.toUpperCase(),
                }),
            )

            const unique = removeDuplicates([
                ...binanceDataNormalized,
                ...huobiDataNormalized,
            ])

            setUniqueData(unique)
        }
    }, [
        binanceData,
        //  bitfinexData,
        huobiData,
        // krakenData,
    ])

    return uniqueData
}
