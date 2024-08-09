import { Entity } from "../../shared/entity";
import Result from "../../shared/result";
import { isValidAmount } from "../../utils/isValidAumont";
import { isValidScheduleDate } from "../../utils/isValidScheduleDate";

export enum STATUS {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    SCHEDULED = "SCHEDULED",
}

export interface CreateTransactionDto {
    payerId: string;
    payeeId: string;
    amount: number;
    scheduleDate?: Date;
    status?: STATUS;
}

export interface UpdateTransactionDto {
    status?: STATUS;
    scheduleDate?: Date;
}

export interface TransactionProps {
    id: string;
    payerId: string;
    payeeId: string;
    amount: number;
    status: STATUS;
    scheduleDate?: Date;
    createdAt: Date;
}

export default class Transaction extends Entity {
    protected _payerId: string;
    protected _payeeId: string;
    protected _amount: number;
    protected _status: STATUS;
    protected _createdAt: Date = new Date();
    protected _scheduleDate?: Date;

    private constructor(
        { payeeId, payerId, amount, scheduleDate, status }: CreateTransactionDto,
        id?: string,
    ) {
        super(id);

        this._payeeId = payeeId;
        this._payerId = payerId;
        this._amount = amount;
        this._scheduleDate = scheduleDate;
        this._status = status || STATUS.SCHEDULED;
    }

    private canUpdateStatus(): boolean {
        const isApproved = this._status === STATUS.APPROVED;
        const isRejected = this._status === STATUS.REJECTED;

        if (isApproved || isRejected) {
            return false;
        }

        return true;
    }

    static create(data: CreateTransactionDto, id?: string): Result<Transaction> {
        if (!isValidAmount(data.amount)) {
            return Result.fail("Invalid amount");
        }

        const transaction = new Transaction(data, id);

        return Result.ok(transaction);
    }

    update(data: UpdateTransactionDto): Result<void> {
        const canUpdateStatus = this.canUpdateStatus();
        const hasScheduleDate = data.scheduleDate;
        const hasStatus = data.status;

        if (hasStatus && !canUpdateStatus) {
            return Result.fail("Cannot update to the specified status because the transaction is already approved or rejected");
        }

        if (hasScheduleDate && !isValidScheduleDate(data.scheduleDate)) {
            return Result.fail("Schedule date cannot be in the past");
        }

        if (data.status) {
            this._status = data.status;
        }

        if (data.scheduleDate) {
            this._scheduleDate = data.scheduleDate;
        }

        return Result.ok();
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

    get scheduleDate() {
        return this._scheduleDate;
    }

    approve() {
        this._status = STATUS.APPROVED;
    }

    reject() {
        this._status = STATUS.REJECTED;
    }

    isReadyToProcess(): boolean {
        if (this._scheduleDate) {
            return new Date() >= this._scheduleDate;
        }
        return true;
    }
}
