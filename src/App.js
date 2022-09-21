import { useState } from 'react'
import { useFetchExchangeInfoQuery } from 'features/exchanges/exchangesApiSlice'
import './App.scss'

function findMatches(searchInput, symbols) {
    if (!searchInput) return []

    return symbols.filter(({ symbol }) =>
        symbol
            .toLowerCase()
            .includes(searchInput.toLowerCase().replace(/[^a-z0-9]/g, '')),
    )
}

function App() {
    const [searchInput, setSearchInput] = useState('')
    const [matches, setMatches] = useState(null)
    const { data = [], isFetching } = useFetchExchangeInfoQuery()

    const symbols = data?.symbols?.map(({ baseAsset, quoteAsset, symbol }) => ({
        baseAsset,
        quoteAsset,
        symbol,
    }))

    return (
        <div className="App">
            <form className="search-form">
                <input
                    type="text"
                    className="search"
                    placeholder="Pair of interest (ex. `BTC/USD`)"
                    value={searchInput}
                    onChange={e => {
                        setSearchInput(e.target.value)

                        setMatches(findMatches(e.target.value, symbols))
                    }}
                />
                <ul className="suggestions">
                    {matches?.map(({ baseAsset, quoteAsset, symbol }) => {
                        return (
                            <li key={symbol}>
                                <span>
                                    {baseAsset} / {quoteAsset}
                                </span>
                                <span className="symbol">{symbol}</span>
                            </li>
                        )
                    })}
                </ul>
            </form>
        </div>
    )
}

export default App
