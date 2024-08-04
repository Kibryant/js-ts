import { WALLET_TYPE } from "../domain/wallet/wallet";

export function isShopkeeper(walletType: WALLET_TYPE): boolean {
    return walletType === WALLET_TYPE.SHOPKEEPER;
    
}