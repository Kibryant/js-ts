import { Transaction } from "./transaction";

describe("Transaction", () => {
    const transactionData = {
        payeeId: "FAKE_PAYEE_ID",
        payerId: "FAKE_PAYER_ID",
        amount: 1000,
    };

    it("should create a Transaction instance", () => {
        const transaction = new Transaction(transactionData);

        expect(transaction).toBeInstanceOf(Transaction);
    });
});
