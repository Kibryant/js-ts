import { beforeEach, describe, expect, it } from "vitest";
import { CreateWalletDto, UpdateWalletDto, WalletType } from "./wallet";
import WalletRepositoryMock from "../../utils/wallet-repository-mock"
import { WalletRepository } from "./wallet-repository";

describe("WalletRepository", () => {
    let walletRepository: WalletRepository;

    const walletData: CreateWalletDto = {
        balance: 1000,
        cpf: "11290725500",
        email: "test@gmail.com",
        fullName: "Test",
        password: "123456",
        phone: "12345678901",
        walletType: WalletType.COMMOM,
    };

    beforeEach(() => {
        walletRepository = new WalletRepositoryMock();
    })

    it("should be able to create and return a wallet using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        expect(result.isSuccess).toBe(true);
        expect(wallet).toBeDefined();
        expect(wallet.id).toBeDefined();
        expect(wallet.fullName).toBe(walletData.fullName);
        expect(wallet.cpf).toBe(walletData.cpf);
        expect(wallet.email).toBe(walletData.email);
        expect(wallet.phone).toBe(walletData.phone);
        expect(wallet.balance).toBe(walletData.balance);
        expect(wallet.password).toBe(walletData.password);
        expect(wallet.walletType).toBe(walletData.walletType);
    });

    it("should be able to update a wallet using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const updatedWalletData: UpdateWalletDto = {
            balance: 2000,
            fullName: "Updated Test",
            cpf: "21070432059",
            email: "test2@gmail.com",
            password: "654321",
            phone: "98765432101",
            walletType: WalletType.SHOPKEEPER,
        };

        const updatedResult = await walletRepository.update(updatedWalletData, wallet.id);

        expect(updatedResult.isSuccess).toBe(true);
        expect(updatedResult.value).toBeDefined();
        expect(updatedResult.value.id).toBe(wallet.id);
        expect(updatedResult.value.fullName).toBe(updatedWalletData.fullName);
        expect(updatedResult.value.cpf).toBe(updatedWalletData.cpf);
        expect(updatedResult.value.email).toBe(updatedWalletData.email);
        expect(updatedResult.value.phone).toBe(updatedWalletData.phone);
        expect(updatedResult.value.balance).toBe(updatedWalletData.balance);
        expect(updatedResult.value.password).toBe(updatedWalletData.password);
        expect(updatedResult.value.walletType).toBe(updatedWalletData.walletType);
    });

    it("should be able to delete a wallet using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const deleteResult = await walletRepository.delete(wallet.id);

        expect(deleteResult.isSuccess).toBe(true);
    });

    it("should be able to find a wallet by id using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const findResult = await walletRepository.findById(wallet.id);

        expect(findResult.isSuccess).toBe(true);
        expect(findResult.value).toBeDefined();
        expect(findResult.value.id).toBe(wallet.id);
    });

    it("should be able to find a wallet by cpf using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const findResult = await walletRepository.findByCpf(wallet.cpf);

        expect(findResult.isSuccess).toBe(true);
        expect(findResult.value).toBeDefined();
        expect(findResult.value.id).toBe(wallet.id);
    });

    it("should be able to find a wallet by email using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const findResult = await walletRepository.findByEmail(wallet.email);

        expect(findResult.isSuccess).toBe(true);
        expect(findResult.value).toBeDefined();
        expect(findResult.value.id).toBe(wallet.id);
    });

    it("should be able to find a wallet by phone using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const findResult = await walletRepository.findByPhone(wallet.phone);

        expect(findResult.isSuccess).toBe(true);
        expect(findResult.value).toBeDefined();
        expect(findResult.value.id).toBe(wallet.id);
    });

    it("should return a failure when trying to create a wallet if cpf already exists using wallet repository", async () => {
        await walletRepository.create(walletData);

        const repeatedResult = await walletRepository.create(walletData);

        expect(repeatedResult.isFailure).toBe(true);
        expect(repeatedResult.getErrorValue()).toBe("Wallet already exists");
    });

    it("should return a failure when trying to create a wallet with invalid balance using wallet repository", async () => {
        const invalidWalletData: CreateWalletDto = {
            balance: -1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WalletType.COMMOM,
        };

        const result = await walletRepository.create(invalidWalletData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid balance");
    });

    it("should return a failure when trying to create a wallet with invalid phone using wallet repository", async () => {
        const invalidWalletData: CreateWalletDto = {
            balance: 1000,
            cpf: "11290725500",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "0",
            walletType: WalletType.COMMOM,
        };

        const result = await walletRepository.create(invalidWalletData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid phone");
    });

    it("should return a failure when trying to create a wallet with invalid cpf using wallet repository", async () => {
        const invalidWalletData: CreateWalletDto = {
            balance: 1000,
            cpf: "0",
            email: "test@gmail.com",
            fullName: "Test",
            password: "123456",
            phone: "12345678901",
            walletType: WalletType.COMMOM,
        };

        const result = await walletRepository.create(invalidWalletData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid CPF");
    });

    it("should return a failure when wallet is not found by id using wallet repository", async () => {
        const findResult = await walletRepository.findById("invalid-id");

        expect(findResult.isFailure).toBe(true);
        expect(findResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when wallet is not found by cpf using wallet repository", async () => {
        const findResult = await walletRepository.findByCpf("invalid-cpf");

        expect(findResult.isFailure).toBe(true);
        expect(findResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when wallet is not found by email using wallet repository", async () => {
        const findResult = await walletRepository.findByEmail("invalid-email");

        expect(findResult.isFailure).toBe(true);
        expect(findResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when wallet is not found by phone using wallet repository", async () => {
        const findResult = await walletRepository.findByPhone("invalid-phone");

        expect(findResult.isFailure).toBe(true);
        expect(findResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when trying to delete a wallet that does not exist using wallet repository", async () => {
        const deleteResult = await walletRepository.delete("invalid-id");

        expect(deleteResult.isFailure).toBe(true);
        expect(deleteResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when trying to update a wallet that does not exist using wallet repository", async () => {
        const updatedWalletData: UpdateWalletDto = {
            balance: 2000,
            fullName: "Updated Test",
            cpf: "11290725501",
            email: "test@gmail.com",
            password: "654321",
            phone: "98765432101",
            walletType: WalletType.SHOPKEEPER,
        };

        const updatedResult = await walletRepository.update(updatedWalletData, "invalid-id");

        expect(updatedResult.isFailure).toBe(true);
        expect(updatedResult.getErrorValue()).toBe("Wallet not found");
    });

    it("should return a failure when trying to update a wallet with invalid phone using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const updatedWalletData: UpdateWalletDto = {
            phone: "0",
        };

        const updatedResult = await walletRepository.update(updatedWalletData, wallet.id);

        expect(updatedResult.isFailure).toBe(true);
        expect(updatedResult.getErrorValue()).toBe("Invalid phone");
    });

    it("should return a failure when trying to update a wallet with invalid cpf using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const updatedWalletData: UpdateWalletDto = {
            cpf: "0",
        };

        const updatedResult = await walletRepository.update(updatedWalletData, wallet.id);

        expect(updatedResult.isFailure).toBe(true);
        expect(updatedResult.getErrorValue()).toBe("Invalid CPF");
    });

    it("should return a failure when trying to update a wallet with invalid balance using wallet repository", async () => {
        const result = await walletRepository.create(walletData);
        const wallet = result.value;

        const updatedWalletData: UpdateWalletDto = {
            balance: -1000,
        };

        const updatedResult = await walletRepository.update(updatedWalletData, wallet.id);

        expect(updatedResult.isFailure).toBe(true);
        expect(updatedResult.getErrorValue()).toBe("Invalid balance");
    });
});
