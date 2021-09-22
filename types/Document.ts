export enum DOCUMENT_TYPE {
    CONTRACT = "CONTRACT",
    BILL = "BILL"
}

export interface Document {
    id: number;
    url: string;
    title: string;
    public_id: string;
    type: DOCUMENT_TYPE;
}