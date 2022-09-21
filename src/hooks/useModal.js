import { useState } from 'react'

export default function useModal() {
    const [isShowing, setIsShowing] = useState(false)
    const toggleModal = () => setIsShowing(!isShowing)

    return {
        isShowing,
        toggleModal,
    }
}
