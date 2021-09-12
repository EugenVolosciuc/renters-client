import { User } from "types/User";
import { Property } from "./Property";

export interface Contract {
    id: number;
    createdAt: string;
    renter?: User;
    property: Property;
    propertyId: number;
    dueDate: number;
    expirationDate: string;
    url?: string;
}