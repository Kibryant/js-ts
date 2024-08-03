import Wallet, { WalletType } from "../wallet";
import { describe, beforeEach, it, expect } from "vitest";
import { WalletRepository } from "../wallet-repository";
import WalletRepositoryMock from "../../../utils/wallet-repository-mock";
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
            fullName: "Test",
            password: "123456",
            phone: "11999999999",
            walletType: WalletType.SHOPKEEPER,
        });

        wallet = result.value;

    });

    it("should update a wallet successfully", async () => {
        const result = await updateWallet.execute({
            id: wallet.id,
            updateFields: {
                balance: 500,
                cpf: "11290725500",
                email: "test@gmail.com",
                fullName: "Test",
                password: "123456",
                phone: "11999999999",
                walletType: WalletType.SHOPKEEPER,
            },
        });

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Wallet);
        expect(result.value.balance).toBe(500);
        expect(result.value.cpf).toBe("11290725500");
        expect(result.value.email).toBe("test@gmail.com");
        expect(result.value.fullName).toBe("Test");
        expect(result.value.password).toBe("123456");
        expect(result.value.phone).toBe("11999999999");
        expect(result.value.walletType).toBe(WalletType.SHOPKEEPER);
    });

    it("should return an error when wallet update fails", async () => {
        const result = await updateWallet.execute({
            id: wallet.id,
            updateFields: {
                balance: -1000,
            },
        });

        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Invalid balance");
    });
});