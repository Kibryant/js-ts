import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet, { UpdateWalletDto } from "../wallet";
import { WalletRepository } from "../wallet-repository";

interface Input {
    id: string;
    updateFields: UpdateWalletDto;
}

export default class UpdateWallet implements UseCase<Input, Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(input: Input): Promise<Result<Wallet>> {
        const updatedWalletOrError = await this.walletRepository.update(input.updateFields, input.id);

        if (updatedWalletOrError.isFailure) {
            return Result.fail(updatedWalletOrError.getErrorValue());
        }

        return updatedWalletOrError;
    }
}
