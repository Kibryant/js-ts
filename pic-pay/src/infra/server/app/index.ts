import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import AppClient, { Callback } from '../../../shared/app-client';
import { FastifyRequestAdapter } from '../adapters/RequestAdapter';
import { FastifyResponseAdapter } from '../adapters/ResponseAdapter';
import Controller from '../../../shared/controller';

export default class App implements AppClient {
    private readonly server = Fastify({ logger: true });

    async start(PORT: number): Promise<void> {
        try {
            await this.server.listen({ port: PORT });
            console.log(`Fastify server listening on port ${PORT}`);
        } catch (err) {
            console.error("Error starting server:", err);
            process.exit(1);
        }
    }

    async stop(): Promise<void> {
        await this.server.close();
    }

    register<Input, Output>(url: string, method: string, controller: Controller<Input, Output>): void {
        switch (method) {
            case 'GET':
                this.server.get(url, (request: FastifyRequest, reply: FastifyReply) => {
                    const requestAdapter = new FastifyRequestAdapter<Input>(request);
                    const responseAdapter = new FastifyResponseAdapter<Output>(reply);
                    controller.handle(requestAdapter, responseAdapter);
                });

                break;
            case 'POST':
                this.server.post(url, (request: FastifyRequest, reply: FastifyReply) => {
                    const requestAdapter = new FastifyRequestAdapter<Input>(request);
                    const responseAdapter = new FastifyResponseAdapter<Output>(reply);
                    controller.handle(requestAdapter, responseAdapter);
                });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    }
}