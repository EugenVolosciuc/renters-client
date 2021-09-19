import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const usePageLoading = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const checkIfDefaultLocale = (url: string) => {
        const locale = url.split('/')[1]

        return [
            !(router.locales as string[]).includes(locale), 
            locale
        ]
    }

    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)
        const handleComplete = (url: string) => {
            const [isDefaultLocale, locale] = checkIfDefaultLocale(url)

            const urlsAreTheSame = isDefaultLocale
                ? url === router.asPath
                : url === `/${locale}${router.asPath}`

            return urlsAreTheSame && setLoading(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router, setLoading])

    return loading
}