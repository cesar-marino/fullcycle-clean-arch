export interface InputFindCustumerDto {
    id: string;
}

export interface OutputFindCustumerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    }
}