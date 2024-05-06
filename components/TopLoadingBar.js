"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = () => {
    const router = useRouter()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        console.log(router.events)
        // if (router && router.events) { // Check if router is defined
            router.events.on('routeChangeStart', () => {
                // setProgress(30)
            })
            router.events.on('routeChangeComplete', () => {
                // setProgress(100)
            })
            router.events.on('routeChangeError', () => {
                // setProgress(100)
            })
        // }
    }, [router])

    return (
        <LoadingBar
            color='#f11946'
            progress={progress}
            waitingTime={800}
            onLoaderFinished={() => setProgress(0)}
        />
    )
}

export default TopLoadingBar
