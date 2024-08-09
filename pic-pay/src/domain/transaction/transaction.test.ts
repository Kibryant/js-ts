// Transaction.test.ts
import { describe, it, expect } from "vitest";
import Transaction, { STATUS, CreateTransactionDto, UpdateTransactionDto } from "./transaction";

describe("Transaction", () => {
    it("should create a transaction with valid data", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const result = Transaction.create(data);
        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeInstanceOf(Transaction);
    });

    it("should fail to create a transaction with invalid amount", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: -100,
        };

        const result = Transaction.create(data);
        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Invalid amount");
    });

    it("should approve a transaction", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;
        transaction.approve();
        expect(transaction.status).toBe(STATUS.APPROVED);
    });

    it("should reject a transaction", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;
        transaction.reject();
        expect(transaction.status).toBe(STATUS.REJECTED);
    });

    it("should update a transaction status", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;
        const updateData: UpdateTransactionDto = { status: STATUS.APPROVED };
        const result = transaction.update(updateData);

        expect(result.isSuccess).toBe(true);
        expect(transaction.status).toBe(STATUS.APPROVED);
    });

    it("should update a transaction schedule date", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;

        const newScheduleDate = new Date(Date.now() + 10000);

        const updateData: UpdateTransactionDto = { scheduleDate: newScheduleDate };
        const result = transaction.update(updateData);

        expect(result.isSuccess).toBe(true);
        expect(transaction.scheduleDate).toBe(newScheduleDate);
    });

    it("should not update a transaction status if already approved or rejected", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;
        transaction.approve();

        const updateData: UpdateTransactionDto = { status: STATUS.REJECTED };
        const result = transaction.update(updateData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Cannot update to the specified status because the transaction is already approved or rejected");
    });

    it("should validate the schedule date when updating", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
            scheduleDate: new Date(Date.now() + 10000),
        };

        const transaction = Transaction.create(data).value;
        const invalidScheduleDate = new Date(Date.now() - 10000);

        const updateData: UpdateTransactionDto = { scheduleDate: invalidScheduleDate };
        const result = transaction.update(updateData);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toBe("Schedule date cannot be in the past");
    });

    it("should be ready to process if no schedule date is set", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
        };

        const transaction = Transaction.create(data).value;
        expect(transaction.isReadyToProcess()).toBe(true);
    });

    it("should be ready to process if the schedule date has passed", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
            scheduleDate: new Date(Date.now() - 10000),
        };

        const transaction = Transaction.create(data).value;
        expect(transaction.isReadyToProcess()).toBe(true);
    });

    it("should not be ready to process if the schedule date is in the future", () => {
        const data: CreateTransactionDto = {
            payerId: "payer123",
            payeeId: "payee123",
            amount: 100,
            scheduleDate: new Date(Date.now() + 10000),
        };

        const transaction = Transaction.create(data).value;
        expect(transaction.isReadyToProcess()).toBe(false);
    });
});
