"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const node_crypto_1 = require("node:crypto");
class Entity {
    constructor(id) {
        this._id =
            id !== null && id !== void 0 ? id : (0, node_crypto_1.randomUUID)();
    }
}
exports.Entity = Entity;
