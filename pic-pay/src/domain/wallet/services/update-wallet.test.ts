import Wallet, { WALLET_TYPE } from "../wallet";
import { describe, beforeEach, it, expect } from "vitest";
import { WalletRepository } from "../wallet-repository";
import { WalletRepositoryMock } from "../../../utils";
import UpdateWallet from "./update-wallet";
import CreateWallet from "./create-wallet";

describe("Update Wallet", () => {
    let wallet: Wallet;
    let createWallet: CreateWallet;
    let updateWallet: UpdateWallet;
    let walletRepository: WalletRepository;

    beforeEach(async () => {
        walletRepository = new WalletRepositoryMock();
        updateWallet = new UpdateWallet(walletRepository);
        createWallet = new CreateWallet(walletRepository);
        const result = await createWallet.execute({
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WALLET_TYPE.SHOPKEEPER,
        });

        wallet = result.value;

    });

    it("should update a wallet successfully", async () => {
        const result = await updateWallet.execute({
            balance: 500,
            cpf: "11290725500",
            email: "test@gmail.com",
            name: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WALLET_TYPE.SHOPKEEPER,
        }, wallet.id);

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(500);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.name).toBe("Test");
        expect(result.value.password).toBe("123456");
        expect(result.value.phone).toBe("11999999999");
        expect(result.value.walletType).toBe(WALLET_TYPE.SHOPKEEPER);
    });

    it("should return an error when wallet update fails", async () => {
        const result = await updateWallet.execute({
            balance: -1000,
        }, wallet.id);

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Invalid balance");
    });
});