import { useOutletContext } from 'react-router-dom'

import useSplitParams from 'hooks/useSplitParams'
import useNormalizedDetailsData from 'hooks/useNormalizedDetailsData'

import './index.scss'

export default function Details() {
    const { name, useFetchDetails } = useOutletContext()
    const { symbol } = useSplitParams()
    const { data } = useFetchDetails(symbol)
    const normalizedData = useNormalizedDetailsData(name, data)

    return (
        <div className="Details">
            <ul>
                {normalizedData?.map(({ id, price, qty, time }) => {
                    const [date, hour] = new Date(time).toISOString().split('T')
                    const [hourFormat] = hour.split('.')
                    const formattedTime = time
                        ? `${hourFormat} / ${date}`
                        : 'Unknown time'

                    return (
                        <li key={id}>
                            <span>
                                Price/Qty: {price} / {qty}
                            </span>
                            <span>{formattedTime}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
