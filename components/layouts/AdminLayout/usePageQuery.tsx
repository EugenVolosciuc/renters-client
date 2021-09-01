import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import qs from 'qs'

import { PageQuery } from 'types/misc'

export const usePageQuery = (initialQuery: PageQuery) => {
    const [query, setQuery] = useState(initialQuery)
    const router = useRouter()

    useEffect(() => {
        const parsedQuery = qs.parse(router.asPath.split('?')[1])
        const updatedTypeQuery = parsedQuery.type
        const updatedPage = parseInt(parsedQuery.page as string || "1", 10) as number

        setQuery({
            ...query,
            type: (updatedTypeQuery as string | undefined) || query.type,
            page: updatedPage || query.page
        })
    }, [router.asPath])

    return query
}
