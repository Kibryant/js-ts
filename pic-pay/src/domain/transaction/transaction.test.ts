import Transaction, { CreateTransactionDto } from "./transaction";
import { describe, it, expect } from "vitest";

describe("Transaction", () => {
    describe("create", () => {
        it("should create a new transaction with valid data", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };

            // Act
            const transaction = Transaction.create(transactionData);

            // Assert
            expect(transaction.isSuccess).toBe(true);
            expect(transaction.value).toBeInstanceOf(Transaction);
            expect(transaction.value.payerId).toBe(transactionData.payerId);
            expect(transaction.value.payeeId).toBe(transactionData.payeeId);
            expect(transaction.value.amount).toBe(transactionData.amount);
        });

        it("should fail to create a new transaction with invalid amount", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: -100,
            };

            // Act
            const transaction = Transaction.create(transactionData);

            // Assert
            expect(transaction.isFailure).toBe(true);
            expect(transaction.error).toBe("Invalid amount");
        });
    });

    describe("getters", () => {
        it("should return the correct payerId", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };
            const transaction = Transaction.create(transactionData).value;

            // Act
            const payerId = transaction.payerId;

            // Assert
            expect(payerId).toBe(transactionData.payerId);
        });

        it("should return the correct payeeId", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };
            const transaction = Transaction.create(transactionData).value;

            // Act
            const payeeId = transaction.payeeId;

            // Assert
            expect(payeeId).toBe(transactionData.payeeId);
        });

        it("should return the correct amount", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };
            const transaction = Transaction.create(transactionData).value;

            // Act
            const amount = transaction.amount;

            // Assert
            expect(amount).toBe(transactionData.amount);
        });

        it("should return the correct createdAt date", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };
            const transaction = Transaction.create(transactionData).value;

            // Act
            const createdAt = transaction.createdAt;

            // Assert
            expect(createdAt).toBeInstanceOf(Date);
        });

        it("should return the correct status", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };

            // Act
            const transaction = Transaction.create(transactionData).value;

            // Assert
            expect(transaction.status).toBe("PENDING");
        });
    });

    describe("update status", () => {
        it("should update the transaction status to APPROVED", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };
            const transaction = Transaction.create(transactionData).value;

            // Act
            transaction.approve();

            // Assert
            expect(transaction.status).toBe("APPROVED");
        });

        it("should update the transaction status to REJECTED", () => {
            // Arrange
            const transactionData: CreateTransactionDto = {
                payerId: "payer123",
                payeeId: "payee456",
                amount: 100,
            };

            // Act
            const transaction = Transaction.create(transactionData).value;

            transaction.reject();

            // Assert
            expect(transaction.status).toBe("REJECTED");

        });
    });
});