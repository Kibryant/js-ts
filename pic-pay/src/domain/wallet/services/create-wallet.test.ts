import CreateWallet from "./create-wallet";
import Wallet, { WALLET_TYPE } from "../wallet";
import { describe, beforeEach, it, expect } from "vitest";
import { WalletRepository } from "../wallet-repository";
import { WalletRepositoryMock } from "../../../utils";

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
            name: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WALLET_TYPE.SHOPKEEPER,
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(1000);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.name).toBe("Test");
        expect(result.value.password).toBe("123456");
        expect(result.value.phone).toBe("11999999999");
        expect(result.value.walletType).toBe(WALLET_TYPE.SHOPKEEPER);
    });

    it("should return an error when wallet creation fails", async () => {
        const result = await createWallet.execute({
            balance: -1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WALLET_TYPE.SHOPKEEPER,
        });

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Invalid balance");
    });

});