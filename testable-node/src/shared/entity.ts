import { randomUUID } from 'crypto';

export default abstract class Entity {
    protected readonly _id: string;

    constructor(id?: string) {
        this._id = id || randomUUID();
    }

    get id() {
        return this._id;
    }
}