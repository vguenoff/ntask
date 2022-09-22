import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { string, func } from 'prop-types'
import useSplitParams from 'hooks/useSplitParams'
import Modal from 'components/Modal'
import { getObjValueFromPath } from 'utils'

import './SingleExchange.scss'

SingleExchange.protoTypes = {
    name: string.isRequired,
    useFetch: func.isRequired,
    useFetchDetails: func.isRequired,
    pricePath: string.isRequired,
}

export default function SingleExchange({
    name,
    useFetch,
    useFetchDetails,
    pricePath,
}) {
    const { symbol, baseAsset, quoteAsset } = useSplitParams()
    const { data = {}, isFetching } = useFetch(symbol)
    const { pathname } = useLocation()
    const [isShowing, setIsShowing] = useState(
        pathname.includes(`details/${name.toLowerCase()}`),
    )
    const navigate = useNavigate()

    const toggleModal = () => {
        setIsShowing(!isShowing)
        isShowing && navigate(`/${baseAsset}_${quoteAsset}`)
    }

    const priceAvailable = getObjValueFromPath(data, pricePath)

    return (
        <>
            {!isFetching && (
                <>
                    <section className="results">
                        <span>{name}</span>
                        {priceAvailable ? (
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
