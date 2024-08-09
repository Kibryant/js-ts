import { FastifyReply } from "fastify";
import { IResponse } from "../../../shared/controller";
import { HttpStatusCode } from "../../../types";

export class FastifyResponseAdapter<Output> implements IResponse<Output> {
    private reply: FastifyReply;

    constructor(reply: FastifyReply) {
        this.reply = reply;
    }

    sendResponse(status: HttpStatusCode, data: Output): IResponse<Output> {
        this.reply.status(status).send(data);
        return this;
    }
}
