import Wallet from "../../../../domain/wallet/wallet";

export interface FindWalletByIdControllerResponseDto {
    message: string;
    wallet: Wallet | null;
    isFailure: boolean;
    isSuccess: boolean;
}