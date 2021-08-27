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

export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}