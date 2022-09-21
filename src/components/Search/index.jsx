import { useState } from 'react'
import { useFetchExchangeInfoQuery } from 'features/exchanges/exchangesApiSlice'
import { findMatches } from 'utils'
import { useNavigate, Outlet } from 'react-router-dom'
import useSplitParams from 'hooks/useSplitParams'

import './index.scss'

export default function Search() {
    const { data = [] } = useFetchExchangeInfoQuery()
    const { symbol } = useSplitParams()
    const [searchInput, setSearchInput] = useState('')
    const [matches, setMatches] = useState(null)
    const [selectedSymbol, setSelectedSymbol] = useState(symbol)
    const navigate = useNavigate()

    return (
        <div className="Search">
            <form
                className="search-form"
                onSubmit={e => e.preventDefault()}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        const { baseAsset, quoteAsset, symbol } = matches[0]

                        setMatches(null)
                        setSearchInput('')
                        setSelectedSymbol(symbol)
                        navigate(`${baseAsset}_${quoteAsset}`)
                    }
                }}
            >
                <input
                    type="text"
                    className="search"
                    placeholder="Type pair of interest (ex. `BTC/USD`)"
                    value={searchInput}
                    onChange={e => {
                        setSearchInput(e.target.value)
                        setMatches(findMatches(e.target.value, data.symbols))
                        setSelectedSymbol(null)
                    }}
                />
                <ul className="suggestions">
                    {matches?.map(({ baseAsset, quoteAsset, symbol }) => {
                        return (
                            <li
                                key={symbol}
                                onClick={() => {
                                    setMatches(null)
                                    setSearchInput('')
                                    setSelectedSymbol(symbol)
                                    navigate(`${baseAsset}_${quoteAsset}`)
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
                {selectedSymbol && <Outlet />}
            </form>
        </div>
    )
}
