import Result from "../../shared/result";
import Wallet, { CreateWalletDto, UpdateWalletDto } from "./wallet";

export abstract class WalletRepository {
    abstract create(fields: CreateWalletDto, id?: string): Promise<Result<Wallet>>;
    abstract update(updateFields: UpdateWalletDto, id: string): Promise<Result<Wallet>>;
    abstract delete(id: string): Promise<Result<void>>;
    abstract findById(id: string): Promise<Result<Wallet>>;
    abstract findByCpf(cpf: string): Promise<Result<Wallet>>;
    abstract findByEmail(email: string): Promise<Result<Wallet>>;
    abstract findByPhone(phone: string): Promise<Result<Wallet>>;
}