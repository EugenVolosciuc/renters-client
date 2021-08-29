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

export interface ALL_TAB {
    key: "ALL",
    label: "All"
}