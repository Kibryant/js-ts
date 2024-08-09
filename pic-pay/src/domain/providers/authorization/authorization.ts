export interface AuthorizationProps {
    transactionId: string;
    authorized: boolean;
}

export default class Authorization {
    _transactionId: string;
    _authorized: boolean;

    constructor({ transactionId, authorized }: AuthorizationProps) {
        this._transactionId = transactionId;
        this._authorized = authorized;

        Object.freeze(this);
    }

    get transactionId(): string {
        return this._transactionId;
    }

    get authorized(): boolean {
        return this._authorized;
    }

    equals(other: Authorization): boolean {
        return (
            this.transactionId === other.transactionId &&
            this.authorized === other.authorized
        );
    }
}
