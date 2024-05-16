import { CreateWalletDto, UpdateWalletDto, Wallet } from "./wallet";

abstract class WalletRepository {
    abstract create(fields: CreateWalletDto): Promise<Wallet>;
    abstract update(updateFields: UpdateWalletDto, id: string): Promise<Wallet>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Wallet | null>;
    abstract findByCpf(cpf: string): Promise<Wallet | null>;
    abstract findByEmail(email: string): Promise<Wallet | null>;
    abstract findByPhone(phone: string): Promise<Wallet | null>;
}

export { WalletRepository };
