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
        }, 300)
        setTimeout(() => {
            setProgress(100)
        }, 500)
    }, [pathname])

    return (
        <LoadingBar
            color='#7F00FF'
            progress={progress}
            waitingTime={800}
            loaderSpeed={1000}
            onLoaderFinished={() => setProgress(0)}
        />
    )
}

export default TopLoadingBar
