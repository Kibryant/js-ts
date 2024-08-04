import DeleteWallet from './delete-wallet';
import CreateWallet from './create-wallet';
import { WalletRepository } from '../wallet-repository';
import Result from '../../../shared/result';
import { WalletRepositoryMock } from '../../../utils';
import { describe, expect, it, beforeEach } from 'vitest';
import { WALLET_TYPE } from '../wallet';

describe('DeleteWallet', () => {
    let createWallet: CreateWallet;
    let deleteWallet: DeleteWallet;
    let walletRepository: WalletRepository;

    beforeEach(() => {
        walletRepository = new WalletRepositoryMock();
        deleteWallet = new DeleteWallet(walletRepository);
        createWallet = new CreateWallet(walletRepository);
    });

    it('should delete a wallet successfully', async () => {
        // Arrange
        const wallet = await createWallet.execute({
            name: 'John Doe',
            cpf: '11290725500',
            phone: '11999999999',
            email: 'johndoe@gmail.com',
            password: '123',
            balance: 100,
            walletType: WALLET_TYPE.SHOPKEEPER
        })

        const walletId = wallet.value.id;

        // Act
        const result: Result<void> = await deleteWallet.execute(walletId);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.value).toBeUndefined();
    });

    it('should return an error if wallet does not exist', async () => {
        // Arrange
        const walletId = '456';

        // Act
        const result: Result<void> = await deleteWallet.execute(walletId);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe('Wallet not found');
    });
});