import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useFetchPriceQuery } from 'features/exchanges/exchangesApiSlice'
import Modal from 'components/Modal'
import useSplitParams from 'hooks/useSplitParams'

import './index.scss'

export default function Exchange() {
    const { symbol, baseAsset, quoteAsset } = useSplitParams()
    const { data = {}, isFetching } = useFetchPriceQuery(symbol)
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowing, setIsShowing] = useState(
        location.pathname.includes('details'),
    )

    const toggleModal = () => {
        setIsShowing(!isShowing)
        isShowing && navigate(`/${baseAsset}_${quoteAsset}`)
    }

    return (
        <>
            {!isFetching && (
                <>
                    <section className="results">
                        <span>Binance</span>
                        <span
                            className="symbol"
                            onClick={() => {
                                navigate('details')
                                toggleModal()
                            }}
                        >
                            1 {baseAsset} = {data.price} {quoteAsset}
                        </span>
                    </section>
                    <Modal
                        title={`${symbol}: Last 5 transactions on Binance`}
                        {...{ toggleModal, isShowing }}
                    >
                        <Outlet />
                    </Modal>
                </>
            )}
        </>
    )
}
