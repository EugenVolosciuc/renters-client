export interface Pagination {
    current_page: number;
    from: number;
    last_page: number;
    next_page: number | null;
    per_page: number;
    prev_page: number | null;
    to: number;
    total: number;
}

export interface PaginationOptions {
    page: number;
}

export type PageQuery = {
    page: number,
    pageSize: number,
    [key: string]: unknown
}

export interface ALL_TAB {
    key: "ALL",
    label: "All"
}