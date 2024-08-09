import App from "./infra/server/app";
import { createWalletController } from "./infra/server/routes/create-wallet";
import { findWalletByIdController } from "./infra/server/routes/find-wallet-by-id";

const PORT = parseInt(process.env.PORT || "3333");

async function main() {
    try {
        const app = new App();

        app.register('/wallet/:id', 'GET', findWalletByIdController);
        app.register('/create-wallet', 'POST', createWalletController)


        await app.start(PORT);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
