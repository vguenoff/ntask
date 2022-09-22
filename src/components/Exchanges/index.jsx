import { useState } from 'react'

import useAllExchangesWIthPrice from 'hooks/useAllExchangesWIthPrice'
import useSplitParams from 'hooks/useSplitParams'
import SingleExchange from './SingleExchange'

import './index.scss'

export default function Exchanges() {
    const [sortedDown, setSortedDown] = useState(false)
    const [exchanges, setExchanges] = useAllExchangesWIthPrice()
    const { symbol } = useSplitParams()

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
