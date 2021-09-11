export enum BILL_TYPES {
    RENT = "RENT",
    ELECTRICITY = "ELECTRICITY",
    WATER = "WATER",
    GAS = "GAS",
    TRASH = "TRASH",
    INTERNET = "INTERNET",
    SECURITY = "SECURITY",
    ASSOCIATION = "ASSOCIATION"
}

export enum BILL_TYPE_LABELS {
    RENT = "rent",
    ELECTRICITY = "electricity",
    WATER = "water",
    GAS = "gas",
    TRASH = "trash",
    INTERNET = "internet",
    SECURITY = "security",
    ASSOCIATION = "association"
}

export interface BillTypeValueAndLabel {
    value: BILL_TYPES;
    label: BILL_TYPE_LABELS;
}

export const getBillTypeValueAndLabel = (type: BILL_TYPES): BillTypeValueAndLabel => {
    return { value: type, label: BILL_TYPE_LABELS[type] }
}

export interface Bill {
    
}