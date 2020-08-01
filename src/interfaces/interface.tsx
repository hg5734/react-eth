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
    _id?:string;
    ethAddress: string;
    assetAddress: string;
    name: string;
    symbol?: string
}

export interface LogsQuery {
    ethAddress: string;
    assetAddress: string;
}

export interface Transaction {
    address: string;
}
