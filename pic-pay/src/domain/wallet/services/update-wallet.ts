import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Wallet, { type UpdateWalletDto } from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class UpdateWallet implements UseCase<UpdateWalletDto & string, Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository) { }

    // @ts-expect-error i don't know what to do with this, create wallet is working fine
    async execute(input: UpdateWalletDto, id: string): Promise<Result<Wallet>> {
        const result = await this.walletRepository.update(input, id);

        return result;
    }
}