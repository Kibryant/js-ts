import { Entity } from "../../shared/entity";
import Result from "../../shared/result";
import { isValidCpf, isValidBalance, isValidPhone } from "../../utils";

export interface CreateWalletDto {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    balance: number;
    password: string;
    walletType: WALLET_TYPE;
}

export interface UpdateWalletDto {
    name?: string;
    cpf?: string;
    email?: string;
    phone?: string;
    balance?: number;
    password?: string;
    walletType?: WALLET_TYPE;
}


export enum WALLET_TYPE {
    COMMOM = 1,
    SHOPKEEPER = 2,
}

export interface WalletProps {
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    balance: number;
    password: string;
    walletType: WALLET_TYPE;
}

export default class Wallet extends Entity {
    protected _name: string;
    protected _cpf: string;
    protected _walletType: WALLET_TYPE;
    protected _email: string;
    protected _phone: string;
    protected _balance: number;
    protected _password: string;
    protected _createdAt: Date = new Date();

    private constructor(
        {
            name,
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
        this._name = name;
        this._cpf = cpf;
        this._email = email;
        this._phone = phone;
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

    get name() {
        return this._name;
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

    update(fields: UpdateWalletDto): Result<Wallet> {
        if (fields.cpf && !isValidCpf(fields.cpf)) {
            return Result.fail('Invalid CPF');
        }

        if (fields.balance && !isValidBalance(fields.balance)) {
            return Result.fail('Invalid balance');
        }

        if (fields.phone && !isValidPhone(fields.phone)) {
            return Result.fail('Invalid phone');
        }

        if (fields.name) {
            this._name = fields.name;
        }

        if (fields.cpf) {
            this._cpf = fields.cpf;
        }

        if (fields.email) {
            this._email = fields.email;
        }

        if (fields.phone) {
            this._phone = fields.phone;
        }

        if (fields.balance !== undefined) {
            this._balance = fields.balance;
        }

        if (fields.password) {
            this._password = fields.password;
        }

        if (fields.walletType !== undefined) {
            this._walletType = fields.walletType;
        }

        return Result.ok(this);
    }

    credit(amount: number): Result<void> {
        if(amount <= 0) {
            return Result.fail('Invalid amount');
        }

        this._balance += amount;

        return Result.ok();
    }

    debit(amount: number): Result<void> {
        if(amount > this._balance) {
            return Result.fail('Insufficient funds');
        }

        this._balance -= amount;

        return Result.ok();
    }
}

