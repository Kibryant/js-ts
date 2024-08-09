import { describe, it, expect, beforeEach } from 'vitest';
import AuthorizationProvider from './authorization-provider'; // Ajuste o caminho conforme necessário
import Authorization, { AuthorizationProps } from './authorization';
import { HttpClientMock } from '../../../utils/http-client-mock';

describe('AuthorizationProvider', () => {
    let httpClientMock: HttpClientMock;
    let authorizationService: AuthorizationProvider;

    beforeEach(() => {
        httpClientMock = new HttpClientMock();
        authorizationService = new AuthorizationProvider(httpClientMock);
    });

    it('should return authorization when the request is successful', async () => {
        const transactionId = '123';
        const authorizationData: AuthorizationProps = { transactionId, authorized: true };

        httpClientMock.mockResponse(`/authorization/${transactionId}`, authorizationData);

        const result = await authorizationService.execute(transactionId);

        expect(result.isSuccess).toBe(true);
        expect(result.value._authorized).toEqual(true);
        expect(result.value).toBeInstanceOf(Authorization);
    });

    it('should fail when the authorization request fails', async () => {
        const transactionId = '456';

        httpClientMock.mockResponse(`/authorization/${transactionId}`, null, 404);

        const result = await authorizationService.execute(transactionId);

        expect(result.isFailure).toBe(true);
        expect(result.getErrorValue()).toContain('Authorization failed: Not found');
    });
});
