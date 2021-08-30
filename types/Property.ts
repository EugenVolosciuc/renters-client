import { BILL_TYPES } from "types/Bill"
import { User } from "types/User"
import { Photo } from "types/Photo"
import { Pagination, ALL_TAB } from "types/misc"

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

export type PropertyTabType = PROPERTY_TYPES | ALL_TAB["key"]

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
    billTypes?: BILL_TYPES[];
}

export interface PropertyFormData extends PropertyBaseData {
    uploadPhotos: any;
    jsonPhotos: string;
    addRenter: boolean;
    renterName?: string;
    renterEmail?: string;
}

export interface Property extends PropertyBaseData {
    id: number;
    administrator: User;
    administratorId: number;
    renter: User | null;
    renterId: number | null;
    photos?: Photo[] | null;
}

export interface PaginatedProperties extends Pagination {
    data: Property[];
}

export interface PropertyQueryOptions {
    page: number;
    type?: PropertyTabType;
}