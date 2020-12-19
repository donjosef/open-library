import { useState, useEffect } from 'react'

export const useMedia = () => {
    const [media, setMedia] = useState('')

    useEffect(() => {
        getWidth()
        window.addEventListener('resize', handleResize)
    }, [])

    const getWidth = () => { 
        const width = window.innerWidth
        if(width > 761) {
            setMedia('desktop')
        }

        if(width > 451 && width < 760) {
            setMedia('tablet')
        }

        if(width <= 450) {
            setMedia('mobile')
        }
    }

    const handleResize = () => {
        getWidth()
    }

    return media
}