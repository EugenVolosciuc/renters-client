import { BILL_TYPES } from "types/Bill"
import { User } from "types/User"
import { Photo } from "types/Photo"

export enum PROPERTY_TYPES {
    HOUSE = "HOUSE",
    APARTMENT = "APARTMENT",
    OFFICE = "OFFICE"
}

export enum PROPERTY_LABELS {
    HOUSE = "House",
    APARTMENT = "Apartment",
    OFFICE = "Office"
}

export interface PropertyValueAndLabel {
    value: PROPERTY_TYPES;
    label: PROPERTY_LABELS;
}

export const getPropertyTypeValueAndLabel = (type: PROPERTY_TYPES): PropertyValueAndLabel => {
    return { value: type, label: PROPERTY_LABELS[type] }
}

export interface PropertyFormData {
    title: string;
    description: string | null;
    rooms: number | null;
    address: string;
    floors: number | null;
    floorArea: number | null;
    rentPrice: number;
    type: PROPERTY_TYPES;
    billTypes: BILL_TYPES[];
}

export interface Property extends PropertyFormData {
    id: number;
    administrator: User;
    administratorId: number;
    renter: User | null;
    renterId: number | null;
    photos: Photo[] | null;
}