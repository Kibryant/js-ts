import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet, { CreateWalletDto } from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class CreateWallet implements UseCase<CreateWalletDto, Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(input: CreateWalletDto): Promise<Result<Wallet>> {
        const walletOrError = Wallet.create(input);

        if (walletOrError.isFailure) {
            return Result.fail(walletOrError.getErrorValue());
        }

        return this.walletRepository.create(walletOrError.value);
    }
}