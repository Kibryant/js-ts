import CreateTransaction from './create-transaction';
import CreateWallet from '../../wallet/services/create-wallet';
import { WALLET_TYPE } from '../../wallet/wallet';
import { WalletRepository } from '../../wallet/wallet-repository';
import Transaction, { CreateTransactionDto } from '../transaction';
import { TransactionRepository } from '../transaction-repository';
import { describe, expect, it, beforeEach } from 'vitest';
import { TransactionRepositoryMock, WalletRepositoryMock } from '../../../utils';

describe('CreateTransaction', () => {
    let createTransaction: CreateTransaction;
    let createWallet: CreateWallet;
    let walletRepository: WalletRepository;
    let transactionRepository: TransactionRepository;

    beforeEach(() => {
        walletRepository = new WalletRepositoryMock();
        transactionRepository = new TransactionRepositoryMock();
        createTransaction = new CreateTransaction(walletRepository, transactionRepository);
        createWallet = new CreateWallet(walletRepository);
    });

    it('should create a transaction', async () => {
        const resultPayer = await createWallet.execute({
            name: "Payer",
            balance: 100,
            email: "payer@gmail.com",
            password: "123456",
            cpf: "11290725500",
            phone: "31999999999",
            walletType: WALLET_TYPE.COMMOM,
        })

        const resultPayee = await createWallet.execute({
            name: "Payee",
            balance: 0,
            email: "payee@gmail.com",
            password: "123456",
            cpf: "41551058022",
            phone: "31999999998",
            walletType: WALLET_TYPE.COMMOM,
        })

        const payer = resultPayer.value;
        const payee = resultPayee.value;


        const transactionData: CreateTransactionDto = {
            payerId: payer.id,
            payeeId: payee.id,
            amount: 50
        };

        const result = await createTransaction.execute(transactionData);

        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Transaction);
        expect(result.value.payerId).toBe(payer.id);
        expect(result.value.payeeId).toBe(payee.id);
        expect(result.value.amount).toBe(50);
        expect(result.value.status).toBe("APPROVED");
    });

    it('should not create a transaction if payer not found', async () => {
        const resultPayee = await createWallet.execute({
            name: "Payee",
            balance: 0,
            email: "payee@gmail.com",
            password: "123456",
            cpf: "41551058022",
            phone: "31999999998",
            walletType: WALLET_TYPE.COMMOM,
        })

        const payee = resultPayee.value;

        const transactionData: CreateTransactionDto = {
            payerId: "invalid-id",
            payeeId: payee.id,
            amount: 50
        };

        const result = await createTransaction.execute(transactionData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Payer not found");
    });

    it('should not create a transaction if payee not found', async () => {
        const resultPayer = await createWallet.execute({
            name: "Payer",
            balance: 100,
            email: "payer@gmail.com",
            password: "123456",
            cpf: "11290725500",
            phone: "31999999999",
            walletType: WALLET_TYPE.COMMOM,
        })

        const payer = resultPayer.value;

        const transactionData: CreateTransactionDto = {
            payerId: payer.id,
            payeeId: "invalid-id",
            amount: 50
        };

        const result = await createTransaction.execute(transactionData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Payee not found");
    });

    it('should not create a transaction if payer has insufficient funds', async () => {
        const resultPayer = await createWallet.execute({
            name: "Payer",
            balance: 0,
            email: "payer@gmail.com",
            password: "123456",
            cpf: "11290725500",
            phone: "31999999999",
            walletType: WALLET_TYPE.COMMOM,
        })

        const resultPayee = await createWallet.execute({
            name: "Payee",
            balance: 0,
            email: "payee@gmail.com",
            password: "123456",
            cpf: "41551058022",
            phone: "31999999998",
            walletType: WALLET_TYPE.COMMOM,
        })

        const payer = resultPayer.value;
        const payee = resultPayee.value;

        const transactionData: CreateTransactionDto = {
            payerId: payer.id,
            payeeId: payee.id,
            amount: 50
        };

        const result = await createTransaction.execute(transactionData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Insufficient funds");
    });

    it('should not create a transaction if payer is SHOPKEEPER', async () => {
        const resultPayer = await createWallet.execute({
            name: "Payer",
            balance: 100,
            email: "payer@gmail.com",
            password: "123456",
            cpf: "11290725500",
            phone: "31999999999",
            walletType: WALLET_TYPE.SHOPKEEPER,
        })

        const resultPayee = await createWallet.execute({
            name: "Payee",
            balance: 0,
            email: "payee@gmail.com",
            password: "123456",
            cpf: "41551058022",
            phone: "31999999998",
            walletType: WALLET_TYPE.COMMOM,
        })

        const payer = resultPayer.value;
        const payee = resultPayee.value;

        const transactionData: CreateTransactionDto = {
            payerId: payer.id,
            payeeId: payee.id,
            amount: 50
        };

        const result = await createTransaction.execute(transactionData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Shopkeeper can't make transactions");

    });
});