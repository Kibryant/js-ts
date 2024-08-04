import { haveSufficientFunds } from '../utils/haveSufficientFunds';
import { test, expect } from "vitest";

test('should return true if balance is equal to value', () => {
    const balance = 100;
    const value = 100;
    const result = haveSufficientFunds(balance, value);
    expect(result).toBe(true);
});

test('should return true if balance is greater than value', () => {
    const balance = 200;
    const value = 100;
    const result = haveSufficientFunds(balance, value);
    expect(result).toBe(true);
});

test('should return false if balance is less than value', () => {
    const balance = 50;
    const value = 100;
    const result = haveSufficientFunds(balance, value);
    expect(result).toBe(false);
});

test('should return false if balance is negative', () => {
    const balance = -50;
    const value = 100;
    const result = haveSufficientFunds(balance, value);
    expect(result).toBe(false);
});

test('should return false if balance is zero and value is negative', () => {
    const balance = 0;
    const value = -50;
    const result = haveSufficientFunds(balance, value);
    expect(result).toBe(false);
});