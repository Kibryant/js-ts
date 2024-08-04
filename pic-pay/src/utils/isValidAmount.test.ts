import { isValidAmount } from './isValidAumont';
import { describe, it, expect } from 'vitest';

describe('isValidAumount', () => {
    it('should return true for valid amounts', () => {
        expect(isValidAmount(0)).toBe(false);
        expect(isValidAmount(10)).toBe(true);
        expect(isValidAmount(100)).toBe(true);
        expect(isValidAmount(1000)).toBe(true);
        expect(isValidAmount(10000)).toBe(true);
    });

    it('should return false for invalid amounts', () => {
        expect(isValidAmount(-10)).toBe(false);
        expect(isValidAmount(-100)).toBe(false);
        expect(isValidAmount(-1000)).toBe(false);
        expect(isValidAmount(0.1)).toBe(true);
        expect(isValidAmount(0.01)).toBe(true);
        expect(isValidAmount(100000)).toBe(true);
    });
});