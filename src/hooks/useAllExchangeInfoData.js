import { useState, useEffect } from 'react'
import { useFetchBinanceExchangeInfoQuery } from 'app/slices/binanceApiSlice'
// import { useFetchBitfinexExchangeInfoQuery } from 'app/slices/bitfinexApiSlice'
import { useFetchHuobiExchangeInfoQuery } from 'app/slices/huobiApiSlice'
import //     useFetchKrakenExchangeInfoQuery,
// useFetchKrakenPriceQuery,
//     useFetchKrakenDetailsQuery,
'app/slices/krakenApiSlice'

import { removeDuplicates } from 'utils'

export default function useAllExchangeInfoData() {
    const [uniqueData, setUniqueData] = useState([])
    const { data: binanceData = {} } = useFetchBinanceExchangeInfoQuery()
    const { data: huobiData = {} } = useFetchHuobiExchangeInfoQuery()
    // const { data: krakenData } = useFetchKrakenExchangeInfoQuery()
    // const { data: bitfinexData = [] } = useFetchBitfinexExchangeInfoQuery()

    // console.log(useFetchKrakenPriceQuery('WBTCUSD'))
    // console.log(useFetchKrakenDetailsQuery('WBTCUSD'))

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
