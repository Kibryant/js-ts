import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import { WalletRepository } from "../wallet-repository";

export default class DeleteWallet implements UseCase<string, Result<void>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(id: string): Promise<Result<void>> {
        const result = await this.walletRepository.delete(id);

        return result;
    }
}