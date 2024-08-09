import HttpClient from "../../../infra/http/http-client";
import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import Authorization, { AuthorizationProps } from "./authorization";

export default class AuthorizationProvider implements UseCase<string, Result<Authorization>> {
    constructor(private readonly httpClient: HttpClient) { }

    async execute(transactionId: string): Promise<Result<Authorization>> {
        const response = await this.httpClient.GET<AuthorizationProps>(`/authorization/${transactionId}`);

        if (response.isFailure) {
            return Result.fail(`Authorization failed: ${response.getErrorValue()}`);
        }

        const authorization = new Authorization(response.value);

        return Result.ok(authorization)

    }
}