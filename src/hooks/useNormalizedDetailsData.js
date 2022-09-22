import { useState, useEffect } from 'react'

export default function useNormalizedDetailsData(name, data) {
    const [normalizedData, setNormalizedData] = useState()

    useEffect(() => {
        // binance - id, price, qty, time
        // huobi - id, close, amount, time
        switch (name) {
            case 'Binance':
            default: {
                setNormalizedData(data)
                break
            }
            case 'Huobi': {
                const huobiNormalizedData = data?.data?.map(
                    ({ id, close, amount }) => ({
                        id,
                        price: close,
                        qty: amount,
                        time: null,
                    }),
                )

                setNormalizedData(huobiNormalizedData)
            }
        }
    }, [name, data])

    return normalizedData
}
