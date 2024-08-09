import Result from "../../../shared/result";
import UseCase from "../../../shared/use-case";
import MailProvider from "../../providers/mail/mail-provider";
import Wallet, { CreateWalletDto } from "../wallet";
import { WalletRepository } from "../wallet-repository";

export default class CreateWallet implements UseCase<CreateWalletDto & (string | undefined), Result<Wallet>> {
    constructor(private readonly walletRepository: WalletRepository, private readonly mailProvider: MailProvider) { }

    async execute(input: CreateWalletDto, id?: string): Promise<Result<Wallet>> {
        const result = await this.walletRepository.create(input, id);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }

        const wallet = result.value;

        await this.mailProvider.sendMail({
            from: {
                name: 'Equipe do Meu App',
                address: 'equipe@meuapp.com',
            },
            to: {
                name: wallet.name,
                address: wallet.email,
            },
            subject: 'Conta criada com sucesso!',
            body: `Olá ${wallet.name}, sua conta foi criada com sucesso!`,
        });

        return result;
    }
}