import { useParams } from 'react-router-dom'

export default function useSplitParams() {
    const { exchangePair } = useParams()
    const [baseAsset, quoteAsset] = exchangePair.split('_')
    const symbol = baseAsset + quoteAsset

    return { symbol, baseAsset, quoteAsset }
}
