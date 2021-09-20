import { User } from "types/User"
import { Property } from "types/Property"
import { Photo } from "types/Photo"
import { Bill } from "types/Bill"

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

export interface PageQuery {
    [key: string]: unknown;
}

export interface PaginatedPageQuery extends PageQuery {
    page: number;
    pageSize: number;
}

export interface ALL_TAB {
    key: "ALL",
    label: "All"
}

export enum EntityTypes {
    PROPERTY = "PROPERTY",
    CONTRACT = "CONTRACT",
    USER = "USER"
}

export type AnyEntity = User | Property | Photo | Bill