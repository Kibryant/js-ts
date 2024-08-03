import { Entity } from "../../shared/entity";
import Result from "../../shared/result";
import { isValidCpf, isValidBalance, isValidPhone } from "../../utils";

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

export interface WalletProps {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    phone: string;
    balance: number;
    password: string;
    walletType: WalletType;
}

export default class Wallet extends Entity {
    protected _fullName: string;
    protected _cpf: string;
    protected _walletType: WalletType;
    protected _email: string;
    protected _phone: string;
    protected _balance: number;
    protected _password: string;
    protected _createdAt: Date = new Date();

    private constructor(
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

    static create(
        fields: CreateWalletDto,
        id?: string,
    ): Result<Wallet> {

        if (!isValidCpf(fields.cpf)) {
            return Result.fail<Wallet>('Invalid CPF');
        }

        if (!isValidBalance(fields.balance)) {
            return Result.fail<Wallet>('Invalid balance');
        }

        if (!isValidPhone(fields.phone)) {
            return Result.fail<Wallet>('Invalid phone');
        }

        return Result.ok(new Wallet(fields, id))
    }

    static update(
        fields: UpdateWalletDto,
        id: string,
    ): Result<Wallet> {
        const result = Wallet.create(fields as CreateWalletDto, id);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        return result;
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

