import { useState } from 'react'
import { useFetchExchangeInfoQuery } from 'features/exchanges/exchangesApiSlice'
import { findMatches } from 'utils'

import './index.scss'
import Exchange from '../Exchange'

export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [matches, setMatches] = useState(null)
    const [selectedSymbol, setSelectedSymbol] = useState(null)
    const { data = [], isFetching } = useFetchExchangeInfoQuery()
    const symbols = data?.symbols?.map(({ baseAsset, quoteAsset, symbol }) => ({
        baseAsset,
        quoteAsset,
        symbol,
    }))

    return (
        <div className="Search">
            <form
                className="search-form"
                onSubmit={e => e.preventDefault()}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setSelectedSymbol(matches[0])
                        setMatches(null)
                        setSearchInput('')

                        // TODO: Add up and down arrows
                    }
                }}
            >
                <input
                    type="text"
                    className="search"
                    placeholder="Pair of interest (ex. `BTC/USD`)"
                    value={searchInput}
                    onChange={e => {
                        setSearchInput(e.target.value)
                        setSelectedSymbol(null)

                        setMatches(findMatches(e.target.value, symbols))
                    }}
                />
                <ul className="suggestions">
                    {matches?.map(({ baseAsset, quoteAsset, symbol }) => {
                        return (
                            <li
                                key={symbol}
                                onClick={() => {
                                    setSelectedSymbol({
                                        baseAsset,
                                        quoteAsset,
                                        symbol,
                                    })
                                    setMatches(null)
                                    setSearchInput('')
                                }}
                            >
                                <span>
                                    {baseAsset} / {quoteAsset}
                                </span>
                                <span className="symbol">{symbol}</span>
                            </li>
                        )
                    })}
                </ul>
                {selectedSymbol && (
                    <Exchange name="Binance" {...{ selectedSymbol }} />
                )}
            </form>
        </div>
    )
}
