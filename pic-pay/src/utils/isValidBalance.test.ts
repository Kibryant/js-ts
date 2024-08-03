import { isValidBalance } from "./isValidBalance";
import { describe, it, expect } from "vitest";

describe('isValidBalance', () => {
    it('should return false when balance is negative', () => {
        expect(isValidBalance(-1)).toBe(false);
    });

    it('should return true when balance is zero', () => {
        expect(isValidBalance(0)).toBe(true);
    });

    it('should return true when balance is positive', () => {
        expect(isValidBalance(1)).toBe(true);
    });
});