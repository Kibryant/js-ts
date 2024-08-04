import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import { haveSufficientFunds } from "../../../utils/haveSufficientFunds";
import { isShopkeeper } from "../../../utils/isShopkeeper";
import { WalletRepository } from "../../wallet/wallet-repository";
import Transaction, { CreateTransactionDto } from "../transaction";
import { TransactionRepository } from "../transaction-repository";

export default class CreateTransaction implements UseCase<CreateTransactionDto, Result<Transaction>> {
    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly transactionRepository: TransactionRepository
    ) { }

    private async approveTransaction(transactionId: string): Promise<Result<Transaction>> {
        const transactionToApprovedOrError = await this.transactionRepository.findById(transactionId)


        if (transactionToApprovedOrError.isFailure) {
            return Result.fail("Transaction not found");
        }

        const transactionToApproved = transactionToApprovedOrError.value;

        transactionToApproved.approve();

        const transaction = await this.transactionRepository.update({ status: transactionToApproved.status }, transactionId);

        console.log(transaction);

        if (transaction.isFailure) {
            return Result.fail(transaction.getErrorValue());
        }

        return Result.ok(transaction.value);
    }

    private async rejectTransaction(transactionId: string): Promise<Result<Transaction>> {
        const transactionToReject = (await this.transactionRepository.findById(transactionId)).value;

        if (!transactionToReject) {
            return Result.fail("Transaction not found");
        }

        transactionToReject.reject();
        const transaction = await this.transactionRepository.update(transactionToReject, transactionToReject.id);

        if (transaction.isFailure) {
            return Result.fail(transaction.getErrorValue());
        }

        return Result.ok(transaction.value);
    }

    async execute(transactionData: CreateTransactionDto): Promise<Result<Transaction>> {
        const payerExists = await this.walletRepository.findById(transactionData.payerId);

        const amount = transactionData.amount;

        if (payerExists.isFailure) {
            return Result.fail("Payer not found");
        }

        const payer = payerExists.value;

        const payeeExists = await this.walletRepository.findById(transactionData.payeeId);

        if (payeeExists.isFailure) {
            return Result.fail("Payee not found");
        }

        const payerIsShopkeeper = isShopkeeper(payer.walletType);

        if (payerIsShopkeeper) {
            return Result.fail("Shopkeeper can't make transactions");
        }

        if (!haveSufficientFunds(payer.balance, amount)) {
            return Result.fail("Insufficient funds");
        }

        const result = await this.transactionRepository.create(transactionData);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        const transactionInProgess = result.value;

        payer.debit(amount);

        const userUpdatedOrError = await this.walletRepository.update(payer, payer.id);

        if (userUpdatedOrError.isFailure) {
            await this.rejectTransaction(transactionInProgess.id);
            return Result.fail(userUpdatedOrError.getErrorValue());
        }

        const payee = payeeExists.value;

        payee.credit(amount);

        const payeeUpdatedOrError = await this.walletRepository.update(payee, payee.id);

        if (payeeUpdatedOrError.isFailure) {
            await this.rejectTransaction(transactionInProgess.id);
            return Result.fail(payeeUpdatedOrError.getErrorValue());
        }

        console.log(transactionInProgess.id);

        const transactionApprovedOrError = await this.approveTransaction(transactionInProgess.id);


        if (transactionApprovedOrError.isFailure) {
            await this.rejectTransaction(transactionInProgess.id);
            return Result.fail(transactionApprovedOrError.getErrorValue());
        }

        return Result.ok(transactionApprovedOrError.value);
    }
}
