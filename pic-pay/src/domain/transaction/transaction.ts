import { Entity } from "../../shared/entity";
import Result from "../../shared/result";
import { isValidAmount } from "../../utils/isValidAumont";

export enum STATUS {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface CreateTransactionDto {
    payerId: string;
    payeeId: string;
    amount: number;
    status?: STATUS;
}

export interface UpdateTransactionDto {
    status: STATUS;
}

export interface TransactionProps {
    id: string;
    payerId: string;
    payeeId: string;
    amount: number;
    status: STATUS;
    createdAt: Date;
}

export default class Transaction extends Entity {
    protected _payerId: string;
    protected _payeeId: string;
    protected _amount: number;
    protected _status: STATUS;
    protected _createdAt: Date = new Date();

    private constructor(
        { payeeId, payerId, amount, status }: CreateTransactionDto,
        id?: string,
    ) {
        super(id);

        this._payeeId = payeeId;
        this._payerId = payerId;
        this._amount = amount;
        this._status = status || STATUS.PENDING;
    }

    static create(data: CreateTransactionDto, id?: string): Result<Transaction> {
        if (!isValidAmount(data.amount)) {
            return Result.fail("Invalid amount");
        }

        const transaction = new Transaction(data, id);

        return Result.ok(transaction);
    }

    get payerId() {
        return this._payerId;
    }

    get payeeId() {
        return this._payeeId;
    }

    get amount() {
        return this._amount;
    }

    get status() {
        return this._status;
    }

    get createdAt() {
        return this._createdAt;
    }

    approve() {
        this._status = STATUS.APPROVED;
    }

    reject() {
        this._status = STATUS.REJECTED;
    }
}
