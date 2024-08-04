import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class FindWalletByEmail implements UseCase<string, Result<Wallet>> {
    constructor(private walletRepository: WalletRepository) { }

    async execute(email: string): Promise<Result<Wallet>> {
        const result = await this.walletRepository.findByEmail(email);

        return result;
    }
}
