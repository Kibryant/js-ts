import { CreateTransactionDto, Transaction } from "./transaction";
import { TransactionRepository } from "./transaction-repository";

class TransactionRepositoryMock implements TransactionRepository {
    private readonly transactions: Transaction[] = [];

    async create(fields: CreateTransactionDto): Promise<Transaction> {
        const transaction = new Transaction(fields);

        this.transactions.push(transaction);

        return transaction;
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Transaction | null> {
        throw new Error("Method not implemented.");
    }
}

describe("WalletRepository", () => {
    const transactionRepository = new TransactionRepositoryMock();

    const transactionData = {
        payeeId: "FAKE_PAYEE_ID",
        payerId: "FAKE_PAYER_ID",
        amount: 1000,
    };

    it("should be able to create a transactions", async () => {
        const transaction = await transactionRepository.create(transactionData);

        expect(transaction.id).toBeTruthy();
        expect(transaction.amount).toBe(transactionData.amount);
        expect(transaction.payeeId).toBe(transactionData.payeeId);
        expect(transaction.payerId).toBe(transactionData.payerId);
    });
});
