import Transaction, { TransactionProps, CreateTransactionDto, UpdateTransactionDto } from "../domain/transaction/transaction";
import { TransactionRepository } from "../domain/transaction/transaction-repository";
import Result from "../shared/result";

export class TransactionRepositoryMockMapper {
    static toDomain(transaction: TransactionProps, id?: string): Result<Transaction> {
        return Transaction.create(transaction, id);
    }

    static toPersistence(transaction: Transaction) {
        return {
            id: transaction.id,
            payerId: transaction.payerId,
            payeeId: transaction.payeeId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
        };
    }
}

export class TransactionRepositoryMock extends TransactionRepository {
    private readonly transactions: TransactionProps[] = [];

    async create(fields: CreateTransactionDto): Promise<Result<Transaction>> {
        const result = Transaction.create(fields);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        const wallet = TransactionRepositoryMockMapper.toPersistence(result.value);

        this.transactions.push(wallet);

        return Result.ok(result.value);
    }

    async update(input: UpdateTransactionDto, id: string): Promise<Result<Transaction>> {
        const transactionToUpdate = this.transactions.find((t) => t.id === id);

        if (!transactionToUpdate) {
            return Result.fail("Transaction not found");
        }

        const updatedTransaction = {
            ...transactionToUpdate,
            ...input,
        };


        const result = Transaction.create(updatedTransaction, id);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }


        const transaction = result.value;

        console.log("transaction", transaction);

        this.transactions[this.transactions.indexOf(transactionToUpdate)] = updatedTransaction;

        return Result.ok(transaction);

    }

    async delete(): Promise<Result<void>> {
        this.transactions.length = 0;

        return Result.ok();
    }

    async findById(id: string): Promise<Result<Transaction>> {
        const transaction = this.transactions.find((t) => t.id === id);

        if (!transaction) {
            return Result.fail("Transaction not found");
        }

        return Result.ok(Transaction.create(transaction).value);
    }
}