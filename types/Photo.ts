export enum PHOTO_TYPE {
    PROPERTY = "PROPERTY",
    BILL = "BILL"
}

export interface Photo {
    id: number;
    url: string;
    title: string;
    public_id: string;
    type: PHOTO_TYPE;
}