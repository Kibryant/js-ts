import { describe, it, expect } from "vitest";
import Wallet, { WalletType } from "./wallet";

describe("Wallet", () => {
    it("should create a wallet", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WalletType.COMMOM,
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(1000);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.fullName).toBe("Test");
        expect(result.value.phone).toBe("12345678901");
        expect(result.value.walletType).toBe(WalletType.COMMOM);
        expect(result.value.createdAt).toBeInstanceOf(Date);
    });

    it("should not create a wallet with invalid cpf", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "1234567890",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WalletType.COMMOM,
        });

        expect(result.isFailure).toBe(true);
    });

    it("should not create a wallet with invalid phone", () => {
        const result = Wallet.create({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "1234567890",
            walletType: WalletType.COMMOM,
        });

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid phone");
    });

    it("should not create a wallet with invalid balance", () => {
        const result = Wallet.create({
            balance: -1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WalletType.COMMOM,
        });

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid balance");
    });
});