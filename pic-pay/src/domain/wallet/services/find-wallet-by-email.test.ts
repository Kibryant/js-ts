import FindWalletByEmail from "./find-wallet-by-email";
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

describe("FindWalletByEmail", () => {
    let createWallet: CreateWallet;
    let findWalletByEmail: FindWalletByEmail;
    let walletRepository: WalletRepository;

    beforeEach(async () => {
        walletRepository = new WalletRepositoryMock();
        findWalletByEmail = new FindWalletByEmail(walletRepository);
        createWallet = new CreateWallet(walletRepository);

        await createWallet.execute(WALLET_DATA);

    });

    it("should return a wallet when a valid EMAIL is provided", async () => {
        // Act
        const result = await findWalletByEmail.execute(WALLET_DATA.email);

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

    it("should return an error when an invalid EMAIL is provided", async () => {
        // Arrange
        const email = "invalid-email";

        // Act
        const result = await findWalletByEmail.execute(email);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Wallet not found");
    });
});