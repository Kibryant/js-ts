import { CreateTransactionDto, Transaction } from "./transaction";

abstract class TransactionRepository {
    abstract create(fields: CreateTransactionDto): Promise<Transaction>;
    abstract delete(): Promise<void>;
    abstract findById(id: string): Promise<Transaction | null>;
}

export { TransactionRepository };
