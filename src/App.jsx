import { useState } from 'react'
import {
    useFetchExchangeInfoQuery,
    useFetchPriceQuery,
} from 'features/exchanges/exchangesApiSlice'
import { findMatches } from 'utils'

import './App.scss'
import Exchange from './Exchange'

function App() {
    const [searchInput, setSearchInput] = useState('')
    const [matches, setMatches] = useState(null)
    const [selectedSymbol, setSelectedSymbol] = useState(null)
    const { data = [], isFetching } = useFetchExchangeInfoQuery()
    const [binancePrice, setBinancePrice] = useState(null)
    const symbols = data?.symbols?.map(({ baseAsset, quoteAsset, symbol }) => ({
        baseAsset,
        quoteAsset,
        symbol,
    }))

    return (
        <div className="App">
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

export default App
