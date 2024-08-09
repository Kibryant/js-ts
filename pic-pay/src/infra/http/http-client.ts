import Result from "../../shared/result";

export enum HTTPSTATUSCODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

export default abstract class HttpClient {
    abstract GET<OUTPUT>(url: string): Promise<Result<OUTPUT>>;

    protected handleHttpError(statusCode: number, message: string): Result<never> {
        switch (statusCode) {
            case HTTPSTATUSCODE.BAD_REQUEST:
                return Result.fail("Bad request: " + message);
            case HTTPSTATUSCODE.UNAUTHORIZED:
                return Result.fail("Unauthorized: " + message);
            case HTTPSTATUSCODE.FORBIDDEN:
                return Result.fail("Forbidden: " + message);
            case HTTPSTATUSCODE.NOT_FOUND:
                return Result.fail("Not found: " + message);
            case HTTPSTATUSCODE.CONFLICT:
                return Result.fail("Conflict: " + message);
            case HTTPSTATUSCODE.INTERNAL_SERVER_ERROR:
                return Result.fail("Internal server error: " + message);
            default:
                return Result.fail("Unexpected error: " + message);
        }
    }
}
