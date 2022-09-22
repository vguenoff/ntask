import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import useSplitParams from 'hooks/useSplitParams'
import Modal from 'components/Modal'

import './SingleExchange.scss'

export default function SingleExchange({ name, useFetch, useFetchDetails }) {
    const { symbol, baseAsset, quoteAsset } = useSplitParams()
    const { data = {}, isFetching } = useFetch(symbol)
    const { pathname } = useLocation()
    const [isShowing, setIsShowing] = useState(pathname.includes('details'))
    const navigate = useNavigate()

    const toggleModal = () => {
        setIsShowing(!isShowing)
        isShowing && navigate(`/${baseAsset}_${quoteAsset}`)
    }

    return (
        <>
            {!isFetching && (
                <>
                    <section className="results">
                        <span>{name}</span>
                        <span
                            className="symbol"
                            onClick={() => {
                                navigate(`details/${name.toLowerCase()}`)
                                toggleModal()
                            }}
                        >
                            1 {baseAsset} = {data.price || data.tick.ask[0]}{' '}
                            {quoteAsset}
                        </span>
                    </section>
                    <Modal
                        title={`${baseAsset}/${quoteAsset}: Last 5 transactions on ${name}`}
                        {...{ toggleModal, isShowing }}
                    >
                        <Outlet context={{ useFetchDetails }} />
                    </Modal>
                </>
            )}
        </>
    )
}
