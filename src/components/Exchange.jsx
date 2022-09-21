import { useFetchPriceQuery } from 'features/exchanges/exchangesApiSlice'
import useModal from 'hooks/useModal'
import Modal from 'components/Modal'
import History from './History'

export default function Exchange({ name, selectedSymbol }) {
    const { baseAsset, quoteAsset, symbol } = selectedSymbol
    const { data = {}, isFetching } = useFetchPriceQuery(symbol)
    const { isShowing, toggleModal } = useModal()

    return (
        <>
            {!isFetching && (
                <section className="results">
                    <span>{name}</span>

                    <span className="symbol" onClick={toggleModal}>
                        1 {baseAsset} = {data.price} {quoteAsset}
                    </span>
                    <Modal
                        title={`${symbol}: Last 5 transactions on ${name}`}
                        {...{ isShowing, toggleModal }}
                    >
                        <History {...{ symbol }} />
                    </Modal>
                </section>
            )}
        </>
    )
}
