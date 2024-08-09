import { FastifyRequest } from "fastify";
import { IRequest } from "../../../shared/controller";

export class FastifyRequestAdapter<Input> implements IRequest<Input> {
    private request: FastifyRequest;

    constructor(request: FastifyRequest) {
        this.request = request;
    }

    getRequest(): { body: Input, params: { [key: string]: string } } {
        return {
            body: this.request.body as Input,
            params: this.request.params as { [key: string]: string }
        };
    }
}

