import { HTTPSTATUSCODE, HttpClient } from "../../types";
import { Transaction } from "../transaction/transaction";

interface Authorization {
    message: string;
    isAuthorized(): boolean;
}

class AuthorizerService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async authorize(url: string, transaction: Transaction): Promise<boolean> {
        const { message, status } = await this.httpClient.GET<Transaction>(url);

        if (status === HTTPSTATUSCODE.OK) return true;

        return false;
    }
}

export { AuthorizerService };
