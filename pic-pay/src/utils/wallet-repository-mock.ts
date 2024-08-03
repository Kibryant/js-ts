import Wallet, { WalletProps, CreateWalletDto, UpdateWalletDto } from "../domain/wallet/wallet";
import { WalletRepository } from "../domain/wallet/wallet-repository";
import Result from "../shared/result";

export class WalletRepositoryMockMapper {
    static toDomain(wallet: WalletProps, id?: string): Result<Wallet> {
        return Wallet.create(wallet, id);
    }

    static toPersistence(wallet: Wallet) {
        return {
            id: wallet.id,
            fullName: wallet.fullName,
            cpf: wallet.cpf,
            email: wallet.email,
            phone: wallet.phone,
            balance: wallet.balance,
            password: wallet.password,
            walletType: wallet.walletType,
        };
    }
}


export default class WalletRepositoryMock implements WalletRepository {
    private readonly wallets: WalletProps[] = [];

    async create(walletToCreate: CreateWalletDto): Promise<Result<Wallet>> {
        const walletExists = await this.findByCpf(walletToCreate.cpf);

        if (walletExists.isSuccess) {
            return Result.fail("Wallet already exists");
        }

        const result = Wallet.create(walletToCreate);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        const wallet = WalletRepositoryMockMapper.toPersistence(result.value);

        this.wallets.push(wallet);

        return Result.ok(result.value);

    }

    async update(updateFields: UpdateWalletDto, id: string): Promise<Result<Wallet>> {
        const searchWalletById = await this.findById(id);

        if (searchWalletById.isFailure) {
            return Result.fail("Wallet not found");
        }

        const wallet = searchWalletById.value;

        const updatedWallet: UpdateWalletDto = {
            balance: updateFields.balance ?? wallet.balance,
            cpf: updateFields.cpf ?? wallet.cpf,
            email: updateFields.email ?? wallet.email,
            fullName: updateFields.fullName ?? wallet.fullName,
            password: updateFields.password ?? wallet.password,
            phone: updateFields.phone ?? wallet.phone,
            walletType: updateFields.walletType ?? wallet.walletType,
        };

        const result = Wallet.update(updatedWallet, id);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        this.wallets.push(WalletRepositoryMockMapper.toPersistence(result.value));

        return Result.ok(result.value);
    }

    async delete(id: string): Promise<Result<void>> {
        const result = await this.findById(id);

        if (result.isFailure) {
            return Result.fail("Wallet not found");
        }

        // is required to delete the item from the array :)
        const wallet = this.wallets.findIndex(wallet => wallet.id === id);

        this.wallets.splice(wallet, 1);

        return Result.ok();
    }

    async findById(id: string): Promise<Result<Wallet>> {
        const wallet = this.wallets.find(wallet => wallet.id === id);

        if (!wallet) {
            return Result.fail("Wallet not found");
        }

        const result = WalletRepositoryMockMapper.toDomain(wallet, wallet.id);

        return Result.ok(result.value);

    }

    async findByCpf(cpf: string): Promise<Result<Wallet>> {
        const wallet = this.wallets.find(wallet => wallet.cpf === cpf);

        if (!wallet) {
            return Result.fail("Wallet not found");
        }

        const result = WalletRepositoryMockMapper.toDomain(wallet, wallet.id);

        return Result.ok(result.value);
    }

    async findByEmail(email: string): Promise<Result<Wallet>> {
        const wallet = this.wallets.find(wallet => wallet.email === email);

        if (!wallet) {
            return Result.fail("Wallet not found");
        }

        const result = WalletRepositoryMockMapper.toDomain(wallet, wallet.id);

        return Result.ok(result.value);
    }

    async findByPhone(phone: string): Promise<Result<Wallet>> {
        const wallet = this.wallets.find(wallet => wallet.phone === phone);

        if (!wallet) {
            return Result.fail("Wallet not found");
        }

        const result = WalletRepositoryMockMapper.toDomain(wallet, wallet.id);

        return Result.ok(result.value);
    }

}