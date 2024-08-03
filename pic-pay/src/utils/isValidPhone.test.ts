import { isValidPhone } from './isValidPhone';
import { describe, it, expect } from "vitest"

describe('isValidPhone', () => {
    it('should return false when phone is empty', () => {
        expect(isValidPhone('')).toBe(false);
    });

    it('should return false when phone is not a number', () => {
        expect(isValidPhone('abc')).toBe(false);
    });

    it('should return false when phone is not 11 digits', () => {
        expect(isValidPhone('1234567890')).toBe(false);
    });

    it('should return true when phone is 11 digits', () => {
        expect(isValidPhone('12345678901')).toBe(true);
    });
});