import { Wallet } from "./wallet";

describe("Wallet", () => {
    const walletData = {
        fullName: "John Doe",
        cpf: "12345678900",
        email: "john@example.com",
        phone: "123456789",
        balance: 100,
        password: "password123",
        walletType: 1,
    };

    it("should create a wallet instance", () => {
        const wallet = new Wallet(walletData);
        expect(wallet).toBeInstanceOf(Wallet);
    });

    it("should create a wallet instance with own id", () => {
        const wallet = new Wallet(walletData, "ID_FAKE");
        expect(wallet.id).toBe("ID_FAKE");
    });

    it("should initialize wallet properties correctly", () => {
        const wallet = new Wallet(walletData);
        expect(wallet.fullName).toBe(walletData.fullName);
        expect(wallet.cpf).toBe(walletData.cpf);
        expect(wallet.email).toBe(walletData.email);
        expect(wallet.phone).toBe(walletData.phone);
        expect(wallet.balance).toBe(walletData.balance);
        expect(wallet.password).toBe(walletData.password);
        expect(wallet.walletType).toBe(walletData.walletType);
        expect(wallet.createdAt).toBeInstanceOf(Date);
    });
});
