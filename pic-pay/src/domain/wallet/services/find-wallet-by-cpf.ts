import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class FindWalletByCpf implements UseCase<string, Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(cpf: string): Promise<Result<Wallet>> {
        const result = await this.walletRepository.findByCpf(cpf);

        return result;
    }
}