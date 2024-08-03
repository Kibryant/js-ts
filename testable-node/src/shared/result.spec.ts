import { describe, it, expect } from 'vitest';
import Result from './result';

describe('Result', () => {
    describe('ok', () => {
        it('should create a successful result with a value', () => {
            const value = 42;
            const result = Result.ok(value);

            expect(result.isSuccess).toBe(true);
            expect(result.isFailure).toBe(false);
            expect(result.value).toBe(value);
            expect(result.error).toBeUndefined();
        });

        it('should create a successful result without a value', () => {
            const result = Result.ok();

            expect(result.isSuccess).toBe(true);
            expect(result.isFailure).toBe(false);
            expect(result.value).toBeUndefined();
            expect(result.error).toBeUndefined();
        });
    });

    describe('fail', () => {
        it('should create a failed result with an error message', () => {
            const error = 'Something went wrong';
            const result = Result.fail(error);

            expect(result.isSuccess).toBe(false);
            expect(result.isFailure).toBe(true);
            expect(result.error).toBe(error);
        });
    });

    describe('value', () => {
        it('should throw an error when trying to retrieve the value from a failed result', () => {
            const result = Result.fail('Something went wrong');

            expect(() => result.value).toThrowError(
                `Cant retrieve the value from a failed result.`
            );
        });
    });

    describe('constructor', () => {
        it('should throw an error when creating a successful result with an error message', () => {
            // @ts-ignore
            expect(() => new Result(true, 'Something went wrong')).toThrowError(
                'InvalidOperation: A result cannot be successful and contain an error'
            );
        });

        it('should throw an error when creating a failed result without an error message', () => {
            // @ts-ignore
            expect(() => new Result(false)).toThrowError(
                'InvalidOperation: A failing result needs to contain an error message'
            );
        });
    });
});