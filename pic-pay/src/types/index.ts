export enum OperationResult {
    SUCCESS,
    FAILURE,
    NOTFOUND,
}

export enum HTTPSTATUSCODE {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export interface HttpResult<T> {
    data: T | null;
    message: string;
    status: HTTPSTATUSCODE;
}

export interface ServiceResult<T> {
    result: OperationResult;
    data: T | null;
    message: string;
}

export interface RepositoryResult<T> {
    result: OperationResult;
    data: T | null;
    message: string;
}

export interface HttpClient {
    GET<T>(url: string): Promise<HttpResult<T>>;
    POST<T>(url: string, data: any): Promise<HttpResult<T>>;
}
