import { isValidAmount } from "./isValidAumont";
import { isValidBalance } from "./isValidBalance";

export function haveSufficientFunds(balance: number, value: number) {
    if (!isValidBalance(balance)) {
        return false;
    }

    if (!isValidAmount(value)) {
        return false;
    }

    return balance >= value;
}