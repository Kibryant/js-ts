import HttpClient, { HTTPSTATUSCODE } from "../infra/http/http-client";
import Result from "../shared/result";

export class HttpClientMock extends HttpClient {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private responses: Map<string, any> = new Map();
    private statusCodes: Map<string, HTTPSTATUSCODE> = new Map();

    public mockResponse<OUTPUT>(url: string, response: OUTPUT, statusCode: HTTPSTATUSCODE = HTTPSTATUSCODE.OK): void {
        this.responses.set(url, response);
        this.statusCodes.set(url, statusCode);
    }

    async GET<OUTPUT>(url: string): Promise<Result<OUTPUT>> {
        const statusCode = this.statusCodes.get(url) || HTTPSTATUSCODE.NOT_FOUND;
        const response = this.responses.get(url);

        if (statusCode === HTTPSTATUSCODE.OK && response !== undefined) {
            return Result.ok(response as OUTPUT);
        } else {
            return this.handleHttpError(statusCode, `Failed to fetch from ${url}`);
        }
    }
}
