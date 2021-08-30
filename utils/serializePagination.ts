import { removeProp } from "./removeProp"

export const serializePagination = (query: Record<string, unknown>) => {
    return {
        per_page: query.pageSize,
        ...removeProp('pageSize', query)
    }
}