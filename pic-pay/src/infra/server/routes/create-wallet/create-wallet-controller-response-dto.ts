import Wallet from "../../../../domain/wallet/wallet";

export interface CreateWalletControllerResponseDto {
    message: string;
    wallet: Wallet | null;
    isFailure: boolean;
    isSuccess: boolean;
}