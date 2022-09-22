import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { string, func, bool, number } from 'prop-types'

import Modal from 'components/Modal'
import useSplitParams from 'hooks/useSplitParams'

SingleExchange.propTypes = {
    name: string.isRequired,
    useFetchDetails: func.isRequired,
    isFetching: bool.isRequired,
    priceAvailable: number.isRequired,
}

export default function SingleExchange({
    name,
    useFetchDetails,
    isFetching,
    priceAvailable,
    error,
}) {
    const { baseAsset, quoteAsset } = useSplitParams()
    const { pathname } = useLocation()
    const [isShowing, setIsShowing] = useState(
        pathname.includes(`details/${name.toLowerCase()}`),
    )
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

                        {error ? (
                            <span className="error">Network error</span>
                        ) : priceAvailable ? (
                            <span
                                className="symbol"
                                onClick={() => {
                                    navigate(`details/${name.toLowerCase()}`)
                                    toggleModal()
                                }}
                            >
                                1 {baseAsset} = {priceAvailable} {quoteAsset}
                            </span>
                        ) : (
                            <span>Missing on current exchange.</span>
                        )}
                    </section>
                    <Modal
                        title={`${baseAsset}/${quoteAsset}: Last 5 transactions on ${name}`}
                        {...{ toggleModal, isShowing }}
                    >
                        <Outlet context={{ name, useFetchDetails }} />
                    </Modal>
                </>
            )}
        </>
    )
}
