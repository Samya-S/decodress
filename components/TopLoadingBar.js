"use client"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = () => {
    const pathname = usePathname()
    const [progress, setProgress] = useState(30)

    useEffect(() => {
        setTimeout(() => {
            setProgress(50)
        }, 100)
        setTimeout(() => {
            setProgress(100)
        }, 300)
    }, [pathname])

    return (
        <LoadingBar
            color='#7F00FF'
            progress={progress}
            waitingTime={500}
            loaderSpeed={300}
            onLoaderFinished={() => setProgress(0)}
        />
    )
}

export default TopLoadingBar
