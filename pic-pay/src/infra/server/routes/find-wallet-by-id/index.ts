import FindWalletById from "../../../../domain/wallet/services/find-wallet-by-id";
import { MongoWalletRepository } from "../../../database/mongo-wallet-repository";
import { FindWalletByIdController } from "./find-wallet-controller";

const walletRepository = new MongoWalletRepository();
const findWalletById = new FindWalletById(walletRepository);
const findWalletByIdController = new FindWalletByIdController(findWalletById);

export { findWalletByIdController }
