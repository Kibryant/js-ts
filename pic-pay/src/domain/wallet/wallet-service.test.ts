import { OperationResult } from "../../types";
import { CreateWalletDto, Wallet, WalletType } from "./wallet";
import { WalletRepository } from "./wallet-repository";
import { WalletService } from "./wallet-service";

class WalletRepositoryMock implements WalletRepository {
    private readonly wallets: Wallet[] = [];

    async create(walletToCreate: CreateWalletDto): Promise<Wallet> {
        const wallet = new Wallet(walletToCreate);

        this.wallets.push(wallet);

        return wallet;
    }

    async update(
        updateFields: Partial<CreateWalletDto>,
        id: string,
    ): Promise<Wallet> {
        const walletIndex = this.wallets.findIndex(
            (wallet) => wallet.id === id,
        );

        const updatedWallet = {
            ...this.wallets[walletIndex],
            ...updateFields,
        } as Wallet;

        const wallet = new Wallet(updatedWallet, id);

        this.wallets[walletIndex] = wallet;

        return wallet;
    }

    async findById(id: string): Promise<Wallet | null> {
        const wallet = this.wallets.find((wallet) => wallet.id === id);

        return wallet ?? null;
    }

    async findByCpf(cpf: string): Promise<Wallet | null> {
        const wallet = this.wallets.find((wallet) => wallet.cpf === cpf);

        return wallet ?? null;
    }

    async findByEmail(email: string): Promise<Wallet | null> {
        const wallet = this.wallets.find((wallet) => wallet.email === email);

        return wallet ?? null;
    }

    async findByPhone(phone: string): Promise<Wallet | null> {
        const wallet = this.wallets.find((wallet) => wallet.phone === phone);

        return wallet ?? null;
    }

    async delete(id: string): Promise<void> {
        const walletToDelete = await this.findById(id);

        if (!walletToDelete) return;

        const index = this.wallets.indexOf(walletToDelete);

        if (index === -1) return;

        this.wallets.splice(index, 1);
    }
}

describe("WalletService", () => {
    const walletData = {
        fullName: "John Doe",
        cpf: "12345678900",
        email: "john@example.com",
        phone: "123456789",
        balance: 100,
        password: "password123",
        walletType: WalletType.COMMOM,
    };

    const walletRepository = new WalletRepositoryMock();
    const walletService = new WalletService(walletRepository);

    it("should be able to create and return a wallet using wallet service", async () => {
        const {
            data: wallet,
            message,
            result,
        } = await walletService.create(walletData);

        expect(wallet).toBeDefined();
        expect(wallet?.id).toBeDefined();
        expect(wallet?.fullName).toBe(wallet?.fullName);
        expect(wallet?.cpf).toBe(wallet?.cpf);
        expect(wallet?.balance).toBe(wallet?.balance);
        expect(wallet?.walletType).toBe(wallet?.walletType);
        expect(wallet?.phone).toBe(wallet?.phone);
        expect(wallet?.password).toBe(wallet?.password);

        expect(result).toBe(OperationResult.SUCCESS);

        expect(message).toBe("wallet created");
    });

    it("should be able to update and return a updated wallet", async () => {
        const { data: wallet } = await walletService.create(walletData);

        const {
            data: updatedWallet,
            message,
            result,
        } = await walletService.update(
            {
                fullName: "Jane Doe",
            },
            wallet!.id,
        );

        expect(updatedWallet?.id).toBe(wallet?.id);
        expect(updatedWallet?.fullName).toBe("Jane Doe");

        expect(result).toBe(OperationResult.SUCCESS);
        expect(message).toBe("wallet updated");
    });
});
