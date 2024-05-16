import { CreateWalletDto, Wallet, WalletType } from "./wallet";
import { WalletRepository } from "./wallet-repository";

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

describe("WalletRepository", () => {
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

    it("should be able to create and return a wallet using wallet repository", async () => {
        const wallet = await walletRepository.create(walletData);

        expect(wallet).toBeDefined();
        expect(wallet.id).toBeDefined();
        expect(wallet.fullName).toBe(wallet.fullName);
        expect(wallet.cpf).toBe(wallet.cpf);
        expect(wallet.balance).toBe(wallet.balance);
        expect(wallet.walletType).toBe(wallet.walletType);
        expect(wallet.phone).toBe(wallet.phone);
        expect(wallet.password).toBe(wallet.password);
    });

    it("should be able to update and return a updated wallet", async () => {
        const wallet = await walletRepository.create(walletData);

        const updatedWallet = await walletRepository.update(
            {
                fullName: "Jane Doe",
            },
            wallet.id,
        );

        expect(updatedWallet.id).toBe(wallet.id);
        expect(updatedWallet.fullName).toBe("Jane Doe");
    });

    it("should be able to find by id and return wallet", async () => {
        const walletMock = await walletRepository.create(walletData);

        const wallet = await walletRepository.findById(walletMock.id);

        expect(wallet?.id).toBe(walletMock.id);
        expect(wallet?.fullName).toBe(walletMock.fullName);
    });

    it("should be able to find by cpf and return wallet", async () => {
        const wallet = await walletRepository.findByCpf(walletData.cpf);

        expect(wallet?.id).toBeTruthy();
        expect(wallet?.cpf).toBe(walletData.cpf);
    });

    it("should be able to find by email and return wallet", async () => {
        const wallet = await walletRepository.findByEmail(walletData.email);

        expect(wallet?.id).toBeTruthy();
        expect(wallet?.email).toBe(walletData.email);
    });

    it("should be able to find by phone and return wallet", async () => {
        const wallet = await walletRepository.findByPhone(walletData.phone);

        expect(wallet?.id).toBeTruthy();
        expect(wallet?.phone).toBe(walletData.phone);
    });

    it("should be able to delete a wallet", async () => {
        const mock = {
            fullName: "Jane Doe",
            email: "janedoe@gmail.com",
            balance: 32430,
            cpf: "13i92414",
            password: "arhur",
            phone: "73204248914",
            walletType: 2,
        };

        const walletToDelete = await walletRepository.create(mock);

        await walletRepository.delete(walletToDelete.id);

        const result = await walletRepository.findById(walletToDelete.id);

        expect(result).toBe(null);
    });
});
