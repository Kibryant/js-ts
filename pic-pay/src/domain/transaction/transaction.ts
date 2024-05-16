import { Entity } from "../../shared/entity";

export interface CreateTransactionDto {
    payerId: string;
    payeeId: string;
    amount: number;
}

class Transaction extends Entity {
    protected _payerId: string;
    protected _payeeId: string;
    protected _amount: number;
    protected _created_at: Date = new Date();

    constructor(
        { payeeId, payerId, amount }: CreateTransactionDto,
        id?: string,
    ) {
        super(id);

        this._payeeId = payeeId;
        this._payerId = payerId;
        this._amount = amount;
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
}

export { Transaction };
