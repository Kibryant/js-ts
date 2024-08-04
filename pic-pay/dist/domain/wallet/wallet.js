"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const entity_1 = require("../../shared/entity");
class Wallet extends entity_1.Entity {
    constructor({ name, cpf, balance, email, password, phone }, id) {
        super(id);
        this._createdAt = new Date();
        this._balance = balance;
        this._name = name;
        this._cpf = cpf;
        this._email = email;
        this._phone = phone;
        this._password = password;
    }
}
exports.Wallet = Wallet;
