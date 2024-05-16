import { HTTPSTATUSCODE, HttpClient, HttpResult } from "../../types";
import { AuthorizerService } from "./authorizer-service";

class HttpClientMock implements HttpClient {
    status: HTTPSTATUSCODE;

    constructor(status: HTTPSTATUSCODE) {
        this.status = status;
    }

    async GET<T>(url: string): Promise<HttpResult<T>> {
        return {
            message: "success",
            data: null,
            status: this.status,
        };
    }

    async POST<T>(url: string, data: any): Promise<HttpResult<T>> {
        throw new Error("Method not implemented.");
    }
}

describe("AuthorizerService", () => {
    const URL = "https://fake.com";

    it("should authorize", async () => {
        const httpClient = new HttpClientMock(HTTPSTATUSCODE.OK);
        const authorizerService = new AuthorizerService(httpClient);

        const isAuthorized = await authorizerService.authorize(URL, {} as any);

        expect(isAuthorized).toBe(true);
    });

    it("should not authorize", async () => {
        const httpClient = new HttpClientMock(HTTPSTATUSCODE.UNAUTHORIZED);
        const authorizerService = new AuthorizerService(httpClient);

        const isAuthorized = await authorizerService.authorize(URL, {} as any);

        expect(isAuthorized).toBe(false);
    });
});
