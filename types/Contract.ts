import { User } from "types/User";
import { Property } from "./Property";

export interface Contract {
    id: number;
    createdAt: string;
    renter?: User;
    property: Property;
    propertyId: number;
    dueDate: number;
    startDate: string;
    expirationDate: string;
    url?: string;
}

export interface ContractDto {
    id: number;
    createdAt: string;
    renter?: User;
    property: Property;
    propertyId: number;
    dueDate: number;
    startDate: Date;
    expirationDate: Date;
    url?: string;
}