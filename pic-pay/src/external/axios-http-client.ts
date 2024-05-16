import { HttpClient } from "../types";

class AxiosHttpClient implements HttpClient {
    GET<T>(url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    POST<T>(url: string, data: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
}
