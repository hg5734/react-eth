export interface LoginInterface {
    email: string;
    password: string;
}

export interface IUserInformation {
    token: string;
    email: string;
    role: string;
    name: string;
}

export interface Asset {
    address: string;
}

export interface Transaction {
    address: string;
}
