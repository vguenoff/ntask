import { string } from 'prop-types'
import { useFetchHistoryQuery } from 'features/exchanges/exchangesApiSlice'
import './index.scss'

History.propTypes = {
    symbol: string.isRequired,
}

export default function History({ symbol }) {
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
