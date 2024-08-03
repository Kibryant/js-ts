import { randomUUID } from "crypto";
import Updatable from "./updatable";

export default abstract class Entity extends Updatable {
    protected _id: string;

    constructor(id?: string) {
        super();
        this._id = id ?? randomUUID();
    }

    get id(): string {
        return this._id;
    }
}
