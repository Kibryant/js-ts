import FindWalletById from "./find-wallet-by-id";
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

describe("FindWalletById", () => {
    let createWallet: CreateWallet;
    let findWalletById: FindWalletById;
    let walletRepository: WalletRepository;

    beforeEach(async () => {
        walletRepository = new WalletRepositoryMock();
        findWalletById = new FindWalletById(walletRepository);
        createWallet = new CreateWallet(walletRepository);

        await createWallet.execute(WALLET_DATA, WALLET_DATA.cpf);

    });

    it("should return a wallet when a valid ID is provided", async () => {
        // Act
        const result = await findWalletById.execute(WALLET_DATA.cpf);

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

    it("should return an error when an invalid ID is provided", async () => {
        // Arrange
        const id = "invalid-id";

        // Act
        const result = await findWalletById.execute(id);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Wallet not found");
    });
});