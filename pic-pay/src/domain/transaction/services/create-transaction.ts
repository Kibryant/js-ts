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
        const transactionToApprovedOrError = await this.transactionRepository.findById(transactionId);

        if (transactionToApprovedOrError.isFailure) {
            return Result.fail("Transaction not found");
        }

        const transactionToApproved = transactionToApprovedOrError.value;
        transactionToApproved.approve();

        const transaction = await this.transactionRepository.update({
            status: transactionToApproved.status,
        }, transactionId);

        if (transaction.isFailure) {
            return Result.fail(transaction.getErrorValue());
        }

        return Result.ok(transaction.value);
    }

    private async rejectTransaction(transactionId: string): Promise<Result<Transaction>> {
        const transactionToRejectOrError = await this.transactionRepository.findById(transactionId);

        if (transactionToRejectOrError.isFailure) {
            return Result.fail("Transaction not found");
        }

        const transactionToReject = transactionToRejectOrError.value;
        transactionToReject.reject();

        const transaction = await this.transactionRepository.update(transactionToReject, transactionToReject.id);

        if (transaction.isFailure) {
            return Result.fail(transaction.getErrorValue());
        }

        return Result.ok(transaction.value);
    }

    async execute(transactionData: CreateTransactionDto): Promise<Result<Transaction>> {
        const payerResult = await this.walletRepository.findById(transactionData.payerId);
        if (payerResult.isFailure) {
            return Result.fail("Payer not found");
        }
        const payer = payerResult.value;

        const payeeResult = await this.walletRepository.findById(transactionData.payeeId);
        if (payeeResult.isFailure) {
            return Result.fail("Payee not found");
        }
        const payee = payeeResult.value;

        if (isShopkeeper(payer.walletType)) {
            return Result.fail("Shopkeeper can't make transactions");
        }

        if (!haveSufficientFunds(payer.balance, transactionData.amount)) {
            return Result.fail("Insufficient funds");
        }

        const transactionResult = await this.transactionRepository.create(transactionData);
        if (transactionResult.isFailure) {
            return Result.fail(transactionResult.getErrorValue());
        }

        const transactionInProgress = transactionResult.value;

        const transactionInProgressIsReadyToProcess = transactionInProgress.isReadyToProcess();

        if (!transactionInProgressIsReadyToProcess) {
            return Result.ok(transactionInProgress);
        }

        payer.debit(transactionData.amount);
        const payerUpdateResult = await this.walletRepository.update(payer, payer.id);
        if (payerUpdateResult.isFailure) {
            await this.rejectTransaction(transactionInProgress.id);
            return Result.fail(payerUpdateResult.getErrorValue());
        }

        payee.credit(transactionData.amount);
        const payeeUpdateResult = await this.walletRepository.update(payee, payee.id);
        if (payeeUpdateResult.isFailure) {
            await this.rejectTransaction(transactionInProgress.id);
            return Result.fail(payeeUpdateResult.getErrorValue());
        }

        const transactionApprovalResult = await this.approveTransaction(transactionInProgress.id);
        if (transactionApprovalResult.isFailure) {
            await this.rejectTransaction(transactionInProgress.id);
            return Result.fail(transactionApprovalResult.getErrorValue());
        }

        return Result.ok(transactionApprovalResult.value);
    }
}
