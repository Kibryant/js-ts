import Result from "./result";
import UseCase from "./use-case";
import { describe, it, expect } from 'vitest';

interface ExampleInput {
    value: number;
}

class ExampleUseCase extends UseCase<ExampleInput, Result<string>> {
    async execute(input: ExampleInput): Promise<Result<string>> {
        return Result.ok(`Value is ${input.value}`);
    }
}

describe('UseCase', () => {
    describe('execute', () => {
        it('should return a successful result', async () => {
            const useCase = new ExampleUseCase();
            const result = await useCase.execute({ value: 42 });

            expect(result.isSuccess).toBe(true);
            expect(result.value).toBe('Value is 42');
        });
    });
});