import FindWalletByCpf from "./find-wallet-by-cpf";
import { CreateWalletDto, WALLET_TYPE } from "../wallet";
import { MailProviderMock, WalletRepositoryMock } from "../../../utils";
import { WalletRepository } from "../wallet-repository";
import { describe, beforeEach, it, expect } from "vitest";
import CreateWallet from "./create-wallet";
import MailProvider from "../../providers/mail/mail-provider";

const WALLET_DATA: CreateWalletDto = {
    name: "John Doe",
    cpf: "11290725500",
    phone: "11999999999",
    email: "johndoe@gmail.com",
    password: "123",
    balance: 100,
    walletType: WALLET_TYPE.SHOPKEEPER,
};

describe("FindWalletByCpf", () => {
    let createWallet: CreateWallet;
    let mailProvider: MailProvider;
    let findWalletByCpf: FindWalletByCpf;
    let walletRepository: WalletRepository;

    beforeEach(async () => {
        walletRepository = new WalletRepositoryMock();
        findWalletByCpf = new FindWalletByCpf(walletRepository);
        mailProvider = new MailProviderMock();
        createWallet = new CreateWallet(walletRepository, mailProvider);

        await createWallet.execute(WALLET_DATA);

    });

    it("should return a wallet when a valid CPF is provided", async () => {
        // Act
        const result = await findWalletByCpf.execute(WALLET_DATA.cpf);

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

    it("should return an error when an invalid CPF is provided", async () => {
        // Arrange
        const cpf = "invalid-cpf";

        // Act
        const result = await findWalletByCpf.execute(cpf);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe("Wallet not found");
    });
});