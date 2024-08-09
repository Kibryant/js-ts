import { HttpStatusCode } from "../types";

export interface IRequest<Input> {
    getRequest(): { body: Input, params: { [key: string]: string }; };
}

export interface IResponse<Output> {
    sendResponse(status: HttpStatusCode, data: Output): IResponse<Output>;
}

export default abstract class Controller<Input, Output> {
    abstract handle(request: IRequest<Input>, response: IResponse<Output>): Promise<IResponse<Output>>;
}