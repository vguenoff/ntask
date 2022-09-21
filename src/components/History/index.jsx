import { useFetchHistoryQuery } from 'features/exchanges/exchangesApiSlice'
import useSplitParams from 'hooks/useSplitParams'

import './index.scss'

export default function History() {
    const { symbol } = useSplitParams()
    const { data = [] } = useFetchHistoryQuery(symbol)

    return (
        <div className="History">
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
