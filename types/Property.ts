import { Dayjs } from "dayjs"

import { BILL_TYPES } from "types/Bill"
import { User } from "types/User"
import { Photo } from "types/Photo"
import { Pagination, ALL_TAB } from "types/misc"
import { Contract } from "types/Contract"

export enum PROPERTY_TYPES {
    HOUSE = "HOUSE",
    APARTMENT = "APARTMENT",
    OFFICE = "OFFICE"
}

export enum PROPERTY_LABELS {
    HOUSE = "house",
    APARTMENT = "apartment",
    OFFICE = "office"
}

export interface PropertyValueAndLabel {
    value: PROPERTY_TYPES;
    label: PROPERTY_LABELS;
}

export type PropertiesPageTabType = PROPERTY_TYPES | ALL_TAB["key"]

export const getPropertyTypeValueAndLabel = (type: PROPERTY_TYPES): PropertyValueAndLabel => {
    return { value: type, label: PROPERTY_LABELS[type] }
}

export interface PropertyBaseData {
    title: string;
    description?: string | null;
    rooms?: number | null;
    address: string;
    floor?: number | null;
    floors: number | null;
    floorArea: number | null;
    rentPrice: number;
    type: PROPERTY_TYPES;
    billTypes?: BILL_TYPES[] | string;
}

export interface PropertyFormData extends PropertyBaseData {
    uploadPhotos: any;
    jsonPhotos: string;
    addRenter: boolean;
    renterName?: string;
    renterEmail?: string;
    dueDate?: number;
    startDate?: Dayjs;
    expirationDate?: Dayjs;
}

export interface Property extends PropertyBaseData {
    id: number;
    administrator: User;
    administratorId: number;
    renter: User | null;
    renterId: number | null;
    photos?: Photo[] | null;
    contracts?: Contract[] | null;
}

export interface PaginatedProperties extends Pagination {
    data: Property[];
}

export interface PropertyQueryOptions {
    page: number;
    pageSize: number;
    type?: PropertiesPageTabType;
}