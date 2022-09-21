import { useFetchPriceQuery } from 'features/exchanges/exchangesApiSlice'

export default function Exchange({ name, selectedSymbol }) {
    const { data = {}, isFetching } = useFetchPriceQuery(selectedSymbol.symbol)

    return (
        <>
            {!isFetching && (
                <section className="results">
                    <span>{name}</span>
                    <span className="symbol">
                        {selectedSymbol.baseAsset} / {selectedSymbol.quoteAsset}
                    </span>
                    <span>{data.price}</span>
                </section>
            )}
        </>
    )
}
