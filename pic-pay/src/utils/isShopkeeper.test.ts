import { isShopkeeper } from "../utils/isShopkeeper";
import { WALLET_TYPE } from "../domain/wallet/wallet";
import { describe, expect, it } from "vitest";


describe("isShopkeeper", () => {
    it("should return true when walletType is SHOPKEEPER", () => {
        const result = isShopkeeper(WALLET_TYPE.SHOPKEEPER);
        expect(result).toBe(true);
    });

    it("should return false when walletType is CUSTOMER", () => {
        const result = isShopkeeper(WALLET_TYPE.COMMOM);
        expect(result).toBe(false);
    });

    it("should return false when walletType is null", () => {
        const result = isShopkeeper(null as unknown as WALLET_TYPE);
        expect(result).toBe(false);
    });

    it("should return false when walletType is undefined", () => {
        const result = isShopkeeper(undefined as unknown as WALLET_TYPE);
        expect(result).toBe(false);
    });
});