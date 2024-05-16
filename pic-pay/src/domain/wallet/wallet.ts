import { Entity } from "../../shared/entity";

export interface CreateWalletDto {
    fullName: string;
    cpf: string;
    email: string;
    phone: string;
    balance: number;
    password: string;
    walletType: WalletType;
}

export type UpdateWalletDto = Partial<CreateWalletDto>;

export enum WalletType {
    COMMOM = 1,
    SHOPKEEPER = 2,
}

class Wallet extends Entity {
    protected _fullName: string;
    protected _cpf: string;
    protected _walletType: WalletType;
    protected _email: string;
    protected _phone: string;
    protected _balance: number;
    protected _password: string;
    protected _createdAt: Date = new Date();

    constructor(
        {
            fullName,
            cpf,
            balance,
            email,
            password,
            phone,
            walletType,
        }: CreateWalletDto,
        id?: string,
    ) {
        super(id);

        this._balance = balance;
        this._fullName = fullName;
        this._cpf = cpf;
        this._email = email;
        this._phone = phone;
        this._password = password;
        this._password = password;
        this._walletType = walletType;
    }

    get fullName() {
        return this._fullName;
    }

    get cpf() {
        return this._cpf;
    }

    get balance() {
        return this._balance;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get phone() {
        return this._phone;
    }

    get walletType() {
        return this._walletType;
    }

    get createdAt() {
        return this._createdAt;
    }
}

export { Wallet };
