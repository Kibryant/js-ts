import { isValidCpf } from './isValidCpf';
import { describe, it, expect } from 'vitest';

describe('isValidCpf', () => {
    it('should return false for an empty string', () => {
        expect(isValidCpf('')).toBe(false);
    });

    it('should return false for a CPF with invalid length', () => {
        expect(isValidCpf('123456789')).toBe(false); // Less than 11 digits
        expect(isValidCpf('123456789012')).toBe(false); // More than 11 digits
    });

    it('should return false for CPFs with all digits the same', () => {
        const invalidCpfs = [
            '00000000000', '11111111111', '22222222222',
            '33333333333', '44444444444', '55555555555',
            '66666666666', '77777777777', '88888888888', '99999999999'
        ];
        invalidCpfs.forEach(cpf => {
            expect(isValidCpf(cpf)).toBe(false);
        });
    });

    it('should return false for invalid CPF', () => {
        expect(isValidCpf('88832831391')).toBe(false);
        expect(isValidCpf('23765432100')).toBe(false);
    });

    it('should return true for valid CPF', () => {
        expect(isValidCpf('52998224725')).toBe(true); // Valid CPF
        expect(isValidCpf('342.444.198-88')).toBe(true); // Valid CPF with formatting
    });

    it('should ignore non-digit characters', () => {
        expect(isValidCpf('529.982.247-25')).toBe(true);
        expect(isValidCpf('529-982-247.25')).toBe(true);
        expect(isValidCpf('529982247 25')).toBe(true);
    });

    it('should handle CPF with leading zeros', () => {
        expect(isValidCpf('09104402049')).toBe(true); // Replace with an actually valid CPF
    });

    it('should return false for CPF with non-numeric characters only', () => {
        expect(isValidCpf('abcdefg@@@@')).toBe(false);
    });

    it('should return false for null input', () => {
        expect(isValidCpf(null as unknown as string)).toBe(false);
    });

    it('should return false for undefined input', () => {
        expect(isValidCpf(undefined as unknown as string)).toBe(false);
    });

    it('should return false for CPF with special characters', () => {
        expect(isValidCpf('!@#$%^&*()_+')).toBe(false);
    });

    it('should return false for CPF with letters', () => {
        expect(isValidCpf('a1234567890')).toBe(false);
    });
});