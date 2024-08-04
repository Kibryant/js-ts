import Result from "../../shared/result";
import Transaction, { CreateTransactionDto, UpdateTransactionDto } from "./transaction";

abstract class TransactionRepository {
    abstract create(fields: CreateTransactionDto): Promise<Result<Transaction>>;
    abstract update(fields: UpdateTransactionDto, id: string): Promise<Result<Transaction>>;
    abstract delete(): Promise<Result<void>>;
    abstract findById(id: string): Promise<Result<Transaction>>;
}

export { TransactionRepository };
