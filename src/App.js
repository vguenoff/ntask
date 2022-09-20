import { useState } from 'react'
import { useFetchExchangeInfoQuery } from 'features/exchanges/exchangesApiSlice'
import './App.scss'

function findMatches(searchInput, symbols) {
    return symbols.filter(symbol => {
        const regex = new RegExp(searchInput.trim().split(' ').join(), 'gi')
        return symbol.symbol.match(regex)
    })
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

                        console.log(findMatches(e.target.value, symbols))

                        setMatches(findMatches(e.target.value, symbols))
                    }}
                />
                <ul className="suggestions">
                    {/* <li>Filter for a city</li>
                    <li>or a state</li> */}
                    {matches?.map(({ baseAsset, quoteAsset, symbol }) => (
                        <li>
                            {baseAsset} {quoteAsset} {symbol}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    )
}

export default App
