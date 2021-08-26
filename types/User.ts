export enum USER_ROLES {
    SUPER_ADMIN = "SUPER_ADMIN",
    PROPERTY_ADMIN = "PROPERTY_ADMIN",
    RENTER = "RENTER"
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: USER_ROLES;
    createdAt: string;
    updatedAt: string;
}

export interface LoginData {
    email: string;
    password: string;
}