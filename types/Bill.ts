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
    RENT = "Rent",
    ELECTRICITY = "Electricity",
    WATER = "Water",
    GAS = "Gas",
    TRASH = "Trash",
    INTERNET = "Internet",
    SECURITY = "Security",
    ASSOCIATION = "Association"
}

export interface BillTypeValueAndLabel {
    value: BILL_TYPES;
    label: BILL_TYPE_LABELS;
}

export const getBillTypeValueAndLabel = (type: BILL_TYPES): BillTypeValueAndLabel => {
    return { value: type, label: BILL_TYPE_LABELS[type] }
}