import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { findMatches } from 'utils'
import useSplitParams from 'hooks/useSplitParams'
import useAllExchangeInfoData from 'hooks/useAllExchangeInfoData'

import './index.scss'

export default function Search() {
    const navigate = useNavigate()
    const { symbol } = useSplitParams()
    const uniqueData = useAllExchangeInfoData()
    const [selectedSymbol, setSelectedSymbol] = useState(symbol)
    const [searchInput, setSearchInput] = useState('')
    const [matches, setMatches] = useState([])

    const handleSelect = ({ baseAsset, quoteAsset, symbol }) => {
        setMatches([])
        setSearchInput('')
        setSelectedSymbol(symbol)
        navigate(`${baseAsset}_${quoteAsset}`)
    }

    return (
        <div className="Search">
            <form
                className="search-form"
                onSubmit={e => e.preventDefault()}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSelect(matches[0]) // TODO: handle select with arrow keys
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
                        setMatches(findMatches(e.target.value, uniqueData))
                        setSelectedSymbol(null)
                    }}
                />
                <ul className="suggestions">
                    {matches.map(match => {
                        const { baseAsset, quoteAsset, symbol } = match

                        return (
                            <li
                                key={symbol}
                                onClick={() => handleSelect(match)}
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
