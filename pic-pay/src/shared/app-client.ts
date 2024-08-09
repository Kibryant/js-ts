import Controller, { IRequest, IResponse } from "./controller";

export type Callback<Input, Output> = (request: IRequest<Input>, response: IResponse<Output>) => void;

export default abstract class AppClient {
    abstract start(PORT: string | number): Promise<void>;
    abstract stop(): Promise<void>;
    abstract register<Input, Output>(url: string, method: string, callback: Controller<Input, Output>): void;
}