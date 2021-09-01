import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Pagination, PaginationProps } from 'antd'
import qs from 'qs'

import { Pagination as PaginationInterface, PaginatedPageQuery } from 'types/misc'

interface PaginatedData extends PaginationInterface {
    data: any;
}

type Props = {
    query: PaginatedPageQuery,
    paginatedData?: PaginatedData,
    paginationProps?: PaginationProps
}

const PagePagination: FC<Props> = ({ query, paginatedData, paginationProps = {} }) => {
    const router = useRouter()

    const handlePaginationChange = (page: number) => {
        const queries = qs.stringify({ ...router.query, page })

        router.push(`${router.pathname}`, `${router.pathname}?${queries}`)
    }

    return (
        <Pagination
            current={query.page}
            onChange={handlePaginationChange}
            total={paginatedData?.total || 1}
            pageSize={query.pageSize}
            simple
            {...paginationProps}
        />
    )
}

export default PagePagination
