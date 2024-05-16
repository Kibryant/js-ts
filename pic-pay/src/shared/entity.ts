import { randomUUID } from "node:crypto";

abstract class Entity {
    protected _id: string;

    constructor(id?: string) {
        this._id = id ?? randomUUID();
    }

    get id() {
        return this._id;
    }
}

export { Entity };
