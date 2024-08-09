import FindWalletById from "../../../../domain/wallet/services/find-wallet-by-id";
import Controller, { IRequest, IResponse } from "../../../../shared/controller";
import { FindWalletByIdControllerResponseDto } from "./find-wallet-controller-response-dto";

export class FindWalletByIdController implements Controller<null, FindWalletByIdControllerResponseDto> {
    constructor(private readonly findWalletById: FindWalletById) { }

    async handle(request: IRequest<null>, response: IResponse<FindWalletByIdControllerResponseDto>): Promise<IResponse<FindWalletByIdControllerResponseDto>> {
        const walletId = request.getRequest().params.id;

        try {
            const result = await this.findWalletById.execute(walletId);

            if (result.isFailure) {
                return response.sendResponse(404, {
                    message: result.getErrorValue(),
                    wallet: null,
                    isFailure: true,
                    isSuccess: false
                });
            }

            return response.sendResponse(200, {
                message: "Wallet found successfully",
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