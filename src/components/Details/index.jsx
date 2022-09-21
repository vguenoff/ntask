import { useFetchDetailsQuery } from 'features/exchanges/exchangesApiSlice'
import useSplitParams from 'hooks/useSplitParams'

import './index.scss'

export default function Details() {
    const { symbol } = useSplitParams()
    const { data = [] } = useFetchDetailsQuery(symbol)

    return (
        <div className="Details">
            <ul>
                {data?.map(({ id, price, qty, time }) => {
                    const [date, hour] = new Date(time).toISOString().split('T')
                    const [hourFormat] = hour.split('.')

                    return (
                        <li key={id}>
                            <span>
                                Price/Qty: {price} / {qty}
                            </span>
                            <span>
                                {hourFormat} / {date}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
