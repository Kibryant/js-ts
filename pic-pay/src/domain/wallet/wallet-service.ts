import { OperationResult, ServiceResult } from "../../types";
import { CreateWalletDto, UpdateWalletDto, Wallet } from "./wallet";
import { WalletRepository } from "./wallet-repository";

class WalletService {
    private walletRepository: WalletRepository;

    constructor(walletRepository: WalletRepository) {
        this.walletRepository = walletRepository;
    }

    async create(fields: CreateWalletDto): Promise<ServiceResult<Wallet>> {
        const newWallet = new Wallet(fields);

        const wallet = await this.walletRepository.create(newWallet);

        return {
            data: wallet,
            result: OperationResult.SUCCESS,
            message: "wallet created",
        };
    }

    async update(
        updateFields: UpdateWalletDto,
        id: string,
    ): Promise<ServiceResult<Wallet>> {
        const wallet = await this.walletRepository.update(updateFields, id);

        return {
            data: wallet,
            message: "wallet updated",
            result: OperationResult.SUCCESS,
        };
    }
}

export { WalletService };
