import CreateWallet from "./create-wallet";
import Wallet, { WalletType } from "../wallet";
import { describe, beforeEach, it, expect } from "vitest";
import { WalletRepository } from "../wallet-repository";
import WalletRepositoryMock from "../../../utils/wallet-repository-mock";

describe("CreateWallet", () => {
    let createWallet: CreateWallet;
    let walletRepository: WalletRepository;

    beforeEach(() => {
        walletRepository = new WalletRepositoryMock();
        createWallet = new CreateWallet(walletRepository);
    });

    it("should create a wallet successfully", async () => {
        const result = await createWallet.execute({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WalletType.SHOPKEEPER,
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(1000);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.fullName).toBe("Test");
        expect(result.value.password).toBe("123456");
        expect(result.value.phone).toBe("11999999999");
        expect(result.value.walletType).toBe(WalletType.SHOPKEEPER);
    });

    it("should return an error when wallet creation fails", async () => {
        const result = await createWallet.execute({
            balance: -1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WalletType.SHOPKEEPER,
        });

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Invalid balance");
    });

});