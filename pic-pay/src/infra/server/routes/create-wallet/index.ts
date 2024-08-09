import { MailProviderMock } from "../../../../utils";
import { MongoWalletRepository } from "../../../database/mongo-wallet-repository";
import CreateWallet from "../../../../domain/wallet/services/create-wallet";
import { CreateWalletController } from "./create-wallet-controller";

const mailProvider = new MailProviderMock();
const walletRepository = new MongoWalletRepository();
const createWallet = new CreateWallet(walletRepository, mailProvider);
const createWalletController = new CreateWalletController(createWallet);

export { createWalletController }
