import FindWalletByPhone from "./find-wallet-by-phone";
import { CreateWalletDto, WALLET_TYPE } from "../wallet";
import { WalletRepositoryMock } from "../../../utils";
import { WalletRepository } from "../wallet-repository";
import { describe, beforeEach, it, expect } from "vitest";
import CreateWallet from "./create-wallet";

const WALLET_DATA: CreateWalletDto = {
    name: "John Doe",
    cpf: "11290725500",
    phone: "11999999999",
    email: "johndoe@gmail.com",
    password: "123",
    balance: 100,
    walletType: WALLET_TYPE.SHOPKEEPER,
};

describe("FindWalletByPhone", () => {
    let createWallet: CreateWallet;
    let findWalletByPhone: FindWalletByPhone;
    let walletRepository: WalletRepository;

    beforeEach(async () => {
        walletRepository = new WalletRepositoryMock();
        findWalletByPhone = new FindWalletByPhone(walletRepository);
        createWallet = new CreateWallet(walletRepository);

        await createWallet.execute(WALLET_DATA);

    });

    it("should return a wallet when a valid PHONE is provided", async () => {
        // Act
        const result = await findWalletByPhone.execute(WALLET_DATA.phone);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.value.id).toBeDefined();
        expect(result.value.name).toBe(WALLET_DATA.name);
        expect(result.value.cpf).toBe(WALLET_DATA.cpf);
        expect(result.value.phone).toBe(WALLET_DATA.phone);
        expect(result.value.email).toBe(WALLET_DATA.email);
        expect(result.value.balance).toBe(WALLET_DATA.balance);
        expect(result.value.walletType).toBe(WALLET_DATA.walletType);
    });

    it("should return an error when an invalid PHONE is provided", async () => {
        // Arrange
        const phone = "invalid-phone";

        // Act
        const result = await findWalletByPhone.execute(phone);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Wallet not found");
    });
});