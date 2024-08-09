import CreateWallet from "../../../../domain/wallet/services/create-wallet";
import { CreateWalletDto } from "../../../../domain/wallet/wallet";
import Controller, { IRequest, IResponse } from "../../../../shared/controller";
import { CreateWalletControllerResponseDto } from "./create-wallet-controller-response-dto";

export class CreateWalletController implements Controller<CreateWalletDto, CreateWalletControllerResponseDto> {
    constructor(private readonly createWallet: CreateWallet) { }

    async handle(request: IRequest<CreateWalletDto>, response: IResponse<CreateWalletControllerResponseDto>): Promise<IResponse<CreateWalletControllerResponseDto>> {
        const wallet = request.getRequest().body;

        try {
            const result = await this.createWallet.execute(wallet);

            if (result.isFailure) {
                return response.sendResponse(400, {
                    message: result.getErrorValue(),
                    wallet: null,
                    isFailure: true,
                    isSuccess: false
                });
            }

            return response.sendResponse(201, {
                message: "Wallet created successfully",
                wallet: result.value,
                isFailure: false,
                isSuccess: true
            });
        } catch (error) {
            return response.sendResponse(500, {
                message: error instanceof Error ? error.message : "Internal server error",
                wallet: null,
                isFailure: true,
                isSuccess: false
            });
        }

    }

}