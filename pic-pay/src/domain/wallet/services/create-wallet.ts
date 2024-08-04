import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet, { CreateWalletDto } from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class CreateWallet implements UseCase<CreateWalletDto & (string | undefined), Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(input: CreateWalletDto, id?: string): Promise<Result<Wallet>> {
        const result = await this.walletRepository.create(input, id);

        return result;
    }
}