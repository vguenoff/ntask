import { useFetchPriceQuery } from 'features/exchanges/exchangesApiSlice'
import useModal from 'hooks/useModal'
import Modal from 'components/Modal'

export default function Exchange({ name, selectedSymbol }) {
    const { data = {}, isFetching } = useFetchPriceQuery(selectedSymbol.symbol)
    const { baseAsset, quoteAsset } = selectedSymbol
    const { isShowing, toggleModal } = useModal()

    return (
        <>
            {!isFetching && (
                <section className="results">
                    <span>{name}</span>

                    <span className="symbol" onClick={toggleModal}>
                        1 {baseAsset} = {Number(data.price).toFixed(3)}{' '}
                        {quoteAsset}
                    </span>
                    <Modal title="History" {...{ isShowing, toggleModal }}>
                        yooo
                    </Modal>
                </section>
            )}
        </>
    )
}
