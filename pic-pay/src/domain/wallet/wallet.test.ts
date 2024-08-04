import { describe, it, expect } from "vitest";
import Wallet, { WALLET_TYPE } from "./wallet";

describe("Wallet", () => {
    it("should create a wallet", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(1000);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.name).toBe("Test");
        expect(result.value.phone).toBe("12345678901");
        expect(result.value.walletType).toBe(WALLET_TYPE.COMMOM);
        expect(result.value.createdAt).toBeInstanceOf(Date);
    });

    it("should not create a wallet with invalid cpf", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "1234567890",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        });

        expect(result.isFailure).toBe(true);
    });

    it("should not create a wallet with invalid phone", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "1234567890",
            walletType: WALLET_TYPE.COMMOM,
        });

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid phone");
    });

    it("should not create a wallet with invalid balance", () => {
        const result = Wallet.create({
            balance: -1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        });

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid balance");
    });

    it("should update a wallet", () => {
        const wallet = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        }).value;

        const result = wallet.update({
            balance: 2000,
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(2000);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.name).toBe("Test");
        expect(result.value.phone).toBe("12345678901");
        expect(result.value.walletType).toBe(WALLET_TYPE.COMMOM);
        expect(result.value.createdAt).toBeInstanceOf(Date);
    });

    it("should credit a wallet", () => {
        const wallet = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        }).value;

        wallet.credit(100);

        expect(wallet.balance).toBe(1100);

        wallet.credit(100);

        expect(wallet.balance).toBe(1200);

        wallet.credit(100);

        expect(wallet.balance).toBe(1300);

    });

    it("should not credit a wallet with invalid amount", () => {
        const wallet = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        }).value;

        const result = wallet.credit(-100);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid amount");
    });

    it("should debit a wallet", () => {
        const wallet = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        }).value;

        wallet.debit(100);

        expect(wallet.balance).toBe(900);

        wallet.debit(100);

        expect(wallet.balance).toBe(800);
    });

    it("should not debit a wallet with insufficient balance", () => {
        const wallet = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WALLET_TYPE.COMMOM,
        }).value;

        const result = wallet.debit(2000);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Insufficient funds");
    });
});